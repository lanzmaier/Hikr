import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, FontFamily } from '../../../shared-resources/theme/colors';
import type { AuthStackParamList } from '../../../shared-resources/navigation/AppNavigator';
import ForgotPasswordPanel from '../../organisms/ForgotPasswordPanel';

type Nav = NativeStackNavigationProp<AuthStackParamList>;

const ForgotPasswordScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* TopAppBar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          accessible
          accessibilityLabel="Zurück"
          accessibilityRole="button"
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>hikr</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ForgotPasswordPanel />
      </ScrollView>

      {/* Footer Wave decoration (simplified with gradient-like view) */}
      <View style={[styles.footer, { height: insets.bottom + 48 }]}>
        <View style={styles.footerWave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backArrow: {
    color: Colors.textWhite,
    fontSize: 36,
    lineHeight: 40,
    fontFamily: FontFamily.bold,
  },
  topTitle: {
    color: Colors.textWhite,
    fontFamily: FontFamily.bold,
    fontSize: 18,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  footer: {
    overflow: 'hidden',
  },
  footerWave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: Colors.primary,
    opacity: 0.08,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 120,
  },
});

export default ForgotPasswordScreen;
