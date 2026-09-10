import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '../constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('hfernandez@agropacayales.com');
  const [password, setPassword] = useState('AgroPacayales2026');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (!username.trim()) {
      setErrorMessage('Por favor ingresa tu usuario o correo institucional.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Por favor ingresa tu contraseña de acceso.');
      return;
    }

    setErrorMessage('');
    // Redirección fluida a Pantalla 2 (Principal / Home)
    router.replace('/home');
  };

  const handleDemoFill = () => {
    setUsername('hfernandez@agropacayales.com');
    setPassword('AgroPacayales2026');
    setErrorMessage('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.safeContainer}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Encabezado con Fondo y Branding */}
        <View style={styles.brandingHeader}>
          <View style={styles.logoBadge}>
            <Image
              source={require('../../assets/images/agropacayales_logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.brandTitle}>AGRO PACAYALES</Text>
          <Text style={styles.brandSubtitle}>Valle de Cañete • Lima, Perú</Text>
          <View style={styles.tagPill}>
            <Ionicons name="leaf" size={13} color={Colors.primary} style={{ marginRight: 5 }} />
            <Text style={styles.tagPillText}>Operaciones & Trazabilidad Agrícola</Text>
          </View>
        </View>

        {/* Tarjeta de Formulario de Login */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Acceso de Personal</Text>
          <Text style={styles.cardSubtitle}>
            Ingresa tus credenciales autorizadas de campo
          </Text>

          {errorMessage ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle-outline" size={16} color={Colors.danger} style={{ marginRight: 6 }} />
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          {/* Campo Usuario */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Usuario / Correo Institucional</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={18} color={Colors.primaryLight} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="ej: hfernandez@agropacayales.com"
                placeholderTextColor={Colors.textMuted}
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  if (errorMessage) setErrorMessage('');
                }}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Campo Contraseña */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={18} color={Colors.primaryLight} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="••••••••••••"
                placeholderTextColor={Colors.textMuted}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errorMessage) setErrorMessage('');
                }}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={18}
                  color={Colors.textSecondary}
                />
              </Pressable>
            </View>
          </View>

          {/* Botón de Ingreso con Pressable */}
          <Pressable
            onPress={handleLogin}
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.loginButtonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Iniciar Sesión"
          >
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            <Ionicons name="arrow-forward" size={18} color={Colors.white} style={styles.loginArrow} />
          </Pressable>

          {/* Botón Demo de Ayuda para el Evaluador */}
          <Pressable
            onPress={handleDemoFill}
            style={({ pressed }) => [
              styles.demoButton,
              pressed && styles.demoButtonPressed,
            ]}
          >
            <Ionicons name="flash-outline" size={14} color={Colors.primaryLight} style={{ marginRight: 6 }} />
            <Text style={styles.demoButtonText}>
              Rellenar credenciales: Hugo Fernandez
            </Text>
          </Pressable>
        </View>

        {/* Footer Institucional */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Certificación Global G.A.P. N° 4059883726
          </Text>
          <Text style={styles.footerSubText}>
            Desarrollado para Hugo Fernandez • Proyecto Agro Pacayales
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.xl,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.xxl,
  },
  brandingHeader: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logoBadge: {
    width: 90,
    height: 90,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    marginBottom: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  logoImage: {
    width: 76,
    height: 76,
    borderRadius: BorderRadius.full,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.primaryDark,
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  brandSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  tagPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: Spacing.lg,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dangerBg,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  errorText: {
    color: Colors.danger,
    fontSize: 12,
    fontWeight: '600',
  },
  fieldGroup: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
  },
  inputIcon: {
    marginRight: Spacing.sm,
  },
  textInput: {
    flex: 1,
    height: 48,
    fontSize: 14,
    color: Colors.text,
  },
  eyeButton: {
    padding: Spacing.xs,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.md,
    elevation: 2,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  loginButtonPressed: {
    backgroundColor: Colors.primaryDark,
    transform: [{ scale: 0.98 }],
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  loginArrow: {
    marginLeft: Spacing.sm,
  },
  demoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: '#F1F8F3',
  },
  demoButtonPressed: {
    opacity: 0.7,
  },
  demoButtonText: {
    fontSize: 12,
    color: Colors.primaryLight,
    fontWeight: '700',
  },
  footer: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  footerSubText: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },
});
