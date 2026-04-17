# 📊 RateProfe

Aplicación web para calificar maestros de forma anónima mediante reseñas y sistema de puntuación basado en estrellas.

---

## 🚀 Descripción

**RateProfe** es una aplicación web desarrollada con HTML, CSS y JavaScript puro que permite a los usuarios:

* Registrar maestros
* Escribir reseñas anónimas
* Calificar con estrellas (opcional)
* Visualizar el promedio de calificaciones
* Analizar la distribución de puntuaciones

El sistema calcula automáticamente la calificación promedio en función de las reseñas ingresadas.

---

## 🧠 Características principales

* ⭐ Sistema de calificación por comentarios (0 a 5 estrellas)
* 📊 Promedio automático de calificaciones
* 📈 Gráfica de distribución de estrellas
* 🔍 Búsqueda de maestros
* 🧾 Reseñas completamente anónimas
* 🗑️ Eliminación de maestros y comentarios
* 💾 Persistencia de datos con `localStorage`
* 📱 Diseño responsive (móvil y escritorio)

---

## 🛠️ Tecnologías utilizadas

* HTML5
* CSS3 (con variables y diseño responsive)
* JavaScript (Vanilla JS)
* LocalStorage (almacenamiento en el navegador)

---

## 📂 Estructura del proyecto

```
📁 project/
│
├── index.html        # Página principal (lista de maestros)
├── detail.html       # Página de detalles y reseñas
│
├── style.css         # Estilos globales
│
├── script.js         # Lógica principal
└── detail.js         # Lógica de detalle y comentarios
```

---

## ⚙️ Funcionamiento

* Los datos se almacenan localmente en el navegador mediante `localStorage`
* No se requiere backend ni base de datos externa
* Cada maestro tiene sus propias reseñas y calificaciones
* El promedio se recalcula automáticamente al agregar o eliminar reseñas

---

## 📱 Responsive Design

La aplicación está optimizada para:

* 📱 Dispositivos móviles
* 💻 Pantallas de escritorio
* 🔄 Cambios de orientación

---

## ⚠️ Limitaciones

* Los datos no se sincronizan entre dispositivos
* Al limpiar el navegador, se eliminan los registros
* No hay autenticación de usuarios (todo es anónimo)

---

## 💡 Posibles mejoras

* 🔐 Sistema de usuarios
* ☁️ Base de datos en la nube
* ⭐ Soporte para medias estrellas
* 📊 Filtros avanzados (mejor valorados, más reseñados)
* 📱 Convertir en PWA (app instalable)

---

## 📄 Licencia

Este proyecto es de uso educativo y puede ser modificado libremente.

---

## ✨ Autor

Desarrollado como proyecto escolar enfocado en el diseño de interfaces y manejo de datos en frontend.
