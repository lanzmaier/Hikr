import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../../shared-resources/context/AuthContext';
import { Colors, FontFamily, BorderRadius, Spacing } from '../../shared-resources/theme/colors';

const DashboardScreen: React.FC = () => {
  const { user, logout } = useAuth();

  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase() || 'H'
    : 'H';

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.username ?? 'Hikr User';

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.logoIcon}>⛰️</Text>
          <Text style={styles.logoText}>hikr</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      </View>

      {/* Greeting */}
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>Hallo, {displayName.split(' ')[0]}! 👋</Text>
        <Text style={styles.greetingSubtitle}>Bereit für das nächste Abenteuer?</Text>
      </View>

      {/* Placeholder Content */}
      <View style={styles.placeholder}>
        <Text style={styles.placeholderIcon}>🥾</Text>
        <Text style={styles.placeholderTitle}>Touren entdecken</Text>
        <Text style={styles.placeholderText}>
          Hier siehst du bald deine passenden Touren und Matching-Vorschläge.
        </Text>
      </View>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
          accessible
          accessibilityRole="button"
          accessibilityLabel="Abmelden"
        >
          <Text style={styles.logoutText}>Abmelden</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDark,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    fontSize: 22,
  },
  logoText: {
    color: Colors.textWhite,
    fontFamily: FontFamily.bold,
    fontSize: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.borderDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: Colors.textWhite,
    fontFamily: FontFamily.bold,
    fontSize: 14,
  },
  greeting: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  greetingText: {
    color: Colors.textWhite,
    fontFamily: FontFamily.bold,
    fontSize: 26,
  },
  greetingSubtitle: {
    color: Colors.textMuted,
    fontFamily: FontFamily.regular,
    fontSize: 15,
    marginTop: 4,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    gap: 16,
    marginBottom: Spacing.xxl,
  },
  placeholderIcon: {
    fontSize: 64,
  },
  placeholderTitle: {
    color: Colors.textWhite,
    fontFamily: FontFamily.bold,
    fontSize: 22,
    textAlign: 'center',
  },
  placeholderText: {
    color: Colors.textMuted,
    fontFamily: FontFamily.regular,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  logoutContainer: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  logoutButton: {
    height: 48,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: Colors.error,
    fontFamily: FontFamily.semiBold,
    fontSize: 15,
  },
});

export default DashboardScreen;
