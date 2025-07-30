import { toast } from "react-toast";
const SaveButton = ({ nodes, edges }) => {
  const handleSave = () => {
    // Count how many nodes have no outgoing edges
    const nodeHasOutgoing = new Set(edges.map((e) => e.source));
    const nodesWithoutOutgoing = nodes.filter(
      (n) => !nodeHasOutgoing.has(n.id)
    );

    if (nodes.length > 1 && nodesWithoutOutgoing.length > 1) {
      toast.warn("Cannot save Flow");
    } else {
      const flowData = { nodes, edges };
      console.log("Flow Saved:", flowData);
      toast.success("Flow saved successfully!");
    }
  };

  return (
    <button
      style={{
        backgroundColor: "white",
        border: "1px solid #5b6ef7",
        color: "#5b6ef7",
        fontWeight: "bold",
        padding: "6px 12px",
        borderRadius: 6,
        cursor: "pointer",
        position: "absolute",
        top: 10,
        right: 50,
      }}
      onClick={handleSave}
    >
      Save Changes
    </button>
  );
};

export default SaveButton;
