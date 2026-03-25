import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, FontFamily, BorderRadius } from '../../../shared-resources/theme/colors';
import type { AuthStackParamList } from '../../../shared-resources/navigation/AppNavigator';
import RegisterPanel from '../../organisms/RegisterPanel';

type Nav = NativeStackNavigationProp<AuthStackParamList>;

// Mountain hikers sunset image (matches design template)
const BG_IMAGE = 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=900&q=80';

const RegistrationScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* ── Full-screen Background ─────────────────────────────── */}
      <ImageBackground source={{ uri: BG_IMAGE }} style={StyleSheet.absoluteFillObject} resizeMode="cover">
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(16,34,16,1)']}
          style={StyleSheet.absoluteFillObject}
        />
      </ImageBackground>

      {/* ── Content ───────────────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
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
          <Text style={styles.topTitle}>Registrierung</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Headline */}
        <View style={styles.headline}>
          <Text style={styles.headlineText}>Werde Teil der hikr Community</Text>
          <Text style={styles.headlineSubtitle}>
            Plane deine Touren und verbinde dich mit anderen Wanderern.
          </Text>
        </View>

        {/* Glass Form Panel */}
        <View style={styles.glassPanel}>
          <RegisterPanel />
          <View style={{ height: insets.bottom + 16 }} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  headline: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 8,
  },
  headlineText: {
    color: Colors.textWhite,
    fontFamily: FontFamily.bold,
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  headlineSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontFamily: FontFamily.regular,
    fontSize: 15,
    lineHeight: 22,
  },
  glassPanel: {
    flex: 1,
    backgroundColor: Colors.glassBg,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
    // glass effect via background color (borderWidth simulates border)
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
});

export default RegistrationScreen;
