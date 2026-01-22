# AplicacionWebInteractiva_JQuery_Ajax_Animaciones_BEM
# 🔐 Login con Transición Clip-Path & Dashboard AJAX

Este proyecto es una prueba de concepto (POC) que implementa una transición fluida entre una pantalla de Login y un Dashboard de gestión de productos, utilizando **CSS Clip-Path** y manipulación del DOM, preparada para integrar con un backend PHP.

## 🚀 Características

* **Animación CSS Pura:** Uso de `clip-path: circle()` para un efecto de "revelado" suave al loguearse.
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
El contenedor del login cubre la pantalla inicialmente. Al añadir la clase `.slide-out`, el círculo se cierra.

```css
#login-view {
    /* Estado inicial: Círculo cubriendo toda la pantalla */
    clip-path: circle(150% at 50% 50%);
    transition: clip-path 1.5s cubic-bezier(0.77, 0, 0.175, 1);
}

#login-view.slide-out {
    /* Estado final: El círculo desaparece */
    clip-path: circle(0% at 50% 50%);
}
