import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Content, List, ListItem, Left, Body, Right, Item} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';

const contact = [
  {
    id: 1,
    name: 'Babe',
    chat: 'Hello, Wake Up Baby',
    time: '05:40',
  },
  {
    id: 2,
    name: 'Tommy',
    chat: 'Hi',
    time: '11:35',
  },
  {
    id: 3,
    name: 'James',
    chat: 'Bonjour',
    time: '13:47',
  },
  {
    id: 4,
    name: 'User 4',
    chat: 'Namaste',
    time: '16:07',
  },
  {
    id: 5,
    name: 'User 5',
    chat: 'Ni Hao',
    time: '18:56',
  },
  {
    id: 6,
    name: 'User 2',
    chat: 'Hi',
    time: '11:35',
  },
  {
    id: 7,
    name: 'User 3',
    chat: 'Bonjour',
    time: '13:47',
  },
  {
    id: 8,
    name: 'User 4',
    chat: 'Namaste',
    time: '16:07',
  },
  {
    id: 9,
    name: 'User 5',
    chat: 'Ni Hao',
    time: '18:56',
  },
  {
    id: 10,
    name: 'User 5',
    chat: 'Ni Hao',
    time: '18:56',
  },
];

class Home extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    headerShown: false,
  };
  state = {
    userList: [],
    refreshing: false,
    uid: '',
  };

  componentDidMount = async () => {
    const uid = await AsyncStorage.getItem('userid');
    this.setState({uid: uid, refreshing: true});
    await firebase
      .database()
      .ref('/users')
      .on('child_added', data => {
        let person = data.val();
        if (person.id !== uid) {
          this.setState(prevData => {
            return {userList: [...prevData.userList, person]};
          });
          this.setState({refreshing: false});
        }
      });
  };

  render(props) {
    return (
      <>
        <View style={styles.root}>
          <View style={styles.header}>
            <Item style={styles.itemHeader}>
              <Left>
                <Text style={styles.textHeader}>Message</Text>
              </Left>
              <Right>
                {/* <Input placeholder="Search" style={styles.searchHeader} /> */}
                <Icon name="search" size={20} />
              </Right>
            </Item>
          </View>
          <View style={styles.body}>
            <FlatList
              data={this.state.userList}
              renderItem={({item}) => (
                <View style={styles.listChat}>
                  <Content>
                    <List>
                      <ListItem avatar>
                        <Left>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate('UserProfile', {
                                item,
                              })
                            }>
                            <Image
                              source={{uri: item.photo}}
                              style={styles.profilePic}
                            />
                          </TouchableOpacity>
                        </Left>
                        <Body>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate('Chat', {item})
                            }>
                            <Text style={styles.personName}>
                              {item.fullname}
                            </Text>
                            <Text note>{item.email}</Text>
                          </TouchableOpacity>
                        </Body>
                        <Right>
                          <Text note>{item.date}</Text>
                        </Right>
                      </ListItem>
                    </List>
                  </Content>
                </View>
              )}
              keyExtractor={item => item.id}
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
    backgroundColor: '#FBF5E5',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FBF5E5',
    elevation: 10,
  },
  itemHeader: {
    height: 50,
    padding: 20,
  },
  searchHeader: {
    color: 'black',
    width: 150,
  },
  textHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  body: {
    flex: 1,
  },
  profilePic: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -5,
    marginTop: -5,
  },
  listChat: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  personName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  personChat: {
    color: '#1f1f1f',
  },
});

export default Home;
