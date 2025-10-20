import {get, post} from '../../Api';
import {endpoints} from '../../Api/configs';
import {showToast} from '../../Api/HelperFunction';
import actionTypes from './actionTypes';
export const getEarning = loader => {
  return async dispatch => {
    try {
      if (!loader) {
        dispatch({type: actionTypes.loaderOn});
      }
      const response = await get(endpoints.rider.getEarning);
      console.log('response from get Earning ==>', response);
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (err) {
      console.warn('err ==>', err);
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(response);
    }
  };
};

export const getEarningDetails = id => {
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    //   console.log('DATA from ContactUs', data);
    try {
      const response = await get(`${endpoints.rider.getEarningDetails}/${id}`);
      console.log('RESPONSE From getEarningDetails', response);
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      console.log('error from getEarningDetails', e);
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};

export const getAllRidesData = loader => {
  return async dispatch => {
    try {
      if (!loader) {
        dispatch({type: actionTypes.loaderOn});
      }
      const response = await get(endpoints.rider.getDriverRides);
      console.log('response from get Ride ==>', response);
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (err) {
      console.warn('err ==>', err);
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(response);
    }
  };
};

export const getRideDetail = id => {
  console.log('id from getRideDetails ====>', id);
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    try {
      const response = await get(`${endpoints.rider.rideDetailInfo}/${id}`);
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};

export const getNotification = () => {
  return async dispatch => {
    try {
      dispatch({type: actionTypes.loaderOn});
      const response = await get(endpoints.rider.userNotifications);
      console.log('response from get Earning ==>', response);
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (err) {
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(err);
    }
  };
};

export const changeDriverStatus = data => {
  console.log('Response data from ChangeDriverStatus ===>', data);
  return async dispatch => {
    try {
      dispatch({type: actionTypes.loaderOn});

      const response = await post(endpoints.rider.changeStatus, data);
      console.log('Response from ChangeDriver Status ====>', response);
      dispatch({type: actionTypes.loaderOff});

      return Promise.resolve(response);
    } catch (err) {
      dispatch({type: actionTypes.loaderOff});

      return Promise.reject(err);
    }
  };
};
