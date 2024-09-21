/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  AddArtScreen,
  HomeScreen,
  ProfileScreen,
  SearchScreen,
} from '../features/app';
import {View} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import FavoritesScreen from '../features/app/screens/Art/Favorites';
import { UserProfile } from '../features/app/screens';

const Tab = createBottomTabNavigator();

export function BottomStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFFAF8',
          borderTopWidth: 0,
          elevation: 20,
          height: 60,
          paddingVertical: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 8,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Icon name="home" size={20} color="#000" />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: () => <Icon name="search" size={20} color="#000" />,
        }}
      />
      <Tab.Screen
        name="AddArt"
        component={AddArtScreen}
        options={{
          tabBarLabel: '',
          tabBarLabelStyle: {
            marginBottom: 0,
          },
          tabBarIcon: () => (
            <View className="bg-primary p-3 rounded-full">
              <Icon name="plus" size={20} color="#fff" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: () => <Icon name="heart" size={20} color="#000" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{
          tabBarIcon: () => <Icon name="user" size={20} color="#000" />,
        }}
      />
    </Tab.Navigator>
  );
}
