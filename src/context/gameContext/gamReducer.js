import { INIT_NEW_GAME } from '../types';

export default (state, action) => {
  switch (action.type) {
    case INIT_NEW_GAME:
      return {
        ...state,
        match: {...action.payload},
      };
    default:
      return {
        ...state
      }
  }
}
