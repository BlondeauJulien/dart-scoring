import React, { useReducer } from 'react';
import GameContext from './gameContext';
import gameReducer from './gameReducer';
import {
  INIT_NEW_GAME,
  SET_LOADING,
  UPDATE_CURRENT_THROW,
  RESET_CURRENT_THROW,
  PUSH_TO_CURRENT_LEG_THROWS,
  UPDATE_PLAYER_SCORE,
  UPDATE_AVERAGES,
  INCREMENT_TOTAL_THROW,
  UPDATE_BEST_THREE_DARTS,
  UPDATE_SECTION_HIT,
  UPDATE_SCORE_RANGES,
  UPDATE_DOUBLE_OUT,
  INCREMENT_LEG_WON,
  CHANGE_CURRENT_PLAYER,
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
    let hasWonLeg = false;

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
      playerBustedUpdateState()

    }else if(currentScore === 0) {
      let finishedInDouble = lastDartIsDouble();
      if(finishedInDouble) {
        console.log('finished')
        playerUpdateStat(currentScore);
        incrementLegWon();
        hasWonLeg = true;
        console.log(state)
      } else {
        console.log('bust')
        playerBustedUpdateState()
      }
    } else {
      playerUpdateStat(currentScore);
    }
    updateBestThreeDart();
    updateSectionHit();
    couldDoubleOut();

    pushCurrentThrowToCurrentLegThrow();
    resetCurrentThrow();

    manageCurrentPlayerChange(hasWonLeg);

    setLoading('validateThrow', false);
  }

  const playerUpdateStat = (currentScore) => {
    calculateAverage();
    incrementTotalThrow();
    updateScoreRanges(); 
    updatePlayerScore(currentScore);

  }

  const playerBustedUpdateState = () => {
      calculateAverage(true);
      incrementTotalThrow();
      updateScoreRanges(true); 
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

  const resetCurrentThrow = () => dispatch({type: RESET_CURRENT_THROW})

  const calculateAverage = (isBusted = false) => {
    let playerName = state.match.players[state.match.currentPlayerTurn];
    let totalRounds = state.match.matchPlayerInfo[playerName].totalThrow.rounds
    let overallAverage = state.match.matchPlayerInfo[playerName].averages.overall;

    let totalCurrentScore = isBusted ? 0 : getCurrentThrowScore();

    let newOverallAverage = (overallAverage * totalRounds + totalCurrentScore) / (totalRounds +1);

    let gamePeriod = state.match.matchPlayerInfo[playerName].score > 140 ? 'begMidGame' : 'endGame';
    let newGamePeriodAvg;
 
    if(gamePeriod === 'begMidGame') {
      let totalRoundsBegMid = state.match.matchPlayerInfo[playerName].totalThrowBegMidGame.rounds;
      let begMidGameAvg = state.match.matchPlayerInfo[playerName].averages.begMidGame;

      newGamePeriodAvg = (begMidGameAvg * totalRoundsBegMid + totalCurrentScore) / (totalRoundsBegMid + 1);
    } else {
      let totalRoundsEnd = state.match.matchPlayerInfo[playerName].totalThrowEndGame.rounds;
      let endGameAvg = state.match.matchPlayerInfo[playerName].averages.endGame;

      newGamePeriodAvg = (endGameAvg * totalRoundsEnd + totalCurrentScore) / (totalRoundsEnd + 1);
    } 

    dispatch({
      type: UPDATE_AVERAGES,
      payload: {
        playerName,
        newOverallAverage,
        gamePeriod,
        newGamePeriodAvg
      }
    });
  }

  const updatePlayerScore = score => {
    let playerName = state.match.players[state.match.currentPlayerTurn];

    dispatch({
      type: UPDATE_PLAYER_SCORE,
      payload: {
        playerName,
        score
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

  const couldDoubleOut = () => {
    let playerName = state.match.players[state.match.currentPlayerTurn];
    let darts = [...state.match.currentThrow].filter(dart => dart.trim() !== '');
    let doubleOut = {...state.match.matchPlayerInfo[playerName].doubleOut};
    let currentScore = state.match.matchPlayerInfo[playerName].score;
    let scoreCurrentThrow = 0;
    let newCurrentScore = currentScore - scoreCurrentThrow;

    darts.forEach(dart => {
      let dartScore;
      if(Number(dart) === 0 ) {
        dartScore = 0;
      } else {
        let score = Number(dart.slice(1));
        if(/t/i.test(dart[0])) score *= 3;
        if(/d/i.test(dart[0])) score *= 2;
        dartScore = score;
    
      }

      if((newCurrentScore <= 40 && newCurrentScore >= 2) || newCurrentScore === 50) {
        if(newCurrentScore % 2 === 0) {
          let possibleDoubleOut = newCurrentScore / 2;
          let hasDoubleOut = newCurrentScore - dartScore === 0 && /d/i.test(dart[0]);
          if(doubleOut.hasOwnProperty(possibleDoubleOut)) {
            doubleOut[possibleDoubleOut].total++;
            !hasDoubleOut && doubleOut[possibleDoubleOut].miss++
            hasDoubleOut && doubleOut[possibleDoubleOut].hit++
          } else {
            doubleOut[possibleDoubleOut] = {
              total: 1,
              miss: !hasDoubleOut ? 1 : 0,
              hit: hasDoubleOut ? 1 : 0,
            }
          }
        }
      }
      newCurrentScore -= dartScore;
    });

    dispatch({
      type: UPDATE_DOUBLE_OUT,
      payload: {
        playerName,
        doubleOut
      }
    })
  }

  const incrementLegWon = () => {
    let playerName = state.match.players[state.match.currentPlayerTurn];
    dispatch({
      type: INCREMENT_LEG_WON,
      payload: {
        playerName
      } 
    })
  }

  const manageCurrentPlayerChange = (hasWonLeg) => {
    let currentPlayer = state.match.currentPlayerTurn;
    let numberOfPlayers = state.match.numberOfPlayers;
    if(!hasWonLeg) {
      let nextPlayer = currentPlayer + 1 >= numberOfPlayers ? 0 : currentPlayer + 1;
      dispatch({
        type: CHANGE_CURRENT_PLAYER,
        payload: nextPlayer
      })
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
