import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { Handle, Position } from "reactflow";
// Custom node component to be used in React Flow
const TextNode = ({ data }) => {
  return (
    <div
      style={{
        fontSize: 10,
        border: "1px solid #ddd",
        borderRadius: 5,
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          backgroundColor: "#d4f3e4",
          display: "flex",
          gap: 3,
          padding: "2px 5px",
          alignItems: "center",
        }}
      >
        <BiMessageRoundedDetail /> Send Message{" "}
        <FaWhatsapp
          color="green"
          style={{
            marginLeft: 30,
            backgroundColor: "white",
            borderRadius: 5,
            padding: 1,
          }}
        />
      </div>
      <div style={{ padding: 5 }}>{data.label}</div>
      {/* Handle for connecting edges to other nodes */}
      <Handle type="source" position={Position.Right} id="source" />
      <Handle type="target" position={Position.Left} id="target" />
    </div>
  );
};

export default TextNode;
