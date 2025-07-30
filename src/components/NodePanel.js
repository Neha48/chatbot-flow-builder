import { BiMessageRoundedDetail } from "react-icons/bi";

// Sidebar panel containing draggable node types
function NodePanel() {
  // Handles the drag start event when user drags a node type
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType); // Set the node type being dragged
    event.dataTransfer.effectAllowed = "move"; // Indicate a move operation
  };

  return (
    <div style={{ padding: 10 }}>
      {/* Message Text Node */}
      <div
        onDragStart={(e) => onDragStart(e, "textNode")}
        draggable
        style={{
          border: "1px solid #000",
          padding: 10,
          cursor: "grab",
          width: 150,
          height: 50,
          padding: 10,
          textAlign: "center",
        }}
      >
        <BiMessageRoundedDetail fontSize={28} />
        <br />
        Message
      </div>
    </div>
  );
}

export default NodePanel;
