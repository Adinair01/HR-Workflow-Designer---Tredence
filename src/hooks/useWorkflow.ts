import { useCallback } from 'react';
import { useWorkflowStore } from '@/store/workflowStore';
import type { WorkflowNode, WorkflowEdge } from '@/types';

// ─── useWorkflow ───────────────────────────────────────────────────────────────
// Provides canvas-level workflow operations: import, export, reset

export function useWorkflow() {
  const {
    nodes,
    edges,
    importWorkflow,
    resetWorkflow,
    validationErrors,
  } = useWorkflowStore();

  const exportWorkflow = useCallback(() => {
    return JSON.stringify({ nodes, edges }, null, 2);
  }, [nodes, edges]);

  const downloadWorkflow = useCallback(() => {
    const json = exportWorkflow();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workflow-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [exportWorkflow]);

  const loadWorkflow = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target?.result as string) as {
            nodes: WorkflowNode[];
            edges: WorkflowEdge[];
          };
          importWorkflow(parsed.nodes, parsed.edges);
        } catch {
          console.error('Invalid workflow JSON');
        }
      };
      reader.readAsText(file);
    },
    [importWorkflow]
  );

  return {
    nodes,
    edges,
    exportWorkflow,
    downloadWorkflow,
    loadWorkflow,
    resetWorkflow,
    validationErrors,
  };
}
