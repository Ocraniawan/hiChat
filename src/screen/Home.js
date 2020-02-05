import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {Content, List, ListItem, Left, Body, Right, Item} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';
import {Bubbles} from 'react-native-loader';

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
    isLoading: false,
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
          <LinearGradient colors={['#128C7E', '#148E7F']} style={styles.header}>
            <View style={styles.header}>
              <Item style={styles.itemHeader}>
                <Left>
                  <Text style={styles.textHeader}>Message</Text>
                </Left>
                <Right>
                  {/* <Input placeholder="Search" style={styles.searchHeader} /> */}
                  <Icon name="search" size={20} color="white" />
                </Right>
              </Item>
            </View>
          </LinearGradient>
          {!isLoading ? (
            <View style={styles.loader}>
              <Bubbles size={10} style={styles.loadBuble} color="#128C7E" />
            </View>
          ) : (
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
          )}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#128C7E',
    elevation: 10,
  },
  itemHeader: {
    height: 50,
    padding: 20,
  },
  searchHeader: {
    color: 'white',
    width: 150,
  },
  textHeader: {
    fontSize: 18,
    color: 'white',
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
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
  },
});

export default Home;
