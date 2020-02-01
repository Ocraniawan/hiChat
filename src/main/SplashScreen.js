import React, {Component} from 'react';
import {View, ImageBackground, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  root: {backgroundColor: '#fff', flex: 1},
  home: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 300,
    height: 265,
  },
});

export default class App extends Component {
  static navigationOptions = {
    headerShown: null,
  };
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('LandingPage');
    }, 5000);
  }
  render() {
    return (
      <View style={styles.root}>
        <LinearGradient colors={['#3BB0BA', '#FBF5E5']} style={styles.home}>
          <ImageBackground
            source={require('../assets/splash.png')}
            style={styles.img}
          />
        </LinearGradient>
      </View>
    );
  }
}
