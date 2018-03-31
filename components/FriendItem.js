import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'

const FriendItem = (props) => {
  return (
    <TouchableOpacity onPress={() => props.onSelect(props.myId, props.friendId)}>
      <View>
        <Text>
          {props.name}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default FriendItem;

