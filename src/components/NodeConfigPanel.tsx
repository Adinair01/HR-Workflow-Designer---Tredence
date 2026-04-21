import { X } from 'lucide-react';
import { useWorkflowStore } from '@/store/workflowStore';
import { NODE_COLORS, NODE_LABELS } from '@/utils/nodeConfig';
import { StartNodeForm } from './forms/StartNodeForm';
import { TaskNodeForm } from './forms/TaskNodeForm';
import { ApprovalNodeForm } from './forms/ApprovalNodeForm';
import { AutomatedStepNodeForm } from './forms/AutomatedStepNodeForm';
import { EndNodeForm } from './forms/EndNodeForm';
import type { NodeType } from '@/types';

export function NodeConfigPanel() {
  const { selectedNodeId, selectNode, getSelectedNode } = useWorkflowStore();
  const selectedNode = getSelectedNode();

  if (!selectedNodeId || !selectedNode) return null;

  const nodeType = selectedNode.type as NodeType;
  const color = NODE_COLORS[nodeType];
  const label = NODE_LABELS[nodeType];

  return (
    <aside className="w-80 flex-shrink-0 bg-white border-l border-gray-200 flex flex-col shadow-xl z-10">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 text-white"
        style={{ backgroundColor: color }}
      >
        <div>
          <p className="text-xs font-medium opacity-80 uppercase tracking-wider">{label}</p>
          <h3 className="font-semibold text-sm">Configure Node</h3>
        </div>
        <button
          onClick={() => selectNode(null)}
          className="p-1 rounded hover:bg-white/20 transition-colors"
          aria-label="Close panel"
        >
          <X size={16} />
        </button>
      </div>

      {/* Node ID badge */}
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
        <span className="text-xs text-gray-400 font-mono">{selectedNode.id}</span>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {nodeType === 'startNode' && (
          <StartNodeForm nodeId={selectedNode.id} data={selectedNode.data as never} />
        )}
        {nodeType === 'taskNode' && (
          <TaskNodeForm nodeId={selectedNode.id} data={selectedNode.data as never} />
        )}
        {nodeType === 'approvalNode' && (
          <ApprovalNodeForm nodeId={selectedNode.id} data={selectedNode.data as never} />
        )}
        {nodeType === 'automatedStepNode' && (
          <AutomatedStepNodeForm nodeId={selectedNode.id} data={selectedNode.data as never} />
        )}
        {nodeType === 'endNode' && (
          <EndNodeForm nodeId={selectedNode.id} data={selectedNode.data as never} />
        )}
      </div>
    </aside>
  );
}
