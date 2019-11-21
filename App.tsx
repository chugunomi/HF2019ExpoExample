import React from 'react';
import { Text } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Screens, { ScreenNames } from '@/Screens';
import AppHeader from '@/components/AppHeader';

const AppNavigator = createStackNavigator(
  {
    [ScreenNames.Home]: {
      screen: Screens.Home,
    },
    [ScreenNames.Camera]: {
      screen: Screens.Camera,
    }
  },
  {
    defaultNavigationOptions: {
      header: (props) => <AppHeader navigation={props.navigation} />
    },
  }
);

export default createAppContainer(AppNavigator);