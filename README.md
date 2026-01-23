# AplicacionWebInteractiva_JQuery_Ajax_Animaciones_BEM
# 🔐 Login con Transición Clip-Path & Dashboard AJAX

Este proyecto es una prueba de concepto (POC) que implementa una transición fluida entre una pantalla de Login y un Dashboard de gestión de productos, utilizando **CSS Clip-Path** y manipulación del DOM, preparada para integrar con un backend PHP.

## 🚀 Características

* **Animación CSS Pura:** Uso de `clip-path: circle()` para un efecto de "revelado" suave al loguearse.
* **Fondo Ondulado:** Uso de `clip-path: circle()` para crear un semicírculo atractivo desde arriba sin imágenes pesadas.
* **Single Page Feel:** No recarga la página al pasar del login a la tabla (SPA simulada).
* **Interfaz:** Diseño limpio utilizando **Bootstrap 5**.
* **Backend Ready:** Estructura preparada para recibir JSON de un backend PHP/MySQL.

## 🛠️ Instalación y Uso

1. Clona este repositorio o descarga los archivos.
2. Asegúrate de tener un servidor local (Apache/XAMPP/Laragon) si vas a conectar el PHP.
3. Abre el archivo `index.html` en tu navegador.

## 📄 Estructura del Código

El núcleo de la animación reside en la manipulación de la propiedad `clip-path`.

### CSS (La Magia)
El contenedor del login cubre la pantalla inicialmente.

Para el fondo ondulado, se utiliza un div vacío con `clip-path: circle(50% at 50% 0%)` para crear un semicírculo en la parte superior que añade dinamismo visual sin necesidad de imágenes.
