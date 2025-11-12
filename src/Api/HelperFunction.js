import {store} from '../Redux/store';
import Toast from 'react-native-toast-message';
import Geolocation from '@react-native-community/geolocation';
import {Platform} from 'react-native';
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

// Global Toast Functions
export const showToast = (msg, type = 'error') => {
  setTimeout(() => {
    Toast.show({
      type: type,
      text1: getMessage(msg),
      position: 'top',
      visibilityTime: 3000,
    });
  }, 500);
};

export const showSuccessToast = (msg) => {
  showToast(msg, 'success');
};

export const showErrorToast = (msg) => {
  showToast(msg, 'error');
};

export const showInfoToast = (msg) => {
  showToast(msg, 'info');
};

export const showWarningToast = (msg) => {
  showToast(msg, 'warning');
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
    case 500:
    case 502:
    case 503:
    case 504: {
      // For server errors, preserve the response object with full details
      console.error(`Server error ${response.status}:`, jsonResponse);
      
      // If jsonResponse has responseText (from non-JSON response), use it
      if (jsonResponse && typeof jsonResponse === 'object' && jsonResponse.responseText) {
        const errorObj = {
          message: jsonResponse.message || `Server error (Status: ${response.status})`,
          status: response.status,
          responseText: jsonResponse.responseText || jsonResponse.fullResponse,
          fullResponse: jsonResponse.fullResponse || jsonResponse.responseText,
        };
        console.error('Server error object:', errorObj);
        return Promise.reject(errorObj);
      }
      
      // Otherwise create error object with status and response
      const errorObj = {
        message: getMessage(jsonResponse) || `Server error (Status: ${response.status})`,
        status: response.status,
        responseText: typeof jsonResponse === 'string' ? jsonResponse : JSON.stringify(jsonResponse),
        fullResponse: jsonResponse,
      };
      console.error('Server error object (fallback):', errorObj);
      return Promise.reject(errorObj);
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
    const contentType = response.headers.get('content-type') || '';
    
    // Check if response is JSON
    if (contentType.includes('application/json')) {
      const jsonResponse = await response.json();
      return Promise.resolve({response, jsonResponse});
    } else {
      // If not JSON, get text to see what we received
      const textResponse = await response.text();
      console.log('Server returned non-JSON. Status:', response.status);
      console.log('Full response text:', textResponse);
      console.log('Response text (first 1000 chars):', textResponse.substring(0, 1000));
      
      // Try to parse as JSON anyway
      try {
        const jsonResponse = JSON.parse(textResponse);
        return Promise.resolve({response, jsonResponse});
      } catch (parseError) {
        // If parsing fails, still pass it to handleResponse
        // Create a jsonResponse-like object with the text response
        // This allows handleResponse to properly handle server errors
        const errorJsonResponse = {
          error: true,
          message: `Server returned non-JSON response (Status: ${response.status})`,
          responseText: textResponse,
          fullResponse: textResponse,
          status: response.status,
        };
        console.error('Server returned non-JSON, creating error response:', errorJsonResponse);
        return Promise.resolve({response, jsonResponse: errorJsonResponse});
      }
    }
  } catch (e) {
    console.log('Network request error:', e);
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
    const [key, value] = entry;
    // Handle file objects (for React Native FormData)
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      // Check if it's a file object with uri, type, and name
      if (value.uri || value.path || value.fileCopyUri) {
        // Format as file object for React Native FormData
        // Prioritize fileCopyUri (file:// path) over uri/path (may be content:// URIs)
        // fileCopyUri is the actual file path after copying to cache directory
        let fileUri = value.fileCopyUri || value.path || value.uri;
        
        // React Native FormData expects file objects with uri, type, and name
        // For Android, we need to handle file:// URIs properly
        // On Android, FormData sometimes needs the path without file:// prefix
        // But React Native documentation says to use file:// format
        // Let's keep file:// format as it's the standard
        
        let finalUri = fileUri;
        
        // Ensure URI is in the correct format
        // If it's a content:// URI, we should have converted it, but keep as fallback
        if (fileUri && !fileUri.startsWith('file://') && !fileUri.startsWith('content://')) {
          // If it's a plain path, add file:// prefix
          finalUri = `file://${fileUri}`;
        }
        
        // For Android, try removing file:// prefix if it doesn't work with it
        // But keep file:// for now as it's the standard format
        // Some versions of React Native FormData on Android need file:// prefix
        // Others need it without - we'll keep file:// as it's more common
        
        const fileType = value.type || value.mimeType || 'application/octet-stream';
        const fileName = value.name || value.filename || 'file';
        
        // Ensure file name has proper extension if missing
        let finalFileName = fileName;
        if (finalUri && !fileName.includes('.')) {
          // Try to extract extension from URI
          const uriMatch = finalUri.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
          if (uriMatch) {
            finalFileName = `${fileName}.${uriMatch[1]}`;
          }
        }
        
        // Ensure fileName has an extension based on MIME type if still missing
        if (!finalFileName.includes('.')) {
          if (fileType.includes('jpeg') || fileType.includes('jpg')) {
            finalFileName = `${finalFileName}.jpg`;
          } else if (fileType.includes('png')) {
            finalFileName = `${finalFileName}.png`;
          } else if (fileType.includes('pdf')) {
            finalFileName = `${finalFileName}.pdf`;
          }
        }
        
        // React Native FormData REQUIRES file:// prefix for both iOS and Android
        // Without file://, React Native cannot read the file and won't send it
        // This is the standard format that React Native expects
        let formDataUri = finalUri;
        
        // Ensure we ALWAYS have file:// prefix (required by React Native FormData)
        if (!formDataUri.startsWith('file://') && !formDataUri.startsWith('content://')) {
          formDataUri = `file://${formDataUri}`;
        }
        
        // DO NOT remove file:// prefix - React Native FormData needs it to read the file
        // If the file:// prefix is missing, React Native cannot access the file
        // and the file won't be sent in the FormData
        
        console.log(`Using file URI for FormData: ${formDataUri} (Platform: ${Platform.OS})`);
        
        // Log file info for debugging
        console.log(`FormData file for ${key}:`, {
          originalUri: finalUri,
          formDataUri: formDataUri,
          type: fileType,
          name: finalFileName,
          platform: Platform.OS,
        });
        
        // Append file to FormData
        // React Native FormData REQUIRES file:// prefix in the uri
        // Without file://, React Native cannot read the file from the filesystem
        // The format is: { uri: 'file:///path/to/file', type: 'image/jpeg', name: 'file.jpg' }
        const fileObject = {
          uri: formDataUri, // MUST have file:// prefix for React Native to read it
          type: fileType,
          name: finalFileName,
        };
        
        // Append to FormData - React Native will read the file from the uri and send it
        // If uri doesn't have file:// prefix, React Native won't be able to read the file
        data.append(key, fileObject);
        
        console.log(`File appended to FormData for ${key}:`, {
          uri: formDataUri,
          type: fileType,
          name: finalFileName,
          hasFilePrefix: formDataUri.startsWith('file://'),
        });
      } else {
        // Regular object - stringify it
        data.append(key, JSON.stringify(value));
      }
    } else if (Array.isArray(value)) {
      // Handle arrays - check if it's an array of file objects
      const isFileArray = value.length > 0 && 
        value.every(item => item && typeof item === 'object' && (item.uri || item.path || item.fileCopyUri));
      
      if (isFileArray) {
        // If it's an array of file objects, append each file separately with the same key
        // This allows multiple files with the same field name (e.g., doc_schedule)
        value.forEach((fileItem, index) => {
          if (fileItem && typeof fileItem === 'object' && (fileItem.uri || fileItem.path || fileItem.fileCopyUri)) {
            let fileUri = fileItem.fileCopyUri || fileItem.path || fileItem.uri;
            
            // Ensure URI is in the correct format
            if (!fileUri.startsWith('file://') && !fileUri.startsWith('content://')) {
              fileUri = `file://${fileUri}`;
            }
            
            // React Native FormData REQUIRES file:// prefix to read the file
            // DO NOT remove file:// prefix - React Native needs it
            let formDataUri = fileUri;
            
            // Ensure we ALWAYS have file:// prefix (required by React Native)
            if (!formDataUri.startsWith('file://') && !formDataUri.startsWith('content://')) {
              formDataUri = `file://${formDataUri}`;
            }
            
            console.log(`Using file URI for FormData array item: ${formDataUri} (Platform: ${Platform.OS})`);
            
            const fileType = fileItem.type || fileItem.mimeType || 'application/octet-stream';
            let fileName = fileItem.name || fileItem.filename || `file_${index}`;
            
            // Ensure file name has proper extension
            if (!fileName.includes('.')) {
              if (fileType.includes('jpeg') || fileType.includes('jpg')) {
                fileName = `${fileName}.jpg`;
              } else if (fileType.includes('png')) {
                fileName = `${fileName}.png`;
              } else if (fileType.includes('pdf')) {
                fileName = `${fileName}.pdf`;
              }
            }
            
            console.log(`FormData file array item [${index}] for ${key}:`, {
              uri: formDataUri,
              type: fileType,
              name: fileName,
            });
            
            // Append each file with the same key (allows multiple files)
            // React Native FormData REQUIRES file:// prefix in uri
            const fileObject = {
              uri: formDataUri, // MUST have file:// prefix
              type: fileType,
              name: fileName,
            };
            
            data.append(key, fileObject);
            
            console.log(`File array item [${index}] appended to FormData for ${key}:`, {
              uri: formDataUri,
              type: fileType,
              name: fileName,
              hasFilePrefix: formDataUri.startsWith('file://'),
            });
          }
        });
      } else {
        // Regular array - stringify it
        data.append(key, JSON.stringify(value));
      }
    } else {
      // Primitive values
      data.append(key, value);
    }
  });
  
  // Log FormData contents (for debugging)
  console.log('FormData constructed with', entries.length, 'entries');
  
  return data;
};
export const getConfigs = (method, body, formData = true) => {
  var headers = {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  };
  if (formData == true) {
    // Don't set Content-Type for FormData - let React Native set it automatically
    // It will include the boundary parameter
  } else {
    headers['Content-Type'] = 'application/json';
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

export const getCurrentLocation = (options = {}) => {
  console.log('[HelperFunction] 📍 Location called with options:', options);
  
  const defaultOptions = {
    enableHighAccuracy: false, // Use network/cached location for faster response
    timeout: 15000, // 15 seconds timeout (reduced for faster fallback)
    maximumAge: 30000, // Accept location up to 30 seconds old (for faster response)
  };
  
  const finalOptions = {...defaultOptions, ...options};
  
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      success => {
        let Coords = {
          latitude: success.coords.latitude,
          longitude: success.coords.longitude,
        };

        console.log('[HelperFunction] ✅ Location success:', success);
        console.log('[HelperFunction] 📍 Coords:', Coords);
        console.log('[HelperFunction] Location age:', success.timestamp ? Date.now() - success.timestamp : 'unknown');
        return resolve(Coords, success);
      },
      error => {
        console.error('[HelperFunction] ❌ Location error:', error);
        console.error('[HelperFunction] Error code:', error.code);
        console.error('[HelperFunction] Error message:', error.message);
        return reject(error);
      },
      finalOptions,
    );
  });
};

