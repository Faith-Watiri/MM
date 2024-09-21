import {View, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import {FormInput} from '../../../components';
import {AuthLayout} from '../components';
import {BASE_URL} from '../../../lib/constants';
import {axiosReq} from '../../../utlis/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    const requestData = {
      email,
      password,
    };

    const config: AxiosConfig = {
      url: `${BASE_URL}/auth/login`,
      method: 'POST',
      data: requestData,
    };

    try {
      const res = await axiosReq(config);

      if (res.status === 201) {
        console.log('Login successful, token:', res.data.accessToken);

        // Save token to AsyncStorage
        await AsyncStorage.setItem('@access_token', res.data.accessToken);

        // Show success message
        ToastAndroid.showWithGravityAndOffset(
          'Logged in successfully!',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
          25,
          50,
        );
      } else {
        // Handle invalid credentials
        ToastAndroid.showWithGravityAndOffset(
          'Invalid credentials',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
          25,
          50,
        );
      }
    } catch (error) {
      // Handle errors (e.g., network issues or other errors)
      const errorMessage = (error as Error).message || 'An error occurred';
      ToastAndroid.showWithGravityAndOffset(
        errorMessage,
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
        25,
        50,
      );
    }
  };

  return (
    <AuthLayout
      pageTitle="Login"
      accountCheck="Don't have an account?"
      screen="Register"
      action="Login"
      onPress={onSubmit}>
      <View>
        <FormInput
          label="Email Address"
          value={email}
          placeholder="johndoe@gmail.com"
          onChangeText={text => setEmail(text)}
          secureTextEntry={false}
        />
        <FormInput
          label="Password"
          value={password}
          placeholder="Enter your password"
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
      </View>
    </AuthLayout>
  );
}
