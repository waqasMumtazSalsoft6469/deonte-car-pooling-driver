import initialStates from './Reducers/initialStates';
import DeviceInfo from 'react-native-device-info';

export const storeVersion = parseInt(
  DeviceInfo.getBuildNumber().split('.').join(''),
);
const getMergedStates = state => {
  var newStates = state;
  const stateEntries = Object.entries(initialStates);
  stateEntries.forEach(entry => {
    const storeKey = entry[0];
    const reducer = state[storeKey];
    if (reducer) {
      const reducerKeys = Object.entries(initialStates[storeKey]);
      reducerKeys.forEach(item => {
        if (reducer[item[0]]) {
        } else {
          newStates = {
            ...newStates,
            [storeKey]: {
              ...newStates[storeKey],
              ...initialStates[storeKey][item[0]],
            },
          };
        }
      });
    } else {
      newStates[storeKey] = initialStates[storeKey];
    }
  });

  return newStates;
};
const migration = state => {
  return Promise.resolve(getMergedStates(state));
};
export default migration;
