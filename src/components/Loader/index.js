import React, {Component} from 'react';
import {View, ActivityIndicator, Modal} from 'react-native';
import {connect} from 'react-redux';
import {BlurView} from '@react-native-community/blur';

import styles from './styles';
import theme, {colors} from '../../utils/theme';

class Loader extends Component {
  render() {
    return (
      <Modal transparent animationType="fade" visible={this.props.loading}>
        <View style={styles.modalContainer}>
          <View style={styles.blurBackground}>
            <BlurView
              style={styles.blurView}
              blurType="light"
              blurAmount={6}
              reducedTransparencyFallbackColor="white"
            />
          </View>
          <ActivityIndicator size="large" color={colors.primaryColor} />
        </View>
      </Modal>
    );
  }
}
const mapStatesToProps = state => {
  return {
    loading: state.GeneralReducer.loading,
  };
};

export default connect(mapStatesToProps, null, null, {forwardRef: true})(
  Loader,
);
