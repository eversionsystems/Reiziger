<?php
	
	session_start();
	
	include_once($_SERVER['DOCUMENT_ROOT'].'/wp-load.php' );
	
	require_once( $_SERVER['DOCUMENT_ROOT'] . '/wp-config.php' );
	require_once( $_SERVER['DOCUMENT_ROOT'] . '/wp-includes/wp-db.php' );
	if (!$wpdb) {
		$wpdb = new wpdb( DB_USER, DB_PASSWORD, DB_NAME, DB_HOST);
	} else {
		global $wpdb;
	}
	
	$zip = (isset($_GET['zip'])) ? $_GET['zip'] : $_POST['zip'];
	
	$find = "SELECT posts.post_title,
					post_email.meta_value AS email,
					post_zip.meta_value AS zip
			FROM $wpdb->posts AS posts
			INNER JOIN $wpdb->postmeta AS post_email ON post_email.post_id = posts.ID AND post_email.meta_key = 'wpsl_email'
			INNER JOIN $wpdb->postmeta AS post_zip ON post_zip.post_id = posts.ID AND post_zip.meta_key = 'wpsl_zip'
			WHERE posts.post_type = 'wpsl_stores' AND posts.post_status = 'publish' AND (post_zip.meta_value LIKE '%".$zip."%') ";
	
	$dealers = $wpdb->get_results($find);
	$data = '';
	$data .='<div class="raq-secton-content">';
				$i = 0;
				foreach($dealers as $retailer) {
					if($i == 0) $chk = 'checked';
					else $chk = '';
					$data .= '<label class="retailerlisting">
						<input type="radio" '.$chk.' value="'.$retailer->email.'" name="retailerEmail[]" id="retailerEmail" >
						<span>'.$retailer->post_title.'</span>
					</label>';
					$i++;
				}
					/*<a class="viwe-more-btn" href="javascript:void(0);">View More Retailers</a>*/
	$data .='</div>';

echo $data;
	
?>