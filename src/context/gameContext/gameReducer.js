import { 
  INIT_NEW_GAME,
  SET_LOADING,
  UPDATE_CURRENT_THROW,
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
      }
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
