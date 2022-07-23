import { useMemo } from 'react'
import { geoPath } from 'd3-geo'
const path = geoPath()

export const CountyMarks = ({
  usMap: { counties },
  countyData,
  demScale,
  repScale,
  handleCountyMouseOver,
  handleCountyMouseOut
}) => {
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
          </>
        )
      }, [
        countyData,
        counties,
        demScale,
        repScale,
        handleCountyMouseOver,
        handleCountyMouseOut
      ])}
    </g>
  )
}
