import React, {Component} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import CheckBox from 'react-native-check-box';
import {Picker} from '@react-native-picker/picker';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Col, Row, Grid} from 'react-native-easy-grid';

class AdvancedSearchPage extends Component {
  constructor() {
    super();
    this.state = {
      myLat: 0,
      myLong: 0,
      products: [],
      chartProducts: [],
      locations: [],
      region: '',
      zone: '',
      type: '',
      name: '',
      wereda: '',
      data: [],
      dateFrom: '',
      dateTo: '',
      filteredProducts: [],
      rowProducts: [],
      searchKey: '',
      today: '',
      startDate: '',
      typeCheck: 0,
      nameCheck: 0,
      locationCheck: 0,
      dateCheck: 0,
      isType: false,
      isName: false,
      isLocation: false,
      role: '',
      userId: '',
    };
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
    this.searchData();
  };

  checkMethod = (e) => {
    if ([e.target.value] == 1) {
      this.setState({[e.target.name]: 0});
    } else {
      this.setState({[e.target.name]: 1});
    }
  };

  defaultData = () => {
    //recommended Data

    fetch(ServerIp + '/select/productposts')
      .then((res) => res.json())
      .then((filteredProducts) =>
        this.setState({
          filteredProducts: filteredProducts.filter((element) => {
            return element.status == 1;
          }),
        }),
      );
  };
  userHistory = (searchKey, searchMethod) => {
    const {userId} = this.state;
    fetch(ServerIp + `/select/userhistory`)
      .then((response) => response.json())
      .then((data) => {
        const userhistory = data.find((element) => {
          return (
            element.userID == userId &&
            element.searchKey == searchKey &&
            element.searchMethod == searchMethod
          );
        });

        if (userhistory) {
          let UHID = userhistory.UHID;
          let frequency = userhistory.frequency;
          axios.post(ServerIp + `/edit/userHistory`, {UHID, frequency});
        } else {
          axios.post(ServerIp + `/add/userHistory`, {
            userId,
            searchMethod,
            searchKey,
          });
        }
      });
  };
  searchData = (searchName) => {
    const {role} = this.state;
    fetch(ServerIp + `/select/productposts`)
      .then((response) => response.json())
      .then((data) => {
        const {type, name, region, zone, wereda, dateFrom, dateTo} = this.state;

        var firstDate = Date.parse(dateFrom);
        var lastDate = Date.parse(dateTo);

        const filteredProducts = data.filter((element) => {
          return (
            element.productType.toLowerCase().includes(type.toLowerCase()) &&
            element.productName.toLowerCase().includes(name.toLowerCase()) &&
            element.region.toLowerCase().includes(region.toLowerCase()) &&
            element.zone.toLowerCase().includes(zone.toLowerCase()) &&
            element.wereda.toLowerCase().includes(wereda.toLowerCase()) &&
            element.status == 1
          );
        });

        this.setState({
          data,
          filteredProducts,
        });
        if (filteredProducts.length > 0 && role == 'user') {
          if (searchName == 'type') {
            this.userHistory(type, 'productType');
          }
          if (searchName == 'name') {
            this.userHistory(name, 'productName');
          }
          if (searchName == 'region') {
            this.userHistory(region, 'region');
          }
          if (searchName == 'zone') {
            this.userHistory(zone, 'zone');
          }
          if (searchName == 'wereda') {
            this.userHistory(wereda, 'wereda');
          }
        }
      });
  };

  componentDidMount = async () => {
    rol = await AsyncStorage.getItem('role');
    uId = await AsyncStorage.getItem('userId');
    this.setState({role: rol, userId: uId});
    var t = new Date();
    var tday = t.toISOString().substr(0, 10);
    var y = new Date(Date.now() - 7 * 86400000);
    var yesterday = y.toISOString().substr(0, 10);
    var stDate = new Date(Date.now() - 30 * 86400000)
      .toISOString()
      .substr(0, 10);

    this.setState({
      dateFrom: yesterday,
      dateTo: tday,
      today: tday,
      startDate: stDate,
    });

    fetch(ServerIp + '/select/locations')
      .then((res) => res.json())
      .then((locations) => this.setState({locations}));

    fetch(ServerIp + '/select/productcatagory')
      .then((res) => res.json())
      .then((rowProducts) => this.setState({rowProducts}));

    this.defaultData();
  };

