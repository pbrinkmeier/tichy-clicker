<?php
// Use in the "Post-Receive URLs" section of your GitHub repo.
if ( $_POST['payload'] ) {
  $git = shell_exec( 'git fetch origin && git reset --hard origin/master 2>&1' );
  echo "<pre>$git</pre>";
}
?>
