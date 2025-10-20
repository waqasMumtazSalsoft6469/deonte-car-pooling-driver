import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';

export const styles = StyleSheet.create({
  container: {
    // flex:1,
    height: vh * 100,
    paddingTop: vh * 10,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  usernameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: vw * 65,
  },
  ratingContainer: {
    alignItems: 'flex-start',
    marginVertical: vh * 1,
  },
  profileImageContainer: {
    borderWidth: vh * 0.23,
    borderRadius: (vh * 8) / 2,
    height: vh * 8,
    width: vh * 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.primaryColor,
  },
  dateText: {
    color: theme.colors.dateColorBlack,
    fontSize: vh * 1.5,
  },
  headerContainer: {
    alignItems: 'center',
  },
  footerViewRating: {
    marginBottom: vh * 2,
  },
  userRatingDetails: {
    marginLeft: vw * 3,
  },
  userNameText: {
    fontSize: vh * 2,
    color: theme.colors.black,
  },
  userContainer: {
    flexDirection: 'row',
    width: vw * 90,
    marginTop: vh * 3,
    height: vh * 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: vh * 5,
    // marginBottom: vh*2
  },
  userIcon: {
    height: vh * 9.6,
    width: vh * 9.6,
    borderRadius: vh * 5,
    resizeMode: 'contain',
  },
  footerView: {
    marginBottom: vh * 20,
  },
  starRating: {
    marginBottom: vh * 2,
    // color: theme.colors.starYellow,
    // backgroundColor: theme.colors.starYellow,
  },
  reviewParaText: {
    fontSize: vh * 1.4,
    width: vw * 70,
  },
  starText: {
    color: theme.colors.lightBlack,
    // paddingBottom: vh*1
  },
  ratingText: {
    fontSize: vh * 4,
    color: theme.colors.starYellow,
    marginBottom: vh * 1,
    marginTop: vh * 2,
  },
  reviewsCountText: {
    marginTop: vh * 2,
    fontSize: vh * 1.5,
    marginBottom: vh * 2,
  },
  progressContainer: {
    marginVertical: vh * 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: vw * 85,
  },
  readMoreText: {
    color: theme.colors.purpleReadMore,
    textDecorationLine: 'underline',
    fontSize: vh * 1.6,
  },
});
