'use client';

import { useState, useEffect } from 'react';
import { STATS_DATA_IDS, processEstatData } from '@/utils/estatApi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Label as RechartsLabel,
} from 'recharts';

interface ChartDataItem {
  areaLabel: string; // 都道府県名
  [key: string]: number | string;
}

const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
];

const REGIONS = {
  '北海道': ['北海道'],
  '東北': ['青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'],
  '関東': ['茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県'],
  '中部': ['新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県'],
  '近畿': ['三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県'],
  '中国': ['鳥取県', '島根県', '岡山県', '広島県', '山口県'],
  '四国': ['徳島県', '香川県', '愛媛県', '高知県'],
  '九州沖縄': ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県']
};

const CACHE_KEY = 'estat_population_estimate_chart_cache';

// 都道府県コードと名称のマッピング
const PREFECTURE_CODE_MAP: Record<string, string> = {
  '00000': '全国',
  '01000': '北海道',
  '02000': '青森県',
  '03000': '岩手県',
  '04000': '宮城県',
  '05000': '秋田県',
  '06000': '山形県',
  '07000': '福島県',
  '08000': '茨城県',
  '09000': '栃木県',
  '10000': '群馬県',
  '11000': '埼玉県',
  '12000': '千葉県',
  '13000': '東京都',
  '14000': '神奈川県',
  '15000': '新潟県',
  '16000': '富山県',
  '17000': '石川県',
  '18000': '福井県',
  '19000': '山梨県',
  '20000': '長野県',
  '21000': '岐阜県',
  '22000': '静岡県',
  '23000': '愛知県',
  '24000': '三重県',
  '25000': '滋賀県',
  '26000': '京都府',
  '27000': '大阪府',
  '28000': '兵庫県',
  '29000': '奈良県',
  '30000': '和歌山県',
  '31000': '鳥取県',
  '32000': '島根県',
  '33000': '岡山県',
  '34000': '広島県',
  '35000': '山口県',
  '36000': '徳島県',
  '37000': '香川県',
  '38000': '愛媛県',
  '39000': '高知県',
  '40000': '福岡県',
  '41000': '佐賀県',
  '42000': '長崎県',
  '43000': '熊本県',
  '44000': '大分県',
  '45000': '宮崎県',
  '46000': '鹿児島県',
  '47000': '沖縄県'
};

// 都道府県の表示順（北から南）
const PREFECTURE_ORDER = [
  '北海道',
  // 東北
  '青森県', '岩手県', '秋田県', '宮城県', '山形県', '福島県',
  // 関東
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  // 中部
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県',
  '岐阜県', '静岡県', '愛知県',
  // 近畿
  '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
  // 中国
  '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  // 四国
  '徳島県', '香川県', '愛媛県', '高知県',
  // 九州・沖縄
  '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
];

// 年月の選択肢を定義
const AVAILABLE_YEARS = ['2021', '2022', '2023', '2024'];

function formatNumber(num: any) {
  if (typeof num !== 'number') return '0人';
  return num.toLocaleString('ja-JP') + '人';
}

