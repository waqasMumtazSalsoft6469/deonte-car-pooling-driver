import React from 'react';
import TextHOC from './TextHOC';
import styles from './style';

export default CalibryLight = props => {
  return (
    <TextHOC {...props} style={[styles.CalibryLight, props?.style]}>
      {props.children}
    </TextHOC>
  );
};
