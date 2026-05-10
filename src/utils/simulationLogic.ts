import { Agent } from '@/types/agent';

// エージェントの年齢による影響を計算
function calculateAgeEffects(agent: Agent): Partial<Agent> {
  return {
    skillLevel: Math.min(1, agent.skillLevel + 0.0005),
  };
}

// 年齢に応じた教育レベルの更新を計算
function calculateEducationChange(agent: Agent): Agent['education'] | null {
  // 現在の年齢（整数部分）
  const currentAge = Math.floor(agent.age);
  // 前月の年齢（整数部分）
  const previousAge = Math.floor(agent.age - 0.0833);
  
  // 年齢が変わっていない場合は更新なし
  if (currentAge === previousAge) return null;
  
  // 高校在学の場合（19歳になったら卒業）
  if (agent.education === 'highSchoolStudent' && currentAge === 19) {
    // 大学進学率59.1%、高校卒業で就職40.9%
    return Math.random() < 0.591 ? 'bachelorStudent' : 'highSchool';
  }
  
  // 大学在学の場合（23歳になったら卒業）
  if (agent.education === 'bachelorStudent' && currentAge === 23) {
    // 大学卒業90.1%、修士課程進学9.9%
    return Math.random() < 0.901 ? 'bachelor' : 'masterStudent';
  }
  
  // 修士課程在学の場合（25歳になったら卒業）
  if (agent.education === 'masterStudent' && currentAge === 25) {
    // 修士卒業90%、博士課程進学10%
    return Math.random() < 0.9 ? 'master' : 'doctorStudent';
  }
  
  // 博士課程在学の場合（30-32歳の間でランダムに卒業、33歳で必ず卒業）
  if (agent.education === 'doctorStudent') {
    if (currentAge === 33) {
      // 33歳になったら必ず卒業
      return 'doctor';
    } else if (currentAge >= 30 && currentAge <= 32) {
      // 30-32歳の間に20%の確率で毎年卒業を判定
      if (Math.random() < 0.2) {
        return 'doctor';
      }
    }
  }
  
  // 上記以外の場合は更新なし
  return null;
}

// 学生のアルバイト収入を計算する関数
function calculateStudentIncome(): number {
  const rand = Math.random();
  
  if (rand < 0.385) {
    // 0~59万円：38.5%
    return Math.floor(Math.random() * 590000);
  } else if (rand < 0.385 + 0.277) {
    // 60~89万円：27.7%
    return 600000 + Math.floor(Math.random() * 290000);
  } else if (rand < 0.385 + 0.277 + 0.288) {
    // 90~102万円：28.8%
    return 900000 + Math.floor(Math.random() * 120000);
  } else {
    // 103万円以上（上限200万円）：5%
    // 200万円に近づくほど確率が低くなるよう二次曲線的に分布
    const randFactor = Math.pow(Math.random(), 2); // 二乗することで高い値ほど出にくくなる
    return 1030000 + Math.floor(randFactor * 970000); // 103万円〜200万円
  }
}

// 雇用状態の変化確率を計算
function calculateEmploymentStatusChange(agent: Agent): boolean {
  // 定年退職（65歳以上）
  if (agent.age >= 65 && agent.employed) {
    // 確率を下げる（一気に全員が退職しないように）
    return Math.random() < 0.05; // 月に5%の確率で退職（年間約60%）
  }

  // 年齢層別の月次失業・退職確率（年間確率を12で割って月次に換算）- 確率を下げる
  const monthlyUnemploymentRates = {
    young: 0.001, // 34歳以下: 年間約1.2%（修正前: 3.6%）
    middleAge: 0.0007, // 35-44歳: 年間約0.8%（修正前: 2.4%）
    senior: 0.0005, // 45-54歳: 年間約0.6%（修正前: 1.2%）
    elderly: 0.0007, // 55-64歳: 年間約0.8%（修正前: 1.8%）
  };

  if (agent.employed) {
    let unemploymentRate;
    if (agent.age < 35) {
      unemploymentRate = monthlyUnemploymentRates.young;
    } else if (agent.age < 45) {
      unemploymentRate = monthlyUnemploymentRates.middleAge;
    } else if (agent.age < 55) {
      unemploymentRate = monthlyUnemploymentRates.senior;
    } else {
      unemploymentRate = monthlyUnemploymentRates.elderly;
    }

    // スキルレベルと生産性が低い場合、失業確率が上昇（影響度を下げる）
    if (agent.skillLevel < 0.3 || agent.productivity < 0.7) {
      unemploymentRate *= 1.2; // 修正前: 1.5
    }

    return Math.random() < unemploymentRate;
  } else {
    // 再就職確率（年齢による調整）
    let reemploymentRate = 0.05; // 基本: 月間5%（修正前: 8%）
    
    // 年齢による調整
    if (agent.age >= 55) {
      reemploymentRate *= 0.5; // 55歳以上は半分の確率
    } else if (agent.age >= 45) {
      reemploymentRate *= 0.7; // 45-54歳は0.7倍の確率
    }

    // スキルレベルによる調整
    reemploymentRate *= (1 + agent.skillLevel);

    return Math.random() < reemploymentRate;
  }
}

