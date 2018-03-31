import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import FriendItem from './FriendItem';

export default class Friends extends Component {

  onSelect = (myId, friendId) => {
    this.props.navigation.push('Tinder', {myId, friendId});
  }

  renderItem = ({item}) => (
    <FriendItem
      friendId={item.id}
      myId={this.props.myId}
      name={item.name}
      onSelect={this.onSelect}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.friends.data}
        renderItem={this.renderItem}
        keyExtractor={friend => friend.id}
      />
    );
  }
}
