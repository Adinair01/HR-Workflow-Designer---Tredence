import type {
  WorkflowNode,
  WorkflowEdge,
  ValidationResult,
  ValidationError,
} from '@/types';

// ─── Cycle Detection (DFS) ─────────────────────────────────────────────────────

function hasCycle(nodes: WorkflowNode[], edges: WorkflowEdge[]): boolean {
  const adjacency = new Map<string, string[]>();
  nodes.forEach((n) => adjacency.set(n.id, []));
  edges.forEach((e) => adjacency.get(e.source)?.push(e.target));

  const visited = new Set<string>();
  const inStack = new Set<string>();

  function dfs(nodeId: string): boolean {
    visited.add(nodeId);
    inStack.add(nodeId);
    for (const neighbor of adjacency.get(nodeId) ?? []) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) return true;
      } else if (inStack.has(neighbor)) {
        return true;
      }
    }
    inStack.delete(nodeId);
    return false;
  }

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (dfs(node.id)) return true;
    }
  }
  return false;
}

// ─── Main Validation ───────────────────────────────────────────────────────────

export function validateWorkflow(
  nodes: WorkflowNode[],
  edges: WorkflowEdge[]
): ValidationResult {
  const errors: ValidationError[] = [];

  // 1. Must have at least one start node
  const startNodes = nodes.filter((n) => n.type === 'startNode');
  if (startNodes.length === 0) {
    errors.push({
      nodeId: 'global',
      field: 'startNode',
      message: 'Workflow must have at least one Start node.',
    });
  }

  // 2. Must have at least one end node
  const endNodes = nodes.filter((n) => n.type === 'endNode');
  if (endNodes.length === 0) {
    errors.push({
      nodeId: 'global',
      field: 'endNode',
      message: 'Workflow must have at least one End node.',
    });
  }

  // 3. No disconnected nodes (every node must have at least one edge)
  const connectedNodeIds = new Set<string>();
  edges.forEach((e) => {
    connectedNodeIds.add(e.source);
    connectedNodeIds.add(e.target);
  });

  nodes.forEach((n) => {
    if (!connectedNodeIds.has(n.id) && nodes.length > 1) {
      const title = 'title' in n.data ? n.data.title : n.type;
      errors.push({
        nodeId: n.id,
        field: 'connection',
        message: `Node "${title}" is disconnected from the workflow.`,
      });
    }
  });

  // 4. No cycles
  if (hasCycle(nodes, edges)) {
    errors.push({
      nodeId: 'global',
      field: 'cycle',
      message: 'Workflow contains a cycle. Workflows must be acyclic (DAG).',
    });
  }

  // 5. Task nodes must have a title
  nodes
    .filter((n) => n.type === 'taskNode')
    .forEach((n) => {
      const data = n.data as { title?: string };
      if (!data.title?.trim()) {
        errors.push({
          nodeId: n.id,
          field: 'title',
          message: 'Task node requires a title.',
        });
      }
    });

  return { valid: errors.length === 0, errors };
}

// ─── Per-node field validation ─────────────────────────────────────────────────

export function getNodeValidationErrors(
  node: WorkflowNode,
  allErrors: ValidationError[]
): ValidationError[] {
  return allErrors.filter((e) => e.nodeId === node.id);
}
