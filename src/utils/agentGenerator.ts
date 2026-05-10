import type { Agent } from '../types/agent';
import { fetchLatestSavingsData, fetchSavingsData } from './estatApi';
import { Prefecture, selectPrefectureByPopulationRatio } from './prefectureData';

let nextId = 1;

// 前回の値を保持するためのマップ
const lastGeneratedValues = new Map<string, number>();

// 年齢層コードの型定義
type EstatAgeGroup = '20歳未満' | '20～29歳' | '30～39歳' | '40～49歳' | '50～59歳' | '60～69歳' | '70歳以上';

// savingsDataをfetchSavingsDataの結果で初期化
let savingsData: { ageGroup: EstatAgeGroup; savings: number }[] = [
  { ageGroup: '20歳未満', savings: 200000 }, // 20万円
  { ageGroup: '20～29歳', savings: 5300000 }, // 530万円
  { ageGroup: '30～39歳', savings: 9100000 }, // 910万円
  { ageGroup: '40～49歳', savings: 12200000 }, // 1,220万円
  { ageGroup: '50～59歳', savings: 17100000 }, // 1,710万円
  { ageGroup: '60～69歳', savings: 24300000 }, // 2,430万円
  { ageGroup: '70歳以上', savings: 25000000 }, // 2,500万円
];

// 年齢層コードのマッピング
const AGE_GROUP_MAPPING: Record<EstatAgeGroup, MappedAgeGroup> = {
  '20歳未満': '20歳未満',
  '20～29歳': '20～29歳',
  '30～39歳': '30～39歳',
  '40～49歳': '40～49歳',
  '50～59歳': '50～59歳',
  '60～69歳': '60～69歳',
  '70歳以上': '70歳以上',
};

type MappedAgeGroup = '20歳未満' | '20～29歳' | '30～39歳' | '40～49歳' | '50～59歳' | '60～69歳' | '70歳以上';

// e-statのデータを初期化
export async function initializeSavingsData() {
  // 固定値を使用するため、初期化は不要になりました
  if (savingsData.length === 0) {
    savingsData = [
      { ageGroup: '20歳未満', savings: 200000 },
      { ageGroup: '20～29歳', savings: 5300000 },
      { ageGroup: '30～39歳', savings: 9100000 },
      { ageGroup: '40～49歳', savings: 12200000 },
      { ageGroup: '50～59歳', savings: 17100000 },
      { ageGroup: '60～69歳', savings: 24300000 },
      { ageGroup: '70歳以上', savings: 25000000 }
    ];
  }
}

function generateRandomValue(min: number, max: number, key?: string): number {
  // ガウス分布（正規分布）を使用して、より自然な分布を生成
  // Box-Muller変換を使用
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  
  // 平均値を計算
  let mean: number;
  if (key && lastGeneratedValues.has(key)) {
    // 前回の値がある場合、それを基準に小さな変動を加える
    const lastValue = lastGeneratedValues.get(key)!;
    // 前回の値を中心に、範囲の5%程度の変動を許容
    const variation = (max - min) * 0.05;
    mean = Math.max(min, Math.min(max, lastValue + generateRandomValue(-variation, variation)));
  } else {
    // 前回の値がない場合は範囲の中間を平均とする
    mean = (min + max) / 2;
  }
  
  // 標準偏差を設定（範囲の1/6を使用）
  const standardDeviation = (max - min) / 6;
  
  // ガウス分布の値を範囲内に収める
  const value = Math.max(min, Math.min(max, mean + z * standardDeviation));
  
  // 生成した値を保存
  if (key) {
    lastGeneratedValues.set(key, value);
  }
  
  return value;
}

function generateRandomBoolean(probability = 0.5): boolean {
  return Math.random() < probability;
}

