import React from 'react';
import TextHOC from './TextHOC';
import styles from './style';

export default NeueHaasUnicaBold = props => {
  return (
    <TextHOC {...props} style={[styles.neueHaasUnicaExtraBold, props?.style]}>
      {props.children}
    </TextHOC>
  );
};
