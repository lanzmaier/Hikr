import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontFamily } from '../../shared-resources/theme/colors';
import InlineError from '../atoms/InlineError';

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, error, children }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    {children}
    <InlineError message={error} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    color: 'rgba(255,255,255,0.9)',
    fontFamily: FontFamily.medium,
    fontSize: 14,
    paddingHorizontal: 4,
  },
});

export default FormField;
