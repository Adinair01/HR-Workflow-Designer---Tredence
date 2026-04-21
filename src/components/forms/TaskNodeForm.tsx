import { useWorkflowStore } from '@/store/workflowStore';
import type { TaskNodeData } from '@/types';
import { FormField } from './FormField';
import { TextInput } from './TextInput';
import { CustomFieldsEditor } from './CustomFieldsEditor';

interface TaskNodeFormProps {
  nodeId: string;
  data: TaskNodeData;
}

export function TaskNodeForm({ nodeId, data }: TaskNodeFormProps) {
  const { updateNodeData, validationErrors } = useWorkflowStore();
  const titleError = validationErrors.find(
    (e) => e.nodeId === nodeId && e.field === 'title'
  )?.message;

  const update = (partial: Partial<TaskNodeData>) => {
    updateNodeData(nodeId, partial);
  };

  return (
    <div className="space-y-4">
      <FormField label="Title" required error={titleError}>
        <TextInput
          value={data.title}
          onChange={(v) => update({ title: v })}
          placeholder="Task title"
        />
      </FormField>

      <FormField label="Description">
        <textarea
          value={data.description}
          onChange={(e) => update({ description: e.target.value })}
          placeholder="Describe this task..."
          rows={3}
          className="
            w-full px-3 py-1.5 text-sm rounded-lg border border-gray-200
            bg-white text-gray-800 placeholder-gray-400 resize-none
            focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
            transition-all
          "
        />
      </FormField>

      <FormField label="Assignee">
        <TextInput
          value={data.assignee}
          onChange={(v) => update({ assignee: v })}
          placeholder="e.g. john.doe@company.com"
        />
      </FormField>

      <FormField label="Due Date">
        <TextInput
          type="date"
          value={data.dueDate}
          onChange={(v) => update({ dueDate: v })}
        />
      </FormField>

      <FormField label="Custom Fields" hint="Add extra fields specific to this task">
        <CustomFieldsEditor
          fields={data.customFields}
          onChange={(customFields) => update({ customFields })}
        />
      </FormField>
    </div>
  );
}
