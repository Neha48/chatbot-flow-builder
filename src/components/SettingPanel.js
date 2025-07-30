import { FaArrowLeft } from "react-icons/fa";
// SettingsPanel allows editing the selected node's text content
function SettingsPanel({ selectedNode, setSelectedNode, setNodes, nodes }) {
  // Handler to update the label/text of the selected node
  const handleTextChange = (e) => {
    const updatedNodes = nodes.map((node) =>
      node.id === selectedNode.id
        ? { ...node, data: { ...node.data, label: e.target.value } }
        : node
    );
    setNodes(updatedNodes);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <FaArrowLeft
          style={{ paddingInline: 10, cursor: "pointer" }}
          onClick={() => setSelectedNode(null)} // Deselect node on click
        />
        <div style={{ textAlign: "center", width: "250px" }}>Message</div>
      </div>
      <hr />
      {/* Editable text area for node content */}
      <div style={{ paddingInline: 10, paddingBlock: 5 }}>
        <span style={{ color: "gray" }}>Text</span>
        <textarea
          rows={3}
          value={selectedNode?.data?.label || ""}
          onChange={handleTextChange}
          style={{ width: "90%", padding: "5px", margin: "5px" }}
        />
      </div>
      <hr />
    </div>
  );
}

export default SettingsPanel;
