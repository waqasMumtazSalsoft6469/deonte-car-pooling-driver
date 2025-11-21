import {get, post} from '../../Api';
import {endpoints} from '../../Api/configs';
import {showToast} from '../../Api/HelperFunction';
import actionTypes from './actionTypes';

export const acceptRideAction = id => {
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    console.log('[API] 🚀 ========== ACCEPT RIDE ACTION ==========');
    console.log('[API] 🚀 Ride ID:', id);
    console.log('[API] 🚀 Ride ID type:', typeof id);
    console.log('[API] 🚀 Ride ID is truthy:', !!id);
    console.log('[API] 🚀 Timestamp:', new Date().toISOString());
    
    // Validate id before making API call
    if (!id) {
      const error = 'Ride ID is missing. Cannot accept ride without a valid ID.';
      console.error('[API] ❌ Accept Ride Action Error:', error);
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(error);
    }
    
    try {
      console.log('[API] 📡 Calling API endpoint:', `${endpoints.ride.AcceptRide}/${id}`);
      const response = await get(`${endpoints.ride.AcceptRide}/${id}`);
      
      console.log('[API] ✅ ========== ACCEPT RIDE API RESPONSE ==========');
      console.log('[API] ✅ Full Response:', JSON.stringify(response, null, 2));
      console.log('[API] ✅ Response type:', typeof response);
      console.log('[API] ✅ Response keys:', response ? Object.keys(response) : 'null');
      console.log('[API] ✅ response.message:', response?.message);
      console.log('[API] ✅ response.ride:', response?.ride);
      console.log('[API] ✅ response.ride?._id:', response?.ride?._id);
      console.log('[API] ✅ response.ride?.rideStatus:', response?.ride?.rideStatus);
      console.log('[API] ✅ response.ride?.status:', response?.ride?.status);
      console.log('[API] ✅ response.requiresPayment:', response?.requiresPayment);
      console.log('[API] ===========================================');
      
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      console.error('[API] ❌ ========== ACCEPT RIDE API ERROR ==========');
      console.error('[API] ❌ Error:', e);
      console.error('[API] ❌ Error message:', e?.message);
      console.error('[API] ❌ Error details:', JSON.stringify(e, null, 2));
      console.error('[API] ===========================================');
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
  console.log('[API] 🚀 ========== RIDE DETAILS ACTION ==========');
  console.log('[API] 🚀 Ride ID:', id);
  console.log('[API] 🚀 Ride ID type:', typeof id);
  console.log('[API] 🚀 Timestamp:', new Date().toISOString());
  
  return async dispatch => {
    // dispatch({type: actionTypes.loaderOn});
    try {
      console.log('[API] 📡 Calling API endpoint:', `${endpoints.ride.RideDetails}/${id}`);
      const response = await get(`${endpoints.ride.RideDetails}/${id}`);
      
      console.log('[API] ✅ ========== RIDE DETAILS API RESPONSE ==========');
      console.log('[API] ✅ Full Response:', JSON.stringify(response, null, 2));
      console.log('[API] ✅ Response type:', typeof response);
      console.log('[API] ✅ Response keys:', response ? Object.keys(response) : 'null');
      console.log('[API] ✅ response.ride:', response?.ride);
      console.log('[API] ✅ response.ride?._id:', response?.ride?._id);
      console.log('[API] ✅ response.ride?.rideStatus:', response?.ride?.rideStatus);
      console.log('[API] ✅ response.ride?.status:', response?.ride?.status);
      console.log('[API] ✅ response.ride?.paymentStatus:', response?.ride?.paymentStatus);
      console.log('[API] ✅ response.ride?.paymentMethod:', response?.ride?.paymentMethod);
      console.log('[API] ✅ response.ride?.user:', response?.ride?.user ? 'exists' : 'null');
      console.log('[API] ===========================================');
      
      // dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      console.error('[API] ❌ ========== RIDE DETAILS API ERROR ==========');
      console.error('[API] ❌ Error:', e);
      console.error('[API] ❌ Error message:', e?.message);
      console.error('[API] ❌ Error details:', JSON.stringify(e, null, 2));
      console.error('[API] ===========================================');
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