// 年齢に応じた教育レベルを決定
function generateEducation(age: number): Agent['education'] {
  // 15-17歳は中卒か高校生として扱う
  if (age < 18) {
    // 15歳は中卒
    if (age === 15) return 'middleSchool';
    // 16-17歳は中卒か高校生
    return Math.random() < 0.95 ? 'highSchoolStudent' : 'middleSchool';
  }
  
  // 18-21歳は高校卒就職か大学在学
  if (age <= 21) {
    // 大学進学率は約54%（文部科学省2023年データ）
    return Math.random() < 0.54 ? 'bachelorStudent' : 'highSchool';
  }
  
  // 22-24歳の教育分布
  if (age <= 24) {
    const rand = Math.random();
    // 大学卒業率約50%、高校卒45%、大学院進学率約5%（文部科学省データ）
    if (rand < 0.50) return 'bachelor';
    if (rand < 0.95) return 'highSchool';
    return 'masterStudent';
  }
  
  // 25-27歳の教育分布
  if (age <= 27) {
    const rand = Math.random();
    if (rand < 0.05) return 'middleSchool';     // 中卒 5%
    if (rand < 0.42) return 'highSchool';       // 高校卒 37%
    if (rand < 0.93) return 'bachelor';         // 大学卒 51%
    if (rand < 0.98) return 'master';           // 修士 5%
    return 'doctorStudent';                     // 博士課程在学 2%
  }
  
  // 28歳以上の教育分布（2020年国勢調査データ参考）
  const rand = Math.random();
  if (rand < 0.05) return 'middleSchool';      // 中卒 5%
  if (rand < 0.42) return 'highSchool';        // 高校卒 37%
  if (rand < 0.93) return 'bachelor';          // 大学卒 51%
  if (rand < 0.98) return 'master';            // 修士 5%
  return 'doctor';                             // 博士 2%
}

// 年齢と教育レベルに応じた収入を計算（都道府県係数を適用）
function calculateIncome(age: number, education: Agent['education'], employed: boolean, prefecture: Prefecture, incomeBrackets: { min: number, max: number, prob: number }[]): number {
  // 15-17歳の場合（アルバイト収入を想定）
  if (age < 18) {
    return Math.floor(generateRandomValue(300000, 1000000));
  }

  // 学生の場合（アルバイト収入を想定）
  if (education === 'highSchoolStudent' || education === 'bachelorStudent') {
    return Math.floor(generateRandomValue(300000, 1200000));
  }

  // 未就業の場合
  if (!employed) return 0;
  
  // 教育レベルと年齢による係数を定義
  // この係数は各所得帯の中でどの位置に位置するかに影響
  const educationFactor = {
    'middleSchool': 0.2,       // 下位20%
    'highSchool': 0.4,         // 下位40%
    'bachelor': 0.6,           // 上位40%
    'master': 0.8,             // 上位20%
    'doctor': 0.9              // 上位10%
  };
  
  // 年齢による補正係数（20代を1.0とする）
  let ageFactor = 1.0;
  if (age < 30) {
    ageFactor = 0.8 + (age - 20) * 0.02; // 20代: 0.8-0.98
  } else if (age < 40) {
    ageFactor = 1.0 + (age - 30) * 0.02; // 30代: 1.0-1.18 (係数を下げる)
  } else if (age < 50) {
    ageFactor = 1.2 + (age - 40) * 0.015; // 40代: 1.2-1.335 (係数を下げる)
  } else if (age < 60) {
    ageFactor = 1.35 + (age - 50) * 0.008; // 50代: 1.35-1.422 (係数を下げる)
  } else {
    ageFactor = 1.35; // 60-64歳 (係数を下げる)
  }
  
  // 乱数で所得帯を選択（累積確率方式）
  const rand = Math.random();
  let cumulativeProb = 0;
  let selectedBracket = incomeBrackets[incomeBrackets.length - 1]; // デフォルトは最後の区分
  
  for (const bracket of incomeBrackets) {
    cumulativeProb += bracket.prob;
    if (rand <= cumulativeProb) {
      selectedBracket = bracket;
      break;
    }
  }
  
  // 教育レベルに応じた所得帯内での位置調整
  const eduFactor = educationFactor[education as keyof typeof educationFactor] || 0.5;
  
  // 所得帯内での位置を決定
  // 教育レベルと個人差を加味した調整係数
  // 変動係数を小さくして分布が極端にならないようにする
  const variationFactor = generateRandomValue(0.85, 1.15); // 0.85-1.15の変動係数に調整
  const positionFactor = eduFactor * variationFactor;
  
  // 帯内での値を計算（min〜maxの間）
  const baseIncome = Math.floor(selectedBracket.min + (selectedBracket.max - selectedBracket.min) * positionFactor);
  
  // 年齢による調整を適用
  // 年齢による調整係数をさらに抑える
  const ageAdjustedIncome = baseIncome * (1 + (ageFactor - 1) * 0.6);
  
  // 地域係数を適用して最終的な収入を決定
  // 最終的なが3000万円を超える場合は上限を設ける
  const finalIncome = Math.round(ageAdjustedIncome * prefecture.incomeRatio);
  return Math.min(finalIncome, 30000000);
}

