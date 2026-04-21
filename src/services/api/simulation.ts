import type {
  WorkflowNode,
  WorkflowEdge,
  SimulationResult,
  SimulationLog,
  NodeType,
  WorkflowNodeData,
} from '@/types';

// ─── Helpers ───────────────────────────────────────────────────────────────────

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function getNodeTitle(data: WorkflowNodeData): string {
  if ('title' in data && typeof data.title === 'string') return data.title || 'Untitled';
  return 'Node';
}

function buildExecutionOrder(
  nodes: WorkflowNode[],
  edges: WorkflowEdge[]
): WorkflowNode[] {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const inDegree = new Map<string, number>();
  const adjacency = new Map<string, string[]>();

  nodes.forEach((n) => {
    inDegree.set(n.id, 0);
    adjacency.set(n.id, []);
  });

  edges.forEach((e) => {
    inDegree.set(e.target, (inDegree.get(e.target) ?? 0) + 1);
    adjacency.get(e.source)?.push(e.target);
  });

  // Topological sort (Kahn's algorithm)
  const queue: string[] = [];
  inDegree.forEach((deg, id) => {
    if (deg === 0) queue.push(id);
  });

  const order: WorkflowNode[] = [];
  while (queue.length > 0) {
    const id = queue.shift()!;
    const node = nodeMap.get(id);
    if (node) order.push(node);
    adjacency.get(id)?.forEach((neighbor) => {
      const newDeg = (inDegree.get(neighbor) ?? 1) - 1;
      inDegree.set(neighbor, newDeg);
      if (newDeg === 0) queue.push(neighbor);
    });
  }

  return order;
}

function simulateNode(node: WorkflowNode): SimulationLog {
  const data = node.data;
  const title = getNodeTitle(data);
  const timestamp = new Date().toISOString();

  const messages: Record<NodeType, string> = {
    startNode: `Workflow initiated: "${title}"`,
    taskNode: `Task "${title}" assigned${('assignee' in data && data.assignee) ? ` to ${data.assignee}` : ''}`,
    approvalNode: `Approval requested for "${title}"${('approverRole' in data && data.approverRole) ? ` from ${data.approverRole}` : ''}`,
    automatedStepNode: `Executing automation: "${title}"${('selectedActionId' in data && data.selectedActionId) ? ` [${data.selectedActionId}]` : ''}`,
    endNode: `Workflow completed: ${'endMessage' in data ? data.endMessage || 'Done' : 'Done'}`,
  };

  return {
    nodeId: node.id,
    nodeType: node.type as NodeType,
    nodeTitle: title,
    status: 'success',
    message: messages[node.type as NodeType] ?? `Processed node "${title}"`,
    timestamp,
  };
}

// ─── Simulate API ──────────────────────────────────────────────────────────────

export async function simulate(
  nodes: WorkflowNode[],
  edges: WorkflowEdge[]
): Promise<SimulationResult> {
  await delay(500);

  const orderedNodes = buildExecutionOrder(nodes, edges);
  const logs: SimulationLog[] = [];

  for (const node of orderedNodes) {
    await delay(150); // simulate step-by-step execution
    logs.push(simulateNode(node));
  }

  const endNode = nodes.find((n) => n.type === 'endNode');
  const summaryFlag = endNode && 'summaryFlag' in endNode.data ? endNode.data.summaryFlag : false;

  return {
    success: true,
    logs,
    summary: summaryFlag
      ? `Workflow executed ${logs.length} steps successfully. Summary report generated.`
      : `Workflow executed ${logs.length} steps successfully.`,
  };
}
