import { useMemo, useContext } from 'react'
import StateContext from '../StateContext'

export const CityMarks = ({ cityData, projection }) => {
  const appState = useContext(StateContext)
  let activeState = appState.activeState
  return (
    <>
      {useMemo(() => {
        return activeState ? (
          <g className="cities">
            {cityData.map(city => {
              return (
                <g
                  key={city.lat}
                  className={`city city-${city.city
                    .toLowerCase()
                    .split(' ')
                    .join('-')}`}
                >
                  <circle
                    r="0.75"
                    cx={projection([city.lon, city.lat])[0]}
                    cy={projection([city.lon, city.lat])[1]}
                  />
                  <text
                    textAnchor="middle"
                    x={projection([city.lon, city.lat])[0]}
                    y={projection([city.lon, city.lat])[1] + 5}
                  >
                    {city.city}
                  </text>
                </g>
              )
            })}
          </g>
        ) : (
          ''
        )
      }, [cityData, projection, activeState])}
    </>
  )
}
