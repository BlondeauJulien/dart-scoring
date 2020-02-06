import React from 'react';

import './AveragesAndBestScoreInfos.css'

const AveragesAndBestScoreInfos = props => {
  const {averages, bestThreeDarts, statBlockClassName} = props;
  return (
    <div>
      <h3>Averages and best</h3>
      <div className={`stats__averages-cont__stat-block-${statBlockClassName}`}>
        <p>Overall average:</p>
        <p>{Math.round(averages.overall)}</p>
      </div>
      <div className={`stats__averages-cont__stat-block-${statBlockClassName}`}>
        <p>Begining and Mid game average:</p>
        <p>{Math.round(averages.begMidGame)}</p>
      </div>
      <div className={`stats__averages-cont__stat-block-${statBlockClassName}`}>
        <p>End game average:</p>
        <p>{Math.round(averages.endGame)}</p>
      </div>
      <div className={`stats__averages-cont__stat-block-${statBlockClassName}`}>
        <p>Best three darts score:</p>
        <p>{bestThreeDarts}</p>
      </div>
    </div>
  )
}

export default AveragesAndBestScoreInfos
