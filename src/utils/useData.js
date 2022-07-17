import { useEffect, useState } from "react"
import { json } from "d3"

export const useData = () => {
  const url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"
  const [data, setData] = useState()
  useEffect(() => {
    json(url).then(data => {
      setData(data)
    })
  }, [])
  return data
}
