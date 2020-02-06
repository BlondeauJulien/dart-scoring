import React from 'react'

const MatchesNumberInfo = props => {
  const { nbrOfMatches, matchesWon, soloGames } = props;
  return (
    <div>
      <div className="flex-duo-space-between min-width-80">
        <p>Matches played:</p>
        <p>{nbrOfMatches}</p>
      </div>
      <div className="flex-duo-space-between min-width-80">
        <p>Matches won:</p>
        <p>{matchesWon}</p>
      </div>
      <div className="flex-duo-space-between min-width-80">
        <p>Solo game:</p>
        <p>{soloGames}</p>
      </div>
    </div>
  )
}

export default MatchesNumberInfo
