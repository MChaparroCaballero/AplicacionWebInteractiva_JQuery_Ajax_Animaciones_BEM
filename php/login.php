<?php
require_once 'connection.php';
header('Content-Type: application/json');

// Inicializamos la respuesta por defecto en FALSE
$respuesta = [
    'login' => false,
    'mensaje' => '',
    'usuario' => null
];

try {
    // Asumimos que leer_config devuelve la conexión PDO
    $bd = leer_config(); 

    // Validación para asegurarnos de que los datos están presentes
    if ( !isset($_POST['usuario'])|| !isset($_POST['clave'])|| empty($_POST['usuario']) || empty($_POST['clave'])) {
        throw new Exception("Usuario y contraseña son obligatorios.");
    }

    // la Consulta
    $ins = "SELECT nombre FROM usuarios WHERE gmail = ? AND clave = ?";
    $stmt = $bd->prepare($ins);
    
    // Ejecutamos pasando el array directamente
    if ($stmt->execute([$_POST['usuario'], $_POST['clave']])) {
        
        // Verificamos si encontró al usuario
        if ($stmt->rowCount() === 1) {        
            $respuesta['login'] = true;
            $respuesta['mensaje'] = "Login exitoso.";
            $respuesta['usuario'] = $stmt->fetch(PDO::FETCH_ASSOC); 
        } else {
            $respuesta['mensaje'] = "Usuario o contraseña incorrectos.";
        }
    } else {
        throw new Exception("Error al ejecutar la consulta SQL.");
    }

} catch (Exception $e) {
    // Aquí capturamos cualquier error
    $respuesta['mensaje'] = $e->getMessage();
}

// Devolvemos el JSON final
echo json_encode($respuesta);
?>