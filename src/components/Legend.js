import { useContext } from 'react'
import StateContext from '../StateContext'

export const Legend = ({}) => {
  const appState = useContext(StateContext)

  return (
    <g
      className="legend"
      transform="translate(600, 540)"
      style={{ opacity: appState.activeState ? 0 : 1 }}
    >
      <rect className="dem" x="0" y="0" width="45" height="15"></rect>
      <rect className="dem flip" x="50" y="0" width="45" height="15"></rect>
      <rect className="gop" x="0" y="20" width="45" height="15"></rect>
      <rect className="gop flip" x="50" y="20" width="45" height="15"></rect>
      <g className="candidates">
        <text x="100" y="12">
          Biden
        </text>
        <text x="100" y="32">
          Trump
        </text>
      </g>
      <g className="labels">
        <text x="12" y="50">
          Win
        </text>
        <text x="63" y="50">
          Flip
        </text>
      </g>
    </g>
  )
}
