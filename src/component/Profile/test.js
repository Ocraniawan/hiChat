import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Header, Left, Body, Title, Form, Item, Label, Input} from 'native-base';
import firebase from '../config/config';
import {Bubbles} from 'react-native-loader';
export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      photo: '',
      name: '',
      phone: '',
      status: '',
      email: '',
      contacts: {},
    };
    this.handleEdit = this.handleEdit.bind(this);
  }
  componentDidMount() {
    const id = firebase.auth().currentUser.uid;
    const db = firebase.database().ref('user/' + id);
    db.once('value').then(data => {
      const item = data.val();
      this.setState({
        photo: item.photo,
        name: item.name,
        phone: item.phone,
        status: item.status,
        email: item.email,
        contacts: item.contacts || {},
      });
    });
  }
  handleEdit = () => {
    const {name, phone, status, photo, email, messages, contacts} = this.state;
    if (!name || !phone || !status) {
      alert('Semua isi form harus di isi');
    } else {
      const id = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref('user/' + id)
        .set({
          photo,
          status,
          name,
          email,
          phone,
          contacts,
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
                      onPress: () => this.props.navigation.push('MyProfile'),
                    },
                  ]),
              },
            ],
            {cancelable: false},
          );
        })
        .catch(error => {
          //error callback
          alert(error);
          console.log('error ', error);
        });
    }
  };
  render() {
    const {isLoading, photo} = this.state;
    setTimeout(
      function() {
        this.setState({isLoading: true});
      }.bind(this),
      2000,
    );
    return (
      <>
        <Header style={style.header}>
          <Left>
            <TouchableOpacity
              onPress={() => this.props.navigation.push('MyProfile')}>
              <Icon name="times" size={30} color="white" style={style.icon1} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={style.title}>Edit Profile</Title>
          </Body>
        </Header>
        <View style={style.wrapper}>
          {!isLoading ? (
            <View style={style.loader}>
              <Bubbles size={10} style={style.loadBuble} color="blue" />
            </View>
          ) : (
            <ScrollView>
              <Form>
                <View style={style.form}>
                  <Item stackedLabel>
                    <Label>Display Name</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={this.state.name}
                      onChangeText={value => {
                        this.setState({
                          name: value,
                        });
                      }}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>No Hp</Label>
                    <Input
                      type="text"
                      id="phone"
                      name="phone"
                      value={this.state.phone}
                      onChangeText={value => {
                        this.setState({
                          phone: value,
                        });
                      }}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>Status</Label>
                    <Input
                      type="text"
                      id="status"
                      name="status"
                      value={this.state.status}
                      onChangeText={value => {
                        this.setState({
                          status: value,
                        });
                      }}
                    />
                  </Item>
                  <View style={style.buttonWrapper}>
                    <Button
                      onPress={this.handleEdit}
                      style={style.button}
                      title="Submit"
                    />
                  </View>
                </View>
              </Form>
            </ScrollView>
          )}
        </View>
      </>
    );
  }
}
const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ffebcd',
  },
  title: {
    fontWeight: 'bold',
    fontSize: wp('8%'),
  },
  header: {
    backgroundColor: '#6495ed',
  },
  button: {
    width: wp('30%'),
    marginLeft: wp('40%'),
  },
  form: {
    marginTop: hp('3%'),
  },
  buttonWrapper: {
    justifyContent: 'center',
    width: wp('30%'),
    marginTop: wp('3%'),
    marginLeft: wp('3%'),
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('40%'),
  },
  loadBuble: {marginTop: hp('50%')},
});