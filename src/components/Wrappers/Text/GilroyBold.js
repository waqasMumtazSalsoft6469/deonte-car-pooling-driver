import React from 'react';
import TextHOC from './TextHOC';
import styles from './style';

export default GilroyBold = props => {
  return (
    <TextHOC {...props} style={[styles.GilroyBold, props?.style]}>
      {props.children}
    </TextHOC>
  );
};
