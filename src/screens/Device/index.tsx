import React from 'react';
import { View, Text } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import Constants from 'expo-constants';
import styles from './styles';
import { AccelerometerSensor, MagnetometerSensor, PedometerSensor } from './Sensors';

interface Props {
  navigation: NavigationScreenProp<{}, {}>;
}

export default class DeviceScreen extends React.PureComponent<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Устройство: {Constants.deviceName}</Text>
        <AccelerometerSensor />
        <MagnetometerSensor />
        <PedometerSensor />
      </View>
    );
  }
}
