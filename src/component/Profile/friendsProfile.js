import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Card, ListItem, Item, Right, Body, Left} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'react-native-firebase';
// import LinearGradient from 'react-native-linear-gradient';
// import AsyncStorage from '@react-native-community/async-storage';
// import ImagePicker from 'react-native-image-picker';
// import RNFetchBlob from 'react-native-fetch-blob';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: this.props.navigation.getParam('item'),
    };
  }

  // componentDidMount = async () => {
  //   const id = firebase.auth().currentUser.uid;
  //   const db = firebase.database().ref('users/' + id);
  //   db.once('value').then(data => {
  //     // data.val() is the dictionary with all your keys/values from the '/store' path
  //     const item = data.val();
  //     this.setState({
  //       name: item.fullname,
  //       email: item.email,
  //       photo: item.photo,
  //     });
  //   });
  // };

  render() {
    // const {email, name, photo} = this.state;
    return (
      <>
        <View style={styles.root}>
          <View style={styles.imageform}>
            <ImageBackground
              source={{
                uri:
                  'https://image.freepik.com/free-vector/social-network-photo-post-youngsters-people-posting-selfie-phot_102902-576.jpg',
              }}
              style={styles.imageBackground}>
              <TouchableOpacity onPress={this.changeImage}>
                <View style={styles.imageView}>
                  <Image
                    source={{uri: this.state.person.photo}}
                    style={styles.image}
                  />
                </View>
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <View style={styles.menu}>
            <Card style={styles.card}>
              <ListItem style={styles.listItem}>
                <Icon name="account-card-details" style={styles.listLeft} />
                <Text style={styles.listBody}>
                  {this.state.person.fullname}
                </Text>
              </ListItem>
              <ListItem style={styles.listItem}>
                <Icon name="contact-mail" style={styles.listLeft} />
                <Text style={styles.listBody}>{this.state.person.email}</Text>
              </ListItem>
            </Card>
          </View>
          {/* card bottom */}
          <View style={styles.menutwo}>
            <Card style={styles.cardtwo}>
              <ListItem style={styles.listItem2}>
                <Left>
                  <Icon name="map-marker-multiple" style={styles.Left} />
                  <Text style={styles.Body}>Address</Text>
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
                  <Icon name="logout-variant" style={styles.LeftLogout} />
                  <Text style={styles.BodyLogout}>UN FRIEND</Text>
                </Left>
                <Right>
                  <TouchableOpacity onPress={this.signOutUser}>
                    <Icon
                      name="arrow-right-drop-circle-outline"
                      style={styles.RightLogout}
                    />
                  </TouchableOpacity>
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
  imageform: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  imageBackground: {
    width: 360,
    height: 250,
  },
  imageView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: 160,
    width: 160,
    borderRadius: 80,
    backgroundColor: 'white',
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    alignSelf: 'center',
  },
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
    height: 120,
    marginBottom: 200,
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
  LeftLogout: {
    color: '#F4A771',
    fontSize: 25,
    marginRight: 20,
  },
  BodyLogout: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F4A771',
  },
  RightLogout: {
    color: '#F4A771',
    fontSize: 25,
    marginLeft: 20,
  },
});
