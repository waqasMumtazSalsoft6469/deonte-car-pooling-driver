import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  nameText: {
    fontSize: vh * 2.3,
  },
  mapView: {
    height: '100%',
    width: '100%',
  },
  marker: {
    width: vh * 5,
    height: vh * 5,
    resizeMode: 'contain',
  },
  checkBtnIcon: {
    height: vh * 1.7,
    width: vh * 1.7,
  },
  text2style: {
    height: null,
    paddingTop: vh * 1,
    width: vw * 90,
  },
  CardContainer: {
    width: vw * 90,
    backgroundColor: theme.colors.white,
    position: 'absolute',
    top: vh * 12,
    borderRadius: vh * 2,
    alignItems: 'center',
    paddingVertical: vh * 2,
  },
  pauseBtn: {
    width: vw * 26,
    height: vh * 4,
    marginRight: vw * 13,
    marginVertical: 0,
    borderRadius: vh * 1.5,
    backgroundColor: theme.colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  pauseBtnText: {
    fontSize: vh * 1.5,
    color: theme.colors.white,
    paddingLeft: vh * 1,
  },
  // CardContainerfortrue: {

  //   width: vw * 90,
  //   backgroundColor: theme.colors.white,
  //   position: 'absolute',
  //   top: vh * 10,
  //   borderRadius: vh * 2,
  //   alignItems: 'center',
  //   paddingVertical: vh * 2,
  // },
  buttonText: {
    fontSize: vh * 2,
  },
  switchOn: {
    // backgroundColor: theme.colors.primaryColor,
    backgroundColor: theme.colors.gray,
    alignItems: 'flex-end',
    // paddingRight: 0.3 * vw,
  },
  purple: {
    backgroundColor: theme.colors.primaryColor,
  },
  grey: {
    backgroundColor: theme.colors.gray3,
  },
  switchOff: {
    backgroundColor: theme.colors.gray,
    alignItems: 'flex-start',
    // paddingLeft: 1 * vw,
  },
  switch: {
    width: 8 * vw,
    height: 1 * vh,
    padding: 10,
    borderRadius: 4.5 * vw,
    // marginHorizontal: 3 * vw,
    marginLeft: vw * 3,
    justifyContent: 'center',
  },
  whiteCircle: {
    backgroundColor: theme.colors.white,
    height: 2 * vh,
    width: 2 * vh,
    borderRadius: 1 * vh,
  },
  buttonStyle: {
    height: vh * 5.5,
    width: vw * 75,
  },
  switchContainer: {
    //   padding: vh*1,
    paddingHorizontal: vw * 6,

    //   flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: vw * 88,
    alignItems: 'center',
    //   backgroundColor: "red"
  },
  offlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noVehicleText: {
    marginTop: vh * 2.3,
    marginBottom: vh * 2.6,
    width: vw * 75,
    fontSize: vh * 1.8,
  },
});
