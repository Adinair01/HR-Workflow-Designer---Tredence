import { memo } from 'react';
import { type NodeProps } from '@xyflow/react';
import { Zap } from 'lucide-react';
import { BaseNode } from './BaseNode';
import type { AutomatedStepNodeData } from '@/types';

export const AutomatedStepNode = memo(function AutomatedStepNode({
  id,
  data,
  selected,
}: NodeProps & { data: AutomatedStepNodeData }) {
  return (
    <BaseNode
      id={id}
      nodeType="automatedStepNode"
      label={data.title || 'Automated Step'}
      icon={<Zap size={14} />}
      selected={selected}
    >
      {data.selectedActionId ? (
        <div className="flex gap-1">
          <span className="font-medium text-gray-500">Action:</span>
          <span className="truncate capitalize">{data.selectedActionId.replace(/_/g, ' ')}</span>
        </div>
      ) : (
        <span className="text-gray-400 italic">No action selected</span>
      )}
    </BaseNode>
  );
});
