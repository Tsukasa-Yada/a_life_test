'use client';

import { useSimulation } from '@/contexts/SimulationContext';
import { calculateIncomeTax } from '@/utils/taxCalculator';
import EstatDataViewer from './EstatDataViewer';

export default function Dashboard() {
  const { agents, isRunning, hasStarted, startSimulation, pauseSimulation, resetSimulation } = useSimulation();

  // 金額をフォーマットする関数
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // 税額総額を計算
  const totalTax = agents.reduce((sum, agent) => sum + calculateIncomeTax(agent.income), 0);
  // 平均税額を計算
  const averageTax = agents.length > 0 ? Math.round(totalTax / agents.length) : 0;

  return (
    <div className="space-y-6">
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">ダッシュボード</h2>
          <div className="space-x-2">
            {!hasStarted ? (
              // 初期状態：開始ボタンのみ
              <button
                onClick={startSimulation}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                開始
              </button>
            ) : (
              // シミュレーション開始後：一時停止と初期化ボタン
              <>
                <button
                  onClick={resetSimulation}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  初期化
                </button>
                <button
                  onClick={isRunning ? pauseSimulation : startSimulation}
                  className={`px-4 py-2 ${
                    isRunning 
                      ? 'bg-yellow-500 hover:bg-yellow-600' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white rounded transition-colors`}
                >
                  {isRunning ? '一時停止' : '再開'}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">人口（生産年齢人口）</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{agents.length}人</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">平均年齢</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {agents.length > 0
                  ? Math.round(agents.reduce((sum, agent) => sum + agent.age, 0) / agents.length)
                  : 0}歳
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">平均年収</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {agents.length > 0
                  ? formatCurrency(Math.round(agents.reduce((sum, agent) => sum + agent.income, 0) / agents.length))
                  : formatCurrency(0)}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">平均所得税額</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(averageTax)}</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">所得税 税収総額</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(totalTax)}</p>
        </div>
      </div>

      {/* e-statデータ表示コンポーネント */}
      <EstatDataViewer />
    </div>
  );
} 