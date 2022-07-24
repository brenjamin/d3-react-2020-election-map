import StateContext from '../StateContext'
import DispatchContext from '../DispatchContext'
import { useContext } from 'react'
import { HiOutlineZoomIn, HiOutlineZoomOut, HiOutlineX } from 'react-icons/hi'

export const ZoomControls = ({
  handleZoomIn,
  handleDecreaseZoom,
  handleResetZoom
}) => {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  return (
    <div id="zoom-controls">
      <button
        className="zoom-control"
        id="zoom-in"
        disabled={appState.zoomLevel === 20}
        onClick={() => handleZoomIn()}
      >
        <HiOutlineZoomIn stroke="white" size={18} />
      </button>
      <button
        className="zoom-control"
        id="zoom-out"
        disabled={appState.zoomLevel === 1}
        onClick={() => handleDecreaseZoom()}
      >
        <HiOutlineZoomOut stroke="white" size={18} />
      </button>
      <button
        className="zoom-control"
        id="reset-zoom"
        disabled={appState.zoomLevel === 1}
        onClick={() => handleResetZoom()}
      >
        <HiOutlineX stroke="white" size={18} />
      </button>
    </div>
  )
}
