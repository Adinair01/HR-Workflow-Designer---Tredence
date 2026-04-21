import { Plus, Trash2 } from 'lucide-react';
import type { MetadataEntry } from '@/types';
import { TextInput } from './TextInput';

interface MetadataEditorProps {
  entries: MetadataEntry[];
  onChange: (entries: MetadataEntry[]) => void;
}

export function MetadataEditor({ entries, onChange }: MetadataEditorProps) {
  const addEntry = () => {
    onChange([...entries, { key: '', value: '' }]);
  };

  const updateEntry = (index: number, field: 'key' | 'value', val: string) => {
    const updated = entries.map((e, i) =>
      i === index ? { ...e, [field]: val } : e
    );
    onChange(updated);
  };

  const removeEntry = (index: number) => {
    onChange(entries.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {entries.map((entry, i) => (
        <div key={i} className="flex gap-2 items-center">
          <TextInput
            value={entry.key}
            onChange={(v) => updateEntry(i, 'key', v)}
            placeholder="Key"
          />
          <TextInput
            value={entry.value}
            onChange={(v) => updateEntry(i, 'value', v)}
            placeholder="Value"
          />
          <button
            onClick={() => removeEntry(i)}
            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button
        onClick={addEntry}
        className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
      >
        <Plus size={13} />
        Add Entry
      </button>
    </div>
  );
}
