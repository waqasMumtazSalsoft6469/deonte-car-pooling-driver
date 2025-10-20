import React from 'react';
import {TextInput} from 'react-native';
import {colors} from '../../../utils/theme';
import styles from './style';

export default TextInputHOC = props => {
  return (
    <TextInput
      style={[styles.textInput, props?.style]}
      placeholderTextColor={colors.black}
      underlineColorAndroid="rgba(0,0,0,0)"
      autoCapitalize="none"
      {...props}
    />
  );
};
