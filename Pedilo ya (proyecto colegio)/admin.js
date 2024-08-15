const pedidos = [
    {
        id: 240,
        cliente: 'Nombre y apellido',
        productos: 'Sanguche de Milanesa',
        metodoPago: 'Mercado Pago',
        total: 3000,
        estado: 'Pendiente'
    },
    {
        id: 239,
        cliente: 'Nombre y apellido',
        productos: 'Pebete',
        metodoPago: 'Efectivo',
        total: 1500,
        estado: 'Aceptado'
    },
    {
        id: 238,
        cliente: 'Nombre y apellido',
        productos: 'Medialuna de JyQ',
        metodoPago: 'Mercado Pago',
        total: 500,
        estado: 'Aceptado'
    },
    {
        id: 237,
        cliente: 'Nombre y apellido',
        productos: 'Sanguche de Milanesa',
        metodoPago: 'Mercado Pago',
        total: 3000,
        estado: 'Rechazado'
    },
    {
        id: 236,
        cliente: 'Nombre y apellido',
        productos: 'Gaseosa 500ml',
        metodoPago: 'Efectivo',
        total: 300,
        estado: 'Pendiente'
    }
];

function cargarPedidos() {
    const tablaPedidos = document.querySelector('#tabla-pedidos tbody');
    tablaPedidos.innerHTML = '';

    pedidos.forEach(pedido => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${pedido.id}</td>
            <td>${pedido.cliente}</td>
            <td>${pedido.productos}</td>
            <td>${pedido.metodoPago}</td>
            <td class="estado">${pedido.estado}</td>
            <td>
                <button class="aceptar">Aceptar</button>
                <button class="rechazar">Rechazar</button>
                <button class="detalles">Detalles</button>
                <button class="notificar">Notificar</button>
            </td>
        `;

        fila.querySelector('.aceptar').addEventListener('click', function() {
            actualizarEstadoPedido(pedido.id, 'Aceptado');
            marcarComoGrisado(this);
        });

        fila.querySelector('.rechazar').addEventListener('click', function() {
            actualizarEstadoPedido(pedido.id, 'Rechazado');
            marcarComoGrisado(this);
        });

        fila.querySelector('.detalles').addEventListener('click', function() {
            const pedidoId = this.parentNode.parentNode.dataset.pedidoId;
            const pedido = pedidos.find(p => p.id === parseInt(pedidoId));
            if (pedido) {
                // Muestra la ventana emergente
                document.getElementById('ventana-emergente').style.display = 'flex';
                // Rellena los detalles del pedido
                document.getElementById('detalle-id').querySelector('span').textContent = pedido.id;
                document.getElementById('detalle-cliente').querySelector('span').textContent = pedido.cliente;
                document.getElementById('detalle-productos').querySelector('span').textContent = pedido.productos;
                document.getElementById('detalle-metodo-pago').querySelector('span').textContent = pedido.metodoPago;
            }
        });

        fila.querySelector('.notificar').addEventListener('click', function() {
            alert(`Notificación enviada al cliente sobre el pedido ${pedido.id}`);
        });

        tablaPedidos.appendChild(fila);
    });
}

function actualizarEstadoPedido(id, nuevoEstado) {
    const pedido = pedidos.find(p => p.id === id);
    if (pedido) {
        pedido.estado = nuevoEstado;
        cargarPedidos();
    }
}

function marcarComoGrisado(boton) {
    boton.classList.add('grisado');
    boton.disabled = true; // Deshabilita el botón para evitar futuros clics
}

// Agrega un evento click al botón "cerrar ventana"
document.querySelector('.btn-cerrar-ventana').addEventListener('click', function() {
    document.getElementById('ventana-emergente').style.display = 'none';
});

// Cargar los pedidos al iniciar
cargarPedidos();