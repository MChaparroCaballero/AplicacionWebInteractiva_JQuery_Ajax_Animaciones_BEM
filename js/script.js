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
                `);
                cargarProductos(); 
                
            } else {
                alert("El usuario no existe en la BD");
            }
       },error: function() {
            alert("Error de conexión en la primera comprobación");
        }
   })});

//Agreagmos un evento de Jquery al boton de cancelar para resetear el formulario.
$('#cancelBtn').click(function(e) {
   document.getElementById("loginForm").reset();
   alert("Formulario reseteado.");
});

//Funcion que carga los productos mediante AJAX creando elementos de la tabla.
function cargarProductos() {
    $.ajax({
        url: 'php/productos.php',
        method: 'GET',
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