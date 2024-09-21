import axios from 'axios';
import {
  View,
  Text,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {AppLayout} from '../../components';
import Icon from 'react-native-vector-icons/Feather';
import {FormInput, PrimaryButton} from '../../../../components';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {BASE_URL} from '../../../../lib/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function AddArtScreen() {
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [artDetails, setArtDetails] = useState({
    art_name: '',
    price: '',
    size: '',
    description: '',
    category: '',
    quantity: '',
    imageUrl: '',
    sold: '0', // Initially 0 since the art hasn't been sold yet
  });

  // Function to handle image selection
  const selectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.didCancel) {
      Alert.alert('Cancelled', 'Image selection cancelled.');
    } else if (result.errorMessage) {
      Alert.alert('Error', result.errorMessage);
    } else if (result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0]; // Safe access to the first asset
      setImageUri(selectedImage.uri); // Set image URI for preview
      uploadImage(selectedImage); // Upload image to Cloudinary
    } else {
      Alert.alert('Error', 'No image selected.');
    }
  };

  // Function to upload image to Cloudinary using Axios with Bearer Token
  const uploadImage = async (image: Asset) => {
    const formData = new FormData();
    formData.append('file', {
      uri: image.uri, // Removing 'file://' for Android compatibility
      type: image.type,
      name: image.fileName || 'image.jpg', // Fallback to 'image.jpg' if no filename is provided
    });

    console.log(formData);

    const token = AsyncStorage.getItem('@access_token');

    try {
      console.log('Uploading image with formData:', formData);
      const response = await axios.post(
        `${BASE_URL}/img-upload/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Upload response:', response);
    } catch (error) {
      console.error('Error details:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
      Alert.alert('Error', 'Failed to upload image.');
    }
  };

  // Function to handle form submission
  const postArt = async () => {
    if (!artDetails.imageUrl) {
      Alert.alert('Missing Image', 'Please upload an image first.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('@access_token');

      if (!token) {
        Alert.alert('Error', 'Authentication token is missing.');
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/arts`,
        artDetails, // Send all the details
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 201) {
        Alert.alert('Success', 'Art submitted successfully');
      } else {
        Alert.alert(
          'Submission Failed',
          response.data.message || 'Something went wrong.',
        );
      }
    } catch (error: unknown) {
      console.error(error); // Log the error for debugging
      Alert.alert('Error', 'Failed to submit art.');
    }
  };

  return (
    <AppLayout>
      <ScrollView showsVerticalScrollIndicator={false} className="my-5">
        {/* Image upload preview */}
        <TouchableOpacity onPress={selectImage}>
          <View className="border-primary border-2 w-full h-48 rounded-lg items-center justify-center">
            {imageUri ? (
              <Image
                source={{uri: imageUri}}
                className="w-full h-full rounded-lg"
              />
            ) : (
              <View>
                <Icon name="upload" size={30} color="#6F3744" />
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
            value={artDetails.price}
            onChangeText={text => setArtDetails({...artDetails, price: text})}
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
            value={artDetails.quantity}
            onChangeText={text =>
              setArtDetails({...artDetails, quantity: text})
            }
          />
        </View>

        <PrimaryButton name="Post" onPress={postArt} />
      </ScrollView>
    </AppLayout>
  );
}
