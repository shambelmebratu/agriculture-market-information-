import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

class AccountEdit extends Component {
  constructor() {
    super();
    this.state = {
      selectedEmployee: [],
      selectedLocation: [],
      EID: 0,
      firstName: '',
      lastName: '',
      email: '',
      phoneNo: '',
      locationId: 0,
      role: 'agent',
      region: '',
      zone: '',
      wereda: '',
      latitude: 0.0,
      longtiude: 0.0,
      userName: '',
      oldPassword: '',
      confirmOldPassword: '',
      password: '',
      confirmPassword: '',
      locations: [],
      typeChange: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleFirstName = (text) => {
    this.setState({firstName: text});
  };
  handleLastName = (text) => {
    this.setState({lastName: text});
  };
  handlePhoneNo = (text) => {
    this.setState({phoneNo: text});
  };
  handleEmail = (text) => {
    this.setState({email: text});
  };
  handlePassword = (text) => {
    this.setState({password: text});
  };

  handelConfirmPassword = (text) => {
    this.setState({confirmPassword: text});
  };
  handelUserName = (text) => {
    this.setState({userName: text});
  };
  handelRegion = (text) => {
    this.setState({region: text});
  };
  handelZone = (text) => {
    this.setState({zone: text});
  };
  handelWereda = (text) => {
    this.setState({locationId: text});
  };
  handelType = (text) => {
    this.setState({type: text});
  };

  componentDidMount() {
    const {route} = this.props;
    const myId = route.params.ID;
    this.setState({typeChange: route.params.type});
    fetch(ServerIp + '/select/employee')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          selectedEmployee: data.find((employee) => employee.EID == myId),
        });
        const {selectedEmployee} = this.state;
        this.setState({
          EID: selectedEmployee.EID,
          firstName: selectedEmployee.firstName,
          lastName: selectedEmployee.lastName,
          email: selectedEmployee.email,
          phoneNo: selectedEmployee.phoneNo,
          locationId: selectedEmployee.locationId,
          region: selectedEmployee.region,
          zone: selectedEmployee.zone,
          wereda: selectedEmployee.wereda,
          userName: selectedEmployee.userName,
          oldPassword: selectedEmployee.password,
        });
        myLocId = data.find((employee) => employee.EID == myId).locationId;
        fetch(ServerIp + '/select/locations')
          .then((res) => res.json())
          .then((data) => {
            {
              this.setState({locations: data});
            }
            this.setState({
              selectedLocation: data.find(
                (location) => location.LID == myLocId,
              ),
            });
            const {selectedLocation} = this.state;
            this.setState({
              region: selectedLocation.region,
              zone: selectedLocation.zone,
              wereda: selectedLocation.wereda,
            });
          });
      });
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };
  onSubmit = (e) => {
    e.preventDefault();
    const {
      EID,
      firstName,
      lastName,
      email,
      phoneNo,
      role,
      locationId,
      userName,
      password,
      confirmPassword,
      confirmOldPassword,
      oldPassword,
    } = this.state;
    if (password) {
      if (confirmOldPassword === oldPassword && confirmPassword === password) {
        axios.post(ServerIp + '/edit/employee', {
          EID,
          firstName,
          lastName,
          email,
          phoneNo,
          role,
          locationId,
          userName,
          password,
        });
        this.props.navigation.navigate('AgentHome');
      }
    } else {
      const password = oldPassword;
      axios.post(ServerIp + '/edit/employee', {
        EID,
        firstName,
        lastName,
        email,
        phoneNo,
        role,
        locationId,
        userName,
        password,
      });
      this.props.navigation.navigate('AgentHome')
    }
  };

  render() {
    const {navigation} = this.props;
    const {locations, typeChange} = this.state;
    let regionArray = [];
    let zoneArray = [];
    let weredaArray = [];
    let locationIdArray = [];
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={{margin: 10}}>
          <Text style={{fontSize: 28, textAlign: 'center', color: 'grey'}}>
            Edit Account
          </Text>
          {typeChange == 'basic' ? (
            <View>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="FirstName"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                value={this.state.firstName}
                onChangeText={this.handleFirstName}
              />

              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="LastName"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                value={this.state.lastName}
                onChangeText={this.handleLastName}
              />
              
            </View>
          ) : null}
          {typeChange == 'address' ? (
            <View>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Phone NO"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                value={this.state.phoneNo}
                onChangeText={this.handlePhoneNo}
              />

              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Email"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                value={this.state.email}
                onChangeText={this.handleEmail}
              />
              {locations.map((locationObject) => {
                //locationObject are single row object in the array
                var regCount = 0;
                for (var i = 0; i < regionArray.length; i++) {
                  if (regionArray[i] === locationObject.region) {
                    regCount = 1;
                    break;
                  }
                }
                if (regCount === 0) {
                  regionArray[regionArray.length] = locationObject.region;
                }
              })}
              <Picker
                selectedValue={this.state.region}
                style={styles.input}
                onValueChange={this.handelRegion}>
                <Picker.Item label="--- Choose Region --- " value="" />

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

              {locations.map((locationObject) => {
                if (locationObject.region === this.state.region) {
                  var zoneCount = 0;
                  for (var i = 0; i < zoneArray.length; i++) {
                    if (zoneArray[i] === locationObject.zone) {
                      zoneCount = 1;
                    }
                  }
                  if (zoneCount === 0) {
                    zoneArray[zoneArray.length] = locationObject.zone;
                  }
                }
              })}
              <Picker
                selectedValue={this.state.zone}
                style={styles.input}
                onValueChange={this.handelZone}>
                <Picker.Item label="--- Choose zone ---" value="" />
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

              {locations.map((locationObject) => {
                if (
                  locationObject.region === this.state.region &&
                  locationObject.zone === this.state.zone
                ) {
                  weredaArray[weredaArray.length] = locationObject.wereda;
                  locationIdArray[locationIdArray.length] = locationObject.LID;
                }
              })}
              <Picker
                selectedValue={this.state.locationId}
                style={styles.input}
                onValueChange={this.handelWereda}>
                <Picker.Item label="--- choose woreda ---" value="" />

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
          ) : null}
          {typeChange == 'account' ? (
            <View>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="user Name"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                value={this.state.userName}
                onChangeText={this.handelUserName}
              />

              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Password"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={this.handlePassword}
              />
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Confirm Password"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={this.handelConfirmPassword}
              />
            </View>
          ) : null}

          <Button
            style={styles.submitButton}
            onPress={this.onSubmit}
            title="Update Profile"></Button>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default AccountEdit;

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
    paddingBottom: 30,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 2,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white',
  },
});

let ServerIp = 'http://10.240.68.57:3001';
