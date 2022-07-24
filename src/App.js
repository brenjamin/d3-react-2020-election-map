import { useUSMap } from './utils/useUSMap'
import { ElectionMap } from './components/ElectionMap'
import { useCountyData } from './utils/useCountyData'
import { useStateData } from './utils/useStateData'
import StateContext from './StateContext'
import DispatchContext from './DispatchContext'
import { useImmerReducer } from 'use-immer'
import { StateTooltip } from './components/StateTooltip'
import { CountyTooltip } from './components/CountyTooltip'

import { ZoomControls } from './components/ZoomControls'

const width = 960
const height = 600

const App = () => {
  const usMap = useUSMap()
  const countyData = useCountyData()
  const stateData = useStateData()

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
        console.log('current zoom level ', draft.zoomLevel)
        if (draft.zoomLevel < 21) {
          draft.zoomLevel++
        }
        return
      case 'decreaseZoomLevel':
        console.log('current zoom level ', draft.zoomLevel)
        if (draft.zoomLevel > 1) {
          draft.zoomLevel--
        }
        return
      case 'resetZoomLevel':
        console.log('current zoom level ', draft.zoomLevel)
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

  return !stateData || !countyData || !usMap ? (
    <pre>Loading...</pre>
  ) : (
    <main>
      <div className="svg-wrapper">
        <StateContext.Provider value={state}>
          <DispatchContext.Provider value={dispatch}>
            <ElectionMap
              width={width}
              height={height}
              stateData={stateData}
              countyData={countyData}
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
