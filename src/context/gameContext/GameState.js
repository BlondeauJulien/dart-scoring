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
      initGameLoading: false,
      validateThrow: false
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

  const updateCurrentThrowManual = (value, index) => {
    const newCurrentThrow = state.match.currentThrow.map((dart, i) => {
      if(i === index) {
        dart = value;
      }
      return dart
    });

    
    dispatch({
      type: UPDATE_CURRENT_THROW,
      payload: newCurrentThrow
    })
  }

  const updateCurrentThrowDartBoard = value => {
    const newCurrentThrow = [...state.match.currentThrow];

    for(let i = 0; i< newCurrentThrow.length; i++) {
      if(newCurrentThrow[i] === '') {
        newCurrentThrow[i] = value;
        break;
      }
    }
    dispatch({
      type: UPDATE_CURRENT_THROW,
      payload: newCurrentThrow
    })

  }

  const onClickValidateThrow = () => {
    setLoading('validateThrow', true);
  }

  const validateDartValue = dart => {

    if(Number(dart) === 0 || dart === '') return true;
    if(/^[SDT]\d{1,2}$/i.test(dart) ) {

      let score = Number(dart.slice(1));
      if((score >= 1 && score <= 20) || /[SD]25/i.test(dart)) return true;
      
    }
    return false;
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
        onClickValidateThrow,
        updateCurrentThrowManual,
        updateCurrentThrowDartBoard,
        validateDartValue
      }}
    >
      {props.children}
    </GameContext.Provider>
  )
}

export default GameState;
