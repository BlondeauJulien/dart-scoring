import React from 'react'

const MatchesNumberInfo = props => {
  const { nbrOfMatches, matchesWon, soloGames } = props;
  return (
    <div>
      <div>
        <p>Matches played:</p>
        <p>{nbrOfMatches}</p>
      </div>
      <div>
        <p>Matches won:</p>
        <p>{matchesWon}</p>
      </div>
      <div>
        <p>Solo game:</p>
        <p>{soloGames}</p>
      </div>
    </div>
  )
}

export default MatchesNumberInfo
