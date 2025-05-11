'use client';

import { useMemo, useState } from 'react';

// エージェントの型定義
interface Agent {
  personalIncome: number;
  savings: number;
  monthlyExpenses: number;
  employmentStatus: 'employed' | 'unemployed';
  consumerConfidence: number;
  totalAssets: number;
}

export default function MacroEconomicIndicators() {
  // ダミーデータを使用（後で実際のデータに置き換え可能）
  const [agents] = useState<Agent[]>([]);
  const [timeStep] = useState<number>(0);

  const indicators = useMemo(() => {
    if (agents.length === 0) return null;

    // 平均値の計算
    const averageIncome = agents.reduce((sum: number, agent: Agent) => sum + agent.personalIncome, 0) / agents.length;
    const averageSavings = agents.reduce((sum: number, agent: Agent) => sum + agent.savings, 0) / agents.length;
    const averageConsumption = agents.reduce((sum: number, agent: Agent) => sum + agent.monthlyExpenses, 0) / agents.length;
    
    // 失業率の計算
    const unemploymentRate = agents.filter((agent: Agent) => agent.employmentStatus === 'unemployed').length / agents.length;
    
    // 消費者信頼感指数の計算（0-100のスケール）
    const consumerConfidence = (agents.reduce((sum: number, agent: Agent) => sum + agent.consumerConfidence, 0) / agents.length) * 100;
    
    // 資産格差（ジニ係数の簡易計算）
    const sortedAssets = [...agents].sort((a: Agent, b: Agent) => a.totalAssets - b.totalAssets);
    let sumAssets = 0;
    let cumulativeAssets = 0;

    sortedAssets.forEach((agent: Agent) => { sumAssets += agent.totalAssets; });
    let giniCoefficient = 0;
    for (let i = 0; i < sortedAssets.length; i++) {
      cumulativeAssets += sortedAssets[i].totalAssets;
      giniCoefficient += (i + 1) / agents.length - cumulativeAssets / sumAssets;
    }
    giniCoefficient = 2 * giniCoefficient / agents.length;

    return {
      averageIncome: Math.round(averageIncome).toLocaleString(),
      averageSavings: Math.round(averageSavings).toLocaleString(),
      averageConsumption: Math.round(averageConsumption).toLocaleString(),
      unemploymentRate: (unemploymentRate * 100).toFixed(1),
      consumerConfidence: Math.round(consumerConfidence),
      giniCoefficient: giniCoefficient.toFixed(3)
    };
  }, [agents]);

  if (!indicators) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">マクロ経済指標</h2>
        <span className="text-gray-500">タイムステップ: {timeStep}</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-sm text-gray-500">平均年収</h3>
          <p className="text-xl font-semibold">¥{indicators.averageIncome}</p>
        </div>
        
        <div>
          <h3 className="text-sm text-gray-500">平均貯蓄額</h3>
          <p className="text-xl font-semibold">¥{indicators.averageSavings}</p>
        </div>
        
        <div>
          <h3 className="text-sm text-gray-500">平均月間消費額</h3>
          <p className="text-xl font-semibold">¥{indicators.averageConsumption}</p>
        </div>
        
        <div>
          <h3 className="text-sm text-gray-500">失業率</h3>
          <p className="text-xl font-semibold">{indicators.unemploymentRate}%</p>
        </div>
        
        <div>
          <h3 className="text-sm text-gray-500">消費者信頼感指数</h3>
          <p className="text-xl font-semibold">{indicators.consumerConfidence}</p>
        </div>
        
        <div>
          <h3 className="text-sm text-gray-500">資産ジニ係数</h3>
          <p className="text-xl font-semibold">{indicators.giniCoefficient}</p>
        </div>
      </div>
    </div>
  );
} 