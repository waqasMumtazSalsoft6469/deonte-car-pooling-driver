import React from 'react';
import { Image, View } from 'react-native';
import RippleHOC from '../Wrappers/Ripple';
import styles from './style';

export default IconButton = ({customStyle, textColor, ...props }) => {
  const handleOnPress = () => {
    if (props?.onPress) {
      props.onPress();
    }
  };
  return (
    <RippleHOC
      {...props}
      style={[styles.container, props.style]}
      onPress={handleOnPress}>
      <View style={[styles.container,customStyle]}>
        <Image
          {...props}
          source={props?.icon}
          style={[styles.iconStyle, props.iconStyle]}
          resizeMode={props.resizeMode ? props.resizeMode : "cover"}
        />
      </View>
    </RippleHOC>
  );
};
