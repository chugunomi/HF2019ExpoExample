import React from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Platform, View, Text } from 'react-native';
import Constants from 'expo-constants';
import colors from "@/constants/colors";
import SimbirsoftLogo from '@/assets/simbirsoft_logo.svg';
import { NavigationStackProp } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';

export const HEADER_HEIGHT = 92;

export default function(props: { navigation: NavigationStackProp }) {
    const isCanGoBack = props.navigation.state.index > 0;
    return (
        <View style={styles.header}>
          {isCanGoBack ? (
            <TouchableOpacity onPress={() => props.navigation.pop()}>
              <Ionicons name="ios-arrow-back" size={32} color={colors.primary} />
            </TouchableOpacity>
          ) : <Text style={styles.headerText}>Hot Frontend 2019</Text>}
          <SimbirsoftLogo height={40} width={40} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
      width: '100%',
      height: HEADER_HEIGHT - 20,
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: Constants.statusBarHeight,
      paddingHorizontal: 24,
    },
    headerText: {
      color: colors.primary,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
      fontSize: 18,
      fontWeight: 'bold',
    },
});
  