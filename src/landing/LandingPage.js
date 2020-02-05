import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  StatusBar,
} from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FBF5E5',
  },
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 350,
    width: 350,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    alignSelf: 'center',
  },
  loginButton: {
    backgroundColor: '#3BB0BA',
  },
  registerButton: {
    backgroundColor: '#E88251',
  },
  loginText: {
    color: 'white',
  },
});

export default class LandingPage extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#075E54" />
        <View style={styles.root}>
          <View style={styles.top}>
            <Image
              source={require('../assets/login.png')}
              style={styles.image}
            />
            <View style={styles.form}>
              <TouchableHighlight
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={[styles.buttonContainer, styles.registerButton]}
                onPress={() => this.props.navigation.navigate('Register')}>
                <Text style={styles.loginText}>Register</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </>
    );
  }
}
