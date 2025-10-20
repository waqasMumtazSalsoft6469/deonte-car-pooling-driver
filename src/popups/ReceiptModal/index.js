import React, {useRef, useImperativeHandle, forwardRef} from 'react';
import {Image, TouchableOpacity, View, Text} from 'react-native';
import PopupWrapper from '../PopupWrapper';

import {icons, images} from '../../assets';

import TextMedium from '../../components/Wrappers/Text/GilroyMedium';
import TextBold from '../../components/Wrappers/Text/GilroyBold';
import TextRegular from '../../components/Wrappers/Text/GilroyRegular';

import styles from './styles';
import TextButton from '../../components/Buttons/TextButton';
import ImageUpload from '../../components/ImageUpload';
import GilroyMedium from '../../components/Wrappers/Text/GilroyMedium';
import Ripple from '../../components/Wrappers/Ripple';
import Input from '../../components/Wrappers/Input';
import TextInputComponent from '../../components/TextInput';
import ImagePicker from '../../components/ImagePicker';
import Touchable from '../../components/Wrappers/Touchable';
import { image_url } from '../../Api/configs';
import vh from '../../utils/units/vw';
import vw from '../../utils/units/vw';
const statuses = ['Accepted', 'Pending', 'Rejected', 'Completed'];

const ReceiptModal = props => {
  let ReceiptModal = useRef(null);
  useImperativeHandle(props?.reference, () => ({
    hide: hide,
    show: show,
  }));

  const show = () => {
    ReceiptModal?.current?.show();
  };

  const hide = () => {
    ReceiptModal?.current?.hide();
    if (props.onHide) {
      props.onHide();
    }
  };

  const onYes = () => {
    if (props?.onAccept) {
      props?.onAccept();
    }

    hide();
  };

  return (
    <PopupWrapper
      reference={ReceiptModal}
      onCancel={() => {
        if (props.onHide) {
          props.onHide();
        }
      }}>
      <TouchableOpacity
        style={styles.crossCircle}
        onPress={() => hide()} // ReceiptModal.current.hide()
      >
        <Image
          source={icons.crossRed}
          style={styles.crossIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.mainContainer}>
        <View style={styles.innerContainer}>
          {props.text1 && (
            <TextBold style={styles.text1}>{props.text1}</TextBold>
          )}
          <View style={[styles.textContainer, props.textContainerStyle]}>
            {props.text2 && (
              <GilroyMedium style={[styles.text2, props.text2Style]}>
                {props.text2}
              </GilroyMedium>
            )}
         
            {props.input && (
              <View>
                <TextInputComponent
                  {...props}
                  title={props.titleInput}
                  labelStyle={styles.textInputTitleStyle}
                  leftIcon={props.inputIcon && icons.dollarSign}
                  dynamicWidth
                  textInputContainer={styles.input}
                  leftIconStyle={styles.leftIconStyle}
                  parentContainerStyle={styles.inputContainer}
                  keyboardType={props?.keyboardType}
                />
              </View>
            )}
               {props.imageUpload && (
                  <View>
                  <Touchable
                    style={styles.cameraContainerStyle}
                    onPress={() => props?.reference.current.show()} >
                  {props?.image?.uri ? <Image source={{uri : props?.image?.uri}} style={styles.selectedImageStyle} /> :   <Image source={images.uploadImage} style={styles.cameraIconStyle} />}
                  </Touchable>
                  <ImagePicker
                  ref={props?.reference}
                   handleOnSelectImage={props?.Picker}
                   selectionLimit={1}
                 />
                </View>
                  
                 
            )}
            {props.img && (
              <View>
                <Ripple style={styles.dustbinContainer}>
                  <Image source={icons.dustbin} style={styles.dustbinIcon} />
                </Ripple>
                <Image source={images.receipt} style={styles.recieptImage} />
              </View>
            )}
          </View>
          {props.button1Text && (
            <View style={[styles.buttonsContainer, props.buttonContainerStyle]}>
              {props.button1Text && (
                <TextButton
                  title={props.button1Text}
                  style={styles.button1}
                  onPress={() => {
                    if (props.onButton1Press) {
                      props.onButton1Press();
                    }
                    ReceiptModal.current.hide();
                  }}
                />
              )}
              {props.button2Text && (
                <TextButton
                  style={styles.addToCartButtonStyle}
                  textStyle={styles.addToCartButtonTextStyle}
                  title={props.button2Text}
                  onPress={() => {
                    if (props.onButton2Press) {
                      props.onButton2Press();
                    }
                    ReceiptModal.current.hide();
                  }}
                />
              )}
            </View>
          )}
        </View>
      </View>
    </PopupWrapper>
  );
};

export default ReceiptModal;
