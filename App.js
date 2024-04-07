import {StyleSheet} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CardsList from './components/Cards';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <CardsList />
    </GestureHandlerRootView>
  );
};

export default App;