// 年齢に応じた傾斜係数を計算する関数
function calculateAgeGradient(age: number, minAge: number, maxAge: number): number {
  // 年齢層内での相対位置（0～1の範囲）
  const position = (age - minAge) / (maxAge - minAge);
  // 傾斜を強調するため、2乗を使用
  return Math.pow(position, 2);
}

// 年齢に応じた貯蓄額を計算（都道府県係数を適用）
export function calculateSavings(age: number, education: Agent['education'], income: number, prefecture: Prefecture): number {
  let ageGroup: MappedAgeGroup;
  let baseSavings: number;
  let ageGradient = 1.0;

  // 年齢グループと基準貯蓄額の決定
  if (age < 20) {
    ageGroup = '20歳未満';
    // 年齢による傾斜（15歳を基準とした場合）
    ageGradient = calculateAgeGradient(age, 15, 19);
    // 基準額（20万円）に年齢傾斜を適用
    baseSavings = 200000 * (1 + ageGradient);
  } else if (age <= 29) {
    ageGroup = '20～29歳';
    // 20代の年齢傾斜を計算
    ageGradient = calculateAgeGradient(age, 20, 29);
    // 20代の基準額（530万円）に年齢傾斜を適用
    baseSavings = 5300000 * (0.4 + (0.6 * ageGradient)); // 20歳時点で基準額の40%から開始
  } else if (age <= 39) {
    ageGroup = '30～39歳';
    // 30代の年齢傾斜を計算
    ageGradient = calculateAgeGradient(age, 30, 39);
    // 30代の基準額（910万円）に年齢傾斜を適用
    baseSavings = 9100000 * (0.6 + (0.4 * ageGradient)); // 30歳時点で基準額の60%から開始
  } else if (age <= 49) {
    ageGroup = '40～49歳';
    // 40代の年齢傾斜を計算
    ageGradient = calculateAgeGradient(age, 40, 49);
    // 40代の基準額（1,220万円）に年齢傾斜を適用
    baseSavings = 12200000 * (0.7 + (0.3 * ageGradient)); // 40歳時点で基準額の70%から開始
  } else if (age <= 59) {
    ageGroup = '50～59歳';
    // 50代の年齢傾斜を計算
    ageGradient = calculateAgeGradient(age, 50, 59);
    // 50代の基準額（1,710万円）に年齢傾斜を適用
    baseSavings = 17100000 * (0.8 + (0.2 * ageGradient)); // 50歳時点で基準額の80%から開始
  } else if (age <= 69) {
    ageGroup = '60～69歳';
    // 60代の年齢傾斜を計算
    ageGradient = calculateAgeGradient(age, 60, 69);
    // 60代の基準額（2,430万円）に年齢傾斜を適用
    baseSavings = 24300000 * (0.85 + (0.15 * ageGradient)); // 60歳時点で基準額の85%から開始
  } else {
    ageGroup = '70歳以上';
    // 70代以上の年齢傾斜を計算（80歳までを想定）
    ageGradient = calculateAgeGradient(Math.min(age, 80), 70, 80);
    // 70代以上の基準額（2,500万円）に年齢傾斜を適用
    baseSavings = 25000000 * (0.9 + (0.1 * ageGradient)); // 70歳時点で基準額の90%から開始
  }

  // 1. 年齢による詳細な調整（同じ年代グループ内での違い）
  // 年齢が上がるにつれて変動幅を小さくする
  const volatilityRange = Math.max(0.1, 0.3 - (age / 200)); // 年齢とともに変動幅が縮小
  const ageAdjustment = generateRandomValue(
    1 - volatilityRange,
    1 + volatilityRange,
    `age_${age}`
  );
  
  // 2. 学歴による調整係数
  let educationMultiplier = 1.0;
  if (!education.endsWith('Student')) {
    educationMultiplier = education === 'highSchool' ? generateRandomValue(0.7, 1.0, `edu_${age}`)
      : education === 'bachelor' ? generateRandomValue(0.9, 1.3, `edu_${age}`)
      : education === 'master' ? generateRandomValue(1.1, 1.5, `edu_${age}`)
      : generateRandomValue(1.3, 1.7, `edu_${age}`); // doctor
  } else {
    // 学生の場合は貯蓄が少ない傾向に
    educationMultiplier = generateRandomValue(0.3, 0.7, `edu_${age}`);
  }

  // 3. 収入による調整（収入が平均より高い/低い場合の影響）
  const avgIncomeForAge = calculateAverageIncomeForAge(age);
  const incomeRatio = income / avgIncomeForAge;
  const incomeAdjustment = Math.pow(incomeRatio, 0.5); // 収入の影響を平方根で緩和

  // 4. ランダム要素（その他の要因による変動）
  // 年齢が上がるにつれて変動幅を小さくする
  const randomRange = Math.max(0.05, 0.2 - (age / 400)); // 年齢とともに変動幅が縮小
  const randomFactor = generateRandomValue(
    1 - randomRange,
    1 + randomRange,
    `random_${age}`
  );

  // 5. 都道府県の地域格差を反映
  const prefectureAdjustment = prefecture.savingsRatio;

  // 最終的な貯蓄額を計算
  const adjustedSavings = baseSavings * ageAdjustment * educationMultiplier * incomeAdjustment * randomFactor * prefectureAdjustment;

  // 最小値と最大値の設定（年齢に応じて調整）
  const minSavings = age < 20 ? 50000 : baseSavings * Math.max(0.1, 0.3 - (age / 200)); // 年齢とともに下限が上昇
  const maxSavings = age < 20 ? 1000000 : baseSavings * Math.min(3, 1.5 + (age / 40)); // 年齢とともに上限が上昇
  
  return Math.round(Math.max(minSavings, Math.min(maxSavings, adjustedSavings)));
}

