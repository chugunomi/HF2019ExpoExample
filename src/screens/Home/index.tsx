import React from 'react';
import { Text, View, Image, TouchableOpacity, ActivityIndicator, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import colors from '@/constants/colors';
import styles from './styles';
import FeatureList from './Features';
import DraggableCard from '@/components/DraggableCard';
import { HEADER_HEIGHT } from '@/components/AppHeader';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<{}, {}>;
}

export default class HomeScreen extends React.Component<Props> {
  state = {
    isLoading: false,
    isUserNameSet: false,
    userName: '',
    inputText: '',
  }

  updateUserName = (text: String) => {
    this.setState({ inputText: text, isUserNameSet: false });
  };

  showHello = () => {
    this.setState({isLoading: true, userName: this.state.inputText})
    setTimeout(() => {
      this.setState({isLoading: false, isUserNameSet: true, inputText: ''})
    }, 300);
  }

  dismissHello = () => {
    this.setState({ isUserNameSet: false })
  }

  render() {
    const { isLoading, userName, isUserNameSet, inputText } = this.state;
    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled keyboardVerticalOffset={HEADER_HEIGHT}>
        <View style={styles.container}>
          {isUserNameSet && !isLoading ? (
            <DraggableCard>
              <Text style={{color: 'white', fontSize: 18}}>Привет, {userName}!</Text>
              <Text style={{color: 'white', fontSize: 16}}>Смотри что умеет React Native:</Text>
            </DraggableCard>
          ) : null }
          <FeatureList navigation={this.props.navigation} />
          {isLoading ? <ActivityIndicator size="large" color={colors.primary} /> : null}
        </View>
        {!isUserNameSet ? (
          <View style={styles.inputWrap}>
            <TextInput placeholder="Как тебя зовут?" value={inputText} onChangeText={this.updateUserName} style={styles.input} />
            <Button title="OK" onPress={this.showHello} disabled={!inputText} color={colors.primary} />
          </View>
        ) : null}
      </KeyboardAvoidingView>
    );
  }
}
