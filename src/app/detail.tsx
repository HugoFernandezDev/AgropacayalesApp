import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { MetricCard } from '../components/MetricCard';
import { InspectionModal } from '../components/InspectionModal';
import { CROPS_DATA, CropLot } from '../data/cropsData';
import { Colors, Spacing, BorderRadius } from '../constants/theme';

const renderBigCropIcon = (type: CropLot['iconType'], color: string) => {
  switch (type) {
    case 'leaf':
      return <MaterialCommunityIcons name="leaf" size={30} color={color} />;
    case 'seed':
      return <MaterialCommunityIcons name="sprout" size={30} color={color} />;
    case 'corn':
      return <MaterialCommunityIcons name="corn" size={30} color={color} />;
    case 'fruit':
      return <MaterialCommunityIcons name="fruit-watermelon" size={30} color={color} />;
    case 'tree':
      return <MaterialCommunityIcons name="tree" size={30} color={color} />;
    default:
      return <Ionicons name="leaf-outline" size={30} color={color} />;
  }
};

export default function DetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();

  // Buscar el cultivo seleccionado o cargar el primero por defecto
  const crop: CropLot =
    CROPS_DATA.find((c) => c.id === params.id) || CROPS_DATA[0];

  const [inspections, setInspections] = useState(crop.inspecciones);
  const [modalVisible, setModalVisible] = useState(false);
  const [successAlert, setSuccessAlert] = useState('');

  const handleBack = () => {
    // Retorno interactivo a Pantalla 2 (Home)
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  };

  const handleAddInspection = (note: string, inspector: string) => {
    const today = new Date();
    const dateStr = `${String(today.getDate()).padStart(2, '0')}/${String(
      today.getMonth() + 1
    ).padStart(2, '0')}/${today.getFullYear()}`;

    const newLog = {
      fecha: dateStr,
      tipo: 'Inspección en Campo',
      resultado: note,
      inspector: inspector || 'Hugo Fernandez',
    };

    setInspections([newLog, ...inspections]);
    setSuccessAlert('¡Inspección de campo registrada exitosamente!');
    setTimeout(() => setSuccessAlert(''), 4000);
  };

  const handleExportReport = () => {
    const msg = `Ficha técnica de trazabilidad generada para ${crop.nombre} (${crop.lote}). Certificación: ${crop.certificacion}. Responsable: Hugo Fernandez`;
    if (Platform.OS === 'web') {
      alert(msg);
    } else {
      Alert.alert('Reporte Generado', msg);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Institucional con botón de retorno Pressable */}
      <Header
        title={crop.nombre}
        subtitle={crop.lote}
        showBack={true}
        onBack={handleBack}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner de Estado del Lote */}
        <View style={styles.statusBanner}>
          <View style={styles.lotHeaderLeft}>
            <View style={[styles.badgeCircle, { backgroundColor: crop.estadoColor + '15' }]}>
              {renderBigCropIcon(crop.iconType, crop.estadoColor)}
            </View>
            <View style={styles.lotInfo}>
              <Text style={styles.varietyTitle}>{crop.variedad}</Text>
              <Text style={styles.scientificName}>{crop.nombreCientifico}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-sharp" size={13} color={Colors.textMuted} style={{ marginRight: 3 }} />
                <Text style={styles.locationText}>{crop.valle} • {crop.fundo}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.statusTag, { backgroundColor: crop.estadoColor }]}>
            <Text style={styles.statusTagText}>{crop.estado}</Text>
          </View>
        </View>

        {/* Mensaje de alerta de éxito */}
        {successAlert ? (
          <View style={styles.successBanner}>
            <Ionicons name="checkmark-circle" size={16} color={Colors.primaryDark} style={{ marginRight: 6 }} />
            <Text style={styles.successText}>{successAlert}</Text>
          </View>
        ) : null}

        {/* Resumen de Telemetría con Flexbox */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Condiciones de Campo en Vivo</Text>
          <View style={styles.liveBadgeRow}>
            <Ionicons name="radio-button-on" size={10} color="#D32F2F" style={{ marginRight: 4 }} />
            <Text style={styles.liveIndicator}>TIEMPO REAL</Text>
          </View>
        </View>

        <View style={styles.metricsGrid}>
          <MetricCard
            icon={<Ionicons name="thermometer-outline" size={18} color="#E65100" />}
            label="Temperatura"
            value={crop.temperatura}
            accentColor="#E65100"
          />
          <MetricCard
            icon={<Ionicons name="water-outline" size={18} color="#0288D1" />}
            label="Humedad Suelo"
            value={crop.humedadSuelo}
            accentColor="#0288D1"
          />
        </View>

        <View style={[styles.metricsGrid, { marginTop: Spacing.sm }]}>
          <MetricCard
            icon={<MaterialCommunityIcons name="flask-outline" size={18} color="#5E35B1" />}
            label="pH de Sustrato"
            value={crop.phSuelo}
            accentColor="#5E35B1"
          />
          <MetricCard
            icon={<MaterialCommunityIcons name="scale-balance" size={18} color={Colors.primary} />}
            label="Rendimiento Est."
            value={crop.rendimientoEst}
            accentColor={Colors.primary}
          />
        </View>

        {/* Ficha Agronómica y Trazabilidad */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ficha Técnica de Trazabilidad</Text>
        </View>

        <View style={styles.detailCard}>
          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>Área del Lote:</Text>
            <Text style={styles.rowValue}>{crop.hectareas} Hectáreas</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>Fecha de Siembra:</Text>
            <Text style={styles.rowValue}>{crop.fechaSiembra}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>Fecha Estimada Cosecha:</Text>
            <Text style={[styles.rowValue, { color: Colors.primaryLight }]}>
              {crop.fechaCosechaEst}
            </Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>Sistema de Riego:</Text>
            <Text style={styles.rowValue}>{crop.riegoTipo}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>Mercado de Destino:</Text>
            <Text style={styles.rowValue}>{crop.mercadoDestino}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>Certificación Oficial:</Text>
            <View style={styles.certBadge}>
              <Text style={styles.certBadgeText}>{crop.certificacion}</Text>
            </View>
          </View>
          <View style={styles.divider} />

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>Responsable Agronómico:</Text>
            <Text style={styles.rowValue}>{crop.responsable}</Text>
          </View>
        </View>

        {/* Descripción del Cultivo */}
        <View style={styles.descriptionBox}>
          <Text style={styles.descTitle}>Perfil Agronómico</Text>
          <Text style={styles.descText}>{crop.descripcion}</Text>
        </View>

        {/* Botones de Acción con Pressable y Vector Icons */}
        <View style={styles.actionsContainer}>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={({ pressed }) => [
              styles.actionButtonPrimary,
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Registrar Inspección"
          >
            <Ionicons name="clipboard-outline" size={16} color={Colors.white} style={styles.actionIcon} />
            <Text style={styles.actionTextPrimary}>Registrar Inspección</Text>
          </Pressable>

          <Pressable
            onPress={handleExportReport}
            style={({ pressed }) => [
              styles.actionButtonSecondary,
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Generar Reporte"
          >
            <Ionicons name="document-text-outline" size={16} color={Colors.primary} style={styles.actionIcon} />
            <Text style={styles.actionTextSecondary}>Ficha de Calidad</Text>
          </Pressable>
        </View>

        {/* Historial de Inspecciones */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Bitácora de Inspecciones ({inspections.length})</Text>
        </View>

        {inspections.map((item, index) => (
          <View key={index} style={styles.inspectionCard}>
            <View style={styles.inspectionTop}>
              <View style={styles.inspectionTypeRow}>
                <Ionicons name="search-circle-outline" size={16} color={Colors.primaryLight} style={{ marginRight: 4 }} />
                <Text style={styles.inspectionType}>{item.tipo}</Text>
              </View>
              <Text style={styles.inspectionDate}>{item.fecha}</Text>
            </View>
            <Text style={styles.inspectionResult}>{item.resultado}</Text>
            <Text style={styles.inspectionAuthor}>Por: {item.inspector}</Text>
          </View>
        ))}

        {/* Botón Inferior para Retornar a la Lista */}
        <Pressable
          onPress={handleBack}
          style={({ pressed }) => [
            styles.backBottomButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Ionicons name="arrow-back-circle-outline" size={18} color={Colors.primary} style={{ marginRight: 6 }} />
          <Text style={styles.backBottomText}>Volver al Catálogo de Lotes</Text>
        </Pressable>
      </ScrollView>

      {/* Modal interactivo de registro */}
      <InspectionModal
        visible={modalVisible}
        lotName={`${crop.nombre} - ${crop.lote}`}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddInspection}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxxl,
  },
  statusBanner: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  lotHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  badgeCircle: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  lotInfo: {
    flex: 1,
  },
  varietyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  scientificName: {
    fontSize: 12,
    fontStyle: 'italic',
    color: Colors.textSecondary,
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationText: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  statusTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  statusTagText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  successText: {
    color: Colors.primaryDark,
    fontSize: 13,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    marginTop: Spacing.xs,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.text,
  },
  liveBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveIndicator: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D32F2F',
    letterSpacing: 0.5,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  detailCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: Spacing.md,
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  rowLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  rowValue: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'right',
  },
  certBadge: {
    backgroundColor: '#FFF8E1',
    borderWidth: 1,
    borderColor: '#FFE082',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  certBadgeText: {
    fontSize: 11,
    color: '#F57F17',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#EDF2EE',
  },
  descriptionBox: {
    backgroundColor: '#F7FAF7',
    borderLeftWidth: 4,
    borderLeftColor: Colors.primaryLight,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  descTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    marginBottom: 4,
  },
  descText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  actionButtonPrimary: {
    flex: 1,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    elevation: 2,
  },
  actionButtonSecondary: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  actionIcon: {
    marginRight: 6,
  },
  actionTextPrimary: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
  actionTextSecondary: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: 'bold',
  },
  inspectionCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  inspectionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  inspectionTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inspectionType: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.primaryLight,
  },
  inspectionDate: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  inspectionResult: {
    fontSize: 12,
    color: Colors.text,
    lineHeight: 17,
  },
  inspectionAuthor: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 4,
    fontStyle: 'italic',
  },
  backBottomButton: {
    backgroundColor: '#E8F5E9',
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  backBottomText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