export const watchPosition = () => {
  console.log('[HelperFunction] 📍 Watch position called');
  return new Promise((resolve, reject) => {
    Geolocation.watchPosition(
      success => {
        let Coords = {
          latitude: success.coords.latitude,
          longitude: success.coords.longitude,
        };

        console.log('[HelperFunction] ✅ Success from WatchPosition:', success);
        console.log('[HelperFunction] 📍 Coords from WatchPosition:', Coords);
        return resolve(Coords, success);
      },
      error => {
        console.error('[HelperFunction] ❌ Error from WatchPosition:', error);
        console.error('[HelperFunction] Error code:', error.code);
        return reject(error);
      },
      {
        enableHighAccuracy: false, // Changed to false for faster response
        timeout: 30000, // 30 seconds timeout
        maximumAge: 10000, // Accept location up to 10 seconds old
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
    showToast(error);
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
  try {
    console.log('[getCity] 📍 Fetching address for coordinates:', lat, long);
    
    if (!lat || !long || isNaN(lat) || isNaN(long)) {
      console.error('[getCity] ❌ Invalid coordinates:', {lat, long});
      return Promise.resolve(null);
    }
    
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=true&key=AIzaSyBECY2aNK5YkXshm_ZEqtZY0M_hcJT65Iw`;
    console.log('[getCity] 📍 Geocode API URL:', url);
    
    const networkResult = await fetch(url);

    if (!networkResult || !networkResult.ok) {
      console.error('[getCity] ❌ Network request failed:', networkResult?.status, networkResult?.statusText);
      return Promise.resolve(null);
    }

    const responsejson = await networkResult?.json();
    
    console.log('[getCity] 📍 Geocode API response status:', responsejson?.status);
    console.log('[getCity] 📍 Number of results:', responsejson?.results?.length);
    console.log('[getCity] 📍 Full response:', JSON.stringify(responsejson, null, 2));

    // Check for API errors
    if (responsejson?.status === 'ZERO_RESULTS') {
      console.warn('[getCity] ⚠️ No results found for coordinates');
      return Promise.resolve(null);
    }
    
    if (responsejson?.status !== 'OK') {
      console.error('[getCity] ❌ Geocode API error:', responsejson?.status, responsejson?.error_message);
      return Promise.resolve(null);
    }

    let value;

    if (responsejson && responsejson.results && responsejson.results.length > 0) {
      // Log all available result types
      console.log('[getCity] 📍 All result types:', responsejson.results.map(r => ({
        types: r.types,
        address: r.formatted_address
      })));
      
      // Priority order: street_address > route > premise > establishment > point_of_interest > first result
      const priorityTypes = ['street_address', 'route', 'premise', 'establishment', 'point_of_interest'];
      
      for (const type of priorityTypes) {
        value = responsejson.results.find(
          val => val?.types && val.types.includes(type),
        );
        if (value) {
          console.log('[getCity] ✅ Found address with type:', type);
          break;
        }
      }
      
      // If still not found, use the first result (usually the most specific)
      if (!value) {
        value = responsejson.results[0];
        console.log('[getCity] ✅ Using first result as fallback');
      }
      
      const formattedAddress = value?.formatted_address;
      console.log('[getCity] ✅ Final address found:', formattedAddress);
      console.log('[getCity] 📍 Address types:', value?.types);
      
      if (formattedAddress) {
        return Promise.resolve(formattedAddress);
      } else {
        console.warn('[getCity] ⚠️ Result found but no formatted_address property');
        return Promise.resolve(null);
      }
    } else {
      console.warn('[getCity] ⚠️ No results found in geocode response');
      return Promise.resolve(null);
    }
  } catch (error) {
    console.error('[getCity] ❌ Error fetching address:', error);
    console.error('[getCity] ❌ Error message:', error?.message);
    console.error('[getCity] ❌ Error stack:', error?.stack);
    return Promise.resolve(null);
  }
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
