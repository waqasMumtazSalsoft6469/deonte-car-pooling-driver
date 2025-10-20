import {get, post} from '../../Api';
import {endpoints} from '../../Api/configs';
import actionTypes from './actionTypes';

export const profile = data => {
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    console.log('DATA from ContactUs', data);
    try {
      const response = await get(endpoints.contact.contactUs);
      console.log('RESPONSE From ContactUs', response);
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      console.log('error from Register', e);
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};

export const contactUs = data => {
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    console.log('DATA from ContactUs', data);
    try {
      const response = await post(endpoints.contact.contactUs, data);
      console.log('RESPONSE From ContactUs', response);
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      console.log('error from Register', e);
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};
