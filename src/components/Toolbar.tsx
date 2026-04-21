import { useRef } from 'react';
import {
  Download,
  Upload,
  Trash2,
  GitBranch,
} from 'lucide-react';
import { useWorkflow } from '@/hooks/useWorkflow';

export function Toolbar() {
  const { downloadWorkflow, loadWorkflow, resetWorkflow } = useWorkflow();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      loadWorkflow(file);
      e.target.value = '';
    }
  };

  return (
    <header className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-200 shadow-sm z-20">
      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 bg-indigo-600 rounded-lg">
          <GitBranch size={16} className="text-white" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-gray-900">HR Workflow Designer</h1>
          <p className="text-xs text-gray-400">Visual workflow builder</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="
            flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium
            text-gray-600 bg-gray-100 rounded-lg
            hover:bg-gray-200 transition-colors
          "
          title="Import workflow JSON"
        >
          <Upload size={13} />
          Import
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImport}
        />

        <button
          onClick={downloadWorkflow}
          className="
            flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium
            text-gray-600 bg-gray-100 rounded-lg
            hover:bg-gray-200 transition-colors
          "
          title="Export workflow as JSON"
        >
          <Download size={13} />
          Export
        </button>

        <div className="w-px h-5 bg-gray-200" />

        <button
          onClick={() => {
            if (confirm('Reset the entire workflow? This cannot be undone.')) {
              resetWorkflow();
            }
          }}
          className="
            flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium
            text-red-600 bg-red-50 rounded-lg
            hover:bg-red-100 transition-colors
          "
          title="Clear all nodes and edges"
        >
          <Trash2 size={13} />
          Reset
        </button>
      </div>
    </header>
  );
}
