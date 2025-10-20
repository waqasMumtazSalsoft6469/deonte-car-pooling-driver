import actionTypes from '../Actions/actionTypes';
import initialStates from './initialStates';
const initialState = initialStates.SessionReducer;

export default SessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGOUT: {
      return {
        ...initialStates.SessionReducer,
      };
    }
    case actionTypes.login: {
      return {
        ...state,
        token: action.session.token,
      };
    }
    case actionTypes.riderDetails: {
      return {
        ...state,
        riderinfo: action.details.riderDetail,
      };
    }
    default: {
      return state;
    }
  }
};
