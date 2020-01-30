import React, { useReducer } from 'react';
import GameContext from './gameContext';
import gameReducer from './gameReducer';
import {
  INIT_NEW_GAME,
  SET_LOADING,
  UPDATE_CURRENT_THROW,
  PUSH_TO_CURRENT_LEG_THROWS,
  INCREMENT_TOTAL_THROW,
  UPDATE_BEST_THREE_DARTS,
  UPDATE_SECTION_HIT,
  UPDATE_SCORE_RANGES,
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
        throwError("One or more of your dart has an invalid value", "throw-validation");
        setLoading('validateThrow', false);
        return
      }
    }

    let throwIsValid = validateWholeThrow(currentThrow, currentScore);
    if(!throwIsValid) {
      setLoading('validateThrow', false);
      return
    };

    if(currentScore === 1 || currentScore < 0) {
      console.log('busted');
      pushCurrentThrowToCurrentLegThrow();
      incrementTotalThrow();
      updateBestThreeDart();
      updateSectionHit();
      updateScoreRanges(true); // actually will be 0
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

  const getCurrentThrowScore = () => {
    let totalScore = [...state.match.currentThrow].reduce((total, dart) => {
      let dartIsValid = validateDartValue(dart);

      if(!dartIsValid) return total += 0;

      if(Number(dart) === 0 || dart === '') return total +=0;

      let score = Number(dart.slice(1));
        if((score >=1 && score <=20) || /[SD]25/i.test(dart)) {
          if(/t/i.test(dart[0])) score *= 3;
          if(/d/i.test(dart[0])) score *= 2;
          return total +=score;

        }

      return total += 0;
    }, 0 );

    return  totalScore;
  }

  const pushCurrentThrowToCurrentLegThrow = () => {
    let playerName = state.match.players[state.match.currentPlayerTurn];
    dispatch({
      type: PUSH_TO_CURRENT_LEG_THROWS,
      payload: {
        playerName,
        darts: state.match.currentThrow.filter(dart => dart.trim() !== ''),
      } 
    })
  }

  const incrementTotalThrow = () => {
    let playerName = state.match.players[state.match.currentPlayerTurn];
    let dartNumber = state.match.currentThrow.filter(dart => dart.trim() !== '').length;
    let gamePeriod = state.match.matchPlayerInfo[playerName].score > 140 ? 'totalThrowBegMidGame' : 'totalThrowEndGame';
    dispatch({
      type: INCREMENT_TOTAL_THROW,
      payload: {
        playerName,
        dartNumber,
        gamePeriod
      }
    })
  }

  const updateBestThreeDart = () => {
    let score = getCurrentThrowScore();
    let playerName = state.match.players[state.match.currentPlayerTurn];
    if(score > state.match.matchPlayerInfo[playerName].bestThreeDarts) {
      dispatch({
        type: UPDATE_BEST_THREE_DARTS,
        payload: {
          playerName,
          score
        }
      })
    }
  }

  const updateSectionHit = () => {
    let playerName = state.match.players[state.match.currentPlayerTurn];
    let hit = {...state.match.matchPlayerInfo[playerName].hit};

    state.match.currentThrow.forEach(dart => {
      if(dart.trim() !== '') {
        if(Number(dart) === 0 ) {
          if(hit.hasOwnProperty('Missed')) {
            hit.Missed++;
          } else {
            hit.Missed = 1;
          }
        } else {
          if(hit.hasOwnProperty(dart.toUpperCase())) {
            hit[dart.toUpperCase()]++;
          } else {
            hit[dart.toUpperCase()] = 1;
          }
        }
      }
    });

    dispatch({
      type: UPDATE_SECTION_HIT,
      payload: {
        playerName,
        hit
      }
    })
  }

  const updateScoreRanges = (busted = false) => {
    let playerName = state.match.players[state.match.currentPlayerTurn];
    let score = getCurrentThrowScore();
    let scoreRanges = {...state.match.matchPlayerInfo[playerName].scoreRanges};

    function incrementRange(range) {
      if(scoreRanges.hasOwnProperty(range)) {
        scoreRanges[range]++
      } else {
        scoreRanges[range] = 1;
      }
    }

    if(busted) {
      incrementRange('Busted');
    } else if (score === 0){
      incrementRange('ZERO');
    } else if(score < 20) {
      incrementRange('1-19');
    } else if (score < 40) {
      incrementRange('20-39');
    } else if(score < 60) {
      incrementRange('40-59');
    } else if(score < 80) {
      incrementRange('60-79');
    } else if (score < 100) {
      incrementRange('80-99');
    } else if(score < 120) {
      incrementRange('100-119');
    } else if(score < 140) {
      incrementRange('120-139');
    } else if(score < 160) {
      incrementRange('140-159');
    } else if(score < 180) {
      incrementRange('160-179');
    } else {
      incrementRange('180');
    }

    dispatch({
      type: UPDATE_SCORE_RANGES,
      payload: {
        playerName,
        scoreRanges
      }
    })
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
        getCurrentThrowScore,
        throwError,
        resetError
      }}
    >
      {props.children}
    </GameContext.Provider>
  )
}

export default GameState;
