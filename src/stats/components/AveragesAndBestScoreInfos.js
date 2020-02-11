import React from 'react';

import './AveragesAndBestScoreInfos.css'

const AveragesAndBestScoreInfos = props => {
  const {averages, bestThreeDarts, classNamePage, getChart} = props;
  
  return (
    <div>
      <h3 className={`stats__averages-cont-title-${classNamePage}`}>Averages and best</h3>
      <div className={`stats__averages-cont-${classNamePage}`}>
        <div onClick={() => getChart('averageOverall', 'Averages over matches', 'lineChart')}>
          <p>Overall average</p>
          <p className="match-number-infos-cont__data">{Math.round(averages.overall)}</p>
        </div>
        <div onClick={() => getChart('averageBegMidGame', 'Beg/Mid game averages over matches', 'lineChart')}>
          <p>Beg/Mid game average</p>
          <p className="match-number-infos-cont__data">{Math.round(averages.begMidGame)}</p>
        </div>
        <div onClick={() => getChart('averageEndGame', 'End game averages over matches', 'lineChart')}>
          <p>End game average</p>
          <p className="match-number-infos-cont__data">{Math.round(averages.endGame)}</p>
        </div>
        <div onClick={() => getChart('bestThreeDarts', 'Best three darts score over matches', 'lineChart')}>
          <p>Best three darts score</p>
          <p className="match-number-infos-cont__data">{bestThreeDarts}</p>
        </div>
      </div>
    </div>
  )
}

export default AveragesAndBestScoreInfos
