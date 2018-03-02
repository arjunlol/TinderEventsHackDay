import React, {Component} from 'react'
import {StyleSheet, TouchableHighlight, View, Text} from 'react-native'

const LikeBar = (props) => {
  return (
    <View style={styles.likeBar}>
      <TouchableHighlight
        onPress={props.onPressDislikeButton}>
        <Text> NAH </Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={props.onPressLikeButton}>
        <Text> WANT TO GO! </Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  likeBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

export default LikeBar;
