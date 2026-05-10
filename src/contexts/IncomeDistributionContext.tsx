"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface IncomeBracket {
  min: number;
  max: number;
  prob: number;
}

const defaultBrackets: IncomeBracket[] = [
  { min: 0, max: 1000000, prob: 0.069 },
  { min: 1000000, max: 2000000, prob: 0.146 },
  { min: 2000000, max: 3000000, prob: 0.145 },
  { min: 3000000, max: 4000000, prob: 0.129 },
  { min: 4000000, max: 5000000, prob: 0.107 },
  { min: 5000000, max: 6000000, prob: 0.085 },
  { min: 6000000, max: 7000000, prob: 0.064 },
  { min: 7000000, max: 8000000, prob: 0.058 },
  { min: 8000000, max: 9000000, prob: 0.046 },
  { min: 9000000, max: 10000000, prob: 0.037 },
  { min: 10000000, max: 11000000, prob: 0.026 },
  { min: 11000000, max: 12000000, prob: 0.023 },
  { min: 12000000, max: 13000000, prob: 0.018 },
  { min: 13000000, max: 14000000, prob: 0.010 },
  { min: 14000000, max: 15000000, prob: 0.008 },
  { min: 15000000, max: 16000000, prob: 0.007 },
  { min: 16000000, max: 17000000, prob: 0.003 },
  { min: 17000000, max: 18000000, prob: 0.003 },
  { min: 18000000, max: 19000000, prob: 0.003 },
  { min: 19000000, max: 20000000, prob: 0.002 },
  { min: 20000000, max: 30000000, prob: 0.013 },
];

interface IncomeDistributionContextType {
  incomeBrackets: IncomeBracket[];
  setIncomeBrackets: (brackets: IncomeBracket[]) => void;
  resetIncomeBrackets: () => void;
}

const IncomeDistributionContext = createContext<IncomeDistributionContextType | undefined>(undefined);

export function IncomeDistributionProvider({ children }: { children: ReactNode }) {
  const [incomeBrackets, setIncomeBrackets] = useState<IncomeBracket[]>(defaultBrackets);
  const resetIncomeBrackets = () => setIncomeBrackets(defaultBrackets);

  return (
    <IncomeDistributionContext.Provider value={{ incomeBrackets, setIncomeBrackets, resetIncomeBrackets }}>
      {children}
    </IncomeDistributionContext.Provider>
  );
}

export function useIncomeDistribution() {
  const ctx = useContext(IncomeDistributionContext);
  if (!ctx) throw new Error('useIncomeDistribution must be used within IncomeDistributionProvider');
  return ctx;
} 