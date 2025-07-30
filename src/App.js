import { useEffect, useState } from "react";
import { ToastContainer } from "react-toast";
import { ReactFlowProvider, useNodesState } from "reactflow";
import FlowCanvas from "./components/FlowCanvas";
import NodePanel from "./components/NodePanel";
import SaveButton from "./components/SaveButton";
import SettingPanel from "./components/SettingPanel";

function App() {
  const [selectedNode, setSelectedNode] = useState(null);
  // ReactFlow's state hook for managing nodes and their updates
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges] = useState([]);

  const loadFlowFromLocal = () => {
    const saved = localStorage.getItem("flow-data");
    if (!saved) return { nodes: [], edges: [] };
    try {
      return JSON.parse(saved);
    } catch {
      return { nodes: [], edges: [] };
    }
  };

  useEffect(() => {
    const { nodes: savedNodes, edges: savedEdges } = loadFlowFromLocal();
    setNodes(savedNodes || []);
    setEdges(savedEdges || []);
  }, []);

  // Keep selectedNode in sync with the updated nodes list
  useEffect(() => {
    if (!selectedNode) return;

    const updated = nodes.find((n) => n.id === selectedNode.id);
    if (updated) {
      setSelectedNode(updated);
    }
  }, [nodes, selectedNode]);

  // Handle delete/backspace key to remove selected node and its edges
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        if (selectedNode) {
          setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
          // Remove all edges connected to the deleted node
          setEdges((eds) =>
            eds.filter(
              (e) =>
                e.source !== selectedNode.id && e.target !== selectedNode.id
            )
          );
          setSelectedNode(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNode]);

  return (
    <ReactFlowProvider>
      {/* Toast notifications  */}
      <ToastContainer position="top" style={{ backgroundColor: "white" }} />
      <div style={{ backgroundColor: "#f0f0f0", padding: 1, height: "50px" }}>
        <SaveButton nodes={nodes} edges={edges} />
      </div>
      <div>
        <div
          style={{
            height: "calc(100vh - 50px)",
            borderRight: "1px solid #ddd",
            display: "flex",
          }}
        >
          {/* Flow editor canvas area  */}
          <div
            style={{
              borderRight: "1px solid #ccc",
              width: "80vw",
            }}
          >
            <FlowCanvas
              nodes={nodes}
              setNodes={setNodes}
              edges={edges}
              setEdges={setEdges}
              onNodesChange={onNodesChange}
              setSelectedNode={setSelectedNode}
            />
          </div>
          {/* Side panel: shows node settings or node picker */}
          <div
            style={{
              width: "20vw",
            }}
          >
            {selectedNode ? (
              <SettingPanel
                selectedNode={selectedNode}
                setSelectedNode={setSelectedNode}
                setNodes={setNodes}
                nodes={nodes}
              />
            ) : (
              <NodePanel />
            )}
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
