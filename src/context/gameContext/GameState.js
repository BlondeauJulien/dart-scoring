import React, { useReducer } from 'react';
import GameContext from './gameContext';
import gameReducer from './gameReducer';
import {
  INIT_NEW_GAME,
  SET_LOADING,
  UPDATE_CURRENT_THROW
} from '../types';

import dataModels from '../../utils/dataModels';

const GameState = props => {
  const initialState = {
    match: {...dataModels.matchModel},
    loading: {
      initGameLoading: false
    }
  };

  const [state, dispatch] = useReducer(gameReducer, initialState);

  const initNewGame = gameData => {
    setLoading('initGameLoading', true);
    const data = {...state.match, ...gameData}
    dispatch({
      type: INIT_NEW_GAME,
      payload: data
    })
    setLoading('initGameLoading', false)
  }

  const updateCurrentThrow = (value, index) => {
    const newCurrentThrow = state.match.currentThrow.map((dart, i) => {
      if(i === index) {
        dart.score = value;
      }
      return dart
    });

    
    dispatch({
      type: UPDATE_CURRENT_THROW,
      payload: newCurrentThrow
    })
  }

  const setLoading = (eventName, setTo) => dispatch({
    type: SET_LOADING,
    payload: {
      eventName,
      setTo
    }
  });

  return (
    <GameContext.Provider
      value={{
        match: state.match,
        loading: state.loading,
        initNewGame,
        updateCurrentThrow
      }}
    >
      {props.children}
    </GameContext.Provider>
  )
}

export default GameState;
