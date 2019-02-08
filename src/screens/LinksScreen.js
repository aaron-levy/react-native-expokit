import React from 'react';
import { ScrollView, StyleSheet, Image, View } from 'react-native';
import { Button } from 'react-native-elements';
import { ImagePicker, Permissions } from 'expo'


export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };


  state = {
    image: { uri: 'https://image.shutterstock.com/image-illustration/tropical-beach-travel-holiday-vacation-260nw-790288156.jpg' }
  }


  onSelectPhoto = async () => {
    try {

      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      const res = await ImagePicker.launchImageLibraryAsync({ aspect: [4, 3] });
      if(!!res.uri) this.setState({ image: { uri: res.uri } });

    } catch {

    }
   

  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={this.state.image} />
        </View>
        <Button style={styles.selectButton} title="Select photo" onPress={this.onSelectPhoto} />
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 200,
    width: 200,
    borderColor: '#eee',
    borderWidth: 2,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    margin: 10
  },
  image: {
    height: '100%',
    width: '100%'
  },
  selectButton: {
    width: 150,
    alignSelf: 'center'
  }
});
