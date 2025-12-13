import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Handle, Position } from "@xyflow/react";
import { useCallback } from "react";
import { motion } from "framer-motion";

export function CustomNode(props) {
  return (
    <div className="reltavie">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }} // show with animation
        animate={{
          opacity: 1,
          rotate: props.selected ? [0, 2, -2, 0] : 0,
          scale: props.selected ? 1.07 : 1, // grow when selected
          y: 0,
        }}
        whileHover={{ scale: props.selected ? 1.1 : 1.04 }} // gentle hover effect
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
        className={`glass-node border-2  rounded-md p-4 bg-white ${
          props?.selected ? "border-blue-500" : "border-gray-400"
        }`}
      >
        <Handle
          type="target"
          position={Position.Top}
          id="a"
          style={{ background: "#6366f1" }}
        />
        <div>
          <Label>This is Node</Label>
        </div>
        <Handle
          type="source"
          position={Position.Bottom}
          id="b"
          style={{ background: "#6366f1" }}
        />
      </motion.div>
    </div>
  );
}
