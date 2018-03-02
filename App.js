import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Card from './components/Card';
import LikeBar from './components/LikeBar';
import Login from './components/Login';
import Tinder from './components/Tinder';
import Match from './components/Match';
import Friends from './components/Friends';
import NoEvents from './components/NoEvents';

import {StackNavigator} from 'react-navigation';

const AppWithNav = StackNavigator({
  Home: {screen: Login},
  Friends: {screen: Friends},
  Login: {screen: Login},
  Tinder: {screen: Tinder},
  Match: {screen: Match},
  NoEvents: {screen: NoEvents},
});

export default AppWithNav;

