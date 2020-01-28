import React, { Fragment, useContext } from 'react';

import PlayersList from '../components/PlayersList';
import CurrentPlayer from '../components/CurrentPlayer';
import DartBoard from '../components/DartBoard';
import GameContext from '../../context/gameContext/gameContext';
import Spinner from '../../shared/components/UIElement/Spinner';

import './Game.css'

const Game = () => {
  const gameContext = useContext(GameContext);

  if(gameContext.loading.initGameLoading) {
    return <Spinner spinnerContClassName={"spinner-cont-large"} spinnerImgClassName={"spinnerSmall"}/>
  }
  
  if(!gameContext.match.gameIsRunning) {
    return (
        <div>
          <p>You need to initialise a new game</p>
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
