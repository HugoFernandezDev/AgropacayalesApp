import AsyncStorage from '@react-native-async-storage/async-storage';
import { CropLot, CROPS_DATA } from '../data/cropsData';

export interface StoredInspection {
  id: string;
  fecha: string;
  hora: string;
  tipo: string;
  resultado: string;
  inspector: string;
  origen: 'local' | 'precargado';
  createdAt: number;
}

const STORAGE_KEY_PREFIX = '@agropacayales_inspections_v1_';

/**
 * Servicio de Almacenamiento Local (AsyncStorage)
 * Permite guardar, recuperar, eliminar y sincronizar inspecciones fitosanitarias
 * localmente en el dispositivo sin requerir base de datos externa ni internet.
 */
export const StorageService = {
  /**
   * Genera la clave única de AsyncStorage para un lote específico
   */
  getKey(cropId: string): string {
    return `${STORAGE_KEY_PREFIX}${cropId}`;
  },

  /**
   * Obtiene todas las inspecciones almacenadas para un lote.
   * Si no existen datos guardados aún, inicializa el almacenamiento
   * con las inspecciones iniciales del cultivo.
   */
  async getInspections(cropId: string): Promise<StoredInspection[]> {
    try {
      const key = this.getKey(cropId);
      const jsonValue = await AsyncStorage.getItem(key);

      if (jsonValue != null) {
        const parsed: StoredInspection[] = JSON.parse(jsonValue);
        return parsed;
      }

      // Si no existe almacenamiento previo, inicializamos con los datos base
      const defaultCrop = CROPS_DATA.find((c) => c.id === cropId);
      const initialInspections: StoredInspection[] = defaultCrop
        ? defaultCrop.inspecciones.map((item, idx) => ({
            id: `seed-${cropId}-${idx}-${Date.now()}`,
            fecha: item.fecha,
            hora: '08:00 AM',
            tipo: item.tipo,
            resultado: item.resultado,
            inspector: item.inspector,
            origen: 'precargado',
            createdAt: Date.now() - (idx + 1) * 86400000,
          }))
        : [];

      // Guardamos la semilla inicial en AsyncStorage
      await AsyncStorage.setItem(key, JSON.stringify(initialInspections));
      return initialInspections;
    } catch (error) {
      console.error(`Error al recuperar datos de AsyncStorage para ${cropId}:`, error);
      return [];
    }
  },

  /**
   * Guarda una nueva inspección localmente en AsyncStorage.
   */
  async addInspection(
    cropId: string,
    data: {
      tipo: string;
      resultado: string;
      inspector: string;
      fecha?: string;
      hora?: string;
    }
  ): Promise<StoredInspection[]> {
    try {
      const existing = await this.getInspections(cropId);

      const now = new Date();
      const dateStr =
        data.fecha ||
        `${String(now.getDate()).padStart(2, '0')}/${String(
          now.getMonth() + 1
        ).padStart(2, '0')}/${now.getFullYear()}`;

      const timeStr =
        data.hora ||
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const newRecord: StoredInspection = {
        id: `insp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        fecha: dateStr,
        hora: timeStr,
        tipo: data.tipo,
        resultado: data.resultado,
        inspector: data.inspector || 'Hugo Fernandez',
        origen: 'local',
        createdAt: Date.now(),
      };

      const updated = [newRecord, ...existing];
      const key = this.getKey(cropId);
      await AsyncStorage.setItem(key, JSON.stringify(updated));

      return updated;
    } catch (error) {
      console.error(`Error al guardar inspección en AsyncStorage para ${cropId}:`, error);
      throw error;
    }
  },

  /**
   * Elimina una inspección específica del almacenamiento local
   */
  async deleteInspection(cropId: string, inspectionId: string): Promise<StoredInspection[]> {
    try {
      const existing = await this.getInspections(cropId);
      const filtered = existing.filter((item) => item.id !== inspectionId);
      const key = this.getKey(cropId);
      await AsyncStorage.setItem(key, JSON.stringify(filtered));
      return filtered;
    } catch (error) {
      console.error(`Error al eliminar inspección de AsyncStorage:`, error);
      throw error;
    }
  },

  /**
   * Restablece el almacenamiento local de un lote a los valores originales
   */
  async resetToDefault(cropId: string): Promise<StoredInspection[]> {
    try {
      const key = this.getKey(cropId);
      await AsyncStorage.removeItem(key);
      return await this.getInspections(cropId);
    } catch (error) {
      console.error(`Error al restablecer almacenamiento local para ${cropId}:`, error);
      throw error;
    }
  },

  /**
   * Obtiene métricas generales del almacenamiento local en toda la aplicación
   */
  async getStorageStats(): Promise<{
    totalKeys: number;
    totalInspections: number;
    localCreatedCount: number;
  }> {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const appKeys = allKeys.filter((k) => k.startsWith(STORAGE_KEY_PREFIX));

      let totalInspections = 0;
      let localCreatedCount = 0;

      for (const k of appKeys) {
        const val = await AsyncStorage.getItem(k);
        if (val) {
          const arr: StoredInspection[] = JSON.parse(val);
          totalInspections += arr.length;
          localCreatedCount += arr.filter((i) => i.origen === 'local').length;
        }
      }

      return {
        totalKeys: appKeys.length,
        totalInspections,
        localCreatedCount,
      };
    } catch (error) {
      console.error('Error al calcular estadísticas de AsyncStorage:', error);
      return { totalKeys: 0, totalInspections: 0, localCreatedCount: 0 };
    }
  },
};

