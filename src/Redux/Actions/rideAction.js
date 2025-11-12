import {get, post} from '../../Api';
import {endpoints} from '../../Api/configs';
import {showToast} from '../../Api/HelperFunction';
import actionTypes from './actionTypes';

export const acceptRideAction = id => {
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    console.log('Accept Ride Action id ====>', id);
    console.log('Accept Ride Action id type ====>', typeof id);
    console.log('Accept Ride Action id is truthy ====>', !!id);
    
    // Validate id before making API call
    if (!id) {
      const error = 'Ride ID is missing. Cannot accept ride without a valid ID.';
      console.error('Accept Ride Action Error:', error);
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(error);
    }
    
    //   console.log('DATA from ContactUs', data);
    try {
      const response = await get(`${endpoints.ride.AcceptRide}/${id}`);
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      console.error('Accept Ride Action API Error:', e);
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};

export const rejectRideAction = id => {
  const body = {
    rejeciontReason: 'asd qweweq',
    rideid: id,
  };
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    //   console.log('DATA from ContactUs', data);
    try {
      const response = await post(`${endpoints.ride.RejectRide}/${id}`, body);
      dispatch({
        type: actionTypes.rideId,
        currentRideId: null,
      });
      dispatch({type: actionTypes.loaderOff});

      return Promise.resolve(response);
    } catch (e) {
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};

export const rideStartedAction = id => {
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    //   console.log('DATA from ContactUs', data);
    try {
      const response = await get(`${endpoints.ride.StartRide}/${id}`);
      console.log('RESPONSE From acceptRideAction', response);
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      console.log('error from Register', e);
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};
export const rideEndRideAction = (id, data) => {
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    //   console.log('DATA from ContactUs', data);
    try {
      const response = await post(`${endpoints.ride.EndRide}/${id}`, data);

      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      console.log('error from Register', e);
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};

export const ridePauseAction = id => {
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    //   console.log('DATA from ContactUs', data);
    try {
      const response = await post(`${endpoints.ride.PauseRide}/${id}`);
      console.log('RESPONSE From acceptRideAction', response);
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      console.log('error from Register', e);
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};

export const rideCancelAction = (id, data) => {
  console.log('Data =========>', data);
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    try {
      const response = await post(`${endpoints.ride.cancelRide}/${id}`, data);
      console.log('RESPONSE From cancelRide', response);
      dispatch({
        type: actionTypes.rideId,
        currentRideId: null,
      });
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      console.log('error from cancelRide ', e);
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};

export const markRidePaidAction = id => {
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    //   console.log('DATA from ContactUs', data);
    try {
      const response = await get(`${endpoints.ride.MarkRidePaid}/${id}`);
      console.log('RESPONSE From markRidePaidAction', response);
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      console.log('error from markRidePaidAction', e);
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};

export const rideDeatilsAction = id => {
  console.log('Ride Details action id =====>', id);
  return async dispatch => {
    // dispatch({type: actionTypes.loaderOn});
    //   console.log('DATA from ContactUs', data);
    try {
      const response = await get(`${endpoints.ride.RideDetails}/${id}`);
      console.log('Response from Ride Details ====>', response?.ride?._id);
      // dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      console.log('Error from Ride Details ===>', e);
      // dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};
export const pendingRideAction = () => {
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    //   console.log('DATA from ContactUs', data);
    try {
      const response = await get(`${endpoints.ride.PendingRides}`);
      console.log('respon---pending rides-se', response);
      // console.log('Response from Ride Details ====>', response?.ride?._id);
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      console.log('Error from pending ride Details ===>', e);
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};
export const rideResumeAction = id => {
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    //   console.log('DATA from ContactUs', data);
    try {
      const response = await post(`${endpoints.ride.ResumeRide}/${id}`);
      console.log('RESPONSE From acceptRideAction', response);
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      console.log('error from Register', e);
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};

export const submitAmountAction = (data, id) => {
  console.log('ID from Action ==>', id);
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    console.log('DATA', data);
    try {
      const response = await post(`${endpoints.ride.SubmitAmount}/${id}`, data);
      console.log('RESPONSE submitAmountAction', response);
      dispatch({type: actionTypes.loaderOff});
      dispatch({
        type: actionTypes.rideId,
        currentRideId: null,
      });
      return Promise.resolve(response);
    } catch (e) {
      console.log('error from submitAmountAction', e);
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};

export const rideAddtoWallet = id => {
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    //   console.log('DATA from ContactUs', data);
    try {
      const response = await get(`${endpoints.ride.addToWallet}/${id}`);
      console.log('RESPONSE From rideAddtoWallet', response);
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      console.log('error from rideAddtoWallet', e);
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};
