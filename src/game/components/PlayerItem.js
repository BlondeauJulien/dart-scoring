import React from 'react';

import Checkout from './Checkout';
import checkout from '../../utils/checkout';

import './PlayerItem.css';

const PlayerItem = props => {
  const { playerName, infos} = props
  const { score, setWon, averages, currentSetLegWon, bestThreeDarts } = infos;
  
  return (
    <div className="game__player-item">
      <div className="game__player-item__infos">
        <h3 className="game__player-item__name">{playerName}</h3>
        <p className="game__player-item__score">{score}</p>
      </div>
      {checkout[score] && (
				<Checkout score={score}/>
			)}
      <div>
        <table className="game__player-item__stats-table">
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
