import React from 'react';
import { Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles';
import { NavigationScreenProp } from 'react-navigation';

interface Feature {
    name: string;
    icon: string;
    navigation?: NavigationScreenProp<{}, {}>;
    screen: string;
}

const features: Feature[] = [
    {
        name: 'Камера',
        icon: '📸',
        screen: 'Camera',
    },
    {
        name: 'Датчики',
        icon: '📱',
        screen: 'Camera',
    },
]

function FeatureItem (props: Feature) {
    const onPress = () => props.navigation.navigate(props.screen);
    return (
        <TouchableOpacity style={styles.featureItem} onPress={onPress}>
            <Text style={styles.featureItemText}>{props.name}</Text>
            <Text style={{fontSize: 28}}>{props.icon}</Text>
        </TouchableOpacity>
    )
}

export default function (props: {navigation: NavigationScreenProp<{}, {}>}) {
    return (
        <FlatList
            style={{flex: 1}}
            data={features}
            renderItem={({item}) => <FeatureItem navigation={props.navigation} {...item} key={item.name} />}
            keyExtractor={item => item.name}
        />
    );
}