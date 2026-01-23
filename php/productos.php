<?php
require_once 'connection.php';
header('Content-Type: application/json');

// Inicializamos la respuesta por defecto en FALSE
$respuesta = [
    'exito' => false,
    'mensaje' => '',
    'datos' => []
];

try {
    // Asumimos que leer_config devuelve la conexión PDO
    $bd = leer_config(); 

    // la Consulta
    $ins = "SELECT CodProd,Nombre,Descripcion,stock,Precio FROM productos";
    $stmt = $bd->query($ins);
    
    if ($stmt) {
        // Si $stmt existe, podemos sacar los datos directamente
        $respuesta['exito'] = true;
        $respuesta['datos'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $respuesta['mensaje'] = "Productos cargados.";
    } else {
        throw new Exception("Error al consultar la tabla de productos.");
    }

} catch (Exception $e) {
    // Aquí capturamos cualquier error
    $respuesta['mensaje'] = $e->getMessage();
}

// Devolvemos el JSON final
echo json_encode($respuesta);
?>