import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DefaultPage from './pages/default';
import AdvancedSearchPage from './pages/advancedSearchPage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function home() {
  return (
    <Tab.Navigator
      initialRouteName="DefaultPage"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'DefaultPage') {
            iconName = focused ? 'recommend' : 'recommend';
          } else if (route.name === 'AdvancedSearchPage') {
            iconName = focused ? 'search' : 'search';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={40} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: '#f0ffff',
        },
        labelStyle: {
          fontSize: 15,
        },
        tabStyle: {
          fontSize: 90,
        },
      }}>
      <Tab.Screen
        name="DefaultPage"
        component={DefaultPage}
        options={{
          tabBarLabel: 'recommended for you',
        }}
      />

      <Tab.Screen
        name="AdvancedSearchPage"
        component={AdvancedSearchPage}
        options={{tabBarLabel: 'advanced search'}}
      />
    </Tab.Navigator>
  );
}
