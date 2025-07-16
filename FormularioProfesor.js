/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
document.addEventListener("DOMContentLoaded", () => {
    // Rellenar automáticamente el nombre del profesor desde la URL
    const params = new URLSearchParams(window.location.search);
    const nombre = params.get("nombre");
    if (nombre) {
        document.getElementById("nombreProfesor").value = nombre.replace(/\+/g, " ");
    }

    // Capturar solo el formulario de contratación
    const form = document.getElementById("formSolicitud");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault(); 
            alert("¡Solicitud enviada correctamente! Nos contactaremos contigo pronto.");
            window.location.href = "AprenderATocar.html";
        });
    }
});

// BÚSQUEDA FUNCIONAL
function redirigir() {
    const palabra = document.getElementById("buscador").value.toLowerCase().trim();

    // Diccionario de redirección basado en palabras clave
    if (palabra.includes("guitarra")) {
        window.location.href = "GUITARRAS.html";
    } else if (palabra.includes("bajo")) {
        window.location.href = "BAJOS.html";
    } else if (palabra.includes("batería") || palabra.includes("bateria")) {
        window.location.href = "BATERIA.html";
    } else if (palabra.includes("teclado") || palabra.includes("piano")) {
        window.location.href = "PIANOS.html";
    } else if (palabra.includes("accesorio")) {
        window.location.href = "accesorios.html";
    } else if (palabra.includes("inicio") || palabra.includes("principal")) {
        window.location.href = "inicio.html";
    } else if (palabra.includes("carrito") || palabra.includes("compras")) {
        window.location.href = "carrito.html";
    } else if (palabra.includes("sesion") || palabra.includes("iniciar")) {
        window.location.href = "INICIAR SECCION.html";
    } else if (palabra.includes("soporte") || palabra.includes("contacto")) {
        window.location.href = "soporte.html";
    } else if (palabra.includes("nosotros")) {
        window.location.href = "sobre nosotros.html";
    } else if (palabra.includes("trabaja")) {
        window.location.href = "trabaja con nosostros.html";
    } else if (palabra.includes("profesor") || palabra.includes("aprender")) {
        window.location.href = "AprenderATocar.html";
    } else {
        alert("No se encontraron resultados para: " + palabra);
    }
}


