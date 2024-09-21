import { View, Text, TextInput } from 'react-native'
import React from 'react'

type TextInputProps = {
    value: string;
    placeholder: string;
    label: string;
    onChangeText: (text: string) => void;
    secureTextEntry: boolean;
}

export function FormInput({ value, placeholder, label, onChangeText, secureTextEntry }: TextInputProps) {
    return (
        <View className='my-4'>
            <Text className="text-black font-bold text-[16px]">{label}</Text>
            <TextInput
                // onChangeText={onChangeText}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                className='border-gray-400 placeholder:text-gray-900 mt-2 border bg-secondary rounded-lg text-gray-900 px-2 w-full'
            />
        </View>
    )
}