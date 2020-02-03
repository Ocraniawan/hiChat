import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {Header, Left, Body, Title, Right} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
import {Avatar, Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

const storage = firebase.storage();

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
const uploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = uri;
    const sessionId = new Date().getTime();
    let uploadBlob = null;
    const imageRef = storage.ref('photo').child(`${sessionId}`);

    fs.readFile(uploadUri, 'base64')
      .then(data => {
        return Blob.build(data, {type: `${mime};BASE64`});
      })
      .then(blob => {
        uploadBlob = blob;
        return imageRef.put(blob, {contentType: mime});
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then(url => {
        resolve(url);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default class editPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isSelectedPhoto: 0,
      photo: null,
    };
  }

  componentDidMount() {
    const id = firebase.auth().currentUser.uid;
    const db = firebase.database().ref('users/' + id);
    db.once('value').then(data => {
      // data.val() is the dictionary with all your keys/values from the '/store' path
      const item = data.val();
      this.setState({
        name: item.fullname_users,
        photo: item.photo_users,
      });
    });
  }

  UploadPhoto = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.fileSize > 10485760) {
        this.setState({
          photoErr: 'File too large max 10 MB',
        });
      }
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.setState({
          isLoadingPhoto: true,
        });
        uploadImage(response.uri)
          .then(url =>
            this.setState({
              photo: url,
              isSelectedPhoto: 1,
              isLoadingPhoto: false,
            }),
          )
          .catch(error => {
            console.log(error);
            this.setState({
              isLoadingPhoto: false,
            });
          });
      }
    });
  };

  render() {
    const {name, photo, isSelectedPhoto} = this.state;
    return (
      <>
        <View style={styles.root}>
          <Header style={styles.header}>
            <Left>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icons
                  name="ios-arrow-back"
                  size={25}
                  color="white"
                  style={styles.backHeader}
                />
              </TouchableOpacity>
            </Left>
            <Body style={styles.body}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.push('UserProfile', {
                    id: this.props.id,
                  })
                }
              />
              <Title style={styles.title}>Edit Profile Photo</Title>
            </Body>
          </Header>
          <View style={styles.mainBody}>
            <View style={styles.imageView}>
              <Image
                source={
                  photo === null
                    ? {uri: photo}
                    : {
                        uri:
                          'https://cache.desktopnexus.com/thumbseg/2291/2291845-bigthumbnail.jpg',
                      }
                }
                style={styles.imageBackground}
              />
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('editPhoto')}>
                <View style={styles.editPhoto}>
                  <Icon name="pencil" style={styles.iconPhoto} />
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.name}>{name}</Text>
            <Avatar
              rounded
              source={
                isSelectedPhoto
                  ? {uri: photo}
                  : photo === null
                  ? {
                      uri:
                        'https://cache.desktopnexus.com/thumbseg/2291/2291845-bigthumbnail.jpg',
                    }
                  : {uri: photo}
              }
              size="xlarge"
              showEditButton
              onPress={this.UploadPhoto}
            />
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
  header: {
    backgroundColor: '#3BB0BA',
    height: 55,
    justifyContent: 'space-between',
  },
  listHeader: {
    height: 55,
    justifyContent: 'space-between',
  },
  backHeader: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainBody: {
    flex: 1,
    marginTop: 10,
  },
  editPhoto: {
    backgroundColor: '#3BB0BA',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 40,
    width: 40,
    margin: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderRadius: 20,
  },
  iconPhoto: {
    fontSize: 20,
    margin: 5,
    color: 'white',
  },
  imageBackground: {
    width: 250,
    height: 250,
    borderRadius: 125,
    // alignSelf: 'center',
  },
  imageView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});
