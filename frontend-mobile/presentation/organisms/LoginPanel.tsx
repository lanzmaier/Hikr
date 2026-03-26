import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../shared-resources/context/AuthContext';
import { useLoginForm } from '../../shared-resources/hooks/useAuth';
import { getFieldError } from '../../shared-resources/utils/formValidation';
import { Colors, FontFamily, BorderRadius, Spacing } from '../../shared-resources/theme/colors';
import type { AuthStackParamList } from '../../shared-resources/navigation/AppNavigator';
import TextInputField from '../atoms/TextInputField';
import PasswordInputField from '../atoms/PasswordInputField';
import ActionButton from '../atoms/ActionButton';
import InlineError from '../atoms/InlineError';
import AuthAlert from '../molecules/AuthAlert';

type Nav = NativeStackNavigationProp<AuthStackParamList>;

const LoginPanel: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { error: authError, clearError } = useAuth();
  const { formData, errors, touched, isLoading, handleChange, handleBlur, handleSubmit } = useLoginForm();
  const [rememberMe, setRememberMe] = React.useState(false);

  useEffect(() => {
    return () => { clearError(); };
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Willkommen zurück</Text>
        <Text style={styles.subtitle}>Melde dich in deiner Hiker-Community an</Text>
      </View>

      <AuthAlert message={authError?.message} />

      {/* Email Field */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>E-Mail Adresse</Text>
        <TextInputField
          value={formData.email}
          onChangeText={(v) => handleChange('email', v)}
          onBlur={() => handleBlur('email')}
          placeholder="z.B. alex@hikr.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          hasError={!!touched.email && !!getFieldError(errors, 'email')}
          disabled={isLoading}
          testID="email-input"
        />
        {touched.email && <InlineError message={getFieldError(errors, 'email')} />}
      </View>

      {/* Password Field */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Passwort</Text>
        <PasswordInputField
          value={formData.password}
          onChangeText={(v) => handleChange('password', v)}
          onBlur={() => handleBlur('password')}
          hasError={!!touched.password && !!getFieldError(errors, 'password')}
          disabled={isLoading}
          testID="password-input"
        />
        {touched.password && <InlineError message={getFieldError(errors, 'password')} />}
      </View>

      {/* Options Row */}
      <View style={styles.optionsRow}>
        <View style={styles.rememberRow}>
          <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
            trackColor={{ false: Colors.borderDark, true: Colors.primaryMuted }}
            thumbColor={rememberMe ? Colors.primary : Colors.textSlate}
            accessible
            accessibilityLabel="Angemeldet bleiben"
          />
          <Text style={styles.rememberLabel}>Angemeldet bleiben</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          accessible
          accessibilityRole="link"
        >
          <Text style={styles.forgotLink}>Passwort vergessen?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <ActionButton
        label={isLoading ? 'Anmelden...' : 'Login'}
        onPress={handleSubmit}
        isLoading={isLoading}
        disabled={isLoading}
        style={styles.loginButton}
        testID="login-button"
      />

      {/* Divider */}
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>ODER WEITER MIT</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Social Buttons */}
      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialButton} accessible accessibilityLabel="Mit Google anmelden">
          <Text style={styles.socialIcon}>G</Text>
          <Text style={styles.socialLabel}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} accessible accessibilityLabel="Mit Apple anmelden">
          <Text style={styles.socialIcon}>🍎</Text>
          <Text style={styles.socialLabel}>Apple</Text>
        </TouchableOpacity>
      </View>

      {/* Sign Up Link */}
      <View style={styles.signUpRow}>
        <Text style={styles.signUpText}>Neu bei hikr?{' '}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')} accessible accessibilityRole="link">
          <Text style={styles.signUpLink}>Registrieren</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  header: {
    marginBottom: 8,
  },
  title: {
    color: Colors.textWhite,
    fontFamily: FontFamily.bold,
    fontSize: 24,
  },
  subtitle: {
    color: Colors.textMuted,
    fontFamily: FontFamily.regular,
    fontSize: 14,
    marginTop: 4,
  },
  fieldGroup: {
    gap: 6,
  },
  label: {
    color: Colors.textWhite,
    fontFamily: FontFamily.medium,
    fontSize: 14,
    paddingHorizontal: 4,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rememberLabel: {
    color: Colors.textMuted,
    fontFamily: FontFamily.regular,
    fontSize: 14,
  },
  forgotLink: {
    color: Colors.primary,
    fontFamily: FontFamily.semiBold,
    fontSize: 14,
  },
  loginButton: {
    marginTop: 8,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.borderDark,
  },
  dividerText: {
    color: Colors.textMuted,
    fontFamily: FontFamily.bold,
    fontSize: 11,
    letterSpacing: 1,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.white05,
  },
  socialIcon: {
    fontSize: 18,
    fontFamily: FontFamily.bold,
    color: Colors.textWhite,
  },
  socialLabel: {
    color: Colors.textWhite,
    fontFamily: FontFamily.bold,
    fontSize: 14,
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  signUpText: {
    color: Colors.textMuted,
    fontFamily: FontFamily.regular,
    fontSize: 14,
  },
  signUpLink: {
    color: Colors.primary,
    fontFamily: FontFamily.bold,
    fontSize: 14,
  },
});

export default LoginPanel;
