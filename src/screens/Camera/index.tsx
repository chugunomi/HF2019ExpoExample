import React from 'react';
import { Text, View, TouchableOpacity, CameraRoll } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { NavigationScreenProp } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';

interface Props {
  navigation: NavigationScreenProp<{}, {}>;
}

interface State {
  hasCameraPermission: boolean;
  hasSavePermission: boolean;
  type: any;
  flashMode: any;
}

export default class CameraScreen extends React.PureComponent<Props, State> {
  private camera: Camera = null;

  state = {
    hasCameraPermission: null,
    hasSavePermission: null,
    type: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.auto,
  };

  async componentDidMount() {
    const { status: cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: cameraStatus === 'granted' });
    const { status: rollStatus } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasSavePermission: rollStatus === 'granted' });
  }

  switchCamera = () => {
    this.setState((s) => ({
      type: s.type === Camera.Constants.Type.back ?
        Camera.Constants.Type.front : Camera.Constants.Type.back
    }));
  };

  switchFlashmode = () => {
    this.setState((s) => ({
      flashMode: s.flashMode === Camera.Constants.FlashMode.auto ? Camera.Constants.FlashMode.torch : 
        s.flashMode === Camera.Constants.FlashMode.torch ? Camera.Constants.FlashMode.off : 
          s.flashMode === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.auto : Camera.Constants.FlashMode.auto
    }));
  };

  getFlashmodeIcon = (): string => {
    switch (this.state.flashMode) {
      case Camera.Constants.FlashMode.auto:
        return 'flash-auto';
      case Camera.Constants.FlashMode.torch:
        return 'flash';
    }

    return 'flash-off';
  }

  snap = async () => {
    if (this.camera && this.state.hasSavePermission) {
      let photo = await this.camera.takePictureAsync();
      Permissions.CAMERA_ROLL
      CameraRoll.saveToCameraRoll(photo.uri)
    } else {
      alert('Необходимо разрешение на сохранение файлов');
      const { status: rollStatus } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      this.setState({ hasSavePermission: rollStatus === 'granted' });
    }
  };

  render() {
    const { hasCameraPermission, type, flashMode } = this.state;


    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Разрешите доступ к камере!</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={type} flashMode={flashMode} ref={ref => this.camera = ref}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <View style={styles.bottomControls}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={this.switchCamera}>
                  <MaterialCommunityIcons name="camera-front" size={32} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={this.snap}>
                  <MaterialCommunityIcons name="camera" size={36} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={this.switchFlashmode}>
                  <MaterialCommunityIcons name={this.getFlashmodeIcon()} size={32} color={'white'} />
                </TouchableOpacity>
              </View>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