// エージェントの状態を更新
export function updateAgent(agent: Agent): Agent {
  const updates = [
    calculateAgeEffects(agent),
  ];

  const newAgent = { ...agent };
  
  // すべての更新を適用
  updates.forEach(update => {
    Object.assign(newAgent, update);
  });

  // 年齢を1ヶ月分増加（0.0833年）
  newAgent.age += 0.0833;
  
  // 教育レベルの更新をチェック
  const newEducation = calculateEducationChange(newAgent);
  if (newEducation !== null) {
    newAgent.education = newEducation;
    
    // 教育レベルが変わった場合、就業状態と収入も調整
    // 学生から卒業した場合、就職させる確率が高い
    if (
      (agent.education === 'highSchoolStudent' && newEducation === 'highSchool') ||
      (agent.education === 'bachelorStudent' && newEducation === 'bachelor') ||
      (agent.education === 'masterStudent' && newEducation === 'master') ||
      (agent.education === 'doctorStudent' && newEducation === 'doctor')
    ) {
      // 卒業時の就職率は95%
      if (!newAgent.employed && Math.random() < 0.95) {
        newAgent.employed = true;
        
        // 学歴に応じた初任給を設定
        let baseIncome = 0;
        if (newEducation === 'highSchool') {
          // 高卒の平均初任給（約200万円）
          baseIncome = 2000000 + Math.floor(Math.random() * 400000);
        } else if (newEducation === 'bachelor') {
          // 大卒の平均初任給（約300万円）
          baseIncome = 3000000 + Math.floor(Math.random() * 500000);
        } else if (newEducation === 'master') {
          // 修士卒の平均初任給（約350万円）
          baseIncome = 3500000 + Math.floor(Math.random() * 600000);
        } else if (newEducation === 'doctor') {
          // 博士卒の平均初任給（約400万円）
          baseIncome = 4000000 + Math.floor(Math.random() * 1000000);
        }
        
        newAgent.income = Math.floor((baseIncome) / 1000) * 1000;
      }
    }
    
    // 進学した場合、学生としての収入に調整
    if (
      (agent.education === 'highSchool' && newEducation === 'bachelorStudent') ||
      (agent.education === 'bachelor' && newEducation === 'masterStudent') ||
      (agent.education === 'master' && newEducation === 'doctorStudent')
    ) {
      // 学生のアルバイト収入（指定された確率分布に従う）
      newAgent.income = calculateStudentIncome();
    }
  }

  // 雇用状態の変化をチェック（確率を下げています）
  const shouldChangeEmployment = calculateEmploymentStatusChange(newAgent);
  if (shouldChangeEmployment) {
    newAgent.employed = !newAgent.employed;
    
    // 再就職の場合、前職の90-120%の収入を設定（下限を上げる）
    if (newAgent.employed) {
      const prevIncome = agent.income || 3000000; // 前職収入がない場合は300万円をベース
      const variationRate = 0.9 + Math.random() * 0.3; // 90-120%（修正前: 80-120%）
      newAgent.income = Math.floor((prevIncome * variationRate) / 1000) * 1000;
    } else {
      // 失業時は収入を完全にゼロにせず、基本的な所得保障を想定
      // 前の収入の10%程度を維持（失業保険など）
      newAgent.income = Math.floor((agent.income * 0.1) / 1000) * 1000;
    }
  }

  // 収入の更新（より緩やかな変動を実現）
  if (newAgent.employed) {
    // 学生の場合は収入の更新ロジックを変える
    if (newAgent.education.endsWith('Student')) {
      // 学生の場合、収入の変動は小さく
      const studentIncomeChange = (Math.random() - 0.5) * 0.02; // ±1%の変動
      newAgent.income = Math.floor((newAgent.income * (1 + studentIncomeChange)) / 1000) * 1000;
    } else {
      // 基本昇給率（年齢による調整）- 微増
      let baseIncreaseRate = 0;
      if (newAgent.age < 30) {
        baseIncreaseRate = 0.035; // 若手は年3.5%程度（修正前: 3%）
      } else if (newAgent.age < 40) {
        baseIncreaseRate = 0.025; // 30代は年2.5%程度（修正前: 2%）
      } else if (newAgent.age < 50) {
        baseIncreaseRate = 0.02; // 40代は年2%程度（修正前: 1.5%）
      } else if (newAgent.age < 60) {
        baseIncreaseRate = 0.015; // 50代は年1.5%程度（修正前: 1%）
      } else {
        baseIncreaseRate = 0.007; // 60代以上は年0.7%程度（修正前: 0.5%）
      }

      // 月次の基本昇給率に変換（年率を12で割る）
      baseIncreaseRate = baseIncreaseRate / 12;

      // スキルレベルと生産性による調整（影響を強める）
      const skillEffect = (newAgent.skillLevel - 0.5) * 0.002; // スキルレベルによる±0.2%の変動（修正前: 0.1%）
      const productivityEffect = (newAgent.productivity - 1) * 0.002; // 生産性による±0.2%の変動（修正前: 0.1%）
      
      // 最終的な月次昇給率を計算
      const monthlyIncreaseRate = baseIncreaseRate + skillEffect + productivityEffect;
      
      // 収入を更新（1000円未満切り捨て）
      // 変動の下限を-0.1%、上限を0.7%に制限（下降幅を半分に、上昇幅を増加）
      const finalRate = Math.max(-0.001, Math.min(0.007, monthlyIncreaseRate));
      newAgent.income = Math.floor((newAgent.income * (1 + finalRate)) / 1000) * 1000;
      
      // 初期の数ヶ月は特に収入の安定性を高める（シミュレーション開始時の急激な変動を防止）
      if (newAgent.age % 1 < 0.25) { // 最初の3ヶ月間（0.0833 × 3 = 約0.25）
        // 所得が下がる場合は、下降幅をさらに抑える
        if (finalRate < 0) {
          // 修正前の収入と新しい収入の平均を取る（下降を緩やかに）
          newAgent.income = Math.floor((agent.income + newAgent.income) / 2 / 1000) * 1000;
        }
      }
    }
  }

  return newAgent;
}

// 人口全体を更新
export function updatePopulation(agents: Agent[]): Agent[] {
  return agents.map(agent => updateAgent(agent));
} 