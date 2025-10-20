import {StyleSheet} from 'react-native';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';
import theme, {colors} from '../../../utils/theme';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: vh * 20,
    // alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 5 * vw,
    borderTopRightRadius: 5 * vh,
    borderTopLeftRadius: 5 * vh,
    // paddingTop: 5 * vh,
    paddingBottom: 1 * vh,
    flex: 1,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1 * vh,
    marginLeft: 3 * vw,
  },
  textInputContainerStyle: {
    // width: 50 * vw,
  },
  inputContainerStyle: {
    width: 77 * vw,
    marginTop: 0 * vh,
    height: 6 * vh,
    backgroundColor: theme.colors.grayBorder,
  },
  // inputStyle: {
  //   // backgroundColor: 'red',
  //   marginLeft: 3 * vw,
  //   marginTop: 0 * vh,
  // },
  inputStyle: {
    backgroundColor: theme.colors.gray, //gray2
    width: 66 * vw,
    // height: 15 * vh,
  },
  rightIconStyle: {
    height: 3 * vh,
    width: 3 * vh,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // backgroundColor: 'red',
    // paddingBottom: 40 * vh,
  },
  sendButton: {
    // backgroundColor: 'blue',
    height: 6.5 * vh,
    width: 6.5 * vh,
    // marginLeft: 2 * vw,
    borderRadius: 1 * vh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    height: 3.5 * vh,
    width: 3.5 * vh,
  },
});

export default styles;
