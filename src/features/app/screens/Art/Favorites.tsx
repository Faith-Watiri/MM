/* eslint-disable prettier/prettier */
import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import { AppLayout } from '../../components';
import {selectFavorites} from './slices/favorites.slice';
import ArtCard from '../../../../components/Elements/Cards/ArtCard';

const FavoritesScreen = () => {
  const favorites = useSelector(selectFavorites); // Get favorites from Redux store

  const renderFavoriteItem = ({
    item,
  }: {
    item: {id: number; name: string; photo: string};
  }) => (
    <ArtCard
      name={item.name}
      image={item.photo}
      artist="" // Placeholder artist name
    />
  );

  return (
    <AppLayout>
      <View>
        <Text className="text-black" style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>
          Favorites
        </Text>
        {favorites.length > 0 ? (
          <FlatList
            data={favorites}
            keyExtractor={item => item.id.toString()}
            renderItem={renderFavoriteItem}
            numColumns={2}
            columnWrapperStyle={{gap: 8}} // Adjust column spacing
            contentContainerStyle={{paddingBottom: 20}} // Padding at the bottom
          />
        ) : (
          <Text>No favorites added yet.</Text>
        )}
      </View>
    </AppLayout>
  );
};

export default FavoritesScreen;
