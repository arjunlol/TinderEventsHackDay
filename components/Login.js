import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import FBSDK, { LoginManager, LoginButton } from 'react-native-fbsdk';

class Login extends React.Component {


  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                alert("Login was successful with permissions: " + result.grantedPermissions)
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
      </View>
    );
  }
}

export default Login

