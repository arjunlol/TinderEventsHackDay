import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';

export default class Friends extends Component {

  render() {
    return (
      <FlatList
        data={this.props.friends.data}
        renderItem={({item}) => <Text>{item.name}</Text>}
        keyExtractor={friend => friend.id}
      />
    );
  }
}
