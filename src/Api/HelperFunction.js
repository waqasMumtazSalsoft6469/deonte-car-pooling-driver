import {store} from '../Redux/store';
// import Toast from 'react-native-toast';
import Geolocation from '@react-native-community/geolocation';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {Linking} from 'react-native';
// import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

export const APIKEY = 'AIzaSyBFRqlCOvRtuKLpvDSP5qLkiyCr5dKx7jI';

export const showToast = msg => {
  setTimeout(() => {
    // Toast.show(getMessage(msg));
  }, 500);
};

export const handleResponse = ({response, jsonResponse}) => {
  // console.log('AAAAA', jsonResponse.error);
  switch (response.status) {
    case 200: {
      console.log('case 200');
      if (
        jsonResponse.hasOwnProperty('errors') ||
        (jsonResponse.hasOwnProperty('error') && jsonResponse.error == true)
      ) {
        // console.log('TRUEEEEEEE');
        const message = getMessage(jsonResponse);
        return Promise.reject(message);
      } else {
        // console.log('FALSEEEEEE', jsonResponse);
        return Promise.resolve(jsonResponse);
      }
      break;
    }
    case 201: {
      console.log('case 201');
      if (
        jsonResponse.hasOwnProperty('errors') ||
        (jsonResponse.hasOwnProperty('error') && jsonResponse.error == true)
      ) {
        const message = getMessage(jsonResponse);
        return Promise.reject(message);
      } else {
        return Promise.resolve(jsonResponse);
      }
      break;
    }
    case 401: {
      const message = getMessage(jsonResponse);
      return Promise.reject(message);
    }
    default: {
      const message = getMessage(jsonResponse);
      return Promise.reject(message);
    }
  }
};
export const performNetworkRequest = async (url, configs) => {
  url = encodeURI(url);
  try {
    const response = await fetch(url, configs);
    const jsonResponse = await response.json();
    return Promise.resolve({response, jsonResponse});
  } catch (e) {
    return Promise.reject(e);
  }
};
// export const log = (label, data) => {
//   if (__DEV__) {
//     console.log(TAG + `__${label}__ :`, data);
//   }
// };
export const message = 'Something went wrong';
export const getMessage = json => {
  console.log('JSON   KKKKKK', json);
  switch (typeof json) {
    case 'string': {
      return json;
    }
    case 'object': {
      if (Array.isArray(json)) {
        var data = json[0];
        return getMessage(data);
      } else {
        if (json.errors) {
          const data = json.errors;
          if (typeof data === 'object') {
            const values = Object.values(data);
            return getMessage(values);
          } else {
            return getMessage(data);
          }
        } else {
          if (json.message) {
            return getMessage(json.message);
          } else if (json.error) {
            return getMessage(json.error);
          } else {
            return message;
          }
        }
      }
    }
    default: {
      return message;
    }
  }
};
export const jsonToFormdata = json => {
  var data = new FormData();
  const entries = Object.entries(json);
  entries.forEach(entry => {
    data.append(entry[0], entry[1]);
  });
  return data;
};
export const getConfigs = (method, body, formData = true) => {
  var headers = {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  };
  if (formData == true) {
    headers['Content-Type'] = 'multipart/form-data';
  }
  const data = store.getState();
  if (data) {
    if (data.SessionReducer) {
      if (data.SessionReducer.token != null) {
        if (data.SessionReducer.token) {
          headers['Authorization'] = 'Bearer ' + data.SessionReducer.token;
        }
      }
    }
  }
  var configs = {
    method: method,
    headers: headers,
  };
  if (body) {
    if (method == 'POST' || method == 'PUT') {
      if (formData == true) {
        configs['body'] = jsonToFormdata(body);
      } else {
        configs['body'] = JSON.stringify(body);
      }
    }
  }
  return configs;
};
export const dataToQueryParameter = data => {
  if (typeof data === 'object') {
    if (!Array.isArray(data)) {
      var params = '?';
      const dataArray = Object.entries(data);
      if (dataArray.length > 0) {
        dataArray.forEach((entry, index) => {
          var amp = index < dataArray.length - 1 ? '&' : '';
          params = `${params}${entry[0]}=${entry[1]}${amp}`;
        });
        return params;
      }
    }
  } else if (typeof data === 'string') {
    return data;
  }
  return '';
};

export const checkLocationPermissions = async () => {
  // try {
  //   if (Platform.OS == 'android') {
  //     await promptForLocation();
  //   }
  //   const permission =
  //     Platform.OS == 'android'
  //       ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
  //       : PERMISSIONS.IOS.LOCATION_ALWAYS;
  //   await checkPermission(permission);
  //   return true
  // } catch (error) {
  //   // show toast
  //   throw new Error(error)
  // }
};

