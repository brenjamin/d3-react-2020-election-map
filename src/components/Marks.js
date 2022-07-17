import { useMemo } from 'react'
import { geoPath } from 'd3-geo'

const path = geoPath()

export const Marks = ({
  usMap: { counties, states },
  stateData,
  countyData,
  colorScale,
  onMouseOver,
  onMouseOut
}) => {
  return (
    <g>
      {useMemo(() => {
        return (
          <>
            {/* {counties.features.map(feature => {
              const bachelorsValue = data.find(
                county => county.fips === feature.id
              ).bachelorsOrHigher
              return (
                <path
                  className="county"
                  data-fips={feature.id}
                  data-education={bachelorsValue}
                  fill={colorScale(bachelorsValue)}
                  d={path(feature)}
                  key={feature.id}
                  onMouseOver={e => onMouseOver(e, feature.id)}
                  onMouseOut={e => onMouseOut()}
                />
              )
            })} */}
            {states.features.map(feature => {
              const currentState = stateData.find(
                state => parseInt(state.state_fips) === parseInt(feature.id)
              )
              console.log(currentState)
              return (
                <path
                  className={`state state-${currentState.state_po}`}
                  data-fips={feature.id}
                  d={path(feature)}
                  key={feature.id}
                  fill={
                    currentState.votes_dem > currentState.votes_gop
                      ? '#1375b7'
                      : '#c93135'
                  }
                  stroke="white"
                  onMouseOver={e => onMouseOver(e, feature.id)}
                />
              )
            })}
          </>
        )
      }, [
        stateData,
        countyData,
        counties,
        states,
        colorScale,
        onMouseOver,
        onMouseOut
      ])}
    </g>
  )
}
