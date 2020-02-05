/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Alert,
  PermissionsAndroid,
  ToastAndroid,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {Card, ListItem, Item, Right, Body, Left} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'react-native-firebase';
import {Bubbles} from 'react-native-loader';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      about: '',
      currentUser: null,
      userId: null,
      permissionsGranted: null,
      updatesEnabled: false,
      photo: null,
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    const id = firebase.auth().currentUser.uid;
    const db = firebase.database().ref('users/' + id);
    db.once('value').then(data => {
      // data.val() is the dictionary with all your keys/values from the '/store' path
      const item = data.val();
      this.setState({
        userId: item.id,
        name: item.fullname,
        email: item.email,
        photo: item.photo,
        phone: item.phone,
        about: item.about,
      });
    });
  };
  //   const {currentUser} = firebase.auth();
  //   const userId = await AsyncStorage.getItem('userid');
  //   const userName = await AsyncStorage.getItem('user.name');
  //   const userAvatar = await AsyncStorage.getItem('user.photo');
  //   const userEmail = await AsyncStorage.getItem('user.email');
  //   this.setState({currentUser, userId, userName, userAvatar, userEmail});
  //   console.log(userName, userAvatar, userEmail);
  // };

  signOutUser = async () => {
    await AsyncStorage.getItem('userid').then(async userid => {
      firebase
        .database()
        .ref('users/' + userid)
        .update({status: 'Offline'});
      await AsyncStorage.clear();
      firebase
        .auth()
        .signOut(ToastAndroid.show('Logout success', ToastAndroid.LONG))
        .then(() => this.props.navigation.navigate('Login'));
    });
  };

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  changeImage = async type => {
    const Blob = RNFetchBlob.polyfill.Blob;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;

    const options = {
      title: 'Select Your Best Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo',
    };

    let cameraPermission =
      (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)) &&
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ) &&
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    if (!cameraPermission) {
      cameraPermission = await this.requestCameraPermission();
    } else {
      ImagePicker.showImagePicker(options, response => {
        if (response.didCancel) {
          ToastAndroid.show('You cancelled image picker', ToastAndroid.LONG);
        } else if (response.error) {
          ToastAndroid.show(response.error, ToastAndroid.LONG);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          ToastAndroid.show('loading...', ToastAndroid.LONG);
          const imageRef = firebase
            .storage()
            .ref('image/' + this.state.userId)
            .child('photo');
          imageRef
            .putFile(response.path)
            .then(data => {
              ToastAndroid.show('Upload success', ToastAndroid.LONG);
              firebase
                .database()
                .ref('users/' + this.state.userId)
                .update({photo: data.downloadURL});
              this.setState({photo: data.downloadURL});
              // AsyncStorage.setItem('user.photo', this.state.userAvatar);
            })

            .catch(err => console.log(err));
        }
      });
    }
  };

  render() {
    const {phone, email, name, photo, about} = this.state;
    const {isLoading} = this.state;
    setTimeout(
      function() {
        this.setState({isLoading: true});
      }.bind(this),
      2000,
    );
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#075E54" />
        {!isLoading ? (
          <View style={styles.loader}>
            <Bubbles size={10} style={styles.loadBuble} color="#128C7E" />
          </View>
        ) : (
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
                    <Image source={{uri: photo}} style={styles.image} />
                    <View style={styles.editPhoto}>
                      <Icon name="pencil" style={styles.iconPhoto} />
                    </View>
                  </View>
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <LinearGradient colors={['#A6E0EE', '#FBF5E5']} style={styles.home}>
              <View style={styles.menu}>
                <Card style={styles.card}>
                  <ListItem style={styles.listItem}>
                    <Icon name="account" style={styles.listLeft} />
                    <Text style={styles.listText}>{name}</Text>
                  </ListItem>
                  <ListItem style={styles.listItem}>
                    <Icon name="mail-ru" style={styles.listLeft} />
                    <Text style={styles.listText}>{email}</Text>
                  </ListItem>
                </Card>
              </View>
              {/* card bottom */}
              <View style={styles.menutwo}>
                <Card style={styles.cardtwo}>
                  <ListItem style={styles.listItem}>
                    <Icon name="phone" style={styles.listLeft} />
                    <Text style={styles.listText}>{phone}</Text>
                  </ListItem>
                  <ListItem style={styles.listItem}>
                    <Icon name="information-outline" style={styles.listLeft} />
                    <Text style={styles.listAbout}>{about}</Text>
                  </ListItem>
                  <ListItem style={styles.listItem2}>
                    <Left>
                      <Icon name="account-edit" style={styles.Left} />
                      <Text style={styles.Body}>Edit Profile</Text>
                    </Left>
                    <Right>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('editProfile')
                        }>
                        <Icon
                          name="arrow-right-drop-circle-outline"
                          style={styles.Right}
                        />
                      </TouchableOpacity>
                    </Right>
                  </ListItem>
                  <ListItem style={styles.listItem2}>
                    <Left>
                      <Icon name="logout-variant" style={styles.LeftLogout} />
                      <Text style={styles.BodyLogout}>LOG OUT</Text>
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
            </LinearGradient>
          </View>
        )}
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
    marginRight: -48,
    alignSelf: 'center',
  },
  editPhoto: {
    backgroundColor: '#128C7E',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 40,
    width: 40,
    margin: 10,
    borderRadius: 20,
    marginTop: -110,
    marginRight: -1,
  },
  iconPhoto: {
    fontSize: 20,
    margin: 8,
    color: 'white',
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
    color: '#128C7E',
    marginRight: 10,
    fontSize: 25,
  },
  listBody: {
    fontSize: 16,
    width: 250,
    fontWeight: 'bold',
    color: '#128C7E',
  },
  listText: {
    fontSize: 16,
    width: 250,
    fontWeight: 'bold',
    color: '#5A5A5A',
  },
  listAbout: {
    fontSize: 16,
    width: 250,
    // fontWeight: 'bold',
    color: '#5A5A5A',
  },
  Left: {
    color: '#075E54',
    fontSize: 25,
    marginRight: 20,
  },
  Body: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#075E54',
  },
  Right: {
    color: '#075E54',
    fontSize: 25,
    marginLeft: 20,
  },
  LeftLogout: {
    color: '#DD4B39',
    fontSize: 25,
    marginRight: 20,
  },
  BodyLogout: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DD4B39',
  },
  RightLogout: {
    color: '#DD4B39',
    fontSize: 25,
    marginLeft: 20,
  },
  home: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
  },
});
