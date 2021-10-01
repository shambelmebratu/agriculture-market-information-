import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  View,
  AsyncStorage,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Form, TextValidator} from 'react-native-validator-form';

class AddNewProducts extends Component {
  constructor() {
    super();
    this.state = {
      productType: '',
      productName: '',
      unit: '',
      identity: '',
      productId: 0,
      region: '',
      zone: '',
      wereda: '',
      locationId: 0,
      quality: '',
      availablity: '',
      demandLevel: '',
      minPrice: '',
      maxPrice: '',
      postedBy: 0,
      approvedBy: 0,
      locations: [],
      useMyLocation: true,
      selectedLocation: [],
      selectedProduct: [],
      productsCatagory: [],
      error: '',
      status: '0',
    };
  }
  handelMinPrice = (minPrice) => {
    this.setState({minPrice});
  };
  handelMaxPrice = (maxPrice) => {
    this.setState({maxPrice});
  };
  componentDidMount = async () => {
    let locId = await AsyncStorage.getItem('locationId');
    fetch(ServerIp + '/select/locations')
      .then((res) => res.json())
      .then((locations) => this.setState({locations}));
    fetch(ServerIp + '/select/locations')
      .then((res) => res.json())
      .then((data) => {
        const locat = data.find((element) => {
          return element.LID == locId;
        });
        if (locat)
          this.setState({
            region: locat.region,
            zone: locat.zone,
            wereda: locat.wereda,
            locationId: locat.LID,
          });
      });
    fetch(ServerIp + '/select/productcatagory')
      .then((res) => res.json())
      .then((productsCatagory) => this.setState({productsCatagory}));
  };

  submit = async () => {
    const {navigation} = this.props;
    const {
      productId,
      locationId,
      quality,
      availablity,
      demandLevel,
      minPrice,
      status,
      maxPrice,
      postedBy,
      approvedBy,
      productType,
      productName,
      identity,
      unit,
    } = this.state;
    if (productType == '') {
      alert('Please choose product type');
      return;
    } else if (productName == '') {
      alert('Please choose product Name');
      return;
    } else if (productId == '') {
      alert('Please choose identity');
      return;
    } else if (unit == '') {
      alert('Please choose Unit ');
      return;
    }  else if (quality == '') {
      alert('Please choose quality');
      return;
    } else if (demandLevel == '') {
      alert('Please choose Demand Level ');
      return;
    }  else if (wereda == '') {
      alert('Please choose woreda');
      return;
    } else if (demandLevel == '') {
      alert('Please choose Demand Level ');
      return;
    } else if (minPrice >= maxPrice) {
      alert('check your min and max price please');
    } 
    else {
      axios.post(ServerIp + '/add/productpost', {
        productId,
        quality,
        availablity,
        demandLevel,
        locationId,
        minPrice,
        maxPrice,
        postedBy,
        approvedBy,
        status,
      });
      alert('add product successfully');
      navigation.navigate('EditProduct');
    }
  };

  handelProductType = (text) => {
    this.setState({productType: text});
  };
  handelProductName = (text) => {
    this.setState({productName: text});
  };

  handelIdentity = (text) => {
    this.setState({productId: text});
  };

  handelUnit = (text) => {
    this.setState({unit: text});
  };
  handelQuality = (text) => {
    this.setState({quality: text});
  };

  handelAvailablity = (text) => {
    this.setState({availablity: text});
  };
  handelDemandLevel = (text) => {
    this.setState({demandLevel: text});
  };

  handelWereda = (text) => {
    this.setState({locationId: text});
  };

  handleSubmit = () => {
    this.refs.form.submit();
  };
  render() {
    const {productsCatagory, locations, minPrice, maxPrice} = this.state;
    const {navigation} = this.props;
    let regionArray = [];
    let zoneArray = [];
    let weredaArray = [];
    let typeArray = [];
    let nameArray = [];
    let identityArray = [];
    let productIdArray = [];
    let locationIdArray = [];
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={{margin: 10}}>
          <Text style={{fontSize: 28, textAlign: 'center', color: 'grey'}}>
            Add New product
          </Text>
          <Form ref="form" onSubmit={this.submit}>
            {productsCatagory.map((rowProductObject) => {
              var typeCount = 0;
              for (var i = 0; i < typeArray.length; i++) {
                if (typeArray[i] === rowProductObject.productType) {
                  typeCount = 1;
                  break;
                }
              }
              if (typeCount === 0) {
                typeArray[typeArray.length] = rowProductObject.productType;
              }
            })}
            <View style={styles.input}>
              <Picker
                selectedValue={this.state.productType}
                style={styles.PickerStyle}
                itemStyle={{fontFamily: 'Ebrim', backgroundColor: '#bdb76b'}}
                onValueChange={this.handelProductType}>
                <Picker.Item label="--- Choose Type --- " value="" />

                {typeArray.map((typeArray, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={typeArray}
                      value={typeArray}
                    />
                  );
                })}
              </Picker>
            </View>

