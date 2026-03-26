import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontFamily, BorderRadius } from '../../shared-resources/theme/colors';
import { formatErrorMessage } from '../../shared-resources/utils/formValidation';

interface AuthAlertProps {
  message?: string;
}

const AuthAlert: React.FC<AuthAlertProps> = ({ message }) => {
  if (!message) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formatErrorMessage(message)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.errorBackground,
    borderWidth: 1,
    borderColor: Colors.error,
    borderRadius: BorderRadius.md,
    padding: 14,
  },
  text: {
    color: Colors.error,
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default AuthAlert;
