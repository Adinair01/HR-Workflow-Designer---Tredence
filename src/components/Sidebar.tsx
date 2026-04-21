import { Play, CheckSquare, ShieldCheck, Zap, StopCircle, GripVertical } from 'lucide-react';
import { SIDEBAR_NODES } from '@/utils/nodeConfig';
import type { SidebarNodeDef } from '@/types';

const ICON_MAP: Record<string, React.ReactNode> = {
  Play: <Play size={16} />,
  CheckSquare: <CheckSquare size={16} />,
  ShieldCheck: <ShieldCheck size={16} />,
  Zap: <Zap size={16} />,
  StopCircle: <StopCircle size={16} />,
};

function SidebarNodeCard({ node }: { node: SidebarNodeDef }) {
  const onDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/reactflow-type', node.type);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="
        flex items-center gap-3 p-3 rounded-xl border border-gray-200
        bg-white hover:border-indigo-300 hover:shadow-md
        cursor-grab active:cursor-grabbing
        transition-all duration-150 group
      "
      title={`Drag to add ${node.label} node`}
    >
      <div className={`p-2 rounded-lg text-white flex-shrink-0 ${node.color}`}>
        {ICON_MAP[node.icon]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800">{node.label}</p>
        <p className="text-xs text-gray-400 truncate">{node.description}</p>
      </div>
      <GripVertical size={14} className="text-gray-300 group-hover:text-gray-400 flex-shrink-0" />
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-200">
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Node Palette</h2>
        <p className="text-xs text-gray-400 mt-0.5">Drag nodes onto the canvas</p>
      </div>

      {/* Node list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {SIDEBAR_NODES.map((node) => (
          <SidebarNodeCard key={node.type} node={node} />
        ))}
      </div>

      {/* Footer hint */}
      <div className="px-4 py-3 border-t border-gray-200 bg-white">
        <p className="text-xs text-gray-400 text-center">
          Connect nodes by dragging from handle to handle
        </p>
      </div>
    </aside>
  );
}
