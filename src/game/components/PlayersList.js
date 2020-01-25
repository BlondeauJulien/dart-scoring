import React from 'react';

import PlayerItem from './PlayerItem';

import './PlayersList.css';

const PlayersList = props => {
  return (
    <div>
      {Object.entries(props.playersInfo).map(([player, stats]) => (
        <PlayerItem key={`player-item-${player}`} playerName={player} playerInfo={stats} throws={props.playersStat[player].throws} />
      ))}
    </div>
  )
}

export default PlayersList
