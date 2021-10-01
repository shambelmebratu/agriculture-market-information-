import React, {Component} from 'react';
import {Text, Button, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Form, TextValidator} from 'react-native-validator-form';

class signUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    phoneNo: '',
    email: '',
    password: '',
    confirmPassword: '',
    region: '',
    zone: '',
    wereda: '',
    userName: '',
    locationId: '5',
    type: '',
    locations: [],
    users: [],
  };

  handleFirstName = (firstName) => {
    this.setState({firstName});
  };
  handleLastName = (lastName) => {
    this.setState({lastName});
  };
  handlePhoneNo = (phoneNo) => {
    this.setState({phoneNo});
  };
  handleEmail = (email) => {
    this.setState({email});
  };
  handlePassword = (password) => {
    this.setState({password});
  };

  handelConfirmPassword = (confirmPassword) => {
    this.setState({confirmPassword});
  };
  handelUserName = (userName) => {
    this.setState({userName});
  };
  handelRegion = (region) => {
    this.setState({region});
  };
  handelZone = (zone) => {
    this.setState({zone});
  };
  handelWereda = (locationId) => {
    this.setState({locationId});
  };
  handelType = (type) => {
    this.setState({type});
  };

  componentDidMount() {
    fetch(ServerIp + '/select/locations')
      .then((res) => res.json())
      .then((locations) => this.setState({locations}));

    fetch(ServerIp + '/select/users')
      .then((res) => res.json())
      .then((users) => this.setState({users}));
  }

  submit = () => {
    const {navigation} = this.props;
    const {users} = this.state;
    var UID = 'U/00' + (users.length + 1);
    const {
      firstName,
      lastName,
      email,
      phoneNo,
      selectedUser,
      type,
      locationId,
      userName,
      password,
      confirmPassword,
      region,
      zone,
      wereda,
    } = this.state;
    if (type == '') {
      alert('Please choose type');
      return;
    } else if (region == '') {
      alert('Please choose region');
      return;
    } else if (zone == '') {
      alert('Please choose zone');
      return;
    }

    if (password === confirmPassword) {
      fetch(ServerIp + '/select/user')
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            selectedUser: data.find((user) => user.userName === userName),
          });
          if (selectedUser) {
            alert('username already exist');
          } else {
            axios.post(ServerIp + '/add/user', {
              UID,
              firstName,
              lastName,
              email,
              phoneNo,
              type,
              locationId,
              userName,
              password,
            });
            navigation.navigate('loginPage');
          }
        });
    } else alert("password doesn't match");
  };
  handleSubmit = () => {
    this.refs.form.submit();
  };
  render() {
    const {
      firstName,
      lastName,
      email,
      phoneNo,
      userName,
      password,
      role,
      confirmPassword,
    } = this.state;

    const {navigation} = this.props;
    const {locations} = this.state;
    let regionArray = [];
    let zoneArray = [];
    let weredaArray = [];
    let locationIdArray = [];
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={{margin: 10}}>
          <Text style={{fontSize: 28, textAlign: 'center', color: 'grey'}}>
            Create new Account to be a Member
          </Text>
          <Form ref="form" onSubmit={this.submit}>
            <TextValidator
              validators={['required', 'matchRegexp:^[a-zA-Z]']}
              errorMessages={['First Name required', 'not valid name']}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="FirstName"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              value={firstName}
              onChangeText={this.handleFirstName}
            />

            <TextValidator
              validators={['required', 'matchRegexp:^[a-zA-Z]']}
              errorMessages={['Last Name is required', 'not valid name']}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="LastName"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              value={lastName}
              onChangeText={this.handleLastName}
            />

            <TextValidator
              style={styles.input}
              underlineColorAndroid="transparent"
              validators={['required', 'matchRegexp:^[0][9][0-9]{8}$']}
              errorMessages={[
                'phone No is required',
                'format should be like 0921215699',
              ]}
              placeholder="Phone NO (eg: 0921215699)"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              keyboardType="numeric"
              value={phoneNo}
              onChangeText={this.handlePhoneNo}
            />

            <TextValidator
              validators={['isEmail']}
              errorMessages={['invalid Email']}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Email"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              value={email}
              keyboardType="email-address"
              onChangeText={this.handleEmail}
            />
            <TextValidator
              validators={['required']}
              errorMessages={['UserName Required']}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="user Name"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              value={userName}
              onChangeText={this.handelUserName}
            />

            <TextValidator
              validators={[
                'required',
                'minStringLength:6',
                'maxStringLength:16',
              ]}
              errorMessages={[
                'Password is required',
                'minimum length 8',
                'maximum Length 16',
              ]}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Password"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              value={password}
              onChangeText={this.handlePassword}
            />
            <TextValidator
              validators={['required']}
              errorMessages={['confirm your Password']}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Confirm Password"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              value={confirmPassword}
              onChangeText={this.handelConfirmPassword}
            />

            <View style={styles.input}>
              <Picker
                selectedValue={this.state.type}
                style={styles.input}
                onValueChange={this.handelType}>
                <Picker.title label="--- Choose Type --- " value="" />

                <Picker.Item label="consumer" value="consumer" />
                <Picker.Item label="producer" value="producer" />
              </Picker>
            </View>

            {locations.map((locationObject) => {
              //locationObject are single row object in the array
              var regCount = 0;
              for (var i = 0; i < regionArray.length; i++) {
                if (regionArray[i] === locationObject.region) {
                  //== or ===
                  regCount = 1;
                  break;
                }
              }
              if (regCount === 0) {
                //== or ===

                regionArray[regionArray.length] = locationObject.region;
              }
            })}

            <View style={styles.input}>
              <Picker
                selectedValue={this.state.region}
                style={styles.input}
                onValueChange={this.handelRegion}>
                <Picker.title label="--- Choose Region --- " value="" />

                {regionArray.map((regionArray, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={regionArray}
                      value={regionArray}
                    />
                  );
                })}
              </Picker>
            </View>

            {locations.map((locationObject) => {
              if (locationObject.region === this.state.region) {
                var zoneCount = 0;
                for (var i = 0; i < zoneArray.length; i++) {
                  if (zoneArray[i] === locationObject.zone) {
                    //== or ===

                    zoneCount = 1;
                  }
                }
                if (zoneCount === 0) {
                  //== or ===

                  zoneArray[zoneArray.length] = locationObject.zone;
                }
              }
            })}
            <View style={styles.input}>
              <Picker
                selectedValue={this.state.zone}
                onValueChange={this.handelZone}>
                <Picker.title label="--- Choose zone ---" value="" />
                {zoneArray.map((zoneArray, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={zoneArray}
                      value={zoneArray}
                    />
                  );
                })}
              </Picker>
            </View>

            {locations.map((locationObject) => {
              if (
                locationObject.region === this.state.region &&
                locationObject.zone === this.state.zone
              ) {
                weredaArray[weredaArray.length] = locationObject.wereda;
                locationIdArray[locationIdArray.length] = locationObject.LID;
              }
            })}

            <View style={styles.input}>
              <Picker
                selectedValue={this.state.locationId}
                onValueChange={this.handelWereda}>
                <Picker.title label="--- choose woreda ---" value="" />

                {weredaArray.map((weredaArray, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={weredaArray}
                      value={locationIdArray[index]}
                    />
                  );
                })}
              </Picker>
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={this.handleSubmit}
              title="Sign Up">
              <Text style={styles.ButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </Form>

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() =>
              this.props.navigation.navigate('loginPage', {
                ID: this.state.EID,
                type: 'basic',
              })
            }>
            <Text style={styles.ButtonText}>Back To Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default signUp;

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
    paddingBottom: 30,
  },
  input: {
    marginBottom: 15,
    height: 50,
    borderColor: '#4169e1',
    borderWidth: 1,
    borderBottomEndRadius: 10,
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

let ServerIp = 'http://10.240.68.57:3001';
