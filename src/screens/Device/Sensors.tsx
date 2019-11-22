import React, {Component} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer, Magnetometer, Pedometer } from 'expo-sensors';
import { Platform } from '@unimodules/core';

export class AccelerometerSensor extends Component {
  state = {
    accelerometerData: {},
  };

  componentDidMount() {
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  };

  _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  _fast = () => {
    Accelerometer.setUpdateInterval(32);
  };

  _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      this.setState({ accelerometerData });
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    let { x, y, z } = this.state.accelerometerData;
    return (
      <View style={styles.sensor}>
        <Text style={styles.text}>Данные акселерометра:</Text>
        <Text style={styles.text}>
          x: {round(x)} y: {round(y)} z: {round(z)}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._toggle} style={styles.button}>
            <Text>Вкл/Выкл</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._slow} style={[styles.button, styles.middleButton]}>
            <Text>Медленно</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._fast} style={styles.button}>
            <Text>Быстро</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


export class MagnetometerSensor extends React.Component {
    state = {
      MagnetometerData: {},
    };
  
    componentDidMount() {
      this._toggle();
    }
  
    componentWillUnmount() {
      this._unsubscribe();
    }
  
    _toggle = () => {
      if (this._subscription) {
        this._unsubscribe();
      } else {
        this._subscribe();
      }
    };
  
    _slow = () => {
      Magnetometer.setUpdateInterval(1000);
    };
  
    _fast = () => {
      Magnetometer.setUpdateInterval(32);
    };
  
    _subscribe = () => {
      this._subscription = Magnetometer.addListener(result => {
        this.setState({ MagnetometerData: result });
      });
    };
  
    _unsubscribe = () => {
      this._subscription && this._subscription.remove();
      this._subscription = null;
    };
  
    render() {
      let { x, y, z } = this.state.MagnetometerData;
  
      return (
        <View style={styles.sensor}>
          <Text>Данные магнетометра:</Text>
          <Text>
            x: {round(x)} y: {round(y)} z: {round(z)}
          </Text>
  
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this._toggle} style={styles.button}>
                <Text>Вкл/Выкл</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._slow} style={[styles.button, styles.middleButton]}>
                <Text>Медленно</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._fast} style={styles.button}>
                <Text>Быстро</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  export class PedometerSensor extends React.Component {
    state = {
      isPedometerAvailable: "checking",
      pastStepCount: 0,
      currentStepCount: 0
    };
  
    componentDidMount() {
      this._subscribe();
    }
  
    componentWillUnmount() {
      this._unsubscribe();
    }
  
    _subscribe = () => {
      this._subscription = Pedometer.watchStepCount(result => {
        this.setState({
          currentStepCount: result.steps
        });
      });
  
      Pedometer.isAvailableAsync().then(
        result => {
          this.setState({
            isPedometerAvailable: String(result)
          });
        },
        error => {
          this.setState({
            isPedometerAvailable: "Не удалось получить данные: " + error
          });
        }
      );
  
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);
      Pedometer.getStepCountAsync(start, end).then(
        result => {
          this.setState({ pastStepCount: result.steps });
        },
        error => {
          this.setState({
            pastStepCount: "CНе удалось получить количество шагов: " + error
          });
        }
      );
    };
  
    _unsubscribe = () => {
      this._subscription && this._subscription.remove();
      this._subscription = null;
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Text>
            Шагомер доступен? {this.state.isPedometerAvailable}
          </Text>
          {Platform.OS === 'ios' ? (
            <Text>
            Шагов сделано за последние 24 часа: {this.state.pastStepCount}
            </Text>
          ) : null}
          <Text>Шагов: {this.state.currentStepCount}</Text>
        </View>
      );
    }
  }

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 45,
    paddingHorizontal: 10,
  },
  text:{
    textAlign: 'center'
  }
});