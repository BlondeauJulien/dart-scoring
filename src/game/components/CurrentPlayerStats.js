import React from 'react';

import AveragesAndBestScoreInfos from '../../stats/components/AveragesAndBestScoreInfos';
import StatsObjectData from '../../stats/components/StatsObjectData';

import './CurrentPlayerStats.css';

const CurrentPlayerStats = props => {
  const {averages, bestThreeDarts, scoreRanges, doubleOut, checkoutScores, totalThrow} = props.currentPlayerInfos
  return (
    <div className="game__current-player-stats">
      <h2>{props.playerName} stats</h2>
      <AveragesAndBestScoreInfos
       averages={averages} 
       bestThreeDarts={bestThreeDarts}
       statBlockClassName={'inline'}
       classNamePage={'current-player-stats'}
      />

      {Object.keys(scoreRanges).length > 0 && (
        <StatsObjectData title={'Score ranges:'} object={scoreRanges} totalThrow={totalThrow.rounds} statName={'scoreRanges'}/>
      )}
      {Object.keys(doubleOut).length > 0 && (
        <StatsObjectData title={'Double Out success rate:'} object={doubleOut} statName={'doubleOut'}/>
      )}
      {Object.keys(checkoutScores).length > 0 && (
        <StatsObjectData title={'Successful checkout score:'} object={checkoutScores} statName={'checkoutScores'}/>
      )}
    </div>
  )
}

export default CurrentPlayerStats
