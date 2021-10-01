import React, {Component} from 'react';
import {Text, Button, TextInput, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

class EditProduct extends Component {
  constructor() {
    super();
    this.state = {
      product: [],
      productId: '',
      PPID: '',
      PCID: '',
      productName: '',
      productType: '',

      unit: '',
      quality: '',
      demandLevel: '',
      availablity: '',

      LID: '',
      minPrice: '',
      maxPrice: '',
      date: '',
      postedBy: '',
      locationId: '',
      locations: [],
      productsCatagory: [],
    };
  }

  state = {product: []};

  componentDidMount() {
    const {route} = this.props;
    const id = route.params.productId;
    fetch(ServerIp + '/select/productposts')
      .then((res) => res.json())
      .then((data) => {
        this.setState({product: data.find((product) => product.PPID == id)});
        const {product} = this.state;
        this.setState({
          PPID: product.PPID,
          PCID: product.PCID,
          productType: product.productType,
          productName: product.productName,
          unit: product.unit,
          quality: product.quality,
          demandLevel: product.demandLevel,
          availablity: product.availablity,
          LID: product.LID,
          region: product.region,
          zone: product.zone,
          woreda: product.wereda,
          minPrice: product.minPrice,
          maxPrice: product.maxPrice,
          date: product.date,
          postedBy: product.postedBy,
        });
      });
    fetch(ServerIp + '/select/locations')
      .then((res) => res.json())
      .then((locations) => this.setState({locations}));

    fetch(ServerIp + '/select/productcatagory')
      .then((res) => res.json())
      .then((productsCatagory) => this.setState({productsCatagory}));
  }

  onSubmit = async () => {
    const {navigation} = this.props;
    const {
      PCID,
      quality,
      demandLevel,
      availablity,
      LID,
      minPrice,
      maxPrice,
      PPID,
    } = this.state;

    axios.post(ServerIp + '/edit/productpost', {
      PCID,
      quality,
      demandLevel,
      availablity,
      LID,
      minPrice,
      maxPrice,
      PPID,
    });

    navigation.navigate('AgentHome');
  };

  handelProductType = (text) => {
    this.setState({productType: text});
  };
  handelProductName = (text) => {
    this.setState({productName: text});
  };

  handelIdentity = (text) => {
    this.setState({PCID: text});
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
  handelRegion = (text) => {
    this.setState({region: text});
  };
  handelZone = (text) => {
    this.setState({zone: text});
  };
  handelWereda = (text) => {
    this.setState({LID: text});
  };

  render() {
    const {productsCatagory, locations} = this.state;
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
            Edit product
          </Text>
          {productsCatagory.map((rowProductObject) => {
            //locationObject are single row object in the array
            var typeCount = 0;
            for (var i = 0; i < typeArray.length; i++) {
              if (typeArray[i] === rowProductObject.productType) {
                //== or ===
                typeCount = 1;
                break;
              }
            }
            if (typeCount === 0) {
              //== or ===

              typeArray[typeArray.length] = rowProductObject.productType;
            }
          })}
          <Picker
            selectedValue={this.state.productType}
            style={styles.input}
            onValueChange={this.handelProductType}>
            <Picker.Item label="Choose Type " value="" />

            {typeArray.map((typeArray, index) => {
              return (
                <Picker.Item key={index} label={typeArray} value={typeArray} />
              );
            })}
          </Picker>
          {productsCatagory.map((rowProductObject) => {
            //locationObject are single row object in the array

            if (rowProductObject.productType == this.state.productType) {
              nameArray[nameArray.length] = rowProductObject.productName;
            }
          })}
          <Picker
            selectedValue={this.state.productName}
            style={styles.input}
            onValueChange={this.handelProductName}>
            <Picker.Item label="Choose Name " value="" />

            {nameArray.map((nameArray, index) => {
              return (
                <Picker.Item key={index} label={nameArray} value={nameArray} />
              );
            })}
          </Picker>
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
          <Picker
            selectedValue={this.state.PCID}
            style={styles.input}
            onValueChange={this.handelIdentity}>
            <Picker.Item label="Choose Identity " value="" />

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

          <Picker
            selectedValue={this.state.unit}
            style={styles.input}
            onValueChange={this.handelUnit}>
            <Picker.Item label="--- choose unit --- " value="" />
            <Picker.Item label="kg" value="kg" />
          </Picker>

          <Picker
            selectedValue={this.state.quality}
            style={styles.input}
            onValueChange={this.handelQuality}>
            <Picker.Item label="--- Choose quality --- " value="" />
            <Picker.Item label="Maximum" value="maximum" />
            <Picker.Item label="medium" value="medium" />
            <Picker.Item label="Minimum" value="minimum" />
          </Picker>

          <Picker
            selectedValue={this.state.demandLevel}
            style={styles.input}
            onValueChange={this.handelDemandLevel}>
            <Picker.Item label="--- Choose demand Level --- " value="" />
            <Picker.Item label="High" value="high" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="Low" value="low" />
          </Picker>

          <Picker
            selectedValue={this.state.availablity}
            style={styles.input}
            onValueChange={this.handelAvailablity}>
            <Picker.Item label="--- Choose availablity --- " value="" />
            <Picker.Item label="excess" value="excess" />
            <Picker.Item label="medium" value="medium" />
            <Picker.Item label="Low" value="low" />
          </Picker>

          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="min Price"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={(minPrice) => this.setState({minPrice})}
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="max Price"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={(maxPrice) => this.setState({maxPrice})}
          />
         
          <Button
            style={styles.submitButton}
            onPress={this.onSubmit}
            title="Update Product"></Button>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default EditProduct;

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
    borderRadius:15,
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
