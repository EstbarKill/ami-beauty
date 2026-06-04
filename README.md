# Ami Beauty AI

<div align="center">

<img src="https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js" />
<img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" />
<img src="https://img.shields.io/badge/TailwindCSS-4-38BDF8?style=flat-square&logo=tailwindcss" />
<img src="https://img.shields.io/badge/MediaPipe-FaceLandmarker-FF6B35?style=flat-square" />
<img src="https://img.shields.io/badge/CIELAB%20%2B%20ITA-Colorimetría-9B59B6?style=flat-square" />
<img src="https://img.shields.io/badge/Estado-Producción-27AE60?style=flat-square" />

**Plataforma inteligente de análisis facial y recomendación de maquillaje mediante visión computacional.**

[Demo en vivo](#) · [Análisis IA](#flujo-del-análisis-ia) · [Instalación](#instalación) · [Arquitectura](#arquitectura)

</div>

---

## Descripción

**Ami Beauty AI** es una plataforma especializada en maquillaje y cuidado de la piel que combina visión computacional, colorimetría científica y un motor de recomendación inteligente para identificar el tono y subtono de piel de cada usuario a partir de una fotografía.

El sistema detecta el rostro, extrae regiones de interés en las mejillas, aplica corrección cromática y clasifica el tono mediante el índice **ITA (Individual Typology Angle)** en el espacio de color **CIELAB**, devolviendo productos compatibles con las características detectadas.

> _"Ami es esa amiga. La que te dice la verdad aunque no sea lo que querías escuchar."_

---

## Características principales

### Motor de análisis IA

| Capacidad | Tecnología |
|-----------|-----------|
| Detección facial | MediaPipe FaceLandmarker |
| Extracción de ROI | Landmarks de mejillas (L/R) |
| Corrección de color | Gray World Algorithm |
| Conversión de color | RGB → XYZ → CIELAB |
| Clasificación de tono | Índice ITA (11 rangos) |
| Detección de subtono | Ratio a*/b* (Warm / Cool / Neutral) |
| Suavizado temporal | Historial rolling de 5 frames |

### Ecommerce integrado

- Catálogo de más de 39 productos con variantes de tono
- Búsqueda en tiempo real por nombre, marca, categoría y subtono
- Filtrado por categoría y subcategoría
- Carrito persistente con control de variantes
- Sistema de favoritos con persistencia local
- Sidebar de carrito dinámico

### Contenido editorial

- 6 artículos de consejos de belleza con productos relacionados
- Sección de reseñas verificadas
- Newsletter con validación de email

---

## Stack tecnológico

```
Frontend         Next.js 16.2 + React 19 + TailwindCSS 4
IA / Visión      MediaPipe Tasks-Vision 0.10.35 (FaceLandmarker)
Colorimetría     CIELAB · ITA · Gray World (implementación propia)
Estado           Context API + React Hooks
Persistencia     LocalStorage (carrito, favoritos)
Despliegue       Next.js Static Export (output: "export")
```

---

## Arquitectura

```
src/
├── app/
│   ├── analisis/          # Página principal del análisis IA
│   ├── buscar/            # Motor de búsqueda con SSR
│   ├── category/[slug]/   # Páginas de categoría con filtros
│   ├── favoritos/         # Productos guardados
│   ├── product/[slug]/    # Detalle de producto
│   ├── tips/[slug]/       # Artículos de belleza
│   └── layout.js          # Layout global con providers
│
├── components/
│   ├── ai/
│   │   ├── SkinAnalyzer.jsx      # Orquestador principal del análisis
│   │   ├── ChromaticPalette.jsx  # Guía cromática visual
│   │   └── ChromaticGuide.jsx    # Overlay de encuadre
│   ├── home/                     # Secciones de la landing
│   ├── layout/                   # Header, Navbar, Footer
│   ├── product/                  # ProductCard, ProductGrid
│   └── ui/                       # AnalysisModal, CartSidebar, Toast
│
├── context/
│   └── StoreContext.jsx    # Estado global (carrito, favoritos, toast)
│
├── hooks/
│   └── useSkinAnalysis.js  # Hook principal del pipeline IA
│
├── lib/
│   ├── faceDetector.js         # Integración MediaPipe
│   ├── ita.js                  # Motor ITA + orquestación del análisis
│   ├── cheeks.js               # Extracción de píxeles de mejillas
│   ├── colorUtils.js           # RGB → XYZ → CIELAB
│   ├── colorCorrection.js      # Gray World Algorithm
│   ├── preprocess.js           # Preprocesamiento de imagen
│   ├── toneVariants.js         # Generación de variantes de tono
│   └── recommendProducts.js    # Motor de recomendación
│
└── data/
    ├── products.json       # Catálogo (39 productos, 200+ variantes)
    ├── skinTones.js        # 11 tonos + 3 subtonos + funciones ITA
    ├── categories.js       # Árbol de categorías
    └── tips.js             # Artículos de contenido
```

---

## Flujo del análisis IA

```
1. CAPTURA
   Cámara (MediaDevices API) o imagen subida (JPG/PNG/WEBP)
         ↓
2. PREPROCESAMIENTO
   Ajuste de contraste y saturación (canvas filter)
         ↓
3. DETECCIÓN FACIAL
   MediaPipe FaceLandmarker → 478 landmarks
         ↓
4. EXTRACCIÓN DE ROI
   Puntos de mejilla izquierda [111,116–123] + derecha [340,345–352]
   Muestreo en parches de 15×15px por punto
   Filtrado por luminancia (30–230) y saturación extrema
         ↓
5. SUAVIZADO TEMPORAL
   Promedio ponderado de los últimos 5 frames (rolling average)
         ↓
6. CONVERSIÓN DE COLOR
   RGB → XYZ (iluminante D65) → CIELAB
   Obtención de L*, a*, b*
         ↓
7. CÁLCULO ITA
   ITA = atan((L* − 50) / b*) × (180/π)
         ↓
8. CLASIFICACIÓN DE TONO
   11 categorías (Porcelana → Ébano) según rango ITA
         ↓
9. DETECCIÓN DE SUBTONO
   Ratio a*/b* → Warm (b* ≥ 8) / Cool (b* ≤ −8) / Neutral
         ↓
10. RECOMENDACIÓN
    Cruce toneId + subtone → scoring por producto y variante
    → Matched (score ≥ 8) + Interest (score ≥ 5)
```

---

## Sistema de tonos

| ID | Tono | Rango ITA | Fitzpatrick |
|----|------|-----------|-------------|
| porcelana | Porcelana | > 55 | I |
| claro | Claro | 49–55 | I–II |
| claro-medio | Claro Medio | 41–48 | II |
| medio-claro | Medio Claro | 34–40 | II–III |
| medio | Medio | 28–33 | III |
| medio-profundo | Medio Profundo | 20–27 | III–IV |
| trigueño | Trigueño | 10–19 | IV |
| moreno | Moreno | 0–9 | IV–V |
| oscuro | Oscuro | −15 a −1 | V |
| oscuro-profundo | Oscuro Profundo | −30 a −16 | V–VI |
| ebano | Ébano | < −30 | VI |

**Subtonos detectados:** Cálido (Warm) · Neutro (Neutral) · Frío (Cool)

---

## Catálogo de productos

| Categoría | Subcategorías | Productos |
|-----------|--------------|-----------|
| Rostro | Bases, Correctores, Polvos, Contorno, Rubor, Iluminadores | 23 |
| Ojos | Paletas, Delineadores | 4 |
| Labios | Gloss, Hidratantes | 2 |
| Skincare | Limpiadores, Serums, Hidratantes, Cremas | 6 |
| Cejas | Lápiz, Gel, Pomadas | 4 |

**Marcas:** Majikal Beauty · Anik · Lula · Montoc · Purpure · OG · Atenea · Ame

---

## Instalación

### Prerequisitos

- Node.js `>= 20.9.0`
- pnpm `>= 8.0`

### Pasos

```bash
# 1. Clonar repositorio
git clone https://github.com/usuario/ami-beauty-ai.git
cd ami-beauty-ai

# 2. Instalar dependencias
pnpm install

# 3. Ejecutar en desarrollo
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`.

### Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_APP_NAME=Ami Beauty AI
```

### Build de producción

```bash
pnpm build
```

El sitio se exporta como HTML estático (`output: "export"`) en la carpeta `/out`, listo para servirse en cualquier CDN o servidor estático.

---

## Consideraciones técnicas

**Privacidad:** Todo el análisis se ejecuta en el navegador del usuario. Ningún dato de imagen ni resultado se envía a un servidor externo.

**Compatibilidad de cámara:** Requiere contexto seguro (HTTPS o localhost). El acceso a `MediaDevices.getUserMedia` no está disponible en HTTP en producción.

**Modelos MediaPipe:** El modelo `face_landmarker.task` se descarga en tiempo de ejecución desde el CDN de Google. La primera carga puede tomar 2–5 segundos según la conexión.

**Condiciones recomendadas para el análisis:**
- Luz blanca o natural difusa
- Sin filtros ni alteraciones de color en la cámara
- Rostro centrado y sin sombras pronunciadas
- Tarjeta cromática Ami Beauty visible en el encuadre (mejora la calibración)

---

## Roadmap

**IA**
- Integración de TensorFlow.js para clasificación de tipo de piel
- Detección de acné, manchas e hidratación

**Ecommerce**
- Pasarela de pagos
- Dashboard administrativo con gestión de inventario
- Historial de análisis por usuario

**Usuario**
- Autenticación y perfil personalizado
- Historial de tonos y evolución temporal

---

## Autor

**Estevan Alejandro Cabarcas Urieles**  
Desarrollador Web Full Stack — Barranquilla, Colombia  
Especializado en Next.js · React · Node.js · IA aplicada a Ecommerce

---

## Licencia

Uso privado. Todos los derechos reservados © 2026 **Ami Beauty**.

---

<div align="center">
<sub>Ami Beauty AI — Belleza + Tecnología + Inteligencia Artificial</sub>
</div>
