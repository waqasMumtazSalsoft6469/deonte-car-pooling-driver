import React from 'react';
import TextHOC from './TextHOC';
import styles from './style';

export default GilroyLight = props => {
  return (
    <TextHOC {...props} style={[styles.GilroyLight, props?.style]}>
      {props.children}
    </TextHOC>
  );
};
