'use client';

import { useSimulation } from '@/contexts/SimulationContext';

export default function SimulationControls() {
  const {
    isRunning,
    startSimulation,
    pauseSimulation: stopSimulation,
  } = useSimulation();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">シミュレーション制御</h2>
      
      <div className="flex gap-4 mb-4">
        {!isRunning ? (
          <button
            onClick={startSimulation}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            開始
          </button>
        ) : (
          <button
            onClick={stopSimulation}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            停止
          </button>
        )}
      </div>
    </div>
  );
} 