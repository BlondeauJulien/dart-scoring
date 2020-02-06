import React from 'react';

import AveragesAndBestScoreInfos from '../../stats/components/AveragesAndBestScoreInfos';
import StatsObjectData from '../../stats/components/StatsObjectData';

import './CurrentPlayerStats.css';

const CurrentPlayerStats = props => {
  const {averages, bestThreeDarts, scoreRanges, doubleOut, checkoutScores} = props.currentPlayerInfos
  return (
    <div className="game__current-player-stats">
      <AveragesAndBestScoreInfos
       averages={averages} 
       bestThreeDarts={bestThreeDarts}
       statBlockClassName={'inline'}
      />

      {Object.keys(scoreRanges).length > 0 && (
        <StatsObjectData title={'Score ranges:'} object={scoreRanges} />
      )}
      {Object.keys(doubleOut).length > 0 && (
        <StatsObjectData title={'Double Out success rate:'} object={doubleOut} isDoubleOut/>
      )}
      {Object.keys(checkoutScores).length > 0 && (
        <StatsObjectData title={'Successful checkout score:'} object={checkoutScores} />
      )}
    </div>
  )
}

export default CurrentPlayerStats
