<?php
require_once 'connection.php';
header('Content-Type: application/json');

// Inicializamos la respuesta por defecto en FALSE
$respuesta = [
    'exito' => false,
    'mensaje' => '',
    'datos' => [],
    'meta' => []
];

try {
    // Asumimos que leer_config devuelve la conexión PDO
    $bd = leer_config(); 


    $limite = 10; // Productos por página
    $pagina = isset($_GET['pagina']) ? (int)$_GET['pagina'] : 1; // Si no envían nada, es la 1
    if ($pagina < 1) $pagina = 1;
    $offset = ($pagina - 1) * $limite;

// 2. OBTENER TOTAL DE PRODUCTOS (Para saber el número de páginas) (NUEVO)
    $sqlCount = "SELECT COUNT(*) as total FROM productos";
    $stmtCount = $bd->query($sqlCount);
    $totalProductos = $stmtCount->fetch(PDO::FETCH_ASSOC)['total'];
    $totalPaginas = ceil($totalProductos / $limite);

   $ins = "SELECT CodProd,Nombre,Descripcion,stock,Precio FROM productos LIMIT :limite OFFSET :offset";
    
    $stmt = $bd->prepare($ins);
    
    // IMPORTANTE: Usamos bindValue con PARAM_INT
    $stmt->bindValue(':limite', $limite, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    
    $stmt->execute();
    if ($stmt) {
        // Si $stmt existe, podemos sacar los datos directamente
        $respuesta['exito'] = true;
        $respuesta['datos'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $respuesta['mensaje'] = "Productos cargados.";
        // Añadimos la información de paginación
        $respuesta['meta'] = [
            'paginaActual' => $pagina,
            'totalPaginas' => $totalPaginas,
            'totalProductos' => $totalProductos
        ];
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
