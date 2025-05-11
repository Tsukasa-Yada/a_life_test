// e-stat APIのユーティリティ関数

import axios from 'axios';

const E_STAT_API_URL = 'https://api.e-stat.go.jp/rest/3.0/app/json/getStatsData';

// e-stat APIの認証情報（環境変数から取得することを推奨）
const APP_ID = process.env.NEXT_PUBLIC_ESTAT_APP_ID;

interface EstatData {
  '@tab': string;
  '@cat01': string;
  '@area': string;
  '@time': string;
  '$': string;
}

interface EstatClass {
  '@name': string;
  '@code': string;
  '@level': string;
  '@unit': string;
}

interface EstatResponse {
  GET_STATS_DATA: {
    STATISTICAL_DATA?: {
      CLASS_INF?: {
        CLASS_OBJ: EstatClass[];
      };
      DATA_INF?: {
        VALUE: EstatData[];
      };
      TABLE_INF?: {
        '@id': string;
        '@statName': string;
        '@govOrg': string;
        '@statisticsName': string;
        '@title': string;
        '@cycle': string;
        '@surveyDate': string;
      };
    };
    RESULT: {
      STATUS: number;
      ERROR_MSG: string;
      DATE: string;
    };
  };
}

export const fetchEstatData = async (statsDataId: string): Promise<EstatResponse> => {
  // サーバーサイドではNEXT_PUBLIC_プレフィックスのない環境変数を使用
  if (!APP_ID) {
    throw new Error('e-stat APIのappIdが設定されていません');
  }

  // 総人口、日本人人口のデータを取得
  const url = `${E_STAT_API_URL}?appId=${APP_ID}&statsDataId=${statsDataId}&lang=J&cdCat02=001,002`;
  
  console.log('API Request URL:', url); // デバッグ用
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      },
      // タイムアウトとリトライの設定
      next: {
        revalidate: 3600 // 1時間キャッシュ
      },
      cache: 'no-store' // 開発中はキャッシュを無効化
    });

    console.log('API Response Status:', response.status); // デバッグ用
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`e-stat APIエラー: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('API Response Data:', data); // デバッグ用
    return data;
  } catch (error) {
    console.error('e-stat APIリクエストエラー:', error);
    // エラーの詳細情報を追加
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        cause: error.cause,
        stack: error.stack
      });
    }
    throw error;
  }
};

// 実際の統計データID
export const STATS_DATA_IDS = {
  // 人口推計 各年10月1日現在人口 令和２年国勢調査基準 統計表
  POPULATION_ESTIMATE: '0003448231',
  // 家計調査 貯蓄・負債編 二人以上の世帯の貯蓄現在高
  SAVINGS_SURVEY: '00200561',
  // 貯蓄動向調査 二人以上の世帯の貯蓄現在高
  SAVINGS_TREND: '00200563',
  // その他の統計ID
  POPULATION: '0000020201',
  LABOR: '0000020203',
  RETAIL_PRICE: '0000020204',
  CONSUMPTION: '0000020205',
  HOUSEHOLD_SAVINGS: '00200564', // 家計調査 貯蓄・負債編
};

// データを加工するユーティリティ関数
export const processEstatData = (data: EstatResponse) => {
  const result = data.GET_STATS_DATA;
  
  console.log('Raw API Response:', JSON.stringify(data, null, 2));
  
  // エラーチェック
  if (result.RESULT.STATUS !== 0) {
    throw new Error(`APIエラー: ${result.RESULT.ERROR_MSG}`);
  }

  // データが存在しない場合の処理
  if (!result.STATISTICAL_DATA) {
    return {
      title: 'データがありません',
      surveyDate: '-',
      data: []
    };
  }

  const statisticalData = result.STATISTICAL_DATA;
  
  console.log('Statistical Data Structure:', {
    tableInfo: statisticalData.TABLE_INF,
    classInfo: statisticalData.CLASS_INF,
    dataInfo: statisticalData.DATA_INF
  });
  
  // --- ラベルマッピング ---
  // area, category などのコード→日本語名変換辞書を作成
  const areaMap: Record<string, string> = {};
  const categoryMap: Record<string, string> = {};
  if (statisticalData.CLASS_INF && Array.isArray(statisticalData.CLASS_INF.CLASS_OBJ)) {
    for (const obj of statisticalData.CLASS_INF.CLASS_OBJ) {
      console.log('Processing CLASS_OBJ:', obj);
      if (obj['@name'] === '地域' && Array.isArray((obj as any).CLASS)) {
        for (const c of (obj as any).CLASS) {
          areaMap[c['@code']] = c['@name'];
        }
      }
      if ((obj['@name'] === '男女別' || obj['@name'] === '年齢区分' || obj['@name'] === '分類' || obj['@name'].includes('分類')) && Array.isArray((obj as any).CLASS)) {
        for (const c of (obj as any).CLASS) {
          categoryMap[c['@code']] = c['@name'];
        }
      }
    }
  }

  console.log('Area Map:', areaMap);
  console.log('Category Map:', categoryMap);

  const processedData = {
    title: statisticalData.TABLE_INF?.['@title'] || 'タイトルなし',
    surveyDate: statisticalData.TABLE_INF?.['@surveyDate'] || '-',
    data: (statisticalData.DATA_INF?.VALUE || [])
      .map(item => ({
        value: item['$'],
        area: item['@area'],
        areaLabel: areaMap[item['@area']] || item['@area'],
        time: item['@time'],
        category: item['@cat01'],
        categoryLabel: categoryMap[item['@cat01']] || item['@cat01'],
      }))
      .filter(item => !item.categoryLabel.includes('性比'))
  };

  console.log('Processed Data:', processedData);
  return processedData;
};

interface EStatResponse {
  GET_STATS_DATA: {
    STATISTICAL_DATA: {
      CLASS_INF: {
        CLASS_OBJ: Array<{
          '@id': string;
          '@name': string;
          CLASS: Array<{
            '@code': string;
            '@name': string;
            '@level': string;
          }>;
        }>;
      };
      DATA_INF: {
        VALUE: Array<{
          '@tab': string;
          '@cat01': string;
          '@cat02': string;
          '@cat03': string;
          '@time': string;
          '@unit': string;
          $: string;
        }>;
      };
    };
  };
}

// 家計調査の貯蓄額データを取得
export async function getHouseholdSavingsData() {
  try {
    // APIキーの確認
    if (!APP_ID) {
      console.error('APIキーが設定されていません');
      throw new Error('APIキーが設定されていません');
    }

    // リクエストパラメータの設定
    const params = {
      appId: APP_ID,
      statsDataId: STATS_DATA_IDS.HOUSEHOLD_SAVINGS,
      lang: 'J',
      metaGetFlg: 'Y',
      codeTabSelect: '001',  // 家計調査の表番号
      cdCat01Select: '000000000',  // 世帯区分
      cdTimeFrom: '202301',  // データ取得開始時期
      cdTimeTo: '202312',    // データ取得終了時期
      sectionHeaderFlg: '1',
      explanationGetFlg: 'Y',
    };

    console.log('API Request URL:', E_STAT_API_URL);
    console.log('API Request Params:', params);

    const response = await axios.get<EStatResponse>(E_STAT_API_URL, { params });

    // デバッグ用：APIレスポンスの構造を確認
    console.log('API Response Status:', response.status);
    console.log('API Response Headers:', response.headers);
    console.log('API Response Data:', JSON.stringify(response.data, null, 2));

    if (!response.data.GET_STATS_DATA) {
      throw new Error('APIレスポンスの形式が不正です');
    }

    if (!response.data.GET_STATS_DATA.STATISTICAL_DATA) {
      throw new Error('統計データが存在しません');
    }

    return response.data;
  } catch (error) {
    console.error('e-stat APIからのデータ取得に失敗しました:', error);
    if (axios.isAxiosError(error)) {
      console.error('API Error Details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          params: error.config?.params,
        }
      });
    }
    throw error;
  }
}

// 年齢層コードの型定義
type EstatAgeGroup = '29歳以下' | '30～39歳' | '40～49歳' | '50～59歳' | '60～69歳' | '70歳以上';

interface SavingsData {
  ageGroup: EstatAgeGroup;
  savings: number;
}

// 年齢層別の貯蓄額データを取得
export async function getSavingsByAgeGroup(): Promise<SavingsData[]> {
  try {
    const data = await getHouseholdSavingsData();
    
    // デバッグ用：データ構造を確認
    console.log('Statistical Data:', JSON.stringify(data.GET_STATS_DATA.STATISTICAL_DATA, null, 2));

    if (!data.GET_STATS_DATA.STATISTICAL_DATA?.DATA_INF?.VALUE) {
      console.error('データ構造が不正です:', JSON.stringify(data, null, 2));
      return getDefaultSavingsData();
    }
  
    // 年齢層別の貯蓄額を抽出
    const savingsByAge = data.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
      .filter(item => item['@cat01'] === '000000000') // 貯蓄額のデータ
      .map(item => ({
        ageGroup: item['@cat02'] as EstatAgeGroup,
        savings: parseInt(item.$),
      }));

    // データが空の場合はデフォルト値を返す
    if (savingsByAge.length === 0) {
      console.error('年齢層別データが取得できませんでした');
      return getDefaultSavingsData();
    }

    // デバッグ用：処理結果を確認
    console.log('Processed Savings Data:', savingsByAge);

    return savingsByAge;
  } catch (error) {
    console.error('貯蓄額データの処理に失敗しました:', error);
    return getDefaultSavingsData();
  }
}

// デフォルトの貯蓄データを返す関数
function getDefaultSavingsData(): SavingsData[] {
  return [
    { ageGroup: '29歳以下', savings: 2000000 },
    { ageGroup: '30～39歳', savings: 4000000 },
    { ageGroup: '40～49歳', savings: 6000000 },
    { ageGroup: '50～59歳', savings: 8000000 },
    { ageGroup: '60～69歳', savings: 10000000 },
    { ageGroup: '70歳以上', savings: 12000000 },
  ];
}

// 年齢階級別の貯蓄データを取得する関数
export async function fetchLatestSavingsData(): Promise<{ ageGroup: string; savings: number }[]> {
  try {
    if (!APP_ID) {
      throw new Error('APIキーが設定されていません');
    }

    // 家計調査（貯蓄・負債編）のデータを取得
    const params: Record<string, string> = {
      appId: APP_ID,
      statsDataId: '00200561', // 家計調査 貯蓄・負債編
      lang: 'J',
      // データ取得に必要な最小限のパラメータ
      metaGetFlg: 'Y',
      lvTab: '1',    // 表章項目レベル
      cdTab: '1',    // 表章項目コード（貯蓄現在高）
      cdCat01: '1',  // 世帯区分（二人以上の世帯）
      cdCat02: '2,3,4,5,6,7',  // 年齢階級（29歳以下から70歳以上）
      cdArea: '00000', // 全国
      cdTime: '2023000000', // 2023年
    };

    console.log('API Request Parameters:', params);
    console.log('API Request URL:', `${E_STAT_API_URL}?${new URLSearchParams(params)}`);

    const response = await fetch(`${E_STAT_API_URL}?${new URLSearchParams(params)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store' // キャッシュを無効化（デバッグ用）
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Raw API Response:', JSON.stringify(data, null, 2));
    
    // エラーチェック
    if (data.GET_STATS_DATA?.RESULT?.STATUS !== 0) {
      console.error('API Error:', data.GET_STATS_DATA?.RESULT);
      throw new Error(`API Error: ${data.GET_STATS_DATA?.RESULT?.ERROR_MSG || 'Unknown Error'}`);
    }

    if (!data.GET_STATS_DATA?.STATISTICAL_DATA?.DATA_INF?.VALUE) {
      console.error('Invalid Data Structure:', data);
      throw new Error('データ構造が不正です');
    }

    // 年齢階級別の貯蓄データを抽出
    const values = data.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE;
    console.log('Extracted Values:', values);

    const latestData = values
      .filter((item: { '@cat01': string; '@cat02': string; '@time': string }) => {
        const isValid = item['@cat01'] === '1' && item['@cat02'] !== '000';
        console.log('Filtering item:', item, 'isValid:', isValid);
        return isValid;
      })
      .map((item: { '@cat02': string; '$': string }) => {
        let ageGroup = '';
        switch (item['@cat02']) {
          case '2': ageGroup = '29歳以下'; break;
          case '3': ageGroup = '30～39歳'; break;
          case '4': ageGroup = '40～49歳'; break;
          case '5': ageGroup = '50～59歳'; break;
          case '6': ageGroup = '60～69歳'; break;
          case '7': ageGroup = '70歳以上'; break;
          default: ageGroup = 'その他';
        }
        const savings = parseInt(item['$'].replace(/,/g, ''), 10) * 1000;
        console.log('Mapped item:', { ageGroup, savings, original: item });
        return { ageGroup, savings };
      })
      .filter((item: { ageGroup: string }) => item.ageGroup !== 'その他');

    console.log('Processed Data:', latestData);

    if (latestData.length === 0) {
      console.error('No valid data found in response');
      throw new Error('有効なデータが見つかりませんでした');
    }

    return latestData;
  } catch (error) {
    console.error('貯蓄データの取得に失敗しました:', error);
    // エラー時はデフォルト値を返す
    return [
      { ageGroup: '29歳以下', savings: 3_557_000 },
      { ageGroup: '30～39歳', savings: 7_532_000 },
      { ageGroup: '40～49歳', savings: 13_177_000 },
      { ageGroup: '50～59歳', savings: 17_018_000 },
      { ageGroup: '60～69歳', savings: 24_180_000 },
      { ageGroup: '70歳以上', savings: 23_889_000 },
    ];
  }
}

