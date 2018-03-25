import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import FBSDK, { LoginManager, AccessToken, LoginButton, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

class FBLoginButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

    return (
      <View>
        <LoginButton
          publishPermissions={[]}
          readPermissions={['public_profile', 'user_friends']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                AccessToken.getCurrentAccessToken().then(
                (data) => {
                  this.props.saveToken(data.accessToken);
                })
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
      </View>
    );
  }
}

export default FBLoginButton

