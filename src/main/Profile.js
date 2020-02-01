import React, {Component} from 'react';
import {Text, View, StyleSheet, ImageBackground} from 'react-native';
import {Card} from 'native-base';

export default class Profile extends Component {
  render() {
    return (
      <>
        <View style={styles.root}>
          <View style={styles.imageform}>
            <ImageBackground
              source={{
                uri:
                  'https://cache.desktopnexus.com/thumbseg/2291/2291845-bigthumbnail.jpg',
              }}
              style={styles.imageBackground}>
              <Text style={styles.name}>Carly Jachson</Text>
            </ImageBackground>
          </View>
          <View style={styles.menu}>
            <Card>
              <Text>Name : Carly Jachson</Text>
              <Text>Email : Carly Jachson</Text>
              <Text>Name : Carly Jachson</Text>
              <Text>Name : Carly Jachson</Text>
              <Text>Name : Carly Jachson</Text>
            </Card>
            <Card>
              <Text>Name : Carly Jachson</Text>
              <Text>Email : Carly Jachson</Text>
              <Text>Name : Carly Jachson</Text>
              <Text>Name : Carly Jachson</Text>
              <Text>Name : Carly Jachson</Text>
            </Card>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  imageform: {},
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 25,
    marginTop: 180,
    color: 'white',
    borderColor: 'gray',
  },
  imageBackground: {width: 360, height: 250},
  menu: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: -20,
  },
});
