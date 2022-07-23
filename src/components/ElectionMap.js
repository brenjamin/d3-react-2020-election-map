import { StateMarks } from './StateMarks'
import { CountyMarks } from './CountyMarks'
import { StateTooltip } from './StateTooltip'
import { select, scaleThreshold, count } from 'd3'
import { useMemo, useState } from 'react'
import { Legend } from './Legend'

export const ElectionMap = ({
  width,
  height,
  stateData,
  countyData,
  usMap
}) => {
  const [hoveredState, setHoveredState] = useState({
    id: null,
    x: null,
    y: null
  })

  const demScale = useMemo(
    () =>
      scaleThreshold()
        .domain([0.5, 0.6, 0.7])
        .range(['#ceeafd', '#92bde0', '#5295cb', '#1375b7']),
    [scaleThreshold]
  )

  const repScale = useMemo(
    () =>
      scaleThreshold()
        .domain([0.5, 0.6, 0.7])
        .range(['#fce0e0', '#eaa9a9', '#db7171', '#c93135']),
    [scaleThreshold]
  )

  // const handleStateMouseMove = useMemo(
  //   () => (e, id) => {
  //     select(e.currentTarget).raise()
  //     e.currentTarget.querySelector('.state').style.stroke = 'black'
  //     setHoveredState({ id, x: e.pageX, y: e.pageY })
  //   },
  //   []
  // )

  // const handleStateMouseOut = useMemo(
  //   () => e => {
  //     e.currentTarget.querySelector('.state').style.stroke = 'white'
  //   },
  //   []
  // )

  const handleCountyMouseOver = useMemo(
    () => (e, id) => {
      select(e.currentTarget).raise()
      e.currentTarget.querySelector('.state').style.stroke = 'black'
    },
    []
  )

  const handleCountyMouseOut = useMemo(
    () => e => {
      e.currentTarget.querySelector('.state').style.stroke = 'white'
    },
    []
  )

  return (
    <>
      <StateTooltip hoveredState={hoveredState} stateData={stateData} />
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
        {useMemo(() => {
          return (
            <CountyMarks
              usMap={usMap}
              countyData={countyData}
              demScale={demScale}
              repScale={repScale}
              handleCountyMouseOver={handleCountyMouseOver}
              handleCountyMouseOut={handleCountyMouseOut}
            />
          )
        }, [
          usMap,
          countyData,
          demScale,
          repScale,
          handleCountyMouseOver,
          handleCountyMouseOut
        ])}

        <StateMarks stateData={stateData} usMap={usMap} />
      </svg>
    </>
  )
}
