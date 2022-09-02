import { useMemo, useContext } from 'react'
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
      const { currentTarget } = e
      document
        .querySelector('#top-state')
        .setAttribute('href', `#${currentTarget.getAttribute('id')}`)
      currentTarget.querySelector('.state').style.stroke = 'black'
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

  const handleStateCopyMouseMove = useMemo(
    () => e => {
      appDispatch({
        type: 'updateHoveredState',
        value: {
          id: e.currentTarget.getAttribute('href').replace('#state-', ''),
          x: e.clientX,
          y: e.clientY
        }
      })
    },
    [appDispatch]
  )

  const handleStateCopyClick = useMemo(
    () => e => {
      const id = e.currentTarget.getAttribute('href').replace('#state-', '')
      const el = document.querySelector(e.currentTarget.getAttribute('href'))
      e.currentTarget = el

      const feature = states.features.find(
        feature => +id === +feature.properties.GEOID
      )
      handleStateClick(e, feature)
    },
    [handleStateClick]
  )

  const handleStateMouseOut = useMemo(
    () => e => {
      appDispatch({
        type: 'updateHoveredState',
        value: { x: null, y: null }
      })
      const { currentTarget } = e
      currentTarget.querySelector('.state').style.stroke = 'white'
      document.querySelector('#top-state').setAttribute('href', ``)
    },
    [appDispatch]
  )

  const handleStateCopyMouseOut = useMemo(
    () => e => {
      const { currentTarget } = e
      const stateWrapper = document.querySelector(
        currentTarget.getAttribute('href')
      )

      stateWrapper.querySelector('.state').style.stroke = 'white'
      e.currentTarget.setAttribute('href', '')
    },
    []
  )

  return (
    <g>
      {useMemo(() => {
        return (
          <>
            {states.features.map((feature, index) => {
              let currentState = stateData.find(
                state => state.state_fips === +feature.properties.GEOID
              )
              let flip = currentState.flip
              let winner =
                currentState.votes_dem > currentState.votes_gop ? 'dem' : 'gop'
              return (
                <g
                  className="state-wrapper"
                  onMouseOver={e => handleStateMouseOver(e)}
                  key={feature.properties.GEOID}
                  id={'state-' + feature.properties.GEOID}
                >
                  <path
                    className={`state state-${currentState.state_po} ${winner}${
                      flip ? ' flip' : ''
                    }`}
                    data-fips={feature.properties.GEOID}
                    d={path(feature)}
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

            <use
              id="top-state"
              href="#state-00"
              onMouseMove={e => handleStateCopyMouseMove(e)}
              onClick={e => handleStateCopyClick(e)}
              onMouseOut={e => handleStateCopyMouseOut(e)}
            />
          </>
        )
      }, [
        stateData,
        states,
        handleStateMouseOver,
        handleStateCopyClick,
        handleStateCopyMouseMove,
        handleStateCopyMouseOut,
        path
      ])}
    </g>
  )
}
