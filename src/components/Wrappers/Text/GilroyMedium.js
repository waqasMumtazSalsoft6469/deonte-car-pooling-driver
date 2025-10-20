import React from 'react';
import TextHOC from './TextHOC';
import styles from './style';

export default GilroyMedium = props => {
  return (
    <TextHOC {...props} style={[styles.GilroyMedium, props?.style]}> 
      {props.children}
    </TextHOC>
  );
};
