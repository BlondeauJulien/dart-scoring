import React, { useContext } from 'react';

import PlayerItem from './PlayerItem';
import GameContext from '../../context/gameContext/gameContext';

import './PlayersList.css';

const PlayersList = props => {
  const { match } = useContext(GameContext);
  return (
    <div>
      {Object.entries(match.matchPlayerInfo).map(([player, infos]) => (
        <PlayerItem key={`player-item-${player}`} playerName={player} infos={infos} />
      ))}
    </div>
  )
}

export default PlayersList
