import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { CropLot } from '../data/cropsData';
import { Colors, Spacing, BorderRadius } from '../constants/theme';

interface CropCardProps {
  crop: CropLot;
  onPress: (crop: CropLot) => void;
}

const renderCropIcon = (type: CropLot['iconType'], color: string) => {
  switch (type) {
    case 'leaf':
      return <MaterialCommunityIcons name="leaf" size={24} color={color} />;
    case 'seed':
      return <MaterialCommunityIcons name="sprout" size={24} color={color} />;
    case 'corn':
      return <MaterialCommunityIcons name="corn" size={24} color={color} />;
    case 'fruit':
      return <MaterialCommunityIcons name="fruit-watermelon" size={24} color={color} />;
    case 'tree':
      return <MaterialCommunityIcons name="tree" size={24} color={color} />;
    default:
      return <Ionicons name="leaf-outline" size={24} color={color} />;
  }
};

export const CropCard: React.FC<CropCardProps> = ({ crop, onPress }) => {
  return (
    <Pressable
      onPress={() => onPress(crop)}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalle de ${crop.nombre}`}
    >
      <View style={styles.headerRow}>
        <View style={[styles.iconCircle, { backgroundColor: crop.estadoColor + '15' }]}>
          {renderCropIcon(crop.iconType, crop.estadoColor)}
        </View>

        <View style={styles.titleColumn}>
          <Text style={styles.cropName}>{crop.nombre}</Text>
          <Text style={styles.varietyText}>{crop.variedad}</Text>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: crop.estadoColor + '20' }]}>
          <View style={[styles.statusDot, { backgroundColor: crop.estadoColor }]} />
          <Text style={[styles.statusText, { color: crop.estadoColor }]}>
            {crop.estado}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoGrid}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Ubicación</Text>
          <Text style={styles.infoValue} numberOfLines={1}>{crop.lote}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Área Cultivada</Text>
          <Text style={styles.infoValue}>{crop.hectareas} ha</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Cosecha Est.</Text>
          <Text style={styles.infoValue}>{crop.fechaCosechaEst}</Text>
        </View>
      </View>

      <View style={styles.footerRow}>
        <View style={styles.telemetryTag}>
          <Ionicons name="thermometer-outline" size={13} color={Colors.textSecondary} style={styles.telemetryIcon} />
          <Text style={styles.telemetryText}>{crop.temperatura}</Text>
          <Text style={styles.telemetryDivider}>•</Text>
          <Ionicons name="water-outline" size={13} color={Colors.textSecondary} style={styles.telemetryIcon} />
          <Text style={styles.telemetryText}>{crop.humedadSuelo}</Text>
        </View>

        <View style={styles.actionPrompt}>
          <Text style={styles.actionPromptText}>Ver Ficha Técnica</Text>
          <Ionicons name="chevron-forward" size={14} color={Colors.primaryLight} style={styles.actionArrow} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  cardPressed: {
    transform: [{ scale: 0.985 }],
    borderColor: Colors.primaryLight,
    backgroundColor: '#FAFDF9',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  titleColumn: {
    flex: 1,
  },
  cropName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  varietyText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
    fontStyle: 'italic',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: BorderRadius.full,
    marginRight: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#EDF2EE',
    marginVertical: Spacing.sm,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAF9',
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
    paddingTop: 4,
  },
  telemetryTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  telemetryIcon: {
    marginRight: 3,
  },
  telemetryText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  telemetryDivider: {
    marginHorizontal: 6,
    color: Colors.textMuted,
    fontSize: 10,
  },
  actionPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionPromptText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primaryLight,
  },
  actionArrow: {
    marginLeft: 2,
  },
});
