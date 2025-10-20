import {StyleSheet} from 'react-native';
import {vh} from '../../../utils/units/vh';
import {Fonts} from '../../../assets';
import {colors} from '../../../utils/theme';

export default styles = StyleSheet.create({
  textInput: {
    height: vh * 5.5,
    color: colors.placeholderColor,
    fontFamily: Fonts.SR,
  },
});
