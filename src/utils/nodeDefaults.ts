import type { NodeType, WorkflowNodeData } from '@/types';

export function getDefaultNodeData(type: NodeType): WorkflowNodeData {
  switch (type) {
    case 'startNode':
      return { type: 'startNode', title: 'Start', metadata: [] };
    case 'taskNode':
      return {
        type: 'taskNode',
        title: 'New Task',
        description: '',
        assignee: '',
        dueDate: '',
        customFields: [],
      };
    case 'approvalNode':
      return {
        type: 'approvalNode',
        title: 'Approval Required',
        approverRole: '',
        autoApproveThreshold: 0,
      };
    case 'automatedStepNode':
      return {
        type: 'automatedStepNode',
        title: 'Automated Step',
        selectedActionId: '',
        actionParams: {},
      };
    case 'endNode':
      return { type: 'endNode', endMessage: 'Workflow Complete', summaryFlag: false };
  }
}
