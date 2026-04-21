import { ReactFlowProvider } from '@xyflow/react';
import { Toolbar } from './components/Toolbar';
import { Sidebar } from './components/Sidebar';
import { WorkflowCanvas } from './components/WorkflowCanvas';
import { NodeConfigPanel } from './components/NodeConfigPanel';
import { SimulationPanel } from './components/SimulationPanel';

export default function App() {
  return (
    <ReactFlowProvider>
      <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
        {/* Top toolbar */}
        <Toolbar />

        {/* Main layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left sidebar - node palette */}
          <Sidebar />

          {/* Center - canvas + simulation panel */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <WorkflowCanvas />
            <SimulationPanel />
          </div>

          {/* Right panel - node config */}
          <NodeConfigPanel />
        </div>
      </div>
    </ReactFlowProvider>
  );
}
