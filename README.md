# 💄 Ami Beauty AI

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/TailwindCSS-4-38BDF8?style=for-the-badge&logo=tailwindcss)
![AI](https://img.shields.io/badge/AI-Skin%20Analysis-FFB84D?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)

### Plataforma inteligente de análisis facial y recomendación de maquillaje mediante visión computacional.

</div>

---

# ✨ Descripción

**Ami Beauty AI** es una plataforma especializada en maquillaje y cuidado de la piel que utiliza **Inteligencia Artificial**, **Visión Computacional** y análisis cromático avanzado para identificar el tono y subtono de piel del usuario.

A partir de una fotografía o captura en tiempo real desde la cámara, el sistema realiza un análisis facial utilizando:

- Face Detection
- MediaPipe Face Mesh
- Conversión RGB → CIELAB
- Clasificación ITA (Individual Typology Angle)
- Detección de subtonos
- Sistema de recomendación inteligente de productos

El objetivo es ayudar a los usuarios a encontrar bases, correctores y productos compatibles con sus características faciales de forma rápida y precisa.

---

# 🚀 Características Principales

## 🤖 Análisis Facial Inteligente

- Detección automática de rostro
- Extracción de zonas válidas de piel
- Muestreo en mejillas mediante landmarks
- Corrección cromática
- Conversión RGB → LAB
- Clasificación ITA
- Detección de subtono:
  - Warm
  - Cool
  - Neutral

---

## 🎨 Sistema Cromático

- Tarjeta cromática personalizada Ami Beauty
- Calibración de color
- Corrección de iluminación
- Gray World Algorithm
- Suavizado temporal de muestras RGB
- Generación dinámica de variantes de tono

---

## 💄 Recomendación de Productos

El motor de recomendación cruza:

- Tono detectado
- Subtono detectado
- Grupo tonal
- Variantes compatibles

Generando:

### Productos recomendados

Productos con máxima compatibilidad.

### Productos de interés

Productos relacionados que podrían funcionar para el usuario.

---

## 🛍 Ecommerce Integrado

### Funcionalidades

- Catálogo de productos
- Categorías
- Subcategorías
- Búsqueda avanzada
- Filtros dinámicos
- Favoritos
- Carrito persistente
- Variantes de color
- Sistema de recomendaciones IA

---

## 📷 Métodos de Captura

### Cámara

Análisis en tiempo real utilizando:

- MediaDevices API
- Face Detection
- Captura directa

### Subida de Imagen

Permite:

- JPG
- JPEG
- PNG
- WEBP

---

# 🏗 Arquitectura del Proyecto

```text
src/
│
├── app/
│   ├── analisis/
│   ├── buscar/
│   ├── category/
│   ├── favoritos/
│   ├── producto/
│   └── carrito/
│
├── components/
│   ├── ai/
│   ├── product/
│   ├── ui/
│   └── layout/
│
├── context/
│   └── StoreContext.jsx
│
├── hooks/
│   └── useSkinAnalysis.js
│
├── lib/
│   ├── faceDetector.js
│   ├── ita.js
│   ├── cheeks.js
│   ├── colorCorrection.js
│   ├── preprocess.js
│   ├── recommendProducts.js
│   └── toneVariants.js
│
├── data/
│   ├── products.json
│   ├── skinTones.js
│   └── categories.js
│
└── public/
    └── img/
```

---

# 🧠 Pipeline de IA

## 1. Captura

```text
Cámara / Imagen
```

↓

## 2. Detección Facial

```text
MediaPipe Face Landmarker
```

↓

## 3. Extracción ROI

```text
Región de piel válida
(Mejillas)
```

↓

## 4. Corrección

```text
Gray World
Calibración Cromática
```

↓

## 5. Conversión

```text
RGB → CIELAB
```

↓

## 6. Clasificación

```text
ITA
```

↓

## 7. Identificación

```text
Tono
Subtono
```

↓

## 8. Recomendación

```text
Productos compatibles
```

---

# 🎨 Sistema de Tonos

El sistema soporta múltiples rangos:

| Tono | Clasificación |
|--------|------------|
| Porcelana | Muy claro |
| Claro | Claro |
| Claro Dorado | Medio Claro |
| Medio Rosado | Medio |
| Moreno Cálido | Moreno |
| Oscuro | Oscuro |

---

# 🛒 Gestión de Carrito

Implementado mediante Context API.

## Características

- Persistencia LocalStorage
- Incremento automático de cantidad
- Variantes de producto
- Cálculo de total
- Control de stock futuro
- Sidebar dinámico

---

# ❤️ Sistema de Favoritos

Permite:

- Guardar productos
- Persistencia local
- Visualización rápida
- Sincronización con catálogo

---

# 🔎 Motor de Búsqueda

Búsqueda por:

- Nombre
- Marca
- Categoría
- Subcategoría
- Descripción
- Grupo tonal

---

# 📱 Responsive Design

Diseñado para:

- Desktop
- Laptop
- Tablet
- Mobile

---

# ⚡ Tecnologías Utilizadas

## Frontend

- Next.js 16
- React 19
- TailwindCSS 4

## Inteligencia Artificial

- MediaPipe Tasks Vision
- Face Landmarker
- CIELAB
- ITA

## Estado

- Context API
- React Hooks

## Persistencia

- LocalStorage

---

# 📦 Instalación

## Clonar repositorio

```bash
git clone https://github.com/usuario/ami-beauty-ai.git
```

## Entrar al proyecto

```bash
cd ami-beauty-ai
```

## Instalar dependencias

```bash
pnpm install
```

## Ejecutar

```bash
pnpm dev
```

Aplicación disponible en:

```text
http://localhost:3000
```

---

# 🌐 Variables de Entorno

Crear:

```env
.env.local
```

Ejemplo:

```env
NEXT_PUBLIC_APP_NAME=Ami Beauty AI
```

---

# 📈 Futuras Mejoras

## IA

- TensorFlow.js
- Clasificación de tipo de piel
- Detección de acné
- Detección de manchas
- Análisis de hidratación

## Ecommerce

- Pasarela de pagos
- Inventario
- Dashboard administrativo
- CRM
- Historial de análisis

## Usuario

- Autenticación
- Perfil
- Historial de tonos
- Recomendaciones personalizadas

---

# 👨‍💻 Autor

**Estevan Alejandro Cabarcas Urieles**

Desarrollador Web Full Stack

Especializado en:

- Next.js
- React
- Tailwind
- Node.js
- IA aplicada a Ecommerce
- Automatización de procesos

---

# 📄 Licencia

Este proyecto es de uso privado y pertenece a **Ami Beauty**.

Todos los derechos reservados © 2026.

---

<div align="center">

### 💄 Belleza + Tecnología + Inteligencia Artificial

**Ami Beauty AI**

</div>