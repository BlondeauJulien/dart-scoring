import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

import PlayersList from '../components/PlayersList';
import CurrentPlayer from '../components/CurrentPlayer';
import DartBoard from '../components/DartBoard';
import GameContext from '../../context/gameContext/gameContext';
import PageErrorMessage from '../../shared/components/UIElement/PageErrorMessage';
import Spinner from '../../shared/components/UIElement/Spinner';
import StatsContainer from '../../stats/components/StatsContainer';

import './Game.css'

const Game = () => {
  const gameContext = useContext(GameContext);

  if(gameContext.loading.initGameLoading) {
    return <Spinner spinnerContClassName={"spinner-cont-large"} spinnerImgClassName={"spinnerSmall"}/>
  }
  
  if(!gameContext.match.gameIsRunning) {
    return (
      <PageErrorMessage title={'You need to initialise a new game'}>
        <Link to='/' className="page-error__button">Set up a new game</Link>
      </PageErrorMessage>
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
        <h3>STATS</h3>
        <div className="game__stats-cont">
          {gameContext.match.players.map(player => (
            <StatsContainer 
              playerStats={gameContext.match.matchPlayerInfo[player]} 
              playerName={player} 
              classNameFor={'player-match-stats'}
              isMatchStats
            />
          ))}
        </div>
      </div>
    </Fragment>
  )
}

export default Game
