import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {Card, ListItem, Right, Left, Header, Body, Title} from 'native-base';
import Icons from 'react-native-vector-icons/Ionicons';
// import { Item, Label, Input} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Bubbles} from 'react-native-loader';
import LinearGradient from 'react-native-linear-gradient';
// import LinearGradient from 'react-native-linear-gradient';
// import AsyncStorage from '@react-native-community/async-storage';
// import ImagePicker from 'react-native-image-picker';
// import RNFetchBlob from 'react-native-fetch-blob';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: this.props.navigation.getParam('item'),
      isLoading: false,
    };
  }

  render() {
    // const {email, name, photo} = this.state;
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
              <Title style={styles.title}>Detail Friend</Title>
            </Body>
          </Header>
          {!isLoading ? (
            <View style={styles.loader}>
              <Bubbles size={10} style={styles.loadBuble} color="#128C7E" />
            </View>
          ) : (
            <View style={{flex: 1}}>
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
              <LinearGradient
                colors={['#A6E0EE', '#FBF5E5']}
                style={styles.home}>
                <View style={styles.menu}>
                  <Card style={styles.card}>
                    <ListItem style={styles.listItem}>
                      <Icon name="account" style={styles.listLeft} />
                      <Text style={styles.listText1}>
                        {this.state.person.fullname}
                      </Text>
                    </ListItem>
                    <ListItem style={styles.listItem}>
                      <Icon name="mail-ru" style={styles.listLeft} />
                      <Text style={styles.listText}>
                        {this.state.person.email}
                      </Text>
                    </ListItem>
                    <ListItem style={styles.listItem}>
                      <Icon name="phone" style={styles.listLeft} />
                      <Text style={styles.listText}>
                        {this.state.person.phone}
                      </Text>
                    </ListItem>
                    <ListItem style={styles.listItem}>
                      <Icon
                        name="information-outline"
                        style={styles.listLeft}
                      />
                      <Text style={styles.listAbout}>
                        {this.state.person.about}
                      </Text>
                    </ListItem>
                  </Card>
                </View>
                {/* card bottom */}
                <View style={styles.menutwo}>
                  <Card style={styles.cardtwo}>
                    <ListItem style={styles.listItem2}>
                      <Left>
                        <Icon name="logout-variant" style={styles.LeftLogout} />
                        <Text style={styles.BodyLogout}>UN FRIEND</Text>
                      </Left>
                      <Right>
                        <TouchableOpacity>
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
    // marginRight: -48,
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
    height: 240,
  },
  cardtwo: {
    borderRadius: 15,
    elevation: 5,
    height: 60,
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
    // fontWeight: 'bold',
    color: '#5A5A5A',
  },
  listText1: {
    fontSize: 18,
    width: 250,
    fontWeight: 'bold',
    color: '#5A5A5A',
    textAlign: 'center',
  },
  listAbout: {
    fontSize: 15,
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
  header: {
    backgroundColor: '#128C7E',
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
});
