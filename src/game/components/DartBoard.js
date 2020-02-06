import React, { useContext } from 'react';

import './DartBoard.css';
import dartboard from './dartboard.png';
import dartArea from '../../utils/dartArea';
import GameContext from '../../context/gameContext/gameContext';

const DartBoard = () => {
  const { match, updateCurrentThrowDartBoard, throwError, getCurrentThrowScore} = useContext(GameContext);

  const onClick = e => {
    let totalScore = getCurrentThrowScore();

    let currentPlayer = match.players[match.currentPlayerTurn];
    let currentPlayerScore = match.matchPlayerInfo[currentPlayer].score ;

    let newCurrentScore = currentPlayerScore - totalScore;

    if(newCurrentScore <= 1) {
      throwError("You can't throw any more dart", "throw-validation");
      return
    }

    updateCurrentThrowDartBoard(e.target.id);
  }

  return (
    <div>
      <img src={dartboard} alt="dart board" useMap="#dartboard"/>
      <map name="dartboard">

        <area id="D25" shape="circle" coords="400,400,14"
        onClick={onClick}
        alt="D20" />
        <area id="S25" shape="circle" coords="400,400,28"
        onClick={onClick}
        alt="S25" />
        {Object.entries(dartArea.doubleAndTriple).map(([key, value]) => (
          <area key={key} id={key} shape="poly" coords={value.join()}
          onClick={onClick}
          alt={key} />
        ))}
        {Object.entries(dartArea.single).map(([key, value]) => (
          <area key={key} id={key} shape="poly" coords={value.join()}
          onClick={onClick}
          alt={key} />
        ))}

        <area id="0" shape="circle" coords="400,400,400"
        onClick={onClick}
        alt="0" />

      </map>
    </div>
  )
}

export default DartBoard
