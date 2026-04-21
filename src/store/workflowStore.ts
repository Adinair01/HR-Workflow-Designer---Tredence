import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import type {
  Connection,
  NodeChange,
  EdgeChange,
} from '@xyflow/react';
import type {
  WorkflowNode,
  WorkflowEdge,
  WorkflowNodeData,
  SimulationLog,
  ValidationError,
} from '@/types';

// ─── State Shape ───────────────────────────────────────────────────────────────

interface WorkflowState {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;

  // Simulation
  simulationLogs: SimulationLog[];
  isSimulating: boolean;
  simulationSummary: string;

  // Validation
  validationErrors: ValidationError[];

  // Actions
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;

  addNode: (node: WorkflowNode) => void;
  updateNodeData: (nodeId: string, data: Partial<WorkflowNodeData>) => void;
  deleteNode: (nodeId: string) => void;
  deleteEdge: (edgeId: string) => void;

  selectNode: (nodeId: string | null) => void;
  getSelectedNode: () => WorkflowNode | undefined;

  setSimulationLogs: (logs: SimulationLog[]) => void;
  setIsSimulating: (v: boolean) => void;
  setSimulationSummary: (s: string) => void;
  clearSimulation: () => void;

  setValidationErrors: (errors: ValidationError[]) => void;
  clearValidationErrors: () => void;

  importWorkflow: (nodes: WorkflowNode[], edges: WorkflowEdge[]) => void;
  resetWorkflow: () => void;
}

// ─── Initial State ─────────────────────────────────────────────────────────────

const INITIAL_NODES: WorkflowNode[] = [];
const INITIAL_EDGES: WorkflowEdge[] = [];

// ─── Store ─────────────────────────────────────────────────────────────────────

export const useWorkflowStore = create<WorkflowState>()(
  devtools(
    (set, get) => ({
      nodes: INITIAL_NODES,
      edges: INITIAL_EDGES,
      selectedNodeId: null,
      simulationLogs: [],
      isSimulating: false,
      simulationSummary: '',
      validationErrors: [],

      onNodesChange: (changes) => {
        set((state) => ({
          nodes: applyNodeChanges(changes, state.nodes) as WorkflowNode[],
        }));
      },

      onEdgesChange: (changes) => {
        set((state) => ({
          edges: applyEdgeChanges(changes, state.edges),
        }));
      },

      onConnect: (connection) => {
        set((state) => ({
          edges: addEdge(
            { ...connection, animated: true, style: { stroke: '#6366f1' } },
            state.edges
          ),
        }));
      },

      addNode: (node) => {
        set((state) => ({ nodes: [...state.nodes, node] }));
      },

      updateNodeData: (nodeId, data) => {
        set((state) => ({
          nodes: state.nodes.map((n) =>
            n.id === nodeId
              ? { ...n, data: { ...n.data, ...data } as WorkflowNodeData }
              : n
          ),
        }));
      },

      deleteNode: (nodeId) => {
        set((state) => ({
          nodes: state.nodes.filter((n) => n.id !== nodeId),
          edges: state.edges.filter(
            (e) => e.source !== nodeId && e.target !== nodeId
          ),
          selectedNodeId:
            state.selectedNodeId === nodeId ? null : state.selectedNodeId,
        }));
      },

      deleteEdge: (edgeId) => {
        set((state) => ({
          edges: state.edges.filter((e) => e.id !== edgeId),
        }));
      },

      selectNode: (nodeId) => {
        set({ selectedNodeId: nodeId });
      },

      getSelectedNode: () => {
        const { nodes, selectedNodeId } = get();
        return nodes.find((n) => n.id === selectedNodeId);
      },

      setSimulationLogs: (logs) => set({ simulationLogs: logs }),
      setIsSimulating: (v) => set({ isSimulating: v }),
      setSimulationSummary: (s) => set({ simulationSummary: s }),
      clearSimulation: () =>
        set({ simulationLogs: [], simulationSummary: '', isSimulating: false }),

      setValidationErrors: (errors) => set({ validationErrors: errors }),
      clearValidationErrors: () => set({ validationErrors: [] }),

      importWorkflow: (nodes, edges) => {
        set({ nodes, edges, selectedNodeId: null });
      },

      resetWorkflow: () => {
        set({
          nodes: [],
          edges: [],
          selectedNodeId: null,
          simulationLogs: [],
          simulationSummary: '',
          validationErrors: [],
        });
      },
    }),
    { name: 'WorkflowStore' }
  )
);
