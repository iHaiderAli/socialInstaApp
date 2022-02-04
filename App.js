import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from 'react-redux'
import store from './store'
import { View, StatusBar } from 'react-native';

import * as constants from "./src/utils/AppConstants";
import { AppTexts, AppColors } from "./src/utils/DesignConstants";

import SplashScreen from "./src/components/SplashScreen";
import LoginScreen from "./src/components/LoginScreen";
import OTPVerificationScreen from "./src/components/OTPVerificationScreen";
import HomeScreen from "./src/components/HomeScreen";

const Stack = createStackNavigator();

function NavStack() {
  return (
    <Stack.Navigator
      initialRouteName={constants.SPLASH_SCREEN}
      screenOptions={{
        headerTitleAlign: AppTexts.centerText,
        headerStyle: {
          backgroundColor: AppColors.PRIMARY_COLOR,
        },
        headerTintColor: AppColors.COLOR_WHITE,
        headerTitleStyle: {
          fontWeight: '100',
        },
      }}>
        
      <Stack.Screen
        name={constants.SPLASH_SCREEN}
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={constants.LOGIN_SCREEN}
        component={LoginScreen}
        options={{ headerShown: false, title: constants.LOGIN_SCREEN_TITLE }}
      />
      <Stack.Screen
        name={constants.VERIFICATION_SCREEN}
        component={OTPVerificationScreen}
        options={{ title: constants.VERIFICATION_SCREEN_TITLE }}
      />
      <Stack.Screen
        name={constants.HOME_SCREEN}
        component={HomeScreen}
        options={{ headerShown: false, title: constants.HOME_SCREEN_TITLE }}
      />

    </Stack.Navigator>
  );
}

console.disableYellowBox = true;
const App: () => Node = () => {

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor='transparent' />
        <NavigationContainer>
          <NavStack />
        </NavigationContainer>
      </View>
    </Provider>
  );
};

export default App;
