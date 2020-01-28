import React, { useReducer } from 'react';
import GameContext from './gameContext';
import gameReducer from './gamReducer';
import {
  INIT_NEW_GAME,
} from '../types';

import dataModels from '../../utils/dataModels';

const GameState = props => {
  const initialState = {match: {...dataModels.matchModel}};

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
        match: state.match,
/*         gameIsRunning: state.gameIsRunning,
        gameType: state.gameType,
        isSoloGame: state.isSoloGame,
        hasWinner: state.hasWinner,
        sets: state.sets,
        legs: state.legs,
        order: state.order,
        currentLegThrows: state.currentLegThrows,
        matchInfo: state.matchInfo,
        matchStats: state.matchStats, */
        initNewGame
      }}
    >
      {props.children}
    </GameContext.Provider>
  )
}

export default GameState;
