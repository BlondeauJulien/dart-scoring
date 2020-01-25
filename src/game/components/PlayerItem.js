import React from 'react'

const PlayerItem = props => {

  const getMatchAverage = () => {

    let avg = props.throws.map(t => t.scores.reduce((total, score) => total += score,0) / t.scores.length)
    return avg.reduce((total, avg) => total += avg) / avg.length;
  }

  const getBestRoundScore = () => {
    let best = 0;

    props.throws.forEach(round => {
      best = Math.max(best, round.scores.reduce((total, dartScore) => total += dartScore, 0))
    });
    return best;
  }
  
  return (
    <div>
      <div>
        <h3>{props.playerName}</h3>
        <span>{props.playerInfo.currentLegScore}</span>
      </div>
      <div>
        <table>
          <tbody>
          <tr>
            <th>Set:</th>
            <td>{props.playerInfo.setWon}</td>
          </tr>
          <tr>
            <th>Leg:</th>
            <td>{props.playerInfo.currentSetLegWon}</td>
          </tr>
          <tr>
            <th>Average:</th>
            <td>{getMatchAverage()}</td>
          </tr>
          <tr>
            <th>Best:</th>
            <td>{getBestRoundScore()}</td>
          </tr>
          </tbody>
        </table> 
      </div>
    </div>
  )
}

export default PlayerItem