export const checkCameraPermissions = async () => {
  try {
    // if (Platform.OS == 'android') {
    //   await promptForLocation();
    // }

    const permission =
      Platform.OS == 'android'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA;

    await checkPermission(permission);
  } catch (error) {
    // show toast
  }
};

export const getCurrentLocation = () => {
  console.log('Location called');
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      success => {
        let Coords = {
          latitude: success.coords.latitude,
          longitude: success.coords.longitude,
        };

        console.log('Success ==>', success);
        console.log('Coords =====>', Coords);
        return resolve(Coords, success);
      },
      error => {
        console.log('Error from GetCurrent Location ===============>', error);
        return reject(error);
      },
      {
        enableHighAccuracy: true,
        // timeout: 20000,
        maximumAge: 0,
      },
    );
  });
};

export const watchPosition = () => {
  console.log('get Location Called Watch position');
  return new Promise((resolve, reject) => {
    Geolocation.watchPosition(
      success => {
        let Coords = {
          latitude: success.coords.latitude,
          longitude: success.coords.longitude,
        };

        console.log('Success from WatchPostion ==>', success);
        console.log('Coords from WatchPosition =====>', Coords);
        return resolve(Coords, success);
      },
      error => {
        console.log('Error from GetCurrent Location ===============>', error);
        return reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      },
    );
  });
};

const promptForLocation = async () => {
  try {
    // const success =
    //   await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
    //     interval: 10000,
    //     fastInterval: 5000,
    //   });
  } catch (error) {
    console.log('errorrrr ', error);
    // show toast
  }
};

export const checkCameraPermission = async () => {
  try {
    const permission =
      Platform.OS == 'android'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA;

    await checkPermission(permission);
    return;
  } catch (error) {
    // show toast
    console.log('here itttt ?');
    // showToast(error);
    throw new Error(error);
  }
};

export const checkPermission = async permission => {
  const result = await check(permission);

  return new Promise(async (resolve, reject) => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        return reject(RESULTS.UNAVAILABLE);

      case RESULTS.DENIED:
        try {
          const request_result = await getPermission(permission);
          return resolve(request_result);
        } catch (error) {
          return reject(error);
        }

      case RESULTS.GRANTED:
        return resolve(RESULTS.GRANTED);

      case RESULTS.BLOCKED:
        return reject(RESULTS.BLOCKED);
    }
  });
};

const getPermission = async permission => {
  console.log('did we reached here ?');
  const result = await request(permission);
  console.log('result ============>', result);
  return new Promise(async (resolve, reject) => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        return reject(RESULTS.UNAVAILABLE);

      case RESULTS.DENIED:
        return reject(RESULTS.DENIED);

      case RESULTS.GRANTED:
        return resolve(RESULTS.GRANTED);

      case RESULTS.BLOCKED:
        return reject(RESULTS.BLOCKED);
    }
  });
};

export const getCity = async (lat, long) => {
  const networkResult = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=true&key=AIzaSyB2hxNhJCBwaHoQ2eggJmLR4pfDYAN93cY`,
  );

  const responsejson = await networkResult?.json();

  let value;

  if (responsejson) {
    value = responsejson?.results?.find(
      val => val?.types[0] == 'street_address',
    );
    // value = responsejson
    console.log('Address ===>', value?.formatted_address);
  }

  return Promise.resolve(value?.formatted_address);
};

// RNLocation.configure({
//   allowsBackgroundLocationUpdates: false,
//   desiredAccuracy: {
//     android: 'balancedPowerAccuracy',
//     ios: 'hundredMeters',
//   },
//   // androidProvider: 'auto',
//   interval: 5000, // Milliseconds
//   fastestInterval: 10000, // Milliseconds
//   maxWaitTime: 5000, // Milliseconds
//   // iOS Only
//   activityType: 'other',
//   allowsBackgroundLocationUpdates: false,
//   headingFilter: 1, // Degrees
//   headingOrientation: 'portrait',
//   pausesLocationUpdatesAutomatically: false,
//   showsBackgroundLocationIndicator: false,
//   headingOrientation: 'portrait',
// });

// export const getUserLocation = () =>
//   RNLocation.requestPermission({
//     ios: 'whenInUse',

//     android: {
//       detail: 'coarse',
//       rationale: {
//         title: 'Location permission',
//         message:
//           'Need Location Permission for searching nearest Properties to you',
//         buttonPositive: 'OK',
//         buttonNegative: 'Cancel',
//       },
//     },
//   }).then(granted => {
//     if (granted) {
//       return RNLocation.getLatestLocation({timeout: 60000})
//         .then(latestLocation => {
//           return latestLocation;
//         })
//         .catch(e => console.warn(e));
//     } else {
//       console.log('Latest Location Fetched');
//     }
//   });
