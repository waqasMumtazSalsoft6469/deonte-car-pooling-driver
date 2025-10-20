import {combineReducers} from 'redux';
import GeneralReducer from './GeneralReducer';
import SessionReducer from './SessionReducer';
import UserReducer from './UserReducer';
import vehicleReducer from './vehicleReducer.js';
const Reducers = combineReducers({
  GeneralReducer: GeneralReducer,
  SessionReducer: SessionReducer,
  UserReducer: UserReducer,
  vehicleReducer: vehicleReducer,
});

export default Reducers;
