import {get, post} from '../../Api';
import {endpoints} from '../../Api/configs';
import actionTypes from './actionTypes';

export const addPlayListAction = data => {
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    console.log('DATA', data);
    try {
      const response = await post(endpoints.playlist.addSong, data, true);
      console.log('RESPONSE addPlayListAction', response);
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      console.log('error from addPlayListAction', e);
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};

export const getSongs = () => {
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    try {
      const response = await get(endpoints.playlist.getSongs);
      console.log('response from action getSongs', response);
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      console.log('ERROR', e);
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};
