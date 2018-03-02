import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

class Match extends React.Component {


  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {replace} = this.props.navigation;
    return (
      <View>
        <Text>YOU BOTH WANT TO GO TO {this.props.navigation.state.params.event} </Text>
        <TouchableHighlight>
          <Text>BUY TICKET</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Match
