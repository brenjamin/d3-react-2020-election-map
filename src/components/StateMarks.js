import { useMemo, useContext } from 'react'
import { select } from 'd3'
import { geoPath } from 'd3-geo'
import StateContext from '../StateContext'
import DispatchContext from '../DispatchContext'
const path = geoPath()

export const StateMarks = ({ usMap: { states }, stateData }) => {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const handleStateClick = (e, id) => {
    document.querySelectorAll('.state-wrapper').forEach(el => {
      el.style.visibility = 'visible'
    })
    e.currentTarget.style.visibility = 'hidden'
    appDispatch({ type: 'updateActiveState', value: id })
  }

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
        value: { id, x: e.pageX, y: e.pageY }
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
                state => parseInt(state.state_fips) === parseInt(feature.id)
              )
              let flip = currentState.flip
              let winner =
                currentState.votes_dem > currentState.votes_gop ? 'dem' : 'gop'
              return (
                <g
                  className={`state-wrapper${
                    appState.activeState === feature.id ? ' active' : ''
                  }`}
                  onMouseOver={e => handleStateMouseOver(e)}
                  onMouseMove={e => handleStateMouseMove(e, feature.id)}
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
        handleStateMouseOver
      ])}
    </g>
  )
}
