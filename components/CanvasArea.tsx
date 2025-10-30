'use client';
import React, { useCallback, useEffect, useRef } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  MiniMap,
  Background,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";
import { toPng } from "html-to-image";
import { useTheme } from "next-themes";
import { generateNodesAndEdges } from "@/lib/jsonUtils";
import toast from "react-hot-toast";

interface CanvasAreaProps {
  json: string;
  searchPath: string;
  setSearchResult: (result: { found: boolean; message: string } | null) => void;
  exportImageRef?: React.RefObject<(() => void) | null>;
}

function FlowCanvas({ json, searchPath, setSearchResult, exportImageRef }: CanvasAreaProps) {
  const { theme } = useTheme();
  const flowRef = useRef<HTMLDivElement>(null);
  const prevSearchPath = useRef('');

  const sampleJson = {
    user: {
      name: "John Doe",
      age: 30,
      email: "john@example.com",
      address: {
        street: "123 Main St",
        city: "New York",
        country: "USA"
      }
    },
    items: [
      { id: 1, name: "Laptop", price: 999 },
      { id: 2, name: "Mouse", price: 25 }
    ],
    active: true
  };

  const parsedJson = (() => {
    try {
      return json.trim() ? JSON.parse(json) : sampleJson;
    } catch {
      return sampleJson;
    }
  })();

  const { nodes: initialNodes, edges: initialEdges } = generateNodesAndEdges(parsedJson);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [hoveredNode, setHoveredNode] = React.useState<{ path: string; value: string } | null>(null);


  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onNodeMouseEnter = useCallback((_: any, node: any) => {
    setHoveredNode({
      path: node.id,
      value: node.data?.value ?? node.data?.label ?? '—',
    });
  }, []);

  const onNodeMouseLeave = useCallback(() => {
    setHoveredNode(null);
  }, []);


  const exportToImage = useCallback(async () => {
    if (!flowRef.current) return;
    try {
      const dataUrl = await toPng(flowRef.current, {
        backgroundColor: theme === "dark" ? "#0a0a0a" : "#ffffff",
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = "json-tree.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to export image:", error);
    }
  }, [theme]);

  const onNodeClick = useCallback((_: any, node: any) => {
  if (!node?.id) return;

  navigator.clipboard.writeText(node.id)
    .then(() => {
      toast.success("Path copied!", {
        style: {
          background: theme === "dark" ? "#1f1f1f" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          border: theme === "dark" ? "1px solid #333" : "1px solid #ddd",
        },
      });
    })
    .catch(() => {
      toast.error("Failed to copy path.");
    });
}, [theme]);

  useEffect(() => {
    if (exportImageRef) {
      exportImageRef.current = exportToImage;
    }
  }, [exportToImage, exportImageRef]);

  useEffect(() => {
    try {
      const parsed = json.trim() ? JSON.parse(json) : sampleJson;
      const { nodes: newNodes, edges: newEdges } = generateNodesAndEdges(parsed);
      setNodes(newNodes);
      setEdges(newEdges);
    } catch {
      const { nodes: newNodes, edges: newEdges } = generateNodesAndEdges(sampleJson);
      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [json, setNodes, setEdges]);

  useEffect(() => {
    if (!searchPath || searchPath === prevSearchPath.current) return;
    prevSearchPath.current = searchPath;

    const matchedNode = nodes.find(node => {
      const nodePath = node.id;
      return nodePath === searchPath || nodePath.endsWith(searchPath.replace('$.', '.'));
    });

    if (matchedNode) {
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          style: {
            ...node.style,
            background: node.id === matchedNode.id 
              ? "rgba(255, 235, 59, 0.8)"
              : node.style.background,
            border: node.id === matchedNode.id
              ? "3px solid #f59e0b"
              : node.style.border,
            boxShadow: node.id === matchedNode.id
              ? "0 0 20px rgba(245, 158, 11, 0.5)"
              : "none",
          },
        }))
      );
      setSearchResult({ found: true, message: "Match found!" });
    } else {
      setNodes((nds) =>
        nds.map((node) => {
          const type = node.id.includes('[')
            ? 'array'
            : node.data.label.includes('{Object}')
            ? 'object'
            : 'primitive';
          
          const bgColor =
            type === "object"
              ? "rgba(147, 197, 253, 0.3)"
              : type === "array"
              ? "rgba(187, 247, 208, 0.3)"
              : "rgba(255, 237, 213, 0.3)";

          return {
            ...node,
            style: {
              ...node.style,
              background: bgColor,
              border: "1px solid rgba(0,0,0,0.1)",
              boxShadow: "none",
            },
          };
        })
      );
      setSearchResult({ found: false, message: "No match found" });
    }
  }, [searchPath, nodes, setNodes, setSearchResult]);

  return (
    <div ref={flowRef} className="my-flow h-full w-full flex-1 border rounded-lg overflow-hidden relative">
      <ReactFlow
        nodes={nodes.map((n) => ({ ...n, type: "default" }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        onNodeClick={onNodeClick}
        fitView
      >
        <MiniMap
          nodeColor={"var(--foreground)"}
          bgColor={"var(--background)"}
          maskColor={"var(--border)"}
          pannable
          zoomable
        />
        <Controls />
        <Background gap={20} size={1} />
      </ReactFlow>

      {hoveredNode && (
        <div className="absolute top-2 right-2 z-50 bg-popover text-popover-foreground border border-border shadow-lg rounded-lg p-3 text-xs max-w-xs">
          <div className="font-semibold text-foreground mb-1">Node Details</div>
          <div><span className="font-medium text-foreground">Path:</span> {hoveredNode.path}</div>
          <div><span className="font-medium text-foreground">Value:</span> {hoveredNode.value}</div>
        </div>
      )}
    </div>
  );
}

export default function CanvasArea(props: CanvasAreaProps) {
  return (
    <ReactFlowProvider>
      <FlowCanvas {...props} />
    </ReactFlowProvider>
  );
}
