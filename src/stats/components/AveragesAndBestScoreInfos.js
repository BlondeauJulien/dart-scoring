import React from 'react'

const AveragesAndBestScoreInfos = props => {
  const {averages, bestThreeDarts} = props;
  return (
    <div>
      <h3>Averages and best</h3>
      <div>
        <p>Overall average:</p>
        <p>{Math.round(averages.overall)}</p>
      </div>
      <div>
        <p>Begining and Mid game average:</p>
        <p>{Math.round(averages.begMidGame)}</p>
      </div>
      <div>
        <p>End game average:</p>
        <p>{Math.round(averages.endGame)}</p>
      </div>
      <div>
        <p>Best three darts score:</p>
        <p>{bestThreeDarts}</p>
      </div>
    </div>
  )
}

export default AveragesAndBestScoreInfos
