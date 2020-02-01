import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {Input, Form, Item} from 'native-base';
import firebase from 'react-native-firebase';

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

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', errorMessage: null};
  }

  signUpButtonPress = () => {
    const {email, password} = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => this.props.navigation.navigate('Login'))
      .catch(error => this.setState({errorMessage: error.message}));
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
              <Text style={styles.sign}>SIGN UP</Text>
              <Item regular style={styles.input}>
                <Input
                  placeholder="Email"
                  placeholderTextColor="#B5B5B5"
                  value={this.state.email}
                  onChangeText={email => this.setState({email})}
                  // onChange={e => this.setState({username: e.nativeEvent.text})}
                />
              </Item>
              <Item regular style={styles.input}>
                <Input
                  placeholder="Password"
                  placeholderTextColor="#B5B5B5"
                  secureTextEntry={true}
                  value={this.state.password}
                  onChangeText={password => this.setState({password})}
                  // onChange={e => this.setState({password: e.nativeEvent.text})}
                />
              </Item>
              <Item regular style={styles.input}>
                <Input
                  placeholder="Confirm Password"
                  placeholderTextColor="#B5B5B5"
                  secureTextEntry={true}
                  // value={this.state.password}
                  // onChange={e => this.setState({password: e.nativeEvent.text})}
                />
              </Item>
              <TouchableHighlight
                style={[styles.buttonContainer, styles.registerButton]}
                onPress={this.signUpButtonPress}>
                <Text style={styles.loginText}>REGISTER</Text>
              </TouchableHighlight>
            </Form>
          </View>
        </View>
      </>
    );
  }
}