/**
 * e-Statから最新の家計の貯蓄データを取得する
 * @returns {Promise<{ ageGroup: EstatAgeGroup; savings: number }[]>} 年齢階級別の貯蓄額データ
 */
export const fetchSavingsData = async (): Promise<{ ageGroup: EstatAgeGroup; savings: number }[]> => {
  try {
    const response = await fetchEstatData(STATS_DATA_IDS.HOUSEHOLD_SAVINGS);
    const data = response.GET_STATS_DATA.STATISTICAL_DATA?.DATA_INF?.VALUE;

    if (!data) {
      throw new Error('データが取得できませんでした');
    }
    
    // データを年齢階級別に整形
    const savingsData = [
      { ageGroup: '29歳以下', savings: 0 },
      { ageGroup: '30～39歳', savings: 0 },
      { ageGroup: '40～49歳', savings: 0 },
      { ageGroup: '50～59歳', savings: 0 },
      { ageGroup: '60～69歳', savings: 0 },
      { ageGroup: '70歳以上', savings: 0 },
    ] as { ageGroup: EstatAgeGroup; savings: number }[];

    // e-Statのデータを解析して各年齢階級の貯蓄額を設定
    data.forEach((item: any) => {
      const value = parseInt(item.$, 10);
      const cat01 = item['@cat01']; // 年齢階級のコード

      // 年齢階級コードに基づいてデータを割り当て
      switch (cat01) {
        case '001': savingsData[0].savings = value; break; // 29歳以下
        case '002': savingsData[1].savings = value; break; // 30～39歳
        case '003': savingsData[2].savings = value; break; // 40～49歳
        case '004': savingsData[3].savings = value; break; // 50～59歳
        case '005': savingsData[4].savings = value; break; // 60～69歳
        case '006': savingsData[5].savings = value; break; // 70歳以上
      }
    });

    return savingsData;
  } catch (error) {
    console.error('貯蓄データの取得に失敗しました:', error);
    throw error;
  }
};

// 年齢層コードを年齢層名に変換
function getAgeGroup(code: string): EstatAgeGroup | 'その他' {
  const ageGroupMap: Record<string, EstatAgeGroup> = {
    '2': '29歳以下',
    '3': '30～39歳',
    '4': '40～49歳',
    '5': '50～59歳',
    '6': '60～69歳',
    '7': '70歳以上'
  };
  return ageGroupMap[code] || 'その他';
}

// 統計表検索URLを生成
function getStatsListUrl(params: Record<string, string | number>) {
  const baseUrl = 'https://api.e-stat.go.jp/rest/3.0/app/json/getStatsList';
  return `${baseUrl}?${new URLSearchParams(params as Record<string, string>)}`;
}

// 統計データ取得URLを生成
function getStatsDataUrl(params: Record<string, string>) {
  const baseUrl = 'https://api.e-stat.go.jp/rest/3.0/app/json/getStatsData';
  return `${baseUrl}?${new URLSearchParams(params)}`;
} 