import { useEffect, useState } from 'react'
import { csv } from 'd3'
import csvData from '../data/us-cities.csv'

export const useCityData = () => {
  const [data, setData] = useState()
  useEffect(() => {
    const row = d => {
      d.lat = +d.lat
      d.lon = +d.lon

      return d
    }
    csv(csvData, row).then(data => {
      setData(data)
    })
  }, [])
  return data
}
