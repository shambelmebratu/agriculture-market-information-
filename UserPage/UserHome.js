import React from 'react';
import {View, TouchableOpacity, Image, Button, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import Ic from 'react-native-vector-icons/Feather';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ico from 'react-native-vector-icons/AntDesign';

import CustomSidebarMenu from '../customSidebarMenu';
import home from './home';
import News from './news';
import About from './about';
import AccountView from './userAccountView';
import Logout from './logout';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const NavigationDrawerStructure = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        <Icon name="menu" size={45} style={{color: '#48d1cc'}}></Icon>
      </TouchableOpacity>
    </View>
  );
};

function HomeStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={home}
        options={{
          title: 'AMIS User Home',
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#696969',
          },
          headerTintColor: '#48d1cc',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

function NewsStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="News">
      <Stack.Screen
        name="News"
        component={News}
        options={{
          title: 'News',
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#696969',
          },
          headerTintColor: '#48d1cc',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

function LogoutStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="AddNewProducts">
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{
          title: 'Logout',
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}
function AccountStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={AccountView}
        options={{
          title: 'Account',
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#696969',
          },
          headerTintColor: '#48d1cc',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

function AboutStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="AddNewProducts">
      <Stack.Screen
        name="About"
        component={About}
        options={{
          title: 'About',
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#696969',
          },
          headerTintColor: '#48d1cc',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

const AgentHome = () => (
  <Drawer.Navigator
    drawerContentOptions={{
      activeTintColor: '#e91e63',
      itemStyle: {marginVertical: 5},
    }}
    drawerContent={(props) => <CustomSidebarMenu {...props} />}>
    <Drawer.Screen
      name="home"
      component={HomeStack}
      options={{
        drawerLabel: 'Home',
        drawerIcon: () => <Icon name="home" size={30}></Icon>,
      }}
    />

    <Drawer.Screen
      name="NewsStack"
      component={NewsStack}
      options={{
        drawerLabel: 'News',
        drawerIcon: () => <Icon name="newspaper" size={30}></Icon>,
      }}
    />

    <Drawer.Screen
      name="AccountStack"
      component={AccountStack}
      options={{
        drawerLabel: 'My Account ',
        drawerIcon: () => <MatIcon name="account-settings" size={30}></MatIcon>,
      }}
    />

    <Drawer.Screen
      name="AboutStack"
      component={AboutStack}
      options={{
        drawerLabel: 'About',
        drawerIcon: () => <Ic name="user" size={30}></Ic>,
      }}
    />

    <Drawer.Screen
      name="LogoutStack"
      component={LogoutStack}
      options={{
        drawerLabel: 'Logout',
        drawerIcon: () => <Ico name="logout" size={30}></Ico>,
      }}
    />
  </Drawer.Navigator>
);

export default AgentHome;
