import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import FriendItem from './FriendItem';

export default class Friends extends Component {

  onSelect = (myId, myName, friendId, friendName) => {
    this.props.navigation.push('Tinder', {myId, myName, friendId, friendName});
  }

  renderItem = ({item}) => (
    <FriendItem
      friendId={item.id}
      myId={this.props.myId}
      friendName={item.name}
      myName={this.props.myName}
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
