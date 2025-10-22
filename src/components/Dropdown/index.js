import React from 'react';
import {View, TouchableOpacity, Animated, Dimensions, Text} from 'react-native';
// import {WheelPicker} from '../../libs/react-native-wheel-picker-android';
import {styles} from './styles';

export default class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      title: 'Pick an Item',
      selectedItem: 0,
      dataToShow: [],
      key: null,
    };
    this.onDone = null;
    this.onCancel = null;
    this.animatedBackdrop = new Animated.Value(0);
  }

  componentDidMount() {}
  animateIn = () => {
    Animated.timing(this.animatedBackdrop, {
      toValue: 100 * vh,
      duration: 300,
    }).start();
  };
  animateOut = () => {
    Animated.timing(this.animatedBackdrop, {
      toValue: 0 * vh,
      duration: 300,
    }).start();
  };
  show = (key, data, title, onSelect, onCancel, selectedIndex) => {
    this.onDone = onSelect ? onSelect : null;
    this.onCancel = onCancel ? onCancel : null;
    if (Array.isArray(data)) {
      if (data.length > 0) {
        let selected = selectedIndex
          ? selectedIndex
          : Math.floor(data.length / 2);
        let dataToShow = [];
        data.forEach(item => {
          if (key != null) {
            dataToShow.push(item[key]);
          } else {
            dataToShow.push(item);
          }
        });

        this.setState(
          p => {
            return {
              ...p,
              data: data,
              title: title,
              key: key,
              dataToShow: dataToShow,
              selectedItem: selected,
            };
          },
          () => {
            this.animateIn();
          },
        );
      }
    }
  };
  cancel = () => {
    this.animateOut();
    if (this.onCancel != null) {
      this.onCancel();
    }
    this.setState(
      p => {
        return {
          ...p,
          data: [],
          title: '',
          key: null,
          dataToShow: [],
          selectedItem: 0,
        };
      },
      () => {
        this.onDone = null;
        this.onCancel = null;
      },
    );
  };
  done = () => {
    this.animateOut();
    if (this.onDone != null) {
      this.onDone(this.state.data[this.state.selectedItem]);
    }
    this.setState(
      p => {
        return {
          ...p,
          data: [],
          title: '',
          key: '',
          dataToShow: [],
          selectedItem: 0,
        };
      },
      () => {
        this.onDone = null;
        this.onCancel = null;
      },
    );
  };
  onItemSelected = item => {
    this.setState(p => {
      return {
        ...p,
        selectedItem: item,
      };
    });
  };
  renderWheel = () => {
    if (this.state.dataToShow.length > 0) {
      return (
        <></>
        // <WheelPicker
        //   selectedItem={this.state.selectedItem}
        //   data={this.state.dataToShow}
        //   onItemSelected={this.onItemSelected}
        // />
      );
    } else {
      return null;
    }
  };
  render() {
    let animatedBackdropStyle = {
      height: this.animatedBackdrop,
    };
    let animatedContentContainerStyle = {
      height: Animated.multiply(this.animatedBackdrop, new Animated.Value(0.4)),
    };
    let animatedContainerButton = {
      height: Animated.multiply(this.animatedBackdrop, new Animated.Value(0.6)),
    };
    let animatedtitleBarStyle = {
      height: Animated.multiply(
        this.animatedBackdrop,
        new Animated.Value(0.07),
      ),
    };
    let animatedContainentStyle = {
      height: Animated.multiply(
        this.animatedBackdrop,
        new Animated.Value(0.33),
      ),
    };
    let animatedFont = {
      fontSize: Animated.multiply(
        this.animatedBackdrop,
        new Animated.Value(0.02),
      ),
    };
    return (
      <Animated.View
        activeOpacity={1}
        style={[styles.container, animatedBackdropStyle]}>
        <AnimatedTouchable
          onPress={this.cancel}
          style={[
            styles.backdropButton,
            animatedContainerButton,
          ]}></AnimatedTouchable>
        <Animated.View
          style={[styles.conetntContainer, animatedContentContainerStyle]}>
          <Animated.View style={[styles.titleBar, animatedtitleBarStyle]}>
            <TouchableOpacity
              onPress={this.cancel}
              style={styles.titleContainer}>
              <AmatedRegularText style={[styles.font, animatedFont]}>
                Cancel
              </AmatedRegularText>
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <AmatedRegularText style={[styles.font, animatedFont]}>
                {this.state.title}
              </AmatedRegularText>
            </View>
            <TouchableOpacity onPress={this.done} style={styles.titleContainer}>
              <AmatedRegularText style={[styles.font, animatedFont]}>
                Done
              </AmatedRegularText>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.conetnt, animatedContainentStyle]}>
            {this.renderWheel()}
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  }
}
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AmatedRegularText = Animated.createAnimatedComponent(Text);
const vh = Dimensions.get('window').height * 0.01;
