'use client';

import { useSimulation } from '@/contexts/SimulationContext';
import { calculateIncomeTax } from '@/utils/taxCalculator';

export default function TaxReformEffects() {
  const { agents, taxReformEnabled } = useSimulation();

  // 金額をフォーマットする関数
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // パーセンテージをフォーマットする関数
  const formatPercentage = (value: number): string => {
    return `${(value * 100).toFixed(2)}%`;
  };

  // 人口に対する割合をフォーマットする関数
  const formatPopulationPercentage = (count: number): string => {
    return `（総人口の${((count / agents.length) * 100).toFixed(2)}%）`;
  };

  // 改正前後の税収を計算
  const calculateTaxRevenue = (reformed: boolean) => {
    return agents.reduce((sum, agent) => sum + calculateIncomeTax(agent.income, reformed), 0);
  };

  // 影響を受ける人数を計算（非課税化される人数）
  const newlyTaxExemptPeople = agents.filter(agent => 
    agent.income > 1030000 && agent.income <= 1780000
  ).length;

  // 税額が減少する人数を計算（全納税者）
  const taxReductionPeople = agents.filter(agent => 
    agent.income > 1030000 && 
    calculateIncomeTax(agent.income, true) < calculateIncomeTax(agent.income, false)
  ).length;

  // 平均税額減少額を計算（178万円超の納税者のみ）
  const highIncomeAgents = agents.filter(agent => agent.income > 1780000);
  const totalTaxReduction = highIncomeAgents.reduce((sum, agent) => {
    const originalTax = calculateIncomeTax(agent.income, false);
    const reformedTax = calculateIncomeTax(agent.income, true);
    return sum + (originalTax - reformedTax);
  }, 0);
  const averageTaxReduction = highIncomeAgents.length > 0 
    ? totalTaxReduction / highIncomeAgents.length 
    : 0;

  // 改正前後の税収
  const beforeTaxRevenue = calculateTaxRevenue(false);
  const afterTaxRevenue = calculateTaxRevenue(true);
  const taxRevenueChange = afterTaxRevenue - beforeTaxRevenue;
  const taxRevenueChangeRate = (afterTaxRevenue / beforeTaxRevenue) - 1;

  if (!taxReformEnabled) return null;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">税制改正効果分析</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">税収への影響</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-gray-600 dark:text-gray-400">改正前の税収</dt>
              <dd className="font-medium text-gray-900 dark:text-white">{formatCurrency(beforeTaxRevenue)}</dd>
            </div>
            <div>
              <dt className="text-gray-600 dark:text-gray-400">改正後の税収</dt>
              <dd className="font-medium text-gray-900 dark:text-white">{formatCurrency(afterTaxRevenue)}</dd>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
              <dt className="text-gray-600 dark:text-gray-400">税収の変化</dt>
              <dd className={`font-medium ${taxRevenueChange < 0 ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`}>
                {formatCurrency(taxRevenueChange)}
                <span className="text-sm ml-2">({formatPercentage(taxRevenueChangeRate)})</span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">非課税者数への影響</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-gray-600 dark:text-gray-400">新たに非課税となる人数</dt>
              <dd className="font-medium text-gray-900 dark:text-white">
                {newlyTaxExemptPeople.toLocaleString()}人
                <span className="text-sm ml-2">{formatPopulationPercentage(newlyTaxExemptPeople)}</span>
              </dd>
            </div>
            <div>
              <dt className="text-gray-600 dark:text-gray-400">税負担が軽減される人数</dt>
              <dd className="font-medium text-gray-900 dark:text-white">
                {taxReductionPeople.toLocaleString()}人
                <span className="text-sm ml-2">{formatPopulationPercentage(taxReductionPeople)}</span>
              </dd>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
              <dt className="text-gray-600 dark:text-gray-400">178万円超の納税者の平均税額減少</dt>
              <dd className="font-medium text-blue-600 dark:text-blue-400">{formatCurrency(averageTaxReduction)}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">政策効果の概要</h3>
        <div className="space-y-2 text-gray-600 dark:text-gray-300">
          <p>
            基礎控除額を103万円から178万円に引き上げることで、以下の効果が見られます：
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>
              年収103万円超178万円以下の就業者が新たに非課税となり、「103万円の壁」が緩和されます。
              対象となる人数は{newlyTaxExemptPeople.toLocaleString()}人{formatPopulationPercentage(newlyTaxExemptPeople)}です。
            </li>
            <li>
              178万円を超える所得がある納税者についても、基礎控除額の引き上げにより税負担が平均{formatCurrency(averageTaxReduction)}軽減されます。
            </li>
            <li>
              全体として、税収は{formatCurrency(Math.abs(taxRevenueChange))}
              （{formatPercentage(Math.abs(taxRevenueChangeRate))}）減少する一方、
              {taxReductionPeople.toLocaleString()}人{formatPopulationPercentage(taxReductionPeople)}の税負担が軽減されます。
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 