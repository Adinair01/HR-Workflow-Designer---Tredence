import { useEffect, useState } from 'react';
import { useWorkflowStore } from '@/store/workflowStore';
import { getAutomations } from '@/services/api';
import type { AutomatedStepNodeData, AutomationAction } from '@/types';
import { FormField } from './FormField';
import { TextInput } from './TextInput';
import { SelectInput } from './SelectInput';
import { ToggleInput } from './ToggleInput';
import { Loader2 } from 'lucide-react';

interface AutomatedStepNodeFormProps {
  nodeId: string;
  data: AutomatedStepNodeData;
}

export function AutomatedStepNodeForm({ nodeId, data }: AutomatedStepNodeFormProps) {
  const { updateNodeData } = useWorkflowStore();
  const [automations, setAutomations] = useState<AutomationAction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAutomations().then((actions) => {
      setAutomations(actions);
      setLoading(false);
    });
  }, []);

  const update = (partial: Partial<AutomatedStepNodeData>) => {
    updateNodeData(nodeId, partial);
  };

  const selectedAction = automations.find((a) => a.id === data.selectedActionId);

  const handleActionChange = (actionId: string) => {
    update({ selectedActionId: actionId, actionParams: {} });
  };

  const handleParamChange = (paramName: string, value: string) => {
    update({
      actionParams: { ...data.actionParams, [paramName]: value },
    });
  };

  return (
    <div className="space-y-4">
      <FormField label="Title" required>
        <TextInput
          value={data.title}
          onChange={(v) => update({ title: v })}
          placeholder="Automated step title"
        />
      </FormField>

      <FormField label="Action" hint="Select an automation to execute">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-gray-400 py-1.5">
            <Loader2 size={14} className="animate-spin" />
            Loading automations...
          </div>
        ) : (
          <SelectInput
            value={data.selectedActionId}
            onChange={handleActionChange}
            options={automations.map((a) => ({ value: a.id, label: a.name }))}
            placeholder="Select action..."
          />
        )}
      </FormField>

      {selectedAction && (
        <div className="space-y-3 pt-1 border-t border-gray-100">
          <p className="text-xs text-gray-500 italic">{selectedAction.description}</p>

          {selectedAction.params.map((param) => (
            <FormField
              key={param.name}
              label={param.label}
              required={param.required}
            >
              {param.type === 'select' && param.options ? (
                <SelectInput
                  value={data.actionParams[param.name] ?? ''}
                  onChange={(v) => handleParamChange(param.name, v)}
                  options={param.options.map((o) => ({ value: o, label: o }))}
                />
              ) : param.type === 'boolean' ? (
                <ToggleInput
                  value={data.actionParams[param.name] === 'true'}
                  onChange={(v) => handleParamChange(param.name, String(v))}
                  label={param.label}
                />
              ) : (
                <TextInput
                  type={param.type === 'number' ? 'number' : 'text'}
                  value={data.actionParams[param.name] ?? ''}
                  onChange={(v) => handleParamChange(param.name, v)}
                  placeholder={`Enter ${param.label.toLowerCase()}`}
                />
              )}
            </FormField>
          ))}
        </div>
      )}
    </div>
  );
}
