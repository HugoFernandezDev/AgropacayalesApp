# 🌱 AgroPacayales Móvil — Prototipo Móvil React Native

> **S13 | AP7 • DESARROLLO DE APLICACIONES MÓVILES (DAM)**  
> **Actividad Práctica Individual:** *Reto práctico: Potencia tu aplicación móvil*  
> **Funcionalidad Avanzada Implementada:** **Almacenamiento Local Offline (AsyncStorage)**  
> **Instituto de Educación Superior Privado Valle Grande**  
> **Estudiante:** Hugo Fernandez  
> **Proyecto:** Agro Pacayales S.A.C. (Valle de Cañete, Lima - Perú)  

---

## 💾 Funcionalidad Avanzada Implementada: Almacenamiento Local (AP7)

De acuerdo a la **Regla de Trabajo de la Semana 13**, se seleccionó e integró la opción:

**`Almacenamiento: Guarda y recupera datos locales sin base externa.`**

### 🎯 Justificación Técnica & Agronómica
Los agrónomos de **Agro Pacayales S.A.C.** monitorean lotes agrícolas en áreas rurales del Valle de Cañete donde frecuentemente **no hay conectividad a internet (modo Offline-first)**. Mediante el uso de `@react-native-async-storage/async-storage`:
1. **Persistencia Total Sin Servidor:** Las inspecciones fitosanitarias registradas en campo se guardan físicamente en la memoria local del dispositivo (clave `@agropacayales_inspections_v1_<cropId>`).
2. **Ciclo Completo CRUD Local:**
   - **Lectura (Read):** Carga asíncrona automática al ingresar al detalle del lote.
   - **Creación (Create):** Inserción inmediata de nuevas inspecciones técnicas con fecha, hora, tipo de control y notas de campo.
   - **Eliminación (Delete):** Borrado selectivo de registros locales con confirmación interactiva.
   - **Restablecimiento:** Opción para resetear a los valores iniciales de base.
3. **Indicadores Visuales en Tiempo Real:**
   - Banner de estado *Almacenamiento Local Offline Activo* en la Pantalla Principal (`home.tsx`).
   - Módulo interactivo de estadísticas de almacenamiento local en la Pantalla de Detalle (`detail.tsx`), indicando clave, total en disco y registros creados en el equipo.
   - Badges distintivos en la bitácora: `💾 Storage Local` vs `📁 Base`.

---

## 🔑 Credenciales de Acceso al Sistema

Para ingresar y probar la aplicación en la **Pantalla 1 (Login)**, utiliza la cuenta oficial de agrónomo:

| Campo | Credencial Autorizada |
| :--- | :--- |
| **Usuario / Correo:** | `hfernandez@agropacayales.com` |
| **Contraseña:** | `AgroPacayales2026` |
| **Acceso Rápido:** | Botón *"Rellenar credenciales: Hugo Fernandez"* en pantalla |

---

## 🚀 Comandos para Encender la Aplicación

Abre una terminal en la carpeta del proyecto:

```bash
cd e:\MovilWeb\AgroPacayales
```

### 1. Iniciar en el Navegador Web (Recomendado para PC):
```bash
npx expo start --web
```
o también:
```bash
npm run web
```
> Esto abrirá automáticamente el prototipo en tu navegador en `http://localhost:8081`.

### 2. Iniciar con Expo Go en Dispositivo Móvil (Android / iOS):
```bash
npx expo start
```
> Escanea con tu celular el código QR que se dibuja en la consola desde la aplicación **Expo Go**.

### 3. Iniciar directamente en Emulador Android:
```bash
npm run android
```

---

## 📋 Descripción del Proyecto

