import { useEffect, useState } from 'react'
import { feature } from 'topojson'
import USMap from '../data/us-map.json'

export const useUSMap = () => {
  const [data, setData] = useState()
  useEffect(() => {
    const { states, counties } = USMap.objects
    setData({
      counties: feature(USMap, counties),
      states: feature(USMap, states)
    })
  }, [])
  return data
}
