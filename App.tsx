import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, TextInput, Button, Platform } from 'react-native';
import Constants from 'expo-constants';

const PRIMARY_COLOR = 'rgb(0, 79, 157)';

export default class App extends React.Component {
  state = {
    isLoading: false,
    isUserNameSet: false,
    userName: '',
  }

  updateUserName = (text: String) => {
    this.setState({ userName: text, isUserNameSet: false });
  };

  showHello = () => {
    this.setState({isLoading: true})
    setTimeout(() => {
      this.setState({isLoading: false, isUserNameSet: true})
    }, 300);
  }

  render() {
    const { isLoading, userName, isUserNameSet } = this.state;

    return (
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => alert('Hello!')} style={styles.header}>
          <Image source={require('./assets/icon.png')} style={{ width: 80, height: 80 }} />
          <Text style={styles.headerText}>Hot Frontend 2019</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          {isUserNameSet && !isLoading ? (
            <Text>Привет, {userName}!</Text>
          ) : null }
          {isLoading ? <ActivityIndicator size="large" color="rgb(0, 79, 157)" /> : (
            <View style={styles.card}>
              <TextInput onChangeText={this.updateUserName} style={styles.input} />
              <Button title="OK" onPress={this.showHello} disabled={!userName} color={PRIMARY_COLOR} />
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 24,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Constants.statusBarHeight,
    paddingRight: 24,
  },
  headerText: {
    color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
    height: 48,
    borderRadius: 3,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
});
