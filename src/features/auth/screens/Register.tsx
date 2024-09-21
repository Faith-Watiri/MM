/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, ToastAndroid } from 'react-native';
import { AuthLayout } from '../components';
import { FormInput, RadioCheckButton } from '../../../components';
import { BASE_URL } from '../../../lib/constants';
import { axiosReq } from '../../../utlis/axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Login: undefined; // No params expected for Login
    Register: undefined; // No params expected for Register
};

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;


export function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigation = useNavigation<RegisterScreenNavigationProp>();

    const handlePress = (value: string) => {
        setRole(value);
    };

    // Submit registration data
    const onSubmit = async () => {
        if (password !== confirmPassword) {
            ToastAndroid.showWithGravityAndOffset(
              'Passwords do not match',
              ToastAndroid.BOTTOM,
              ToastAndroid.LONG,
              25,
              50
            );
            return;
        }

        const requestData = {
            name,
            email,
            password,
            role,
        };

        const config: AxiosConfig = {
            url: `${BASE_URL}/auth/register`,
            method: 'POST',
            data: requestData,
        };

        try {
            const res = await axiosReq(config);

            if (res.status === 201) {
                navigation.navigate('Login');
                ToastAndroid.showWithGravityAndOffset(
                  'User created successfully!',
                  ToastAndroid.BOTTOM,
                  ToastAndroid.LONG,
                  25,
                  50
                );
            } else {
                return new Error(`Error: ${res.status}`);
            }
        } catch (error) {
            console.error('Error:', error);

            const errorMessage = (error as Error).message || 'An error occurred';
            ToastAndroid.showWithGravityAndOffset(
              errorMessage,
              ToastAndroid.BOTTOM,
              ToastAndroid.LONG,
              25,
              50
            );
        }
    };

    return (
      <AuthLayout
        pageTitle="Sign Up"
        accountCheck="Have an account?"
        screen="Login"
        action="Create account"
        onPress={onSubmit}
      >
          <FormInput
            value={name}
            placeholder=""
            label="Name"
            onChangeText={(text: string) => setName(text)}
            secureTextEntry={false}
          />
          <FormInput
            value={email}
            placeholder=""
            label="Email"
            onChangeText={(text: string) => setEmail(text)}
            secureTextEntry={false}
          />
          <FormInput
            value={password}
            placeholder=""
            label="Password"
            onChangeText={(text: string) => setPassword(text)}
            secureTextEntry={true}
          />
          <FormInput
            value={confirmPassword}
            placeholder=""
            label="Confirm Password"
            onChangeText={(text: string) => setConfirmPassword(text)}
            secureTextEntry={true}
          />

          <View className="flex-row justify-around my-3">
              <RadioCheckButton
                value="COLLECTOR"
                label="Collector"
                onPress={handlePress}
                status={role === 'COLLECTOR' ? 'checked' : 'unchecked'}
              />
              <RadioCheckButton
                value="ARTIST"
                label="Artist"
                onPress={handlePress}
                status={role === 'ARTIST' ? 'checked' : 'unchecked'}
              />
          </View>
      </AuthLayout>
    );
}
