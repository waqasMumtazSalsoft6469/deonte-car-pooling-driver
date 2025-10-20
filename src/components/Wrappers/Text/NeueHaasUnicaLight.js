import React from 'react';
import TextHOC from './TextHOC';
import styles from './style';

export default NeueHaasUnicaLight = props => {
  return (
    <TextHOC {...props} style={[styles.neueHaasUnicaLight, props?.style]}>
      {props.children}
    </TextHOC>
  );
};
