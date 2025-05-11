'use client';

import { useSimulationStore } from '@/store/simulationStore';

export default function SimulationControls() {
  const {
    isRunning,
    simulationSpeed,
    startSimulation,
    stopSimulation,
    stepSimulation,
    setSimulationSpeed
  } = useSimulationStore();

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
        
        <button
          onClick={stepSimulation}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          disabled={isRunning}
        >
          1ステップ進める
        </button>
      </div>

      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">シミュレーション速度:</label>
        <input
          type="range"
          min="1"
          max="10"
          value={simulationSpeed}
          onChange={(e) => setSimulationSpeed(Number(e.target.value))}
          className="w-48"
        />
        <span className="text-sm">{simulationSpeed}x</span>
      </div>
    </div>
  );
} 