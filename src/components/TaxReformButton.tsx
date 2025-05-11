'use client';

import { useSimulation } from '@/contexts/SimulationContext';

export default function TaxReformButton() {
  const { isRunning, hasStarted, setTaxReformEnabled } = useSimulation();

  const handleTaxReform = () => {
    setTaxReformEnabled(true);
  };

  if (!hasStarted || !isRunning) return null;

  return (
    <button
      onClick={handleTaxReform}
      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
    >
      所得税基礎控除引き上げ（103万円→178万円）
    </button>
  );
} 