// 年齢に応じた平均収入を計算するヘルパー関数
function calculateAverageIncomeForAge(age: number): number {
  if (age < 25) return 2800000;
  if (age < 30) return 3200000;
  if (age < 35) return 3800000;
  if (age < 40) return 4200000;
  if (age < 45) return 4600000;
  if (age < 50) return 5000000;
  if (age < 55) return 5400000;
  if (age < 60) return 5800000;
  if (age < 65) return 5000000;
  return 2400000; // 65歳以上
}

export async function generateAgent(): Promise<Agent> {
  // 貯蓄額データが初期化されていない場合は初期化
  if (savingsData.length === 0) {
    await initializeSavingsData();
  }

  // 年齢を生成（15-80歳）
  const age = Math.floor(generateRandomValue(15, 80));
  
  // 雇用状態を決定（65歳以上は基本的に退職、失業率は2.6%）
  const employed = age < 65 ? generateRandomBoolean(0.974) : generateRandomBoolean(0.1);
  
  // 教育レベルを決定
  const education = generateEducation(age);
  
  // 居住地域（都道府県）を決定
  const prefecture = selectPrefectureByPopulationRatio();
  
  // 収入を計算（都道府県格差を反映）
  const income = calculateIncome(age, education, employed, prefecture, [
    { min: 0, max: 1000000, prob: 0.069 },
    { min: 1000000, max: 2000000, prob: 0.146 },
    { min: 2000000, max: 3000000, prob: 0.145 },
    { min: 3000000, max: 4000000, prob: 0.129 },
    { min: 4000000, max: 5000000, prob: 0.107 },
    { min: 5000000, max: 6000000, prob: 0.085 },
    { min: 6000000, max: 7000000, prob: 0.064 },
    { min: 7000000, max: 8000000, prob: 0.058 },
    { min: 8000000, max: 9000000, prob: 0.046 },
    { min: 9000000, max: 10000000, prob: 0.037 },
    { min: 10000000, max: 11000000, prob: 0.026 },
    { min: 11000000, max: 12000000, prob: 0.023 },
    { min: 12000000, max: 13000000, prob: 0.018 },
    { min: 13000000, max: 14000000, prob: 0.010 },
    { min: 14000000, max: 15000000, prob: 0.008 },
    { min: 15000000, max: 16000000, prob: 0.007 },
    { min: 16000000, max: 17000000, prob: 0.003 },
    { min: 17000000, max: 18000000, prob: 0.003 },
    { min: 18000000, max: 19000000, prob: 0.003 },
    { min: 19000000, max: 20000000, prob: 0.002 },
    { min: 20000000, max: 30000000, prob: 0.013 }
  ]);
  
  // 貯蓄を計算（e-statデータと都道府県格差を使用）
  const savings = calculateSavings(age, education, income, prefecture);

  const agent: Agent = {
    id: nextId++,
    
    // 基本属性
    age,
    gender: generateRandomBoolean(0.486) ? 'male' : 'female',
    education,
    
    // 居住地域
    prefecture: {
      code: prefecture.code,
      name: prefecture.name,
      region: prefecture.region
    },
    
    // 経済状態
    income,
    savings,
    
    // 労働状態
    employed,
    skillLevel: generateRandomValue(0, 1),
    productivity: generateRandomValue(0.5, 1.5)
  };

  return agent;
}

