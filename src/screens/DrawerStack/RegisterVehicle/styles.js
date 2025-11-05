import {StyleSheet} from 'react-native';
import theme, {appShadow, colors} from '../../../utils/theme';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: vh * 10,
  },
  carsImage: {
    height: vh * 19,
    width: vw * 89,
    resizeMode: 'contain',
  },
  chosenCross: {
    height: vh * 2,
    width: vh * 2,
    resizeMode: 'contain',
  },
  dropdownStyle: {
    width: vw * 100,
  },
  paraText: {
    fontSize: vh * 1.9,
    color: theme.colors.white,
    textAlign: 'center',
    marginTop: vh * 6,
  },
  text2Style: {
    height: null,
    fontSize: 1.7 * vh,
  },
  buttonStyle: {
    marginTop: vh * 2.5,
    height: vh * 6.1,
  },
  vehicleTypeContainer: {
    borderRadius: vw * 3,
    paddingVertical: vh * 1.8,
    paddingHorizontal: vw * 4,
    backgroundColor: theme.colors.gray,
  },
  vehicleTypeLabel: {
    paddingTop: vh * 2,
    color: theme.colors.black,
    paddingBottom: vh * 1,
    paddingLeft: vw * 4,
    width: vw * 80,
  },
  vehicleTypeText: {
    color: theme.colors.placeholder,
    fontSize: vh * 1.7,
  },
  step2Conatiner: {
    // flex:1,
    height: vh * 80,
    // alignItems: "center"
    justifyContent: 'center',
    // backgroundColor: "red"
  },
  buttonText: {
    fontSize: vh * 2,
  },
  uploadBox: {
    height: 12 * vh,
    backgroundColor: theme.colors.gray,
    borderRadius: 3 * vw,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2 * vh,
  },
  uploadIcon: {
    height: 3 * vh,
    width: 3 * vh,
    resizeMode: 'contain',
  },
  text2: {
    textAlign: 'center',
    fontSize: 2 * vh,
    lineHeight: 4 * vh,
    color: theme.colors.placeholder,
  },
  text3: {
    textAlign: 'center',
    fontSize: 1.6 * vh,
    color: theme.colors.placeholder,
  },
  backicon: {
    height: 1.2 * vh,
    resizeMode: 'contain',
    marginLeft: vw*4,
    width: 4.2 * vw,
    tintColor: theme.colors.white,
  },
});