  handelRegion = (text) => {
    this.setState({region: text});
    this.searchData('region');
  };
  handelZone = (text) => {
    this.setState({zone: text});
    this.searchData('zone');
  };
  handelWereda = (text) => {
    this.setState({wereda: text});
    this.searchData('wereda');
  };
  handelType = (text) => {
    this.setState({type: text});
    this.searchData('type');
  };
  handelName = (text) => {
    this.setState({name: text});
    this.searchData('name');
  };
  render() {
    const {
      filteredProducts,
      locations,
      type,
      name,
      region,
      zone,
      wereda,
      rowProducts,
      dateFrom,
      dateTo,
      today,
      startDate,
      searchKey,
    } = this.state;
    const {typeCheck, nameCheck, locationCheck, dateCheck} = this.state;
    const regionArray = [];
    const zoneArray = [];
    const weredaArray = [];
    const typeArray = [];
    const nameArray = [];
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={{margin: 10}}>
          <Grid>
            <Row>
              <Col style={styles.ColomenView}>
                <CheckBox
                  style={{}}
                  onClick={() => {
                    this.setState({
                      isType: !this.state.isType,
                    });
                  }}
                  isChecked={this.state.isType}
                  leftText={'Type'}
                />
              </Col>
              <Col style={styles.ColomenView}>
                <CheckBox
                  onClick={() => {
                    this.setState({
                      isName: !this.state.isName,
                    });
                  }}
                  isChecked={this.state.isName}
                  leftText={'Name'}
                />
              </Col>
              <Col style={styles.ColomenView}>
                <CheckBox
                  onClick={() => {
                    this.setState({
                      isLocation: !this.state.isLocation,
                    });
                  }}
                  isChecked={this.state.isLocation}
                  leftText={'Location'}
                />
              </Col>
            </Row>
            <Row>
              <Col style={styles.ColomenView}>
                {rowProducts.map((rowProductObject) => {
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

                {this.state.isType ? (
                  <Picker
                    selectedValue={this.state.type}
                    style={styles.input}
                    onValueChange={this.handelType}>
                    <Picker.Item label="Choose Type " value="" />

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
                ) : null}
              </Col>
              <Col style={styles.ColomenView}>
                {rowProducts.map((rowProductObject) => {
                  //locationObject are single row object in the array

                  if (
                    rowProductObject.productType
                      .toLowerCase()
                      .includes(this.state.type.toLowerCase())
                  ) {
                    nameArray[nameArray.length] = rowProductObject.productName;
                  }
                })}
                {this.state.isName ? (
                  <Picker
                    selectedValue={this.state.name}
                    style={styles.input}
                    onValueChange={this.handelName}>
                    <Picker.Item label="Choose Name " value="" />

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
                ) : null}
              </Col>
            </Row>
            <Row>
              <Col style={styles.ColomenView}>
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
                {this.state.isLocation ? (
                  <Picker
                    selectedValue={this.state.region}
                    style={styles.input}
                    onValueChange={this.handelRegion}>
                    <Picker.Item label="Region " value="" />

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
                ) : null}
              </Col>
              <Col style={styles.ColomenView}>
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
                {this.state.isLocation ? (
                  <Picker
                    selectedValue={this.state.zone}
                    style={styles.input}
                    onValueChange={this.handelZone}>
                    <Picker.Item label="zone" value="" />
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
                ) : null}
              </Col>
              <Col style={styles.ColomenView}>
                {locations.map((locationObject) => {
                  if (
                    locationObject.region === this.state.region &&
                    locationObject.zone === this.state.zone
                  ) {
                    weredaArray[weredaArray.length] = locationObject.wereda;
                    //  locationIdArray[locationIdArray.length]=locationObject.LID;
                  }
                })}
                {this.state.isLocation ? (
                  <Picker
                    selectedValue={this.state.wereda}
                    style={styles.input}
                    onValueChange={this.handelWereda}>
                    <Picker.Item label="choose woreda " value="" />

                    {weredaArray.map((weredaArray, index) => {
                      return (
                        <Picker.Item
                          key={index}
                          label={weredaArray}
                          value={weredaArray}
                        />
                      );
                    })}
                  </Picker>
                ) : null}
              </Col>
            </Row>
          </Grid>

          {filteredProducts.map((product) => {
            return (
              <Text
                key={product.PPID}
                style={{
                  textAlign: 'center',
                  color: '#008080',
                  fontSize: 18,
                  borderBottomWidth: 8,
                  borderLeftWidth: 10,
                  borderRadius: 20,
                  marginBottom: 25,
                  borderColor: '#696969',
                }}>
                <Text style={{alignItems: 'center', fontSize: 28}}>
                  {product.productName}
                </Text>
                {'\n'}
                Price: {product.minPrice} - {product.maxPrice} per{' '}
                {product.unit}
                {'\n'}
                Market : {product.wereda}
                {'\n'}
                <TouchableOpacity
                  style={styles.CustomButton}
                  onPress={() =>
                    Alert.alert(
                      'More detail about ' + product.productName,
                      'Level: ' +
                        product.demandLevel +
                        '\nAvailablity: ' +
                        product.availablity +
                        '\nquality: ' +
                        product.quality +
                        '\ndemand Level: ' +
                        product.demandLevel +
                        '\nproduct Type: ' +
                        product.productType +
                        '\nPost Date: ' +
                        product.postDate,
                    )
                  }
                  style={styles.CustomButton}>
                  <Text style={styles.ButtonText}>More</Text>
                </TouchableOpacity>
              </Text>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default AdvancedSearchPage;

let ServerIp = 'http://10.240.68.57:3001';
let searchName = 'avocado';

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    marginBottom: 20,
    flex: 1,
    padding: 30,
  },
  ColomenView: {
    borderColor: '#2f4f4f',
    borderWidth: 3,
  },

  CustomButton: {
    elevation: 3,
    backgroundColor: '#778899',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 40,
    marginBottom: 20,
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
});
let recommendValue = new Array();
let recommendedData = new Array();
var recommendId = new Array();
