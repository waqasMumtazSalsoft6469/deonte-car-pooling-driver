import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingHorizontal: 6 * vw,
    alignItems: "center",
    paddingTop: vh*3
  },
  addSongContainer:{
    flexDirection: "row",alignItems: "center",
    // marginVertical: vh*2
    marginBottom: vh*3
  },
  addSongText:{
    paddingLeft: vw*2,
    color: theme.colors.primaryColor
  },
  itemImage: {
    height: 7 * vh,
    width: 7 * vh,
    borderRadius: 1 * vh,
    marginRight: 2 * vw,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 1 * vh,
    marginVertical: 1 * vh,
  },
  button: {
    width: 27 * vw,
    height: 4.5 * vh,
    borderRadius: 3 * vh,
  },
  textStyle: {
    fontSize: 1.9 * vh,
  },
  horizontalLine2: {
    width: 88 * vw,
    flex: 1,
    alignSelf: 'center',
    height: 0.1 * vh,
    // borderWidth: 1.5,
    borderRadius: 0.25 * vh,
    backgroundColor: theme.colors.line,
    // marginTop: 3 * vh,
  },
  textMedium: {
    fontSize: 2.2 * vh,
  },
  text: {
    fontSize: 1.7 * vh,
  },
  grayText: {
    fontSize: 1.8 * vh,
    color: theme.colors.placeholder,
  },
  plusStyle:{
    height: vh*3,
    width: vh*3,
    resizeMode: "contain"
  }
});

export default styles;