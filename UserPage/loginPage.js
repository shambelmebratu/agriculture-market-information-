import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import {Form, TextValidator} from 'react-native-validator-form';

class loginPage extends Component {
  constructor() {
    super();

    this.state = {
      id: '',
      role: 'user',
      userName: '',
      password: '',
      selectedUser: [],
      users: [],
    };
  }
  handelUserName = (userName) => {
    this.setState({userName});
  };
  handelPassword = (password) => {
    this.setState({password});
  };

  signup() {
    Actions.SignUp();
  }
  submit = async () => {
    const {navigation} = this.props;
    const {userName, password, role} = this.state;

    let response;
    if (role === 'user') {
      response = await fetch(ServerIp + '/select/user');
    } else {
      response = await fetch(ServerIp + '/select/employee');
    }
    const users = await response.json();
    this.setState({
      selectedUser: users.find(
        (user) => user.userName == userName && user.password == password,
      ),
    });
    const {selectedUser} = this.state;

    if (!selectedUser) {
      navigation.navigate('loginPage');
      alert('Wrong username or password');
    } else {
      if (role === 'user') {
        await AsyncStorage.setItem('userId', selectedUser.UID.toString());
        await AsyncStorage.setItem(
          'locationId',
          selectedUser.locationId.toString(),
        );
        await AsyncStorage.setItem('role', 'user');
        navigation.navigate('UserHome');
      } else {
        await AsyncStorage.setItem('userId', selectedUser.EID.toString());
        await AsyncStorage.setItem(
          'locationId',
          selectedUser.locationId.toString(),
        );

        await AsyncStorage.setItem('role', 'agent');
        navigation.navigate('AgentHome');
      }
    }
  };
  handleSubmit = () => {
    this.refs.form.submit();
  };
  componentDidMount = async () => {
    const {navigation} = this.props;
    if (await AsyncStorage.getItem('role')) {
      if ((await AsyncStorage.getItem('role')) === 'agent') {
        navigation.navigate('AgentHome');
      } else if ((await AsyncStorage.getItem('role')) === 'user') {
        navigation.navigate('UserHome');
      }
    }
  };
  render() {
    const {userName, password} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={{alignSelf: 'center'}}>
            <Image
              source={require('./image/user.png')}
              style={{width: 100, height: 150}}></Image>
          </View>
          <Text style={{fontSize: 28, textAlign: 'center', color: 'grey'}}>
            AMIS
          </Text>
          <Form ref="form" onSubmit={this.submit}>
            <TextValidator
              style={styles.input}
              underlineColorAndroid="#20b2aa"
              validators={['required']}
              errorMessages={['UserName is required']}
              placeholder="UserName"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              value={userName}
              onChangeText={this.handelUserName}
            />
            <TextValidator
              style={styles.input}
              underlineColorAndroid="#20b2aa"
              validators={['required']}
              errorMessages={['Password is required']}
              placeholder="Password"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              value={password}
              secureTextEntry={true}
              onChangeText={this.handelPassword}
            />
            <View style={styles.UserTypeStyle}>
              <Picker
                selectedValue={this.state.role}
                onValueChange={(role) => this.setState({role})}>
                <Picker.Item label="user" value="user" />
                <Picker.Item label="agent" value="agent" />
              </Picker>
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={this.handleSubmit}>
              <Text style={styles.ButtonText}>Login</Text>
            </TouchableOpacity>
          </Form>

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() =>
              this.props.navigation.navigate('signUp', {
                ID: this.state.EID,
                type: 'basic',
              })
            }>
            <Text style={styles.ButtonText}>Create New Account</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default loginPage;

let ServerIp = 'http://10.240.68.57:3001';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  input: {
    marginBottom: 25,
    height: 50,
    borderRadius: 10,
  },
  UserTypeStyle: {
    margin: 15,
    borderColor: '#4169e1',
    borderWidth: 2,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#00ffff',
    padding: 10,
    margin: 15,
    height: 40,
    borderRadius: 10,
  },
  signUpButton: {
    backgroundColor: '#32cd32',
    padding: 10,
    marginLeft: 50,
    marginRight: 50,
    margin: 15,
    marginBottom: 20,
    height: 40,
    borderRadius: 10,
  },
  submitButtonText: {
    color: 'white',
  },
  ButtonText: {
    fontSize: 20,
    color: '#f8f8ff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'capitalize',
  },
});
