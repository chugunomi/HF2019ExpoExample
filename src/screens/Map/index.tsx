import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { NavigationScreenProp } from 'react-navigation';
import styles from './styles';

interface Props {
  navigation: NavigationScreenProp<{}, {}>;
}

export default class MapScreen extends React.PureComponent<Props> {
  render() {
    return (
      <View style={{flex: 1}}>
        <MapView style={styles.mapStyle} initialRegion={{
          latitude: 53.200786,
          longitude: 50.107857,
          latitudeDelta: 0.03,
          longitudeDelta: 0.02,
        }} />
      </View>
    );
  }
}
