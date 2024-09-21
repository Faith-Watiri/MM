/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button} from 'react-native-paper';

type SecondaryButtonProps = {
  onPress: () => void;
  name: string;
  width: string | number;
};

export function SecondaryButton({onPress, name, width}: SecondaryButtonProps) {
  return (
    <Button
      onPress={onPress}
      contentStyle={{
        width: width,
        borderWidth: 1,
        backgroundColor: 'white',
        paddingVertical: 5,
        borderRadius: 50,
      }}
      textColor="#6F3744">
      {name}
    </Button>
  );
}
