"use client";
import {
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesInitialized,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import NodeComponent from "../../nodes/node-component";
import {
  NodeClassification,
  TaskClassification,
} from "@/modules/nodes/types";
import { makeNode } from "@/modules/nodes/lib/make-node";
import { useEffect } from "react";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Props {
  workflowId: string;
}

const nodeTypes = {
  [NodeClassification.NODE]: NodeComponent,
};

export default function Editor({ workflowId }: Props) {
  const trpc = useTRPC();
  const [nodes, setNodes, onNodesChange] = useNodesState([
    // makeNode(TaskClassification.LAUNCH_BROWSER),
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const initialized = useNodesInitialized();
  const { setViewport, getViewport } = useReactFlow();
  const workflow = useSuspenseQuery(
    trpc.workflows.listUsingId.queryOptions({ id: workflowId })
  );

  useEffect(
    function () {
      const workflowDefinition = JSON.parse(workflow.data.definition);
      if (!workflowDefinition) return;
      setNodes(workflowDefinition.nodes || []);
      setEdges(workflowDefinition.edges || []);
    },
    [workflowId, workflow.data]
  );

  useEffect(
    function () {
      if (!initialized) return;
      const workflowDefinition = JSON.parse(workflow.data.definition);
      if (!workflowDefinition) return;
      setViewport(workflowDefinition.viewport, {
        duration: 1000,
      });
    },
    [initialized]
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
