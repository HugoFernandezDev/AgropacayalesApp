import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '../constants/theme';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  showLogout?: boolean;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Agro Pacayales S.A.C.',
  subtitle = 'Valle de Cañete • Monitoreo Agrícola',
  showBack = false,
  onBack,
  showLogout = false,
  onLogout,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {showBack ? (
          <Pressable
            onPress={onBack}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressedButton]}
            accessibilityRole="button"
            accessibilityLabel="Volver"
          >
            <Ionicons name="arrow-back" size={22} color={Colors.white} />
          </Pressable>
        ) : (
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/agropacayales_logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        )}

        <View style={styles.titlesContainer}>
          <Text style={styles.titleText} numberOfLines={1}>{title}</Text>
          <Text style={styles.subtitleText} numberOfLines={1}>{subtitle}</Text>
        </View>

        {showLogout ? (
          <Pressable
            onPress={onLogout}
            style={({ pressed }) => [styles.logoutButton, pressed && styles.pressedButton]}
            accessibilityRole="button"
            accessibilityLabel="Cerrar Sesión"
          >
            <Ionicons name="log-out-outline" size={15} color={Colors.white} style={styles.logoutIcon} />
            <Text style={styles.logoutText}>Salir</Text>
          </Pressable>
        ) : (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>G.A.P.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    marginRight: Spacing.sm,
  },
  logo: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.full,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  titlesContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
  subtitleText: {
    color: Colors.accent,
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoutIcon: {
    marginRight: 4,
  },
  logoutText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  badgeContainer: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  badgeText: {
    color: '#3E2723',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  pressedButton: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },
});
