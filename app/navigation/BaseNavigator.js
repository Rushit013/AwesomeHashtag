import React from 'react'
import { View } from 'react-native'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Dashboard from './../components/Dashboard';
import Maincategories from './../components/Maincategories';
import Subcategories from './../components/Subcategories';
import ListHashtag from './../components/ListHashtag';
import SelectedList from './../components/SelectedList';
import CollectionList from './../components/CollectionList';
import AboutSceen from './../components/AboutSceen';

const BaseNavigatorContainer = createStackNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: ({ navigation }) => ({
        title: 'Dashboard Screen',
        headerShown: false
      }),
    },
    Maincategories: {
      screen: Maincategories,
      navigationOptions: ({ navigation }) => ({
        title: 'Maincategories Screen',
        headerShown: false
      }),
    },
    Subcategories: {
      screen: Subcategories,
      navigationOptions: ({ navigation }) => ({
        title: 'Subcategories Screen',
        headerShown: false
      }),
    },
    ListHashtag: {
      screen: ListHashtag,
      navigationOptions: ({ navigation }) => ({
        title: 'ListHashtag Screen',
        headerShown: false
      }),
    },
    SelectedList: {
      screen: SelectedList,
      navigationOptions: ({ navigation }) => ({
        title: 'SelectedList Screen',
        headerShown: false
      }),
    },
    CollectionList: {
      screen: CollectionList,
      navigationOptions: ({ navigation }) => ({
        title: 'CollectionList Screen',
        headerShown: false
      }),
    },
    AboutSceen: {
      screen: AboutSceen,
      navigationOptions: ({ navigation }) => ({
        title: 'AboutSceen Screen',
        headerShown: false
      }),
    },
  },
  {
    mode: 'modal',
    headerMode: 'screen',
    initialRouteName: 'Dashboard',
  }
);

const AppContainer = createAppContainer(BaseNavigatorContainer);
export { AppContainer as BaseNavigator };