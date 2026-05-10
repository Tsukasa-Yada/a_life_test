'use client';

import { useSimulation } from '@/contexts/SimulationContext';
import { calculateIncomeTax } from '@/utils/taxCalculator';
import EstatDataViewer from './EstatDataViewer';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { TooltipItem } from 'chart.js';
import { useIncomeDistribution } from '@/contexts/IncomeDistributionContext';
import React, { useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// 折りたたみ可能なセクションコンポーネント
function CollapsibleSection({ 
  title, 
  children, 
  defaultOpen = false 
}: { 
  title: string; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <button
        className="w-full px-5 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function IncomeDistributionSettings() {
  const { incomeBrackets, setIncomeBrackets, resetIncomeBrackets } = useIncomeDistribution();
  const [localBrackets, setLocalBrackets] = useState(incomeBrackets.map(b => ({ ...b })));
  const [isValid, setIsValid] = useState(true);

  // 入力変更時
  const handleProbChange = (idx: number, value: number) => {
    // 入力値を0から1の範囲内に制限
    const validValue = Math.max(0, Math.min(1, value));
    const updated = localBrackets.map((b, i) => i === idx ? { ...b, prob: validValue } : b);
    setLocalBrackets(updated);
    
    // 合計が1.0（100%）に近いかチェック（許容誤差: 0.01）
    const total = updated.reduce((sum, b) => sum + b.prob, 0);
    setIsValid(Math.abs(total - 1.0) < 0.01);
  };

  // 保存
  const handleSave = () => {
    if (isValid) {
      setIncomeBrackets(localBrackets);
    }
  };

  // リセット
  const handleReset = () => {
    setLocalBrackets(incomeBrackets.map(b => ({ ...b })));
    resetIncomeBrackets();
    setIsValid(true);
  };

  // 合計確率
  const totalProb = localBrackets.reduce((sum, b) => sum + b.prob, 0);
  
  // 表示用フォーマッター
  const formatAmount = (amount: number) => {
    return amount >= 10000000 
      ? `${(amount / 10000000).toFixed(1)}億円` 
      : `${(amount / 10000).toFixed(0)}万円`;
  };

  // 区分名を生成
  const getBracketLabel = (min: number, max: number, index: number) => {
    if (index === 0) return '100万円未満';
    if (index === localBrackets.length - 1) return '2000万円以上';
    return `${min/10000}〜${max/10000}万円`;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600">※シミュレーション開始前に調整可能</p>
      </div>
      
      <div className="mb-4">
        <div className="bg-blue-50 p-3 rounded border border-blue-200 text-sm">
          <p>各区分の<span className="font-semibold">割合（%）</span>を直接入力で調整できます。</p>
          <p>合計が100%になるように調整してください（現在: <span className={`font-semibold ${isValid ? 'text-green-600' : 'text-red-600'}`}>{(totalProb * 100).toFixed(1)}%</span>）</p>
        </div>
      </div>
      
      <div className="overflow-y-auto max-h-[400px] pr-2">
        <table className="w-full mb-4">
          <thead className="bg-gray-50 text-xs sticky top-0">
            <tr>
              <th className="px-2 py-1 border-b text-left">所得区分</th>
              <th className="px-2 py-1 border-b text-right w-24">割合（%）</th>
              <th className="px-2 py-1 border-b w-48">調整</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {localBrackets.map((b, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-2 py-2 border-b">
                  {getBracketLabel(b.min, b.max, i)}
                </td>
                <td className="px-2 py-2 border-b text-right font-mono">
                  {(b.prob * 100).toFixed(1)}%
                </td>
                <td className="px-2 py-2 border-b">
                  <input 
                    type="number" 
                    min="0" 
                    max="100" 
                    step="0.1"
                    value={(b.prob * 100).toFixed(1)}
                    onChange={e => handleProbChange(i, Number(e.target.value) / 100)}
                    className="w-20 px-2 py-1 border rounded text-right"
                  />
                  <span className="ml-1">%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm font-medium">
          合計: <span className={isValid ? 'text-green-600' : 'text-red-600'}>{(totalProb * 100).toFixed(1)}%</span>
          {!isValid && <span className="ml-2 text-red-500">※合計が100%になるように調整してください</span>}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleReset} 
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 transition-colors text-sm"
          >
            リセット
          </button>
          <button 
            onClick={handleSave} 
            disabled={!isValid}
            className={`px-3 py-1 rounded text-white text-sm ${isValid 
              ? 'bg-blue-500 hover:bg-blue-600' 
              : 'bg-blue-300 cursor-not-allowed'}`}
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}

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

  // 年収分布ヒストグラム用データ生成
  const incomeBins = [
    0, 1000000, 2000000, 3000000, 4000000, 5000000, 6000000, 7000000, 8000000, 9000000, 10000000,
    11000000, 12000000, 13000000, 14000000, 15000000, 16000000, 17000000, 18000000, 19000000, 20000000
  ];
  const incomeLabels = [
    '100万円未満',
    '100~200万円',
    '200~300万円',
    '300~400万円',
    '400~500万円',
    '500~600万円',
    '600~700万円',
    '700~800万円',
    '800~900万円',
    '900~1000万円',
    '1000~1100万円',
    '1100~1200万円',
    '1200~1300万円',
    '1300~1400万円',
    '1400~1500万円',
    '1500~1600万円',
    '1600~1700万円',
    '1700~1800万円',
    '1800~1900万円',
    '1900~2000万円',
    '2000万円~'
  ];
  const incomeHistogram = new Array(incomeLabels.length).fill(0);
  if (!isRunning && agents.length > 0) {
    agents.forEach(agent => {
      const income = agent.income;
      let bin = incomeBins.findIndex((v, i) => income < (incomeBins[i + 1] ?? Infinity));
      if (bin === -1) bin = incomeLabels.length - 1;
      incomeHistogram[bin]++;
    });
  }
  const incomeData = {
    labels: incomeLabels,
    datasets: [
      {
        label: '人数',
        data: incomeHistogram,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };
  const incomeOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: '年収分布（シミュレーション一時停止時）' },
      tooltip: {
        callbacks: {
          label: function(context: TooltipItem<'bar'>) {
            const value = context.parsed.y;
            const total = incomeHistogram.reduce((a, b) => a + b, 0);
            const percent = total > 0 ? ((value / total) * 100).toFixed(2) : '0.00';
            return `人数: ${value}人 (${percent}%)`;
          }
        }
      }
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: '人数' } },
      x: { title: { display: true, text: '年間収入額' } },
    },
  };

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

      {/* 年収分布設定UI（折りたたみ可能） */}
      {!hasStarted && (
        <CollapsibleSection title="年収分布設定" defaultOpen={true}>
          <IncomeDistributionSettings />
        </CollapsibleSection>
      )}

      {/* 都道府県別人口推計（折りたたみ可能） */}
      <CollapsibleSection title="都道府県別人口推計" defaultOpen={false}>
        <EstatDataViewer />
      </CollapsibleSection>

      {/* 年収分布ヒストグラム（折りたたみ可能・一時停止時のみ表示） */}
      {hasStarted && !isRunning && agents.length > 0 && (
        <CollapsibleSection title="年収分布ヒストグラム" defaultOpen={true}>
          <div className="mb-2 text-sm text-gray-500 italic">
            ※シミュレーション一時停止中の分布データを表示しています
          </div>
          <Bar data={incomeData} options={incomeOptions} />
        </CollapsibleSection>
      )}
    </div>
  );
} 