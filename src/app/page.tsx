'use client';

import { SimulationProvider } from '@/contexts/SimulationContext';
import Dashboard from '@/components/Dashboard';
import AgentList from '@/components/AgentList';
import AgentDetails from '@/components/AgentDetails';
import TaxReformButton from '@/components/TaxReformButton';
import TaxReformEffects from '@/components/TaxReformEffects';

export default function Home() {
  return (
    <SimulationProvider>
      <main className="min-h-screen p-4">
        <div className="max-w-[1440px] mx-auto space-y-4">
          <Dashboard />
          <div className="flex justify-end">
            <TaxReformButton />
          </div>
          <TaxReformEffects />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <AgentList />
            </div>
            <div>
              <AgentDetails />
            </div>
          </div>
        </div>
      </main>
    </SimulationProvider>
  );
}
