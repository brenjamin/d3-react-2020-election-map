import './App.css'
import { useData } from './utils/useData'
import { useUSMap } from './utils/useUSMap'
import { ChoroplethMap } from './components/ChoroplethMap'
import { useCountyData } from './utils/useCountyData'
import { useStateData } from './utils/useStateData'
import { count } from 'd3'

const width = 960
const height = 600

const App = () => {
  const usMap = useUSMap()
  const countyData = useCountyData()
  const stateData = useStateData()

  return !stateData || !countyData || !usMap ? (
    <pre>Loading...</pre>
  ) : (
    <main>
      <div className="svg-wrapper">
        <h1 id="title">United States Educational Attainment</h1>
        <p id="description">
          Percentage of adults age 25 and older with a bachelor's degree or
          higher (2010-2014)
        </p>
        <ChoroplethMap
          width={width}
          height={height}
          stateData={stateData}
          countyData={countyData}
          usMap={usMap}
        />
        <div className="source">
          Source:{' '}
          <a href="https://www.ers.usda.gov/data-products/county-level-data-sets/download-data.aspx">
            USDA Economic Research Service
          </a>
        </div>
      </div>
    </main>
  )
}

export default App
