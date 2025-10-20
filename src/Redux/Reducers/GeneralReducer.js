import actionTypes from '../Actions/actionTypes';
import initialStates from './initialStates';
const initialState = initialStates.GeneralReducer;
const off_payload = {
  loading: false,
};
const on_payload = {
  loading: true,
};
export default GeneralReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.loaderOn: {
      return {
        ...state,
        ...on_payload,
      };
    }
    case actionTypes.loaderOff: {
      return {
        ...state,
        ...off_payload,
      };
    }
    // case actionTypes.getProfile: {
    //   return {
    //     ...state,
    //     ...off_payload,
    //   };
    // }
    default: {
      return state;
    }
  }
};
