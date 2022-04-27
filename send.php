<?php
$name = $_POST['name'];
$tel = $_POST['tel'];
$town = $_POST['town'];
$email = $_POST['email'];
$source = $_POST['source'];
$facult = isset($_POST['facult']) ? $_POST['facult'] : null;
$direction = isset($_POST['direction']) ? $_POST['direction'] : null;
$filesB = isset($_POST['filesB']) ? $_POST['filesB'] : null;
$filesA = isset($_POST['filesA']) ? $_POST['filesA'] : null;

$name = htmlspecialchars($name);
$tel = htmlspecialchars($tel);
$town = htmlspecialchars($town);
$email = htmlspecialchars($email);
$filesB = htmlspecialchars($filesB);
$filesA = htmlspecialchars($filesA);

$name = urldecode($name);
$tel = urldecode($tel);
$town = urldecode($town);
$email = urldecode($email);
$facult = urldecode($facult);
$filesB = urldecode($filesB);
$filesA = urldecode($filesA);

$name = trim($name);
$tel = trim($tel);
$town = trim($town);
$email = trim($email);
$facult = trim($facult);
$filesB = trim($filesB);
$filesA = trim($filesA);
$to = "<postupi@tusur.ru>";

$data = [
    'REMOTE_ADDR' => isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['REMOTE_ADDR'] . "/" . $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR'],
    'HTTP_REFERER' => isset($_COOKIE['referrer']) ? urldecode($_COOKIE['referrer']) : null,
    'QUERY_STRING' => isset($_COOKIE['query_string']) ? str_replace('?', '', urldecode($_COOKIE['query_string'])) : null,
    'form' => 'welcome-' . $source,
    'name' => $name,
    'phone' => $tel,
    'email' => $email,
    'country' => ($filesA ? $filesA : $filesB),
    'city' => $town,
    'facult' => $facult,
    'comments' => ($facult ? 'Факультет: ' . $facult : null) . ($direction ? "\r\nНаправление: " .$direction : null),
];

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://crm.tusur.ru/index.php?r=api/order',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $data,
));

$response = curl_exec($curl);
curl_close($curl);
$response = json_decode($response);

if ($response && isset($response->result) && $response->result === 'ok') {
    if ($name !== 'test') {
        mail($to, "Заявка с сайта", "\nИмя: " . $name . "\nE-mail: " . $email . "\nТелефон: " . $tel . "\nСтрана: " . $filesB . "\nСтрана2: " . $filesA . "\nГород: " . $town . "\n" . $data['comments'], "From: info@welcome.tusur.ru \n\r");
    }
    echo 'Спасибо за обращение. С Вами обязательно свяжутся!';
} else {
    echo 'При отправке заявки возникла ошибка';
}


