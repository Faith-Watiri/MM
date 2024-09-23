/* eslint-disable prettier/prettier */
import {View, Dimensions, StyleSheet} from 'react-native';
import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

// Get screen dimensions
const {width, height} = Dimensions.get('window');

export function AppLayout({children}: AppLayoutProps) {
  return (
    <View style={[styles.container]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: width, // Full screen width
    height: height, // Full screen height
    backgroundColor: '#FFFAF8', // Adjust the color as needed or use 'bg-secondary'
    paddingHorizontal: 16, // Equivalent to px-1 (8px)
    paddingVertical: 16, // Equivalent to py-4 (16px)
  },
});
