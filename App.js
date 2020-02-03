import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {Root} from 'native-base';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Entypo';

import SplashScreen from './src/screen/SplashScreen';
import LandingPage from './src/landing/LandingPage';
import Register from './src/landing/Register';
import Login from './src/landing/Login';
import Locations from './src/screen/Location';
import Profile from './src/screen/Profile';
import Mainscreen from './src/screen/Home';
import Chat from './src/component/Chat/Chat';
import Loading from './src/component/Loading/loading';
import FriendsLocation from './src/component/maps/friendsLocation';
import EditPhoto from './src/component/Profile/editPhoto';
import EditProfile from './src/component/Profile/editProfile';
import FriendsProfile from './src/component/Profile/friendsProfile';
import AddFriends from './src/component/Chat/addFriends';
import Contact from './src/component/contact';
import Search from './src/component/Search';
import UserProfile from './src/component/Profile/friendsProfile';
console.disableYellowBox = true;

const HomeNav = createStackNavigator(
  {
    Home: {
      screen: Mainscreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Chat: {
      screen: Chat,
      navigationOptions: {
        headerShown: false,
        tabBarVisible: false,
      },
    },
    UserProfile: {
      screen: UserProfile,
      navigationOptions: {
        headerShown: false,
        tabBarVisible: false,
      },
    },
    friendsLocation: {
      screen: FriendsLocation,
      navigationOptions: {
        headerShown: false,
        tabBarVisible: false,
      },
    },
  },
  {initialRouteName: 'Home'},
);

HomeNav.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const LocationNav = createStackNavigator(
  {
    Location: {
      screen: Locations,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Location',
  },
);

LocationNav.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const ProfileNav = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        headerShown: false,
      },
    },
    editPhoto: {
      screen: EditPhoto,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Profile',
  },
);

ProfileNav.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const BottomNav = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNav,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => {
          return <Icons name="chat" size={30} color={tintColor} />;
        },
      },
    },
    Location: {
      screen: LocationNav,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => {
          return (
            <Icon name="map-marker-multiple" size={30} color={tintColor} />
          );
        },
      },
    },
    Profile: {
      screen: ProfileNav,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => {
          return <Icon name="account-circle" size={30} color={tintColor} />;
        },
      },
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: '#FBF5E5',
      inactiveTintColor: '#C7CACD',
      style: {
        backgroundColor: '#3BB0BA',
        borderTopColor: 'transparent',
        // borderTopRightRadius: 15,
        // borderTopLeftRadius: 15,
        height: 50,
      },
    },
  },
);

const LandingNav = createSwitchNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
        tabBarVisible: false,
      },
    },
    LandingPage: {
      screen: LandingPage,
      navigationOptions: {
        headerShown: false,
        tabBarVisible: false,
      },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        headerShown: false,
        tabBarVisible: false,
      },
    },
  },
  {
    initialRouteName: 'LandingPage',
  },
);

const SwitchNav = createSwitchNavigator(
  {
    SplashScreen,
    LandingNav,
    BottomNav,
  },
  {
    headerShown: false,
    initialRouteName: 'SplashScreen',
  },
);

const AppContainer = createAppContainer(SwitchNav);

// create a component
class App extends Component {
  render() {
    return (
      <Root>
        <AppContainer />
      </Root>
    );
  }
}

//make this component available to the app
export default App;
