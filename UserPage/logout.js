import React, {Component} from 'react';
import {SafeAreaView, AsyncStorage} from 'react-native';
class Logout extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const {navigation} = this.props;
    AsyncStorage.clear();
    navigation.navigate('loginPage');
  }
  render() {
    return <SafeAreaView></SafeAreaView>;
  }
}
export default Logout;
