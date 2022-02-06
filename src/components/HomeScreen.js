import React from 'react';
import { Button, View, Text, BackHandler, Alert } from 'react-native';
import AppUtils from "../utils/AppUtils";
import * as constants from "../utils/AppConstants";
import { AppTexts, AppColors } from '../utils/DesignConstants';

import { createStackNavigator } from "@react-navigation/stack";

import TabOneScreen from "../components/bottom_tabs/TabOneScreen";
import TabTwoScreen from "../components/bottom_tabs/TabTwoScreen";
import DetailsScreen from "../components/bottom_tabs/TabThreeScreen";

import {
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

function Tab1Stack() {
  return (
    <Stack.Navigator
      initialRouteName="Tab1"
      // screenOptions={{
      //   headerTitleAlign: AppTexts.centerText,
      //   headerStyle: {
      //     backgroundColor: AppColors.PRIMARY_COLOR,
      //   },
      //   headerTintColor: AppColors.COLOR_WHITE,
      //   headerTitleStyle: {
      //     fontWeight: '100',
      //   },
      // }}>
      screenOptions={{
        headerStyle: { backgroundColor: AppColors.PRIMARY_COLOR },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
      <Stack.Screen
        name="Tab1"
        component={TabOneScreen}
        options={{ title: 'Home' }} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Details Page' }} />
    </Stack.Navigator>
  );
}

function Tab2Stack() {
  return (
    <Stack.Navigator
      initialRouteName="Tab2"
      screenOptions={{
        headerStyle: { backgroundColor: AppColors.PRIMARY_COLOR },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
      <Stack.Screen
        name="Tab2"
        component={TabTwoScreen}
        options={{ title: 'Missions' }} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Details Page' }} />
    </Stack.Navigator>
  );
}

function Tab3Stack() {
  return (
    <Stack.Navigator
      initialRouteName="Tab3"
      screenOptions={{
        headerStyle: { backgroundColor: AppColors.PRIMARY_COLOR },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
      <Stack.Screen
        name="Tab3"
        component={DetailsScreen}
        options={{ title: 'Settings' }} />

    </Stack.Navigator>
  );
}

class HomeScreen extends AppUtils {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Yes', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false });
    return true;
  }

  render() {
    // Access the postId and otherParam via Destructuring assignment
    // const { postDetail } = this.props.route.params;

    return (
      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarIconStyle: { display: "none" },
        tabBarLabelPosition: "beside-icon",
        tabBarLabelStyle: {
          fontWeight: "700",
          fontSize: 15
        }
      }}
        tabBarOptions={{
          activeTintColor: AppColors.PRIMARY_COLOR,
        }}>
        <Tab.Screen
          name="Home"
          component={Tab1Stack}
        />
        <Tab.Screen
          name="Missions"
          component={Tab2Stack}
        />
        <Tab.Screen
          name="Settings"
          component={Tab3Stack}
        />
      </Tab.Navigator>
    );
  }
}


export default HomeScreen;
