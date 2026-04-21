import { Plus, Trash2 } from 'lucide-react';
import type { CustomField } from '@/types';
import { TextInput } from './TextInput';

interface CustomFieldsEditorProps {
  fields: CustomField[];
  onChange: (fields: CustomField[]) => void;
}

export function CustomFieldsEditor({ fields, onChange }: CustomFieldsEditorProps) {
  const addField = () => {
    onChange([
      ...fields,
      { id: `cf-${Date.now()}`, label: '', value: '' },
    ]);
  };

  const updateField = (id: string, key: 'label' | 'value', val: string) => {
    onChange(fields.map((f) => (f.id === id ? { ...f, [key]: val } : f)));
  };

  const removeField = (id: string) => {
    onChange(fields.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-2">
      {fields.map((field) => (
        <div key={field.id} className="flex gap-2 items-center">
          <TextInput
            value={field.label}
            onChange={(v) => updateField(field.id, 'label', v)}
            placeholder="Field name"
          />
          <TextInput
            value={field.value}
            onChange={(v) => updateField(field.id, 'value', v)}
            placeholder="Value"
          />
          <button
            onClick={() => removeField(field.id)}
            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button
        onClick={addField}
        className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
      >
        <Plus size={13} />
        Add Custom Field
      </button>
    </div>
  );
}
