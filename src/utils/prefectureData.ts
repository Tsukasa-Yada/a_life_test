// 都道府県データと所得・貯蓄の地域差データ

// 都道府県コード、名称、地域ブロック
export interface Prefecture {
  code: string;
  name: string;
  region: Region;
  populationRatio: number; // 全国に対する人口割合（％）
  incomeRatio: number;    // 全国平均を1.0とした時の所得比率
  savingsRatio: number;   // 全国平均を1.0とした時の貯蓄比率
}

// 地域ブロック
export type Region = 
  | '北海道'
  | '東北'
  | '関東'
  | '中部'
  | '近畿'
  | '中国'
  | '四国'
  | '九州・沖縄';

// 地域ブロックごとの所得・貯蓄の調整係数
export const regionAdjustment: Record<Region, { income: number, savings: number }> = {
  '北海道': { income: 0.90, savings: 0.85 },
  '東北': { income: 0.85, savings: 0.80 },
  '関東': { income: 1.25, savings: 1.30 },
  '中部': { income: 1.05, savings: 1.10 },
  '近畿': { income: 1.10, savings: 1.15 },
  '中国': { income: 0.95, savings: 0.95 },
  '四国': { income: 0.85, savings: 0.80 },
  '九州・沖縄': { income: 0.90, savings: 0.85 }
};

