const LegendAxis = ({ colorScale, legendWidth, legendMarkHeight }) => {
  const ticks = colorScale.domain()
  return (
    <g id="legend-axis">
      {ticks.map((tick, index) => (
        <g className="legend-tick" key={tick} transform={`translate(${(index * legendWidth) / (ticks.length - 1)}, 0)`}>
          <text y={10} dy=".71em" style={{ textAnchor: "middle" }} className="tick">
            {tick.toFixed(0)}%
          </text>
          <line y1={5} y2={-legendMarkHeight} x1="0" x2="0" stroke="black" />
        </g>
      ))}
    </g>
  )
}

const LegendMarks = ({ colorScale, legendWidth, legendMarkHeight }) => {
  const rects = colorScale.domain().slice()
  rects.pop()
  return (
    <g transform={`translate(0, -${legendMarkHeight})`}>
      {rects.map((val, index) => {
        return <rect key={index} fill={colorScale(val)} width={legendWidth / rects.length} height={legendMarkHeight} transform={`translate(${(index * legendWidth) / rects.length},0)`} />
      })}
    </g>
  )
}

export const Legend = ({ colorScale, width, legendWidth }) => {
  const legendMarkHeight = 15
  return (
    <g id="legend" transform={` translate(${width - legendWidth - 100},${legendMarkHeight + 10})`}>
      <LegendMarks colorScale={colorScale} legendWidth={legendWidth} legendMarkHeight={legendMarkHeight} />
      <LegendAxis colorScale={colorScale} legendWidth={legendWidth} legendMarkHeight={legendMarkHeight} />
    </g>
  )
}
