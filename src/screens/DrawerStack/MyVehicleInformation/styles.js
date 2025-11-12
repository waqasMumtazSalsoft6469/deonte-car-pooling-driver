import { StyleSheet } from 'react-native';
import theme, { appShadow } from '../../../utils/theme';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: vh * 3,
    paddingBottom: vh * 4,
  },
  VehicleTypecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: vw * 86,
    paddingBottom: vh * 2,
    marginTop: vh * 2,
    paddingHorizontal: vw * 2,
  },
  fieldContainer: {
    flex: 1,
    maxWidth: '48%',
    alignItems: 'flex-start',
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
    height: vh * 20,
    width: vw * 35,
    resizeMode: 'cover',
    backgroundColor: theme.colors.greyInput,
  },
  vehicleValue: {
    fontSize: vh * 1.9,
    marginTop: vh * 0.5,
    flexShrink: 1,
  },
  certificateImageContainer: {
    // ...appShadow,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingVertical: vh * 2,
    paddingHorizontal: vw * 2,
    borderRadius: vh * 2,
    marginTop: vh * 2,
  },
  documentItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: vw * 2,
  },
  documentLabel: {
    fontSize: vh * 1.6,
    color: theme.colors.black,
    marginBottom: vh * 1,
    textAlign: 'center',
  },
  pdfContainer: {
    // ...appShadow,
    borderRadius: vh * 2,
    overflow: 'hidden',
    backgroundColor: theme.colors.white,
  },
  pdfStyle: {
    height: vh * 20,
    width: vw * 35,
    borderRadius: vh * 2,
  },
  yesBtnStyle: {
    marginTop: vh * 3,
    marginVertical: vh * 0.5,
    width: vw * 85,
  },
  title: {
    textAlign: 'center',
    lineHeight: vh * 3,
    paddingTop: vh * 4,
  },
  noBtnStyle: {
    backgroundColor: theme.colors.white,
    marginVertical: vh * 1,
    width: vw * 85,
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
    width: vw * 86,
    marginTop: vh * 3,
    marginBottom: vh * 2,
  },
  text2style: {
    width: vw * 80,
    marginBottom: vh * 0.05,
  },
  registerButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: vh * 1.9,
    color: theme.colors.placeholder,
    marginBottom: vh * 1,
  },
  buttonStyle: {
    width: vw * 85,
    marginTop: vh * 2,
  },
  buttonText: {
    fontSize: vh * 1.85,
  },
});
