import React from 'react';
import { TextInput, StyleSheet, View, TextInputProps } from 'react-native';
import { Colors, FontFamily, BorderRadius } from '../../shared-resources/theme/colors';

interface TextInputFieldProps extends Pick<TextInputProps, 'autoCapitalize' | 'autoComplete' | 'keyboardType' | 'returnKeyType' | 'onSubmitEditing' | 'blurOnSubmit'> {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  secureTextEntry?: boolean;
  testID?: string;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  value,
  placeholder,
  disabled = false,
  hasError = false,
  onChangeText,
  onBlur,
  secureTextEntry = false,
  testID,
  ...rest
}) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      placeholder={placeholder}
      placeholderTextColor={Colors.textPlaceholder}
      secureTextEntry={secureTextEntry}
      editable={!disabled}
      testID={testID}
      style={[styles.input, hasError && styles.inputError, disabled && styles.inputDisabled]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: Colors.white05,
    borderWidth: 1,
    borderColor: Colors.borderWhiteTransparent,
    borderRadius: BorderRadius.md,
    color: Colors.textWhite,
    fontFamily: FontFamily.regular,
    fontSize: 16,
  },
  inputError: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorBackground,
  },
  inputDisabled: {
    opacity: 0.5,
  },
});

export default TextInputField;
