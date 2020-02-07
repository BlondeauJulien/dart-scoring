import React from 'react';

import './MatchesNumberInfo.css'

const MatchesNumberInfo = props => {
  const { nbrOfMatches, matchesWon, soloGames } = props;
  return (
    <div className="match-number-infos-cont">
      <div>
        <p>Matches played</p>
        <p className="match-number-infos-cont__data">{nbrOfMatches}</p>
      </div>
      <div>
        <p>Matches won</p>
        <p className="match-number-infos-cont__data">{matchesWon}</p>
      </div>
      <div>
        <p>Solo game</p>
        <p className="match-number-infos-cont__data">{soloGames}</p>
      </div>
    </div>
  )
}

export default MatchesNumberInfo
