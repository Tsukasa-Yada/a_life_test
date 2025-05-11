'use client';

import { useSimulation } from '@/contexts/SimulationContext';
import { calculateIncomeTax, calculateEmploymentDeduction, calculateTotalDeductions, getTaxRateAndDeduction } from '@/utils/taxCalculator';

export default function AgentDetails() {
  const { selectedAgent } = useSimulation();

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
    return `${Math.round(value * 100)}%`;
  };

  // 税額の計算内訳を取得する関数
  const getTaxBreakdown = (income: number) => {
    // 学生アルバイトの場合（103万円以下）は課税なし
    if (income <= 1030000) {
      return {
        income,
        employmentDeduction: 0,
        basicDeduction: 0,
        totalDeductions: 0,
        taxableIncome: 0,
        taxRate: 0,
        taxDeduction: 0,
        tax: 0,
        isStudent: true
      };
    }

    const employmentDeduction = calculateEmploymentDeduction(income);
    const totalDeductions = calculateTotalDeductions(income);
    // 課税所得金額は1000円未満切り捨て
    const taxableIncome = Math.floor((Math.max(0, income - totalDeductions)) / 1000) * 1000;
    const { rate, deduction } = getTaxRateAndDeduction(taxableIncome);
    const tax = Math.floor(taxableIncome * rate - deduction);

    return {
      income,
      employmentDeduction,
      basicDeduction: 480000, // 基礎控除
      totalDeductions,
      taxableIncome,
      taxRate: rate,
      taxDeduction: deduction,
      tax,
      isStudent: false
    };
  };

  if (!selectedAgent) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md sticky top-4">
        <p className="text-gray-500 dark:text-gray-400">エージェントが選択されていません</p>
      </div>
    );
  }

  const taxBreakdown = getTaxBreakdown(selectedAgent.income);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">エージェント詳細</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">基本情報</h3>
            <dl className="space-y-2">
              <div>
                <dt className="text-gray-600 dark:text-gray-400">ID</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{selectedAgent.id}</dd>
              </div>
              <div>
                <dt className="text-gray-600 dark:text-gray-400">年齢</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{Math.floor(selectedAgent.age)}歳</dd>
              </div>
              <div>
                <dt className="text-gray-600 dark:text-gray-400">性別</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{selectedAgent.gender === 'male' ? '男性' : '女性'}</dd>
              </div>
              <div>
                <dt className="text-gray-600 dark:text-gray-400">教育</dt>
                <dd className="font-medium text-gray-900 dark:text-white">
                  {selectedAgent.education === 'highSchoolStudent' ? '高校在学'
                    : selectedAgent.education === 'highSchool' ? '高校卒'
                    : selectedAgent.education === 'bachelorStudent' ? '大学在学'
                    : selectedAgent.education === 'bachelor' ? '大学卒'
                    : selectedAgent.education === 'masterStudent' ? '修士課程在学'
                    : selectedAgent.education === 'master' ? '修士'
                    : selectedAgent.education === 'doctorStudent' ? '博士課程在学'
                    : '博士'}
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">経済状態</h3>
            <dl className="space-y-2">
              <div>
                <dt className="text-gray-600 dark:text-gray-400">年収</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{formatCurrency(selectedAgent.income)}</dd>
              </div>
              <div>
                <dt className="text-gray-600 dark:text-gray-400">貯蓄</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{formatCurrency(selectedAgent.savings)}</dd>
              </div>
              <div>
                <dt className="text-gray-600 dark:text-gray-400">雇用状態</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{selectedAgent.employed ? '就業中' : '未就業'}</dd>
              </div>
              <div>
                <dt className="text-gray-600 dark:text-gray-400">スキルレベル</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{formatPercentage(selectedAgent.skillLevel)}</dd>
              </div>
              <div>
                <dt className="text-gray-600 dark:text-gray-400">生産性</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{formatPercentage(selectedAgent.productivity)}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">所得税計算</h3>
          <dl className="space-y-2">
            {taxBreakdown.isStudent ? (
              <div>
                <dt className="text-gray-600 dark:text-gray-400">非課税（103万円以下）</dt>
                <dd className="font-medium text-gray-900 dark:text-white">所得税額: {formatCurrency(0)}</dd>
              </div>
            ) : (
              <>
                <div>
                  <dt className="text-gray-600 dark:text-gray-400">収入</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">{formatCurrency(taxBreakdown.income)}</dd>
                </div>
                <div>
                  <dt className="text-gray-600 dark:text-gray-400">給与所得控除</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">{formatCurrency(taxBreakdown.employmentDeduction)}</dd>
                </div>
                <div>
                  <dt className="text-gray-600 dark:text-gray-400">基礎控除</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">{formatCurrency(taxBreakdown.basicDeduction)}</dd>
                </div>
                <div className="grid grid-cols-2 border-t border-gray-200 dark:border-gray-700 pt-2">
                  <dt className="text-gray-600 dark:text-gray-400">課税所得金額</dt>
                  <dd>
                    <div className="font-medium text-gray-900 dark:text-white">{formatCurrency(taxBreakdown.taxableIncome)}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      = 収入 - (給与所得控除 + 基礎控除)
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      = {formatCurrency(taxBreakdown.income)} - ({formatCurrency(taxBreakdown.employmentDeduction)} + {formatCurrency(taxBreakdown.basicDeduction)})
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      ※ 1,000円未満の端数は切り捨て
                    </div>
                  </dd>
                </div>
                <div className="grid grid-cols-2">
                  <dt className="text-gray-600 dark:text-gray-400">適用税率</dt>
                  <dd>
                    <div className="font-medium text-gray-900 dark:text-white">{Math.round(taxBreakdown.taxRate * 100)}%</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {taxBreakdown.taxableIncome <= 1950000 ? '課税所得 ≦ 195万円'
                        : taxBreakdown.taxableIncome <= 3300000 ? '課税所得 ≦ 330万円'
                        : taxBreakdown.taxableIncome <= 6950000 ? '課税所得 ≦ 695万円'
                        : taxBreakdown.taxableIncome <= 9000000 ? '課税所得 ≦ 900万円'
                        : taxBreakdown.taxableIncome <= 18000000 ? '課税所得 ≦ 1,800万円'
                        : taxBreakdown.taxableIncome <= 40000000 ? '課税所得 ≦ 4,000万円'
                        : '課税所得 > 4,000万円'}
                    </div>
                  </dd>
                </div>
                <div className="grid grid-cols-2 border-t border-gray-200 dark:border-gray-700 pt-2">
                  <dt className="text-gray-600 dark:text-gray-400 font-semibold">算出所得税額</dt>
                  <dd>
                    <div className="font-medium text-blue-600 dark:text-blue-400">{formatCurrency(taxBreakdown.tax)}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      = 課税所得金額 × 税率 - 控除額
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      = {formatCurrency(taxBreakdown.taxableIncome)} × {Math.round(taxBreakdown.taxRate * 100)}% - {formatCurrency(taxBreakdown.taxDeduction)}
                    </div>
                  </dd>
                </div>
              </>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
} 