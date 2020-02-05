/* eslint-disable no-shadow */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Alert,
  PermissionsAndroid,
  ToastAndroid,
  Platform,
  StatusBar,
} from 'react-native';
import {Input, Form, Item} from 'native-base';
import firebase from 'react-native-firebase';
import Geolocation from 'react-native-geolocation-service';
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
      confirmpassword: '',
      longitude: null,
      latitude: null,
      // isLoading: false,
      // isSubmit: false,
      errorMessage: null,
    };
  }

  componentDidMount = async () => {
    await this.getLocation();
  };
  hasLocationPermission = async () => {
    if (
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    }
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location Permission Denied By User.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location Permission Revoked By User.',
        ToastAndroid.LONG,
      );
    }
    return false;
  };

  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }

    this.setState({loading: true}, () => {
      Geolocation.getCurrentPosition(
        position => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            loading: false,
          });
          console.warn(position);
        },
        error => {
          this.setState({errorMessage: error, loading: false});
          console.warn(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 2000,
          distanceFilter: 50,
          forceRequestLocation: true,
        },
      );
    });
  };

  signUpButtonPress = () => {
    const {fullname, email, password, confirmpassword} = this.state;
    if (fullname.length < 1) {
      ToastAndroid.show('Please input your fullname', ToastAndroid.LONG);
    } else if (email.length < 6) {
      ToastAndroid.show(
        'Please input a valid email address',
        ToastAndroid.LONG,
      );
    } else if (password.length < 6) {
      ToastAndroid.show(
        'Password must be at least 6 characters',
        ToastAndroid.LONG,
      );
    } else {
      if (password === confirmpassword) {
        // this.setState({isLoading: true});
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(user => {
            const uid = user.user.uid;
            const email = user.user.email;

            firebase
              .database()
              .ref('messages/' + uid)
              .set({
                isRegister: true,
              });
            firebase
              .database()
              .ref('users/' + uid)
              .set({
                id: uid,
                fullname: fullname,
                email: email,
                status: 'Offline',
                photo:
                  'https://d2ifuh1csrnat0.cloudfront.net/img/profile-pictures/avatar.png',
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                phone: "Please Change's your Phone Number",
                about: "Hi There! I'm Using HiChat.",
              })
              .catch(error => {
                ToastAndroid.show(error.message, ToastAndroid.LONG);
                this.setState({
                  name: '',
                  email: '',
                  password: '',
                });
              });
            ToastAndroid.show(
              'Your account is successfully registered!',
              ToastAndroid.LONG,
            );
            this.props.navigation.navigate('Login');
          })
          .catch(error => {
            this.setState({
              isLoading: false,
            });
            Alert.alert(error.message);
            console.log(error.message);
          });
      } else {
        ToastAndroid.show(
          'Password and Confirm Password did not match!',
          ToastAndroid.LONG,
        );
      }
    }
  };

  // Alert.alert(
  //   'Register Success',
  //   {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
  //   {cancelable: false},
  // ),

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
          </View>
          <View style={styles.menu}>
            <Form style={styles.form}>
              <Text style={styles.sign}>SIGN UP</Text>
              <Item regular style={styles.input}>
                <Input
                  placeholder="Full Name"
                  placeholderTextColor="#B5B5B5"
                  value={this.state.fullname}
                  onChangeText={fullname => this.setState({fullname})}
                />
              </Item>
              <Item regular style={styles.input}>
                <Input
                  placeholder="Email"
                  keyboardType="email-address"
                  placeholderTextColor="#B5B5B5"
                  value={this.state.email}
                  onChangeText={email => this.setState({email})}
                />
              </Item>
              <Item regular style={styles.input}>
                <Input
                  placeholder="Password"
                  placeholderTextColor="#B5B5B5"
                  secureTextEntry={true}
                  value={this.state.password}
                  onChangeText={password => this.setState({password})}
                />
              </Item>
              <Item regular style={styles.input}>
                <Input
                  placeholder="Confirm Password"
                  placeholderTextColor="#B5B5B5"
                  secureTextEntry={true}
                  value={this.state.confirmpassword}
                  onChangeText={confirmpassword =>
                    this.setState({confirmpassword})
                  }
                />
              </Item>
              <TouchableHighlight
                style={[styles.buttonContainer, styles.registerButton]}
                onPress={this.signUpButtonPress}>
                <Text style={styles.loginText}>REGISTER</Text>
              </TouchableHighlight>
              <View style={styles.wrapsignup}>
                <Text>Already have an account? </Text>
                <TouchableHighlight
                  onPress={() => this.props.navigation.navigate('Login')}>
                  <Text style={styles.textsignup}> Sign in!</Text>
                </TouchableHighlight>
              </View>
            </Form>
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
  top: {
    flex: 1,
    height: 350,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 250,
    width: 250,
  },
  menu: {
    position: 'relative',
    backgroundColor: '#F4A771',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    marginBottom: 20,
  },
  sign: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 30,
    marginBottom: 30,
    justifyContent: 'center',
    color: '#FBF5E5',
  },
  input: {
    height: 50,
    marginBottom: 15,
    borderRadius: 20,
    width: 300,
    alignSelf: 'center',
    backgroundColor: '#FBF5E5',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: 300,
    borderRadius: 30,
    alignSelf: 'center',
  },
  registerButton: {
    backgroundColor: '#3BB0BA',
  },
  loginText: {
    color: '#FBF5E5',
    fontWeight: 'bold',
  },
  wrapsignup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    marginBottom: 20,
  },
  textsignup: {color: '#FBF5E5', fontSize: 16},
});
