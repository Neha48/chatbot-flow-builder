import { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MarkerType,
  MiniMap,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import TextNode from "./nodes/TextNode";

let id = 0;
// Unique ID generator for new nodes
const getId = () => `node_${id++}`;

// Register custom node types
const nodeTypes = {
  textNode: TextNode,
};

const FlowCanvas = ({
  nodes,
  setNodes,
  edges,
  setEdges,
  onNodesChange,
  setSelectedNode,
}) => {
  const { project } = useReactFlow(); // converts screen coordinates to flow canvas coordinates

  // Handle new edge connections
  const onConnect = useCallback(
    (params) => {
      const existingEdge = edges.find((e) => e.source === params.source);
      if (!existingEdge) {
        const newEdge = {
          ...params,
          type: "SimpleBezier",
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        };
        setEdges((eds) => addEdge(newEdge, eds));
      }
    },
    [edges, setEdges]
  );

  // Handle drop of a new node onto the canvas
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow"); // get node type
      const reactflowBounds = event.currentTarget.getBoundingClientRect(); // canvas bounds
      const position = project({
        x: event.clientX - reactflowBounds.left,
        y: event.clientY - reactflowBounds.top,
      });
      const newNode = {
        id: getId(),
        type: type, // use the dropped node type
        position,
        data: { label: "test message" }, // default label
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [project, setNodes]
  );

  // Allow dragging over the canvas for dropping new nodes
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // Handle clicking on a node — update selected node state
  const onNodeClick = (_, node) => {
    setSelectedNode(node);
  };

  return (
    <div
      style={{ width: "100%", height: "100%" }}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onNodesChange={onNodesChange}
        fitView
        onPaneClick={() => setSelectedNode(null)} // deselect node when clicking outside
        onNodesDelete={() => setSelectedNode(null)} // clear selection if node is deleted
        nodeTypes={nodeTypes} //custom node types
      >
        {/* Shows overview map of flow */}
        <MiniMap />
        <Controls /> {/* Zoom and fit controls */}
        <Background /> {/* Grid background */}
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;
