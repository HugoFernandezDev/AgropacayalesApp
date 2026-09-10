# 🌱 AgroPacayales Móvil — Prototipo Móvil React Native

> **S07 | AP4 • DESARROLLO DE APLICACIONES MÓVILES (DAM)**  
> **Instituto de Educación Superior Privado Valle Grande**  
> **Estudiante:** Hugo Fernandez  
> **Proyecto:** Agro Pacayales S.A.C. (Valle de Cañete, Lima - Perú)  

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

---

## 📂 Estructura del Directorio

```
AgroPacayales/
├── README.md                      # Guía completa y credenciales
├── app.json                       # Configuración de Expo
├── package.json                   # Dependencias oficiales (Expo 57, Vector Icons)
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
    │   ├── home.tsx               # Pantalla 2: Principal / Catálogo & KPIs
    │   └── detail.tsx             # Pantalla 3: Ficha Técnica & Trazabilidad
    ├── components/
    │   ├── Header.tsx             # Barra superior con vector icons
    │   ├── MetricCard.tsx         # Tarjeta de KPIs con Flexbox y vector icons
    │   ├── CropCard.tsx           # Tarjeta de lote interactiva con Pressable
    │   └── InspectionModal.tsx    # Modal de registro de inspección técnica
    ├── constants/
    │   └── theme.ts               # Paleta de colores agronómica
    └── data/
        └── cropsData.ts           # Datos de cultivos del Valle de Cañete
```
