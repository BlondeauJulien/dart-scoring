const returnToPreviousPlayer = matchData => {
  let prevThrowInfo = matchData.currentLegThrows.pop();
  let prevScore = getCurrentThrowScore(prevThrowInfo.darts);

  changeCurrentPlayer(matchData);
  matchData.currentThrow = prevThrowInfo.darts;
  matchData.matchPlayerInfo[prevThrowInfo.playerName].score += prevScore;
  updateAverages(matchData.matchPlayerInfo[prevThrowInfo.playerName], prevThrowInfo.darts);
  updateTotalThrow(
    matchData.matchPlayerInfo[prevThrowInfo.playerName], 
    prevThrowInfo.darts.length, 
    matchData.matchPlayerInfo[prevThrowInfo.playerName].score
  );
  
  updateHit(matchData.matchPlayerInfo[prevThrowInfo.playerName], prevThrowInfo.darts);
  updateScoreRange(matchData.matchPlayerInfo[prevThrowInfo.playerName], prevScore);
  updateBestThreeDarts(prevThrowInfo.playerName, matchData);

  if(matchData.matchPlayerInfo[prevThrowInfo.playerName].score - prevScore <= 50) {
    updateDoubleOut(matchData.matchPlayerInfo[prevThrowInfo.playerName], prevThrowInfo.darts);
  }

  return matchData;
}

const changeCurrentPlayer = matchData => {
  if(matchData.currentPlayerTurn === 0) {
    matchData.currentPlayerTurn = matchData.players.length -1;
  } else {
    matchData.currentPlayerTurn--;
  }
}

const getCurrentThrowScore = darts => {
  let totalScore = darts.reduce((total, dart) => {

    if(Number(dart) === 0 || dart === '') return total;

    let score = Number(dart.slice(1));

    if(/t/i.test(dart[0])) score *= 3;
    if(/d/i.test(dart[0])) score *= 2;
    return total +=score;
  }, 0 );

  return  totalScore;
}

const updateTotalThrow = (playerData, dartsNbr, score) => {
  let gamePeriod = score > 140 ? 'begMidGame' : 'endGame';

  playerData.totalThrow.rounds--;
  playerData.totalThrow.darts -= dartsNbr;

  if(gamePeriod === 'begMidGame') {
    playerData.totalThrowBegMidGame.rounds--;
    playerData.totalThrowBegMidGame.darts -= dartsNbr;
  } 
  if(gamePeriod === 'endGame') {
    playerData.totalThrowEndGame.rounds--;
    playerData.totalThrowEndGame.darts -= dartsNbr;
  }
}

const updateHit = (playerData, darts) => {
  darts.forEach(dart => {
    if(Number(dart) === 0)  dart = 'Missed';
    playerData.hit[dart] > 0 && playerData.hit[dart]--;
    playerData.hit[dart] === 0 && delete playerData.hit[dart];
  })
}

const updateScoreRange = (playerData, score) => {
  let ranges = Object.keys(playerData.scoreRanges);

  if(score === 0 || score === 180) {
    score === 0 && playerData.scoreRanges['ZERO']--;
    score === 180 && playerData.scoreRanges['180']--;
    playerData.scoreRanges['ZERO'] === 0 && delete playerData.scoreRanges['ZERO'];
    playerData.scoreRanges['180'] === 0 && delete playerData.scoreRanges['180'];
  } else {
    for(let i =0; i< ranges.length; i++) {
      let rangeArr = ranges[i].split('-');
      if(score >= rangeArr[0] && score <= rangeArr[1]) {
        playerData.scoreRanges[ranges[i]]--;
        playerData.scoreRanges[ranges[i]] === 0 && delete playerData.scoreRanges[ranges[i]];
      }
    }
  }
}

const updateBestThreeDarts = (playerName, matchData) => {
  matchData.matchPlayerInfo[playerName].bestThreeDarts = 0;
  matchData.currentLegThrows.forEach(round => {
    if(round.playerName === playerName) {
      let currentScore = matchData.matchPlayerInfo[playerName].bestThreeDarts;
      matchData.matchPlayerInfo[playerName].bestThreeDarts = Math.max(currentScore, getCurrentThrowScore(round.darts));
    }
  });

  matchData.allLegsThrows.forEach(leg => {
    leg.forEach(round => {
      if(round.playerName === playerName) {
        let currentScore = matchData.matchPlayerInfo[playerName].bestThreeDarts;
        matchData.matchPlayerInfo[playerName].bestThreeDarts = Math.max(currentScore, getCurrentThrowScore(round.darts));
      }
    });
  })
}

const updateDoubleOut = (playerData, darts) => {
  let prevScore = playerData.score - getCurrentThrowScore(darts);

  darts.reverse().forEach(dart => {
    let dartArr = [dart]
    prevScore =  prevScore + getCurrentThrowScore(dartArr);
    if((prevScore % 2 === 0 && prevScore <= 40) || prevScore === 50) {
      console.log('here')
      playerData.doubleOut[prevScore / 2].miss--;
      playerData.doubleOut[prevScore / 2].total--;
      playerData.doubleOut[prevScore / 2].total === 0 && delete playerData.doubleOut[prevScore / 2];
    }
  })
}

const updateAverages = (playerData, darts) => {
  if(playerData.totalThrow.rounds === 1) {
    playerData.averages = {
      overall: 0,
      begMidGame: 0,
      endGame: 0,
    }
  } else {
    let totalScore = playerData.averages.overall * playerData.totalThrow.rounds;
    let score = getCurrentThrowScore(darts);

    playerData.averages.overall = (totalScore - score) / (playerData.totalThrow.rounds - 1);

    if(playerData.score > 140 ) {
      let totalScoreBegMid = playerData.averages.begMidGame * playerData.totalThrowBegMidGame.rounds;
      playerData.averages.begMidGame = (totalScoreBegMid - score) / (playerData.totalThrowBegMidGame.rounds - 1);
    } else {
      if(playerData.totalThrowEndGame.rounds === 1) {
        playerData.averages.endGame = 0;
      } else {
        let totalScoreEnd = playerData.averages.endGame * playerData.totalThrowEndGame.rounds;
        playerData.averages.endGame = (totalScoreEnd - score) / (playerData.totalThrowEndGame.rounds - 1);
      }
    }
  }
}


export default returnToPreviousPlayer;