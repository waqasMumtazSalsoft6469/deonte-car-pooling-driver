import {StyleSheet} from 'react-native';
import theme, {appShadow} from '../../../utils/theme';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  VehicleTypecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: vw * 86,
    paddingBottom: vh * 3,
    marginTop: vh
  },
  registerButton: {
    borderBottomRightRadius: vh * 2,
    paddingBottom: vh * 0.1,
    // height: vh*7.6
  },
  documentsTitle: {
    marginBottom: vh * 2,
    fontSize: vw * 3.7,
    letterSpacing: vw * 0.4,
  },
  certificateImage: {
    borderRadius: vh * 2,
    height: vh * 12,
    width: vw * 35,
    resizeMode: 'cover',
  },
  brandContainer: {
    paddingRight: vw * 19,
  },
  colorContainer: {
    paddingRight: vw * 17,
  },
  vehicleValue: {
    fontSize: vh * 1.9,
    width: vw * 30
  },
  certificateImageContainer: {
    ...appShadow,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  yesBtnStyle: {
    marginTop: vh * 5,
    marginVertical: vh * 0.5,
  },
  title: {
    textAlign: 'center',
    lineHeight: vh * 3,
    paddingTop: vh * 4,
  },
  noBtnStyle: {
    backgroundColor: theme.colors.white,
    marginVertical: 0,
  },
  noBtnText: {
    paddingLeft: vw * 3,
    color: theme.colors.red,
  },
  flatlistContainer: {
    height: vh * 34,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  vehicleTitle: {
    fontSize: vh * 1.8,
    // color: theme.colors.labelColor
    color: theme.colors.black,
    letterSpacing: vw * 0.3,
    
  },
  myVehicle: {
    height: vh * 20,
    width: vw * 80,
    resizeMode: 'cover',
    marginTop: vh * 10,
    //   bottom: 0
  },
  vehicleDetailContainer: {
    justifyContent: 'space-between',
    width: vw * 25,
    // paddingTop: vh*4,
    //   backgroundColor: "red"
  },
  documentContainer: {
    height: vh * 30,
    width: vw * 86,
  },
  text2style: {
    width: vw * 80,
    marginBottom: vh * 0.05,
  },
});
