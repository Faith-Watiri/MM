/* eslint-disable prettier/prettier */
import React from 'react';
import {Button} from 'react-native-paper';

type PrimaryButtonProps = {
  onPress: () => void;
  name: string;
  width: string | number;
};

export function PrimaryButton({onPress, name, width}: PrimaryButtonProps) {
  return (
    <Button
      onPress={onPress}
      style={{
        width: width,
      }}
      className={'bg-primary py-2 rounded-full text-[16px]'}
      textColor="white">
      {name}
    </Button>
  );
}
