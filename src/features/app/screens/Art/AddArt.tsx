import {
  Image,
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {AppLayout} from '../../components';
import Icon from 'react-native-vector-icons/Feather';
import {FormInput, PrimaryButton} from '../../../../components';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {BASE_URL} from '../../../../lib/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import {useUserAuth} from '../../../auth/slices/auth.slice';

type ArtDetails = {
  art_name: string;
  price: string | number;
  size: string;
  description: string;
  category: string;
  quantity: string | number;
  image: string;
  sold: number;
  userId?: number; // Added userId to the type
};

export function AddArtScreen() {
  const {userId} = useUserAuth(); // Fetch userId from useUserAuth hook
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [artDetails, setArtDetails] = useState<ArtDetails>({
    art_name: '',
    price: '',
    size: '',
    description: '',
    category: '',
    quantity: '',
    image: '',
    sold: 0,
  });

  // Function to handle image selection
  const selectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.didCancel) {
      ToastAndroid.showWithGravity(
        'Image selection cancelled.',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else if (result.errorMessage) {
      ToastAndroid.showWithGravity(
        result.errorMessage,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else if (result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0]; // Safe access to the first asset
      setImageUri(selectedImage.uri); // Set image URI for preview
      await uploadImage(selectedImage); // Upload image to Cloudinary
    } else {
      ToastAndroid.showWithGravity(
        'No image selected.',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  const uploadImage = async (image: Asset) => {
    let localImageUri = image.uri;

    if (Platform.OS === 'android' && localImageUri?.startsWith('content://')) {
      const filePath = await RNFS.stat(localImageUri);
      localImageUri = 'file://' + filePath.path;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: localImageUri,
      type: image.type || 'image/jpeg',
      name: image.fileName || 'image.jpg',
    });

    const token = await AsyncStorage.getItem('@access_token');

    if (!token) {
      ToastAndroid.showWithGravity(
        'Authentication token is missing.',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/img-upload/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseData = await response.json();

      if (response.ok) {
        ToastAndroid.showWithGravity(
          'Image uploaded successfully!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        setArtDetails(prev => ({
          ...prev,
          image: responseData.secure_url, // Assuming 'secure_url' is returned
        }));
      } else {
        ToastAndroid.showWithGravity(
          responseData.message || 'Failed to upload image.',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    } catch (error) {
      ToastAndroid.showWithGravity(
        'Failed to upload image.',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  // Function to handle form submission
  const postArt = async () => {
    if (!artDetails.image) {
      ToastAndroid.showWithGravity(
        'Please upload an image first.',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return;
    }

    try {
      const token = await AsyncStorage.getItem('@access_token');

      if (!token) {
        ToastAndroid.showWithGravity(
          'Authentication token is missing.',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        return;
      }

      // Include userId in art details
      const artData = {
        ...artDetails,
        userId: userId, // Add userId to the art details
      };

      // Send the art details using fetch
      const response = await fetch(`${BASE_URL}/art`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(artData), // Send art details along with userId as JSON
      });

      const responseData = await response.json();

      if (response.ok) {
        ToastAndroid.showWithGravity(
          'Art submitted successfully!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      } else {
        ToastAndroid.showWithGravity(
          responseData.message || 'Something went wrong.',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    } catch (error) {
      ToastAndroid.showWithGravity(
        'Failed to submit art.',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  return (
    <AppLayout>
      <View className="my-2 justify-center w-full">
        <Text className="text-black text-[24px] text-center font-semibold">Add your Art Piece</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="my-5">
        {/* Image upload preview */}
        <TouchableOpacity onPress={selectImage}>
          <View className="border-gray-400 border-dotted border-[.5px] w-full h-32 rounded-lg items-center justify-center">
            {imageUri ? (
              <Image
                source={{uri: imageUri}}
                className="w-full h-full rounded-lg"
              />
            ) : (
              <View className="items-center space-y-2">
                <Icon name="upload" size={24} color="#6F3744" />
                <Text className="text-primary font-semibold">
                  Upload an Image
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        {/* Form fields */}
        <View>
          <FormInput
            label="Name of Work"
            value={artDetails.art_name}
            onChangeText={text =>
              setArtDetails({...artDetails, art_name: text})
            }
          />
          <FormInput
            label="Price"
            keyboardType="numeric"
            value={String(artDetails.price)}
            onChangeText={text => {
              const parsedPrice = parseFloat(text);
              if (!isNaN(parsedPrice)) {
                setArtDetails({...artDetails, price: parsedPrice});
              } else {
                setArtDetails({...artDetails, price: ''});
              }
            }}
          />
          <FormInput
            label="Size"
            value={artDetails.size}
            onChangeText={text => setArtDetails({...artDetails, size: text})}
          />
          <FormInput
            label="Description"
            value={artDetails.description}
            onChangeText={text =>
              setArtDetails({...artDetails, description: text})
            }
          />
          <FormInput
            label="Category"
            value={artDetails.category}
            onChangeText={text =>
              setArtDetails({...artDetails, category: text})
            }
          />
          <FormInput
            label="Quantity"
            keyboardType="numeric"
            value={String(artDetails.quantity)}
            onChangeText={text => {
              const parsedQuantity = parseInt(text, 10);
              if (!isNaN(parsedQuantity)) {
                setArtDetails({...artDetails, quantity: parsedQuantity});
              } else {
                setArtDetails({...artDetails, quantity: ''});
              }
            }}
          />
        </View>

        <PrimaryButton name="Post" onPress={postArt} />
      </ScrollView>
    </AppLayout>
  );
}
