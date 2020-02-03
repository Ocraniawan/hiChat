/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ToastAndroid,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Header, Title} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import firebase from 'react-native-firebase';
import Carousel from 'react-native-snap-carousel';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Location extends Component {
  state = {
    initial: 'state',
    mapRegion: null,
    latitude: 0,
    longitude: 0,
    userList: [],
    search: '',
    region: {},
    markers: [],
    uid: null,
  };

  componentDidMount = async () => {
    await this.getUser();
    await this.getLocation();
  };

  getUser = async () => {
    const uid = await AsyncStorage.getItem('userid');
    this.setState({uid: uid});
    firebase
      .database()
      .ref('/users')
      .on('child_added', result => {
        let data = result.val();
        if (data !== null && data.id !== uid) {
          this.setState(prevData => {
            return {userList: [...prevData.userList, data]};
          });
        }
      });
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
          let region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421 * 1.5,
          };
          this.setState({
            mapRegion: region,
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
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 50,
          forceRequestLocation: true,
        },
      );
    });
  };

  onCarouselItemChange = index => {
    // let location = this.state.userList[index];
  };
  renderCarouselItem = ({item}) => (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate('Chat', {item})}>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{item.fullname}</Text>
        <Text style={styles.cardstatus}>{item.status}</Text>
        <Image
          style={styles.cardImage}
          source={
            item.photo
              ? {uri: item.photo}
              : {
                  uri:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAQeOYC_Uqrxp5lVzs-DalVZJg3t6cCtAFyMHeI2NejPr1-TsUUQ&s',
                }
          }
        />
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <>
        <View style={styles.root}>
          <Header style={styles.header}>
            <Title style={styles.title}>MAPS</Title>
          </Header>
          <MapView
            style={styles.mapView}
            showsMyLocationButton={true}
            showsIndoorLevelPicker={true}
            showsUserLocation={true}
            zoomControlEnabled={true}
            showsCompass={true}
            showsTraffic={true}
            region={this.state.mapRegion}
            initialRegion={{
              latitude: -7.755322,
              longitude: 110.381174,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            {this.state.userList.map(item => {
              return (
                <Marker
                  key={item.id}
                  title={item.fullname}
                  description={item.status}
                  draggable
                  coordinate={{
                    latitude: item.latitude || 0,
                    longitude: item.longitude || 0,
                  }}
                  onCalloutPress={() => {
                    this.props.navigation.navigate('FriendsProfile', {
                      item,
                    });
                  }}>
                  <View>
                    <Image
                      source={{uri: item.photo}}
                      style={{width: 40, height: 40, borderRadius: 50}}
                    />
                    <Text>{item.name}</Text>
                  </View>
                </Marker>
              );
            })}
          </MapView>

          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={this.state.userList}
            containerCustomStyle={styles.Carousel}
            renderItem={this.renderCarouselItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={230}
            removeClippedSubviews={false}
            onSnapToItem={index => this.onCarouselItemChange(index)}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  Carousel: {
    position: 'absolute',
    bottom: 0,
  },
  header: {
    backgroundColor: '#FBF5E5',
    elevation: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  mapView: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  cardContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    height: 130,
    width: 230,
    borderRadius: 15,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    height: 50,
    width: 50,
    bottom: 0,
    marginTop: 10,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 10,
  },
  cardstatus: {
    color: 'white',
    fontSize: 12,
    alignSelf: 'center',
  },
});
