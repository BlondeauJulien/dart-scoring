import React, { useReducer } from 'react';
import GameContext from './gameContext';
import gameReducer from './gamReducer';
import {

} from '../types';

const GameState = props => {
  const initialState = {
    gameIsRunning: false,
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

  return (
    <GameContext.Provider
      value={{
        gameIsRunning: state.gameIsRunning,
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

    </GameContext.Provider>
  )
}

