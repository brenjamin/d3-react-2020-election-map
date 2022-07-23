import { Marks } from './Marks'
import { Tooltip } from './Tooltip'
import { range, max, min, select, scaleThreshold } from 'd3'
import { useMemo, useState } from 'react'
import { Legend } from './Legend'

export const ChoroplethMap = ({
  width,
  height,
  stateData,
  countyData,
  usMap
}) => {
  const colors = []

  const demScale = useMemo(() =>
    scaleThreshold()
      .domain([0.5, 0.6, 0.7])
      .range(['#ceeafd', '#92bde0', '#5295cb', '#1375b7'])
  )

  const repScale = useMemo(() =>
    scaleThreshold()
      .domain([0.5, 0.6, 0.7])
      .range(['#fce0e0', '#eaa9a9', '#db7171', '#c93135'])
  )

  return (
    <>
      {/* <Tooltip activeCounty={activeCounty} data={data} /> */}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMinYMin"
      >
        <defs>
          {/* gradients for flipped states */}

          <linearGradient
            id="dem-flip"
            gradientUnits="userSpaceOnUse"
            x2="5"
            spreadMethod="repeat"
            gradientTransform="rotate(45)"
          >
            <stop offset="0" stopColor="#00478F" />
            <stop offset="0.65" stopColor="#00478F" />
            <stop offset="0.65" stopColor="#036fb0" />
            <stop offset="1.0" stopColor="#036fb0" />
          </linearGradient>
          <linearGradient
            id="gop-flip"
            gradientUnits="userSpaceOnUse"
            x2="5"
            spreadMethod="repeat"
            gradientTransform="rotate(45)"
          >
            <stop offset="0" stopColor="#B52C30" />
            <stop offset="0.65" stopColor="#B52C30" />
            <stop offset="0.65" stopColor="#D75B5F" />
            <stop offset="1.0" stopColor="#D75B5F" />
          </linearGradient>
        </defs>
        {/* <Legend
          width={width}
          colorScale={colorScale}
          legendWidth={legendWidth}
        /> */}
        <Marks
          stateData={stateData}
          usMap={usMap}
          countyData={countyData}
          demScale={demScale}
          repScale={repScale}
        />
      </svg>
    </>
  )
}
