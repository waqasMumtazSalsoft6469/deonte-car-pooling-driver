import React from 'react';
import NeueHaasUnicaMedium from '../../Wrappers/Text/NeueHaasUnicaMedium';
import TouchableHOC from '../../Wrappers/Touchable';
import styles from './styles';

const TextComponent = NeueHaasUnicaMedium;

export default LinkButton = ({textColor, ...props}) => {
  const handleOnPress = () => {
    if (props?.onPress) {
      props.onPress();
    }
  };
  return (
    <TouchableHOC
      {...props}
      style={[styles.container, props.style]}
      onPress={handleOnPress}
      rippleOpacity={0}>
      <TextComponent style={[{color: textColor}, props?.style]}>
        {props?.title}
      </TextComponent>
    </TouchableHOC>
  );
};
