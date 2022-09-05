import { useContext, useEffect, useRef, useState } from 'react'
import StateContext from '../StateContext'
import { BiCheck } from 'react-icons/bi'
export const StateTooltip = ({ stateData }) => {
  const appState = useContext(StateContext)
  const activeState = appState.activeState
  let tooltipState
  let winner
  const tooltip = useRef()

  const [tooltipHeight, setTooltipHeight] = useState(0)
  const [tooltipX, setTooltipX] = useState({ left: 0, right: 'auto' })
  const [tooltipY, setTooltipY] = useState(0)
  const [tooltipPosition, setTooltipPosition] = useState('fixed')
  const [tooltipOpacity, setTooltipOpacity] = useState(0)

  useEffect(() => {
    setTooltipHeight(tooltip.current.clientHeight)

    if (appState.activeState) {
      setTooltipX({ left: 'auto', right: '6px' })
      setTooltipY('6px')
      setTooltipOpacity(1)
      setTooltipPosition('absolute')
    } else if (appState.hoveredState.id) {
      let tooltipWidth = tooltip.current.clientWidth

      if (tooltipWidth / 2 + appState.hoveredState.x > window.innerWidth) {
        setTooltipX({ left: window.innerWidth - tooltipWidth, right: 'auto' })
      } else if (appState.hoveredState.x - tooltipWidth / 2 < 0) {
        setTooltipX({ left: 0, right: 'auto' })
      } else {
        setTooltipX({
          left: appState.hoveredState.x - tooltipWidth / 2,
          right: 'auto'
        })
      }
      setTooltipOpacity(1)
      setTooltipPosition('fixed')

      if (appState.hoveredState.y + tooltipHeight + 30 > window.innerHeight) {
        setTooltipY(appState.hoveredState.y - tooltipHeight - 30)
      } else {
        setTooltipY(appState.hoveredState.y + 30)
      }
    } else {
      setTooltipOpacity(0)
    }
  }, [appState])

  if (appState.activeState) {
    tooltipState = stateData.find(
      state => +state.state_fips === +appState.activeState
    )
    winner = tooltipState.votes_gop > tooltipState.votes_dem ? 'R' : 'D'
  } else if (appState.hoveredState.id) {
    tooltipState = stateData.find(
      state => +state.state_fips === +appState.hoveredState.id
    )
    winner = tooltipState.votes_gop > tooltipState.votes_dem ? 'R' : 'D'
  }

  const RepRow = ({ winner }) => (
    <>
      <td className={winner === 'R' ? 'winner rep candidate' : 'rep candidate'}>
        <div>
          <span className="checkmark">
            {winner === 'R' ? <BiCheck fill="white" size={15} /> : ''}
          </span>
          <span className="candidate-name">Donald J. Trump*</span>
        </div>
      </td>
      <td className="party">Rep.</td>
      <td>{tooltipState.votes_gop.toLocaleString()}</td>
      <td className="percentage">
        <span>
          {Math.abs(tooltipState.per_point_diff) < 0.01
            ? (tooltipState.per_gop * 100).toFixed(2)
            : (tooltipState.per_gop * 100).toFixed(1)}
        </span>
        {winner === 'R' ? '%' : ''}
      </td>
      <td className="electoral">
        {tooltipState.el_votes_gop ? tooltipState.el_votes_gop : '—'}
      </td>
    </>
  )
  const DemRow = ({ winner }) => (
    <>
      <td className={winner === 'D' ? 'winner dem candidate' : 'dem candidate'}>
        <div>
          <span className="checkmark">
            {winner === 'D' ? <BiCheck fill="white" size={15} /> : ''}
          </span>
          <span className="candidate-name">Joseph R. Biden Jr.</span>
        </div>
      </td>
      <td className="party">Dem.</td>
      <td>{tooltipState.votes_dem.toLocaleString()}</td>
      <td className="percentage">
        <span>
          {Math.abs(tooltipState.per_point_diff) < 0.01
            ? (tooltipState.per_dem * 100).toFixed(2)
            : (tooltipState.per_dem * 100).toFixed(1)}
        </span>
        {winner === 'D' ? '%' : ''}
      </td>
      <td className="electoral">
        {tooltipState.el_votes_dem ? tooltipState.el_votes_dem : '—'}
      </td>
    </>
  )

  return (
    <div
      id="state-tooltip"
      className="tooltip"
      ref={tooltip}
      style={{
        ...tooltipX,
        top: tooltipY,
        opacity: tooltipOpacity,
        position: tooltipPosition
      }}
    >
      {tooltipState ? (
        <div className="tooltip-inner">
          <p className="tooltip__heading">
            <strong>{tooltipState.state}</strong>
          </p>
          <table className="tooltip__table">
            <thead>
              <tr>
                <th>
                  {tooltipState.el_votes_gop + tooltipState.el_votes_dem}{' '}
                  electoral votes
                </th>
                <th>Party</th>
                <th style={{ textAlign: 'right' }}>Votes</th>
                <th style={{ textAlign: 'center' }}>Pct.</th>
                <th style={{ textAlign: 'center' }}>E.V.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {tooltipState.votes_dem > tooltipState.votes_gop ? (
                  <DemRow winner={winner} />
                ) : (
                  <RepRow winner={winner} />
                )}
              </tr>
              <tr>
                {tooltipState.votes_dem < tooltipState.votes_gop ? (
                  <DemRow winner={winner} />
                ) : (
                  <RepRow winner={winner} />
                )}
              </tr>
            </tbody>
          </table>
          <footer>
            <div>100% of Estimated Votes Reported</div>
            <div>* Incumbent</div>
          </footer>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
