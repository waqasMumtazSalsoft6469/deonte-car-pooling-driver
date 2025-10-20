import {StyleSheet} from 'react-native';
import theme, {colors} from '../../utils/theme';
import vh from '../../utils/units/vh';
import vw from '../../utils/units/vw';

const styles = StyleSheet.create({
  parentContainer: {
    paddingVertical: 2 * vh,
    marginVertical: 1 * vh,
    backgroundColor: 'white',
    // flex: 1,
    // width: 80 * vw,
    // height: 15 * vh,
  },
  dateAndTimeContainer: {
    borderRadius: 2 * vh,
    borderWidth: 2,
    padding: 0.5 * vh,
    paddingHorizontal: 1 * vh,
    borderColor: theme.colors.primaryColor,
    backgroundColor: 'white',
    // flex: 1,
    // marginBottom: -2 * vh,
    width: 43 * vw,
    alignSelf: 'flex-end',
    // height: 10 * vh,
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // left: 0,
    // bottom: 2,
    marginTop: -2 * vh,
  },
  mainContainer: {
    backgroundColor: theme.colors.gray,
    // alignItems: 'flex-end',
    // paddingVertical: 2 * vh,
    // paddingHorizontal: 4 * vw,
    // flex: 1,
    width: 80 * vw,
    borderRadius: 2 * vh,
    paddingBottom: 2 * vh,
    // alignItems: 'center'
    // justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  carContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  car: {
    tintColor: colors.primaryColor,
    height: 7 * vh,
    width: 10 * vh,
    marginRight: 4 * vw,
  },
  priceText: {
    fontSize: 3 * vh,
  },
});

export default styles;
