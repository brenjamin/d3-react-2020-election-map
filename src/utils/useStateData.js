import { useEffect, useState } from 'react'
import { csv } from 'd3'
import csvData from '../data/2020 Presidential Election - Results by State.csv'

export const useStateData = () => {
  const [data, setData] = useState()
  useEffect(() => {
    csv(csvData).then(data => {
      setData(data)
    })
  }, [])
  return data
}
