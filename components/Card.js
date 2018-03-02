import React, {Component} from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'

const Card = (props) => {
  console.log(props.pic)
  return (
    <View style={styles.card}>
      <Image
        style={{flex:1}}
        source={{uri: props.pic}}
      />
      <View style={{margin:20}}>
        <Text style={{fontSize:20}}>{props.name}</Text>
        <Text style={{fontSize:15, color: 'darkgrey'}}>{props.time}</Text>
        <Text>{props.description.substring(0, 100) + "..."}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 5,
    backgroundColor: 'white',
    overflow: 'hidden',
    margin: 10,
    borderColor: 'lightgrey',
    marginTop: 100,
    borderWidth: 1,
    borderRadius: 8,
  },
});


export default Card;
