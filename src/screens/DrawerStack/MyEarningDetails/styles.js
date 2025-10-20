import {StyleSheet} from 'react-native';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';

import {Fonts} from '../../../assets';
import theme from '../../../utils/theme';

export const styles = StyleSheet.create({
  mapView:{
    height: vh*100,
    width: vw*100
  },
  container: {
    flex: 1,
    // backgroundColor: "red",
    // paddingTop: vh * 20,
  },
  amount:{
    fontSize: vh*1.8
  },
  cancelUserContainer:{
    alignItems: "center",
    marginVertical: vh*2
  },
  topUpText:{
    fontSize: vh*2.3
  },
  bottomContainer: {
    height: vh * 80,
    paddingVertical: vh * 2,
    paddingHorizontal: vw * 8,
    backgroundColor: theme.colors.white,
    // borderRadius: 0
  },
  starRating:{alignSelf: 'flex-start', marginVertical: vh * 0.5},
  cancelUserText: {
    fontSize: vh * 1.9,
    marginVertical: vh * 1,
    color: theme.colors.red,
  },
  reasonText: {
    marginBottom: vh * 1,
    // fontSize: vh*1.9
  },
  starStyle: {
    height: vh * 2,
    width: vh * 2,
    resizeMode: 'contain',
    marginLeft: vw * 1.5,
  },
  totalFairText: {
    color: theme.colors.GrayLine,
    fontSize: vh*1.7,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topUpText: {
    paddingLeft: vw * 4,
    fontSize: vh * 1.7,
  },
  rating: {
    marginVertical: vh * 2,
    alignSelf: 'flex-start',
  },
  ratingText: {
    marginTop: vh * 2,
  },
  TopupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: vh * 2,
  },
  reviewText: {
    // backgroundColor: "red"
    fontSize: vh * 1.7,
    paddingBottom: vh * 1,
  },
  totalFairContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vh*1
  },
  rating: {
    marginVertical: 1,
  },
  walletImage: {
    height: vh * 3,
    width: vh * 3,
    resizeMode: 'contain',
  },
  horizontalLine: {
    width: 80 * vw,
    // alignSelf: 'center',
    height: 0.45 * vh,
    // borderWidth: 1.5,
    borderRadius: 0.25 * vh,
    backgroundColor: theme.colors.gray,
    // marginBottom: 3 * vh,
    marginVertical: vh * 1,
  },

  row: {
    flexDirection: 'row',
    // marginHorizontal: 9 * vw,
    alignItems: 'center',
    // marginBottom: 2 * vh,
    // backgroundColor: 'blue',
  },
  driverDetails: {
    flex: 1,
    marginLeft: 2 * vw,
  },

  driverImage: {
    height: 8 * vh,
    width: 8 * vh,
    borderRadius: (vh * 8)/2
  },

  text: {

    color: theme.colors.textBlack,
    fontSize: 1.8 * vh,
    marginLeft: 2 * vw,
    // textAlign: 'center',
  },
  text3: {
    color: theme.colors.textBlack,
    fontSize: 2.8 * vh,
  },
  destinationMarkerStyle:{
    height: vh * 2,
    width: vw * 2,

  }
});

