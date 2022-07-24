import { useMemo, useContext } from 'react'

import { select } from 'd3'
import StateContext from '../StateContext'
import DispatchContext from '../DispatchContext'

export const CountyMarks = ({
  usMap: { counties },
  countyData,
  demScale,
  repScale,
  path
}) => {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const handleCountyMouseOver = useMemo(
    () => e => {
      select(e.currentTarget).raise()
      e.currentTarget.style.stroke = 'black'
      e.currentTarget.style.strokeWidth = '0.25px'
    },
    []
  )
  const handleCountyMouseMove = useMemo(
    () => (e, id) => {
      appDispatch({
        type: 'updateHoveredCounty',
        value: { id, x: e.pageX, y: e.pageY }
      })
    },
    [appDispatch]
  )

  const handleCountyMouseOut = useMemo(
    () => e => {
      e.currentTarget.style.stroke = 'white'
      e.currentTarget.style.strokeWidth = '0.05px'
      select(e.currentTarget).lower()
      appDispatch({
        type: 'updateHoveredCounty',
        value: { x: null, y: null }
      })
    },
    [appDispatch]
  )

  return (
    <>
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
                  onMouseOver={e => handleCountyMouseOver(e)}
                  onMouseMove={e => handleCountyMouseMove(e, feature.id)}
                  onMouseOut={e => handleCountyMouseOut(e)}
                />
              )
            })}
          </>
        )
      }, [countyData, counties, demScale, repScale])}
    </>
  )
}
