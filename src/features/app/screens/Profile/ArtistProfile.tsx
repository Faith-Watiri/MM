/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import {AppLayout} from '../../components';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/EvilIcons';

import Digital from '../../../../assets/digital.jpg';
import {PrimaryButton, SecondaryButton} from '../../../../components';
import ArtCard from '../../../../components/Elements/Cards/ArtCard';

export function ProfileScreen() {
  const [art, setArt] = useState([{}, {}, {}, {}, {}, {}, {}]);
  return (
    <AppLayout>
      {/* Top header */}
      <View className="flex-row justify-between">
        <Icon name="arrow-left" size={24} color="black" />

        <View className="items-center space-y-3">
          <Image source={Digital} className="h-14 w-14 rounded-full" />
          <Text className="text-primary text-4xl font-bold">John Doe</Text>

          <View className="flex-row items-center justify-around w-2/3">
            <Icon2 name="location" color="#C9C9C9" size={20} />

            <Text className="text-[#C9C9C9] text-lg">USA</Text>
            <Text className="text-[#C9C9C9] text-lg">b.1970</Text>
          </View>
        </View>

        <Icon name="share-2" size={24} color="black" />
      </View>

      <View>
        <View className="flex-row justify-around my-3">
          {/* Stats */}
          <View className="items-center">
            <Text className="text-tertiary font-bold text-xl">150</Text>
            <Text className="text-tertiary">works</Text>
          </View>
          <View className="items-center">
            <Text className="text-tertiary font-bold text-xl">120</Text>
            <Text className="text-tertiary">followers</Text>
          </View>
          <View className="items-center">
            <Text className="text-tertiary font-bold text-xl">15</Text>
            <Text className="text-tertiary">following</Text>
          </View>
        </View>

        {/* Bio */}
        <View className="items-center my-5 w-full">
          <Text className="text-tertiary text-center w-64">
            A passionate farce in Conceptual art John Doe transformed popp
            cultural and art historical oconography into ...
          </Text>
        </View>
      </View>

      <View
        className="flex-row flex- my-5 justify-around"
        style={{
          width: '100%',
        }}>
        <PrimaryButton name="Followed" onPress={() => {}} width={150} />
        <SecondaryButton name="Message" onPress={() => {}} width={150} />
      </View>

      {/* ArtWork */}
      <View className="">
        <View className="flex-row mt-5 items-center justify-between">
          <Text className="text-tertiary text-[25px] font-semibold">
            Artworks
          </Text>

          <Text className="text-tertiary text-[16px] items-center justify-center">
            <Icon name="filter" size={24} color={'black'} />
            Filters
          </Text>
        </View>

        {/* Art */}

        <FlatList
          data={art}
          numColumns={2}
          renderItem={() => <ArtCard />}
          keyExtractor={item => item.toString()}
          className="py-5 space-x-3 px-auto"
        />
      </View>
    </AppLayout>
  );
}
