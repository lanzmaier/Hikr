import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors, FontFamily } from '../../shared-resources/theme/colors';

interface InlineErrorProps {
  message?: string;
}

const InlineError: React.FC<InlineErrorProps> = ({ message }) => {
  if (!message) return null;
  return <Text style={styles.text}>{message}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: Colors.error,
    fontFamily: FontFamily.regular,
    fontSize: 12,
    marginTop: 4,
    paddingHorizontal: 4,
  },
});

export default InlineError;
