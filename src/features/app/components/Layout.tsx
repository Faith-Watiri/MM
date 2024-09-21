/* eslint-disable prettier/prettier */
import {View} from 'react-native';
import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({children}: AppLayoutProps) {
  return <View className="flex-1 bg-secondary px-5 py-4 w-screen">{children}</View>;
}
