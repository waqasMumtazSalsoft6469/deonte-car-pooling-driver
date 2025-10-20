import actionTypes from '../Actions/actionTypes';
import initialStates from './initialStates';
const initialState = initialStates.UserReducer;

const UserReducer = (state = initialState, action) => {
  console.log('action-coordinates', action?.coordinates);
  console.log('statet', state);
  switch (action.type) {
    case actionTypes.LOGOUT: {
      return {
        ...initialStates.UserReducer,
      };
    }
    case actionTypes.login: {
      return {
        ...state,
        userData: action.session?.user,
      };
    }
    case actionTypes.getProfile: {
      return {
        ...state,
        profile: {...state.profile, ...action.profile},
        loading: false,
      };
    }
    // case actionTypes.setLocation: {
    //   return {
    //     ...state,
    //     profile: action.profile,
    //   };
    // }
    // case actionTypes.setLocation: {
    //   return {
    //     ...state,
    //     profile: {
    //       ...state.profile,
    //       location: {
    //         ...state.profile.location,
    //         coordinates: action.coordinates,
    //       },
    //     },
    //   };
    // }
    case actionTypes.setLocation: {
      return {
        ...state,
        userData: {
          ...state.userData,
          location: {
            ...state.userData.location,
            coordinates: action.coordinates,
          },
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default UserReducer;
