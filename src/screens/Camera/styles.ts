import { StyleSheet } from 'react-native';
import colors from "@/constants/colors";

export default StyleSheet.create({
    bottomControls: {
      alignSelf: 'flex-end',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 24,
      width: '100%',
      backgroundColor: colors.seconday,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    controlButton: {
      width: 64,
      height: 64,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.secondayLight,
      borderRadius: 64 / 2,
    }
  });
  