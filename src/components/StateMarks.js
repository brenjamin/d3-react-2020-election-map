import { useMemo, useContext } from 'react'
import { select } from 'd3'
import DispatchContext from '../DispatchContext'

export const StateMarks = ({
  usMap: { states },
  stateData,
  handleStateClick,
  path
}) => {
  const appDispatch = useContext(DispatchContext)

  const handleStateMouseOver = useMemo(
    () => e => {
      select(e.currentTarget).raise()
      e.currentTarget.querySelector('.state').style.stroke = 'black'
    },
    []
  )
  const handleStateMouseMove = useMemo(
    () => (e, id) => {
      appDispatch({
        type: 'updateHoveredState',
        value: { id, x: e.clientX, y: e.clientY }
      })
    },
    [appDispatch]
  )

  const handleStateMouseOut = useMemo(
    () => e => {
      e.currentTarget.querySelector('.state').style.stroke = 'white'
      appDispatch({
        type: 'updateHoveredState',
        value: { x: null, y: null }
      })
    },
    [appDispatch]
  )

  return (
    <g>
      {useMemo(() => {
        return (
          <>
            {states.features.map(feature => {
              console.log('state memo')
              let currentState = stateData.find(
                state =>
                  parseInt(state.state_fips) ===
                  parseInt(feature.properties.GEOID)
              )
              let flip = currentState.flip
              let winner =
                currentState.votes_dem > currentState.votes_gop ? 'dem' : 'gop'
              return (
                <g
                  className="state-wrapper"
                  onMouseOver={e => handleStateMouseOver(e)}
                  onMouseMove={e =>
                    handleStateMouseMove(e, feature.properties.GEOID)
                  }
                  onMouseOut={e => handleStateMouseOut(e)}
                  key={feature.properties.GEOID}
                  onClick={e => handleStateClick(e, feature)}
                >
                  {console.log('state wrapper memo')}
                  <path
                    className={`state state-${currentState.state_po} ${winner}${
                      flip ? ' flip' : ''
                    }`}
                    data-fips={feature.properties.GEOID}
                    d={path(feature)}
                    stroke="white"
                  />
                  <text
                    className={`state-name state-name-${currentState.state_po}`}
                    x={path.centroid(feature)[0]}
                    y={path.centroid(feature)[1]}
                    fontWeight="500"
                    textAnchor="middle"
                  >
                    {currentState.state_map_abbr}
                  </text>
                </g>
              )
            })}
          </>
        )
      }, [
        stateData,
        states,
        handleStateMouseMove,
        handleStateMouseOut,
        handleStateMouseOver,
        handleStateClick,
        path
      ])}
    </g>
  )
}
