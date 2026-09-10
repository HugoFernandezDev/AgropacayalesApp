export interface CropLot {
  id: string;
  nombre: string;
  nombreCientifico: string;
  variedad: string;
  lote: string;
  fundo: string;
  valle: string;
  hectareas: number;
  estado: 'Listo para Cosecha' | 'En Crecimiento' | 'Floración' | 'Llenado de Vaina';
  estadoColor: string;
  fechaSiembra: string;
  fechaCosechaEst: string;
  temperatura: string;
  humedadSuelo: string;
  phSuelo: string;
  rendimientoEst: string;
  certificacion: string;
  mercadoDestino: string;
  responsable: string;
  riegoTipo: string;
  iconType: 'leaf' | 'seed' | 'corn' | 'fruit' | 'tree';
  descripcion: string;
  inspecciones: {
    fecha: string;
    tipo: string;
    resultado: string;
    inspector: string;
  }[];
}

export const CROPS_DATA: CropLot[] = [
  {
    id: 'crop-1',
    nombre: 'Holantao (Snow Peas)',
    nombreCientifico: 'Pisum sativum var. saccharatum',
    variedad: 'Oregon Sugar Pod II',
    lote: 'Lote 04 - Sector El Pacayal',
    fundo: 'Fundo San Vicente',
    valle: 'Valle de Cañete, Lima',
    hectareas: 18.5,
    estado: 'Listo para Cosecha',
    estadoColor: '#2E7D32',
    fechaSiembra: '15 Mayo 2026',
    fechaCosechaEst: '12 Septiembre 2026',
    temperatura: '21.5 °C',
    humedadSuelo: '76 %',
    phSuelo: '6.4 pH',
    rendimientoEst: '14.2 Tn/ha',
    certificacion: 'Global G.A.P. & SENASA N° 4492',
    mercadoDestino: 'Estados Unidos (Miami / Filadelfia)',
    responsable: 'Ing. Agr. Hugo Fernandez',
    riegoTipo: 'Riego por Goteo Tecnificado',
    iconType: 'leaf',
    descripcion:
      'Cultivo estrella de exportación de Agro Pacayales en el Valle de Cañete. Vainas tiernas, planas y crujientes de alta calidad organoléptica con destino a cadenas gourmet internacionales.',
    inspecciones: [
      { fecha: '08/09/2026', tipo: 'Control de Vaina y Brix', resultado: 'Excelente (Calibre Exportación A)', inspector: 'Hugo Fernandez' },
      { fecha: '02/09/2026', tipo: 'Monitoreo Fitosanitario', resultado: '0% Incidencias de trips o mildiu', inspector: 'Hugo Fernandez' },
      { fecha: '25/08/2026', tipo: 'Análisis de Humedad y Riego', resultado: 'Óptimo (75% saturación)', inspector: 'Equipo Técnico Cañete' }
    ]
  },
  {
    id: 'crop-2',
    nombre: 'Arveja Dulce (Sugar Snap)',
    nombreCientifico: 'Pisum sativum var. macrocarpon',
    variedad: 'Super Sugar Snap',
    lote: 'Lote 08 - Sector La Rinconada',
    fundo: 'Fundo San Vicente',
    valle: 'Valle de Cañete, Lima',
    hectareas: 14.0,
    estado: 'Llenado de Vaina',
    estadoColor: '#1565C0',
    fechaSiembra: '28 Mayo 2026',
    fechaCosechaEst: '20 Septiembre 2026',
    temperatura: '22.0 °C',
    humedadSuelo: '72 %',
    phSuelo: '6.6 pH',
    rendimientoEst: '12.8 Tn/ha',
    certificacion: 'Global G.A.P. & BPM Packing',
    mercadoDestino: 'Unión Europea (Rotterdam, Holanda)',
    responsable: 'Ing. Agr. Hugo Fernandez',
    riegoTipo: 'Goteo automatizado con tensiómetros',
    iconType: 'seed',
    descripcion:
      'Vainas carnosas y dulces de excelente crocancia. Conducidas en espalderas para máxima aireación y protección solar en los campos templados de Cañete.',
    inspecciones: [
      { fecha: '06/09/2026', tipo: 'Revisión de Espalderas', resultado: 'Estructuras firmes y guiadas', inspector: 'Hugo Fernandez' },
      { fecha: '29/08/2026', tipo: 'Nutrición Foliar Potásica', resultado: 'Uniformidad de llenado 94%', inspector: 'Hugo Fernandez' }
    ]
  },
  {
    id: 'crop-3',
    nombre: 'Maíz Morado de Exportación',
    nombreCientifico: 'Zea mays L.',
    variedad: 'INIA 601 (Alto contenido Antocianinas)',
    lote: 'Lote 12 - Pampa Imperial',
    fundo: 'Fundo Los Pacayales',
    valle: 'Valle de Cañete, Lima',
    hectareas: 22.0,
    estado: 'Floración',
    estadoColor: '#6A1B9A',
    fechaSiembra: '10 Junio 2026',
    fechaCosechaEst: '05 Octubre 2026',
    temperatura: '23.8 °C',
    humedadSuelo: '68 %',
    phSuelo: '6.8 pH',
    rendimientoEst: '7.5 Tn/ha',
    certificacion: 'Orgánico USDA & Buenas Prácticas Agrícolas',
    mercadoDestino: 'Japón & Unión Europea',
    responsable: 'Ing. Agr. Hugo Fernandez',
    riegoTipo: 'Riego por gravedad controlado',
    iconType: 'corn',
    descripcion:
      'Variedad peruana emblemática de alto valor nutracéutico. Agro Pacayales produce granos y corontas moradas con más de 6% de antocianinas para extractos naturales y chicha de exportación.',
    inspecciones: [
      { fecha: '04/09/2026', tipo: 'Evaluación de Polinización', resultado: 'Espigado parejo y vigoroso', inspector: 'Hugo Fernandez' },
      { fecha: '22/08/2026', tipo: 'Control de Cogollero', resultado: 'Limpio con trampas de feromona', inspector: 'Equipo Técnico Cañete' }
    ]
  },
  {
    id: 'crop-4',
    nombre: 'Sandía Criolla Cañetana',
    nombreCientifico: 'Citrullus lanatus',
    variedad: 'Crimson Sweet',
    lote: 'Lote 03 - Río Cañete Bajo',
    fundo: 'Fundo El Pacayal',
    valle: 'Valle de Cañete, Lima',
    hectareas: 16.0,
    estado: 'En Crecimiento',
    estadoColor: '#C62828',
    fechaSiembra: '02 Julio 2026',
    fechaCosechaEst: '18 Octubre 2026',
    temperatura: '24.2 °C',
    humedadSuelo: '65 %',
    phSuelo: '6.5 pH',
    rendimientoEst: '45.0 Tn/ha',
    certificacion: 'Certificación BPA Cañete Valle Grande',
    mercadoDestino: 'Mercado Nacional Mayorista & Exportación Regional',
    responsable: 'Ing. Agr. Hugo Fernandez',
    riegoTipo: 'Cintas de goteo de alta eficiencia',
    iconType: 'fruit',
    descripcion:
      'Frutos grandes, de pulpa roja intensa y alto contenido de azúcar (11.5 °Brix). Cosechadas con el tradicional dulzor de los aluviones del Río Cañete.',
    inspecciones: [
      { fecha: '05/09/2026', tipo: 'Guía de Guías y Raleo', resultado: '2 frutos homogéneos por planta', inspector: 'Hugo Fernandez' }
    ]
  },
  {
    id: 'crop-5',
    nombre: 'Palta Hass para Exportación',
    nombreCientifico: 'Persea americana Mill.',
    variedad: 'Hass sobre patrón Duke 7',
    lote: 'Lote 09 - Meseta Pacayales',
    fundo: 'Fundo San Vicente',
    valle: 'Valle de Cañete, Lima',
    hectareas: 30.0,
    estado: 'En Crecimiento',
    estadoColor: '#F57C00',
    fechaSiembra: 'Campaña Permanente 2024-2026',
    fechaCosechaEst: '25 Noviembre 2026',
    temperatura: '22.8 °C',
    humedadSuelo: '80 %',
    phSuelo: '6.7 pH',
    rendimientoEst: '18.0 Tn/ha',
    certificacion: 'Global G.A.P., SMETA & GRASP',
    mercadoDestino: 'España, Reino Unido y China',
    responsable: 'Ing. Agr. Hugo Fernandez',
    riegoTipo: 'Microaspersión sub-arbórea controlada',
    iconType: 'tree',
    descripcion:
      'Plantación de palta Hass de Agro Pacayales con manejo integrado de nutrientes y trazabilidad integral de cosecha para mercados exigentes de ultramar.',
    inspecciones: [
      { fecha: '07/09/2026', tipo: 'Medición de Materia Seca', resultado: '22.5% MS en evolución', inspector: 'Hugo Fernandez' }
    ]
  }
];

export const KPI_DATA = {
  lotesActivos: 5,
  hectareasTotales: 100.5,
  proximaCosechaDias: 2,
  calidadExportacion: '98.6%',
  temperaturaValle: '23.5 °C',
  humedadAmbiente: '68%',
  certificacionVigente: 'Global G.A.P. 2026'
};
