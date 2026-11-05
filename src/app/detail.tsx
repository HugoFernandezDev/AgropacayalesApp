import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { MetricCard } from '../components/MetricCard';
import { InspectionModal } from '../components/InspectionModal';
import { CROPS_DATA, CropLot } from '../data/cropsData';
import { StorageService, StoredInspection } from '../services/storageService';
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

  const [inspections, setInspections] = useState<StoredInspection[]>([]);
  const [isLoadingStorage, setIsLoadingStorage] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [successAlert, setSuccessAlert] = useState('');

  // Cargar inspecciones desde AsyncStorage al montar o cambiar de lote
  const loadStoredInspections = useCallback(async () => {
    try {
      setIsLoadingStorage(true);
      const data = await StorageService.getInspections(crop.id);
      setInspections(data);
    } catch (error) {
      console.error('Error al leer de AsyncStorage:', error);
    } finally {
      setIsLoadingStorage(false);
    }
  }, [crop.id]);

  useEffect(() => {
    loadStoredInspections();
  }, [loadStoredInspections]);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  };

  // Registrar nueva inspección persistente en AsyncStorage
  const handleAddInspection = async (
    note: string,
    inspector: string,
    tipo?: string
  ) => {
    try {
      const updated = await StorageService.addInspection(crop.id, {
        tipo: tipo || 'Inspección en Campo',
        resultado: note,
        inspector: inspector || 'Hugo Fernandez',
      });

      setInspections(updated);
      setSuccessAlert('¡Inspección guardada con éxito en el Almacenamiento Local (AsyncStorage)!');
      setTimeout(() => setSuccessAlert(''), 4500);
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la inspección en almacenamiento local.');
    }
  };

  // Eliminar inspección del almacenamiento local
  const handleDeleteInspection = (inspection: StoredInspection) => {
    const confirmDelete = async () => {
      try {
        const updated = await StorageService.deleteInspection(crop.id, inspection.id);
        setInspections(updated);
        setSuccessAlert('Registro eliminado correctamente del almacenamiento local.');
        setTimeout(() => setSuccessAlert(''), 3500);
      } catch (error) {
        Alert.alert('Error', 'No se pudo eliminar el registro de almacenamiento local.');
      }
    };

    if (Platform.OS === 'web') {
      if (window.confirm(`¿Eliminar la inspección "${inspection.tipo}" del almacenamiento local?`)) {
        confirmDelete();
      }
    } else {
      Alert.alert(
        'Eliminar del Almacenamiento',
        `¿Deseas eliminar permanentemente esta inspección del almacenamiento local de tu equipo?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Eliminar', style: 'destructive', onPress: confirmDelete },
        ]
      );
    }
  };

  // Restablecer el almacenamiento local a los datos iniciales
  const handleResetStorage = async () => {
    const doReset = async () => {
      try {
        const restored = await StorageService.resetToDefault(crop.id);
        setInspections(restored);
        setSuccessAlert('Almacenamiento local restablecido a los valores base.');
        setTimeout(() => setSuccessAlert(''), 3500);
      } catch (error) {
        Alert.alert('Error', 'No se pudo restablecer el almacenamiento local.');
      }
    };

    if (Platform.OS === 'web') {
      if (window.confirm('¿Deseas restablecer el almacenamiento local de este lote a los datos base?')) {
        doReset();
      }
    } else {
      Alert.alert(
        'Restablecer Almacenamiento',
        'Se restablecerán las inspecciones locales a la configuración inicial.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Restablecer', onPress: doReset },
        ]
      );
    }
  };

  const handleExportReport = () => {
    const localCount = inspections.filter((i) => i.origen === 'local').length;
    const msg = `Ficha técnica de trazabilidad para ${crop.nombre} (${crop.lote}). Certificación: ${crop.certificacion}. Registros en AsyncStorage: ${inspections.length} (${localCount} creados en este dispositivo). Responsable: Hugo Fernandez`;
    if (Platform.OS === 'web') {
      alert(msg);
    } else {
      Alert.alert('Reporte de Almacenamiento Local', msg);
    }
  };

  const localInspectionsCount = inspections.filter((i) => i.origen === 'local').length;

  return (
    <View style={styles.container}>
      {/* Header Institucional */}
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
            <View style={[styles.badgeCircle, { backgroundColor: `${crop.estadoColor}15` }]}>
              {renderBigCropIcon(crop.iconType, crop.estadoColor)}
            </View>
            <View style={styles.lotInfo}>
              <Text style={styles.varietyTitle}>{crop.variedad}</Text>
              <Text style={styles.scientificName}>{crop.nombreCientifico}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={12} color={Colors.textMuted} style={{ marginRight: 2 }} />
                <Text style={styles.locationText}>{crop.valle} • {crop.fundo}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.statusTag, { backgroundColor: crop.estadoColor }]}>
            <Text style={styles.statusTagText}>{crop.estado.toUpperCase()}</Text>
          </View>
        </View>

        {/* Notificación de Éxito Flotante */}
        {successAlert ? (
          <View style={styles.successBanner}>
            <Ionicons name="checkmark-circle" size={18} color={Colors.primary} style={{ marginRight: 8 }} />
            <Text style={styles.successText}>{successAlert}</Text>
          </View>
        ) : null}

        {/* ======================================================== */}
        {/* TARJETA DESTACADA: MÓDULO DE ALMACENAMIENTO LOCAL (AP7) */}
        {/* ======================================================== */}
        <View style={styles.storageCard}>
          <View style={styles.storageCardHeader}>
            <View style={styles.storageTitleRow}>
              <View style={styles.storageIconWrapper}>
                <Ionicons name="server" size={18} color={Colors.white} />
              </View>
              <View>
                <Text style={styles.storageCardTitle}>Almacenamiento Local Offline</Text>
                <Text style={styles.storageCardSubtitle}>AsyncStorage • Semana 13 AP7</Text>
              </View>
            </View>
            <View style={styles.storageStatusPill}>
              <View style={styles.storageStatusDot} />
              <Text style={styles.storageStatusText}>Activo</Text>
            </View>
          </View>

          <Text style={styles.storageDescription}>
            Los registros fitosanitarios se guardan y recuperan de forma 100% persistente en el dispositivo sin depender de bases de datos externas ni conexión a internet.
          </Text>

          {/* Estadísticas de Almacenamiento */}
          <View style={styles.storageMetricsGrid}>
            <View style={styles.storageMetricBox}>
              <Text style={styles.storageMetricValue}>{inspections.length}</Text>
              <Text style={styles.storageMetricLabel}>Total en Memoria</Text>
            </View>
            <View style={styles.storageMetricBox}>
              <Text style={[styles.storageMetricValue, { color: Colors.primary }]}>
                {localInspectionsCount}
              </Text>
              <Text style={styles.storageMetricLabel}>Creados en App</Text>
            </View>
            <View style={styles.storageMetricBox}>
              <Ionicons name="shield-checkmark" size={18} color="#2E7D32" style={{ alignSelf: 'center', marginBottom: 2 }} />
              <Text style={styles.storageMetricLabel}>Sin Conexión</Text>
            </View>
          </View>

          {/* Llave de Almacenamiento */}
          <View style={styles.storageKeyBox}>
            <Ionicons name="key-outline" size={13} color={Colors.textMuted} style={{ marginRight: 6 }} />
            <Text style={styles.storageKeyText} numberOfLines={1}>
              Clave: {StorageService.getKey(crop.id)}
            </Text>
          </View>

          {/* Acciones de Almacenamiento */}
          <View style={styles.storageActionsRow}>
            <Pressable
              onPress={loadStoredInspections}
              style={({ pressed }) => [styles.storageBtnSecondary, pressed && styles.buttonPressed]}
            >
              <Ionicons name="refresh-outline" size={14} color={Colors.primary} style={{ marginRight: 4 }} />
              <Text style={styles.storageBtnSecondaryText}>Recargar</Text>
            </Pressable>

            <Pressable
              onPress={handleResetStorage}
              style={({ pressed }) => [styles.storageBtnWarning, pressed && styles.buttonPressed]}
            >
              <Ionicons name="reload-outline" size={14} color="#D32F2F" style={{ marginRight: 4 }} />
              <Text style={styles.storageBtnWarningText}>Restablecer Base</Text>
            </Pressable>
          </View>
        </View>

        {/* Telemetría y Variables Críticas */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Telemetría en Campo</Text>
          <View style={styles.liveBadgeRow}>
            <View style={[styles.storageStatusDot, { backgroundColor: '#D32F2F' }]} />
            <Text style={styles.liveIndicator}>SENSORES IOT</Text>
          </View>
        </View>

        <View style={styles.metricsGrid}>
          <MetricCard
            title="Temperatura"
            value={crop.temperatura}
            icon="thermometer-outline"
            color="#E65100"
          />
          <MetricCard
            title="Humedad Suelo"
            value={crop.humedadSuelo}
            icon="water-outline"
            color="#0288D1"
          />
        </View>

        <View style={[styles.metricsGrid, { marginTop: Spacing.sm }]}>
          <MetricCard
            title="pH de Sustrato"
            value={crop.phSuelo}
            icon="flask-outline"
            color="#7B1FA2"
          />
          <MetricCard
            title="Rendimiento Est."
            value={crop.rendimientoEst}
            icon="trending-up-outline"
            color="#2E7D32"
          />
        </View>

        {/* Ficha Agronómica Detallada */}
        <View style={[styles.sectionHeader, { marginTop: Spacing.md }]}>
          <Text style={styles.sectionTitle}>Ficha Agronómica y Destino</Text>
        </View>

        <View style={styles.detailCard}>
          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>Área Cultivada:</Text>
            <Text style={styles.rowValue}>{crop.hectareas} Hectáreas</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>Fecha de Siembra:</Text>
            <Text style={styles.rowValue}>{crop.fechaSiembra}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>Cosecha Estimada:</Text>
            <Text style={styles.rowValue}>{crop.fechaCosechaEst}</Text>
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

        {/* Botones de Acción */}
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
            <Ionicons name="add-circle-outline" size={18} color={Colors.white} style={styles.actionIcon} />
            <Text style={styles.actionTextPrimary}>Nueva Inspección (Storage)</Text>
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
            <Text style={styles.actionTextSecondary}>Ficha Trazabilidad</Text>
          </Pressable>
        </View>

        {/* Historial de Inspecciones con Indicador de Almacenamiento Local */}
        <View style={styles.sectionHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="file-tray-full-outline" size={17} color={Colors.primary} style={{ marginRight: 6 }} />
            <Text style={styles.sectionTitle}>
              Bitácora Local ({inspections.length})
            </Text>
          </View>
          <Text style={styles.storageCounterHint}>
            {localInspectionsCount} nueva(s) en disco
          </Text>
        </View>

        {isLoadingStorage ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={Colors.primary} />
            <Text style={styles.loadingText}>Leyendo datos de AsyncStorage...</Text>
          </View>
        ) : inspections.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="cube-outline" size={36} color={Colors.textMuted} />
            <Text style={styles.emptyText}>No hay inspecciones registradas en este lote.</Text>
          </View>
        ) : (
          inspections.map((item) => (
            <View key={item.id} style={styles.inspectionCard}>
              <View style={styles.inspectionTop}>
                <View style={styles.inspectionTypeRow}>
                  <Ionicons
                    name="search-circle-outline"
                    size={16}
                    color={Colors.primaryLight}
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.inspectionType}>{item.tipo}</Text>
                </View>

                {/* Badge de Origen de Almacenamiento */}
                <View
                  style={[
                    styles.originBadge,
                    item.origen === 'local'
                      ? styles.originBadgeLocal
                      : styles.originBadgeSeed,
                  ]}
                >
                  <Ionicons
                    name={item.origen === 'local' ? 'save' : 'layers-outline'}
                    size={10}
                    color={item.origen === 'local' ? '#1B5E20' : '#455A64'}
                    style={{ marginRight: 3 }}
                  />
                  <Text
                    style={[
                      styles.originBadgeText,
                      item.origen === 'local'
                        ? styles.originBadgeTextLocal
                        : styles.originBadgeTextSeed,
                    ]}
                  >
                    {item.origen === 'local' ? 'Storage Local' : 'Base'}
                  </Text>
                </View>
              </View>

              <Text style={styles.inspectionResult}>{item.resultado}</Text>

              <View style={styles.inspectionBottomRow}>
                <View>
                  <Text style={styles.inspectionAuthor}>Por: {item.inspector}</Text>
                  <Text style={styles.inspectionDateTime}>
                    📅 {item.fecha} {item.hora ? `• ⏰ ${item.hora}` : ''}
                  </Text>
                </View>

                {/* Botón para Eliminar Registro del AsyncStorage */}
                <Pressable
                  onPress={() => handleDeleteInspection(item)}
                  style={({ pressed }) => [
                    styles.deleteButton,
                    pressed && styles.buttonPressed,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel="Eliminar inspección"
                >
                  <Ionicons name="trash-outline" size={16} color="#D32F2F" />
                  <Text style={styles.deleteButtonText}>Eliminar</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}

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
    flex: 1,
  },

  /* Módulo de Almacenamiento Local (AP7) */
  storageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1.5,
    borderColor: '#C8E6C9',
    elevation: 3,
    shadowColor: '#1B5E20',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  storageCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  storageTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storageIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  storageCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
  },
  storageCardSubtitle: {
    fontSize: 11,
    color: Colors.primaryLight,
    fontWeight: '600',
  },
  storageStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: '#A5D6A7',
  },
  storageStatusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#2E7D32',
    marginRight: 5,
  },
  storageStatusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2E7D32',
    textTransform: 'uppercase',
  },
  storageDescription: {
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 16,
    marginTop: 4,
    marginBottom: Spacing.sm,
  },
  storageMetricsGrid: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  storageMetricBox: {
    flex: 1,
    backgroundColor: '#F8FAF8',
    borderRadius: BorderRadius.md,
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E7E0',
  },
  storageMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  storageMetricLabel: {
    fontSize: 9,
    color: Colors.textMuted,
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
  storageKeyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F1',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    marginBottom: Spacing.sm,
  },
  storageKeyText: {
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    color: Colors.textSecondary,
    flex: 1,
  },
  storageActionsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  storageBtnSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
    paddingVertical: 7,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  storageBtnSecondaryText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
  storageBtnWarning: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEBEE',
    paddingVertical: 7,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  storageBtnWarningText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D32F2F',
  },

  /* Fin Módulo Storage */
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
  storageCounterHint: {
    fontSize: 11,
    color: Colors.primaryLight,
    fontWeight: '600',
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
    flex: 1.2,
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
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionTextSecondary: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  loadingContainer: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 6,
  },
  emptyContainer: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  emptyText: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 6,
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
    marginBottom: 6,
  },
  inspectionTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  inspectionType: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.primaryLight,
  },
  originBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  originBadgeLocal: {
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  originBadgeSeed: {
    backgroundColor: '#ECEFF1',
    borderWidth: 1,
    borderColor: '#CFD8DC',
  },
  originBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  originBadgeTextLocal: {
    color: '#1B5E20',
  },
  originBadgeTextSeed: {
    color: '#455A64',
  },
  inspectionResult: {
    fontSize: 12,
    color: Colors.text,
    lineHeight: 18,
    marginBottom: 6,
  },
  inspectionBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#F0F4F0',
    paddingTop: 6,
  },
  inspectionAuthor: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  inspectionDateTime: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  deleteButtonText: {
    fontSize: 11,
    color: '#D32F2F',
    fontWeight: '600',
    marginLeft: 3,
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
