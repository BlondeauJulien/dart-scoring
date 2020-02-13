import localStorageMethod from './localStorageMethods';

const { getSinglePlayerData } = localStorageMethod;

const savePlayersData = (matchData, playerWinner) => {
  let date = new Date();

  matchData.players.forEach(player => {
    let playerData = {...matchData.matchPlayerInfo[player]};
    let playerDataLS = getSinglePlayerData(player);

    playerData.date = date;
    playerData.players = matchData.players;
    playerData.playerWinner = playerWinner;
    playerData.gameType = matchData.gameType;
    playerData.matchLegsInfos = matchData.allLegsThrows;

    playerDataLS.matches.push(playerData);
    playerDataLS.nbrOfMatches++;
    player === playerWinner && matchData.players.length > 1 && playerDataLS.matchesWon++;
    matchData.players.length === 1 && playerDataLS.soloGames++;

    playerDataLS.averages.overall = getNewAverage(
      playerDataLS.averages.overall,
      playerDataLS.totalThrow.rounds,
      playerData.averages.overall,
      playerData.totalThrow.rounds
    );
    playerDataLS.averages.begMidGame = getNewAverage(
      playerDataLS.averages.begMidGame,
      playerDataLS.totalThrowBegMidGame.rounds,
      playerData.averages.begMidGame,
      playerData.totalThrowBegMidGame.rounds
    );
    playerDataLS.averages.endGame = getNewAverage(
      playerDataLS.averages.endGame,
      playerDataLS.totalThrowEndGame.rounds,
      playerData.averages.endGame,
      playerData.totalThrowEndGame.rounds
    );

    playerDataLS.totalThrow.darts += playerData.totalThrow.darts;
    playerDataLS.totalThrow.rounds += playerData.totalThrow.rounds;

    playerDataLS.totalThrowEndGame.darts += playerData.totalThrowEndGame.darts;
    playerDataLS.totalThrowEndGame.rounds += playerData.totalThrowEndGame.rounds;

    playerDataLS.totalThrowBegMidGame.darts += playerData.totalThrowBegMidGame.darts;
    playerDataLS.totalThrowBegMidGame.rounds += playerData.totalThrowBegMidGame.rounds;

    playerDataLS.bestThreeDarts = Math.max(playerDataLS.bestThreeDarts, playerData.bestThreeDarts);

    playerDataLS.doubleOut = updateDataObject( playerData , playerDataLS, 'doubleOut' );
    playerDataLS.hit = updateDataObject( playerData , playerDataLS, 'hit' );
    playerDataLS.scoreRanges = updateDataObject( playerData , playerDataLS, 'scoreRanges' );
    playerDataLS.checkoutScores = updateDataObject( playerData , playerDataLS, 'checkoutScores' );

    localStorageMethod.updatePlayer(player, playerDataLS)
  })
}

const updateDataObject = (objToTransfer, objToUpdate, dataName) => {
  let toTransfer = {...objToTransfer};
  let toUpdate = {...objToUpdate};
  let keys = Object.keys(toTransfer[dataName]);

  keys.forEach(key => {
    if(toUpdate[dataName].hasOwnProperty(key)) {
      if(dataName === 'doubleOut') {
        toUpdate[dataName][key].hit += toTransfer[dataName][key].hit;
        toUpdate[dataName][key].miss += toTransfer[dataName][key].miss;
        toUpdate[dataName][key].total += toTransfer[dataName][key].total;
      } else {
        toUpdate[dataName][key] += toTransfer[dataName][key];
      }
    } else {
      toUpdate[dataName][key] = toTransfer[dataName][key];
    }
  })

  return toUpdate[dataName];
}

const getNewAverage = (currentAvg, currentTotalThrow, matchAvg, totalMatchThrow) => {
  if(totalMatchThrow === 0) return currentAvg;

  return ((currentAvg * currentTotalThrow) + (matchAvg * totalMatchThrow)) / (currentTotalThrow + totalMatchThrow)
}

export default savePlayersData;