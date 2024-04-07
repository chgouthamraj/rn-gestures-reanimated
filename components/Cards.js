import {StyleSheet, Text, View, Image, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withClamp,
  useDerivedValue,
  clamp,
  withDecay,
  cancelAnimation,
} from 'react-native-reanimated';
import CustomCard from './CustomCard';

const cards = [
  require('../assets/cards/Card-1.png'),
  require('../assets/cards/Card-2.png'),
  require('../assets/cards/Card-3.png'),
  require('../assets/cards/Card-4.png'),
  require('../assets/cards/Card-5.png'),
  require('../assets/cards/Card-6.png'),
  require('../assets/cards/Card-7.png'),
  require('../assets/cards/Card-8.png'),
  require('../assets/cards/Card-9.png'),
];

const CardsList = () => {
  const scrollY = useSharedValue(0);
  const [listHeight, setListHeight] = useState(0);
  const {height: screenHeigt} = useWindowDimensions();
  const maxScrollY = listHeight - screenHeigt;
  const activeCardIndex = useSharedValue(null);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      cancelAnimation(scrollY);
    })
    .onStart(() => {
      console.log('paning started');
    })
    .onChange(event => {
      scrollY.value = clamp(scrollY.value - event.changeY, 0, maxScrollY);
    })
    .onEnd(event => {
      scrollY.value = withClamp(
        {min: 0, max: maxScrollY},
        withDecay({velocity: -event.velocityY}),
      );
    });

  return (
    <GestureDetector gesture={panGesture}>
      <View
        style={{padding: 7}}
        onLayout={event => setListHeight(event.nativeEvent.layout.height)}>
        {cards.map((data, index) => {
          return (
            <CustomCard
              key={index}
              index={index}
              data={data}
              scrollY={scrollY}
              activeCardIndex={activeCardIndex}
            />
          );
        })}
      </View>
    </GestureDetector>
  );
};

export default CardsList;

const styles = StyleSheet.create({
  cardImg: {
    width: '100%',
    height: undefined,
    aspectRatio: 7 / 4,
    marginVertical: 5,
  },
});
