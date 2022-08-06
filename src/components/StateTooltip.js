import { useContext, useEffect, useRef, useState } from 'react'
import StateContext from '../StateContext'
import { BiCheck } from 'react-icons/bi'
export const StateTooltip = ({ stateData }) => {
  const appState = useContext(StateContext)
  const activeState = appState.activeState
  let hoveredState
  let winner
  const tooltip = useRef()

  const [tooltipHeight, setTooltipHeight] = useState(0)
  const [tooltipX, setTooltipX] = useState(0)

  useEffect(() => {
    setTooltipHeight(tooltip.current.clientHeight)

    if (appState.hoveredState.id) {
      let tooltipWidth = tooltip.current.clientWidth

      if (tooltipWidth / 2 + appState.hoveredState.x > window.innerWidth) {
        setTooltipX(window.innerWidth - tooltipWidth)
      } else if (appState.hoveredState.x - tooltipWidth / 2 < 0) {
        setTooltipX(0)
      } else {
        setTooltipX(appState.hoveredState.x - tooltipWidth / 2)
      }
    }
  }, [appState])

  if (appState.hoveredState.id) {
    hoveredState = stateData.find(
      state => +state.state_fips === +appState.hoveredState.id
    )
    winner = hoveredState.votes_gop > hoveredState.votes_dem ? 'R' : 'D'
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
      <td>{hoveredState.votes_gop.toLocaleString()}</td>
      <td className="percentage">
        <span>
          {Math.abs(hoveredState.per_point_diff) < 0.01
            ? (hoveredState.per_gop * 100).toFixed(2)
            : (hoveredState.per_gop * 100).toFixed(1)}
        </span>
        {winner === 'R' ? '%' : ''}
      </td>
      <td className="electoral">
        {hoveredState.el_votes_gop ? hoveredState.el_votes_gop : '—'}
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
      <td>{hoveredState.votes_dem.toLocaleString()}</td>
      <td className="percentage">
        <span>
          {Math.abs(hoveredState.per_point_diff) < 0.01
            ? (hoveredState.per_dem * 100).toFixed(2)
            : (hoveredState.per_dem * 100).toFixed(1)}
        </span>
        {winner === 'D' ? '%' : ''}
      </td>
      <td className="electoral">
        {hoveredState.el_votes_dem ? hoveredState.el_votes_dem : '—'}
      </td>
    </>
  )

  return (
    <div
      id="state-tooltip"
      className="tooltip"
      ref={tooltip}
      style={{
        left: tooltipX,
        top:
          appState.hoveredState.y + tooltipHeight + 30 > window.innerHeight
            ? appState.hoveredState.y - tooltipHeight - 30
            : appState.hoveredState.y + 30,
        opacity: hoveredState && !activeState ? 1 : 0
      }}
    >
      {hoveredState && !activeState ? (
        <>
          <p className="tooltip__heading">
            <strong>{hoveredState.state}</strong>
          </p>
          <table className="tooltip__table">
            <thead>
              <tr>
                <th>
                  {hoveredState.el_votes_gop + hoveredState.el_votes_dem}{' '}
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
                {hoveredState.votes_dem > hoveredState.votes_gop ? (
                  <DemRow winner={winner} />
                ) : (
                  <RepRow winner={winner} />
                )}
              </tr>
              <tr>
                {hoveredState.votes_dem < hoveredState.votes_gop ? (
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
        </>
      ) : (
        ''
      )}
    </div>
  )
}
