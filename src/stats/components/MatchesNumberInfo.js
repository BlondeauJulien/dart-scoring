import React from 'react';

import './MatchesNumberInfo.css'

const MatchesNumberInfo = props => {
  const { nbrOfMatches, matchesWon, soloGames, getChart } = props;
  return (
    <div  className="match-number-infos-cont">
      <div className="stat-hover" onClick={() => getChart('matchResult', 'Win/Loss', 'pieChart')}>
        <p>Matches played</p>
        <p className="match-number-infos-cont__data">{nbrOfMatches}</p>
      </div>
      <div className="stat-hover" onClick={() => getChart('matchResult', 'Win/Loss', 'pieChart')}>
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
