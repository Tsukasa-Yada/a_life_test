import { Agent } from '@/types/agent';

// エージェントの年齢による影響を計算
function calculateAgeEffects(agent: Agent): Partial<Agent> {
  return {
    skillLevel: Math.min(1, agent.skillLevel + 0.0005),
  };
}

// 雇用状態の変化確率を計算
function calculateEmploymentStatusChange(agent: Agent): boolean {
  // 定年退職（65歳以上）
  if (agent.age >= 65 && agent.employed) {
    return true; // 退職する
  }

  // 年齢層別の月次失業・退職確率（年間確率を12で割って月次に換算）
  const monthlyUnemploymentRates = {
    young: 0.003, // 34歳以下: 年間約3.6%
    middleAge: 0.002, // 35-44歳: 年間約2.4%
    senior: 0.001, // 45-54歳: 年間約1.2%
    elderly: 0.0015, // 55-64歳: 年間約1.8%
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

    // スキルレベルと生産性が低い場合、失業確率が上昇
    if (agent.skillLevel < 0.3 || agent.productivity < 0.7) {
      unemploymentRate *= 1.5;
    }

    return Math.random() < unemploymentRate;
  } else {
    // 再就職確率（年齢による調整）
    let reemploymentRate = 0.08; // 基本: 月間8%
    
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

  // 雇用状態の変化をチェック
  const shouldChangeEmployment = calculateEmploymentStatusChange(newAgent);
  if (shouldChangeEmployment) {
    newAgent.employed = !newAgent.employed;
    
    // 再就職の場合、前職の80-120%の収入を設定
    if (newAgent.employed) {
      const prevIncome = agent.income || 3000000; // 前職収入がない場合は300万円をベース
      const variationRate = 0.8 + Math.random() * 0.4; // 80-120%
      newAgent.income = Math.floor((prevIncome * variationRate) / 1000) * 1000;
    } else {
      newAgent.income = 0; // 失業時は収入ゼロ
    }
  }

  // 収入の更新（より緩やかな変動を実現）
  if (newAgent.employed) {
    // 基本昇給率（年齢による調整）
    let baseIncreaseRate = 0;
    if (newAgent.age < 30) {
      baseIncreaseRate = 0.03; // 若手は年3%程度
    } else if (newAgent.age < 40) {
      baseIncreaseRate = 0.02; // 30代は年2%程度
    } else if (newAgent.age < 50) {
      baseIncreaseRate = 0.015; // 40代は年1.5%程度
    } else if (newAgent.age < 60) {
      baseIncreaseRate = 0.01; // 50代は年1%程度
    } else {
      baseIncreaseRate = 0.005; // 60代以上は年0.5%程度
    }

    // 月次の基本昇給率に変換（年率を12で割る）
    baseIncreaseRate = baseIncreaseRate / 12;

    // スキルレベルと生産性による調整
    const skillEffect = (newAgent.skillLevel - 0.5) * 0.001; // スキルレベルによる±0.1%の変動
    const productivityEffect = (newAgent.productivity - 1) * 0.001; // 生産性による±0.1%の変動
    
    // 最終的な月次昇給率を計算
    const monthlyIncreaseRate = baseIncreaseRate + skillEffect + productivityEffect;
    
    // 収入を更新（1000円未満切り捨て）
    // 変動の下限を-0.2%、上限を0.5%に制限
    const finalRate = Math.max(-0.002, Math.min(0.005, monthlyIncreaseRate));
    newAgent.income = Math.floor((newAgent.income * (1 + finalRate)) / 1000) * 1000;
  }

  return newAgent;
}

// 人口全体を更新
export function updatePopulation(agents: Agent[]): Agent[] {
  return agents.map(agent => updateAgent(agent));
} 