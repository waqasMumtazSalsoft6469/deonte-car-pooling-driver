import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';
import vh from '../../utils/units/vh';
import vw from '../../utils/units/vw';
// import { theme colors.} from '../../../Utils/appTheme';

const styles = StyleSheet.create({
  iconStyle: {
    height: vh * 2.5,
    width: vh * 2.5,
  },
  itemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vh * 2,
    marginHorizontal: vw * 7,
    borderBottomWidth: 1,
    borderColor: theme.colors.borderColorLight,
  },
  itemTitle: {
    color: theme.colors.textColor,
    fontSize: vh * 2.2,
    marginLeft: vw * 2,
  },
  crossCircle: {
    // height: vh * 2.5,
    // width: vh * 2.5,
    // borderRadius: (vh * 2.5) / 2,
    // backgroundColor: theme.colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 9999,
    right: vw * 4,
    top: vh * -0,
  },
  crossCircle2: {
    alignItems: 'flex-end',
    margin: 1.5 * vh,
  },
  crossIcon: {
    height: vh * 3.5,
    width: vh * 3.5,
    // tintColor: theme.colors.red,
  },

  //My Styles:
  mainContainer: {
    backgroundColor: 'white',
    borderRadius: 2 * vh, //5
    marginHorizontal: 5 * vw,
    paddingTop: 3 * vh,
  },
  innerContainer: {
    // paddingLeft: 5 * vw
    // marginVertical: vh * 0,
    // paddingTop: vh * 1,
    // backgroundColor: 'white',
    marginTop: -1 * vh,
    // marginBottom: 2 * vh,

    alignItems: 'center',
  },

  editIcon: {
    height: 2 * vh,
    width: 2 * vh,
  },
  mainIcon: {
    height: 15 * vh,
    width: 26 * vh,
    marginBottom: 2 * vh,
  },
  smallMainIconStyle: {
    height: 12 * vh,
    width: 12 * vh,
  },
  text1: {
    // color: theme.colors.green,
    color: theme.colors.black,
    fontSize: 2.3 * vh,
  },
  text2: {
    // color: theme.colors.purple,
    color: theme.colors.black,
    textAlign: 'center',
    fontSize: 2 * vh,
    height: 7 * vh,
    lineHeight: 2.5 * vh,
  },
  textLink: {
    color: theme.colors.red,
    textAlign: 'center',
    fontSize: 1.7 * vh,
    textDecorationLine: 'underline',
    // marginTop: 2 * vh
    marginBottom: 3 * vh,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginVertical: 4 * vh,
    // marginTop: 3 * vh,
    // marginBottom: 3 * vh,
  },
  button1: {
    flex: 1,
    backgroundColor: theme.colors.primaryColor,
    borderRadius: 0,
    borderBottomLeftRadius: 2 * vh,
  },
  addToCartButtonStyle: {
    backgroundColor: theme.colors.gray3, //#FCFDFD
    // borderWidth: 0.2 * vw,
    // borderColor: '#663398',
    // marginLeft: vw * 5,
    // width: 25 * vw,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 0,
    borderBottomRightRadius: 2 * vh,
    elevation: 5,
  },
  addToCartButtonTextStyle: {
    // color: '#663398'
    // color: theme.colors.black,
  },
  textContainer: {
    width: 65 * vw,
    // backgroundColor: 'red',
    alignItems: 'center',
    marginTop: 1 * vh,
    marginBottom: 3 * vh,
  },
  inputStyle: {
    // backgroundColor: theme.colors.white, //gray2
    width: 80 * vw,
    height: 15 * vh,
    alignItems: 'flex-start',
  },
  inputStyle2: {
    // textAlign: 'right',
  },
});

export default styles;
