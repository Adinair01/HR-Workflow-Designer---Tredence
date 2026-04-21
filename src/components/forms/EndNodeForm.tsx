import { useWorkflowStore } from '@/store/workflowStore';
import type { EndNodeData } from '@/types';
import { FormField } from './FormField';
import { TextInput } from './TextInput';
import { ToggleInput } from './ToggleInput';

interface EndNodeFormProps {
  nodeId: string;
  data: EndNodeData;
}

export function EndNodeForm({ nodeId, data }: EndNodeFormProps) {
  const { updateNodeData } = useWorkflowStore();

  const update = (partial: Partial<EndNodeData>) => {
    updateNodeData(nodeId, partial);
  };

  return (
    <div className="space-y-4">
      <FormField label="End Message">
        <TextInput
          value={data.endMessage}
          onChange={(v) => update({ endMessage: v })}
          placeholder="e.g. Workflow completed successfully"
        />
      </FormField>

      <FormField label="Generate Summary Report" hint="Attach a summary report to the workflow completion">
        <ToggleInput
          value={data.summaryFlag}
          onChange={(v) => update({ summaryFlag: v })}
          label="Enable summary"
        />
      </FormField>
    </div>
  );
}
