import { memo } from 'react';
import { type NodeProps } from '@xyflow/react';
import { ShieldCheck } from 'lucide-react';
import { BaseNode } from './BaseNode';
import type { ApprovalNodeData } from '@/types';

export const ApprovalNode = memo(function ApprovalNode({ id, data, selected }: NodeProps & { data: ApprovalNodeData }) {
  return (
    <BaseNode
      id={id}
      nodeType="approvalNode"
      label={data.title || 'Approval'}
      icon={<ShieldCheck size={14} />}
      selected={selected}
    >
      <div className="space-y-0.5">
        {data.approverRole && (
          <div className="flex gap-1">
            <span className="font-medium text-gray-500">Role:</span>
            <span className="truncate">{data.approverRole}</span>
          </div>
        )}
        {data.autoApproveThreshold > 0 && (
          <div className="flex gap-1">
            <span className="font-medium text-gray-500">Auto-approve:</span>
            <span>{data.autoApproveThreshold}%</span>
          </div>
        )}
      </div>
    </BaseNode>
  );
});
