/* eslint-disable prettier/prettier */
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather'
import {PrimaryButton} from '../../../../components/Elements/Buttons/PrimaryButton';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPassword() {
  const [value, setValue] = useState('')
  const navigation = useNavigation()

  return (
    <View className="flex-1 bg-secondary px-4 py-3 my-auto">
      <TouchableHighlight className='mb-3'>
        <Icon name='arrow-left' color='black' size={24} />
      </TouchableHighlight>
      <Text className='text-primary font-bold text-4xl'>Forgot Password?</Text>
      <View className="my-5">
        <Text className="text-xl w-56 mt-2 font-semibold text-tertiary">We've got you! please enter your email.</Text>
        <View className='my-4'>
          <Text className="text-black font-bold text-[16px]">Email Address</Text>
          <TextInput
            // onChangeText={onChangeText}
            value={value}
            onChangeText={(text) => setValue(text)}
            placeholder='Your email'
            className='border-gray-400 mt-2 border bg-secondary rounded-lg text-gray-900 px-2'
          />
          </View>
      </View>

      <View className='items-center'>
        <PrimaryButton
          name="Get Code" onPress={() => navigation.navigate('')}
          
        />
      </View>
    </View>

  );
}
