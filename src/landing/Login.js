import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  PermissionsAndroid,
  ToastAndroid,
  Platform,
} from 'react-native';
import {Input, Form, Item} from 'native-base';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';

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
    height: 350,
    width: 350,
  },
  menu: {
    position: 'relative',
    backgroundColor: '#3BB0BA',
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
    backgroundColor: '#F4A771',
  },
  loginText: {
    color: '#FBF5E5',
    fontWeight: 'bold',
  },
  facebookButton: {
    backgroundColor: '#456CB0',
  },
  or: {
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
    color: '#FBF5E5',
  },
});

export default class Login extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {email: '', password: '', errorMessage: null};
  }

  componentDidMount = async () => {
    this._isMounted = true;
    await this.getLocation();
  };

  componentWillUnmount() {
    this._isMounted = false;
    Geolocation.clearWatch();
    Geolocation.stopObserving();
  }

  inputHandler = (name, value) => {
    this.setState(() => ({[name]: value}));
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
        },
        error => {
          this.setState({errorMessage: error});
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

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  loginPress = () => {
    const {email, password} = this.state;
    if (email.length < 6) {
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
      firebase
        .database()
        .ref('users/')
        .orderByChild('/email')
        .equalTo(email)
        .once('value', async result => {
          let data = result.val();
          if (data !== null) {
            let user = Object.values(data);
            await AsyncStorage.setItem('users.email', user[0].email);
            await AsyncStorage.setItem('users.fullname', user[0].name);
            await AsyncStorage.setItem('users.photo', user[0].photo);
          }
        });
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async response => {
          firebase
            .database()
            .ref('/users/' + response.user.uid)
            .update({
              status: 'Online',
              latitude: this.state.latitude || null,
              longitude: this.state.longitude || null,
            });
          await AsyncStorage.setItem('userid', response.user.uid);
          ToastAndroid.show('Login success', ToastAndroid.LONG);
          await this.props.navigation.navigate('Home');
        })
        .catch(error => {
          this.setState({
            errorMessage: error.message,
            email: '',
            password: '',
          });
          ToastAndroid.show(this.state.errorMessage, ToastAndroid.LONG);
        });
    }
  };

  render() {
    return (
      <>
        <View style={styles.root}>
          <View style={styles.top}>
            <Image
              source={require('../assets/login.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.menu}>
            <Form style={styles.form}>
              <Text style={styles.sign}>SIGN IN</Text>
              <Item regular style={styles.input}>
                <Input
                  placeholder="Email"
                  placeholderTextColor="#B5B5B5"
                  keyboardType="email-address"
                  onChangeText={email => this.setState({email})}
                  value={this.state.email}
                />
              </Item>
              <Item regular style={styles.input}>
                <Input
                  placeholder="Password"
                  placeholderTextColor="#B5B5B5"
                  secureTextEntry={true}
                  onChangeText={password => this.setState({password})}
                  value={this.state.password}
                />
              </Item>
              <TouchableHighlight
                style={[styles.buttonContainer, styles.registerButton]}
                onPress={this.loginPress}>
                <Text style={styles.loginText}>LOGIN</Text>
              </TouchableHighlight>
              <Text style={styles.or}>OR</Text>

              <TouchableHighlight
                style={[styles.buttonContainer, styles.facebookButton]}
                onPress={() => this.props.navigation.navigate('Register')}>
                <Text style={styles.loginText}>Facebook Login</Text>
              </TouchableHighlight>
            </Form>
          </View>
        </View>
      </>
    );
  }
}
