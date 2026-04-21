import { memo } from 'react';
import { type NodeProps } from '@xyflow/react';
import { StopCircle } from 'lucide-react';
import { BaseNode } from './BaseNode';
import type { EndNodeData } from '@/types';

export const EndNode = memo(function EndNode({ id, data, selected }: NodeProps & { data: EndNodeData }) {
  return (
    <BaseNode
      id={id}
      nodeType="endNode"
      label="End"
      icon={<StopCircle size={14} />}
      selected={selected}
      hasSourceHandle={false}
    >
      <div className="space-y-0.5">
        {data.endMessage && (
          <p className="truncate">{data.endMessage}</p>
        )}
        {data.summaryFlag && (
          <span className="inline-block bg-rose-100 text-rose-600 text-xs px-1.5 py-0.5 rounded">
            Summary
          </span>
        )}
      </div>
    </BaseNode>
  );
});
