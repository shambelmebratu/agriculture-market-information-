import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  LogBox,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {Col, Row, Grid} from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

LogBox.ignoreAllLogs();

class DefaultPage extends Component {
  constructor() {
    super();
    this.state = {
      filteredProducts: [],
      rowProducts: [],
      searchKey: '',
      today: '',
      startDate: '',
    };
  }

  onChang = (event) => {
    this.setState({[event.target.name]: event.target.value});
    this.generalSearch();
  };

  defaultData = () => {
    //recommended Data

    fetch(ServerIp + '/select/userhistory')
      .then((res) => res.json())
      .then((uHistory) => {
        const userHistory = uHistory;

        fetch(ServerIp + '/select/productposts')
          .then((res) => res.json())
          .then((produ) => {
            const products = produ.filter((element) => {
              return element.status == 1;
            });

            var x;

            for (x = 0; x < userHistory.length; x++) {
              //viewed data length by specific user

              var searchMethodArray = [];
              var searchKeyArray = [];
              var num = 0;
              {
                userHistory.map((userHistoryObject) => {
                  //
                  num++;
                  var Count = 0;
                  for (var i = 0; i < searchMethodArray.length; i++) {
                    if (
                      searchMethodArray[i] === userHistoryObject.searchMethod
                    ) {
                      //== or ===

                      Count = 1;
                      break;
                    }
                  } //
                  if (Count === 0 && num > x) {
                    //== or ===

                    searchMethodArray[searchMethodArray.length] =
                      userHistoryObject.searchMethod;
                    searchKeyArray[searchKeyArray.length] =
                      userHistoryObject.searchKey;
                  }
                });
              }

              while (searchMethodArray.length > 0) {
                {
                  products.map((product) => {
                    let index;
                    for (index = 0; index < searchMethodArray.length; index++) {
                      if (
                        product[searchMethodArray[index]] !=
                        searchKeyArray[index]
                      ) {
                        break;
                      }
                    }
                    if (index === searchMethodArray.length) {
                      let l;
                      for (l = 0; l < recommendId.length; l++) {
                        if (recommendId[l] === product.PPID) {
                          break;
                        }
                      }
                      if (l === recommendId.length) {
                        recommendId[recommendId.length] = product.PPID;
                        recommendValue.push(JSON.stringify(product));
                      }
                    }
                  });
                }
                searchKeyArray.splice(searchKeyArray.length - 1, 1);
                searchMethodArray.splice(searchMethodArray.length - 1, 1);
              }
            }

            recommendValue.map((recValue) => {
              recommendedData.push(JSON.parse(recValue));
            });

            recommendedData = recommendedData.concat(products);
            this.setState({
              filteredProducts: Array.from(
                new Set(recommendedData.map(JSON.stringify)),
              ).map(JSON.parse),
            });
          });
      });
  };

  generalSearch = (text) => {
    this.setState({searchKey: text});

    fetch(ServerIp + `/select/productposts`)
      .then((response) => response.json())
      .then((data) => {
        const {searchKey} = this.state;
        const filteredProducts = data.filter((element) => {
          return (
            element.status == 1 &&
            (element.productType
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
              element.productName
                .toLowerCase()
                .includes(searchKey.toLowerCase()) ||
              element.region.toLowerCase().includes(searchKey.toLowerCase()) ||
              element.zone.toLowerCase().includes(searchKey.toLowerCase()) ||
              element.wereda.toLowerCase().includes(searchKey.toLowerCase()))
          );
        });

        this.setState({
          data,
          filteredProducts,
        });
      });
  };

  componentDidMount() {
    this.defaultData();
  }
  render() {
    const {filteredProducts, searchKey} = this.state;
    const {navigation} = this.props;
    return (
      <SafeAreaView style={{margin: 2, flex: 1}}>
        <ScrollView style={{backgroundColor: '#c0c0c0'}}>
          <TextInput
            style={styles.input}
            placeholder="search product"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={this.generalSearch}
          />
          {filteredProducts.map((product) => {
            return (
              <View>
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
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default DefaultPage;

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
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
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#AEDEF4',
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
  input: {
    margin: 15,
    height: 40,
    backgroundColor: '#ffffff',
    borderColor: '#00bfff',
    borderWidth: 2,
    borderRadius: 10,
  },

  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});

let ServerIp = 'http://10.240.68.57:3001';

let recommendValue = new Array();
let recommendedData = new Array();
var recommendId = new Array();
