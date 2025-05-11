import type { Agent } from '../types/agent';
import { fetchLatestSavingsData, fetchSavingsData } from './estatApi';

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
  // 18歳未満は高校生として扱う
  if (age < 18) return 'highSchoolStudent';
  
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
    if (rand < 0.42) return 'highSchool';    // 高校卒 42%
    if (rand < 0.93) return 'bachelor';      // 大学卒 51%
    if (rand < 0.98) return 'master';        // 修士 5%
    return 'doctorStudent';                  // 博士課程在学 2%
  }
  
  // 28歳以上の教育分布（2020年国勢調査データ参考）
  const rand = Math.random();
  if (rand < 0.42) return 'highSchool';    // 高校卒 42%
  if (rand < 0.93) return 'bachelor';      // 大学卒 51%
  if (rand < 0.98) return 'master';        // 修士 5%
  return 'doctor';                         // 博士 2%
}

// 年齢と教育レベルに応じた収入を計算
function calculateIncome(age: number, education: Agent['education'], employed: boolean): number {
  // 在学中の学生の場合（アルバイト収入を想定）
  if (education.endsWith('Student')) {
    // 学生の収入分布を現実的に設定
    // 1. 大多数（80%）は50-90万円の範囲
    // 2. 少数（15%）は90-102万円の範囲
    // 3. 極めて少数（5%）は102-103万円の範囲
    const rand = Math.random();
    const agentKey = `income_${nextId}`;  // エージェントごとにユニークなキーを生成
    
    if (rand < 0.80) {
      // 50-90万円の範囲（大多数）
      return Math.round(generateRandomValue(500000, 900000, agentKey));
    } else if (rand < 0.95) {
      // 90-102万円の範囲（少数）
      return Math.round(generateRandomValue(900000, 1020000, agentKey));
    } else {
      // 102-103万円の範囲（極めて少数）
      return Math.round(generateRandomValue(1020000, 1030000, agentKey));
    }
  }
  
  // 定年後（65歳以上）は年金を考慮
  if (age >= 65) {
    // 基礎年金（月額65,000円）+ 厚生年金（月額約10万円）を基準
    const baseIncome = 1980000; // 年額
    // 教育レベルによる年金額の違い（厚生年金の報酬比例部分の違いを反映）
    const educationBonus = education === 'highSchool' ? 0 
      : education === 'bachelor' ? 300000    // 年額30万円増
      : education === 'master' ? 500000      // 年額50万円増
      : 700000;                              // 年額70万円増
    
    // 就業している場合は給与所得も加算
    if (employed) {
      // 給与所得（再雇用を想定した収入）
      const salaryIncome = Math.round(generateRandomValue(1200000, 2400000));
      return baseIncome + educationBonus + salaryIncome;
    }
    
    // 就業していない場合は年金収入のみ
    return baseIncome + educationBonus;
  }
  
  // 65歳未満で未就業の場合
  if (!employed) return 0;

  // 年齢とキャリアステージに応じた基本給（令和4年賃金構造基本統計調査を参考）
  let baseIncome = 0;
  if (age < 25) {
    baseIncome = 2800000;  // 新卒初任給水準
  } else if (age < 30) {
    baseIncome = 3200000;
  } else if (age < 35) {
    baseIncome = 3800000;
  } else if (age < 40) {
    baseIncome = 4200000;
  } else if (age < 45) {
    baseIncome = 4600000;
  } else if (age < 50) {
    baseIncome = 5000000;
  } else if (age < 55) {
    baseIncome = 5400000;
  } else if (age < 60) {
    baseIncome = 5800000;
  } else {
    baseIncome = 5000000;
  }

  // 教育レベルによる収入の違い（令和4年賃金構造基本統計調査を参考）
  const educationMultiplier = education === 'highSchool' ? 1
    : education === 'bachelor' ? 1.3     // 大卒は高卒の1.3倍
    : education === 'master' ? 1.5       // 修士は高卒の1.5倍
    : 1.7;                               // 博士は高卒の1.7倍

  return Math.round(baseIncome * educationMultiplier);
}

// 年齢に応じた傾斜係数を計算する関数
function calculateAgeGradient(age: number, minAge: number, maxAge: number): number {
  // 年齢層内での相対位置（0～1の範囲）
  const position = (age - minAge) / (maxAge - minAge);
  // 傾斜を強調するため、2乗を使用
  return Math.pow(position, 2);
}

// 年齢に応じた貯蓄額を計算
export function calculateSavings(age: number, education: Agent['education'], income: number): number {
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

  // 最終的な貯蓄額を計算
  const adjustedSavings = baseSavings * ageAdjustment * educationMultiplier * incomeAdjustment * randomFactor;

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

  // 年齢を生成（18-80歳）
  const age = Math.floor(generateRandomValue(18, 80));
  
  // 雇用状態を決定（65歳以上は基本的に退職）
  const employed = age < 65 ? generateRandomBoolean(0.974) : generateRandomBoolean(0.1);
  
  // 教育レベルを決定
  const education = generateEducation(age);
  
  // 収入を計算
  const income = calculateIncome(age, education, employed);
  
  // 貯蓄を計算（e-statデータを使用）
  const savings = calculateSavings(age, education, income);

  const agent: Agent = {
    id: nextId++,
    
    // 基本属性
    age,
    gender: generateRandomBoolean(0.486) ? 'male' : 'female',
    education,
    
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

export async function generatePopulation(size: number): Promise<Agent[]> {
  const population: Agent[] = [];
  for (let i = 0; i < size; i++) {
    const agent = await generateAgent();
    population.push(agent);
  }
  return population;
} 