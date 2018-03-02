import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Card from './Card';
import LikeBar from './LikeBar';

class Tinder extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      events: [],
      loading: true,
      currentEvent: 0,
      eventsILike: [],
      eventsFriendsLike: [],
      matchEvent: null
    }
  }
  componentWillMount() {
  //  events should be object fml no time to change

    const ws = new WebSocket("ws://localhost:3000");
    ws.onopen = (e) => {
      console.log('Connected to server');
    }

    const send = (iLiked) => {
      ws.send(iLiked);
    }

    ws.onmessage = (friendLiked) => {
      console.log('this is freidns liked', friendLiked.data);
      console.log('this what i like', this.state.eventsILike)
      this.setState({
        eventsFriendsLike: [...this.state.eventsFriendsLike, friendLiked.data]
      })
     if(this.state.eventsILike.indexOf(friendLiked.data) >= 0) {
        this.state.events.forEach((event, index) => {
          if (event.id === friendLiked.data) {
            this.setState({matchEvent: index}, ()=> console.log('event match!'))
            this.props.navigation.push('Match', {event: this.state.events[index].name})
          }
        })
      }

    }

    this.socket = ws; //make globally accessible

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        }, this.fetchEvents);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    )
  }

  render() {
    if (this.state.loading) {
      return (
        <Text> Loading </Text>
      );
    }
    else {
      return (
        <View style={{flex:1}}>
          <Card
            name={this.state.events[this.state.currentEvent].name}
            pic={this.state.events[this.state.currentEvent].coverPicture}
            time={this.state.events[this.state.currentEvent].startTime}
            description={this.state.events[this.state.currentEvent].description}
          />
          <LikeBar
            onPressLikeButton={this.onPressLikeButton}
            onPressDislikeButton={this.onPressDislikeButton}
          />
        </View>
      );
    }
  }

  onPressLikeButton = () => {
    const idOfEvent = this.state.events[this.state.currentEvent].id;
    this.socket.send(idOfEvent)
    console.log('this i like', idOfEvent)
    console.log('thisi s what friends like', this.state.eventsFriendsLike)
    if(this.state.eventsFriendsLike.indexOf(idOfEvent) >= 0) {
      this.state.events.forEach((event, index) => {
        if (event.id === idOfEvent) {
          this.setState({matchEvent: index}, ()=> console.log('event match!'))
          this.props.navigation.push('Match', {event: this.state.events[index].name})
        }
      })
    }
    this.setState({
      currentEvent: this.state.currentEvent+1,
      eventsILike: [...this.state.eventsILike, idOfEvent]
    })
  }

  onPressDislikeButton = () => {
    console.log('events lenght', this.state.events.length)
    console.log('curren', this.state.currentEvent)
    if (this.state.events.length > this.state.currentEvent) {
      this.setState({
        currentEvent: this.state.currentEvent+1
      })
    } else {
      this.props.navigation.push('NoEvents')
    }
  }

  fetchEvents = () => {
    const fetchParams = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }};


    fetch(`http://localhost:3000/events?lat=${this.state.latitude}&lng=${this.state.longitude}`, fetchParams)
      .then((response) => {
        return response.json()
      }).then((data) => {
        this.setState({events: data.events}, () => {this.setState({loading: false}); console.log(this.state.events)})
      }).catch((error) => {
        this.setState({error: error.json()})
      })
  }
}

export default Tinder;
