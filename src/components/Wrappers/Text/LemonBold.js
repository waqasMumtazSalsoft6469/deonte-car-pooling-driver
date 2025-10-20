import React from 'react';
import TextHOC from './TextHOC';
import styles from './style';

export default LemonBold = props => {
  return (
    <TextHOC {...props} style={[styles.LemonBold, props?.style]}>
      {props.children}
    </TextHOC>
  );
};
