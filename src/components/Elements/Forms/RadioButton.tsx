import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { RadioButton } from 'react-native-paper'

type RadioCheckButtonProps = {
    value: string;
    label: string;
    onPress: (value: string) => void;
    status: 'checked' | 'unchecked';
}

export function RadioCheckButton({ value, label, onPress, status }: RadioCheckButtonProps) {
    const [checked, setChecked] = useState(status === 'checked')

    useEffect(() => {
        setChecked(status === 'checked')
    }, [status])

    const handlePress = () => {
        setChecked(!checked)
        onPress(value)
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
                value={value}
                color='#6F3744'
                onPress={handlePress}
                status={checked ? 'checked' : 'unchecked'}
            />
            <Text className='text-tertiary text-lg font-semibold'>{label}</Text>
        </View>
    )
}

// color='#6F3744'
