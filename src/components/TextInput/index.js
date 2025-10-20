import React, {useState, useRef, useImperativeHandle} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import {icons} from '../../assets';
import vw from '../../utils/units/vw';
import styles from './styles';
import theme, {appShadow} from '../../utils/theme';
import GilroyMedium from '../Wrappers/Text/GilroyMedium';

const TextInputComponent = props => {
  const [isShow, setIsShow] = useState(true);
  const inputRef = useRef(null);
  useImperativeHandle(props?.reference, () => ({
    focus: focus,
    blur: blur,
  }));
  const focus = () => {
    inputRef.current.focus();
  };
  const blur = () => {
    inputRef.current.blur();
  };
  const handlePassword = () => {
    setIsShow(!isShow);
  };
  return (
    <View style={[styles.container, props.parentContainerStyle]}>
      {props.title && (
        <GilroyMedium style={[styles.title, props.labelStyle]}>
          {props.title}
        </GilroyMedium>
      )}
      <View
        style={[
          props.dynamicWidth ? {minWidth: vw * 40} : {width: vw * 86},
          styles.inputContainer,
          props?.textInputContainer,
          !props.noShadow && appShadow,
        ]}>
        {props.leftIcon && (
          <Image
            source={props.leftIcon ? props.leftIcon : icons.arrowRight}
            style={[styles.leftIcon, props.leftIconStyle]}
            resizeMode="contain"
          />
        )}
        <TextInput
          ref={inputRef}
          placeholderTextColor={theme.colors.placeholder} //{'#181920'}
          style={[
            styles.input,
            props.leftIcon && {marginLeft: 2 * vw},
            props.inputStyle,
            props.multiline && {textAlignVertical: 'top'},
          ]}
          minHeight={
            Platform.OS === 'ios' && props.numberOfLines
              ? 20 * props.numberOfLines
              : null
          }
          placeholder={props.placeholder}
          multiline={props.multiline && props.multiline}
          numberOfLines={props.numberOfLines}
          editable={true}
          selectionColor={'red'}
          {...props}
          secureTextEntry={props.secureTextEntry && isShow}
          keyboardType={props?.keyboardType}
        />
        {props.rightView && props.rightView()}
        {props.secureTextEntry && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={handlePassword}>
            <Image
              source={isShow ? icons.eyeClosed : icons.eyeOpen}
              style={styles.rightIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        {props.rightIcon && (
          <Image
            source={props.rightIcon ? props.rightIcon : icons.circle}
            style={[styles.rightIcon, props.rightIconStyle]}
            resizeMode="contain"
          />
        )}
      </View>
    </View>
  );
};

export default TextInputComponent;
