import {get, post} from '../../Api';
import {endpoints} from '../../Api/configs';
import actionTypes from './actionTypes';

export const login = data => {
  console.log('data--login-dispatch-body', data);
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    try {
      const response = await post(endpoints.auth.login, data);
      console.log('response:---', response);
      dispatch({
        type: actionTypes.login,
        session: {token: response?.token, user: response},
      });
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      console.log('ERROR--login-api', e);
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};

// export const logout = () => {
//   return async dispatch => {
//     dispatch({type: actionTypes.loaderOn});
//     try {
//       const response = await post(endpoints.auth.logout);
//       console.log('LOGOUT RESPONSE', response);
//       dispatch({
//         type: actionTypes.logout,
//       });
//       dispatch({type: actionTypes.loaderOff});
//       // showToast(response.message);
//       return Promise.resolve(response);
//     } catch (e) {
//       console.log('ERROR', e);
//       dispatch({type: actionTypes.loaderOff});
//       return Promise.reject(e);
//     }
//   };
// };

export const register = data => {
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    try {
      const response = await post(endpoints.auth.register, data, true);
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};

export const resetPassword = data => {
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    try {
      const response = await post(endpoints.auth.forgetPassword, data);
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};

export const verifyCode = data => {
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    try {
      const response = await post(endpoints.auth.verifyCode, data);
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};

export const setPasswordAction = data => {
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    try {
      const response = await post(endpoints.auth.setPassword, data);
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};
export const changePasswordAction = data => {
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    try {
      const response = await post(endpoints.auth.changePassword, data);
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};

export const getProfile = data => {
  return async dispatch => {
    console.log('---dat in auth reducer ', data);
    dispatch({type: actionTypes.loaderOn});
    try {
      const response = await get(`${endpoints.auth.profile}/${data}`);
      console.log('Response from get Proffile =======>', response?.data);
      dispatch({type: actionTypes.getProfile, profile: response?.data});
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      console.log('ERROR', e);
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};

export const updateProfile = data => {
  return async dispatch => {
    dispatch({type: actionTypes.loaderOn});
    try {
      const response = await post(endpoints.auth.updateProfile, data, true);
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};

export const getRiderDetails = id => {
  return async dispatch => {
    // dispatch({type: actionTypes.loaderOn});
    try {
      const response = await get(`${endpoints.auth.driverdetails}/${id}`);
      console.log(
        'response?.drivervehicletype ====>',
        response?.driver?.drivervehicletype,
      );
      dispatch({
        type: actionTypes.riderDetails,
        details: {riderDetail: response?.driver},
      });
      //           if(response?.drivervehicletype){
      //       console.log("get Rider Details =========================>", response?.drivervehicletype, "sabjk>");

      //       dispatch({type: actionTypes.getVehicleDetail, vehicle: response?.data});
      // }else{
      //   console.log("In else =====>");
      //   dispatch({type: actionTypes.getVehicleDetail, vehicle: null});

      // }
      dispatch({type: actionTypes.loaderOff});
      return Promise.resolve(response);
    } catch (e) {
      dispatch({type: actionTypes.loaderOff});
      return Promise.reject(e);
    }
  };
};

// try {
//   const response = await post(endpoints.auth.login, data);
//   console.log('LOGIN RESPONSE', response);
//   dispatch({
//     type: actionTypes.login,
//     session: {token: response?.token, user: response},
//   });
//   dispatch({type: actionTypes.loaderOff});
//   return Promise.resolve(response);
// } catch (e) {
//   console.log('ERROR', e);
//   dispatch({type: actionTypes.loaderOff});
//   return Promise.reject(e);
// }

export const logout = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.LOGOUT,
    });

    dispatch({
      type: actionTypes.loaderOff,
    });
    // showToast('You have been logged out');
    return Promise.resolve();
  };
};
