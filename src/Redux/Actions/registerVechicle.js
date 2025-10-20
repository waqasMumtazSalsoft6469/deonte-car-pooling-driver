import {get, post} from '../../Api';
import {endpoints} from '../../Api/configs';
import actionTypes from './actionTypes';
export const vehicleRegister = data => {
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    try {
      const response = await post(
        endpoints.registerVehicle.VehicleRegistration,
        data,
        true,
      );
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};

export const EditVehicleInfo = data => {
  console.log('Data from Edit vehicle =>', data);
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    console.log('DATA', data);
    try {
      const response = await post(
        endpoints.registerVehicle.updateVehicle,
        data,
        true,
      );
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      console.log('Body Error from action EditVehicle ===>', e);
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};
export const getVehicleTypes = () => {
  return async dispatch => {
    try {
      const response = await get(endpoints.registerVehicle.getVehicleType);
      console.log('GET Vehicle Type', response);
      dispatch({
        type: actionTypes.vehicletypes,
        vehicleTypes: response?.vehicle,
      });

      return Promise.resolve(response);
    } catch (e) {
      console.log('ERROR', e);
      return Promise.reject(e);
    }
  };
};

export const getVehicleInfo = data => {
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    // console.log('DATA', data);
    try {
      const response = await get(
        `${endpoints.registerVehicle.getVehicleData}/${data}`,
      );
      dispatch({type: actionTypes.getVehicleDetail, vehicle: response?.data});
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      alert(e);
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};

export const deleteVehicleAction = data => {
  // data = '62c2a51970ebf43cc17db2b3';
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    // console.log('DATA', data);
    try {
      const response = await get(
        `${endpoints.registerVehicle.deleteVehicle}/${data}`,
      );
      // dispatch({type: actionTypes.getVehicleDetail, vehicle: response?.data});
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};
