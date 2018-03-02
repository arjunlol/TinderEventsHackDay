import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

class NoEvents extends React.Component {


  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Text>No MORE EVENTS</Text>
    );
  }
}

export default NoEvents
