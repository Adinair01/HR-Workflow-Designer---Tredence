# HR Workflow Designer

A production-quality visual workflow builder for HR processes, built with React + Vite + TypeScript + React Flow.

# LIVE - https://hr-workflow-designer-tredence.vercel.app/
## Features

- **Drag-and-drop canvas** — drag nodes from the sidebar onto the canvas
- **5 node types** — Start, Task, Approval, Automated Step, End
- **Dynamic config panel** — click any node to edit its properties in a side panel
- **Mock API layer** — 6 automation actions with dynamic parameter forms
- **Workflow sandbox** — validate and simulate execution with step-by-step logs
- **Export / Import** — serialize the workflow to JSON and reload it
- **Validation** — checks for start node, end node, disconnected nodes, and cycles
- **MiniMap** — bird's-eye view of the canvas

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 + Vite | UI framework + build tool |
| TypeScript | Type safety |
| React Flow (@xyflow/react) | Canvas + node/edge engine |
| Zustand | Global state management |
| Tailwind CSS v4 | Styling |
| Lucide React | Icons |

## Project Structure

```
src/
├── types/           # All TypeScript interfaces (node data, API, validation)
├── store/           # Zustand store (workflowStore.ts)
├── hooks/           # Custom hooks
│   ├── useWorkflow.ts     # Export/import/reset
│   ├── useNodes.ts        # Node CRUD + canvas events
│   └── useSimulation.ts   # Validation + simulation runner
├── services/api/    # Mock API layer
│   ├── automations.ts     # GET /automations mock
│   └── simulation.ts      # POST /simulate mock
├── components/
│   ├── nodes/             # 5 node components + BaseNode
│   ├── forms/             # Per-node config forms + reusable inputs
│   ├── WorkflowCanvas.tsx # React Flow canvas
│   ├── Sidebar.tsx        # Draggable node palette
│   ├── NodeConfigPanel.tsx# Right-side config panel
│   ├── SimulationPanel.tsx# Bottom sandbox panel
│   └── Toolbar.tsx        # Top bar with export/import/reset
└── utils/
    ├── nodeDefaults.ts    # Default data per node type
    ├── nodeConfig.ts      # Colors, labels, sidebar definitions
    └── validation.ts      # Workflow validation logic
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## How to Use

1. **Add nodes** — drag any node type from the left sidebar onto the canvas
2. **Connect nodes** — drag from the bottom handle of one node to the top handle of another
3. **Configure nodes** — click a node to open the config panel on the right
4. **Simulate** — click the "Workflow Sandbox" bar at the bottom, then "Run Simulation"
5. **Export** — click "Export" in the toolbar to download the workflow as JSON
6. **Import** — click "Import" to load a previously exported JSON file

## Validation Rules

- Must have at least one **Start** node
- Must have at least one **End** node
- No **disconnected** nodes (every node must be connected)
- No **cycles** (workflow must be a DAG)
- Task nodes require a **title**

## Mock API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /automations` | Returns 6 automation actions with typed parameters |
| `POST /simulate` | Runs topological sort and returns step-by-step execution logs |

Both are implemented as local service functions with simulated network delay.
