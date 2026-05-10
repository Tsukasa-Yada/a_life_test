'use client';

import { Agent } from '@/types/agent';
import { useMemo } from 'react';
import { calculateIncomeTax } from '@/utils/taxCalculator';

// 収入税率ラベルのマッピング
const incomeTaxRateLabels: Record<string, string> = {
  low: '低い',
  medium: '標準',
  high: '高い',
  very_high: '非常に高い'
};

// 教育レベルのフォーマット関数
const formatEducation = (education: Agent['education']): string => {
  switch (education) {
    case 'middleSchool': return '中卒';
    case 'highSchoolStudent': return '高校生';
    case 'highSchool': return '高卒';
    case 'bachelorStudent': return '大学生';
    case 'bachelor': return '大卒';
    case 'masterStudent': return '修士課程';
    case 'master': return '修士';
    case 'doctorStudent': return '博士課程';
    case 'doctor': return '博士';
    default: return '不明';
  }
};

// 金額のフォーマット関数
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0
  }).format(amount);
};

const AgentDetail = ({ agent }: { agent: Agent | null }) => {
  const tax = useMemo(() => {
    if (!agent) return 0;
    return calculateIncomeTax(agent.income);
  }, [agent]);

  const incomeTaxRate = useMemo(() => {
    if (!agent) return 'medium';
    
    if (agent.income < 1950000) return 'low';
    if (agent.income < 6950000) return 'medium';
    if (agent.income < 18000000) return 'high';
    return 'very_high';
  }, [agent]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-auto h-full">
      {agent ? (
        <div>
          <h2 className="text-xl font-bold mb-4">エージェント #{agent.id} の詳細</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold">基本情報</h3>
              <ul className="space-y-2">
                <li><span className="font-medium">年齢:</span> {agent.age}歳</li>
                <li><span className="font-medium">性別:</span> {agent.gender === 'male' ? '男性' : '女性'}</li>
                <li><span className="font-medium">教育:</span> {formatEducation(agent.education)}</li>
                <li><span className="font-medium">居住地:</span> {agent.prefecture.name}（{agent.prefecture.region}）</li>
                <li><span className="font-medium">雇用状態:</span> {agent.employed ? '就業中' : '未就業'}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">経済状態</h3>
              <ul className="space-y-2">
                <li><span className="font-medium">年収:</span> {formatCurrency(agent.income)}</li>
                <li><span className="font-medium">月収（推定）:</span> {formatCurrency(agent.income / 12)}</li>
                <li><span className="font-medium">所得税率:</span> {incomeTaxRateLabels[incomeTaxRate]}</li>
                <li><span className="font-medium">年間所得税（推定）:</span> {formatCurrency(tax)}</li>
                <li><span className="font-medium">貯蓄:</span> {formatCurrency(agent.savings)}</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">スキル情報</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium">スキルレベル:</span> {Math.round(agent.skillLevel * 100)}%
              </div>
              <div>
                <span className="font-medium">生産性:</span> {Math.round(agent.productivity * 100)}%
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">エージェントを選択してください</p>
        </div>
      )}
    </div>
  );
};

export default AgentDetail; 