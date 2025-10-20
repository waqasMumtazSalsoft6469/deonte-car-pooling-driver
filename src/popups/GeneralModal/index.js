import React, {useRef, useImperativeHandle, forwardRef} from 'react';
import {Image, TouchableOpacity, View, Text} from 'react-native';
import { Rating } from 'react-native-ratings';
import PopupWrapper from '../PopupWrapper';

import {icons} from '../../assets';

import TextMedium from '../../components/Wrappers/Text/GilroyMedium';
import TextBold from '../../components/Wrappers/Text/GilroyBold';
import TextRegular from '../../components/Wrappers/Text/GilroyRegular';

import styles from './styles';
// import { vh, vw } from '../../units';
// import TextButton from '../../components/Button';
import TextButton from '../../components/Buttons/TextButton';
import vw from '../../utils/units/vw';
import vh from '../../utils/units/vh';
import theme from '../../utils/theme';
import GilroyBold from '../../components/Wrappers/Text/GilroyBold';

const statuses = ['Accepted', 'Pending', 'Rejected', 'Completed'];

const GeneralModal = props => {
  let GeneralModal = useRef(null);
  useImperativeHandle(props?.reference, () => ({
    hide: hide,
    show: show,
  }));

  const show = () => {
    GeneralModal?.current?.show();
  };

  const hide = () => {
    GeneralModal?.current?.hide();
    if (props.onHide) {
      props.onHide();
    }
    // if (props?.onHide) {
    //     props?.onHide()
    // }
  };

  const onYes = () => {
    if (props?.onAccept) {
      props?.onAccept();
    }

    hide();
  };


  return (
    <PopupWrapper
      reference={GeneralModal}
      onCancel={() => {
        if (props.onHide) {
          props.onHide();
        }
      }}>
      <TouchableOpacity
        style={styles.crossCircle}
        onPress={() => hide()} // GeneralModal.current.hide()
      >
        <Image
          source={icons.crossRed}
          style={styles.crossIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.mainContainer}>
        {/* <TouchableOpacity
          style={styles.crossCircle2}
          onPress={() => hide()} //GeneralModal.current.hide()
        >
          <Image
            source={icons.cross}
            style={styles.crossIcon}
            resizeMode="contain"
          />
        </TouchableOpacity> */}
        <View style={styles.innerContainer}>
          <Image
            source={props.icon ? props.icon : icons.alert}
            style={[
              styles.mainIcon,
              props.smallMainIconStyle && styles.smallMainIconStyle,
              props.mainIconStyle,
            ]}
            resizeMode={props.resizeMode ?? 'contain'}
          />
          {props.text1 && (
            <TextBold style={styles.text1}>{props.text1}</TextBold>
          )}
          <View style={[styles.textContainer, props.textContainerStyle]}>
            {props.text2 && (
              <TextBold style={[styles.text2, props.text2Style]}>
                {props.text2}
              </TextBold>
            )}
            {props.textAmount &&
            <GilroyBold style={styles.dollarText}>${props.textAmount}</GilroyBold>
            }
            {props.textLink && (
              <TouchableOpacity style={styles.a}>
                <TextRegular style={[styles.textLink, props.textLinkStyle]}>
                  {props.textLink}
                </TextRegular>
              </TouchableOpacity>
            )}
             {props.rating &&
          <Rating
          type="star"
          ratingCount={5}
          ratingImage={icons.starIcon}
          // ratingColor='#FFF'
          imageSize={vh * 3.9}
          // readonly={true}
          onFinishRating={props?.ratings}
          startingValue={0}
          style={styles.starRating}
          
      />
          }
          </View>
         
          {props.button1Text && (
            <View style={[styles.buttonsContainer, props.buttonContainerStyle]}>
              {props.button1Text && (
                <TextButton
                  title={props.button1Text}
                  style={[styles.button1,props.button1Style]} //width: 25 * vw //marginTop: vh * 4,
                  onPress={() => {
                    if (props.onButton1Press) {
                      props.onButton1Press();
                    }
                    GeneralModal.current.hide();
                  }} //navigation.navigate('Payment')
                />
              )}
              {/* <TextButton
                            title="Yes"
                            style={{ width: 25 * vw, marginLeft: 5 * vw }} //marginTop: vh * 4,
                            onPress={() => navigation.navigate('Payment')}
                        /> */}
              {props.button2Text && (
                <TextButton
                  style={styles.addToCartButtonStyle}
                  textStyle={styles.addToCartButtonTextStyle}
                  title={props.button2Text}
                  onPress={() => {
                    if (props.onButton2Press) {
                      props.onButton2Press();
                    }
                    GeneralModal.current.hide();
                  }}
                  // onPress={() => navigation.navigate('ResetPasword')}
                />
              )}
            </View>
          )}
        </View>
      </View>
    </PopupWrapper>
  );
};

export default GeneralModal;
