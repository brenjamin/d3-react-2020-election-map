import { Marks } from './Marks'
import { Tooltip } from './Tooltip'
import { scaleThreshold, range, max, min, schemeGreens, select } from 'd3'
import { useMemo, useState } from 'react'
import { Legend } from './Legend'

export const ChoroplethMap = ({
  width,
  height,
  stateData,
  countyData,
  usMap
}) => {
  const [activeCounty, setActiveCounty] = useState({
    id: null,
    x: null,
    y: null
  })
  // const percentageDem = d => d.per_dem
  // const legendWidth = width / 3
  // const minValue = min(countyData, percentageDem)
  // const maxValue = max(countyData, percentageDem)

  // const colorScale = useMemo(
  //   () =>
  //     scaleThreshold()
  //       .domain(range(minValue, maxValue, (maxValue - minValue) / 8))
  //       .range(schemeGreens[9]),
  //   [minValue, maxValue]
  // )

  const handleMouseOver = useMemo(
    () => (e, id) => {
      // setActiveCounty({
      //   id,
      //   x: e.pageX,
      //   y: e.pageY
      // })
      select(e.target).raise()
    },
    []
  )

  const handleMouseOut = useMemo(
    () => e => {
      setActiveCounty({ id: null, x: null, y: null })
    },
    []
  )

  return (
    <>
      {/* <Tooltip activeCounty={activeCounty} data={data} /> */}
      <svg width={width} height={height}>
        {/* <Legend
          width={width}
          colorScale={colorScale}
          legendWidth={legendWidth}
        /> */}
        <Marks
          stateData={stateData}
          usMap={usMap}
          countyData={countyData}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
      </svg>
    </>
  )
}
