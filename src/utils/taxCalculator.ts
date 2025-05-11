// 給与所得控除を計算
export function calculateEmploymentDeduction(income: number, isReformed: boolean = false): number {
  // 1000円未満の端数を切り捨てた収入を計算
  const roundedIncome = Math.floor(income / 1000) * 1000;

  // 基本の給与所得控除を計算
  let baseDeduction: number;
  if (income <= 1625000) {
    baseDeduction = 550000;
  } else if (income <= 1800000) {
    baseDeduction = Math.floor(roundedIncome * 0.4 - 100000);
  } else if (income <= 3600000) {
    baseDeduction = Math.floor(roundedIncome * 0.3 + 80000);
  } else if (income <= 6600000) {
    baseDeduction = Math.floor(roundedIncome * 0.2 + 440000);
  } else if (income <= 8500000) {
    baseDeduction = Math.floor(roundedIncome * 0.1 + 1100000);
  } else {
    baseDeduction = 1950000;
  }

  // 改正後の場合、給与所得控除を増額
  if (isReformed) {
    // 75万円の引き上げ分を按分（55/103 ≈ 0.534）
    const additionalDeduction = Math.floor(750000 * 0.534);
    return baseDeduction + additionalDeduction;
  }

  return baseDeduction;
}

// 所得控除の合計を計算
export function calculateTotalDeductions(income: number, isReformed: boolean = false): number {
  const employmentDeduction = calculateEmploymentDeduction(income, isReformed);
  
  // 基礎控除額を税制改正に応じて変更
  // 改正前は48万円、改正後は82.95万円（75万円の引き上げ分を48/103 ≈ 0.466で按分）
  const basicDeduction = isReformed ? 829500 : 480000;
  
  return employmentDeduction + basicDeduction;
}

// 税率と控除額を取得
export function getTaxRateAndDeduction(taxableIncome: number): { rate: number; deduction: number } {
  if (taxableIncome <= 1950000) {
    return { rate: 0.05, deduction: 0 };
  } else if (taxableIncome <= 3300000) {
    return { rate: 0.10, deduction: 97500 };
  } else if (taxableIncome <= 6950000) {
    return { rate: 0.20, deduction: 427500 };
  } else if (taxableIncome <= 9000000) {
    return { rate: 0.23, deduction: 636000 };
  } else if (taxableIncome <= 18000000) {
    return { rate: 0.33, deduction: 1536000 };
  } else if (taxableIncome <= 40000000) {
    return { rate: 0.40, deduction: 2796000 };
  } else {
    return { rate: 0.45, deduction: 4796000 };
  }
}

// 所得税額を計算
export function calculateIncomeTax(income: number, isReformed: boolean = false): number {
  // 学生アルバイトの場合（103万円以下、または改正後は178万円以下）は課税なし
  const taxThreshold = isReformed ? 1780000 : 1030000;
  if (income <= taxThreshold) {
    return 0;
  }

  const totalDeductions = calculateTotalDeductions(income, isReformed);
  // 課税所得金額は1000円未満切り捨て
  const taxableIncome = Math.floor((Math.max(0, income - totalDeductions)) / 1000) * 1000;
  const { rate, deduction } = getTaxRateAndDeduction(taxableIncome);
  
  return Math.floor(taxableIncome * rate - deduction);
} 