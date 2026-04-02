<?php
declare(strict_types=1);

header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(
        ["ok" => false, "error" => "Method not allowed"],
        JSON_UNESCAPED_UNICODE,
    );
    exit();
}

$rawBody = file_get_contents("php://input");
$payload = json_decode($rawBody ?: "{}", true);

$name = trim((string) ($payload["name"] ?? ""));
$phone = trim((string) ($payload["phone"] ?? ""));
$comment = trim((string) ($payload["comment"] ?? ""));

if ($name === "" || $phone === "") {
    http_response_code(400);
    echo json_encode(
        ["ok" => false, "error" => "Имя и телефон обязательны"],
        JSON_UNESCAPED_UNICODE,
    );
    exit();
}

$toEmail = "n-crator@mail.ru";
$fromEmail = $toEmail;

$host = preg_replace("/:\d+$/", "", (string) ($_SERVER["HTTP_HOST"] ?? ""));
if ($host !== "" && filter_var("noreply@" . $host, FILTER_VALIDATE_EMAIL)) {
    $fromEmail = "noreply@" . $host;
}
$fromName = "МУВП Муфты";
$subject = "Сообщение с лендинга: Муфты МУВП и МУВПТ";

$plainText = implode("\n", [
    "Новое сообщение с лендинга",
    "",
    "Имя: " . $name,
    "Телефон: " . $phone,
    "Сообщение: " . ($comment !== "" ? $comment : "-"),
]);

$htmlMessage =
    "<h2>Новое сообщение с лендинга</h2>" .
    "<p><strong>Имя:</strong> " .
    htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8") .
    "</p>" .
    "<p><strong>Телефон:</strong> " .
    htmlspecialchars($phone, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8") .
    "</p>" .
    "<p><strong>Сообщение:</strong><br>" .
    nl2br(
        htmlspecialchars(
            $comment !== "" ? $comment : "-",
            ENT_QUOTES | ENT_SUBSTITUTE,
            "UTF-8",
        ),
    ) .
    "</p>";

$boundary = "=_krator_" . bin2hex(random_bytes(8));
$encodedSubject = "=?UTF-8?B?" . base64_encode($subject) . "?=";
$encodedFromName = "=?UTF-8?B?" . base64_encode($fromName) . "?=";

$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "From: " . $encodedFromName . " <" . $fromEmail . ">";
$headers[] = "Reply-To: " . $fromEmail;
$headers[] = "X-Mailer: PHP/" . PHP_VERSION;
$headers[] =
    'Content-Type: multipart/alternative; boundary="' . $boundary . '"';

$message = "";
$message .= "--" . $boundary . "\r\n";
$message .= "Content-Type: text/plain; charset=UTF-8\r\n";
$message .= "Content-Transfer-Encoding: base64\r\n\r\n";
$message .= chunk_split(base64_encode($plainText));
$message .= "--" . $boundary . "\r\n";
$message .= "Content-Type: text/html; charset=UTF-8\r\n";
$message .= "Content-Transfer-Encoding: base64\r\n\r\n";
$message .= chunk_split(base64_encode($htmlMessage));
$message .= "--" . $boundary . "--\r\n";

$ok = mail(
    $toEmail,
    $encodedSubject,
    $message,
    implode("\r\n", $headers),
    "-f" . $fromEmail,
);

if ($ok) {
    echo json_encode(["ok" => true], JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(500);
    echo json_encode(
        ["ok" => false, "error" => "mail() вернул false"],
        JSON_UNESCAPED_UNICODE,
    );
}
