"use client";
import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  ReactFlowProvider,
  Edge,
  Background,
  BackgroundVariant,
  MiniMap,
  Panel,
  ConnectionMode,
  useEdges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AnnotationNode } from "@/app/components/AnnotaionNode";
import WavyEdge from "../components/WavyEdge";
import { TextUpdaterNode } from "./TextUpdatedNode";
import { Button } from "@/components/ui/button";
import { CustomNode } from "./CustomNode";

const nodeTypes = {
  annotation: AnnotationNode,
  textUpdater: TextUpdaterNode,
  normal: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: "annotation-1",
    type: "annotation",
    draggable: true,
    selectable: true,
    deletable: true,
    data: {
      label: 'This is a "node"',
      arrowStyle: "arrow-bottom-right",
    },
    position: { x: -65, y: -50 },
  },
  {
    id: "1-1",
    type: "normal",
    draggable: true,
    selectable: true,
    data: {
      label: "node label",
    },
    position: { x: 150, y: 0 },
  },
  {
    id: "1-2",
    type: "normal",
    draggable: true,
    selectable: true,
    data: {
      label: "node label",
    },
    position: { x: 350, y: 200 },
  },

  {
    id: "1-3",
    type: "textUpdater",
    draggable: true,
    selectable: true,
    data: {
      label: "Try dragging the handle",
      arrowStyle: "arrow-top-left",
    },
    position: { x: 43, y: 24 },
  },
];

const initialEdges: Edge[] = [
  { id: "1-2-1-1", source: "1-1", label: "step", target: "1-2", type: "wavy" },
];

const edgeTypes = {
  wavy: WavyEdge,
};
function ReactFlowExample() {
    const edgesInfo = useEdges();
    console.log(edgesInfo)
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: any) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback((params: any) => {
    console.log(params);
    return setEdges((edgesSnapshot) =>
      addEdge({ ...params, type: "wavy" }, edgesSnapshot, {})
    );
  }, []);
  const onNodesDelete = useCallback((deletedNodes) => {
    console.log("Deleted:", deletedNodes);

    setEdges((eds) =>
      eds.filter(
        (e) => !deletedNodes.some((n) => n.id === e.source || n.id === e.target)
      )
    );
  }, []);
  return (
    <div
      style={{ width: "80vw", height: "80vh" }}
      className="rounded-2xl border-2 border-gray-400"
    >
      <ReactFlow
        nodes={nodes}
        deleteKeyCode={["Delete"]}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesDelete={onNodesDelete}
        // onDelete={onDelete}
        fitView
        // connectionMode={ConnectionMode.Loose}
      >
        <Panel position="bottom-left">
          <div>
            <span>This is the panel map</span>
            <Button
              onClick={() => {
                setNodes((nds) => [
                  ...nds,
                  {
                    id: crypto.randomUUID(), // unique id
                    type: "normal", // your custom node
                    position: {
                      x: Math.floor(Math.random() * 240) + 10,
                      y: Math.floor(Math.random() * 140) + 10,
                    }, // initial position
                    data: { label: "New Node" },
                  },
                ]);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add Node
            </Button>
          </div>
        </Panel>
        <MiniMap
          nodeStrokeWidth={2}
          nodeStrokeColor="#ffffff"
          nodeColor={"#e2e2e2"}
        />
        <Background />
      </ReactFlow>
    </div>
  );
}
export default function ReactFlowContainer() {
  return (
    <ReactFlowProvider>
      <ReactFlowExample />
    </ReactFlowProvider>
  );
}
