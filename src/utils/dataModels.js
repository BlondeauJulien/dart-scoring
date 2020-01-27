const matchModel = {
  gameIsRunning: false,
  gameType: undefined,
  isSoloGame: undefined,
  hasWinner:false,
  sets: undefined,
  legs: undefined,
  players: [],
  startingPlayer: 0,
  currentPlayerTurn: 0,
  currentThrow: [], // {score: '', couldCheckout:}
  currentLegThrows: [],
  matchPlayerInfo: {}
}

const playerMatchModel = {
  hasWonMatch: false,
  score: null,
  setWon:0,
  currentSetLegWon: 0,
  totalThrow: 0,
  totalThrowEndGame: 0,
  totalThrowBegMidGame: 0,
  bestThreeDarts: 0,
  hit: {
    // empty object that will fill up as the game goes, the number displayed is the number of time it hit a section (ex: T20: 5)
  },
  scoresRanges: {}, // model "0-19": 5, 20-39: 3...
  averages: {
    overall: 0,
    begMidGame: 0,
    endGame: 0, // 140 and below
  },
  doubleOut: {}, //model     D1: {miss: 5, hit: 1}
}

const playerModel = {
  nbrOfMatches: 0,
  matchesWon: 0,
  soloGames: 0,
  totalThrow: 0,
  totalThrowEndGame: 0,
  totalThrowBegMidGame: 0,
  bestThreeDarts: 0,
  hit: {},
  scoresRanges: {}, 
  averages: {
    overall: 0,
    begMidGame: 0,
    endGame: 0, 
  },
  doubleOut: {}
}

const dataModels = {
  matchModel,
  playerMatchModel,
  playerModel
}

export default dataModels;