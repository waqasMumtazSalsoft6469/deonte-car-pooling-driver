const GeneralReducer = {
  loading: false,
};

const SessionReducer = {
  token: null,
  riderinfo: null
};

const UserReducer = {
  profile: null,
  userData: null
};
const VehicleReducer = {
  vehicle: null,
  currentRide: null
};

const initialStates = {
  GeneralReducer: GeneralReducer,
  SessionReducer: SessionReducer,
  UserReducer: UserReducer,
  vehicleReducer: VehicleReducer,
};

export default initialStates;
