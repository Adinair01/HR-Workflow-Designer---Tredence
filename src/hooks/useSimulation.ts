import { useCallback } from 'react';
import { useWorkflowStore } from '@/store/workflowStore';
import { simulate } from '@/services/api';
import { validateWorkflow } from '@/utils/validation';

// ─── useSimulation ─────────────────────────────────────────────────────────────
// Handles workflow validation and simulation execution

export function useSimulation() {
  const {
    nodes,
    edges,
    simulationLogs,
    isSimulating,
    simulationSummary,
    setSimulationLogs,
    setIsSimulating,
    setSimulationSummary,
    clearSimulation,
    setValidationErrors,
    clearValidationErrors,
    validationErrors,
  } = useWorkflowStore();

  const runSimulation = useCallback(async () => {
    clearValidationErrors();
    clearSimulation();

    // Validate first
    const validation = validateWorkflow(nodes, edges);
    if (!validation.valid) {
      setValidationErrors(validation.errors);
      return;
    }

    setIsSimulating(true);
    try {
      const result = await simulate(nodes, edges);
      setSimulationLogs(result.logs);
      setSimulationSummary(result.summary);
    } catch (err) {
      console.error('Simulation failed:', err);
      setSimulationSummary('Simulation failed due to an unexpected error.');
    } finally {
      setIsSimulating(false);
    }
  }, [
    nodes,
    edges,
    clearValidationErrors,
    clearSimulation,
    setValidationErrors,
    setIsSimulating,
    setSimulationLogs,
    setSimulationSummary,
  ]);

  return {
    simulationLogs,
    isSimulating,
    simulationSummary,
    validationErrors,
    runSimulation,
    clearSimulation,
  };
}
