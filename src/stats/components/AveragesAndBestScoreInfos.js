import React from 'react';

import './AveragesAndBestScoreInfos.css'

const AveragesAndBestScoreInfos = props => {
  const {averages, bestThreeDarts, classNamePage, getChart} = props;
  
  return (
    <div>
      <h3 className={`stats__averages-cont-title-${classNamePage}`}>Averages and best</h3>
      <div className={`stats__averages-cont-${classNamePage}`}>
        <div className="stat-hover" onClick={() => getChart('averageOverall', 'Averages for each match', 'lineChart')}>
          <p>Overall average</p>
          <p className="match-number-infos-cont__data">{Math.round(averages.overall)}</p>
        </div>
        <div className="stat-hover" onClick={() => getChart('averageBegMidGame', 'Beg/Mid game averages for each match', 'lineChart')}>
          <p>Beg/Mid game average</p>
          <p className="match-number-infos-cont__data">{Math.round(averages.begMidGame)}</p>
        </div>
        <div className="stat-hover" onClick={() => getChart('averageEndGame', 'End game averages for each match', 'lineChart')}>
          <p>End game average</p>
          <p className="match-number-infos-cont__data">{Math.round(averages.endGame)}</p>
        </div>
        <div className="stat-hover" onClick={() => getChart('bestThreeDarts', 'Best three darts score for each match', 'lineChart')}>
          <p>Best three darts score</p>
          <p className="match-number-infos-cont__data">{bestThreeDarts}</p>
        </div>
      </div>
    </div>
  )
}

export default AveragesAndBestScoreInfos
