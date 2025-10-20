import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';
import vh from '../../utils/units/vh';
import vw from '../../utils/units/vw';

const styles = StyleSheet.create({
  container: {
    // height: 5 * vh,

    paddingLeft: 5 * vw,
    // paddingTop: 1 * vh,
    // paddingBottom: 1 * vh,
    paddingVertical: 1.5 * vh,
    justifyContent: 'center',
    // maxWidth: 80 * vw,
    width: 80 * vw,
    // backgroundColor: 'red'
  },
  sentMessage: {
    backgroundColor: theme.colors.primaryColor, //red
    borderTopRightRadius: 1 * vh,
    borderTopLeftRadius: 1 * vh,
    borderBottomLeftRadius: 1 * vh,
    // marginLeft: 5 * vw,
    // borderBottomRightRadius: 1 * vh,
    width: 65 * vw,
  },
  recievedMessage: {
    backgroundColor: theme.colors.gray3,
    borderTopRightRadius: 1 * vh,
    borderTopLeftRadius: 1 * vh,
    // borderBottomLeftRadius: 1 * vh,
    borderBottomRightRadius: 1 * vh,
    width: 65 * vw,
    marginRight: 22 * vw,
    // marginLeft: 5 * vw,
  },
  text: {
    color: theme.colors.white,
    fontSize: 1.8 * vh,
    marginRight: 3 * vw,
  },
  text2: {
    color: theme.colors.white,
    fontSize: 1.8 * vh,
    marginRight: 3 * vw,
  },
  time: {
    textAlign: 'right',
    marginRight: 2 * vw,
    marginBottom: 0.5 * vh,
    color: theme.colors.lightGray, //white
    fontSize: 1.8 * vh,
    marginTop: 1 * vh,
  },
  row: {
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // backgroundColor: 'blue',
    // marginVertical: 1 * vh,
    // flex: 1,
  },
  tick: {
    height: 2 * vh,
    width: 2 * vh,
    // backgroundColor: 'green',
    marginHorizontal: 1 * vw,
  },
});
export default styles;
