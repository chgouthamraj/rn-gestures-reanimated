import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  clamp,
  useAnimatedReaction,
  withTiming,
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';

const CustomCard = ({scrollY, data, index, activeCardIndex}) => {
  const [cardHeight, setCradHeight] = useState(0);
  const translateY = useSharedValue(0);
  const {height: screenHeigt} = useWindowDimensions();
  //   const translateY = useDerivedValue(() =>
  //     clamp(-scrollY.value, -index * cardHeight, 0),
  //   );

  useAnimatedReaction(
    () => {
      return scrollY.value;
    },
    (current, previous) => {
      translateY.value = clamp(-current, -index * cardHeight, 0);
    },
  );

  useAnimatedReaction(
    () => activeCardIndex.value,
    (current, previous) => {
      if (current === previous) {
        return;
      }
      console.log('>>>change active card<<<');

      //no card selected move to list view
      if (activeCardIndex.value === null) {
        translateY.value = withTiming(clamp(-current, -index * cardHeight, 0), {
          duration: 500,
        });
      } else if (activeCardIndex.value === index) {
        translateY.value = withTiming(-index * cardHeight);
      } else {
        // another card is active ,move to the bottom
        translateY.value = withTiming(
          -index * cardHeight * 0.9 + screenHeigt * 0.7,
          {duration: 500},
        );
      }
    },
  );

  const tap = Gesture.Tap().onEnd(() => {
    if (activeCardIndex.value === null) {
      activeCardIndex.value = index;
    } else {
      activeCardIndex.value = null;
    }
  });

  return (
    <GestureDetector gesture={tap}>
      <Animated.Image
        onLayout={event => setCradHeight(event.nativeEvent.layout.height)}
        source={data}
        style={{
          width: '100%',
          height: undefined,
          aspectRatio: 7 / 4,
          marginVertical: 5,

          transform: [
            {
              translateY: translateY,
            },
          ],
        }}
      />
    </GestureDetector>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  cardImg: {
    width: '100%',
    height: undefined,
    aspectRatio: 7 / 4,
    marginVertical: 5,
  },
});
