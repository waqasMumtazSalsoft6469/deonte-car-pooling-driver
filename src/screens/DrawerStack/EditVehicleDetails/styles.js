import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    paddingHorizontal: 7 * vw,
    backgroundColor: theme.colors.white,
    // paddingTop: 10 * vh,
  },
  contentContainer: {
    paddingBottom: 5 * vh,
  },
  vehicleTypeLabel:{
    // color: theme.colors.white,
    paddingBottom: vh*1,
    paddingLeft: vw*4,
    // width: vw*80
    fontSize: vh*1.9,
    marginVertical: vh * 2
  },
  vehicleTypeText:{
    color: theme.colors.textBlack,
    fontSize: vh*1.7

  },
  upload:{
    width:  vw*86
  },
  headingText: {
    fontSize: 4.5 * vh,
    marginVertical: 2 * vh,
    color: theme.colors.white,
  },
  grayText: {
    color: theme.colors.lightWhite,
    // marginBottom: 3 * vh,
  },
  leftIcon:{
    height: vh*2,
    width: vw*2,
  },
  labelStyle:{
    color: theme.colors.textBlack
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
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  vehicleTypeContainer:{
    flexDirection: 'row',
    justifyContent: "space-between",
    // minHeight: 5 * vh,
    flexDirection: 'row',
    borderRadius: vw * 3,
    paddingHorizontal: vh*3,
    paddingVertical: vh*2,
    alignItems: 'center',

    // justifyContent: 'center',
    backgroundColor: theme.colors.gray,

  }
});

export default styles;
