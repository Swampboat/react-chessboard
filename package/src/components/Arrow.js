export function isArrow(thing) {// TODO add docs
  return !!thing & !!thing.to &!!thing.from;
}

export function Arrow({})
    <Fragment key={`${arrow[0]}-${arrow[1]}`}>
      <defs>
        <marker id="arrowhead" markerWidth="2" markerHeight="2.5" refX="1.25" refY="1.25" orient="auto">
          <polygon points="0 0, 2 1.25, 0 2.5" style={{ fill: customArrowColor }} />
        </marker>
      </defs>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        style={{ stroke: customArrowColor, strokeWidth: boardWidth / 36 }}
        markerEnd="url(#arrowhead)"
      />
    </Fragment>
  );