import React, {Component} from 'react';
import {Text, View, StyleSheet, ImageBackground} from 'react-native';
import {Card, ListItem, Item, Right, Body, Left} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
              <Text style={styles.name}>Victoria Odintcova</Text>
            </ImageBackground>
          </View>
          <View style={styles.menu}>
            <Card style={styles.card}>
              <ListItem style={styles.listItem}>
                <Icon name="account-card-details" style={styles.listLeft} />
                <Text style={styles.listBody}>Victoria Odintcova</Text>
              </ListItem>
              <ListItem style={styles.listItem}>
                <Icon name="contact-mail" style={styles.listLeft} />
                <Text style={styles.listBody}>victoriaodintcova@mail.com</Text>
              </ListItem>
            </Card>
          </View>
          {/* card bottom */}
          <View style={styles.menutwo}>
            <Card style={styles.cardtwo}>
              <ListItem style={styles.listItem2}>
                <Left>
                  <Icon name="settings-outline" style={styles.Left} />
                  <Text style={styles.Body}>Settings</Text>
                </Left>
                <Right>
                  <Icon
                    name="arrow-right-drop-circle-outline"
                    style={styles.Right}
                  />
                </Right>
              </ListItem>
              <ListItem style={styles.listItem2}>
                <Left>
                  <Icon name="map-marker-multiple" style={styles.Left} />
                  <Text style={styles.Body}>My Address</Text>
                </Left>
                <Right>
                  <Icon
                    name="arrow-right-drop-circle-outline"
                    style={styles.Right}
                  />
                </Right>
              </ListItem>
              <ListItem style={styles.listItem2}>
                <Left>
                  <Icon name="account-multiple" style={styles.Left} />
                  <Text style={styles.Body}>Account</Text>
                </Left>
                <Right>
                  <Icon
                    name="arrow-right-drop-circle-outline"
                    style={styles.Right}
                  />
                </Right>
              </ListItem>
              <ListItem style={styles.listItem2}>
                <Left>
                  <Icon name="folder-multiple-image" style={styles.Left} />
                  <Text style={styles.Body}>Photos</Text>
                </Left>
                <Right>
                  <Icon
                    name="arrow-right-drop-circle-outline"
                    style={styles.Right}
                  />
                </Right>
              </ListItem>
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
    backgroundColor: '#FBF5E5',
  },
  imageform: {},
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 25,
    marginTop: 140,
    color: 'white',
    borderColor: 'gray',
  },
  imageBackground: {width: 360, height: 250},
  menu: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: -50,
    marginBottom: 10,
  },
  menutwo: {
    marginLeft: 20,
    marginRight: 20,
  },
  card: {
    borderRadius: 15,
    elevation: 5,
    height: 120,
  },
  cardtwo: {
    borderRadius: 15,
    elevation: 5,
    height: 240,
    marginBottom: 50,
  },
  listItem: {
    height: 60,
    width: 280,
    justifyContent: 'space-between',
  },
  listItem2: {
    height: 60,
    width: 280,
    justifyContent: 'space-between',
  },
  listLeft: {
    color: '#3BB0BA',
    marginRight: 10,
    fontSize: 25,
  },
  listBody: {
    fontSize: 16,
    width: 250,
    fontWeight: 'bold',
    color: '#3BB0BA',
  },
  Left: {
    color: '#3BB0BA',
    fontSize: 25,
    marginRight: 20,
  },
  Body: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3BB0BA',
  },
  Right: {
    color: '#3BB0BA',
    fontSize: 25,
    marginLeft: 20,
  },
});
