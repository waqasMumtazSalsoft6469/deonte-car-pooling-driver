import {useDrawerProgress, useDrawerStatus} from '@react-navigation/drawer';
import React,{useEffect} from 'react';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const DrawerScreenWrapper = props => {
  const isDrawerOpen = useDrawerStatus()
  const progress = useDrawerProgress();
  const sv = useSharedValue(0)
  // console.log("sv", sv);
  useEffect(() => {
    if(isDrawerOpen === 'open'){
      sv.value = withTiming(progress.value)
    }else{
      sv.value = withTiming(progress.value)
    }
  }, [progress, isDrawerOpen])
  // console.log("progress", progress.value);
  const screenStyle = useAnimatedStyle(() => {
    const scaleY = interpolate(sv.value, [0, 1], [1, 0.85], {
      extrapolateRight: Extrapolate.CLAMP
    }) 
    const borderRadius = interpolate(sv.value, [0, 1], [1, 20], {
      extrapolateRight: Extrapolate.CLAMP
    })
    return{
      transform: [
        {
          scaleY,
        },
      ],
      borderRadius,
    }
  })
  // const progress = useDrawerProgress();
  // // console.log("progress", progress);
  // const scale = Animated.interpolateNode(progress, {
  //   inputRange: [0, 1],
  //   outputRange: [1, 0.85],
  // });
  // const borderRadius = Animated.interpolateNode(progress, {
  //   inputRange: [0, 1],
  //   outputRange: [0, vw * 26],
  // });
  // const animatedStyle = {borderRadius, transform: [{scale}]};
  return (
    // <Animated.View style={{transform: [{scale}]}}>
    <Animated.View style={[{flex: 1, overflow: 'hidden'}, screenStyle]}>
      {props.children}
    </Animated.View>
    // </Animated.View>
  );
};
export default DrawerScreenWrapper;

