import { useWorkflowStore } from '@/store/workflowStore';
import type { StartNodeData } from '@/types';
import { FormField } from './FormField';
import { TextInput } from './TextInput';
import { MetadataEditor } from './MetadataEditor';

interface StartNodeFormProps {
  nodeId: string;
  data: StartNodeData;
}

export function StartNodeForm({ nodeId, data }: StartNodeFormProps) {
  const { updateNodeData } = useWorkflowStore();

  const update = (partial: Partial<StartNodeData>) => {
    updateNodeData(nodeId, partial);
  };

  return (
    <div className="space-y-4">
      <FormField label="Title" required>
        <TextInput
          value={data.title}
          onChange={(v) => update({ title: v })}
          placeholder="Workflow start title"
        />
      </FormField>

      <FormField label="Metadata" hint="Key-value pairs attached to this node">
        <MetadataEditor
          entries={data.metadata}
          onChange={(metadata) => update({ metadata })}
        />
      </FormField>
    </div>
  );
}
