import { memo, type ReactNode } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Trash2 } from 'lucide-react';
import { useWorkflowStore } from '@/store/workflowStore';
import { NODE_COLORS } from '@/utils/nodeConfig';
import type { NodeType } from '@/types';

interface BaseNodeProps {
  id: string;
  nodeType: NodeType;
  label: string;
  icon: ReactNode;
  children?: ReactNode;
  selected?: boolean;
  hasSourceHandle?: boolean;
  hasTargetHandle?: boolean;
}

export const BaseNode = memo(function BaseNode({
  id,
  nodeType,
  label,
  icon,
  children,
  selected,
  hasSourceHandle = true,
  hasTargetHandle = true,
}: BaseNodeProps) {
  const { deleteNode, selectNode, validationErrors } = useWorkflowStore();
  const color = NODE_COLORS[nodeType];
  const hasErrors = validationErrors.some((e) => e.nodeId === id);

  return (
    <div
      className={`
        relative min-w-[180px] rounded-xl shadow-lg border-2 bg-white
        transition-all duration-150 cursor-pointer
        ${selected ? 'border-indigo-500 shadow-indigo-200 shadow-xl' : 'border-gray-200 hover:border-gray-300'}
        ${hasErrors ? 'border-red-400' : ''}
      `}
      onClick={() => selectNode(id)}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-t-xl text-white text-sm font-semibold"
        style={{ backgroundColor: color }}
      >
        <span className="flex-shrink-0">{icon}</span>
        <span className="truncate">{label}</span>
        <button
          className="ml-auto p-0.5 rounded hover:bg-white/20 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            deleteNode(id);
          }}
          title="Delete node"
        >
          <Trash2 size={13} />
        </button>
      </div>

      {/* Body */}
      {children && (
        <div className="px-3 py-2 text-xs text-gray-600">{children}</div>
      )}

      {/* Error indicator */}
      {hasErrors && (
        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
      )}

      {/* Handles */}
      {hasTargetHandle && (
        <Handle
          type="target"
          position={Position.Top}
          className="!w-3 !h-3 !bg-gray-400 !border-2 !border-white hover:!bg-indigo-500 transition-colors"
        />
      )}
      {hasSourceHandle && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="!w-3 !h-3 !bg-gray-400 !border-2 !border-white hover:!bg-indigo-500 transition-colors"
        />
      )}
    </div>
  );
});
