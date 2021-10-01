import React, {useState} from 'react';
import {createStackNavigator, HeaderBackground} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import home from './home';
import AgentHome from './AgentHome';
import UserHome from './UserHome';
import signUp from './SignUp';
import loginPage from './loginPage';
import EditProduct from './EditProduct';
import AddNewProducts from './addNewProduct';
import AccountEdit from './agentAccountEdit';
import userAccountEdit from './userAccountEdit';

const Stack = createStackNavigator();
const MoreIcon = require('./image/more.png');
const DrawerIcon = require('./image/drawer.png');

const AppScreens = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="loginPage"
        component={loginPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="AddNewProducts" component={AddNewProducts} />
      <Stack.Screen
        name="home"
        component={home}
        options={{
          headerStyle: {backgroundColor: '#a9a9a9'},
          headerTitle: 'User Home',
        }}
      />
      <Stack.Screen
        name="AgentHome"
        component={AgentHome}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="UserHome"
        component={UserHome}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="EditProduct"
        component={EditProduct}
        options={{
          headerTitle: 'Edit Product',
          headerStyle: {backgroundColor: '#c0c0c0'},
          HeaderBackground: '#da70d6',
        }}
      />

      <Stack.Screen
        name="signUp"
        component={signUp}
        options={{
          headerTitle: 'Sign Up',
          headerStyle: {backgroundColor: '#c0c0c0'},
          HeaderBackground: '#da70d6',
        }}
      />
      <Stack.Screen
        name="accountEdit"
        component={AccountEdit}
        options={{
          headerTitle: 'Edit Account',
          headerStyle: {backgroundColor: '#c0c0c0'},
          HeaderBackground: '#da70d6',
        }}
      />
      <Stack.Screen
        name="userAccountEdit"
        component={userAccountEdit}
        options={{
          headerTitle: 'Edit Account',
          headerStyle: {backgroundColor: '#c0c0c0'},
          HeaderBackground: '#da70d6',
        }}
      />
    </Stack.Navigator>
  );
};

export {AppScreens};
