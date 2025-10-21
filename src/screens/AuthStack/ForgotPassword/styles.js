import { StyleSheet } from 'react-native';
import theme, { colors } from '../../../utils/theme';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';
import { Fonts } from '../../../assets';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
  },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    // marginTop: 26 * vh,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
  },
  redText: {
    fontSize: 2 * vh,
    lineHeight: 2.5 * vh,
    marginTop: 1 * vh,
    // marginVertical: 2 * vh,
    color: theme.colors.red,
  },
  headingText: {
    fontSize: 4.5 * vh,
    marginVertical: 3 * vh,
    color: theme.colors.white,
  },
  grayText: {
    color: theme.colors.lightWhite,
    marginBottom: 3 * vh,
    fontFamily: Fonts.RB
  },
  carImage: {
    height: 12 * vh,
    width: 80 * vw,
    marginTop: 15 * vh,
  },
  forgotPassText: {
    fontSize: 2 * vh,
    color: theme.colors.primaryColor,
    textAlign: 'right',
    // backgroundColor: 'red',
  },
  blueText: {
    fontSize: 2 * vh,
    color: theme.colors.primaryColor,
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
  marginRight: {
    marginRight: 4 * vw,
  },
});

export default styles;
