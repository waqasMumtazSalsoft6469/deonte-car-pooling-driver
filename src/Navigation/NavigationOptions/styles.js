import { StyleSheet } from 'react-native';
import vw from '../../utils/units/vw';
import vh from '../../utils/units/vh';
import { Fonts } from '../../assets';
import theme, { appShadow } from '../../utils/theme';
export default styles = StyleSheet.create({
  tab: {
    height: 8 * vh,
    backgroundColor: '#fff',
    // elevation: 7,
    // marginVertical: 0.4 * vh,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.4,
    // shadowRadius: 3.84,
  },
  titleStyle: {
    color: theme.colors.white
  },
  crossBtn: {
    height: vh * 2,
    width: vh * 2,
    resizeMode: "contain", marginLeft: vw * 2,
    tintColor: theme.colors.black,
  },
  imageContainer: {
    height: vh * 4,
    width: vw * 8,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: vw * 4,
    ...appShadow
  },
  buttonsContainer: {
    width: 40 * vw,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 0.5 * vh,
  },
  headerButtons: {
    height: 1.2 * vh,
    resizeMode: "contain",
    width: 4.2 * vw,
    tintColor: theme.colors.white
  },
  headerButtonsBlack: {
    height: 1.2 * vh,
    resizeMode: "contain",
    width: 4.2 * vw,
    tintColor: theme.colors.black,
  },
  headerNotificationButtons: {
    height: 2.3 * vh,
    width: 2.3 * vh,
    tintColor: theme.colors.black, //white
    marginRight: vw * 4
  },
  indicatorContainerStyle: {
    padding: 0,
    margin: 0,
    height: 9 * vh,
    marginTop: 1 * vh,
    borderRadius: 2 * vw,
  },
  indicatorStyle: {
    backgroundColor: '#FFF',
    height: 9 * vh,
    // bottom : 0.1 * vh,
    margin: 0,
    padding: 0,
  },
  tabLabel: {
    fontFamily: Fonts.GM,
    fontSize: 1.7 * vh,
  },
  tabIcon: {
    // padding: 0,
    // margin: 0,
    width: 16 * vw,
    height: 4.9 * vh,
  },
  tabStyle: {
    justifyContent: 'center',
    height: 8 * vh,
    paddingTop: 1 * vh,
    borderTopRightRadius: 8 * vw,
    borderTopLeftRadius: 8 * vw,
  },
  homeTab: {
    marginBottom: 2 * vh,
    height: 6 * vh,
    elevation: 0,
    // alignItems:"center"
    // justifyContent:"center"
  },
  homeHeaderStyle: {
    backgroundColor: theme.colors.primaryColor,
    height: 12 * vh,
    shadowColor: 'transparent',
    elevation: 0,
    borderBottomEndRadius: 0 * vw,
  },
  tabButtonContainer: {
    height: 8 * vh,
    width: 20 * vw,
    margin: 0,
    padding: 0,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonIcon: {
    height: 3.5 * vh,
    width: 20 * vh,
    resizeMode: 'contain',
  },
  tabButtonLabel: {
    fontSize: 2 * vh,
  },
  drawerStyles: { flex: 1, width: '60%', backgroundColor: 'transparent' },
  drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
  drawerLabel: { color: 'white', marginLeft: -16 },
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
  },
  DrawerScrollView: {
    flex: 1,
    paddingLeft: vw * 3,
  },
  redSpot: {
    position: 'absolute',
    bottom: '0%',
    left: '0%',
    width: vw * 30.2,
    height: vh * 12,
  },
  drawerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh * 4,
  },
  bgStyle: {
    width: 100 * vw,
    height: 100 * vh,
    resizeMode: 'stretch',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  outerStyle: {
    flex: 1,
    // shadowColor: '#7A7A7A',
    // shadowOffset: {
    //     width: 0,
    //     height: 5,
    // },
    // shadowOpacity: 0.16,
    // shadowRadius: 10,
    // elevation: 5,
    // overflow: 'visible',
  },
  stack: {
    flex: 1,
    // height: 100 * vh,
    // width: 100 * vw,
    zIndex: 999,
    overflow: 'hidden',
    // overflow: 'scroll',
    // borderWidth: 1,
  },
  watermark: {
    width: 100 * vw,
    height: 75 * vh,
    resizeMode: 'stretch',
    position: 'absolute',
    bottom: -3 * vh,
  },
  userImage: {
    width: 9 * vh,
    height: 9 * vh,
    borderRadius: 4.5 * vh,
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
  userDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4 * vw,
    marginTop: 4 * vh,
  },
  username: {
    color: theme.colors.white,
    fontSize: 1.8 * vh,
  },
  subHeading: {
    color: theme.colors.white,
    fontSize: 1.5 * vh,
  },
  optionLabel: {
    color: theme.colors.white,

    fontSize: 2.1 * vh,
    left: -1.5 * vw,

    //   marginLeft:5*vw
  },
  optionImg: {
    width: 2.5 * vh,
    height: 2.6 * vh,
    resizeMode: 'contain',
  },
  optionContainer: { marginTop: vh * 7 },
  option: {
    justifyContent: 'center',
    height: vh * 6,
    width: 56 * vw,
  },
  imageSnapshot1: {
    width: 75 * vw,
    height: 75 * vh,
    resizeMode: 'cover',
    // backgroundColor:'red',
    // right: -45 * vw,
    // bottom: 0 * vh,
    position: 'absolute',
    // transform:[{scaleX:0.65},{scaleY:0.65}],
    // borderRadius: 20 * vw,
    top: 10 * vh,
    left: -0 * vw,
    borderRadius: 6 * vw,
    opacity: 0.9,
  },
  imageSnapshot1View: {
    right: -45 * vw,
    top: 18 * vh,
    position: 'absolute',
    borderRadius: 8 * vw,
    overflow: 'hidden',
  },
  imageSnapshot2: {
    width: 68 * vw,
    height: 68 * vh,
    resizeMode: 'cover',
    // backgroundColor:'green',
    // right: -45 * vw,
    // bottom: 0 * vh,
    position: 'absolute',
    // transform:[{scaleX:0.65},{scaleY:0.65}],
    // borderRadius: 20 * vw,
    top: 13 * vh,
    left: -8 * vw,
    borderRadius: 6 * vw,
    opacity: 0.6,
  },
  headerImg: {
    width: 100 * vw,
    height: 18 * vh,
    resizeMode: 'cover',
  },
  headerBgContainer: {
    borderBottomLeftRadius: 6 * vw,
    borderBottomRightRadius: 6 * vw,
    overflow: 'hidden',
    backgroundColor: '#F7F7F7',
  },
});