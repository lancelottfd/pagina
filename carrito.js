/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


let carrito = {
    items: [],
    subtotal: 0,
    descuento: 0,
    total: 0
};

// Inicializar el carrito
document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito();
    actualizarCarrito();
    
    // Eventos para botones dinamicos
    document.querySelector('.items-carrito').addEventListener('click', manejarEventosCarrito);
});

// Cargar carrito 
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        calcularTotales();
    }
    actualizarCarrito();
    actualizarContadorCarrito();
}
// Guardar carrito 
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para agregar productos desde cualquier pagina 
function agregarAlCarrito(producto) {
    const itemExistente = carrito.items.find(item => item.id === producto.id);
    
    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.items.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });
    }
    
    calcularTotales();
    guardarCarrito();
    actualizarCarrito();
    actualizarContadorCarrito(); 
    mostrarNotificacion(`${producto.nombre} agregado al carrito`);
}

// Calcular subtotal, descuento y total
function calcularTotales() {
    carrito.subtotal = carrito.items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    
    const itemsConDescuento = carrito.items.slice(0, 2);
    carrito.descuento = itemsConDescuento.reduce((total, item) => {
        return total + (item.precio * item.cantidad * 0.2);
    }, 0);
    
    carrito.total = carrito.subtotal - carrito.descuento;
}

function actualizarCarrito() {
    const container = document.querySelector('.carrito-container');
    const itemsContainer = document.querySelector('.items-carrito');
    const vacioContainer = document.querySelector('.carrito-vacio');
    const resumenContainer = document.querySelector('.resumen-carrito');
 
    itemsContainer.innerHTML = '';
    
    // Agregar items al carrito
    carrito.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item-carrito';
        itemElement.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" class="item-imagen">
            <div class="item-info">
                <div class="item-nombre">${item.nombre}</div>
                <div class="item-precio">$${item.precio.toFixed(2)}</div>
            </div>
            <div class="item-cantidad">
                <button class="btn-cantidad restar" data-id="${item.id}">-</button>
                <span class="item-cantidad-valor">${item.cantidad}</span>
                <button class="btn-cantidad sumar" data-id="${item.id}">+</button>
            </div>
            <button class="btn-eliminar" data-id="${item.id}">Eliminar</button>
        `;
        itemsContainer.appendChild(itemElement);
    });
    
    document.querySelector('.subtotal-precio').textContent = `$${carrito.subtotal.toFixed(2)}`;
    document.querySelector('.descuento-monto').textContent = `-$${carrito.descuento.toFixed(2)}`;
    document.querySelector('.total-precio').textContent = `$${carrito.total.toFixed(2)}`;
    
    // Mostrar/ocultar elementos según haya objetos
    if (carrito.items.length > 0) {
        container.classList.add('carrito-con-items');
    } else {
        container.classList.remove('carrito-con-items');
    }
}

// Manejar eventos de los botones del carrito
function manejarEventosCarrito(e) {
    if (e.target.classList.contains('sumar')) {
        const id = e.target.getAttribute('data-id');
        cambiarCantidad(id, 1);
    } else if (e.target.classList.contains('restar')) {
        const id = e.target.getAttribute('data-id');
        cambiarCantidad(id, -1);
    } else if (e.target.classList.contains('btn-eliminar')) {
        const id = e.target.getAttribute('data-id');
        eliminarItem(id);
    }
}

// cambiar cantidad de un prodcuto
function cambiarCantidad(id, cambio) {
    const item = carrito.items.find(item => item.id === id);
    if (item) {
        item.cantidad += cambio;
        
        if (item.cantidad <= 0) {
            carrito.items = carrito.items.filter(item => item.id !== id);
        }
        
        calcularTotales();
        guardarCarrito();
        actualizarCarrito();
        actualizarContadorCarrito(); 
    }
}

// eliminar producto del carrito
function eliminarItem(id) {
    carrito.items = carrito.items.filter(item => item.id !== id);
    calcularTotales();
    guardarCarrito();
    actualizarCarrito();
    actualizarContadorCarrito(); 
}

// Mostrar notificación
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}
function actualizarContadorCarrito() {
    const contadores = document.querySelectorAll('.contador-carrito');
    
    const totalItems = carrito.items.reduce((total, item) => {
        return total + item.cantidad;
    }, 0);
    
    contadores.forEach(contador => {
        contador.textContent = totalItems;
        if (totalItems > 0) {
            contador.classList.add('visible');
        } else {
            contador.classList.remove('visible');
        }
    });
}