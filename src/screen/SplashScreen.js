import React, {useEffect} from 'react';
import {View, ImageBackground, StyleSheet, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'react-native-firebase';
const {currentUser} = firebase.auth();

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

const SplashScreen = props => {
  useEffect(() => {
    setTimeout(() => {
      if (currentUser === null) {
        props.navigation.navigate('LandingPage');
      } else {
        props.navigation.navigate('Home');
      }
    }, 2000);
  }, [props.navigation]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#075E54" />
      <View style={styles.root}>
        <LinearGradient colors={['#3BB0BA', '#FBF5E5']} style={styles.home}>
          <ImageBackground
            source={require('../assets/splash.png')}
            style={styles.img}
          />
        </LinearGradient>
      </View>
    </>
  );
};

export default SplashScreen;
