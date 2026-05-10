'use client';

import { useSimulation } from '@/contexts/SimulationContext';
import { useState, useMemo, useEffect } from 'react';
import { calculateIncomeTax } from '@/utils/taxCalculator';
import { Agent } from '@/types/agent';

// ソートキーの型定義を更新
type SortKey = 'id' | 'age' | 'income' | 'monthlyIncome' | 'tax' | 'employed' | 'education' | 'gender' | 'prefecture' | 'region';
type SortOrder = 'asc' | 'desc';

export default function AgentList() {
  const { agents, selectedAgent, setSelectedAgent, hasStarted } = useSimulation();
  const [sortKey, setSortKey] = useState<SortKey>('age');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [sampledAgentIds, setSampledAgentIds] = useState<number[]>([]);

  // ランダムに100体のエージェントを選択し、そのIDを保持
  const sampleSize = 100;

  // エージェントの変更を監視して、必要に応じてサンプリングを更新
  useEffect(() => {
    // エージェントが0の場合はサンプリングをクリア
    if (agents.length === 0) {
      setSampledAgentIds([]);
      return;
    }

    // 初期化後の再開始時または初回のサンプリング時
    if (agents.length > 0 && sampledAgentIds.length === 0) {
      const shuffled = [...agents].sort(() => 0.5 - Math.random());
      const sampled = shuffled.slice(0, sampleSize);
      const newSampledIds = sampled.map(agent => agent.id);
      setSampledAgentIds(newSampledIds);
    }
  }, [agents, sampledAgentIds.length]);

  // サンプリングされたエージェントを取得
  const sampledAgents = useMemo(() => {
    return agents.filter(agent => sampledAgentIds.includes(agent.id));
  }, [agents, sampledAgentIds]);

  // 金額をフォーマットする関数
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // 教育レベルを日本語に変換する関数
  const formatEducation = (education: Agent['education']): string => {
    return education === 'middleSchool' ? '中卒'
      : education === 'highSchoolStudent' ? '高校在学'
      : education === 'highSchool' ? '高校卒'
      : education === 'bachelorStudent' ? '大学在学'
      : education === 'bachelor' ? '大学卒'
      : education === 'masterStudent' ? '修士課程在学'
      : education === 'master' ? '修士'
      : education === 'doctorStudent' ? '博士課程在学'
      : '博士';
  };

  // 性別を日本語に変換する関数
  const formatGender = (gender: Agent['gender']): string => {
    return gender === 'male' ? '男性' : '女性';
  };

  // 月収を計算する関数を追加
  const calculateMonthlyIncome = (annualIncome: number): number => {
    // 賞与を考慮した月収計算
    // 一般的な日本企業の場合、基本給（月給）は年収の約1/15（賞与4ヶ月分を想定）
    return Math.floor(annualIncome / 15);
  };

  // ソート関数
  const sortAgents = (a: Agent, b: Agent): number => {
    let comparison = 0;
    
    switch (sortKey) {
      case 'id':
        comparison = Number(a.id) - Number(b.id);
        break;
      case 'age':
        comparison = a.age - b.age;
        break;
      case 'income':
        comparison = a.income - b.income;
        break;
      case 'monthlyIncome':
        comparison = calculateMonthlyIncome(a.income) - calculateMonthlyIncome(b.income);
        break;
      case 'tax':
        comparison = calculateIncomeTax(a.income) - calculateIncomeTax(b.income);
        break;
      case 'employed':
        comparison = (a.employed === b.employed) ? 0 : a.employed ? -1 : 1;
        break;
      case 'gender':
        comparison = a.gender.localeCompare(b.gender);
        break;
      case 'prefecture':
        comparison = a.prefecture.name.localeCompare(b.prefecture.name);
        break;
      case 'region':
        comparison = a.prefecture.region.localeCompare(b.prefecture.region);
        break;
      case 'education':
        // 教育レベルの順序を定義
        const eduOrder = {
          'middleSchool': 0,
          'highSchoolStudent': 1,
          'highSchool': 2,
          'bachelorStudent': 3,
          'bachelor': 4,
          'masterStudent': 5,
          'master': 6,
          'doctorStudent': 7,
          'doctor': 8
        };
        comparison = eduOrder[a.education] - eduOrder[b.education];
        break;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  };

  // ソート順を切り替える関数
  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  // ソートアイコンを表示する関数
  const renderSortIcon = (key: SortKey) => {
    if (sortKey !== key) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  const sortedAgents = [...sampledAgents].sort(sortAgents);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">エージェントリスト（ランダムサンプル100体）</h2>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-collapse border-t border-b dark:border-gray-700 whitespace-nowrap">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th 
                className="px-4 py-2 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 border-x border-b dark:border-gray-600 text-gray-900 dark:text-white"
                onClick={() => toggleSort('id')}
              >
                ID {renderSortIcon('id')}
              </th>
              <th 
                className="px-4 py-2 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 border-x border-b dark:border-gray-600 text-gray-900 dark:text-white"
                onClick={() => toggleSort('age')}
              >
                年齢 {renderSortIcon('age')}
              </th>
              <th 
                className="px-4 py-2 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 border-x border-b dark:border-gray-600 text-gray-900 dark:text-white"
                onClick={() => toggleSort('gender')}
              >
                性別 {renderSortIcon('gender')}
              </th>
              <th 
                className="px-4 py-2 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 border-x border-b dark:border-gray-600 text-gray-900 dark:text-white"
                onClick={() => toggleSort('prefecture')}
              >
                都道府県 {renderSortIcon('prefecture')}
              </th>
              <th 
                className="px-4 py-2 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 border-x border-b dark:border-gray-600 text-gray-900 dark:text-white"
                onClick={() => toggleSort('employed')}
              >
                雇用状況 {renderSortIcon('employed')}
              </th>
              <th 
                className="px-4 py-2 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 border-x border-b dark:border-gray-600 text-gray-900 dark:text-white"
                onClick={() => toggleSort('education')}
              >
                教育 {renderSortIcon('education')}
              </th>
              <th 
                className="px-4 py-2 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 border-x border-b dark:border-gray-600 text-gray-900 dark:text-white"
                onClick={() => toggleSort('income')}
              >
                年収 {renderSortIcon('income')}
              </th>
              <th 
                className="px-4 py-2 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 border-x border-b dark:border-gray-600 text-gray-900 dark:text-white"
                onClick={() => toggleSort('tax')}
              >
                所得税 {renderSortIcon('tax')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedAgents.map((agent, index) => {
              const tax = calculateIncomeTax(agent.income);
              return (
                <tr
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    selectedAgent?.id === agent.id ? 'bg-blue-50 dark:bg-blue-900' : ''
                  } text-gray-900 dark:text-gray-100`}
                >
                  <td className="px-4 py-2 text-center border-x dark:border-gray-700">{agent.id}</td>
                  <td className="px-4 py-2 text-center border-x dark:border-gray-700">{Math.floor(agent.age)}歳</td>
                  <td className="px-4 py-2 text-center border-x dark:border-gray-700">{formatGender(agent.gender)}</td>
                  <td className="px-4 py-2 text-center border-x dark:border-gray-700">{agent.prefecture.name}</td>
                  <td className="px-4 py-2 text-center border-x dark:border-gray-700">{agent.employed ? '就業中' : '未就業'}</td>
                  <td className="px-4 py-2 text-center border-x dark:border-gray-700">{formatEducation(agent.education)}</td>
                  <td className="px-4 py-2 text-center border-x dark:border-gray-700">{formatCurrency(agent.income)}</td>
                  <td className="px-4 py-2 text-center border-x dark:border-gray-700">{formatCurrency(tax)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
} 