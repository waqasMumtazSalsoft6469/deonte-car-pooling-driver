import React, {useState, useImperativeHandle, forwardRef, useRef} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
// import { BlurView } from '@react-native-community/blur';
import theme from '../../utils/theme';
import vh from '../../utils/units/vh';
import vw from '../../utils/units/vw';
// import { vh, vw } from '../../units';

const PopupWrapper = props => {
  const [visible, setVisible] = useState(false);
  const popupRef = useRef();

  useImperativeHandle(props?.reference, () => ({
    hide: hide,
    show: show,
  }));

  const hide = onCancel => {
    setVisible(false);
    if (typeof onCancel === 'function') {
      onCancel();
    } else {
      if (props.onCancel) {
        props.onCancel();
      }
    }
  };
  const show = onShow => {
    setVisible(true);
    if (typeof onShow === 'function') {
      onShow();
    } else {
      if (props.onShow) {
        props.onShow();
      }
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      style={styles.modal}
      statusBarTranslucent={true}
      // ref={popupRef}
    >
      <View style={[styles.mainContainer, props.popupWrapperContainer]}>
        <TouchableOpacity
          onPress={props.dontHide ? null : hide}
          activeOpacity={0.9}
          style={styles.backdropContainer}>
          {/* <BlurView blurType="dark" style={styles.blur} /> */}
        </TouchableOpacity>
        <View style={[styles.contentContainer, props.contentContainerStyle]}>
          {props.children}
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  backdropContainer: {
    height: 100 * vh,
    width: 100 * vw,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  blur: {
    height: 100 * vh,
    width: 100 * vw,
  },
  contentContainer: {
    width: vw * 100,
    position: 'absolute',
  },
});
export default PopupWrapper;