export default function EstatDataViewer() {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [yAxisLabel, setYAxisLabel] = useState('');
  const [categoryLabelMap, setCategoryLabelMap] = useState<Record<string, string>>({});
  const [title, setTitle] = useState('');
  const [surveyDate, setSurveyDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [displayMode, setDisplayMode] = useState<'prefecture' | 'region'>('prefecture');
  const [selectedYear, setSelectedYear] = useState('2024');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/estat?statsDataId=${STATS_DATA_IDS.POPULATION_ESTIMATE}`);
        if (!response.ok) {
          throw new Error(`APIエラー: ${response.status}`);
        }
        const jsonData = await response.json();
        console.log('API Response:', jsonData);
        
        const processedData = processEstatData(jsonData);
        console.log('Processed Data:', processedData);

        // --- カテゴリ名マッピング ---
        const categoryLabelMap: Record<string, string> = {};
        let timeAxisData: { code: string; label: string }[] = [];

        if (jsonData.GET_STATS_DATA?.STATISTICAL_DATA?.CLASS_INF?.CLASS_OBJ) {
          for (const obj of jsonData.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ) {
            // 時間軸データの処理
            if (obj['@name'] === '時間軸（年次）' && Array.isArray(obj.CLASS)) {
              timeAxisData = obj.CLASS.map((c: { '@code': string; '@name': string }) => ({
                code: c['@code'],
                label: c['@name']
              }));
              console.log('Time axis data:', timeAxisData);

              // カテゴリマップにも時間軸の情報を追加
              obj.CLASS.forEach((c: { '@code': string; '@name': string }) => {
                categoryLabelMap[c['@code']] = c['@name'];
              });
            }
            // その他のカテゴリ情報を保存
            if (Array.isArray(obj.CLASS)) {
              for (const c of obj.CLASS) {
                if (!categoryLabelMap[c['@code']]) {
                  categoryLabelMap[c['@code']] = c['@name'];
                }
              }
            }
          }
        }
        console.log('Category Label Map:', categoryLabelMap);

        // --- カテゴリ一覧 ---
        const categories = [...new Set(processedData.data
          .map((item: any) => item.category))]
          .filter(category => {
            const label = categoryLabelMap[category] || category;
            return !label.includes('性比');
          }) as string[];
        console.log('Categories:', categories);

        // --- 都道府県ごとにカテゴリ値を合計 ---
        const prefMap: Record<string, ChartDataItem> = {};

        // 利用可能な時点のデータを取得
        const availableTimes = [...new Set(processedData.data.map(item => item.time))];
        console.log('Available times:', availableTimes);

        // 時点コードと年の対応を作成
        const timeCodeMap = new Map<string, string>();
        availableTimes.forEach(timeCode => {
          const timeLabel = categoryLabelMap[timeCode] || '';
          const yearMatch = timeLabel.match(/(\d{4})年/);
          if (yearMatch) {
            timeCodeMap.set(yearMatch[1], timeCode);
          }
        });
        console.log('Time code mapping:', Object.fromEntries(timeCodeMap));

        // 選択された年のデータを特定
        const selectedTimeCode = timeCodeMap.get(selectedYear);
        console.log('Selected year:', selectedYear);
        console.log('Selected time code:', selectedTimeCode);

        if (!selectedTimeCode) {
          throw new Error(`選択された年（${selectedYear}）のデータが見つかりません。利用可能な年: ${[...timeCodeMap.keys()].join(', ')}`);
        }

        // 初期化
        PREFECTURE_ORDER.forEach(prefName => {
          prefMap[prefName] = { areaLabel: prefName };
        });

        // 選択された年のデータのみを使用
        const selectedData = processedData.data.filter(item => item.time === selectedTimeCode);
        console.log('Selected data count:', selectedData.length);

        for (const item of selectedData) {
          const prefName = PREFECTURE_CODE_MAP[item.area];
          if (!prefName || prefName === '全国') continue; // 全国は除外

          // カテゴリごとにデータを設定（千人単位から人単位に変換）
          if (prefMap[prefName][item.category] === undefined) {
            prefMap[prefName][item.category] = Number(item.value) * 1000;
          }
        }

        console.log('Prefecture Map:', prefMap);

        // 北から南の順に並び替えてチャートデータを生成
        const chartData = PREFECTURE_ORDER.map(prefName => prefMap[prefName]);
        console.log('Chart Data:', chartData);

        const yAxisLabel = '人口（人）';
        const title = '都道府県別人口推計';
        const surveyDate = categoryLabelMap[selectedTimeCode] || '';
        console.log('Survey date:', surveyDate);

        // 利用可能な年のリストを更新
        const availableYears = [...timeCodeMap.keys()].sort();
        if (availableYears.length > 0 && !availableYears.includes(selectedYear)) {
          // 選択された年が利用可能でない場合、最新の年を選択
          setSelectedYear(availableYears[availableYears.length - 1]);
          return;
        }

        setChartData(chartData);
        setCategories(categories);
        setYAxisLabel(yAxisLabel);
        setCategoryLabelMap(categoryLabelMap);
        setTitle(title);
        setSurveyDate(surveyDate);

        if (typeof window !== 'undefined') {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ 
            chartData, 
            categories, 
            yAxisLabel, 
            categoryLabelMap, 
            title, 
            surveyDate 
          }));
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err instanceof Error ? err.message : 'データの取得に失敗しました');
        // エラー時にデータをクリア
        setChartData([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [selectedYear]); // selectedYearが変更されたときにデータを再取得

  const aggregateByRegion = (prefectureData: ChartDataItem[]) => {
    const regionData: ChartDataItem[] = [];
    Object.entries(REGIONS).forEach(([regionName, prefectures]) => {
      const regionItem: ChartDataItem = { areaLabel: regionName };
      categories.forEach(category => {
        regionItem[category] = prefectures.reduce((sum, prefecture) => {
          const prefData = prefectureData.find(item => item.areaLabel === prefecture);
          return sum + (prefData ? Number(prefData[category]) || 0 : 0);
        }, 0);
      });
      regionData.push(regionItem);
    });
    return regionData;
  };

  // 調査年月の整形関数
  const formatSurveyDate = (date: string) => {
    if (!date) return '';
    
    // 年月の形式（例: "2024年10月"）を "年月1日時点" に変換
    if (date.match(/^\d{4}年\d{1,2}月$/)) {
      return `${date}1日時点`;
    }
    
    // 数値形式（例: "202410"）を年月日形式に変換
    if (date.match(/^\d{6}$/)) {
      const year = date.slice(0, 4);
      const month = date.slice(4, 6);
      const displayMonth = month === '10' ? month : month.replace(/^0/, '');
      return `${year}年${displayMonth}月1日時点`;
    }

    // その他の形式はそのまま返す
    return date;
  };

  // カテゴリ名を日本語部分だけに変換
  const getCategoryLabel = (category: string) => {
    const label = categoryLabelMap[category] || category;
    // 「_」区切りがあれば日本語部分だけ返す
    if (label.includes('_')) {
      return label.split('_').slice(1).join('_');
    }
    return label;
  };

  if (loading) return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">データ読み込み中...</h2>
          <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="flex space-x-2">
          {/* ボタンのスケルトン */}
          <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="h-[500px] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">データを読み込んでいます...</p>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex items-center justify-center h-[500px]">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">エラーが発生しました</div>
          <div className="text-gray-600 dark:text-gray-400">{error}</div>
        </div>
      </div>
    </div>
  );

  if (!chartData || chartData.length === 0) return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex items-center justify-center h-[500px]">
        <div className="text-gray-600 dark:text-gray-400">表示するデータがありません</div>
      </div>
    </div>
  );

  const displayData = displayMode === 'region' ? aggregateByRegion(chartData) : chartData;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">{title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-2">調査年月: {formatSurveyDate(surveyDate)}</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
          >
            {AVAILABLE_YEARS.map(year => (
              <option key={year} value={year}>{year}年</option>
            ))}
          </select>
          <button
            onClick={() => setDisplayMode('prefecture')}
            className={`px-3 py-1 rounded ${
              displayMode === 'prefecture' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            都道府県別
          </button>
          <button
            onClick={() => setDisplayMode('region')}
            className={`px-3 py-1 rounded ${
              displayMode === 'region' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            地方別
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 rounded ${
              chartType === 'bar' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            棒グラフ
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 rounded ${
              chartType === 'line' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            折れ線グラフ
          </button>
        </div>
      </div>
      <div className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={displayData} margin={{ top: 20, right: 30, left: 80, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
              <XAxis
                dataKey="areaLabel"
                tick={{ fill: 'var(--chart-text-color, #374151)' }}
                axisLine={{ stroke: 'var(--chart-axis-color, #94a3b8)' }}
              />
              <YAxis 
                tickFormatter={formatNumber}
                tick={{ fill: 'var(--chart-text-color, #374151)' }}
                axisLine={{ stroke: 'var(--chart-axis-color, #94a3b8)' }}
              >
                <RechartsLabel 
                  value={yAxisLabel} 
                  angle={-90} 
                  position="insideLeft" 
                  offset={-60} 
                  style={{ 
                    textAnchor: 'middle',
                    fill: 'var(--chart-text-color, #374151)'
                  }} 
                />
              </YAxis>
              <Tooltip 
                formatter={(value: any, name: any) => {
                  const formattedValue = formatNumber(value);
                  const label = getCategoryLabel(name as string);
                  return [formattedValue, label];
                }}
                contentStyle={{
                  backgroundColor: 'var(--chart-tooltip-bg, white)',
                  border: '1px solid var(--chart-tooltip-border, #e5e7eb)',
                  color: 'var(--chart-text-color, #374151)'
                }}
              />
              <Legend 
                formatter={(value: any) => {
                  const label = getCategoryLabel(value as string);
                  return <span className="text-gray-700 dark:text-gray-300">{label}</span>;
                }}
              />
              {categories.map((category, index) => (
                <Bar
                  key={category}
                  dataKey={category}
                  name={getCategoryLabel(category)}
                  fill={`hsl(${(index * 137.5) % 360}, 70%, 50%)`}
                />
              ))}
            </BarChart>
          ) : (
            <LineChart data={displayData} margin={{ top: 20, right: 30, left: 80, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
              <XAxis
                dataKey="areaLabel"
                tick={{ fill: 'var(--chart-text-color, #374151)' }}
                axisLine={{ stroke: 'var(--chart-axis-color, #94a3b8)' }}
              />
              <YAxis 
                tickFormatter={formatNumber}
                tick={{ fill: 'var(--chart-text-color, #374151)' }}
                axisLine={{ stroke: 'var(--chart-axis-color, #94a3b8)' }}
              >
                <RechartsLabel 
                  value={yAxisLabel} 
                  angle={-90} 
                  position="insideLeft" 
                  offset={-60} 
                  style={{ 
                    textAnchor: 'middle',
                    fill: 'var(--chart-text-color, #374151)'
                  }} 
                />
              </YAxis>
              <Tooltip 
                formatter={(value: any, name: any) => {
                  const formattedValue = formatNumber(value);
                  const label = getCategoryLabel(name as string);
                  return [formattedValue, label];
                }}
                contentStyle={{
                  backgroundColor: 'var(--chart-tooltip-bg, white)',
                  border: '1px solid var(--chart-tooltip-border, #e5e7eb)',
                  color: 'var(--chart-text-color, #374151)'
                }}
              />
              <Legend 
                formatter={(value: any) => {
                  const label = getCategoryLabel(value as string);
                  return <span className="text-gray-700 dark:text-gray-300">{label}</span>;
                }}
              />
              {categories.map((category, index) => (
                <Line
                  key={category}
                  type="monotone"
                  dataKey={category}
                  name={getCategoryLabel(category)}
                  stroke={`hsl(${(index * 137.5) % 360}, 70%, 50%)`}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
} 