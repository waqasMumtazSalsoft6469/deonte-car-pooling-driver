import {StyleSheet} from 'react-native';
import {Fonts} from '../../../assets';
import theme from '../../../utils/theme';
import vh from '../../../utils/units/vh';

export default StyleSheet.create({
  text: {
    fontSize: vh * 2,
    color: theme.colors.black,
  },
  GilroyBold: {
    color: theme.colors.black,
    // fontFamily: Fonts.GB,
    fontSize: vh * 2,
  },
  GilroyLight: {
    color: theme.colors.black,
    // fontFamily: Fonts.GL,
    fontSize: vh * 2,
  },
  LemonBold: {
    color: theme.colors.black,
    // fontFamily: Fonts.LB,
    fontSize: vh * 2,
  },
  CalibryLight: {
    color: theme.colors.black,
    // fontFamily: Fonts.CL,
    fontSize: vh * 2,
  },
  neueHaasUnicaExtraBold: {
    color: theme.colors.black,
    // fontFamily: Fonts.NeueHaasUnica.ExtraBold,
  },
  neueHaasUnicaLight: {
    // fontFamily: Fonts.NeueHaasUnica.Light,
  },
  GilroyMedium: {
    color: theme.colors.black,
    // fontFamily: Fonts.GM,
    fontSize: vh * 2,
    // fontFamily: Fonts.NeueHaasUnica.Medium,
  },
  RobotoMedium: {
    color: theme.colors.black,
    // fontFamily: Fonts.RM,
    fontSize: vh * 2,
    // fontFamily: Fonts.NeueHaasUnica.Medium,
  },
  neueHaasUnicaRegular: {
    // fontFamily: Fonts.NeueHaasUnica.Regular,
  },
});
