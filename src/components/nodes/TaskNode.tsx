import { memo } from 'react';
import { type NodeProps } from '@xyflow/react';
import { CheckSquare } from 'lucide-react';
import { BaseNode } from './BaseNode';
import type { TaskNodeData } from '@/types';

export const TaskNode = memo(function TaskNode({ id, data, selected }: NodeProps & { data: TaskNodeData }) {
  return (
    <BaseNode
      id={id}
      nodeType="taskNode"
      label={data.title || 'Task'}
      icon={<CheckSquare size={14} />}
      selected={selected}
    >
      <div className="space-y-0.5">
        {data.assignee && (
          <div className="flex gap-1">
            <span className="font-medium text-gray-500">Assignee:</span>
            <span className="truncate">{data.assignee}</span>
          </div>
        )}
        {data.dueDate && (
          <div className="flex gap-1">
            <span className="font-medium text-gray-500">Due:</span>
            <span>{data.dueDate}</span>
          </div>
        )}
        {data.description && (
          <p className="text-gray-400 truncate">{data.description}</p>
        )}
      </div>
    </BaseNode>
  );
});
