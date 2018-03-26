import React, { Component } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  SegmentedControlIOS,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import FBLoginButton from './FBLoginButton';
import Friends from './Friends';
import * as Keychain from 'react-native-keychain';
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

export default class Auth extends Component {
  state = {
    accessToken: '',
    loadState: 'loading',
    friends: []
  };

  componentWillMount() {
    // reset access token to test
    // Keychain.resetGenericPassword();
    this.load();
  }

  render() {
    return (
      <View>
        {{
          loading: <Text>LOADING</Text>,
          login: <FBLoginButton saveToken={this.save.bind(this)} />,
          success: <Friends friends={this.state.friends} />,
          error: <Text>error</Text>
        }[this.state.loadState]}
      </View>
    );
  }

  async save(accessToken) {
    try {
      await Keychain.setGenericPassword(
        'accessToken',
        accessToken,
        { accessControl: Keychain.ACCESS_CONTROL.APPLICATION_PASSWORD }
      );
      this.setState({ accessToken: accessToken, loadState: 'loading' }, this.getFBData);
    } catch (err) {
      this.setState({ loadState: 'error' });
    }
  }

  async load() {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        this.setState({ accessToken: credentials.password, loadState: 'loading' }, this.getFBData)
      } else {
        this.setState({ loadState: 'login' });
      }
    } catch (err) {
      this.setState({ loadState: 'error' });
    }
  }

  getFBData() {
    const infoRequest = new GraphRequest(
      '/me',
      {
        accessToken: this.state.accessToken,
        parameters: {
          fields: {
            string: 'email, first_name, last_name, name, friends'
          }
        }
      },
      this.responseInfoCallback.bind(this)
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  responseInfoCallback(error, result) {
    if (error) {
      this.setState({loadState: 'error'})
    } else {
      this.setState({ ...result, loadState: 'success'})
    }
  }
}
