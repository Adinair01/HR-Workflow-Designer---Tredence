import type { NodeType, SidebarNodeDef } from '@/types';

export const SIDEBAR_NODES: SidebarNodeDef[] = [
  {
    type: 'startNode',
    label: 'Start',
    description: 'Entry point of the workflow',
    icon: 'Play',
    color: 'bg-emerald-500',
  },
  {
    type: 'taskNode',
    label: 'Task',
    description: 'Assign a task to a team member',
    icon: 'CheckSquare',
    color: 'bg-blue-500',
  },
  {
    type: 'approvalNode',
    label: 'Approval',
    description: 'Require approval to proceed',
    icon: 'ShieldCheck',
    color: 'bg-amber-500',
  },
  {
    type: 'automatedStepNode',
    label: 'Automated Step',
    description: 'Run an automated action',
    icon: 'Zap',
    color: 'bg-purple-500',
  },
  {
    type: 'endNode',
    label: 'End',
    description: 'Terminal point of the workflow',
    icon: 'StopCircle',
    color: 'bg-rose-500',
  },
];

export const NODE_COLORS: Record<NodeType, string> = {
  startNode: '#10b981',
  taskNode: '#3b82f6',
  approvalNode: '#f59e0b',
  automatedStepNode: '#8b5cf6',
  endNode: '#ef4444',
};

export const NODE_LABELS: Record<NodeType, string> = {
  startNode: 'Start',
  taskNode: 'Task',
  approvalNode: 'Approval',
  automatedStepNode: 'Automated Step',
  endNode: 'End',
};
