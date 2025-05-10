import React from "react";
import { cn } from "@/lib/utils";

interface MindMapNodeProps {
  x: string;
  y: string;
  r: string;
  className?: string;
  children: React.ReactNode;
}

const MindMapNode: React.FC<MindMapNodeProps> = ({ 
  x, y, r, className, children 
}) => {
  return (
    <>
      <circle 
        cx={x} 
        cy={y} 
        r={r} 
        className={cn("mindmap-node", className)}
      />
      <text 
        x={x} 
        y={y} 
        textAnchor="middle" 
        alignmentBaseline="middle" 
        fill="white" 
        fontSize="10"
      >
        {children}
      </text>
    </>
  );
};

interface MindMapConnectionProps {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  className?: string;
}

const MindMapConnection: React.FC<MindMapConnectionProps> = ({ 
  x1, y1, x2, y2, className 
}) => {
  return (
    <line 
      x1={x1} 
      y1={y1} 
      x2={x2} 
      y2={y2} 
      className={cn("mindmap-connection", className)}
    />
  );
};

interface MindMapProps {
  title: string;
  nodes: Array<{
    id: string;
    label: string;
    position: { x: string; y: string };
    color: string;
  }>;
  connections: Array<{
    source: string;
    target: string;
  }>;
  className?: string;
}

const MindMap: React.FC<MindMapProps> = ({ 
  title, nodes, connections, className 
}) => {
  // Find the central node (usually the first one)
  const centralNode = nodes.find(node => node.id === "central") || nodes[0];

  return (
    <div className={cn("bg-dark-900 rounded-xl p-4 border border-dark-700 min-h-[300px] relative", className)}>
      <svg width="100%" height="300" className="overflow-visible">
        {/* Draw all the connections first */}
        {connections.map((connection, idx) => {
          const source = nodes.find(n => n.id === connection.source);
          const target = nodes.find(n => n.id === connection.target);
          
          if (!source || !target) return null;
          
          return (
            <MindMapConnection
              key={`connection-${idx}`}
              x1={source.position.x}
              y1={source.position.y}
              x2={target.position.x}
              y2={target.position.y}
            />
          );
        })}
        
        {/* Then draw all the nodes */}
        {nodes.map((node) => (
          <MindMapNode
            key={node.id}
            x={node.position.x}
            y={node.position.y}
            r={node.id === "central" ? "40" : "30"}
            className={`fill-${node.color}-500`}
          >
            {node.label}
          </MindMapNode>
        ))}
      </svg>
    </div>
  );
};

export { MindMap, MindMapNode, MindMapConnection };
