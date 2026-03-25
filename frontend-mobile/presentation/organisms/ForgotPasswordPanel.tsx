import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForgotPasswordForm } from '../../shared-resources/hooks/useAuth';
import { Colors, FontFamily, BorderRadius, Spacing } from '../../shared-resources/theme/colors';
import type { AuthStackParamList } from '../../shared-resources/navigation/AppNavigator';
import TextInputField from '../atoms/TextInputField';
import ActionButton from '../atoms/ActionButton';
import InlineError from '../atoms/InlineError';

type Nav = NativeStackNavigationProp<AuthStackParamList>;

const ForgotPasswordPanel: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { email, setEmail, error, touched, isLoading, isSuccess, handleSubmit } = useForgotPasswordForm();

  if (isSuccess) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successIcon}>✉️</Text>
        <Text style={styles.successTitle}>Link gesendet!</Text>
        <Text style={styles.successText}>
          Wir haben dir einen Passwort-Reset-Link an {email} geschickt.
          Prüfe deinen Posteingang.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.backButton}
          accessible
          accessibilityRole="button"
        >
          <Text style={styles.backButtonText}>Zurück zum Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Icon */}
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>⛰️</Text>
      </View>

      {/* Heading */}
      <Text style={styles.title}>Passwort vergessen?</Text>
      <Text style={styles.body}>
        Gib deine E-Mail-Adresse ein, um dein Passwort zurückzusetzen. Wir senden dir einen Link.
      </Text>

      {/* Email Field */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>E-Mail Adresse</Text>
        <TextInputField
          value={email}
          onChangeText={setEmail}
          placeholder="name@beispiel.de"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          hasError={!!touched && !!error}
          disabled={isLoading}
          testID="forgot-email-input"
        />
        {touched && <InlineError message={error} />}
      </View>

      {/* Submit Button */}
      <ActionButton
        label={isLoading ? 'Senden...' : 'Link senden'}
        onPress={handleSubmit}
        isLoading={isLoading}
        disabled={isLoading}
        style={styles.submitButton}
        testID="send-link-button"
      />

      {/* Back Link */}
      <View style={styles.backRow}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          accessible
          accessibilityRole="link"
        >
          <Text style={styles.backLink}>Zurück zum Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
    alignItems: 'stretch',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 56,
  },
  title: {
    color: Colors.textWhite,
    fontFamily: FontFamily.bold,
    fontSize: 28,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  body: {
    color: '#cbd5e1',
    fontFamily: FontFamily.regular,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 12,
  },
  fieldGroup: {
    gap: 6,
    marginTop: 8,
  },
  label: {
    color: '#e2e8f0',
    fontFamily: FontFamily.semiBold,
    fontSize: 14,
    paddingHorizontal: 4,
  },
  submitButton: {
    marginTop: 4,
  },
  backRow: {
    alignItems: 'center',
    marginTop: 8,
  },
  backLink: {
    color: '#94a3b8',
    fontFamily: FontFamily.medium,
    fontSize: 14,
  },
  successContainer: {
    alignItems: 'center',
    gap: 16,
    paddingVertical: 32,
  },
  successIcon: {
    fontSize: 64,
  },
  successTitle: {
    color: Colors.primary,
    fontFamily: FontFamily.bold,
    fontSize: 24,
  },
  successText: {
    color: '#cbd5e1',
    fontFamily: FontFamily.regular,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  backButton: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  backButtonText: {
    color: Colors.primary,
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
  },
});

export default ForgotPasswordPanel;
