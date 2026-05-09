<?php
/**
 * AgentMaya — Contact / Talk to Sales Form Handler
 * Captures: name, email, phone, subject, message
 * Sends via PHPMailer through Hostinger SMTP
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';

// ── CORS headers (allow same-origin or specific domains) ─────────────────────
$allowedOrigins = [
    'https://agentmaya.in',
    'https://www.agentmaya.in',
    'http://agentmaya.in',
    'http://localhost',
    'http://localhost:5173',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: *");
}
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Max-Age: 86400");

// ── Handle preflight OPTIONS request ──────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function clean(string $value): string {
    return htmlspecialchars(strip_tags(trim($value)), ENT_QUOTES, 'UTF-8');
}

function isAjax(): bool {
    return !empty($_SERVER['HTTP_X_REQUESTED_WITH']) &&
           strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
}

// ── Only accept POST ──────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    if (isAjax()) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    } else {
        echo 'Method not allowed.';
    }
    exit;
}

// ── Collect & sanitise fields ─────────────────────────────────────────────────
$name    = clean($_POST['name']    ?? '');
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone   = clean($_POST['phone']   ?? 'Not provided');
$subject = clean($_POST['subject'] ?? 'General Inquiry');
$message = clean($_POST['message'] ?? '');

// ── Basic validation ──────────────────────────────────────────────────────────
$errors = [];

if (empty($name)) {
    $errors['name'] = 'Name is required.';
}
if (empty($email)) {
    $errors['email'] = 'Email is required.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Invalid email address.';
}
if (empty($message)) {
    $errors['message'] = 'Message is required.';
}

if (!empty($errors)) {
    http_response_code(400);
    if (isAjax()) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'errors' => $errors]);
    } else {
        echo 'Validation errors: ' . implode(', ', $errors) . ' <br><a href="index.html">Go back</a>';
    }
    exit;
}

// ── Build email body ──────────────────────────────────────────────────────────
$body = <<<TEXT
New Contact Form Submission — AgentMaya
========================================

Name:    $name
Email:   $email
Phone:   $phone
Subject: $subject

Message:
$message

========================================
Sent via agentmaya.in contact form
IP: {$_SERVER['REMOTE_ADDR'] ?? 'unknown'}
Time: " . date('Y-m-d H:i:s T') . "
TEXT;

// ── Send via PHPMailer ────────────────────────────────────────────────────────
$mail = new PHPMailer(true);

try {
    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host       = 'smtp.hostinger.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'contact@agentmaya.in';
    $mail->Password   = 'YOUR_PASSWORD_HERE'; // TODO: Replace with actual password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;

    // Timeouts
    $mail->Timeout    = 30;
    $mail->SMTPDebug  = 0;

    // Headers
    $mail->setFrom('contact@agentmaya.in', 'AgentMaya Contact Form');
    $mail->addAddress('contact@agentmaya.in', 'AgentMaya Sales');

    // Reply directly to the sender
    if (!empty($email)) {
        $mail->addReplyTo($email, $name);
    }

    $mail->isHTML(false);
    $mail->Subject = 'New Inquiry: ' . $subject . ' from ' . $name;
    $mail->Body    = $body;

    $mail->send();

    // ── Success response ──────────────────────────────────────────────────────
    if (isAjax()) {
        header('Content-Type: application/json');
        echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
    } else {
        // HTML success page
        echo <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="6;url=index.html">
    <title>Message Sent — AgentMaya</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600&family=Inter:wght@200;300;400;600&display=swap" rel="stylesheet">
    <style>
        *{margin:0;padding:0;box-sizing:border-box;}
        body{
            font-family:'Inter',sans-serif;
            background:#050505;
            color:#F4F4F4;
            min-height:100vh;
            display:flex;
            align-items:center;
            justify-content:center;
            padding:24px;
            overflow:hidden;
        }
        body::before{
            content:'';
            position:fixed;
            inset:0;
            background:
                radial-gradient(at 40% 20%, rgba(240,200,90,0.06) 0, transparent 50%),
                radial-gradient(at 80% 60%, rgba(37,99,235,0.04) 0, transparent 50%);
            pointer-events:none;
        }
        .card{
            position:relative;
            background:rgba(18,16,16,0.85);
            border:1px solid rgba(255,255,255,0.08);
            border-radius:20px;
            padding:48px 40px;
            max-width:480px;
            width:100%;
            text-align:center;
            backdrop-filter:blur(24px);
            animation:fadeIn 0.6s ease-out;
        }
        @keyframes fadeIn{
            from{opacity:0;transform:translateY(20px);}
            to{opacity:1;transform:translateY(0);}
        }
        .icon{
            width:64px;
            height:64px;
            border-radius:50%;
            background:rgba(16,185,129,0.1);
            border:1px solid rgba(16,185,129,0.25);
            display:flex;
            align-items:center;
            justify-content:center;
            margin:0 auto 24px;
        }
        .icon svg{width:28px;height:28px;color:#10B981;}
        h2{
            font-family:'EB Garamond',serif;
            font-size:1.75rem;
            font-weight:400;
            letter-spacing:-0.02em;
            margin-bottom:12px;
            color:#F4F4F4;
        }
        p{color:#B9B9B9;line-height:1.7;margin-bottom:8px;font-weight:200;font-size:14px;}
        .name{color:#F0C85A;font-weight:400;}
        .redirect{font-size:12px;color:#6B6B6B;margin-top:24px;font-weight:200;}
        .redirect a{color:#F0C85A;text-decoration:none;transition:opacity 0.2s;}
        .redirect a:hover{opacity:0.8;text-decoration:underline;}
        .bar-track{height:3px;background:rgba(255,255,255,0.06);border-radius:999px;margin-top:24px;overflow:hidden;}
        .bar-fill{height:100%;background:linear-gradient(90deg,#F0C85A,#2563EB);border-radius:999px;animation:drain 6s linear forwards;}
        @keyframes drain{from{width:100%;}to{width:0%;}}
    </style>
</head>
<body>
    <div class="card">
        <div class="icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
        </div>
        <h2>Message Sent!</h2>
        <p>Thanks, <span class="name">$name</span>. We've received your inquiry about <strong>$subject</strong>.</p>
        <p>Our team will get back to you at <strong>$email</strong> shortly.</p>
        <p class="redirect">Redirecting you back in 6 seconds... <a href="index.html">Go now</a></p>
        <div class="bar-track"><div class="bar-fill"></div></div>
    </div>
</body>
</html>
HTML;
    }
} catch (Exception $e) {
    http_response_code(500);
    $errorMsg = 'Message could not be sent. Please try again later.';
    if (isAjax()) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => $errorMsg]);
    } else {
        echo htmlspecialchars($errorMsg) . ' <br><a href="index.html">Go back</a>';
    }
}
?>
