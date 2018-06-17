import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'

const FriendItem = (props) => {
  return (
    <TouchableOpacity onPress={() => props.onSelect(props.myId, props.myName, props.friendId, props.friendName)}>
      <View>
        <Text>
          {props.friendName}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default FriendItem;

