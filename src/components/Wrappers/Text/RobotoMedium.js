import React from 'react';
import TextHOC from './TextHOC';
import styles from './style';

export default RobotoMedium = props => {
  return (
    <TextHOC {...props} style={[styles.RobotoMedium, props?.style]}>
      {props.children}
    </TextHOC>
  );
};
