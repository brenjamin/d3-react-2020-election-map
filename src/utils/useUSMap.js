import { useEffect, useState } from 'react'
import { json } from 'd3'
import { feature } from 'topojson'

export const useUSMap = () => {
  const url =
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
  const [data, setData] = useState()
  useEffect(() => {
    json(url).then(data => {
      const { counties, states } = data.objects
      console.log('memo')
      setData({
        counties: feature(data, counties),
        states: feature(data, states)
      })
    })
  }, [])
  return data
}
