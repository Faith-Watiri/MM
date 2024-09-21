import {View, Text} from 'react-native';
import React from 'react';
import {AppLayout} from '../../components/Layout';
import Icon from 'react-native-vector-icons/Feather';
import {FormInput, PrimaryButton} from '../../../../components';
import {} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


export function AddArtScreen() {
  const postArt = () => {
    console.log('post art');
  };

  return (
    <AppLayout>
      <View className="border-primary border-2 w-full h-48 rounded-lg items-center justify-center">
        <Icon name="upload" size={30} color="#6F3744" />
        <Text className="text-primary font-semibold">Upload an Image</Text>
      </View>

      <View>
        <FormInput label="Name of Work" />
        <View className="flex-row justify-around">
          <FormInput label="Price" />
          <FormInput label="Size" />
          <FormInput label="Material" />
        </View>
      </View>

      <PrimaryButton name="Post" onPress={postArt} />
    </AppLayout>
  );
}
