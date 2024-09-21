import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomStack} from './BottomStack';
import {Category} from '../features/app/screens/Category/[id]';
import {SingleArt} from '../features/app';
import {Cart} from '../features/cart/screens/Cart';
import { PaymentScreen } from '../features/payment';

const Stack = createNativeStackNavigator();

export function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BottomTabs" component={BottomStack} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="Art" component={SingleArt} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
}
