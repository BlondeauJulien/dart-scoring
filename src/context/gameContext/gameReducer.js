import { 
  INIT_NEW_GAME,
  SET_LOADING,
  UPDATE_CURRENT_THROW,
  PUSH_TO_CURRENT_LEG_THROWS,
  INCREMENT_TOTAL_THROW,
  UPDATE_BEST_THREE_DARTS,
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
    case INCREMENT_TOTAL_THROW:
      return {
        ...state,
        match: {
          ...state.match,
          matchPlayerInfo: {
            ...state.match.matchPlayerInfo,
            [action.payload.playerName]: {
              ...state.match.matchPlayerInfo[action.payload.playerName],
              totalThrow: state.match.matchPlayerInfo[action.payload.playerName].totalThrow + action.payload.dartNumber,
              [action.payload.gamePeriod]: state.match.matchPlayerInfo[action.payload.playerName][action.payload.gamePeriod] + action.payload.dartNumber,
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
