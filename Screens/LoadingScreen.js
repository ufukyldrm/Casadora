import React, {Component} from 'react';
import {View, Text} from 'react-native';
import LottieView from 'lottie-react-native';

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  animationball = () => {
    return (
      <LottieView
        style={{
          height: 400,
        }}
        source={require('../AniJsons/84272-loading-colour.json')}
        autoPlay
        loop
      />
    );
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          {this.animationball()}
        </View>
      </View>
    );
  }
}
