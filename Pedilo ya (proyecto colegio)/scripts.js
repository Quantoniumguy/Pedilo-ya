document.getElementById('imagen-producto').addEventListener('change', function(event) {
    const fileInput = event.target;
    const imagePlaceholder = document.querySelector('.imagen-placeholder');
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePlaceholder.style.backgroundImage = `url(${e.target.result})`;
            imagePlaceholder.textContent = '';
        }
        reader.readAsDataURL(file);
    } else {
        imagePlaceholder.style.backgroundImage = '';
        imagePlaceholder.textContent = '+';
    }
});



let editando = false;
let productoEditando = null;

function guardarProducto() {
    const fecha = document.getElementById('fecha').value;
    const categoria = document.getElementById('categoria').value;
    const cantidad = document.getElementById('cantidad').value;
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const descripcion = document.getElementById('descripcion').value;
    const imagenProducto = document.getElementById('imagen-producto').files[0];
    
    if (!fecha || !categoria || !cantidad || !nombre || !precio || !descripcion || (!imagenProducto && !editando)) { 
        alert('Por favor, complete todos los campos.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        if (editando && productoEditando) {
            // Actualizar producto existente
            const imagePlaceholder = productoEditando.querySelector('.item-izquierda .imagen-placeholder');
            imagePlaceholder.style.backgroundImage = `url(${e.target.result})`;
            imagePlaceholder.textContent = '';

            productoEditando.querySelector('.item-izquierda p').textContent = imagenProducto ? imagenProducto.name : ''; // Actualizar nombre de la imagen

            productoEditando.querySelector('.item-derecha p:nth-child(1)').innerHTML = `<strong>Fecha:</strong> ${fecha}`;
            productoEditando.querySelector('.item-derecha p:nth-child(2)').innerHTML = `<strong>Categoria:</strong> ${categoria}`;
            productoEditando.querySelector('.item-derecha p:nth-child(3)').innerHTML = `<strong>Cantidad:</strong> ${cantidad} Unidades`;
            productoEditando.querySelector('.item-derecha p:nth-child(4)').innerHTML = `<strong>Nombre:</strong> ${nombre}`;
            productoEditando.querySelector('.item-derecha p:nth-child(5)').innerHTML = `<strong>Precio: </strong> ${precio}`;
            productoEditando.querySelector('.item-derecha p:nth-child(6)').innerHTML = `<strong>Descripcion:</strong> ${descripcion}`;
        } else {
            // Crear nuevo producto
            const productoHTML = `
                <div class="item-producto">
                    <div class="item-izquierda">
                        <div class="imagen-placeholder" style="background-image: url(${e.target.result})">${imagenProducto ? '' : '+'}</div>
                        <p>${imagenProducto ? imagenProducto.name : ''}</p>
                    </div>
                    <div class="item-derecha">
                        <p><strong>Fecha:</strong> ${fecha}</p>
                        <p><strong>Categoría:</strong> ${categoria}</p>
                        <p><strong>Cantidad:</strong> ${cantidad} Unidades</p>
                        <p><strong>Nombre:</strong> ${nombre}</p>
                        <p><strong>Precio: $</strong> ${precio} Pesos</p>
                        <p><strong>Descripción:</strong> ${descripcion}</p>
                    </div>
                    <div class="icono-editar">
                        <button onclick="editarProducto(this)">Editar</button">
                    </div>
                    <div class="icono-eliminar">
                        <button onclick="eliminarProducto(this)">Eliminar</button>
                    </div>
                </div>
            `;
            document.querySelector('.lista-productos').insertAdjacentHTML('beforeend', productoHTML);
        }
        limpiarFormulario();
    };
    if (imagenProducto) {
        reader.readAsDataURL(imagenProducto);
    } else if (editando && productoEditando) {
        // Si estamos editando y no se cambia la imagen, usar la imagen existente
        const imageSrc = productoEditando.querySelector('.item-izquierda img').src;
        reader.readAsDataURL(imageSrc);
    }
}

function eliminarProducto(element) {
    element.closest('.item-producto').remove();
}

function editarProducto(element) {
    const producto = element.closest('.item-producto');
    productoEditando = producto;
    editando = true;
    document.getElementById('fecha').value = producto.querySelector('.item-derecha p:nth-child(1)').textContent.split(': ')[1];
    document.getElementById('categoria').value = producto.querySelector('.item-derecha p:nth-child(2)').textContent.split(': ')[1];
    document.getElementById('cantidad').value = producto.querySelector('.item-derecha p:nth-child(3)').textContent.split(': ')[1];
    document.getElementById('nombre').value = producto.querySelector('.item-derecha p:nth-child(4)').textContent.split(': ')[1];
    document.getElementById('precio').value = producto.querySelector('.item-derecha p:nth-child(5)').textContent.split(': ')[1];
    document.getElementById('descripcion').value = producto.querySelector('.item-derecha p:nth-child(6)').textContent.split(': ')[1];

    const imagePlaceholder = document.querySelector('.imagen-placeholder');
    imagePlaceholder.style.backgroundImage = `url(${producto.querySelector('.item-izquierda img').src})`;
    imagePlaceholder.textContent = '';

    // Cambiar texto del botón guardar
    const btnGuardar = document.querySelector('.btn-guardar');
    btnGuardar.textContent = 'GUARDAR CAMBIOS';
}



function limpiarFormulario() {
    editando = false;
    productoEditando = null;
    document.getElementById('fecha').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('imagen-producto').value = '';
    const imagePlaceholder = document.querySelector('.imagen-placeholder');
    imagePlaceholder.style.backgroundImage = '';
    imagePlaceholder.textContent = '+';

    // Cambiar texto del botón guardar a su estado inicial
    const btnGuardar = document.querySelector('.btn-guardar');
    btnGuardar.textContent = 'GUARDAR';
}

function descartarProducto() {
    limpiarFormulario();
}



document.getElementById('btn-descartar-cambios').addEventListener('click', function() {
    // Llama a la función para eliminar todos los productos
    eliminarTodosLosProductos();
});

function eliminarTodosLosProductos() {
  
    const listaProductos = document.querySelector('.lista-productos');
    
    listaProductos.innerHTML = '';
    
    limpiarFormulario();
}

function guardarProductos() {
    const productos = Array.from(document.querySelectorAll('.item-producto')).map(producto => {
        const imagenUrl = producto.querySelector('.item-izquierda .imagen-placeholder').style.backgroundImage.slice(5, -2);
        return {
            fecha: producto.querySelector('.item-derecha p:nth-child(1)').textContent.split(': ')[1],
            categoria: producto.querySelector('.item-derecha p:nth-child(2)').textContent.split(': ')[1],
            cantidad: producto.querySelector('.item-derecha p:nth-child(3)').textContent.split(': ')[1],
            nombre: producto.querySelector('.item-derecha p:nth-child(4)').textContent.split(': ')[1],
            precio: producto.querySelector('.item-derecha p:nth-child(5)').textContent.split(': ')[1],
            descripcion: producto.querySelector('.item-derecha p:nth-child(6)').textContent.split(': ')[1],
            imagen: imagenUrl
        };
    });

    localStorage.setItem('productos', JSON.stringify(productos));
    alert('Productos guardados con éxito');
}