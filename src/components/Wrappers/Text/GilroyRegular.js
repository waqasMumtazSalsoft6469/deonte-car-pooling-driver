import React from 'react';
import TextHOC from './TextHOC';
import styles from './style';

export default GilroyRegular = props => {
  return (
    <TextHOC {...props} style={[styles.GilroyRegular, props?.style]}>
      {props.children}
    </TextHOC>
  );
};
