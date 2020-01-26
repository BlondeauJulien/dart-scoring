import React, { useReducer } from 'react';
import GameContext from './gameContext';
import gameReducer from './gamReducer';
import {

} from '../types';

const GameState = props => {
  const initialState = {
    gameIsRunning: false,
    gameType: undefined,
    isSoloGame: undefined,
    hasWinner:false,
    sets: undefined,
    legs: undefined,
    order: {
      startingPlayer: undefined,
      currentPlayerTurn: undefined,
      players: []
    },
    currentLegThrows: [],
    matchInfo: {},
    matchStats: {}
  }

  const [state, dispatch] = useReducer(gameReducer, initialState);

  const initNewGame = gameData => {
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
        matchStats: state.matchStats
      }}
    >
      {props.children}
    </GameContext.Provider>
  )
}

export default GameState;
