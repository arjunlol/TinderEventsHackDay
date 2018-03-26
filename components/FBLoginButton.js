import React from 'react';
import { View } from 'react-native';
import FBSDK, { LoginManager, AccessToken, LoginButton } from 'react-native-fbsdk';



const FBLoginButton = (props) => {
  return (
    <View>
      <LoginButton
        publishPermissions={[]}
        readPermissions={['public_profile', 'user_friends']}
        onLoginFinished={
          (error, result) => {
            if (error) {
              // TODO: handle error
              alert("Login failed with error: " + result.error);
            } else if (result.isCancelled) {
              alert("Login was cancelled");
            } else {
              AccessToken.getCurrentAccessToken().then(
              (data) => {
                props.saveToken(data.accessToken);
              })
            }
          }
        }
        onLogoutFinished={() => alert("User logged out")}/>
    </View>
  );
}

export default FBLoginButton