export async function generatePopulation(size: number, incomeBrackets: { min: number, max: number, prob: number }[]): Promise<Agent[]> {
  // 各区分に割り当てる人数を計算
  const countsByBracket = incomeBrackets.map(bracket => {
    return Math.round(size * bracket.prob);
  });
  
  // 合計が目標サイズになるよう調整
  let totalCount = countsByBracket.reduce((sum, count) => sum + count, 0);
  if (totalCount !== size) {
    // 誤差を最大の区分に割り当て
    const maxIdx = countsByBracket.indexOf(Math.max(...countsByBracket));
    countsByBracket[maxIdx] += (size - totalCount);
  }

  const agents: Agent[] = [];
  let idCounter = 1;

  // 各所得区分ごとにエージェントを生成
  for (let i = 0; i < incomeBrackets.length; i++) {
    const count = countsByBracket[i];
    for (let j = 0; j < count; j++) {
      // 年齢の生成（15-64歳、労働力人口）
      const age = Math.floor(generateRandomValue(15, 80));
      
      // 教育レベルの生成
      const education = generateEducation(age);
      
      // 学生かどうかを判定
      const isStudent = education === 'highSchoolStudent' || education === 'bachelorStudent';
      
      // 就業状態の生成（失業率は2.6%）
      const employed = Math.random() > 0.026;
      
      // 都道府県の選択
      const prefecture = selectPrefectureByPopulationRatio();
      
      // 収入は区分内でランダム
      let income = 0;
      if (education === 'bachelorStudent' || education === 'highSchoolStudent') {
        if (Math.random() < 0.05) {
          // 5%は103万円以上（ただし区分のminが103万円未満なら103万円から）
          const minIncome = Math.max(incomeBrackets[i].min, 1030000);
          income = Math.floor(generateRandomValue(minIncome, incomeBrackets[i].max));
        } else {
          // 95%は103万円未満
          income = Math.floor(generateRandomValue(incomeBrackets[i].min, Math.min(incomeBrackets[i].max, 1029999)));
        }
      } else {
        income = Math.floor(generateRandomValue(incomeBrackets[i].min, incomeBrackets[i].max));
      }
      
      // 各種初期貯金額
      // 年齢・所得・地域に応じた初期貯金額を設定
      const initialSavings = calculateSavings(age, education, income, prefecture);
      
      agents.push({
        id: idCounter++,
        age,
        gender: 'male',  // 性別をデフォルト設定
        education,
        employed,
        income, 
        savings: initialSavings,
        prefecture: {
          code: prefecture.code,
          name: prefecture.name,
          region: prefecture.region
        },
        skillLevel: 0.5,  // スキルレベルのデフォルト値
        productivity: 1.0  // 生産性のデフォルト値
      });
    }
  }

  return agents;
} 