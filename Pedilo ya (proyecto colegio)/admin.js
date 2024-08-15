// admin.js

const pedidos = [
    {
        id: 1,
        cliente: 'Cliente 1',
        catidad: '1',
        productos: 'Hamburguesa doble con queso',
        total: 3000,
        estado: 'Pendiente'
    },
    // Más pedidos pueden agregarse aquí
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
        });

        fila.querySelector('.rechazar').addEventListener('click', function() {
            actualizarEstadoPedido(pedido.id, 'Rechazado');
        });

        fila.querySelector('.detalles').addEventListener('click', function() {
            alert(`Numero de pedido: ${pedido.id}
            Numero de cliente: ${pedido.cliente}
            Cantidad: ${pedido.catidad}
            Productos: ${pedido.productos}
            Precio: $ ${pedido.total}`);
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

cargarPedidos();
