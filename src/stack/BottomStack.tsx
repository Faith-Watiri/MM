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
import {UserProfile} from '../features/app';
import {useUserAuth} from '../features/auth/slices/auth.slice';

const Tab = createBottomTabNavigator();

export function BottomStack() {
  const {role} = useUserAuth();

  console.log('Role: ', role);

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
      {/* Home Screen */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Icon name="home" size={20} color="#000" />,
        }}
      />

      {/* Search Screen */}
      {/*<Tab.Screen*/}
      {/*  name="Search"*/}
      {/*  component={SearchScreen}*/}
      {/*  options={{*/}
      {/*    tabBarIcon: () => <Icon name="search" size={20} color="#000" />,*/}
      {/*  }}*/}
      {/*/>*/}

      {/* AddArt Screen - Only if role is ARTIST */}
      {role === 'ARTIST' && (
        <Tab.Screen
          name="Create"
          component={AddArtScreen}
          options={{
            tabBarIcon: () => <Icon name="plus" size={20} color="#000" />,
          }}
        />
      )}

      {/* Favorites Screen */}
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: () => <Icon name="heart" size={20} color="#000" />,
        }}
      />

      {/* Profile Screen */}
      <Tab.Screen
        name="Profile"
        component={role === 'ARTIST' ? ProfileScreen : UserProfile}
        options={{
          tabBarIcon: () => <Icon name="user" size={20} color="#000" />,
        }}
      />
    </Tab.Navigator>
  );
}
