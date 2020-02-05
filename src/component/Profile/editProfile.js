import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Alert,
  StatusBar,
} from 'react-native';
import {Header, Left, Body, Title, Item, Label, Input} from 'native-base';
import Icons from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
import {Bubbles} from 'react-native-loader';
import LinearGradient from 'react-native-linear-gradient';

export default class editProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      fullname: '',
      phone: '',
      about: '',
      id: '',
    };
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    const id = firebase.auth().currentUser.uid;
    const db = firebase.database().ref('users/' + id);
    db.once('value').then(data => {
      const item = data.val();
      this.setState({
        id: item.id,
        fullname: item.fullname,
        about: item.about,
        phone: item.phone,
      });
    });
  }

  handleEdit = () => {
    const {fullname, phone, about} = this.state;
    if (!fullname || !phone || !about) {
      ToastAndroid.show('All Form Must be Filled!', ToastAndroid.LONG);
    } else {
      const id = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref('users/' + id)
        .update({
          fullname,
          about,
          phone,
        })
        .then(data => {
          Alert.alert(
            'Submit form?',
            'Your data will change',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () =>
                  Alert.alert('Success!', 'Your data changed!', [
                    {
                      text: 'OK',
                      onPress: () => this.props.navigation.navigate('Profile'),
                    },
                  ]),
              },
            ],
            {cancelable: false},
          );
        })
        .catch(error => {
          //error callback
          Alert.alert(error);
          console.log('error ', error);
        });
    }
  };

  render() {
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
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.push('Profile', {
                    id: this.props.id,
                  })
                }
              />
              <Title style={styles.title}>Edit Profile</Title>
            </Body>
          </Header>
          <View>
            {!isLoading ? (
              <View style={styles.loader}>
                <Bubbles size={10} style={styles.loadBuble} color="#128C7E" />
              </View>
            ) : (
              <View style={styles.mainBody}>
                <Item stackedLabel>
                  <Label>Display Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={this.state.fullname}
                    onChangeText={value => {
                      this.setState({
                        fullname: value,
                      });
                    }}
                  />
                </Item>
                <Item stackedLabel>
                  <Label>Phone Number</Label>
                  <Input
                    type="text"
                    id="phone"
                    name="phone"
                    keyboardType="number-pad"
                    maxLength={13}
                    value={this.state.phone}
                    onChangeText={value => {
                      this.setState({
                        phone: value,
                      });
                    }}
                  />
                </Item>
                <Item stackedLabel>
                  <Label>About</Label>
                  <Input
                    type="text"
                    id="about"
                    name="about"
                    maxLength={30}
                    value={this.state.about}
                    onChangeText={value => {
                      this.setState({
                        about: value,
                      });
                    }}
                  />
                </Item>
                <TouchableOpacity
                  onPress={this.handleEdit}
                  style={styles.button}>
                  <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
              </View>
            )}
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
  mainBody: {
    flex: 1,
    margin: 10,
  },
  buttonWrapper: {
    color: '#3BB0BA',
  },
  button: {
    color: '#3BB0BA',
    height: 45,
    width: '100%',
    backgroundColor: '#128C7E',
    borderRadius: 10,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  loadBuble: {marginTop: 100},
});
