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

### Motor inteligente de análisis cromático facial para recomendación personalizada de maquillaje

Detección facial • Colorimetría científica • CIELAB • ITA • Recomendación inteligente

</div>

---

# Descripción

**Ami Beauty AI** es una plataforma de análisis facial desarrollada para el sector beauty-tech que utiliza visión computacional y colorimetría científica para identificar el tono y subtono de piel de una persona mediante una fotografía o captura en tiempo real.

El sistema realiza todo el procesamiento directamente en el navegador utilizando:

* MediaPipe Face Landmarker
* Colorimetría CIELAB
* Índice ITA (Individual Typology Angle)
* Algoritmos de corrección cromática
* Motor de recomendación por similitud de tonos

El objetivo es reducir la incertidumbre al momento de seleccionar productos cosméticos como:

* Correctores
* Bases
* Contornos
* Polvos
* Iluminadores

---

# Características principales

## Motor IA de análisis facial

| Característica        | Implementación               |
| --------------------- | ---------------------------- |
| Detección facial      | MediaPipe FaceLandmarker     |
| Landmarks faciales    | 478 puntos                   |
| Extracción ROI        | Mejillas izquierda y derecha |
| Corrección cromática  | Gray World                   |
| Conversión de color   | RGB → XYZ → LAB              |
| Clasificación de tono | ITA                          |
| Detección de subtono  | Análisis a*/b*               |
| Variantes cromáticas  | Claro · Exacto · Oscuro      |
| Recomendaciones       | Motor de scoring             |

---

## Ecommerce integrado

* Catálogo de productos con variantes cromáticas
* Matching automático por tono y subtono
* Sistema de favoritos
* Carrito persistente
* Búsqueda inteligente
* Filtros por categoría
* Productos recomendados dinámicamente

---
### Stack tecnológico
* Frontend         Next.js 16.2 + React 19 + TailwindCSS 4
* IA / Visión      MediaPipe Tasks-Vision 0.10.35 (FaceLandmarker)
* Colorimetría     CIELAB · ITA · Gray World (implementación propia)
* Estado           Context API + React Hooks
* Persistencia     LocalStorage (carrito, favoritos)
* Despliegue       Next.js Static Export (output: "export")

---
## Arquitectura de alto nivel
```text
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

# Flujo del análisis IA

## 1. Captura

El usuario puede utilizar:

* Cámara web
* Imagen cargada

Formatos soportados:

```text
JPG
PNG
WEBP
```

La imagen es convertida a un Canvas para procesamiento.

---

## 2. Detección facial

Se utiliza MediaPipe FaceLandmarker.

### Salida

```text
478 landmarks faciales
```

Estos landmarks permiten identificar zonas anatómicas específicas del rostro.

---

## 3. Extracción de regiones de piel

El análisis NO utiliza todo el rostro.

Se seleccionan únicamente zonas de piel con menor interferencia cosmética.

### Mejilla izquierda

```js
[111,116,117,118,119,120,121,122,123]
```

### Mejilla derecha

```js
[340,345,346,347,348,349,350,351,352]
```

Cada landmark genera una región de muestreo aproximada:

```text
15 x 15 píxeles
```

---

## 4. Filtrado de píxeles

Antes de calcular el color promedio se eliminan:

* Sombras profundas
* Reflejos excesivos
* Saturación extrema
* Píxeles contaminados

### Rango permitido

```text
30 < luminancia < 230
```

Esto reduce errores provocados por iluminación irregular.

---

## 5. Corrección cromática

### Gray World Algorithm

Las cámaras suelen introducir dominantes de color.

Ejemplos:

```text
Amarillo
Azul
Verde
```

Para compensarlo se aplica Gray World.

```text
RGB Original
      │
      ▼
Gray World
      │
      ▼
RGB Corregido
```

---

## 6. Obtención del color representativo

Después del filtrado se calcula el color promedio.

Ejemplo:

```json
{
  "r": 137,
  "g": 89,
  "b": 59
}
```

Hexadecimal:

```text
#89593B
```

Este color representa la muestra final utilizada para clasificación.

---

## 7. Conversión RGB → CIELAB

El espacio RGB no es perceptualmente uniforme.

Por ello el sistema transforma:

```text
RGB
 ↓
XYZ
 ↓
