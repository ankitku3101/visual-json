export function generateNodesAndEdges(json: any) {
  const nodes: any[] = []
  const edges: any[] = []
  const yCounters: Record<number, number> = {}
  const gapX = 220
  const gapY = 90

  function nextY(depth: number) {
    if (!yCounters[depth]) yCounters[depth] = 0
    return yCounters[depth]++ * gapY
  }

  function walk(value: any, path = "$", depth = 0, keyName?: string, parentPath?: string) {
    const type =
      value === null
        ? "primitive"
        : Array.isArray(value)
        ? "array"
        : typeof value === "object"
        ? "object"
        : "primitive"

    const label =
      type === "object"
        ? keyName || "{Object}"
        : type === "array"
        ? keyName || "[Array]"
        : `${keyName || "value"}: ${String(value)}`

    const bgColor =
      type === "object"
        ? "rgba(96, 165, 250, 0.2)" 
        : type === "array"
        ? "rgba(134, 239, 172, 0.2)" 
        : "rgba(251, 191, 36, 0.2)" 

    const textColor =
      type === "object"
        ? "#60a5fa"  
        : type === "array"
        ? "#4ade80" 
        : "#fbbf24" 

    const node = {
      id: path,
      data: { 
        label,
        path: path, 
        value: type === "primitive" ? value : undefined
      },
      position: { x: depth * gapX, y: nextY(depth) },
      style: {
        borderRadius: 12,
        padding: 12,
        background: bgColor,
        color: textColor,
        fontSize: 14,
        fontWeight: 500,
        width: 160,
        minHeight: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        border: `1px solid ${textColor}40`,
      },
    }
    nodes.push(node)

    // Create edge from parent to current node
    if (parentPath) {
      edges.push({ 
        id: `${parentPath}->${path}`, 
        source: parentPath, 
        target: path,
        animated: false,
        style: { stroke: '#64748b' }
      })
    }

    // Recursively walk through objects
    if (type === "object") {
      Object.entries(value).forEach(([k, v]) =>
        walk(v, `${path}.${k}`, depth + 1, k, path)
      )
    } 
    // Recursively walk through arrays
    else if (type === "array") {
      value.forEach((v: any, i: number) =>
        walk(v, `${path}[${i}]`, depth + 1, `[${i}]`, path)
      )
    }
  }

  walk(json)
  return { nodes, edges }
}