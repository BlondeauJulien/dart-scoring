import React, { useReducer } from 'react';
import GameContext from './gameContext';
import gameReducer from './gamReducer';
import {
  INIT_NEW_GAME,
} from '../types';

const GameState = props => {
  const initialState = {
    gameIsRunning: false,
    gameType: undefined,
    isSoloGame: undefined,
    hasWinner:false,
    sets: undefined,
    legs: undefined,
    players: [],
    startingPlayer: 0,
    currentPlayerTurn: 0,
    currentLegThrows: [],
    matchInfo: {},
    matchStats: {}
  }

  const [state, dispatch] = useReducer(gameReducer, initialState);

  const initNewGame = gameData => {
    dispatch({
      type: INIT_NEW_GAME,
      payload: gameData
    })
  }

  return (
    <GameContext.Provider
      value={{
        gameIsRunning: state.gameIsRunning,
        gameType: state.gameType,
        isSoloGame: state.isSoloGame,
        hasWinner: state.hasWinner,
        sets: state.sets,
        legs: state.legs,
        order: state.order,
        currentLegThrows: state.currentLegThrows,
        matchInfo: state.matchInfo,
        matchStats: state.matchStats,
        initNewGame
      }}
    >
      {props.children}
    </GameContext.Provider>
  )
}

export default GameState;
