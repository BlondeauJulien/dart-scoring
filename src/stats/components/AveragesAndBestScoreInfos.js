import React from 'react';

import './AveragesAndBestScoreInfos.css'

const AveragesAndBestScoreInfos = props => {
  const {averages, bestThreeDarts, classNamePage} = props;
  return (
    <div>
      <h3 className={`stats__averages-cont-title-${classNamePage}`}>Averages and best</h3>
      <div className={`stats__averages-cont-${classNamePage}`}>
        <div>
          <p>Overall average</p>
          <p className="match-number-infos-cont__data">{Math.round(averages.overall)}</p>
        </div>
        <div>
          <p>Beg/Mid game average</p>
          <p className="match-number-infos-cont__data">{Math.round(averages.begMidGame)}</p>
        </div>
        <div>
          <p>End game average</p>
          <p className="match-number-infos-cont__data">{Math.round(averages.endGame)}</p>
        </div>
        <div>
          <p>Best three darts score</p>
          <p className="match-number-infos-cont__data">{bestThreeDarts}</p>
        </div>
      </div>
    </div>
  )
}

export default AveragesAndBestScoreInfos
