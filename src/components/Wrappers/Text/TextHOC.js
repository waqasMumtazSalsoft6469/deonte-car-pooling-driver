import React from 'react';
import {Text} from 'react-native';
import styles from './style';

export default function TextHOC(props) {
  return (
    <Text
      {...props}
      style={[styles.text, props?.style]}
      ellipsizeMode="tail"
      adjustsFontSizeToFit={false}
      allowFontScaling={false}
      numberOfLines={props?.numberOfLines}
      >
      {props.children}
    </Text>
  );
}