// 都道府県データ
// 人口割合は2020年の国勢調査をベースに概算
// 所得・貯蓄比率は e-stat の県民経済計算、家計調査などから算出した相対値
export const prefectures: Prefecture[] = [
  { code: '01', name: '北海道', region: '北海道', populationRatio: 0, incomeRatio: 0.90, savingsRatio: 0.85 },
  
  { code: '02', name: '青森県', region: '東北', populationRatio: 0, incomeRatio: 0.80, savingsRatio: 0.75 },
  { code: '03', name: '岩手県', region: '東北', populationRatio: 0, incomeRatio: 0.82, savingsRatio: 0.78 },
  { code: '04', name: '宮城県', region: '東北', populationRatio: 0, incomeRatio: 0.88, savingsRatio: 0.83 },
  { code: '05', name: '秋田県', region: '東北', populationRatio: 0, incomeRatio: 0.80, savingsRatio: 0.78 },
  { code: '06', name: '山形県', region: '東北', populationRatio: 0, incomeRatio: 0.83, savingsRatio: 0.80 },
  { code: '07', name: '福島県', region: '東北', populationRatio: 0, incomeRatio: 0.85, savingsRatio: 0.82 },
  
  { code: '08', name: '茨城県', region: '関東', populationRatio: 0, incomeRatio: 1.05, savingsRatio: 1.10 },
  { code: '09', name: '栃木県', region: '関東', populationRatio: 0, incomeRatio: 1.03, savingsRatio: 1.08 },
  { code: '10', name: '群馬県', region: '関東', populationRatio: 0, incomeRatio: 1.02, savingsRatio: 1.05 },
  { code: '11', name: '埼玉県', region: '関東', populationRatio: 0, incomeRatio: 1.15, savingsRatio: 1.20 },
  { code: '12', name: '千葉県', region: '関東', populationRatio: 0, incomeRatio: 1.15, savingsRatio: 1.20 },
  { code: '13', name: '東京都', region: '関東', populationRatio: 0, incomeRatio: 1.40, savingsRatio: 1.45 },
  { code: '14', name: '神奈川県', region: '関東', populationRatio: 0, incomeRatio: 1.30, savingsRatio: 1.35 },
  
  { code: '15', name: '新潟県', region: '中部', populationRatio: 0, incomeRatio: 0.93, savingsRatio: 0.95 },
  { code: '16', name: '富山県', region: '中部', populationRatio: 0, incomeRatio: 1.02, savingsRatio: 1.15 },
  { code: '17', name: '石川県', region: '中部', populationRatio: 0, incomeRatio: 1.00, savingsRatio: 1.10 },
  { code: '18', name: '福井県', region: '中部', populationRatio: 0, incomeRatio: 0.97, savingsRatio: 1.05 },
  { code: '19', name: '山梨県', region: '中部', populationRatio: 0, incomeRatio: 0.95, savingsRatio: 1.00 },
  { code: '20', name: '長野県', region: '中部', populationRatio: 0, incomeRatio: 0.97, savingsRatio: 1.05 },
  { code: '21', name: '岐阜県', region: '中部', populationRatio: 0, incomeRatio: 0.98, savingsRatio: 1.05 },
  { code: '22', name: '静岡県', region: '中部', populationRatio: 0, incomeRatio: 1.05, savingsRatio: 1.10 },
  { code: '23', name: '愛知県', region: '中部', populationRatio: 0, incomeRatio: 1.15, savingsRatio: 1.20 },
  
  { code: '24', name: '三重県', region: '近畿', populationRatio: 0, incomeRatio: 1.00, savingsRatio: 1.05 },
  { code: '25', name: '滋賀県', region: '近畿', populationRatio: 0, incomeRatio: 1.05, savingsRatio: 1.10 },
  { code: '26', name: '京都府', region: '近畿', populationRatio: 0, incomeRatio: 1.05, savingsRatio: 1.10 },
  { code: '27', name: '大阪府', region: '近畿', populationRatio: 0, incomeRatio: 1.15, savingsRatio: 1.10 },
  { code: '28', name: '兵庫県', region: '近畿', populationRatio: 0, incomeRatio: 1.10, savingsRatio: 1.15 },
  { code: '29', name: '奈良県', region: '近畿', populationRatio: 0, incomeRatio: 1.00, savingsRatio: 1.05 },
  { code: '30', name: '和歌山県', region: '近畿', populationRatio: 0, incomeRatio: 0.92, savingsRatio: 0.95 },
  
  { code: '31', name: '鳥取県', region: '中国', populationRatio: 0, incomeRatio: 0.85, savingsRatio: 0.85 },
  { code: '32', name: '島根県', region: '中国', populationRatio: 0, incomeRatio: 0.85, savingsRatio: 0.85 },
  { code: '33', name: '岡山県', region: '中国', populationRatio: 0, incomeRatio: 0.95, savingsRatio: 0.95 },
  { code: '34', name: '広島県', region: '中国', populationRatio: 0, incomeRatio: 1.00, savingsRatio: 1.00 },
  { code: '35', name: '山口県', region: '中国', populationRatio: 0, incomeRatio: 0.95, savingsRatio: 0.95 },
  
  { code: '36', name: '徳島県', region: '四国', populationRatio: 0, incomeRatio: 0.88, savingsRatio: 0.85 },
  { code: '37', name: '香川県', region: '四国', populationRatio: 0, incomeRatio: 0.90, savingsRatio: 0.90 },
  { code: '38', name: '愛媛県', region: '四国', populationRatio: 0, incomeRatio: 0.88, savingsRatio: 0.85 },
  { code: '39', name: '高知県', region: '四国', populationRatio: 0, incomeRatio: 0.85, savingsRatio: 0.80 },
  
  { code: '40', name: '福岡県', region: '九州・沖縄', populationRatio: 0, incomeRatio: 0.95, savingsRatio: 0.90 },
  { code: '41', name: '佐賀県', region: '九州・沖縄', populationRatio: 0, incomeRatio: 0.88, savingsRatio: 0.85 },
  { code: '42', name: '長崎県', region: '九州・沖縄', populationRatio: 0, incomeRatio: 0.87, savingsRatio: 0.80 },
  { code: '43', name: '熊本県', region: '九州・沖縄', populationRatio: 0, incomeRatio: 0.90, savingsRatio: 0.85 },
  { code: '44', name: '大分県', region: '九州・沖縄', populationRatio: 0, incomeRatio: 0.88, savingsRatio: 0.82 },
  { code: '45', name: '宮崎県', region: '九州・沖縄', populationRatio: 0, incomeRatio: 0.85, savingsRatio: 0.80 },
  { code: '46', name: '鹿児島県', region: '九州・沖縄', populationRatio: 0, incomeRatio: 0.85, savingsRatio: 0.80 },
  { code: '47', name: '沖縄県', region: '九州・沖縄', populationRatio: 0, incomeRatio: 0.82, savingsRatio: 0.75 },
];

// 人口割合に基づいて都道府県を選択する関数
export function selectPrefectureByPopulationRatio(): Prefecture {
  // 0-100の乱数を生成
  const rand = Math.random() * 100;
  let cumulativeRatio = 0;
  
  // 累積割合を計算し、乱数が当てはまる都道府県を返す
  for (const prefecture of prefectures) {
    cumulativeRatio += prefecture.populationRatio;
    if (rand < cumulativeRatio) {
      return prefecture;
    }
  }
  
  // 念のためのフォールバック（通常はここに到達しない）
  return prefectures[0];
}

import { fetchPrefecturePopulations } from './estatApi';

/**
 * e-Stat APIから都道府県人口を取得し、prefectures配列のpopulationRatioを動的に初期化
 */
export async function initializePrefecturePopulationRatios() {
  const apiPopulations = await fetchPrefecturePopulations();
  const total = apiPopulations.reduce((sum, p) => sum + p.population, 0);
  for (const pref of prefectures) {
    const found = apiPopulations.find(p => p.name === pref.name || p.code === pref.code);
    if (found) {
      pref.populationRatio = +(found.population / total * 100).toFixed(2); // %で小数2桁
    }
  }
} 