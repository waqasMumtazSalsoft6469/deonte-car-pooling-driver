import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import {Provider} from 'react-redux';
import {persistor, store} from '../Redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import Loader from '../components/Loader';
function Navigation() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Loader />
          <MainNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
export default Navigation;
