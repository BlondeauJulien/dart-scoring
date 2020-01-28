import React, { useContext } from 'react';

import './DartBoard.css';
import dartboard from './dartboard.png';
import dartArea from '../../utils/dartArea';
import GameContext from '../../context/gameContext/gameContext';

const DartBoard = () => {
  const gameContext = useContext(GameContext);

  const onClick = e => {
    gameContext.updateCurrentThrowDartBoard(e.target.id);
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

      </map>
    </div>
  )
}

export default DartBoard
