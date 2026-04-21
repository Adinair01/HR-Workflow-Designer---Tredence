import { useCallback } from 'react';
import { useWorkflowStore } from '@/store/workflowStore';
import type { NodeType, WorkflowNode, WorkflowNodeData } from '@/types';
import { getDefaultNodeData } from '@/utils/nodeDefaults';

export function useNodes() {
  const {
    nodes,
    edges,
    selectedNodeId,
    addNode,
    updateNodeData,
    deleteNode,
    selectNode,
    getSelectedNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    deleteEdge,
  } = useWorkflowStore();

  const createNode = useCallback(
    (type: NodeType, position: { x: number; y: number }): WorkflowNode => {
      const id = `${type}-${Date.now()}`;
      const data = getDefaultNodeData(type);
      return {
        id,
        type,
        position,
        data,
      } as WorkflowNode;
    },
    []
  );

  const addNewNode = useCallback(
    (type: NodeType, position: { x: number; y: number }) => {
      const node = createNode(type, position);
      addNode(node);
      selectNode(node.id);
      return node;
    },
    [createNode, addNode, selectNode]
  );

  const updateNode = useCallback(
    (nodeId: string, data: Partial<WorkflowNodeData>) => {
      updateNodeData(nodeId, data);
    },
    [updateNodeData]
  );

  const removeNode = useCallback(
    (nodeId: string) => {
      deleteNode(nodeId);
    },
    [deleteNode]
  );

  const selectedNode = getSelectedNode();

  return {
    nodes,
    edges,
    selectedNodeId,
    selectedNode,
    addNewNode,
    updateNode,
    removeNode,
    selectNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    deleteEdge,
  };
}