**AgroPacayales Móvil** es un prototipo interactivo de aplicación móvil desarrollado con **React Native y Expo**, enfocado en la supervisión agronómica, monitoreo de lotes y trazabilidad para **Agro Pacayales S.A.C.**, empresa agroexportadora líder en el **Valle de Cañete**, especializada en cultivos como **Holantao (Snow Peas)**, **Arveja Dulce (Sugar Snap)**, **Maíz Morado de Exportación (INIA 601)**, **Sandía Criolla** y **Palta Hass**, certificados bajo la norma internacional **Global G.A.P.**

---

## 📱 Flujo de las 3 Pantallas Interactivas

El prototipo cumple rigurosamente con los requerimientos del documento **S07 | AP4**:

```
┌─────────────────────────┐       ┌─────────────────────────┐       ┌─────────────────────────┐
│       PANTALLA 1        │       │       PANTALLA 2        │       │       PANTALLA 3        │
│          LOGIN          │ ───►  │     PRINCIPAL (HOME)    │ ───►  │     DETALLE DE LOTE     │
│   Acceso de Personal    │       │   Catálogo & Dashboard  │ ◄───  │ Ficha Técnica & Registro│
└─────────────────────────┘       └─────────────────────────┘       └─────────────────────────┘
```

### 1. 🔐 Pantalla 1: Login (Acceso Principal de Usuario)
- Logotipo oficial de Agro Pacayales S.A.C. (`Image`).
- Campos de entrada para usuario y contraseña (`TextInput`) con iconos vectoriales de `@expo/vector-icons` (`Ionicons`).
- Botón de alternar visualización de contraseña.
- Botón de ingreso interactivo con evento `onPress` (`Pressable`) que valida las credenciales y redirige a la Pantalla Principal.
- Botón de autocompletado demo para **Hugo Fernandez**.

### 2. 🌾 Pantalla 2: Principal (Home / Catálogo de Cultivos)
- Header institucional con identificación del Fundo San Vicente y botón `Pressable` de salida / cerrar sesión.
- Saludo personalizado: *"¡Hola, Ing. Hugo Fernandez!"* y widget meteorológico del Valle de Cañete (24°C, Soleado).
- Tarjeta panorámica de los campos con riego tecnificado.
- Dashboard de KPIs agronómicos estructurado con Flexbox (Lotes activos, Hectáreas, Próxima cosecha, Calidad exportación).
- Barra de búsqueda interactiva con `TextInput` para filtrar lotes en tiempo real.
- Filtros por estado fenológico con componentes `Pressable` (Todos, Listo para Cosecha, Floración, En Crecimiento).
- Catálogo de tarjetas agrícolas (`CropCard`) con diseño Flexbox e iconos vectoriales (`MaterialCommunityIcons`), donde cada tarjeta redirige a la Pantalla 3 al ser presionada.

### 3. 📑 Pantalla 3: Detalle (Ficha Técnica y Trazabilidad)
- Botón de retorno interactivo (`Pressable` con `Ionicons`) tanto en el header superior como al final de la pantalla.
- Telemetría en tiempo real: Temperatura ambiente, Humedad de suelo, pH de sustrato y Rendimiento proyectado.
- Ficha agronómica completa: Variedad vegetal, fecha de siembra, fecha estimada de corte/cosecha, tipo de riego tecnificado, mercado de destino (EE.UU., Europa, Japón) y certificación oficial Global G.A.P.
- Bitácora de inspecciones dinámica.
- Modal interactivo (`InspectionModal`) para registrar nuevas inspecciones de campo a nombre de **Hugo Fernandez** con actualización inmediata del historial.
- Botón para generar ficha técnica de calidad.

---

## 🛠️ Stack Técnico y Componentes Fundamentales

