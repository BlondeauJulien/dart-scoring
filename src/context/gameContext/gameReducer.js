import { 
  INIT_NEW_GAME,
  SET_LOADING,
  UPDATE_CURRENT_THROW,
  PUSH_TO_CURRENT_LEG_THROWS,
  RESET_CURRENT_THROW,
  RESET_CURRENT_LEG_THROWS,
  UPDATE_PLAYER_SCORE,
  RESET_SCORES,
  UPDATE_AVERAGES,
  INCREMENT_TOTAL_THROW,
  UPDATE_BEST_THREE_DARTS,
  UPDATE_SECTION_HIT,
  UPDATE_SCORE_RANGES,
  UPDATE_DOUBLE_OUT,
  INCREMENT_LEG_WON,
  INCREMENT_SET_WON,
  CHANGE_CURRENT_PLAYER,
  THROW_ERROR,
  RESET_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case INIT_NEW_GAME:
      return {
        ...state,
        match: {...action.payload},
      };
    case UPDATE_CURRENT_THROW:
      return {
        ...state,
        match: {...state.match, currentThrow: action.payload}
      };
    case PUSH_TO_CURRENT_LEG_THROWS:
      return {
        ...state,
        match: {
          ...state.match,
          currentLegThrows: [...state.match.currentLegThrows, action.payload]
        }
      };
    case RESET_CURRENT_THROW:
      return {
        ...state,
        match: {
          ...state.match,
          currentThrow: ['','','']
        }
      };
    case RESET_CURRENT_LEG_THROWS:
      return {
        ...state,
        match: {
          ...state.match,
          currentLegThrows: []
        }
      };
    case UPDATE_PLAYER_SCORE: 
      return {
        ...state,
        match: {
          ...state.match,
          matchPlayerInfo: {
            ...state.match.matchPlayerInfo,
            [action.payload.playerName] : {
              ...state.match.matchPlayerInfo[action.payload.playerName],
              score: action.payload.score
            }
          }
        }
      };
    case RESET_SCORES:
      return {
        ...state,
        match: {
          ...state.match,
          matchPlayerInfo: {
            ...state.match.matchPlayerInfo,
            [action.payload] : {
              ...state.match.matchPlayerInfo[action.payload],
              score: state.match.gameType
            }
          }
        }
      };
    case UPDATE_AVERAGES:
      return {
        ...state,
        match: {
          ...state.match,
          matchPlayerInfo: {
            ...state.match.matchPlayerInfo,
            [action.payload.playerName]: {
              ...state.match.matchPlayerInfo[action.payload.playerName],
              averages: {
                ...state.match.matchPlayerInfo[action.payload.playerName].averages,
                overall: action.payload.newOverallAverage,
                [action.payload.gamePeriod] : action.payload.newGamePeriodAvg
              }
            }
          }
        }
      };
    case INCREMENT_TOTAL_THROW:
      return {
        ...state,
        match: {
          ...state.match,
          matchPlayerInfo: {
            ...state.match.matchPlayerInfo,
            [action.payload.playerName]: {
              ...state.match.matchPlayerInfo[action.payload.playerName],
              totalThrow: {
                ...state.match.matchPlayerInfo[action.payload.playerName].totalThrow,
                darts: state.match.matchPlayerInfo[action.payload.playerName].totalThrow.darts + action.payload.dartNumber,
                rounds: state.match.matchPlayerInfo[action.payload.playerName].totalThrow.rounds + 1
              },
              [action.payload.gamePeriod]: {
                ...state.match.matchPlayerInfo[action.payload.playerName][action.payload.gamePeriod],
                darts: state.match.matchPlayerInfo[action.payload.playerName][action.payload.gamePeriod].darts + action.payload.dartNumber,
                rounds: state.match.matchPlayerInfo[action.payload.playerName][action.payload.gamePeriod].rounds +1
              }
            }
          }
        }
      };
    case UPDATE_BEST_THREE_DARTS:
      return {
        ...state,
        match: {
          ...state.match,
          matchPlayerInfo: {
            ...state.match.matchPlayerInfo,
            [action.payload.playerName]: {
              ...state.match.matchPlayerInfo[action.payload.playerName],
              bestThreeDarts: action.payload.score,
            }
          }
        }
      };
    case UPDATE_SECTION_HIT:
      return {
        ...state,
        match: {
          ...state.match,
          matchPlayerInfo: {
            ...state.match.matchPlayerInfo,
            [action.payload.playerName]: {
              ...state.match.matchPlayerInfo[action.payload.playerName],
              hit: action.payload.hit,
            }
          }
        }

      };
    case UPDATE_SCORE_RANGES:
      return {
        ...state,
        match: {
          ...state.match,
          matchPlayerInfo: {
            ...state.match.matchPlayerInfo,
            [action.payload.playerName]: {
              ...state.match.matchPlayerInfo[action.payload.playerName],
              scoreRanges: action.payload.scoreRanges,
            }
          }
        }
      };
    case UPDATE_DOUBLE_OUT:
      return {
        ...state,
        match: {
          ...state.match,
          matchPlayerInfo: {
            ...state.match.matchPlayerInfo,
            [action.payload.playerName]: {
              ...state.match.matchPlayerInfo[action.payload.playerName],
              doubleOut: action.payload.doubleOut,
            }
          }
        }
      };
    case INCREMENT_LEG_WON: 
      return {
        ...state,
        match: {
          ...state.match,
          matchPlayerInfo: {
            ...state.match.matchPlayerInfo,
            [action.payload.playerName]: {
              ...state.match.matchPlayerInfo[action.payload.playerName],
              currentSetLegWon: state.match.matchPlayerInfo[action.payload.playerName].currentSetLegWon + 1,
            }
          }
        }
      };
    case INCREMENT_SET_WON: 
      return {
        ...state,
        match: {
          ...state.match,
          matchPlayerInfo: {
            ...state.match.matchPlayerInfo,
            [action.payload.playerName]: {
              ...state.match.matchPlayerInfo[action.payload.playerName],
              setWon: state.match.matchPlayerInfo[action.payload.playerName].setWon + 1,
              currentSetLegWon: 0
            }
          }
        }
      };
    case CHANGE_CURRENT_PLAYER: 
      return {
        ...state,
        match: {
          ...state.match,
          currentPlayerTurn: action.payload
        }
      };
    case SET_LOADING:
      return {
        ...state,
        loading: {...state.loading, [action.payload.eventName]: action.payload.setTo}
      };
    case THROW_ERROR:
      return {
        ...state,
        error: {
          message: action.payload.message,
          errorFor: action.payload.errorFor
        }
      };
      case RESET_ERROR: 
        return {
          ...state,
          error: null
        };
    default:
      return {
        ...state
      }
  }
}
