// Variable global para controlar la página (NUEVO)
let paginaActual = 1;
$('#loginBtn').click(function(e) {
    e.preventDefault();
   $.ajax({
       type: "POST",
       url: "php/login.php",
       data: {
           usuario: $('#usuario').val(),
           clave: $('#password').val()
       },
       dataType: 'json',
       success: function(response) {
        if (response.login === true) {
                // Reemplazamos el contenido de la card con la tabla de productos
                $('#mainCard').html(`
                    <h2 class="card__title">Lista de Productos</h2>
                    <table id="tableProductos" class="table-productos">
                        <thead class="table-productos__header">
                            <tr class="table-productos__row">
                            <th class="table-productos__cell table-productos__cell--head">Imagen</th>
                                <th class="table-productos__cell table-productos__cell--head">Nombre</th>
                                <th class="table-productos__cell table-productos__cell--head">Descripción</th>
                                <th class="table-productos__cell table-productos__cell--head">Stock</th>
                                <th class="table-productos__cell table-productos__cell--head">Precio</th>
                            </tr>
                        </thead>
                        <tbody id="tableProductosBody" class="table-productos__body">
                            <!-- Aquí se agregarán las filas de productos -->
                        </tbody>
                    </table>
                    <div id="paginacion" style="margin-top: 20px; display: flex; justify-content: center; gap: 10px;">
                        <button id="btnAnterior" class="btn-paginacion">Anterior</button>
                        <span id="infoPagina">Página 1</span>
                        <button id="btnSiguiente" class="btn-paginacion">Siguiente</button>
                    </div>
                `);
                cargarProductos(1); 
                
            } else {
                alert("El usuario no existe en la BD");
            }
       },error: function() {
            alert("Error de conexión en la primera comprobación");
        }
   })});

// NUEVO: Eventos para los botones de paginación (Delegación de eventos)
$(document).on('click', '#btnAnterior', function() {
    if (paginaActual > 1) {
        cargarProductos(paginaActual - 1);
    }
});

$(document).on('click', '#btnSiguiente', function() {
    // La validación del límite se hace mejor dentro de cargarProductos o con un atributo data
    cargarProductos(paginaActual + 1);
});

//Agreagmos un evento de Jquery al boton de cancelar para resetear el formulario.
$('#cancelBtn').click(function(e) {
   document.getElementById("loginForm").reset();
   alert("Formulario reseteado.");
});

//Funcion que carga los productos mediante AJAX creando elementos de la tabla.
function cargarProductos(pagina) {
    $.ajax({
        url: 'php/productos.php',
        method: 'GET',
        data: { pagina: pagina },
        dataType: 'json',
        success: function(respuestaProductos) {
            // Limpiamos el tbody antes de agregar por si las moscas
            $('#tableProductosBody').empty();

            // Recorremos el array de productos y agregamos cada fila con append
            $.each(respuestaProductos.datos , function(i, producto) {
                $('#tableProductosBody').append(`
                    <tr class="table-productos__row">
                    <td class="table-productos__cell">
                            <img src="./img/${producto.CodProd}.png" class="img-producto" alt="${producto.CodProd}">
                        </td>
                        <td class="table-productos__cell">${producto.Nombre}</td>
                        <td class="table-productos__cell">${producto.Descripcion}</td>
                        <td class="table-productos__cell">${producto.stock}</td>
                        <td class="table-productos__cell">${producto.Precio} €</td>
                    </tr>
                `);
            });

            // NUEVO: Actualizamos lógica de paginación visual
                paginaActual = respuestaProductos.meta.paginaActual;
                let totalPaginas = respuestaProductos.meta.totalPaginas;

                $('#infoPagina').text(`Página ${paginaActual} de ${totalPaginas}`);

                // Deshabilitar/Habilitar botones
                $('#btnAnterior').prop('disabled', paginaActual === 1);
                $('#btnSiguiente').prop('disabled', paginaActual >= totalPaginas);

            // Animamos las filas una por una
            $('.table-productos__row').each(function(index) {
                $(this).delay(index * 200).queue(function(next) {
                    $(this).addClass('table-productos__row--animated');
                    next();
                });
            });
        },
        error: function() {
            alert("falló la carga de productos");
        }
    });
}
