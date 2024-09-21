import React, {useState} from 'react';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import {AppLayout} from '../../app/components';
import {PrimaryButton} from '../../../components';
import {View }from 'react-native'

export function PaymentScreen() {
  const [card, setCard] = useState(null);
  const {confirmPayment, handleCardAction} = useStripe();

  const handlePayment = async () => {
    // Ensure a card is available
    if (!card) {
      console.log('Please enter card details');
      return;
    }

    // Confirm the payment
    try {
      const {paymentIntent, error} = await confirmPayment(
        'pk_test_51N41wCKvbhlMKkRFilEcEs3gF0FhFXA4df4vKJGhUpuPQGhNAscwUuuZNOpfCcwsdXtY9x02Ygm3krayWsJftZdX00IL8Mhy5W',
        {
          type: 'Card',
          billingDetails: {
            email: 'customer@example.com',
          },
        },
      );

      if (error) {
        console.log('Payment confirmation error:', error);
        return;
      }

      if (paymentIntent) {
        // Handle successful payment
        console.log('Payment successful:', paymentIntent);
      }
    } catch (error) {
      console.log('Error during payment confirmation:', error);
    }
  };

  const handleAuthentication = async () => {
    try {
      const {error} = await handleCardAction('CLIENT_SECRET');

      if (error) {
        console.log('Card action error:', error);
      } else {
        // Card action handled successfully
        console.log('Card action handled successfully');
        // You can perform additional actions after handling card action, such as confirming the payment again
      }
    } catch (error) {
      console.log('Error during card action handling:', error);
    }
  };

  return (
    <AppLayout>
      <CardField
        postalCodeEnabled={true}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          height: 50,
          marginVertical: 40,
        }}
        onCardChange={cardDetails => {
          setCard(cardDetails);
        }}
      />
      <View className="flex-row">
        <PrimaryButton name="Pay" onPress={handlePayment} />
        <PrimaryButton
          name="Handle Authentication"
          onPress={handleAuthentication}
        />
      </View>
    </AppLayout>
  );
}
