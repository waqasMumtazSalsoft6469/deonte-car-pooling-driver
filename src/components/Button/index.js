import React, {useState} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import {icons} from '../../assets';
import vw from '../../utils/units/vw';
import TextInputHOC from '../Wrappers/Input';
import styles from './styles';
import TextRegular from '../Wrappers/Text/GilroyRegular';
import theme from '../../utils/theme';
import Ripple from '../Wrappers/Ripple';
import TextBold from '../Wrappers/Text/GilroyBold';

const Button = props => {
  const handleOnPress = () => {
    if (props.onPress) {
      props.onPress();
    }
  };
  return (
    <Ripple style={[styles.container, props.style]} onPress={handleOnPress}>
      {props.image &&<Image source={icons.dustbin} style={styles.dustbin}/>}
      <TextBold style={[styles.text, props.textStyle]}>{props.text}</TextBold>
    </Ripple>
  );
};

export default Button;
