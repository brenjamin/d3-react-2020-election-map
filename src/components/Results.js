import React from 'react'
import { BiCheck } from 'react-icons/bi'

export const Results = ({ stateData }) => {
  const elVotesGop = stateData.reduce((accumulator, state) => {
    return accumulator + state.el_votes_gop
  }, 0)
  const elVotesDem = stateData.reduce((accumulator, state) => {
    return accumulator + state.el_votes_dem
  }, 0)
  const votesGop = stateData.reduce((accumulator, state) => {
    return accumulator + state.votes_gop
  }, 0)
  const votesDem = stateData.reduce((accumulator, state) => {
    return accumulator + state.votes_dem
  }, 0)

  const winner =
    elVotesDem > elVotesGop ? 'Joseph R. Biden Jr.' : 'Donald J. Trump'

  return (
    <section id="results" className="results">
      <div className="results__electoral">
        <div className="results__electoral--dem">
          <p>{elVotesDem}</p>
          <p>
            Joseph R. Biden Jr.{' '}
            <span className="results__checkmark">
              <BiCheck fill="white" size={20} />
            </span>
          </p>
        </div>
        <div className="results__electoral--gop">
          <p>{elVotesGop}</p>
          <p>Donald J. Trump</p>
        </div>
      </div>
      <div className="results__bar">
        <div
          className="results__bar--dem"
          style={{
            width: `${(elVotesDem / (elVotesGop + elVotesDem)) * 100}%`
          }}
        ></div>
        <div className="results__bar-midpoint">
          <span>
            270
            <br />
            <span className="results__bar--sm">to win</span>
          </span>
        </div>
        <div
          className="results__bar--gop"
          style={{
            width: `${(elVotesGop / (elVotesGop + elVotesDem)) * 100}%`
          }}
        ></div>
      </div>
      <div className="results__popular">
        <div className="results__popular--dem">
          <p>81,284,666 votes</p>
          <p>(51.3%)</p>
        </div>
        <div className="results__results__popular--gop">
          <p>74,224,319 votes</p>
          <p>(46.8%)</p>
        </div>
      </div>
    </section>
  )
}
