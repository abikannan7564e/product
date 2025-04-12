import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenNames from './src/constant/ScreenNames';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import BottomTabs from './src/navigations/BottomTabs';
import ProductDetails from './src/screens/ProductDetails';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BottomTabs" component={BottomTabs} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
})