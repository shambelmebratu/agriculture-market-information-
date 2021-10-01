import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image
} from "react-native";

const About = () => (
  <SafeAreaView style={styles.container}>
    <ScrollView>
    
      <View style={styles.item}>
      <Image
        source={require('./image/amis.png')}
        style={styles.imageStyle} 
      />
      
      <Text style={styles.TextStyle}>{'\n'}Phone: 0921215699</Text>
      <Text style={styles.TextStyle}>E-mail: shambi2008@gmail.com</Text>
      <Text style={styles.TextStyle}>Location: Adama (ASTU)</Text>


      </View>

    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom:10,
    marginHorizontal: 16
  },
  item: {
    padding: 10,
    marginVertical: 5,
    height:'100%',
    alignItems:'center'
  },
  imageStyle:{
    width: 350,
    height: 200
   
  },
  TextStyle: {
    fontSize: 20,
    color: '#000080',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'capitalize',
  },
});

export default About;
