import actionTypes from '../Actions/actionTypes';
import initialStates from './initialStates';
const initialState = initialStates.vehicleReducer;

const vehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.getVehicleDetail: {
      return {
        ...state,
        vehicle: action.vehicle,
      };
    }
    case actionTypes.rideId: {
      return {
        ...state,
        currentRide: action.currentRideId,
      };
    }
    case actionTypes.vehicletypes:{
      return{
        ...state,
        vehicleTypes: action.vehicleTypes
      }
    }
    default: {
      return state;
    }
  }
};

export default vehicleReducer;
