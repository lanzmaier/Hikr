import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../shared-resources/context/AuthContext';
import { useRegistrationForm } from '../../shared-resources/hooks/useAuth';
import { getFieldError } from '../../shared-resources/utils/formValidation';
import { Colors, FontFamily, BorderRadius, Spacing } from '../../shared-resources/theme/colors';
import type { AuthStackParamList } from '../../shared-resources/navigation/AppNavigator';
import TextInputField from '../atoms/TextInputField';
import PasswordInputField from '../atoms/PasswordInputField';
import ActionButton from '../atoms/ActionButton';
import InlineError from '../atoms/InlineError';
import AuthAlert from '../molecules/AuthAlert';
import FormField from '../molecules/FormField';
import PasswordStrengthMeter from '../molecules/PasswordStrengthMeter';

type Nav = NativeStackNavigationProp<AuthStackParamList>;

const DIFFICULTIES = ['Leicht', 'Mittel', 'Schwer'];
const REGIONS = ['Alpen', 'Mittelgebirge', 'Küste'];

const RegisterPanel: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { error: authError, clearError } = useAuth();
  const {
    formData,
    errors,
    touched,
    passwordStrength,
    isLoading,
    handleChange,
    togglePreference,
    handleBlur,
    handleSubmit,
  } = useRegistrationForm();

  useEffect(() => {
    return () => { clearError(); };
  }, []);

  return (
    <View style={styles.container}>
      <AuthAlert message={authError?.message} />

      {/* Name */}
      <FormField label="Name" error={touched.name ? getFieldError(errors, 'name') : undefined}>
        <TextInputField
          value={formData.name}
          onChangeText={(v) => handleChange('name', v)}
          onBlur={() => handleBlur('name')}
          placeholder="Dein Name"
          autoCapitalize="words"
          hasError={!!touched.name && !!getFieldError(errors, 'name')}
          disabled={isLoading}
          testID="name-input"
        />
      </FormField>

      {/* Email */}
      <FormField label="E-Mail" error={touched.email ? getFieldError(errors, 'email') : undefined}>
        <TextInputField
          value={formData.email}
          onChangeText={(v) => handleChange('email', v)}
          onBlur={() => handleBlur('email')}
          placeholder="beispiel@hikr.de"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          hasError={!!touched.email && !!getFieldError(errors, 'email')}
          disabled={isLoading}
          testID="email-input"
        />
      </FormField>

      {/* Password */}
      <FormField label="Passwort" error={touched.password ? getFieldError(errors, 'password') : undefined}>
        <PasswordInputField
          value={formData.password}
          onChangeText={(v) => handleChange('password', v)}
          onBlur={() => handleBlur('password')}
          hasError={!!touched.password && !!getFieldError(errors, 'password')}
          disabled={isLoading}
          testID="password-input"
        />
        {formData.password.length > 0 && (
          <PasswordStrengthMeter score={passwordStrength.score} feedback={passwordStrength.feedback} />
        )}
      </FormField>

      {/* Hiking Preferences */}
      <View style={styles.prefsSection}>
        <View style={styles.prefsTitleRow}>
          <Text style={styles.prefsIcon}>🏔</Text>
          <Text style={styles.prefsTitle}>Deine Wander-Präferenzen</Text>
        </View>

        {/* Difficulty */}
        <View style={styles.chipGroup}>
          <Text style={styles.chipGroupLabel}>SCHWIERIGKEITSGRAD</Text>
          <View style={styles.chips}>
            {DIFFICULTIES.map((d) => {
              const active = formData.preferredDifficulties.includes(d);
              return (
                <TouchableOpacity
                  key={d}
                  onPress={() => togglePreference('preferredDifficulties', d)}
                  style={[styles.chip, active && styles.chipActive]}
                  accessible
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: active }}
                  accessibilityLabel={d}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{d}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Region */}
        <View style={styles.chipGroup}>
          <Text style={styles.chipGroupLabel}>BEVORZUGTE REGIONEN</Text>
          <View style={styles.chips}>
            {REGIONS.map((r) => {
              const active = formData.preferredRegions.includes(r);
              return (
                <TouchableOpacity
                  key={r}
                  onPress={() => togglePreference('preferredRegions', r)}
                  style={[styles.chip, active && styles.chipActive]}
                  accessible
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: active }}
                  accessibilityLabel={r}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{r}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      {/* CTA Button */}
      <ActionButton
        label={isLoading ? 'Registrieren...' : 'Abenteuer starten'}
        onPress={handleSubmit}
        isLoading={isLoading}
        disabled={isLoading}
        style={styles.ctaButton}
        testID="register-button"
      />

      {/* Login Link */}
      <View style={styles.loginRow}>
        <Text style={styles.loginText}>Bereits Mitglied?{' '}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} accessible accessibilityRole="link">
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  prefsSection: {
    gap: 12,
    paddingTop: 8,
  },
  prefsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  prefsIcon: {
    fontSize: 20,
  },
  prefsTitle: {
    color: Colors.textWhite,
    fontFamily: FontFamily.bold,
    fontSize: 16,
  },
  chipGroup: {
    gap: 10,
  },
  chipGroupLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontFamily: FontFamily.bold,
    fontSize: 11,
    letterSpacing: 1.2,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.borderWhiteLight,
    backgroundColor: Colors.white05,
  },
  chipActive: {
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryMuted,
  },
  chipText: {
    color: Colors.textWhite,
    fontFamily: FontFamily.medium,
    fontSize: 14,
  },
  chipTextActive: {
    color: Colors.primary,
    fontFamily: FontFamily.bold,
  },
  ctaButton: {
    marginTop: 8,
    height: 64,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  loginText: {
    color: 'rgba(255,255,255,0.6)',
    fontFamily: FontFamily.regular,
    fontSize: 14,
  },
  loginLink: {
    color: Colors.primary,
    fontFamily: FontFamily.bold,
    fontSize: 14,
  },
});

export default RegisterPanel;
