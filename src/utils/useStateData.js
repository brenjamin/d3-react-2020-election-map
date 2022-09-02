import { useEffect, useState } from 'react'
import { csv } from 'd3'
import csvData from '../data/2020 Presidential Election - Results by State.csv'

export const useStateData = () => {
  const [data, setData] = useState()
  useEffect(() => {
    const row = d => {
      d.el_votes_dem = +d.el_votes_dem
      d.el_votes_gop = +d.el_votes_gop
      d.per_dem = +d.per_dem
      d.per_gop = +d.per_gop
      d.per_point_diff = +d.per_point_diff
      d.total_votes = +d.total_votes
      d.votes_dem = +d.votes_dem
      d.votes_gop = +d.votes_gop
      d.state_fips = +d.state_fips

      return d
    }
    csv(csvData, row).then(data => {
      setData(data)
    })
  }, [])
  return data
}
