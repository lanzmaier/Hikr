import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontFamily } from '../../shared-resources/theme/colors';
import { getPasswordStrengthColor, getPasswordStrengthLabel } from '../../shared-resources/utils/formValidation';

interface PasswordStrengthMeterProps {
  score: number;
  feedback: string[];
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ score, feedback }) => {
  const color = getPasswordStrengthColor(score);
  const label = getPasswordStrengthLabel(score);

  return (
    <View style={styles.container}>
      <View style={styles.barRow}>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, { width: `${score}%` as any, backgroundColor: color }]} />
        </View>
        <Text style={[styles.label, { color }]}>{label}</Text>
      </View>
      {feedback.length > 0 && score < 80 && (
        <Text style={styles.feedback}>{feedback[0]}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    gap: 4,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  barTrack: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
  label: {
    fontFamily: FontFamily.semiBold,
    fontSize: 11,
    minWidth: 40,
  },
  feedback: {
    color: Colors.textSlate,
    fontFamily: FontFamily.regular,
    fontSize: 11,
    paddingHorizontal: 2,
  },
});

export default PasswordStrengthMeter;
