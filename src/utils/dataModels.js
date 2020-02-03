const matchModel = {
  gameIsRunning: false,
  gameType: undefined,
  isSoloGame: undefined,
  hasWinner:false,
  sets: undefined,
  legs: undefined,
  players: [],
  startingPlayerLeg: 0,
  startingPlayerSet: 0,
  currentPlayerTurn: 0,
  currentThrow: ['','',''], 
  currentLegThrows: [],
  matchPlayerInfo: {}
}

const playerMatchModel = {
  hasWonMatch: false,
  score: null,
  setWon:0,
  currentSetLegWon: 0,
  totalThrow: {
    darts: 0,
    rounds: 0
  },
  totalThrowEndGame: {
    darts: 0,
    rounds: 0
  },
  totalThrowBegMidGame: {
    darts: 0,
    rounds: 0
  },
  bestThreeDarts: 0,
  hit: {
    // empty object that will fill up as the game goes, the number displayed is the number of time it hit a section (ex: T20: 5)
  },
  scoreRanges: {}, // model "0-19": 5, 20-39: 3...
  averages: {
    overall: 0,
    begMidGame: 0,
    endGame: 0, // 140 and below
  },
  doubleOut: {}, //model     D1: {miss: 5, hit: 1}
  checkoutScores: {}, // save the starting score at beg of a throw that ended up in a finish
}

const playerModel = {
  name: '',
  nbrOfMatches: 0,
  matchesWon: 0,
  soloGames: 0,
  totalThrow: {
    darts: 0,
    rounds: 0
  },
  totalThrowEndGame: {
    darts: 0,
    rounds: 0
  },
  totalThrowBegMidGame: {
    darts: 0,
    rounds: 0
  },
  bestThreeDarts: 0,
  hit: {},
  scoreRanges: {}, 
  averages: {
    overall: 0,
    begMidGame: 0,
    endGame: 0, 
  },
  doubleOut: {},
  checkoutScores: {},
  matches: []
}

const dataModels = {
  matchModel,
  playerMatchModel,
  playerModel
}

export default dataModels;