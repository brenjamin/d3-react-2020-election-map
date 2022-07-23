import { useMemo, useContext } from 'react'
import { geoPath } from 'd3-geo'
import StateContext from '../StateContext'
import DispatchContext from '../DispatchContext'
import { select } from 'd3'

const path = geoPath()

export const Marks = ({
  usMap: { counties, states },
  stateData,
  countyData,
  demScale,
  repScale
}) => {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const handleStateClick = useMemo(() => (e, id) => {
    appDispatch({
      type: 'updateActiveState',
      value: id
    })
  })

  const handleStateMouseOver = useMemo(
    () => (e, id) => {
      select(e.currentTarget).raise()
      e.currentTarget.querySelector('.state').style.stroke = 'black'
      appDispatch({ type: 'updateHoveredState', value: id })
    },
    []
  )

  const handleStateMouseOut = useMemo(
    () => e => {
      e.currentTarget.querySelector('.state').style.stroke = 'white'
      // appDispatch({ type: 'updateHoveredState', value: null })
    },
    []
  )

  const handleCountyMouseOver = useMemo(
    () => (e, id) => {
      // setActiveCounty({
      //   id,
      //   x: e.pageX,
      //   y: e.pageY
      // })
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
    <g>
      {useMemo(() => {
        return (
          <>
            {counties.features.map(feature => {
              console.log('counties memo')
              const county = countyData.find(
                county => county.county_fips === feature.id
              )
              let color
              if (county) {
                if (county.votes_dem > county.votes_gop) {
                  color = demScale(county.per_dem)
                } else {
                  color = repScale(county.per_gop)
                }
              } else {
                color = 'gray'
              }
              return (
                <path
                  className="county"
                  data-fips={feature.id}
                  fill={color}
                  d={path(feature)}
                  key={feature.id}
                />
              )
            })}

            {states.features.map(feature => {
              console.log('state memo')
              let currentState = stateData.find(
                state => parseInt(state.state_fips) === parseInt(feature.id)
              )
              let flip = currentState.flip
              let winner =
                currentState.votes_dem > currentState.votes_gop ? 'dem' : 'gop'
              return (
                <g
                  className={`state-wrapper`}
                  onMouseOver={e => handleStateMouseOver(e, feature.id)}
                  onMouseOut={e => handleStateMouseOut(e)}
                  key={feature.id}
                  onClick={e => handleStateClick(e, feature.id)}
                >
                  <path
                    className={`state state-${currentState.state_po} ${winner}${
                      flip ? ' flip' : ''
                    }`}
                    data-fips={feature.id}
                    d={path(feature)}
                    stroke="white"
                  />
                  <text
                    className={`state-name state-name-${currentState.state_po}`}
                    x={path.centroid(feature)[0]}
                    y={path.centroid(feature)[1]}
                    textAnchor="middle"
                  >
                    {currentState.state_map_abbr}
                  </text>
                </g>
              )
            })}
          </>
        )
      }, [stateData, countyData, counties, states, demScale, repScale])}
    </g>
  )
}
