import {View, Text, Image, ScrollView, TouchableHighlight} from 'react-native';
import React from 'react';
import {AppLayout} from '../../components';
import SimpleIcon from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Digital from '../../../../assets/digital.jpg';
import {useNavigation} from '@react-navigation/native';
import {PrimaryButton} from '../../../../components';
import Logout from 'react-native-vector-icons/SimpleLineIcons';

export function UserProfile() {
  const navigation = useNavigation();

  const settingsData = [
    {
      id: 1,
      name: 'Account',
      icon: 'user',
      route: 'Account',
    },
    {
      id: 2,
      name: 'Favorites',
      icon: 'heart',
      route: 'Favorites',
    },
    {
      id: 3,
      name: 'Collection',
      icon: 'collection-bookmark',
      route: 'Collection',
    },
    {
      id: 4,
      name: 'Orders',
      icon: 'credit-card',
      route: 'Orders',
    },
    {
      id: 5,
      name: 'Cart',
      icon: 'cart',
      route: 'Cart',
    },
    {
      id: 6,
      name: 'Gift card',
      icon: 'gift-outline',
      route: 'GiftCard',
    },
    {
      id: 7,
      name: 'Message',
      icon: 'message-outline-processing',
      route: 'Chat',
    },
    {
      id: 8,
      name: 'Settings',
      icon: 'settings',
      route: 'Settings',
    },
  ];

  return (
    <AppLayout>
      <View className="flex-row justify-between">
        <Icon name="arrow-left" size={24} color="black" />

        <View className="items-center space-y-3 mt-10">
          <Image source={Digital} className="h-14 w-14 rounded-full" />
          <Text className="text-primary text-4xl font-bold">John Doe</Text>

          <View className="flex-row items-center justify-around">
            <Text className="text-tertiary text-lg">USA</Text>
          </View>
          <View className="flex-row space-x-10">
            <View className="items-center">
              <Text className="font-bold text-tertiary">120k</Text>
              <Text className="text-tertiary">followers</Text>
            </View>
            <View className="items-center">
              <Text className="font-bold text-tertiary">12</Text>
              <Text className="text-tertiary">following</Text>
            </View>
          </View>
        </View>

        <Icon name="share-2" size={24} color="black" />
      </View>

      <ScrollView className="my-5">
        {settingsData.map(item => (
          <View key={item.id} className="flex-row justify-between my-2">
            <View className="flex-row items-center">
              <SimpleIcon name={item.icon} size={24} color="black" />
              <Text className="text-tertiary text-lg ml-2">{item.name}</Text>
            </View>
            <TouchableHighlight onPress={() => navigation.navigate(item.route)}>
              <Icon name="chevron-right" size={24} color="black" />
            </TouchableHighlight>
          </View>
        ))}
      </ScrollView>

      <PrimaryButton name="Become an Artist" onPress={() => {}} />

      <TouchableHighlight
        onPress={() => {
          AsyncStorage.clear();
          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        }}>
        <Logout name="logout" size={24} color="black" className="mt-2">
          <Text className="text-center">Logout</Text>
        </Logout>
      </TouchableHighlight>
    </AppLayout>
  );
}
