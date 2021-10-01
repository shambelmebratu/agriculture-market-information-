import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Col, Row, Grid} from 'react-native-easy-grid';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
  }
  componentDidMount() {
    fetch(ServerIp + '/select/news')
      .then((res) => res.json())
      .then((news) => this.setState({news}));
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{backgroundColor:'#f0f8ff'}}>
          {this.state.news.map((posts) => (
            <View>
              <Grid>
                <Row style={{backgroundColor:'#d3d3d3'}}>
                  <Col><Text style={styles.titleStyle}>{posts.title} </Text></Col>
                  <Col><Text>posted On: {posts.createdDate}</Text></Col>
                </Row>
              </Grid>
              
              <Text style={styles.bodyStyle}>{posts.content}</Text>
              <Text
                style={{
                  borderRadius: 40,
                  borderBottomWidth: 2,
                }}></Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default News;

let ServerIp = 'http://10.240.68.57:3001';

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 22,
    color: '#6b8e23',
    alignSelf: 'center',
  },
  bodyStyle: {
    fontSize: 18,
    margin: 10,
    
  },
});
