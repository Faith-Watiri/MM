import {View, Text} from 'react-native';
import React from 'react';
import {AppLayout} from '../../components';
import {useNavigation, useNavigationState} from '@react-navigation/native';

interface CategoryProps {
  route: any;
}

export function Category({route}: CategoryProps) {
  const data = route?.params.name;
  const navigation = useNavigation();

  return (
    <AppLayout>
      <Text className="text-black">{data}</Text>
    </AppLayout>
  );
}
