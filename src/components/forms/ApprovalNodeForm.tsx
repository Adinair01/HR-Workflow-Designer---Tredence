import { useWorkflowStore } from '@/store/workflowStore';
import type { ApprovalNodeData } from '@/types';
import { FormField } from './FormField';
import { TextInput } from './TextInput';
import { SelectInput } from './SelectInput';

interface ApprovalNodeFormProps {
  nodeId: string;
  data: ApprovalNodeData;
}

const APPROVER_ROLES = [
  { value: 'manager', label: 'Manager' },
  { value: 'hr_director', label: 'HR Director' },
  { value: 'vp_hr', label: 'VP of HR' },
  { value: 'ceo', label: 'CEO' },
  { value: 'legal', label: 'Legal Team' },
  { value: 'finance', label: 'Finance Team' },
];

export function ApprovalNodeForm({ nodeId, data }: ApprovalNodeFormProps) {
  const { updateNodeData } = useWorkflowStore();

  const update = (partial: Partial<ApprovalNodeData>) => {
    updateNodeData(nodeId, partial);
  };

  return (
    <div className="space-y-4">
      <FormField label="Title" required>
        <TextInput
          value={data.title}
          onChange={(v) => update({ title: v })}
          placeholder="Approval step title"
        />
      </FormField>

      <FormField label="Approver Role" hint="Who needs to approve this step">
        <SelectInput
          value={data.approverRole}
          onChange={(v) => update({ approverRole: v })}
          options={APPROVER_ROLES}
          placeholder="Select role..."
        />
      </FormField>

      <FormField
        label="Auto-Approve Threshold (%)"
        hint="Automatically approve if score exceeds this value (0 = disabled)"
      >
        <TextInput
          type="number"
          value={String(data.autoApproveThreshold)}
          onChange={(v) => update({ autoApproveThreshold: Number(v) })}
          placeholder="0"
        />
      </FormField>
    </div>
  );
}
