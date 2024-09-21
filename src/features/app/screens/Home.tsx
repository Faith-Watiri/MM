import {View, Text, FlatList, TouchableHighlight} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppLayout} from '../components';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../../../lib/constants';
import ArtCard from '../../../components/Elements/Cards/ArtCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loading} from '../../../components';
import {useSelector} from 'react-redux';
import {selectCart} from '../../cart/slices/cart.slice';
import axios from 'axios';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Cart: undefined;
  Art: {data: ArtItem};
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Art'>;

type ArtItem = {
  id: number;
  art_name: string;
  artist: string;
  price: number;
  image: string;
};

export function HomeScreen() {
  const [art, setArt] = useState<ArtItem[]>([]); // Type inferred for art
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setToken] = useState<string | null>(null);

  const navigation = useNavigation<HomeScreenNavigationProp>();
  const cart = useSelector(selectCart);

  // Function to calculate total quantity in cart
  const getTotalQuantity = (): number => {
    let total = 0;
    cart.forEach((item: {quantity: number}) => {
      total += item.quantity;
    });
    return total;
  };

  // Function to fetch the art data from API
  const getArt = async (token: string) => {
    const config = {
      url: `${BASE_URL}/art`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios(config);
      setArt(response.data);
    } catch (error) {
      console.log('Error fetching art:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch token and art data when component mounts
  useEffect(() => {
    const fetchTokenAndArt = async () => {
      setIsLoading(true);
      try {
        const storedToken = await AsyncStorage.getItem('@access_token');
        if (storedToken) {
          setToken(storedToken);
          await getArt(storedToken);
        } else {
          console.log('No token found in AsyncStorage');
        }
      } catch (error) {
        console.log('Error fetching token:', error);
      }
    };

    fetchTokenAndArt();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AppLayout>
      {/* ArtWork Header */}
      <View>
        <View className="flex-row mt-5 items-center justify-between">
          <Text className="text-tertiary text-[25px] font-semibold">Art</Text>

          <TouchableHighlight
            onPress={() => navigation.navigate('Cart')}
            className="relative border p-2 items-center justify-center rounded-full">
            <View>
              <Icon name="shopping-cart" size={24} color="black" />
              <View className="absolute -top-4 -right-2 bg-primary rounded-full h-5 w-5 flex items-center justify-center">
                <Text className="text-white text-[10px] font-semibold">
                  {getTotalQuantity()}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>

        {/* Art List */}
        <FlatList
          data={art}
          numColumns={2}
          columnWrapperStyle={{gap: 8}} // Adjust the spacing
          renderItem={({item}) => (
            <ArtCard
              name={item.art_name}
              artist={item.artist}
              price={item.price}
              image={item.image}
              onPress={() => navigation.navigate('Art', {data: item})}
            />
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{paddingVertical: 20, paddingHorizontal: 0}} // Optional padding for overall list
        />
      </View>
    </AppLayout>
  );
}
