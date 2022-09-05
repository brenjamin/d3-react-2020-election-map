import { useMemo, useContext } from 'react'
import { select } from 'd3'
import DispatchContext from '../DispatchContext'

export const CountyMarks = ({
  usMap: { counties },
  countyData,
  demScale,
  repScale,
  path
}) => {
  const appDispatch = useContext(DispatchContext)
  const handleCountyMouseOver = useMemo(
    () => (e, id) => {
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
        value: { id, x: e.clientX, y: e.clientY }
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
              const county = countyData.find(
                county => county.county_fips === +feature.properties.geoid
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
                  data-fips={feature.properties.geoid}
                  fill={color}
                  d={path(feature)}
                  key={feature.properties.geoid}
                  onMouseOver={e =>
                    handleCountyMouseOver(e, feature.properties.geoid)
                  }
                  onMouseMove={e =>
                    handleCountyMouseMove(e, feature.properties.geoid)
                  }
                  onMouseOut={e => handleCountyMouseOut(e)}
                />
              )
            })}
          </>
        )
      }, [
        countyData,
        counties,
        demScale,
        repScale,
        handleCountyMouseMove,
        handleCountyMouseOut,
        handleCountyMouseOver,
        path
      ])}
    </>
  )
}
