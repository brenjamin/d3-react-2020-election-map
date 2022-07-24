import StateContext from '../StateContext'
import DispatchContext from '../DispatchContext'
import { useContext } from 'react'
import { HiOutlineZoomIn, HiOutlineZoomOut, HiOutlineX } from 'react-icons/hi'

export const ZoomControls = () => {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  return (
    <div id="zoom-controls">
      <button
        className="zoom-control"
        id="zoom-in"
        disabled={appState.zoomLevel === 3}
        onClick={() => appDispatch({ type: 'increaseZoomLevel' })}
      >
        <HiOutlineZoomIn stroke="white" size={18} />
      </button>
      <button
        className="zoom-control"
        id="zoom-out"
        disabled={appState.zoomLevel === 0}
        onClick={() => appDispatch({ type: 'decreaseZoomLevel' })}
      >
        <HiOutlineZoomOut stroke="white" size={18} />
      </button>
      <button
        className="zoom-control"
        id="reset-zoom"
        disabled={appState.zoomLevel === 0}
        onClick={() => appDispatch({ type: 'resetZoomLevel' })}
      >
        <HiOutlineX stroke="white" size={18} />
      </button>
    </div>
  )
}
