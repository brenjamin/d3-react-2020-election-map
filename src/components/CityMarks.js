import { active, curveMonotoneY, zoom } from 'd3'
import { useMemo, useContext } from 'react'
import StateContext from '../StateContext'

export const CityMarks = ({ cityData, projection }) => {
  const appState = useContext(StateContext)
  let activeState = appState.activeState
  let zoomLevel = appState.zoomLevel

  const citiesPlacedAbove = [
    'Detroit',
    'Dallas',
    'Cheyenne',
    'Vancouver',
    'Reno',
    'Gulfport',
    'Mobile',
    'Chatanooga',
    'Philadelphia',
    'Cincinnati',
    'San Diego',
    'Stamford',
    'Duluth',
    'Davenport',
    'Kansas City',
    'Evansville',
    'Las Vegas'
  ]
  return (
    <>
      {useMemo(() => {
        return (
          <g className="cities">
            {cityData.map(city => {
              let placement
              if (citiesPlacedAbove.includes(city.city)) {
                if (city.most_populous) {
                  placement = -20
                } else {
                  placement = -15
                }
              } else {
                if (city.most_populous) {
                  placement = 25
                } else {
                  placement = 18
                }
              }

              let fontSize
              if (!activeState) {
                fontSize = '0.745551px'
              } else {
                fontSize = city.most_populous
                  ? `${16 / zoomLevel}px`
                  : `${13 / zoomLevel}px`
              }

              return (
                <g
                  key={city.lat}
                  className={`city city-${city.city
                    .toLowerCase()
                    .split(' ')
                    .join('-')}${
                    activeState === city.state_fips ? ' show' : ''
                  }`}
                >
                  {city.most_populous ? (
                    <>
                      <circle
                        r={`${4.5 / zoomLevel + 1 / zoomLevel}`}
                        cx={projection([city.lon, city.lat])[0]}
                        cy={projection([city.lon, city.lat])[1]}
                        style={{
                          strokeWidth: 1 / zoomLevel,
                          stroke: 'white',
                          fill: 'none'
                        }}
                      />
                      <circle
                        r={`${4.5 / zoomLevel - 1 / zoomLevel}`}
                        cx={projection([city.lon, city.lat])[0]}
                        cy={projection([city.lon, city.lat])[1]}
                        style={{
                          strokeWidth: 1 / zoomLevel,
                          stroke: 'white',
                          fill: 'none'
                        }}
                      />
                      <circle
                        r={`${4.5 / zoomLevel}`}
                        cx={projection([city.lon, city.lat])[0]}
                        cy={projection([city.lon, city.lat])[1]}
                        style={{
                          strokeWidth: (1 / zoomLevel) * 1.1,
                          stroke: 'black',
                          fill: 'none'
                        }}
                      />
                    </>
                  ) : (
                    <circle
                      r={`${3.5 / zoomLevel}`}
                      cx={projection([city.lon, city.lat])[0]}
                      cy={projection([city.lon, city.lat])[1]}
                      style={{ strokeWidth: 1 / zoomLevel, stroke: 'white' }}
                    />
                  )}
                  <text
                    textAnchor="middle"
                    x={projection([city.lon, city.lat])[0]}
                    y={
                      city.most_populous
                        ? projection([city.lon, city.lat])[1] +
                          placement / zoomLevel
                        : projection([city.lon, city.lat])[1] +
                          placement / zoomLevel
                    }
                    style={{
                      fontSize
                    }}
                  >
                    {city.city}
                  </text>
                </g>
              )
            })}
          </g>
        )
      }, [cityData, projection, activeState, zoomLevel])}
    </>
  )
}
