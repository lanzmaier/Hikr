import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontFamily, BorderRadius } from '../../../shared-resources/theme/colors';
import LoginPanel from '../../organisms/LoginPanel';

// Mountain background image (golden hour - matches the design template)
const HERO_IMAGE = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80';

const LoginScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      bounces={false}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* ── Logo Bar ──────────────────────────────────────────── */}
      <View style={[styles.logoBar, { top: insets.top + 8 }]}>
        <Text style={styles.logoIcon}>⛰️</Text>
        <Text style={styles.logoText}>hikr</Text>
      </View>

      {/* ── Hero Section ──────────────────────────────────────── */}
      <View style={styles.hero}>
        <ImageBackground
          source={{ uri: HERO_IMAGE }}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['rgba(16,34,16,0.4)', 'rgba(16,34,16,0.92)']}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={[styles.heroContent, { paddingTop: insets.top + 64 }]}>
          <Text style={styles.heroHeadline}>Plan. Hike.{'\n'}Share.</Text>
          <Text style={styles.heroSubtitle}>Your next peak awaits</Text>
        </View>
      </View>

      {/* ── Card ──────────────────────────────────────────────── */}
      <View style={styles.card}>
        <LoginPanel />
        <View style={{ height: insets.bottom + 16 }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  scrollContent: {
    flexGrow: 1,
  },
  logoBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    fontSize: 26,
    color: Colors.textWhite,
  },
  logoText: {
    flex: 1,
    textAlign: 'center',
    color: Colors.textWhite,
    fontFamily: FontFamily.bold,
    fontSize: 20,
    marginRight: 34, // balance with left icon
  },
  hero: {
    height: 320,
    overflow: 'hidden',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  heroHeadline: {
    color: Colors.textWhite,
    fontFamily: FontFamily.bold,
    fontSize: 40,
    lineHeight: 46,
  },
  heroSubtitle: {
    color: Colors.primary,
    fontFamily: FontFamily.medium,
    fontSize: 16,
    marginTop: 8,
  },
  card: {
    flex: 1,
    marginTop: -32,
    backgroundColor: Colors.cardDark,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingHorizontal: 24,
    paddingTop: 40,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
  },
});

export default LoginScreen;
