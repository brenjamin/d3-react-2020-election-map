import { useContext } from 'react'
import { transform } from 'topojson'
import StateContext from '../StateContext'
export const StateTooltip = ({ stateData }) => {
  const appState = useContext(StateContext)
  const activeState = appState.activeState
  const hoveredState = stateData.find(
    state => +state.state_fips === +appState.hoveredState.id
  )

  let winner
  if (hoveredState) {
    winner = hoveredState.votes_gop > hoveredState.votes_dem ? 'R' : 'D'
  }

  const RepRow = ({ winner }) => (
    <>
      <td className={winner === 'R' ? 'winner rep candidate' : 'rep candidate'}>
        <div>
          <span class="checkmark">
            {winner === 'R' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14"
                width="14"
                viewBox="0 0 20 20"
                fill="white"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            ) : (
              ''
            )}
          </span>
          <span className="candidate-name">Donald J. Trump*</span>
        </div>
      </td>
      <td class="party">Rep.</td>
      <td>{hoveredState.votes_gop.toLocaleString()}</td>
      <td class="percentage">
        <span>
          {Math.abs(hoveredState.per_point_diff) < 0.01
            ? (hoveredState.per_gop * 100).toFixed(2)
            : (hoveredState.per_gop * 100).toFixed(1)}
        </span>
        {winner === 'R' ? '%' : ''}
      </td>
      <td class="electoral">
        {hoveredState.el_votes_gop ? hoveredState.el_votes_gop : '—'}
      </td>
    </>
  )
  const DemRow = ({ winner }) => (
    <>
      <td className={winner === 'D' ? 'winner dem candidate' : 'dem candidate'}>
        <div>
          <span class="checkmark">
            {winner === 'D' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14"
                width="14"
                viewBox="0 0 20 20"
                fill="white"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            ) : (
              ''
            )}
          </span>
          <span className="candidate-name">Joseph R. Biden Jr.</span>
        </div>
      </td>
      <td class="party">Dem.</td>
      <td>{hoveredState.votes_dem.toLocaleString()}</td>
      <td class="percentage">
        <span>
          {Math.abs(hoveredState.per_point_diff) < 0.01
            ? (hoveredState.per_dem * 100).toFixed(2)
            : (hoveredState.per_dem * 100).toFixed(1)}
        </span>
        {winner === 'D' ? '%' : ''}
      </td>
      <td class="electoral">
        {hoveredState.el_votes_dem ? hoveredState.el_votes_dem : '—'}
      </td>
    </>
  )

  return hoveredState && !activeState ? (
    <div
      id="state-tooltip"
      className="tooltip"
      style={{
        left: appState.hoveredState.x + 5,
        top: appState.hoveredState.y + 30,
        transform: 'translateX(-50%)'
      }}
    >
      <p className="tooltip__heading">
        <strong>{hoveredState.state}</strong>
      </p>
      <table class="tooltip__table">
        <thead>
          <tr>
            <th>
              {hoveredState.el_votes_gop + hoveredState.el_votes_dem} electoral
              votes
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
    </div>
  ) : (
    <></>
  )
}
