import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '../constants/theme';

interface MetricCardProps {
  label?: string;
  title?: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  iconName?: any;
  accentColor?: string;
  color?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  title,
  value,
  unit,
  icon,
  iconName,
  accentColor,
  color,
}) => {
  const activeLabel = label || title || '';
  const activeColor = accentColor || color || Colors.primary;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={[styles.iconContainer, { backgroundColor: activeColor + '15' }]}>
          {icon ? (
            icon
          ) : iconName ? (
            <Ionicons name={iconName} size={18} color={activeColor} />
          ) : (
            <Ionicons name="stats-chart" size={18} color={activeColor} />
          )}
        </View>
        <View style={[styles.indicator, { backgroundColor: activeColor }]} />
      </View>
      <View style={styles.valueRow}>
        <Text style={[styles.valueText, { color: activeColor }]}>{value}</Text>
        {unit ? <Text style={styles.unitText}>{unit}</Text> : null}
      </View>
      <Text style={styles.labelText}>{activeLabel}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flex: 1,
    minWidth: 100,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: BorderRadius.full,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  valueText: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  unitText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginLeft: 3,
  },
  labelText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginTop: 2,
  },
});
