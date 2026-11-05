import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { MetricCard } from '../components/MetricCard';
import { CropCard } from '../components/CropCard';
import { CROPS_DATA, KPI_DATA, CropLot } from '../data/cropsData';
import { Colors, Spacing, BorderRadius } from '../constants/theme';

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const filterOptions = ['Todos', 'Listo para Cosecha', 'Floración', 'En Crecimiento'];

  const filteredCrops = CROPS_DATA.filter((crop) => {
    const matchesSearch =
      crop.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.variedad.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.lote.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedFilter === 'Todos' ? true : crop.estado === selectedFilter;

    return matchesSearch && matchesCategory;
  });

  const handleSelectCrop = (crop: CropLot) => {
    // Redirección interactiva a Pantalla 3 (Detalle)
    router.push({
      pathname: '/detail',
      params: { id: crop.id },
    });
  };

  const handleLogout = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      {/* Header Institucional con Flexbox y vector icons */}
      <Header
        title="Agro Pacayales S.A.C."
        subtitle="Valle de Cañete • Fundo San Vicente"
        showLogout={true}
        onLogout={handleLogout}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner de Bienvenida y Estado del Valle */}
        <View style={styles.welcomeBanner}>
          <View style={styles.welcomeInfo}>
            <Text style={styles.greetingText}>¡Hola, Ing. Hugo Fernandez!</Text>
            <Text style={styles.subGreeting}>
              Supervisión de lotes y trazabilidad agrícola en tiempo real
            </Text>
          </View>
          <View style={styles.weatherBadge}>
            <Ionicons name="sunny" size={20} color="#F57C00" style={styles.weatherIcon} />
            <View>
              <Text style={styles.weatherTemp}>24°C</Text>
              <Text style={styles.weatherValley}>Cañete</Text>
            </View>
          </View>
        </View>

        {/* Banner Indicador de Almacenamiento Local Offline (AP7) */}
        <View style={styles.offlineStatusBanner}>
          <View style={styles.offlineStatusLeft}>
            <Ionicons name="server" size={14} color="#2E7D32" style={{ marginRight: 6 }} />
            <Text style={styles.offlineStatusTitle}>Almacenamiento Local Offline Activo (AP7)</Text>
          </View>
          <View style={styles.offlineBadge}>
            <Text style={styles.offlineBadgeText}>AsyncStorage</Text>
          </View>
        </View>

        {/* Imagen representativa del Fundo / Campos */}
        <View style={styles.heroCard}>
          <Image
            source={require('../../assets/images/agropacayales_hero.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <View style={styles.heroTagRow}>
              <Ionicons name="leaf" size={12} color={Colors.accent} style={{ marginRight: 4 }} />
              <Text style={styles.heroTag}>CAMPAÑA DE EXPORTACIÓN 2026</Text>
            </View>
            <Text style={styles.heroTitle}>Valle Fértil de Cañete • Riego Tecnificado</Text>
          </View>
        </View>

        {/* KPIs Agronómicos con Flexbox y Vector Icons */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Dashboard de Operaciones</Text>
          <Text style={styles.sectionBadge}>{KPI_DATA.certificacionVigente}</Text>
        </View>

        <View style={styles.metricsRow}>
          <MetricCard
            icon={<MaterialCommunityIcons name="sprout" size={20} color={Colors.primaryLight} />}
            label="Lotes en Producción"
            value={KPI_DATA.lotesActivos}
            unit="lotes"
            accentColor={Colors.primaryLight}
          />
          <MetricCard
            icon={<Ionicons name="map-outline" size={18} color="#1565C0" />}
            label="Área Monitoreada"
            value={KPI_DATA.hectareasTotales}
            unit="ha"
            accentColor="#1565C0"
          />
        </View>

        <View style={[styles.metricsRow, { marginTop: Spacing.sm }]}>
          <MetricCard
            icon={<Ionicons name="time-outline" size={18} color={Colors.warning} />}
            label="Próxima Cosecha"
            value={KPI_DATA.proximaCosechaDias}
            unit="días"
            accentColor={Colors.warning}
          />
          <MetricCard
            icon={<Ionicons name="shield-checkmark-outline" size={18} color={Colors.primary} />}
            label="Índice Calidad"
            value={KPI_DATA.calidadExportacion}
            accentColor={Colors.primary}
          />
        </View>

        {/* Barra de Búsqueda con TextInput y Vector Icons */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={16} color={Colors.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por cultivo, variedad o lote..."
              placeholderTextColor={Colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery ? (
              <Pressable onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={16} color={Colors.textMuted} />
              </Pressable>
            ) : null}
          </View>
        </View>

        {/* Filtros rápidos con Pressable */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}
        >
          {filterOptions.map((filter) => {
            const isActive = selectedFilter === filter;
            return (
              <Pressable
                key={filter}
                onPress={() => setSelectedFilter(filter)}
                style={({ pressed }) => [
                  styles.filterPill,
                  isActive && styles.filterPillActive,
                  pressed && styles.pressed,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    isActive && styles.filterTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Catálogo de Cultivos con Flexbox */}
        <View style={styles.catalogoHeader}>
          <Text style={styles.catalogoTitle}>Catálogo de Cultivos ({filteredCrops.length})</Text>
          <Text style={styles.catalogoHelp}>Toca una tarjeta para ver detalle</Text>
        </View>

        {filteredCrops.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="leaf-outline" size={36} color={Colors.textMuted} style={styles.emptyIcon} />
            <Text style={styles.emptyTitle}>No se encontraron cultivos</Text>
            <Text style={styles.emptyDesc}>
              Prueba con otro término de búsqueda o limpia el filtro seleccionado.
            </Text>
            <Pressable
              onPress={() => {
                setSearchQuery('');
                setSelectedFilter('Todos');
              }}
              style={styles.resetFilterBtn}
            >
              <Text style={styles.resetFilterText}>Restablecer Filtros</Text>
            </Pressable>
          </View>
        ) : (
          filteredCrops.map((crop) => (
            <CropCard
              key={crop.id}
              crop={crop}
              onPress={handleSelectCrop}
            />
          ))
        )}
      </ScrollView>
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
  welcomeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  welcomeInfo: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  greetingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subGreeting: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  weatherBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  weatherIcon: {
    marginRight: 6,
  },
  weatherTemp: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E65100',
  },
  weatherValley: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  heroCard: {
    height: 140,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    position: 'relative',
    elevation: 3,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(11, 56, 16, 0.75)',
    padding: Spacing.md,
  },
  heroTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroTag: {
    color: Colors.accent,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroTitle: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    marginTop: Spacing.xs,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  sectionBadge: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '700',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  searchSection: {
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    height: 44,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: Colors.text,
  },
  filtersScroll: {
    flexDirection: 'row',
    gap: Spacing.xs,
    paddingVertical: 4,
    marginBottom: Spacing.md,
  },
  filterPill: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  filterPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: Colors.white,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
  catalogoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: Spacing.sm,
  },
  catalogoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  catalogoHelp: {
    fontSize: 11,
    color: Colors.primaryLight,
    fontWeight: '600',
  },
  emptyState: {
    backgroundColor: Colors.white,
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  emptyIcon: {
    marginBottom: Spacing.sm,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  emptyDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: Spacing.md,
  },
  resetFilterBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  resetFilterText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
  offlineStatusBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 7,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  offlineStatusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offlineStatusTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2E7D32',
  },
  offlineBadge: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  offlineBadgeText: {
    color: Colors.white,
    fontSize: 9,
    fontWeight: 'bold',
  },
});
