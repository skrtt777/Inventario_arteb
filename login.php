<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = "localhost";
$db   = "react_test";      // seu banco
$user = "root";
$pass = "";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  http_response_code(500);
  echo json_encode(["error" => "DB connection failed"]);
  exit;
}

// Recebe JSON do React
$body = json_decode(file_get_contents("php://input"), true);
$username = $conn->real_escape_string($body["username"] ?? "");
$password = $body["password"] ?? "";

if (!$username || !$password) {
  http_response_code(400);
  echo json_encode(["error" => "Usuário e senha são obrigatórios"]);
  exit;
}

// Busca usuário
$stmt = $conn->prepare("SELECT id, nome, email, senha FROM usuarios WHERE nome = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows === 0) {
  http_response_code(401);
  echo json_encode(["error" => "Usuário não encontrado"]);
  exit;
}

$userData = $res->fetch_assoc();
// supondo que a coluna `senha` armazene hash bcrypt
if (!password_verify($password, $userData["senha"])) {
  http_response_code(401);
  echo json_encode(["error" => "Senha inválida"]);
  exit;
}

// Sucesso: retorne dados (sem senha)
unset($userData["senha"]);
echo json_encode([
  "success" => true,
  "user"    => $userData
]);
