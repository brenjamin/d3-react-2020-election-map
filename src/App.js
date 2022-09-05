import { useUSMap } from './utils/useUSMap'
import { Results } from './components/Results'
import { ElectionMap } from './components/ElectionMap'
import { useCountyData } from './utils/useCountyData'
import { useStateData } from './utils/useStateData'
import { useCityData } from './utils/useCityData'
import StateContext from './StateContext'
import DispatchContext from './DispatchContext'
import { useImmerReducer } from 'use-immer'
import { StateTooltip } from './components/StateTooltip'
import { CountyTooltip } from './components/CountyTooltip'

const width = 975
const height = 610

const App = () => {
  const usMap = useUSMap()
  const countyData = useCountyData()
  const stateData = useStateData()
  const cityData = useCityData()

  const initialState = {
    hoveredState: {
      id: null,
      x: null,
      y: null
    },
    hoveredCounty: {
      id: null,
      x: null,
      y: null
    },
    center: [width / 2, height / 2],
    activeState: null,
    zoomLevel: 1,
    pannable: false
  }

  function reducer(draft, action) {
    switch (action.type) {
      case 'updateHoveredState':
        draft.hoveredState = {
          id: action.value.id,
          x: action.value.x,
          y: action.value.y
        }
        return
      case 'updateHoveredCounty':
        draft.hoveredCounty = {
          id: action.value.id,
          x: action.value.x,
          y: action.value.y
        }
        return
      case 'updateActiveState':
        draft.activeState = action.value
        return
      case 'increaseZoomLevel':
        if (draft.zoomLevel < 21) {
          draft.zoomLevel++
        }
        return
      case 'decreaseZoomLevel':
        if (draft.zoomLevel > 1) {
          draft.zoomLevel--
        }
        return
      case 'resetZoomLevel':
        draft.zoomLevel = 1
        return
      case 'setZoomLevel':
        draft.zoomLevel = action.value
        return
      case 'setCenter':
        draft.center = action.value
        return
      case 'togglePan':
        draft.pannable = !draft.pannable
        return
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  return !stateData || !countyData || !usMap || !cityData ? (
    <main id="loading">
      <img
        className="spin"
        src={require('./img/ny-times-logo.png')}
        alt="New York Times Logo"
      />
      <p>Loading...</p>
    </main>
  ) : (
    <main>
      <Results stateData={stateData} />
      <div className="svg-wrapper">
        <StateContext.Provider value={state}>
          <DispatchContext.Provider value={dispatch}>
            <ElectionMap
              width={width}
              height={height}
              stateData={stateData}
              countyData={countyData}
              cityData={cityData}
              usMap={usMap}
            />
            <CountyTooltip countyData={countyData} />
            <StateTooltip stateData={stateData} />
          </DispatchContext.Provider>
        </StateContext.Provider>
      </div>
    </main>
  )
}

export default App
