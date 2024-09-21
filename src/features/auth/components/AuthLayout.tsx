import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { PrimaryButton } from '../../../components';

interface AuthLayoutProps {
    children: React.ReactNode;
    pageTitle: string,
    accountCheck: string;
    screen: string;
    action: string;
    onPress: () => void;
}

export function AuthLayout({ action, children, pageTitle, onPress, accountCheck, screen }: AuthLayoutProps) {
    const navigation = useNavigation()

    return (
        <View className='bg-secondary flex-1 p-5'>
            <Text className='text-primary font-bold text-4xl'>{pageTitle}</Text>
            <View className='flex-1'>
                {children}

                <View className='flex-1 justify-between my-8 items-center'>
                    <PrimaryButton name={action} onPress={onPress} />

                    <Text className='text-xl text-tertiary'>{accountCheck} <Text onPress={() => navigation.navigate(`${screen}`, {})} className='underline underline-offset-2 text-primary font-bold'>{screen}</Text></Text>
                </View>
            </View>
        </View>
    )
} 