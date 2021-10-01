import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
class AccountView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEmployee: [],
      selectedLocation: [],
      EID: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNo: '',
      role: 'agent',
      locationId: 0,
      region: '',
      zone: '',
      wereda: '',
      kebele: '',
      isActive: 1,
    };
  }
  fetchData = async () => {
    const {selectedLocation} = this.state;
    var myId = await AsyncStorage.getItem('userId');

    let myLocId;
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
          userName: selectedEmployee.userName,
          locationId: selectedEmployee.locationId,
        });
        myLocId = data.find((employee) => employee.EID == myId).locationId;
        fetch(ServerIp + '/select/locations')
          .then((res) => res.json())
          .then((data) => {
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
  };
  componentDidMount() {
    this.fetchData();
  }

  render() {
    const {products, appr} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={{margin: 10}}>
          <View style={styles.PickerStyle}>
            <Picker
              selectedValue={this.state.isActive}
              onValueChange={(isActive) => this.setState({isActive})}>
              <Picker.Item label="basic info" value="1" />
              <Picker.Item label="address info" value="2" />
              <Picker.Item label="account info" value="3" />
            </Picker>
          </View>

          {this.state.isActive == '1' ? (
            <View>
              <Text style={styles.viewInfo}>
                ID: {this.state.EID} {'\n'}
                Full Name: {this.state.firstName} {this.state.lastName}
              </Text>

              <TouchableOpacity
                title="Edit"
                style={styles.submitButton}
                onPress={() =>
                  this.props.navigation.navigate('accountEdit', {
                    ID: this.state.EID,
                    type: 'basic',
                  })
                }>
                <Text style={styles.ButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {this.state.isActive == '2' ? (
            <View>
              <Text style={styles.viewInfo}>
                Phone: {this.state.phoneNo}
                {'\n'}
                E-mail: {this.state.email}
                {'\n'}
                Region : {this.state.region} {'\n'}
                Zone : {this.state.zone} {'\n'}
                Wereda : {this.state.wereda}
              </Text>

              <Button
                title="Edit"
                onPress={() =>
                  this.props.navigation.navigate('accountEdit', {
                    ID: this.state.EID,
                    type: 'address',
                  })
                }
              />
            </View>
          ) : null}
          {this.state.isActive == '3' ? (
            <View>
              <Text style={styles.viewInfo}>
                userName: {this.state.userName}
              </Text>

              <Button
                title="Edit"
                onPress={() =>
                  this.props.navigation.navigate('accountEdit', {
                    ID: this.state.EID,
                    type: 'account',
                  })
                }
              />
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default AccountView;

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  ButtonText: {
    fontSize: 20,
    color: '#f0ffff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'capitalize',
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  viewInfo: {
    textAlign: 'center',
    fontSize: 24,
    borderBottomWidth: 10,
    borderLeftWidth: 15,
    borderRadius: 10,
    margin: 5,
    padding: 10,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  PickerStyle: {
    borderColor: '#2f4f4f',
    borderWidth: 3,
    margin: 5,
  },
});

let ServerIp = 'http://10.240.68.57:3001';