            {productsCatagory.map((rowProductObject) => {
              //locationObject are single row object in the array

              if (rowProductObject.productType == this.state.productType) {
                nameArray[nameArray.length] = rowProductObject.productName;
              }
            })}

            <View style={styles.input}>
              <Picker
                selectedValue={this.state.productName}
                style={styles.PickerStyle}
                onValueChange={this.handelProductName}>
                <Picker.Item label="--- Choose Name --- " value="" />

                {nameArray.map((nameArray, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={nameArray}
                      value={nameArray}
                    />
                  );
                })}
              </Picker>
            </View>

            {productsCatagory.map((rowProductObject) => {
              //locationObject are single row object in the array

              if (
                rowProductObject.productType == this.state.productType &&
                rowProductObject.productName == this.state.productName
              ) {
                identityArray[identityArray.length] = rowProductObject.identity;
                productIdArray[productIdArray.length] = rowProductObject.PCID;
              }
            })}

            <View style={styles.input}>
              <Picker
                selectedValue={this.state.productId}
                style={styles.PickerStyle}
                onValueChange={this.handelIdentity}>
                <Picker.Item label="--- Choose Identity ---  " value="" />

                {identityArray.map((identityArray, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={identityArray}
                      value={productIdArray[index]}
                    />
                  );
                })}
              </Picker>
            </View>

            <View style={styles.input}>
              <Picker
                selectedValue={this.state.unit}
                style={styles.PickerStyle}
                onValueChange={this.handelUnit}>
                <Picker.Item label="--- choose unit --- " value="" />
                <Picker.Item label="kg" value="kg" />
              </Picker>
            </View>

            <View style={styles.input}>
              <Picker
                selectedValue={this.state.quality}
                style={styles.PickerStyle}
                onValueChange={this.handelQuality}>
                <Picker.Item label="--- Choose quality --- " value="" />
                <Picker.Item label="Maximum" value="maximum" />
                <Picker.Item label="medium" value="medium" />
                <Picker.Item label="Minimum" value="minimum" />
              </Picker>
            </View>

            <View style={styles.input}>
              <Picker
                selectedValue={this.state.demandLevel}
                style={styles.PickerStyle}
                onValueChange={this.handelDemandLevel}>
                <Picker.Item label="--- Choose demand Level --- " value="" />
                <Picker.Item label="High" value="high" />
                <Picker.Item label="Medium" value="medium" />
                <Picker.Item label="Low" value="low" />
              </Picker>
            </View>

            <View style={styles.input}>
              <Picker
                selectedValue={this.state.availablity}
                style={styles.PickerStyle}
                onValueChange={this.handelAvailablity}>
                <Picker.Item label="--- Choose availablity --- " value="" />
                <Picker.Item label="excess" value="excess" />
                <Picker.Item label="medium" value="medium" />
                <Picker.Item label="Low" value="low" />
              </Picker>
            </View>

            <TextValidator
              style={styles.input}
              validators={['required', 'isNumber', 'isPositive']}
              errorMessages={[
                'minimum price is required',
                'invalid price',
                'must Be positive Number',
              ]}
              underlineColorAndroid="transparent"
              placeholder="min Price"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              keyboardType="numeric"
              value={minPrice}
              onChangeText={this.handelMinPrice}
            />
            <TextValidator
              style={styles.input}
              validators={['required', 'isNumber', 'isPositive']}
              errorMessages={[
                'maximum price is required',
                'invalid price',
                'must Be positive Number',
              ]}
              underlineColorAndroid="transparent"
              placeholder="max Price"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              keyboardType="numeric"
              value={maxPrice}
              onChangeText={this.handelMaxPrice}
            />

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
                style={styles.PickerStyle}
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

            <TouchableOpacity
              style={styles.submitButton}
              onPress={this.handleSubmit}>
              <Text style={styles.ButtonText}>Add Product</Text>
            </TouchableOpacity>
          </Form>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default AddNewProducts;

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
    paddingBottom: 30,
  },
  ColomenView: {
    borderColor: '#2f4f4f',
    borderWidth: 3,
  },
  input: {
    marginBottom: 15,
    height: 50,
    borderColor: '#4169e1',
    borderWidth: 1,
    borderRadius: 15,
  },

  ButtonText: {
    fontSize: 20,
    color: '#f8f8ff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'capitalize',
  },
  PickerStyle: {
    color: '#4169e1',
    borderBottomColor: '#7a42f4',
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
