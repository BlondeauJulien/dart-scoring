import React from 'react';

import './PlayerItem.css';

const PlayerItem = props => {
  const { playerName, infos} = props
  const { score, setWon, averages, currentSetLegWon, bestThreeDarts } = infos;
  
  return (
    <div>
      <div>
        <h3>{playerName}</h3>
        <span>{score}</span>
      </div>
      <div>
        <table>
          <tbody>
          <tr>
            <th>Set:</th>
            <td>{setWon}</td>
          </tr>
          <tr>
            <th>Leg:</th>
            <td>{currentSetLegWon}</td>
          </tr>
          <tr>
            <th>Average:</th>
            <td>{Math.round(averages.overall)}</td>
          </tr>
          <tr>
            <th>Best:</th>
            <td>{bestThreeDarts}</td>
          </tr>
          </tbody>
        </table> 
      </div>
    </div>
  )
}

export default PlayerItem
