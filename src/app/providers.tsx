'use client';

import { ReactNode } from 'react';
import { SimulationProvider } from '@/contexts/SimulationContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SimulationProvider>
      {children}
    </SimulationProvider>
  );
} 