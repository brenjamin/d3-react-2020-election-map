import { useContext, useRef, useState, useEffect } from 'react'
import StateContext from '../StateContext'
export const CountyTooltip = ({ countyData }) => {
  const appState = useContext(StateContext)

  let winner
  let hoveredCounty
  const tooltip = useRef()

  const [tooltipHeight, setTooltipHeight] = useState(0)
  const [tooltipX, setTooltipX] = useState(0)

  useEffect(() => {
    setTooltipHeight(tooltip.current.clientHeight)

    if (appState.hoveredCounty.id) {
      let tooltipWidth = tooltip.current.clientWidth
      if (tooltipWidth / 2 + appState.hoveredCounty.x > window.innerWidth) {
        setTooltipX(window.innerWidth - tooltipWidth)
      } else if (appState.hoveredCounty.x - tooltipWidth / 2 < 0) {
        setTooltipX(0)
      } else {
        setTooltipX(appState.hoveredCounty.x - tooltipWidth / 2)
      }
    }
  }, [appState])

  if (appState.hoveredCounty.id) {
    hoveredCounty = countyData.find(
      county => +county.county_fips === +appState.hoveredCounty.id
    )
    winner = hoveredCounty.votes_gop > hoveredCounty.votes_dem ? 'R' : 'D'
  }

  const RepRow = ({ winner }) => (
    <>
      <td className={winner === 'R' ? 'winner rep candidate' : 'rep candidate'}>
        <div>
          <span className="candidate-name">Donald J. Trump*</span>
        </div>
      </td>
      <td className="party">Rep.</td>
      <td>{hoveredCounty.votes_gop.toLocaleString()}</td>
      <td className="percentage">
        <span>
          {Math.abs(hoveredCounty.per_point_diff) < 0.01
            ? (hoveredCounty.per_gop * 100).toFixed(2)
            : (hoveredCounty.per_gop * 100).toFixed(1)}
        </span>
        {winner === 'R' ? '%' : ''}
      </td>
    </>
  )
  const DemRow = ({ winner }) => (
    <>
      <td className={winner === 'D' ? 'winner dem candidate' : 'dem candidate'}>
        <div>
          <span className="candidate-name">Joseph R. Biden Jr.</span>
        </div>
      </td>
      <td className="party">Dem.</td>
      <td>{hoveredCounty.votes_dem.toLocaleString()}</td>
      <td className="percentage">
        <span>
          {Math.abs(hoveredCounty.per_point_diff) < 0.01
            ? (hoveredCounty.per_dem * 100).toFixed(2)
            : (hoveredCounty.per_dem * 100).toFixed(1)}
        </span>
        {winner === 'D' ? '%' : ''}
      </td>
    </>
  )

  return (
    <div
      id="county-tooltip"
      className="tooltip"
      ref={tooltip}
      style={{
        left: tooltipX,
        top:
          appState.hoveredCounty.y + tooltipHeight + 30 > window.innerHeight
            ? appState.hoveredCounty.y - tooltipHeight - 30
            : appState.hoveredCounty.y + 30,
        opacity: hoveredCounty ? 1 : 0
      }}
    >
      {hoveredCounty ? (
        <div className="tooltip-inner">
          <p className="tooltip__heading">
            <strong>{hoveredCounty.county_name}</strong>
          </p>
          <table className="tooltip__table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Party</th>
                <th style={{ textAlign: 'right' }}>Votes</th>
                <th style={{ textAlign: 'center' }}>Pct.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {hoveredCounty.votes_dem > hoveredCounty.votes_gop ? (
                  <DemRow winner={winner} />
                ) : (
                  <RepRow winner={winner} />
                )}
              </tr>
              <tr>
                {hoveredCounty.votes_dem < hoveredCounty.votes_gop ? (
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
