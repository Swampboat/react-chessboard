export function isArrow(thing) {// TODO add docs
  return !!thing & !!thing.to &!!thing.from;
}

// Requires from, to, color props
export function Arrow(props) { 
  const widthModifier = props?.widthModifier | 1;
  const color = props?.color | customArrowColor;
  return (
    // <Fragment key={`${props.from}-${props.to}`}>
    <Fragment>
      <defs>
        <marker id="arrowhead" markerWidth="2" markerHeight="2.5" refX="1.25" refY="1.25" orient="auto">
          <polygon points="0 0, 2 1.25, 0 2.5" style={{ fill: color }} />
        </marker>
      </defs>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        style={{ stroke: customArrowColor, strokeWidth: boardWidth / 36 * widthModifier }}
        markerEnd="url(#arrowhead)"
      />
    </Fragment>
)};