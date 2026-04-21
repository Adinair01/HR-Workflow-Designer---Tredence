import { useState } from 'react';
import {
  Play,
  X,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from 'lucide-react';
import { useSimulation } from '@/hooks/useSimulation';
import { NODE_COLORS, NODE_LABELS } from '@/utils/nodeConfig';
import type { SimulationLog } from '@/types';

function LogEntry({ log }: { log: SimulationLog }) {
  const color = NODE_COLORS[log.nodeType];
  const label = NODE_LABELS[log.nodeType];

  const statusIcon = {
    success: <CheckCircle2 size={14} className="text-emerald-500" />,
    error: <XCircle size={14} className="text-red-500" />,
    running: <Loader2 size={14} className="text-blue-500 animate-spin" />,
    pending: <Clock size={14} className="text-gray-400" />,
  }[log.status];

  return (
    <div className="flex gap-3 py-2.5 border-b border-gray-100 last:border-0">
      <div className="flex-shrink-0 mt-0.5">{statusIcon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span
            className="text-xs font-semibold px-1.5 py-0.5 rounded text-white"
            style={{ backgroundColor: color }}
          >
            {label}
          </span>
          <span className="text-xs font-medium text-gray-700 truncate">{log.nodeTitle}</span>
        </div>
        <p className="text-xs text-gray-500">{log.message}</p>
        <p className="text-xs text-gray-300 mt-0.5 font-mono">
          {new Date(log.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}

export function SimulationPanel() {
  const {
    simulationLogs,
    isSimulating,
    simulationSummary,
    validationErrors,
    runSimulation,
    clearSimulation,
  } = useSimulation();

  const [isOpen, setIsOpen] = useState(false);

  const hasResults = simulationLogs.length > 0 || validationErrors.length > 0;

  return (
    <div className="border-t border-gray-200 bg-white">
      {/* Toggle bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen((v) => !v)}
      >
        <div className="flex items-center gap-2">
          <Play size={14} className="text-indigo-600" />
          <span className="text-sm font-semibold text-gray-700">Workflow Sandbox</span>
          {validationErrors.length > 0 && (
            <span className="bg-red-100 text-red-600 text-xs px-1.5 py-0.5 rounded-full font-medium">
              {validationErrors.length} error{validationErrors.length > 1 ? 's' : ''}
            </span>
          )}
          {simulationLogs.length > 0 && (
            <span className="bg-emerald-100 text-emerald-600 text-xs px-1.5 py-0.5 rounded-full font-medium">
              {simulationLogs.length} steps
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasResults && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearSimulation();
              }}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={13} />
            </button>
          )}
          {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </div>
      </div>

      {/* Panel content */}
      {isOpen && (
        <div className="border-t border-gray-100 max-h-72 flex flex-col">
          {/* Actions */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-100">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="
                flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold
                bg-indigo-600 text-white rounded-lg
                hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
              "
            >
              {isSimulating ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <Play size={12} />
              )}
              {isSimulating ? 'Simulating...' : 'Run Simulation'}
            </button>
          </div>

          {/* Validation errors */}
          {validationErrors.length > 0 && (
            <div className="px-4 py-3 bg-red-50 border-b border-red-100">
              <div className="flex items-center gap-1.5 mb-2">
                <AlertTriangle size={13} className="text-red-500" />
                <span className="text-xs font-semibold text-red-700">Validation Errors</span>
              </div>
              <ul className="space-y-1">
                {validationErrors.map((err, i) => (
                  <li key={i} className="text-xs text-red-600">
                    • {err.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Logs */}
          {simulationLogs.length > 0 && (
            <div className="flex-1 overflow-y-auto px-4">
              {simulationLogs.map((log, i) => (
                <LogEntry key={i} log={log} />
              ))}
            </div>
          )}

          {/* Summary */}
          {simulationSummary && (
            <div className="px-4 py-2.5 bg-emerald-50 border-t border-emerald-100">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-600" />
                <p className="text-xs text-emerald-700 font-medium">{simulationSummary}</p>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!isSimulating && simulationLogs.length === 0 && validationErrors.length === 0 && (
            <div className="flex-1 flex items-center justify-center py-6 text-gray-400 text-xs">
              Run simulation to see execution logs
            </div>
          )}
        </div>
      )}
    </div>
  );
}
