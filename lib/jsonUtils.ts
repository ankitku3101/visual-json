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
        ? "rgba(147, 197, 253, 0.3)" 
        : type === "array"
        ? "rgba(187, 247, 208, 0.3)" 
        : "rgba(255, 237, 213, 0.3)"

    const textColor =
      type === "object"
        ? "#1e40af" 
        : type === "array"
        ? "#065f46" 
        : "#92400e" 

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
        border: "1px solid rgba(0,0,0,0.1)",
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
        style: { stroke: '#94a3b8' }
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