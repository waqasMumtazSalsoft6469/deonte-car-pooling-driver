export const endpoints = {
  auth: {
    login: 'api/driver/login',
    logout: 'logout',
    register: 'api/driver/registerDriver',
    forgetPassword: 'api/driver/driverRecoverPassword',
    verifyCode: 'api/driver/driververifyRecoverCode',
    setPassword: 'api/driver/driverresetPassword',
    profile: 'api/driver/driver-details',
    updateProfile: 'api/driver/editProfile',
    changePassword: 'api/driver/changepassword',
    driverdetails: 'api/driver/driver-details',
  },
  profile: {
    getProfile: 'api/driver/driver-details',
    ediProfile: 'api/driver/editProfile',
    changePassword: 'api/driver/changepassword',
  },
  registerVehicle: {
    VehicleRegistration: 'api/driverVehicle/registerDriverVehicle',
    getVehicleType: 'api/vehicle/getAllVehicles',
    getVehicleData: 'api/driverVehicle/getVehicleDetail',
    updateVehicle: 'api/driverVehicle/editVehicle',
    deleteVehicle: 'api/driverVehicle/deleteVehicle',
  },
  playlist: {
    addSong: 'api/ride/addnewsong',
    getSongs: 'api/ride/driverSongs',
  },
  contact: {
    contactUs: 'api/feedback/create-feedback',
  },
  ride: {
    AcceptRide: 'api/ride/acceptRide',
    PendingRides: 'api/ride/pendingRides',
    RejectRide: 'api/ride/rejectRide',
    StartRide: 'api/ride/startRide',
    PauseRide: 'api/ride/pauseRide',
    ResumeRide: 'api/ride/resumeRide',
    RequestTrack: 'api/ride/requestTrack',
    MarkRidePaid: 'api/ride/markRidePaid',
    EndRide: 'api/ride/endRide',
    RideDetails: 'api/ride/rideDetails',
    SubmitAmount: 'api/ride/submitAmount',
    cancelRide: 'api/ride/cancelRides',
    addToWallet: 'api/ride/addToWallet',
  },
  rider: {
    getEarning: 'api/driver/getEarning/',
    getEarningDetails: 'api/driver/getEarningDetails',
    userNotifications: 'api/user/userNotifications',
    getDriverRating: 'api/ride/getDriverRating',
    rideDetailInfo: 'api/ride/getRatingData',
    getDriverRides: 'api/ride/driverRides',
    changeStatus: 'api/driver/changeStatus',
  },
};

// export const base_url = 'https://dev74.onlinetestingserver.com:6065/';
// export const base_url = 'https://react.customdev.solutions:6065/';

// export const base_url = 'https://react.customdev.solutions:6065/';
// export const local_url = 'http://10.0.2.52:6065/';

// export const base_url = 'http://50.60.71.133:6065/';
// export const local_url = 'http://10.0.2.2:6065/';

// new base url for ngrok
// export const base_url = 'https://zaria-perpetuable-giuseppe.ngrok-free.dev/';

// new base url for 
// export const base_url = 'https://react.customdev.solutions:6066/';
export const base_url = 'https://ccbaaf090474.ngrok-free.app/';

// dummy ngrok url
// export const base_url = 'https://7c3a38c651f5.ngrok-free.app/';

//Change the port of base_url because it give a ssl error!
// export const base_url = 'https://react.customdev.solutions:6066/';
// export const base_url = 'http://10.0.2.52:6065/';

// export const file_url =
//   'https://dev74.onlinetestingserver.com/day4dubai/images/logo/';
export const file_url =
  'https://react.customdev.solutions:6065/day4dubai/images/logo/';
// export const geo_base =
//   'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
export const geo_base =
  'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
// export const image_url = 'https://dev74.onlinetestingserver.com:6065/';

// export const image_url = 'https://react.customdev.solutions:6065/';
export const image_url = 'https://zaria-perpetuable-giuseppe.ngrok-free.dev/';
// export const image_url = 'https://react.customdev.solutions:6066/';
// export const image_url = 'http://10.0.2.52:6065/';

export const apikey = 'AIzaSyBECY2aNK5YkXshm_ZEqtZY0M_hcJT65Iw';
