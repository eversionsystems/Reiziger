<?php

	include_once($_SERVER['DOCUMENT_ROOT'].'/wp-load.php' );
	
	$email = isset($_REQUEST['email_id']) ? $_REQUEST['email_id']: '';
	$exists = email_exists($email);
	
	if ( $exists ) {
		$user_info = get_userdata($exists);
		echo $username = $user_info->user_logi;
	} else {
		echo 0;
	}
?>