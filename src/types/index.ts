// ─── Node Types ────────────────────────────────────────────────────────────────

export type NodeType =
  | 'startNode'
  | 'taskNode'
  | 'approvalNode'
  | 'automatedStepNode'
  | 'endNode';

// ─── Node Data Shapes ──────────────────────────────────────────────────────────

export interface MetadataEntry {
  key: string;
  value: string;
}

export interface CustomField {
  id: string;
  label: string;
  value: string;
}

export interface StartNodeData extends Record<string, unknown> {
  type: 'startNode';
  title: string;
  metadata: MetadataEntry[];
}

export interface TaskNodeData extends Record<string, unknown> {
  type: 'taskNode';
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  customFields: CustomField[];
}

export interface ApprovalNodeData extends Record<string, unknown> {
  type: 'approvalNode';
  title: string;
  approverRole: string;
  autoApproveThreshold: number;
}

export interface AutomatedStepNodeData extends Record<string, unknown> {
  type: 'automatedStepNode';
  title: string;
  selectedActionId: string;
  actionParams: Record<string, string>;
}

export interface EndNodeData extends Record<string, unknown> {
  type: 'endNode';
  endMessage: string;
  summaryFlag: boolean;
}

export type WorkflowNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedStepNodeData
  | EndNodeData;

// ─── React Flow Node ───────────────────────────────────────────────────────────

import type { Node, Edge } from '@xyflow/react';

export type WorkflowNode = Node<WorkflowNodeData, NodeType>;
export type WorkflowEdge = Edge;

// ─── Automation API ────────────────────────────────────────────────────────────

export interface AutomationParam {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'boolean';
  options?: string[];
  required?: boolean;
}

export interface AutomationAction {
  id: string;
  name: string;
  description: string;
  params: AutomationParam[];
}

// ─── Simulation ────────────────────────────────────────────────────────────────

export interface SimulationLog {
  nodeId: string;
  nodeType: NodeType;
  nodeTitle: string;
  status: 'pending' | 'running' | 'success' | 'error';
  message: string;
  timestamp: string;
}

export interface SimulationResult {
  success: boolean;
  logs: SimulationLog[];
  summary: string;
}

// ─── Validation ────────────────────────────────────────────────────────────────

export interface ValidationError {
  nodeId: string;
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

// ─── Sidebar Node Definition ───────────────────────────────────────────────────

export interface SidebarNodeDef {
  type: NodeType;
  label: string;
  description: string;
  icon: string;
  color: string;
}
