import { memo } from 'react';
import { type NodeProps } from '@xyflow/react';
import { Play } from 'lucide-react';
import { BaseNode } from './BaseNode';
import type { StartNodeData } from '@/types';

export const StartNode = memo(function StartNode({ id, data, selected }: NodeProps & { data: StartNodeData }) {
  return (
    <BaseNode
      id={id}
      nodeType="startNode"
      label={data.title || 'Start'}
      icon={<Play size={14} />}
      selected={selected}
      hasTargetHandle={false}
    >
      {data.metadata.length > 0 && (
        <div className="space-y-0.5">
          {data.metadata.slice(0, 2).map((m, i) => (
            <div key={i} className="flex gap-1">
              <span className="font-medium text-gray-500">{m.key}:</span>
              <span className="truncate">{m.value}</span>
            </div>
          ))}
          {data.metadata.length > 2 && (
            <span className="text-gray-400">+{data.metadata.length - 2} more</span>
          )}
        </div>
      )}
    </BaseNode>
  );
});
