import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  redText: {
    fontSize: 2 * vh,
    lineHeight: 2.5 * vh,
    textAlign: 'center',
    width: vw * 85,
    marginTop: 1 * vh,
    // marginVertical: 2 * vh,
    color: theme.colors.red,
  },
  headingText: {
    fontSize: 4.5 * vh,
    marginVertical: 2 * vh,
    color: theme.colors.white,
  },
  grayText: {
    color: theme.colors.lightWhite,
    marginBottom: 3 * vh,
  },
  carImage: {
    height: 9 * vh,
    width: 70 * vw,
    resizeMode: 'contain',
    marginTop: 5 * vh,
  },
  forgotPassText: {
    fontSize: 2 * vh,
    color: theme.colors.red,
    // textAlign: 'right',
    // backgroundColor: 'red',
  },
  blueText: {
    fontSize: 2 * vh,
    color: theme.colors.red,
  },
  forgotPasswordContainer: {
    width: vw * 80,
    alignItems: 'flex-end',
  },
  buttonStyle: {
    marginVertical: 5 * vh,
  },
  text: {
    textAlign: 'center',
    fontSize: 2.2 * vh,
    color: theme.colors.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default styles;
