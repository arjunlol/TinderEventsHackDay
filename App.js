import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Card from './components/Card';
import Auth from './components/Auth';
import LikeBar from './components/LikeBar';
import FBLoginButton from './components/FBLoginButton';
import Tinder from './components/Tinder';
import Match from './components/Match';
import Friends from './components/Friends';
import NoEvents from './components/NoEvents';

import {StackNavigator} from 'react-navigation';

const AppWithNav = StackNavigator({
  Home: {screen: Auth},
  Friends: {screen: Friends},
  Login: {screen: FBLoginButton},
  Tinder: {screen: Tinder},
  Match: {screen: Match},
  NoEvents: {screen: NoEvents},
});

export default AppWithNav;

