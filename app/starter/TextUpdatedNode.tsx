import { Input } from "@/components/ui/input";
import { Handle, Position, useEdges } from "@xyflow/react";
import { useCallback } from "react";

export function TextUpdaterNode(props) {
    const edges = useEdges();
    console.log(edges);
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="border-2 border-gray-400 rounded-md p-4 bg-white">
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{ background: "#6366f1" }}
      />
      <div>
        <Input onChange={onchange as any} />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{ background: "#6366f1" }}
      />
    </div>
  );
}
