/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/pages/Home';
import { ApiProvider } from './src/components/ApiProvider';

declare const global: {HermesInternal: null | {}};

const Stack = createStackNavigator();

const App = () => {

  StatusBar.setBarStyle("light-content");

  return (
    <>
      
      <SafeAreaView></SafeAreaView>
      <ApiProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} 
            options = {{
                  headerShown: false
              }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ApiProvider>
    </>
  );
};


export default App;
