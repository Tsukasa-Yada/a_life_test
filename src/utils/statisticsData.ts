export interface StatisticsData {
  populationByAge: Record<string, number>;
  genderRatio: { male: number; female: number };
  averageIncome: number;
  unemploymentRate: number;
  educationLevels: Record<string, number>;
}

// 日本の統計データ（2023年概算）
const defaultStatistics: StatisticsData = {
  populationByAge: {
    '0-14': 0.12,
    '15-64': 0.59,
    '65+': 0.29
  },
  genderRatio: {
    male: 0.486,
    female: 0.514
  },
  averageIncome: 4_320_000, // 年収（円）
  unemploymentRate: 0.026,   // 2.6%
  educationLevels: {
    highSchool: 0.3,
    bachelor: 0.5,
    master: 0.15,
    doctor: 0.05
  }
};

export async function fetchStatisticsData(): Promise<StatisticsData> {
  // 将来的にAPIを使用する場合は、ここでaxiosを使用してデータを取得
  return defaultStatistics;
} 