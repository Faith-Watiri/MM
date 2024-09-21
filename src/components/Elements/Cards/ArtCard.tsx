import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import DotMenu from 'react-native-vector-icons/MaterialCommunityIcons';
import {Float} from 'react-native/Libraries/Types/CodegenTypes';

type ArtCardProps = {
  name: string;
  price: Float;
  image: string;
  artist: string;
  onPress: () => void;
};

export default function ArtCard({name, price, image, artist, onPress}: ArtCardProps) {
  return (
    <TouchableOpacity onPress={onPress} className="mb-5 w-1/2">
      {/* Image with Blur and Black Overlay */}
      <ImageBackground
        source={{ uri: image }}
        className="relative h-44 w-full rounded-lg overflow-hidden"
        blurRadius={1} // Add blur effect
      >
        {/* Black overlay */}
        <View className="absolute inset-0 z-10 bg-black" />

        <View className="absolute right-2 top-2 flex-row space-x-3">
          <TouchableOpacity className="p-2 bg-white rounded-full">
            <Icon name="heart" size={14} color="#6F3744" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-white rounded-full">
            <Icon name="shopping-cart" size={14} color="#6F3744" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Text Section */}
      <View className="flex-row justify-between w-full p-3">
        <View>
          <Text className="text-tertiary font-bold text-[16px]">{name}</Text>
          <Text className="text-tertiary font-light text-[12px]">{artist}</Text>
          <Text className="text-tertiary font-semibold text-[13px]">KES {price}</Text>
        </View>
        <TouchableHighlight className="p-1 h-6 w-8 items-center justify-center rounded-full">
          <DotMenu name="dots-horizontal" size={15} color="black" />
        </TouchableHighlight>
      </View>
    </TouchableOpacity>
  );
}
