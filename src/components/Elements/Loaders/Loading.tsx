import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {AppLayout} from '../../../features/app/components';

export function Loading() {
  return (
    <AppLayout>
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator className='text-primary' />
      </View>
    </AppLayout>
  );
}
