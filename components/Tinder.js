import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Card from './Card';
import LikeBar from './LikeBar';

const EVENTS_LIMIT = 10;

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
      matchEvent: null
    }
  }
  componentWillMount() {
    const ws = new WebSocket("ws://localhost:3000");
    ws.onopen = (e) => {
      const connectViewer = {
        type: "connectViewer",
        payload: {
          viewerId: this.props.navigation.state.params.myId
        }
      }
      ws.send(JSON.stringify(connectViewer));
    }


    ws.onmessage = (friendLiked) => {

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
            name={this.state.events[this.state.currentEvent].title}
            pic={this.state.events[this.state.currentEvent].cover_photo_url}
            time={this.state.events[this.state.currentEvent].start_time}
            description={this.state.events[this.state.currentEvent].description}
          />
          <LikeBar
            id={this.state.events[this.state.currentEvent].source_id}
            onPressLikeButton={this.onPressLikeButton}
            onPressDislikeButton={this.onPressDislikeButton}
          />
        </View>
      );
    }
  }

  onPressLikeButton = (eventId) => {
    let eventLike = {
      type: "eventLike",
      payload: {
        friendName: this.props.navigation.state.params.friendName,
        friendId: this.props.navigation.state.params.friendId,
        viewerName: this.props.navigation.state.params.myName,
        eventId,
      }
    }
    console.log('likevent', eventLike);
    this.socket.send(JSON.stringify(eventLike));

    this.setState({
      currentEvent: this.state.currentEvent+1
    });
    if (this.state.currentEvent % 10 === 8) {
      this.fetchEvents(this.state.currentEvent+2);
    }
  }

  onPressDislikeButton = () => {
    console.log('events lenght', this.state.events.length)
    console.log('curren', this.state.currentEvent)
    this.setState({
      currentEvent: this.state.currentEvent+1
    });
    if (this.state.currentEvent % 10 === 8) {
      this.fetchEvents(this.state.currentEvent+2);
    }
  }

  fetchEvents = (offset = 0) => {
    const fetchParams = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }};
    console.log(offset);
    console.log(`https://discover.universe.com/api/v2/discover_events?distance=200&latitude=${this.state.latitude}&limit=${EVENTS_LIMIT}&locale=en&longitude=${this.state.longitude}&offset=${offset}`);
    fetch(`https://discover.universe.com/api/v2/discover_events?distance=200&latitude=${this.state.latitude}&limit=${EVENTS_LIMIT}&locale=en&longitude=${this.state.longitude}&offset=${offset}`, fetchParams)
      .then((response) => {
        console.log('response', response);
        return response.json()
      }).then((data) => {
        console.log('data', data);
        console.log([...this.state.events, ...data.discover_events]);
        this.setState({events: [...this.state.events, ...data.discover_events]}, () => {this.setState({loading: false}); console.log(this.state.events)})
      }).catch((error) => {
        this.setState({error: error.json()})
      })
  }
}

export default Tinder;
