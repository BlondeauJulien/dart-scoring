import React, { useContext, useEffect, useState } from 'react';

import './DartBoard.css';
import dartboard from './dartboard.png';
import dartArea from '../../utils/dartArea';
import GameContext from '../../context/gameContext/gameContext';

const DartBoard = () => {
  const { match, updateCurrentThrowDartBoard, throwError, getCurrentThrowScore} = useContext(GameContext);
  const [innerSize, setInnerSize] = useState({height: window.innerHeight, width: window.innerWidth});
  const [bullCoords, setBullCoords] = useState({D25: [...dartArea.D25], S25: [...dartArea.S25]});
  const [zeroCoords, setZeroCoords] = useState([...dartArea.zero]);
  const [doubleAndTripleCoords, setDoubleAndTripleCoords] = useState({...dartArea.doubleAndTriple});
  const [singleCoords, setSingleCoords] = useState({...dartArea.single});

  useEffect(() => {
    const handleResize = () => setInnerSize({height: window.innerHeight, width: window.innerWidth});
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  useEffect(() => {
    let dartBoardImg = document.querySelector('#dart-board-img');
    let dartBoardCont = document.querySelector('#dart-board-cont');

    if(innerSize.height >= 919 && dartBoardCont.clientWidth >= 850) {
      setBullCoords({D25: [...dartArea.D25], S25: [...dartArea.S25]});
      setZeroCoords([...dartArea.zero]);
      setDoubleAndTripleCoords({...dartArea.doubleAndTriple});
      setSingleCoords({...dartArea.single});
    } else {
      let newSize = window.innerHeight - 119;

      if(dartBoardCont.clientWidth < newSize) {
        newSize = dartBoardCont.clientWidth - 50;
      }
      dartBoardImg.style.height = newSize.toString() + 'px';
      dartBoardImg.style.width = newSize.toString() + 'px';

      let ratio = newSize / 800;

      let newZeroCoords = [...dartArea.zero].map(coord => coord * ratio);
      let newBullCoords = {D25: [...dartArea.D25].map(coord => coord * ratio), S25: [...dartArea.S25].map(coord => coord * ratio)}
      let newDoubleTripleCoords = {...dartArea.doubleAndTriple};
      let newSingleCoords = {...dartArea.single};
      let doubleTripleObjKeys = Object.keys(newDoubleTripleCoords);
      let singleObjKeys = Object.keys(newSingleCoords);

      doubleTripleObjKeys.forEach(key => {
        let newCoords = newDoubleTripleCoords[key].map(coord => coord * ratio);
        newDoubleTripleCoords[key] = newCoords;
      });

      singleObjKeys.forEach(key => {
        let newCoords = newSingleCoords[key].map(coord => coord * ratio);
        newSingleCoords[key] = newCoords;
      });

      setZeroCoords(newZeroCoords);
      setBullCoords(newBullCoords);
      setDoubleAndTripleCoords(newDoubleTripleCoords);
      setSingleCoords(newSingleCoords);
    }
  }, [innerSize]);

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
    <div id="dart-board-cont">
      <img id="dart-board-img" src={dartboard} alt="dart board" useMap="#dartboard"/>
      <map name="dartboard">

        <area id="D25" shape="circle" coords={bullCoords.D25}
        onClick={onClick}
        alt="D25" />
        <area id="S25" shape="circle" coords={bullCoords.S25}
        onClick={onClick}
        alt="S25" />
        {Object.entries(doubleAndTripleCoords).map(([key, value]) => (
          <area key={key} id={key} shape="poly" coords={value.join()}
          onClick={onClick}
          alt={key} />
        ))}
        {Object.entries(singleCoords).map(([key, value]) => (
          <area key={key} id={key} shape="poly" coords={value.join()}
          onClick={onClick}
          alt={key} />
        ))}

        <area id="0" shape="circle" coords={zeroCoords}
        onClick={onClick}
        alt="0" />

      </map>
    </div>
  )
}

export default DartBoard