CIELAB
```

Obteniendo:

| Canal | Significado     |
| ----- | --------------- |
| L*    | Luminosidad     |
| a*    | Verde ↔ Rojo    |
| b*    | Azul ↔ Amarillo |

Ejemplo real:

```json
{
  "L": 42.42,
  "a": 16.41,
  "b": 25.35
}
```

---

## 8. Cálculo del índice ITA

El tono de piel se clasifica mediante el estándar dermatológico ITA.

Fórmula utilizada:

```text
ITA = atan((L* - 50) / b*) × (180 / π)
```

Ejemplo:

```json
{
  "ita": -16.6
}
```

---

## 9. Clasificación de tono

El resultado ITA es comparado contra una tabla de 11 categorías.

| ID              | Tono      | ITA             |
| --------------- | --------- | --------------- |
| porcelana       | > 55      | Muy claro       |
| claro           | 49–55     | Claro           |
| claro-medio     | 41–48     | Claro medio     |
| medio-claro     | 34–40     | Medio claro     |
| medio           | 28–33     | Medio           |
| medio-profundo  | 20–27     | Medio profundo  |
| trigueño        | 10–19     | Trigueño        |
| moreno          | 0–9       | Moreno          |
| oscuro          | -15 a -1  | Oscuro          |
| oscuro-profundo | -30 a -16 | Oscuro profundo |
| ebano           | < -30     | Ébano           |

---

## 10. Detección de subtono

El sistema analiza la relación entre:

```text
a*
b*
```

para determinar:

| Subtono | Característica    |
| ------- | ----------------- |
| Warm    | Amarillo / Dorado |
| Neutral | Balanceado        |
| Cool    | Rosado / Azulado  |

Ejemplo:

```json
{
  "subtone": "warm"
}
```

---

## 11. Generación de variantes cromáticas

Cada tono genera tres referencias visuales.

```text
Claro
Exacto
Oscuro
```

Ejemplo:

```text
#a27254
#89593b
#704022
```

Esto permite al usuario comparar visualmente la clasificación obtenida.

---

# Motor de recomendaciones

Una vez identificado el tono y subtono se activa el sistema de matching.

---

## Equivalencias de tono

Ejemplo:

```text
oscuro-profundo
        │
        ├── moreno-calido
        └── oscuro-calido
```

Estas equivalencias permiten recomendar productos compatibles aunque no exista coincidencia exacta.

---

## Sistema de puntuación

### Coincidencia exacta

```text
+10 puntos
```

### Coincidencia equivalente

```text
+10 puntos
```

### Mismo grupo cromático

```text
+4 puntos
```

### Coincidencia de subtono

```text
+5 puntos
```

---

## Grupos cromáticos

```text
LIGHT
├─ porcelana
├─ claro
└─ claro-medio

MEDIUM
├─ medio-claro
├─ medio
├─ medio-profundo
└─ trigueño

DARK
├─ moreno
├─ oscuro
├─ oscuro-profundo
└─ ebano
```

---

## Selección de productos

Actualmente el sistema prioriza:

```text
Correctores
```

porque son los productos más sensibles al tono real de piel.

Posteriormente se incluyen:

* Bases
* Contornos
* Productos complementarios

---

## Resultado final

```json
{
  "matched": [],
  "interest": []
}
```

### Matched

Productos con mayor compatibilidad cromática.

### Interest

Productos adicionales relacionados con el perfil detectado.

---
## Instalación
* Prerequisitos
* Node.js >= 20.9.0
* pnpm >= 8.0
* Pasos
# 1. Clonar repositorio
* git clone https://github.com/usuario/ami-beauty-ai.git
* cd ami-beauty-ai

# 2. Instalar dependencias
* pnpm install

# 3. Ejecutar en desarrollo
* pnpm dev
* La aplicación estará disponible en http://localhost:3000.

## Variables de entorno
* Crea un archivo .env.local en la raíz del proyecto:

* NEXT_PUBLIC_APP_NAME=Ami Beauty AI
* Build de producción
* pnpm build
```text
El sitio se exporta como HTML estático (output: "export") en la carpeta /out, listo para servirse en cualquier CDN o servidor estático.
```
---
# Privacidad

Todo el análisis ocurre localmente.

✅ No se almacenan fotografías

✅ No se envían imágenes a servidores

✅ No existe reconocimiento de identidad

✅ Procesamiento 100% client-side

---

# Rendimiento

| Métrica               | Valor      |
| --------------------- | ---------- |
| Detección facial      | ~15-30 ms  |
| Conversión LAB        | < 1 ms     |
| Cálculo ITA           | < 1 ms     |
| Recomendaciones       | < 5 ms     |
| Tiempo promedio total | 100-300 ms |

---

# Roadmap

### IA

* TensorFlow.js
* Clasificación de tipo de piel
* Detección de acné
* Detección de manchas
* Análisis de hidratación

### Ecommerce

* Pasarela de pagos
* Historial de análisis
* Dashboard administrativo

### Usuario

* Perfil personalizado
* Seguimiento histórico de tonos
* Recomendaciones evolutivas

---

# Autor

**Estevan Alejandro Cabarcas Urieles**

Desarrollador Full Stack especializado en:

* Next.js
* React
* Node.js
* Computer Vision
* Ecommerce
* Inteligencia Artificial aplicada a retail

---


---
<div align="center">

### Ami Beauty AI

Belleza + Ciencia + Inteligencia Artificia
</div>
los derechos reservados © 2026 **Ami Beauty**.
