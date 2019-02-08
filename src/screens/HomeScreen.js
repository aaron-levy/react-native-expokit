import React from 'react';
import { DangerZone } from 'expo';

import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';

import { Button, Header } from 'react-native-elements';
import { STRIPE_KEY } from '../../config';
const { Stripe } = DangerZone;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: <Header
      leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
      rightComponent={{ icon: 'home', color: '#fff' }}
    />
  };



  async componentDidMount() {

    await Stripe.setOptionsAsync({
      publishableKey: STRIPE_KEY // stripe key will be invalid because it is private and was left out of git
    });

  }





  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView  contentContainerStyle={styles.buttonsView}>
          
            <Button onPress={this.onToStories} style={styles.stories_button} title="Stories"  />
            <Button onPress={this.onPayments} style={styles.stories_button} title="Pay" />
         
        </ScrollView>
      </SafeAreaView >
    );
  }


  onToStories = () => {
    this.props.navigation.push('Stories')
  }

  onPayments = async () => {
    const options = {
      requiredBillingAddressFields: 'full',
      prefilledInformation: {
        billingAddress: {
          name: 'Gunilla Haugeh',
          line1: 'Canary Place',
          line2: '3',
          city: 'Macon',
          state: 'Georgia',
          country: 'US',
          postalCode: '31217',
        },
      },
    };
    try {

      const token = await Stripe.paymentRequestWithCardFormAsync(options);
      console.log('the token ', token);

    } catch (e) {

    }

  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  stories_button: {
    width: 200,
    maxWidth: 200,
    margin: 10
  },
  buttonsView: {
    height: 100,
    justifyContent: 'space-between', 
    alignItems: 'center'
  }
});
