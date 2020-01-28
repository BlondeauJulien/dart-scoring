import React, { Fragment, useContext, useEffect } from 'react';

import PlayersList from '../components/PlayersList';
import CurrentPlayer from '../components/CurrentPlayer';
import DartBoard from '../components/DartBoard';
import GameContext from '../../context/gameContext/gameContext';

import './Game.css'

const Game = () => {
  const gameContext = useContext(GameContext);
  
  if(!gameContext.match.gameIsRunning) {
    return (
        <div>
          <p>Waiting for data</p>
        </div>
    )
  }

  return (
    <Fragment>
      <div className="game-container">
        <DartBoard />
        <CurrentPlayer />
        <PlayersList />
      </div>
      <div className="game-stats-container">
        stats
      </div>
    </Fragment>
  )
}

export default Game
