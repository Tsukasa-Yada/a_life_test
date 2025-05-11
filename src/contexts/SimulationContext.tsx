'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { Agent } from '@/types/agent';
import { generatePopulation } from '@/utils/agentGenerator';
import { updatePopulation } from '@/utils/simulationLogic';

interface SimulationContextType {
  agents: Agent[];
  isRunning: boolean;
  hasStarted: boolean;  // シミュレーションが一度でも開始されたかを追跡
  selectedAgent: Agent | null;
  taxReformEnabled: boolean;
  setSelectedAgent: (agent: Agent | null) => void;
  startSimulation: () => Promise<void>;
  pauseSimulation: () => void;
  resetSimulation: () => void;
  setTaxReformEnabled: (enabled: boolean) => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [taxReformEnabled, setTaxReformEnabled] = useState(false);

  const startSimulation = useCallback(async () => {
    // エージェントが存在しない場合は新しいエージェントを生成
    if (agents.length === 0) {
      const newAgents = await generatePopulation(74000);
      setAgents(newAgents);
    }
    setIsRunning(true);
    setHasStarted(true);
  }, [agents.length]);

  const pauseSimulation = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetSimulation = useCallback(() => {
    setAgents([]);
    setIsRunning(false);
    setHasStarted(false);
    setSelectedAgent(null);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setAgents(prevAgents => {
        const updatedAgents = updatePopulation(prevAgents);
        
        // 選択中のエージェントも更新
        if (selectedAgent) {
          const updatedSelectedAgent = updatedAgents.find(a => a.id === selectedAgent.id);
          if (updatedSelectedAgent) {
            setSelectedAgent(updatedSelectedAgent);
          }
        }
        
        return updatedAgents;
      });
    }, 1000); // 1秒ごとに更新

    return () => clearInterval(intervalId);
  }, [isRunning, selectedAgent]);

  const value = {
    agents,
    isRunning,
    hasStarted,
    selectedAgent,
    taxReformEnabled,
    setSelectedAgent,
    startSimulation,
    pauseSimulation,
    resetSimulation,
    setTaxReformEnabled,
  };

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
} 