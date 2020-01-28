import { INIT_NEW_GAME, SET_LOADING } from '../types';

export default (state, action) => {
  switch (action.type) {
    case INIT_NEW_GAME:
      return {
        ...state,
        match: {...action.payload},
      };
    case SET_LOADING:
      return {
        ...state,
        loading: {...state.loading, [action.payload.eventName]: action.payload.setTo}
      };
    default:
      return {
        ...state
      }
  }
}
