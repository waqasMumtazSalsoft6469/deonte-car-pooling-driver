import {StyleSheet} from 'react-native';
import vh from '../../utils/units/vh';
import vw from '../../utils/units/vw';


export default styles = StyleSheet.create({
  modalTouchable: {
    backgroundColor: 'rgba(0,0,0,.5)',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: vh * 100,
    width: vw * 100,
  },
  check: {
    width: vw * 15,
    height: vh * 5,
    marginBottom: vh * 1,
  },
  cross: {
    width: vw * 5,
    height: vw * 5,
  },
  imageBg: {
    backgroundColor: 'white',
    borderTopRightRadius: 7 * vw,
    borderTopLeftRadius: 7 * vw,
    position: 'absolute',

    paddingBottom: vh * 4,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    bottom: 0,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 30 * vh,
    width: 100 * vw,
  },

  facebooktext: {
    color: '#333333',
    fontSize: vh * 1.7,
    textAlign: 'center',
  },
  crossContainer: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    paddingTop: vh * 1.5,
    paddingRight: vw * 3,
  },
  container: {
    paddingHorizontal: vw * 6,
    marginTop: 2 * vh,
  },
  text: {
    width: '95%',
    color: '#000000',
    fontSize: vh * 2.3,
  },
  request: {
    width: '45%',
    marginTop: vh * 2,
    backgroundColor: '#92278F',
  },
});