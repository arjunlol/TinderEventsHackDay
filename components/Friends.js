import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

class Friends extends React.Component {


  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {replace} = this.props.navigation;
    return (
      <TouchableHighlight
        onPress={() => replace('Tinder')}>
        <Text> Which friend you going with? </Text>
      </TouchableHighlight>
    );
  }
}

export default Friends
