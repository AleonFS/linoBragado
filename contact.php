<?php
$email_to = "aleon.fullstack@gmail.com";
$email_subject = "Formulario de contacto Web";
$email_from = $email_to;

//Comprobar si cada campo está cumplimentado
if(!isset($_POST['nombre'])) {
    print json_encode(array("msg"=>"Fallo en el envio, por favor, indique su Nombre.","focus"=>"#nombre"));
	die(418);
}
if(!isset($_POST['email'])) {
	print json_encode(array("msg"=>"Fallo en el envio, por favor, indique un Email.","focus"=>"#email"));
	die();
}
if(!isset($_POST['message'])) {
    print json_encode(array("msg"=>"Fallo en el envio, por favor, complete el campo de Mensaje.","focus"=>"#message"));
	die();
}
if(!isset($_POST['telefono'])) {
    print json_encode(array("msg"=>"Fallo en el envio, por favor, complete el campo Teléfono","focus"=>"#telefono"));
	die();
}
//Comprobar formato de cada campo
if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    print json_encode(array("msg"=>"Fallo en el envio, introduzca un correo válido.","focus"=>"#email"));
  	die();
}
if (!filter_var($_POST['telefono'], FILTER_VALIDATE_INT)) {
    if(strlen($_POST['telefono']) != 9)
    print json_encode(array("msg"=>"Fallo en el envio, introduzca un Teléfono Válido (901523456).","focus"=>"#telefono"));
  	die();
}

if(strlen($_POST['message']) < 50){
    print json_encode(array("msg"=>"Introduzca al menos 50 caracteres en el mensaje.","focus"=>"#message"));
  	die();
}

function clean_string($string) {
  $bad = array("content-type","bcc:","to:","cc:","href","script","=");
  return str_replace($bad,"",$string);
}

$email_message = "Detalles del formulario de contacto:\n\n";
$email_message .= "Nombre: " . clean_string($_POST['nombre']) . "\n";
$email_message .= "Email: " . clean_string($_POST['email']) . "\n";
$email_message .= "Teléfono: " . clean_string($_POST['telefono']) . "\n";
$email_message .= "Mensaje:\n" . clean_string($_POST['message']) . "\n\n";

$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);

print json_encode(array("msg"=>"Mensaje enviado, Le atenderemos a la mayor brevedad posible."));
?>