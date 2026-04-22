<?php
// Arquivo: callback.php
// Este arquivo recebe a requisição automática da Meta

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['signed_request'])) {
    $signed_request = $_POST['signed_request'];
    $data = parse_signed_request($signed_request);

    if ($data && isset($data['user_id'])) {
        $user_id = $data['user_id'];

        // Lógica de exclusão de dados deve ser inserida aqui
        
        // URL onde o usuário pode verificar o status (aponte para sua página de exclusao.html)
        $status_url = 'https://' . $_SERVER['HTTP_HOST'] . '/exclusao.html'; 
        
        // Código único de confirmação
        $confirmation_code = 'DEL_' . uniqid();

        $response = array(
            'url' => $status_url,
            'confirmation_code' => $confirmation_code
        );
        echo json_encode($response);
        exit;
    }
}

// Funções de validação da assinatura
function parse_signed_request($signed_request) {
    list($encoded_sig, $payload) = explode('.', $signed_request, 2);

    // IMPORTANTE: Substitua abaixo pelo seu App Secret da Meta
    $secret = "291b769b88b837a6a13c22363e9373fa"; 

    $sig = base64_url_decode($encoded_sig);
    $data = json_decode(base64_url_decode($payload), true);

    $expected_sig = hash_hmac('sha256', $payload, $secret, $raw = true);
    if ($sig !== $expected_sig) {
        error_log('Bad Signed JSON signature!');
        return null;
    }

    return $data;
}

function base64_url_decode($input) {
    return base64_decode(strtr($input, '-_', '+/'));
}
?>
