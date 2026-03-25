import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Colors, FontFamily, BorderRadius } from '../../shared-resources/theme/colors';

interface PasswordInputFieldProps {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  testID?: string;
}

const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  value,
  placeholder = '••••••••',
  disabled = false,
  hasError = false,
  onChangeText,
  onBlur,
  testID,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={[styles.container, hasError && styles.containerError, disabled && styles.containerDisabled]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor={Colors.textPlaceholder}
        secureTextEntry={!visible}
        editable={!disabled}
        testID={testID}
        style={styles.input}
        autoCapitalize="none"
        autoComplete="password"
      />
      <TouchableOpacity
        onPress={() => setVisible((v) => !v)}
        style={styles.toggleButton}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessible
        accessibilityLabel={visible ? 'Passwort verbergen' : 'Passwort anzeigen'}
      >
        <Text style={styles.toggleIcon}>{visible ? '🙈' : '👁'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: Colors.white05,
    borderWidth: 1,
    borderColor: Colors.borderWhiteTransparent,
    borderRadius: BorderRadius.md,
  },
  containerError: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorBackground,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    color: Colors.textWhite,
    fontFamily: FontFamily.regular,
    fontSize: 16,
  },
  toggleButton: {
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleIcon: {
    fontSize: 18,
  },
});

export default PasswordInputField;
