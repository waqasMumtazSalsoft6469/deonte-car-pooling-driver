// minlength: 4; maxlength: 4; required: digit; // sms verification rule
import {
  dataToQueryParameter,
  getConfigs,
  getMessage,
  handleResponse,
  performNetworkRequest,
} from './HelperFunction';
import {base_url, local_url} from './configs';
export const post = async (endpoint, body, formData = false, queryParams) => {
  const url = base_url + endpoint + dataToQueryParameter(queryParams);

  console.log('URL', url);

  const configs = getConfigs('POST', body, formData);
  console.log(configs, 'configs');
  try {
    const networkResult = await performNetworkRequest(url, configs);
    console.log('NETWORK RESULT', networkResult);
    const result = await handleResponse(networkResult);

    return Promise.resolve(result);
  } catch (e) {
    console.log('API Error:', e);
    // Preserve error object if it has useful properties (status, responseText)
    if (e && typeof e === 'object' && (e.status || e.responseText)) {
      console.log('Error details - Status:', e.status, 'Response:', e.responseText);
      return Promise.reject(e);
    }
    // Otherwise convert to message string
    const message = getMessage(e);
    return Promise.reject(message);
  }
};
export const get = async (endpoint, queryParams) => {
  const url = base_url + endpoint + dataToQueryParameter(queryParams);
  console.log(
    '<<<<<<<<<<<<=====================ß=======================>>>>>>>>>>>>>>',
    url,
  );
  const configs = getConfigs('GET');
  // return;

  try {
    const networkResult = await performNetworkRequest(url, configs);
    const result = await handleResponse(networkResult);

    // console.log('ressssss', result);

    return Promise.resolve(result);
  } catch (e) {
    const message = getMessage(e);
    return Promise.reject(message);
  }
};
export const put = async (endpoint, body, formData, queryParams) => {
  const url = base_url + endpoint + dataToQueryParameter(queryParams);
  console.log('PUTTT URLLLL', url);
  const configs = getConfigs('PUT', body, formData);
  try {
    const networkResult = await performNetworkRequest(url, configs);
    const result = await handleResponse(networkResult);
    return Promise.resolve(result);
  } catch (e) {
    const message = getMessage(e);
    return Promise.reject(message);
  }
};

const Api = {
  post: post,
  get: get,
  put: put,
};
export default Api;
