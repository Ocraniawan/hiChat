import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {Header, Left, Body, Title, Right} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import {Bubble} from 'react-native-gifted-chat';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

export default class Chat extends Component {
  state = {
    messages: [],
    messageList: [],
    person: this.props.navigation.getParam('item'),
    userId: AsyncStorage.getItem('userid'),
    userName: AsyncStorage.getItem('users.name'),
    userAvatar: AsyncStorage.getItem('users.photo'),
  };

  onSend = async () => {
    if (this.state.message.length > 0) {
      let msgId = firebase
        .database()
        .ref('messages')
        .child(this.state.userId)
        .child(this.state.person.id)
        .push().key;
      let updates = {};
      let message = {
        _id: msgId,
        text: this.state.message,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
          _id: this.state.userId,
          name: this.state.userName,
          avatar: this.state.userAvatar,
        },
      };
      updates[
        'messages/' +
          this.state.userId +
          '/' +
          this.state.person.id +
          '/' +
          msgId
      ] = message;
      updates[
        'messages/' +
          this.state.person.id +
          '/' +
          this.state.userId +
          '/' +
          msgId
      ] = message;
      firebase
        .database()
        .ref()
        .update(updates);
      this.setState({message: ''});
    }
  };

  componentDidMount = async () => {
    const userId = await AsyncStorage.getItem('userid');
    const userName = await AsyncStorage.getItem('users.name');
    const userAvatar = await AsyncStorage.getItem('users.photo');
    this.setState({userId, userName, userAvatar});
    firebase
      .database()
      .ref('messages')
      .child(this.state.userId)
      .child(this.state.person.id)
      .on('child_added', val => {
        this.setState(previousState => ({
          messageList: GiftedChat.append(previousState.messageList, val.val()),
        }));
      });
  };

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#3BB0BA',
          },
          left: {
            backgroundColor: '#66757F',
          },
        }}
        textStyle={{
          right: {
            color: 'white',
          },
          left: {
            color: 'white',
          },
        }}
      />
    );
  }

  renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendButton}>
          <Icons name="ios-paper-plane" size={30} color="#3BB0BA" />
        </View>
      </Send>
    );
  }

  render() {
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
              <Image
                source={
                  this.state.person.photo
                    ? {uri: this.state.person.photo}
                    : require('../../assets/Logo.png')
                }
                style={styles.profilePic}
              />
              <Title style={styles.title}>{this.state.person.fullname}</Title>
            </Body>
            <Right style={styles.right}>
              <TouchableOpacity>
                <Icon name="video" style={styles.iconHeader} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icons name="ios-call" style={styles.iconHeader} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="map-marker" style={styles.iconHeader} />
              </TouchableOpacity>
            </Right>
          </Header>
          <View style={styles.chatForm}>
            <GiftedChat
              alwaysShowSend={true}
              renderSend={this.renderSend}
              renderBubble={this.renderBubble}
              text={this.state.message}
              onInputTextChanged={val => {
                this.setState({message: val});
              }}
              messages={this.state.messageList}
              onSend={() => this.onSend()}
              user={{
                _id: this.state.userId,
              }}
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
  profilePic: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -25,
  },
  title: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  right: {flexDirection: 'row', alignItems: 'center'},
  iconHeader: {
    fontSize: 20,
    margin: 5,
    color: 'white',
  },
  chatForm: {
    flex: 1,
  },
  sendButton: {
    marginRight: 20,
    marginBottom: 5,
  },
});
