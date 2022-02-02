import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from 'react-redux'
import store from './store'
import { View, StatusBar } from 'react-native';

import * as constants from "./src/utils/AppConstants";
import { AppTexts, AppColors } from "./src/utils/DesignConstants";

import Login from "./src/components/Login";
import Posts from "./src/components/Posts";
import PostDetails from "./src/components/PostDetails";

const Stack = createStackNavigator();

function NavStack() {
  return (
    <Stack.Navigator
      initialRouteName="auth"
      screenOptions={{
        headerTitleAlign: AppTexts.centerText,
        headerStyle: {
          backgroundColor: AppColors.PRIMARY_COLOR,
        },
        headerTintColor: AppColors.COLOR_WHITE,
        headerTitleStyle: {
          fontWeight: AppTexts.boldText,
        },
      }}
    >
      <Stack.Screen
        name={constants.LOGIN}
        component={Login}
        options={{ title: constants.LOGIN }}
      />
      <Stack.Screen
        name={constants.POSTS}
        component={Posts}
        options={{ title: constants.POSTS }}
      />
      <Stack.Screen
        name={constants.POSTS_DETAIL}
        component={PostDetails}
        options={{ title: constants.POSTS_DETAILS }}
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
