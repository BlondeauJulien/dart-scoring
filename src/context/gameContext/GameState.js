import React, { useReducer } from 'react';
import GameContext from './gameContext';
import gameReducer from './gameReducer';
import {
  INIT_NEW_GAME,
  SET_LOADING,
  UPDATE_CURRENT_THROW,
  THROW_ERROR,
  RESET_ERROR
} from '../types';

import dataModels from '../../utils/dataModels';

const GameState = props => {
  const initialState = {
    match: {...dataModels.matchModel},
    loading: {
      initGameLoading: false,
      validateThrow: false
    },
    error: null,
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

  const onClickValidateThrow = currentScore => {
    setLoading('validateThrow', true);
    let currentThrow = [...state.match.currentThrow];

    for(let i = 0; i< currentThrow.length; i++) {
      if(!validateDartValue(currentThrow[i])) {
        throwError("One or more of your dart has an invalid value", "throw-validation")
        return
      }
    }

    let throwIsValid = validateWholeThrow(currentThrow, currentScore);

    if(currentScore === 1 || currentScore < 0) {
      console.log('busted')
      // bust 
      //dont change player score
      //get stat
      // move to next player
    }
    if(currentScore === 0) {
      let finishedInDouble = lastDartIsDouble();
      if(finishedInDouble) {
        console.log('finished')
      } else {
        console.log('bust')
      }
    }

    setLoading('validateThrow', false);
  }

  const validateDartValue = dart => {

    if(Number(dart) === 0 || dart === '') return true;
    if(/^[SDT]\d{1,2}$/i.test(dart) ) {

      let score = Number(dart.slice(1));
      if((score >= 1 && score <= 20) || /[SD]25/i.test(dart)) return true;
      
    }
    return false;
  }

  const validateWholeThrow = (values, currentScore) => {
    let getWhiteSpaces = values.filter(value => value.trim() === '');

    if(
      (currentScore >  1 && getWhiteSpaces.length) ||
      values[0] === '' ||
      (values[1] === '' && values[2] !== '')
    ) {
      throwError("You need add a value for each dart", "throw-validation");
      return false;
    }

    if(currentScore === 1 || currentScore === 0) return true;

    return true
  }

  const lastDartIsDouble = () => {
    let values = state.match.currentThrow;

    if(values[2].trim() === '' && values[1].trim() === '') {
      
      if(/^d/i.test(values[0])) {
        console.log('here')
        return true
      } else {
        return false
      }
    } 
    if(values[2].trim() === '') {
      if(/^d/i.test(values[1])) {
        return true
      } else {
        return false
      }
    }
    if(/^d/i.test(values[2])) {
      return true
    } else {
      return false
    }
    
  }

  const setLoading = (eventName, setTo) => dispatch({
    type: SET_LOADING,
    payload: {
      eventName,
      setTo
    }
  });

  const throwError = (message, errorFor) => {
    dispatch({
      type: THROW_ERROR,
      payload: {
        message,
        errorFor
      }, 
    });
  };

  const resetError = () => dispatch({type: RESET_ERROR});

  return (
    <GameContext.Provider
      value={{
        match: state.match,
        loading: state.loading,
        error: state.error,
        initNewGame,
        onClickValidateThrow,
        updateCurrentThrowManual,
        updateCurrentThrowDartBoard,
        validateDartValue,
        resetError
      }}
    >
      {props.children}
    </GameContext.Provider>
  )
}

export default GameState;
