import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {
  Content,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Item,
  Input,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

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

export default class Home extends Component {
  render() {
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
              data={contact}
              renderItem={({item}) => (
                <View style={styles.listChat}>
                  <Content>
                    <List>
                      <ListItem avatar>
                        <Left>
                          <Thumbnail
                            source={{
                              uri:
                                'https://cdn2.vectorstock.com/i/thumb-large/20/76/man-avatar-profile-vector-21372076.jpg',
                            }}
                            style={styles.profilePic}
                          />
                        </Left>
                        <Body>
                          <Text style={styles.personName}>{item.name}</Text>
                          <Text note>{item.chat}</Text>
                        </Body>
                        <Right>
                          <Text note>{item.time}</Text>
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
