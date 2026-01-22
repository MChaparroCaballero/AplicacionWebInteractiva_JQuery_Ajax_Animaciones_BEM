<?php
require_once 'connection.php';
// Indicar al navegador que es JSON
    header('Content-Type: application/json');
    global $bd;
    
try {
    $respuesta = [];
    $bd = leer_config();
    if (!isset($_POST['usuario']) || empty($_POST['usuario']) || !isset($_POST['clave']) || empty($_POST['clave'])) {
            $respuesta['login'] = false;
            $respuesta['mensaje'] = "Usuario y contraseña son requeridos.";
            echo json_encode($respuesta);
            exit;
        }
    // Consulta preparada para comprobar usuario y contraseña
    $ins = "select nombre, gmail from usuarios where gmail = ? and clave = ?";
    $stmt = $bd->prepare($ins);
    $resul = $stmt->execute(array($_POST['usuario'], $_POST['clave']));
    
    // Verificar si hay error en la ejecución
    if (!$resul) {
        $respuesta['login'] = false;
        $respuesta['mensaje'] = "Error durante el proceso de login: " . $e->getMessage();
    }
    // Si encontramos exactamente 1 usuario con esas credenciales
    if($stmt->rowCount() === 1){        
        $respuesta['login'] = true;
        $respuesta['mensaje'] = "Login exitoso.";
        $respuesta['usuario'] = $stmt->fetch(); // Devolver datos del usuario
    } else {
         $respuesta['login'] = false;
        $respuesta['mensaje'] = "Usuario o contraseña incorrectos.";
    }
} catch (Exception $e) {
    $respuesta['login'] = false;
    $respuesta['mensaje'] = "Error durante el proceso de login: " . $e->getMessage();
}
    echo json_encode($respuesta);
?>