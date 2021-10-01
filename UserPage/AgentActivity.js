import React, {Component} from 'react';
import {StyleSheet, View, Text, Alert, AsyncStorage} from 'react-native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
class AgentActivity extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      appr: '',
      isActive: 1,
    };
  }
  componentDidMount = async () => {
    let userId = await AsyncStorage.getItem('userId');
    fetch(ServerIp + '/select/productposts')
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          products: data.filter((element) => {
            return element.postedBy == userId;
          }),
        }),
      );
  };

  delete = (PPID) => {
    const {navigation} = this.props;
    axios.post(ServerIp + '/delete/productpost', {PPID});
    navigation.navigate('AgentHome');
  };

  render() {
    const {products, appr} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={{margin: 10}}>
          <View style={styles.input}>
            <Picker
              selectedValue={this.state.isActive}
              style={styles.input}
              onValueChange={(isActive) => this.setState({isActive})}>
              <Picker.Item label="recent" value="1" />
              <Picker.Item label="pending" value="2" />
              <Picker.Item label="rejected" value="3" />
            </Picker>
          </View>

          {products.map((product) => {
            if (product.status == 1) {
              return this.state.isActive == '1' ? (
                <View style={styles.AgentActivityStyle}>
                  <Text key={product.PPID} style={styles.textStyle}>
                    Product Name: {product.productName}
                    {'\n'}
                    Product Type: {product.productType}
                    {'\n'}
                    woreda: {product.wereda}
                  </Text>
                  <TouchableOpacity
                    style={styles.EditButton}
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
                    style={styles.EditButton}>
                    <Text style={styles.ButtonText}>More</Text>
                  </TouchableOpacity>
                </View>
              ) : null;
            }
          })}

          {products.map((product) => {
            if (product.status == 0) {
              return this.state.isActive == '2' ? (
                <View style={styles.AgentActivityStyle}>
                  <Text key={product.PPID} style={styles.textStyle}>
                    Product Name: {product.productName}
                    {'\n'}
                    Product Type: {product.productType}
                    {'\n'}
                    woreda: {product.wereda}
                  </Text>
                  <TouchableOpacity
                    style={styles.EditButton}
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
                    style={styles.EditButton}>
                    <Text style={styles.ButtonText}>More</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    title="Edit"
                    style={styles.EditButton}
                    onPress={() =>
                      this.props.navigation.navigate('EditProduct', {
                        productId: product.PPID,
                      })
                    }>
                    <Text style={styles.ButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    title="Delete"
                    style={styles.deleteButton}
                    onPress={() => this.delete(product.PPID)}>
                    <Text style={styles.ButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ) : null;
            }
          })}
          {products.map((product) => {
            if (product.status == -1) {
              return this.state.isActive == '3' ? (
                <View style={styles.AgentActivityStyle}>
                  <Text style={styles.textStyle} key={product.PPID}>
                    Product Name: {product.productName}
                    {'\n'}
                    Product Type: {product.productType}
                    {'\n'}
                    comment : {product.comment}
                  </Text>
                  <TouchableOpacity
                    style={styles.EditButton}
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
                    style={styles.EditButton}>
                    <Text style={styles.ButtonText}>More</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    title="Edit"
                    style={styles.EditButton}
                    onPress={() =>
                      this.props.navigation.navigate('EditProduct', {
                        productId: product.PPID,
                      })
                    }>
                    <Text style={styles.ButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    title="Delete"
                    style={styles.deleteButton}
                    onPress={() => this.delete(product.PPID)}>
                    <Text style={styles.ButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ) : null;
            }
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default AgentActivity;

const styles = StyleSheet.create({
  AgentActivityStyle: {
    textAlign: 'center',
    borderBottomWidth: 10,
    borderLeftWidth: 15,
    borderRadius: 10,
    margin: 5,
    padding: 10,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  textStyle: {
    fontSize: 22,
  },
  deleteButton: {
    backgroundColor: '#ff4500',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 40,
    marginBottom: 10,
    marginTop: 10,
  },
  EditButton: {
    elevation: 3,
    backgroundColor: '#00ced1',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 40,
    marginBottom: 10,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
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
    margin: 5,
    borderColor: '#4169e1',
    borderWidth: 2,
  },
  ButtonText: {
    fontSize: 20,
    color: '#f0ffff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'capitalize',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});

let ServerIp = 'http://10.240.68.57:3001';