| Requerimiento del Reto | Implementación |
| :--- | :--- |
| **Contenedores** | Uso de `<View>` estructurado con **Flexbox** (`flexDirection`, `justifyContent`, `alignItems`, `gap`). |
| **Textos e Inputs** | `<Text>` para títulos, datos y etiquetas; `<TextInput>` para captura de usuario, clave, búsqueda y notas. |
| **Interacción** | `<Pressable>` para todos los botones, tarjetas clicables y filtros con feedback visual de pulsación. |
| **Recursos Visuales** | `<Image>` para logotipos e imágenes de campo. |
| **Iconografía** | **Iconos vectoriales profesionales** con `@expo/vector-icons` (`Ionicons` y `MaterialCommunityIcons`), sin emojis de texto plano. |
| **Estilos** | `StyleSheet.create` con tokens limpios en `src/constants/theme.ts`. |
| **Navegación Móvil** | `Expo Router` con enrutador tipo `Stack` sin dependencias de backend requeridas. |
| **Almacenamiento Local (AP7)** | `@react-native-async-storage/async-storage` para persistencia local de inspecciones sin conexión ni base de datos externa. |

---

## 📂 Estructura del Directorio

```
AgroPacayales/
├── README.md                      # Guía completa y credenciales
├── app.json                       # Configuración de Expo
├── package.json                   # Dependencias oficiales (Expo, AsyncStorage, Vector Icons)
├── tsconfig.json                  # TypeScript estricto
├── .gitignore                     # Exclusiones git
├── assets/
│   └── images/
│       ├── agropacayales_logo.png # Logo oficial Agro Pacayales
│       ├── agropacayales_hero.png # Fotografía panorámica de campos Cañete
│       ├── icon.png               # Icono de la app
│       └── splash-icon.png        # Icono de inicio
└── src/
    ├── app/
    │   ├── _layout.tsx            # Stack Navigator (Expo Router)
    │   ├── index.tsx              # Pantalla 1: Login de acceso (Hugo Fernandez)
    │   ├── home.tsx               # Pantalla 2: Principal / Catálogo & KPIs (Banner Offline)
    │   └── detail.tsx             # Pantalla 3: Ficha Técnica & Módulo de Storage Local
    ├── components/
    │   ├── Header.tsx             # Barra superior con vector icons
    │   ├── MetricCard.tsx         # Tarjeta de KPIs con Flexbox y vector icons
    │   ├── CropCard.tsx           # Tarjeta de lote interactiva con Pressable
    │   └── InspectionModal.tsx    # Modal de registro con persistencia AsyncStorage
    ├── services/
    │   └── storageService.ts      # Servicio de persistencia CRUD con AsyncStorage (AP7)
    ├── constants/
    │   └── theme.ts               # Paleta de colores agronómica y tokens de espaciado
    └── data/
        └── cropsData.ts           # Datos de cultivos del Valle de Cañete
```

---

## 📋 Guía de Entregables AP7 (Checklist de Evaluación)

Para cumplir con los 4 elementos obligatorios solicitados en la plataforma:

1. **Captura de la Interfaz:**  
   - Tomar captura de pantalla en la vista de Detalle del Lote (`detail.tsx`), donde se visualiza el **Módulo de Almacenamiento Local Offline (AsyncStorage)** con sus métricas y badges en verde.

2. **Capturas de Funcionamiento (Paso a Paso):**  
   - **Paso 1:** Abrir el modal de registro y añadir una nueva inspección ("Control Fitosanitario en Lote 04").
   - **Paso 2:** Observar el mensaje de éxito y la tarjeta con el badge `💾 Storage Local`.
   - **Paso 3:** Recargar la aplicación o cerrar la pantalla y volver a entrar para demostrar que la inspección persiste intacta en la memoria del dispositivo sin base de datos externa.
   - **Paso 4 (Opcional):** Presionar el botón `Eliminar` para demostrar el borrado local del registro.

3. **Repositorio de GitHub:**  
   - URL oficial con el código fuente actualizado:  
     `https://github.com/HugoFernandezDev/AgropacayalesApp.git`

4. **Video Demostrativo:**  
   - Grabación breve (1-2 minutos) mostrando el login, navegación al lote, registro de inspección, verificación del almacenamiento local persistente tras recarga, y demostración en emulador/navegador.

