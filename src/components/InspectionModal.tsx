import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '../constants/theme';

interface InspectionModalProps {
  visible: boolean;
  lotName: string;
  onClose: () => void;
  onSubmit: (note: string, inspector: string, tipo?: string) => void;
}

export const InspectionModal: React.FC<InspectionModalProps> = ({
  visible,
  lotName,
  onClose,
  onSubmit,
}) => {
  const [inspector, setInspector] = useState('Hugo Fernandez');
  const [note, setNote] = useState('');
  const [tipo, setTipo] = useState('Control Fitosanitario');

  const handleSave = () => {
    const finalNote = note.trim()
      ? note.trim()
      : 'Inspección de rutina completada sin observaciones.';
    onSubmit(finalNote, inspector, tipo);
    setNote('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Ionicons name="clipboard-outline" size={20} color={Colors.primary} style={styles.titleIcon} />
              <Text style={styles.title}>Registrar Inspección</Text>
            </View>
            <Text style={styles.subtitle}>{lotName}</Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Inspector Responsable</Text>
            <TextInput
              style={styles.input}
              value={inspector}
              onChangeText={setInspector}
              placeholder="Nombre del inspector"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Tipo de Control</Text>
            <View style={styles.pillRow}>
              {['Fitosanitario', 'Brix / Calidad', 'Riego & pH'].map((item) => (
                <Pressable
                  key={item}
                  onPress={() => setTipo(item)}
                  style={[
                    styles.pill,
                    tipo === item && styles.pillActive
                  ]}
                >
                  <Text style={[styles.pillText, tipo === item && styles.pillTextActive]}>
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Observaciones Técnicas</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={note}
              onChangeText={setNote}
              placeholder="Ej: Calibre de vaina óptimo, sin presencia de plagas, humedad al 75%."
              placeholderTextColor={Colors.textMuted}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.storageNotice}>
            <Ionicons name="save-outline" size={14} color={Colors.primary} style={{ marginRight: 6 }} />
            <Text style={styles.storageNoticeText}>
              Se guardará en el almacenamiento local del dispositivo (AsyncStorage).
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>

            <Pressable
              onPress={handleSave}
              style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}
            >
              <Ionicons name="checkmark-circle-outline" size={16} color={Colors.white} style={{ marginRight: 6 }} />
              <Text style={styles.saveText}>Guardar Registro</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  dialog: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  header: {
    marginBottom: Spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    marginRight: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.primaryLight,
    fontWeight: '600',
    marginTop: 2,
  },
  formGroup: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: Colors.inputBg,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 14,
    color: Colors.text,
  },
  textArea: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  pillRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  pill: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: BorderRadius.sm,
    backgroundColor: '#EEF2EE',
    alignItems: 'center',
  },
  pillActive: {
    backgroundColor: Colors.primary,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  pillTextActive: {
    color: Colors.white,
    fontWeight: '700',
  },
  storageNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F8E9',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: '#DCEDC8',
  },
  storageNoticeText: {
    fontSize: 11,
    color: Colors.primaryDark,
    fontWeight: '500',
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  cancelButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
  },
  cancelText: {
    color: Colors.textSecondary,
    fontWeight: '600',
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  pressed: {
    opacity: 0.8,
  },
});
