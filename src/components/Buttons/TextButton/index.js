import React from 'react';
import {colors} from '../../../utils/theme';
import vw from '../../../utils/units/vw';
import RippleHOC from '../../Wrappers/Ripple';
import NeueHaasUnicaRegular from '../../Wrappers/Text/GilroyRegular';
import styles from './styles';

const TextComponent = NeueHaasUnicaRegular;

export default TextButton = ({textColor, ...props}) => {
  const handleOnPress = async () => {
    if (props?.onPress) {
      props.onPress();
    }
  };

  return (
    <RippleHOC
      {...props}
      style={[styles.container, props?.style]}
      onPress={handleOnPress}>
      <TextComponent
        style={[
          styles.text,
          {
            color: props.style?.color ? props.style?.color : colors.white,
            fontSize: props?.style?.fontSize ? props.style?.fontSize : vw * 4,
          },
          props.textStyle,
        ]}>
        {props?.title}
      </TextComponent>
    </RippleHOC>
  );
};
