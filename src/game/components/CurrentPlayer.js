import React, { useContext, useState, useEffect } from 'react';

import Input from '../../shared/components/form/Input';
import Spinner from '../../shared/components/UIElement/Spinner';
import GameContext from '../../context/gameContext/gameContext';

import './CurrentPlayer.css';

const CurrentPlayer = () => {
  const { 
    match,
    updateCurrentThrowManual,
    onClickValidateThrow,
    validateDartValue,
    loading
  } = useContext(GameContext);
  const [score, setScore] = useState(match.matchPlayerInfo[match.players[match.currentPlayerTurn]].score);

  useEffect(() => {      

    let totalScore = [...match.currentThrow].reduce((total, dart) => {
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

    let currentPlayer = match.players[match.currentPlayerTurn];
    let currentPlayerScore = match.matchPlayerInfo[currentPlayer].score ;

    let newCurrentScore = currentPlayerScore - totalScore;
    setScore(newCurrentScore);

    // eslint-disable-next-line
  }, [match.currentThrow])

  const onChange = e => {
    let throwIndex = Number(e.target.name.split('-')[1]) -1;
    if(throwIndex > 0) {
      for(let i = 0; i < throwIndex ; i++) {
        if(match.currentThrow[i] === '') {
          console.log('erreur need previous dart score')
          return
        }
      }
    }

    updateCurrentThrowManual(e.target.value, throwIndex)
  }

  const onSubmit = e => {
    e.preventDefault();

    onClickValidateThrow();
  }

  return (
    <div>
      <div>
        <h2>It's your Turn</h2>
        <h3>{match.players[match.currentPlayerTurn]}</h3>
        <p>{score}</p>
        <div>
          <p>Checkout</p>
          <ul>
            <li>T20 - T19 - D9</li>
            <li>T20 - T19 - D9</li>
          </ul>
        </div>
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <h2>Click on the dartboard <br />or<br /> enter your score manualy <span>?</span></h2>
          <div>
            <Input
              element="input"
              type="text"
              name="dart-1"
              htmlFor="dart-1"
              label="Dart 1"
              value={match.currentThrow[0]}
              placeholder="Enter score"
              onChange={onChange}
            />
           </div>
           <div>
           <Input
              element="input"
              type="text"
              name="dart-2"
              htmlFor="dart-2"
              label="Dart 2"
              value={match.currentThrow[1]}
              placeholder="Enter score"
              onChange={onChange}
            />
           </div>
           <div>
           <Input
              element="input"
              type="text"
              name="dart-3"
              htmlFor="dart-3"
              label="Dart 3"
              value={match.currentThrow[2]}
              placeholder="Enter score"
              onChange={onChange}
            />
           </div>
           {loading.validateThrow ? (
            <Spinner spinnerContClassName={"spinner-cont-large"} spinnerImgClassName={"spinnerSmall"}/>
           ) : (
            <button type="submit">Validate</button>
           )}
        </form>
      </div>
      <div>
        <h2>Player Stats</h2>
      </div>
    </div>
  )
}

export default CurrentPlayer
