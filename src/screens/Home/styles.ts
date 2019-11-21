import { StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
import colors from "@/constants/colors";

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      padding: 24,
    },
    shadowBlock: {
      padding: 24,
      backgroundColor: '#8c6bc5',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius: 3,
      shadowColor: "#67489c",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.45,
      shadowRadius: 10.00,
  
      elevation: 4,
    },
    inputWrap: {
      backgroundColor: '#fff',
      padding: 24,
      paddingBottom: 36,
    },
    input: {
      borderColor: colors.primary,
      borderWidth: 1,
      height: 48,
      borderRadius: 3,
      paddingHorizontal: 24,
      marginBottom: 12,
    },
    featureItem: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 24,
      borderRadius: 4,
      marginBottom: 4,
    },
    featureItemText: {
      color: colors.seconday,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  