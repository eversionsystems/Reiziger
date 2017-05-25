<?php
	
	session_start();
	
	include_once($_SERVER['DOCUMENT_ROOT'].'/wp-load.php' );
	
	require_once( $_SERVER['DOCUMENT_ROOT'] . '/wp-config.php' );
	require_once( $_SERVER['DOCUMENT_ROOT'] . '/wp-includes/theme.php' );
	
	
	$name = (isset($_GET['name'])) ? $_GET['name'] : $_POST['name'];
	$lname = (isset($_GET['lname'])) ? $_GET['lname'] : $_POST['lname'];
	$email = (isset($_GET['email'])) ? $_GET['email'] : $_POST['email'];
	$phone = (isset($_GET['phone'])) ? $_GET['phone'] : $_POST['phone'];
	$address = (isset($_GET['address'])) ? $_GET['address'] : $_POST['address'];
	$city = (isset($_GET['city'])) ? $_GET['city'] : $_POST['city'];
	$comments = (isset($_GET['comments'])) ? $_GET['comments'] : $_POST['comments'];
	$quoteinfo = (isset($_GET['quoteinfo'])) ? $_GET['quoteinfo'] : $_POST['quoteinfo'];
	$proinfo = (isset($_GET['proinfo'])) ? $_GET['proinfo'] : $_POST['proinfo'];
	$retailerEmail = (isset($_GET['retailerEmail'])) ? $_GET['retailerEmail'] : $_POST['retailerEmail'];
	$adminEmail = 'enquiries@reiziger.com,david@the-tank.com.au';
	
	
	if($quoteinfo) {
		$quotetion = '<p>Requesting a quotation regarding below products: <br>';
		foreach($quoteinfo as $quotes) {
			$quotetion.= $quotes.'<br>';
		}
		$quotetion.= '</p>';
	}
	
	if($proinfo) {
		$productinfo = 'Requesting a below products information: <br>';
		foreach($proinfo as $infos) {
			$productinfo .= $infos.'<br>';
		}
		$productinfo .= '</p>';
	}
	
	$path = get_template_directory_uri();
	
	$EmailTo = $adminEmail.','.$retailerEmail[0];
	$Subject = "Contact a retailer - Reiziger Website";
	$Body = "";
	$Body .='<div><img src="'.$path.'/images/reiziger-mail.png" alt="Reiziger" width="100%" /></div><br>';
	$Body .='<p>Full Name: '.$name.' '.$lname.'</p>';
	$Body .='<p>Email: '.$email.'</p>';
	$Body .='<p>Phone: '.$phone.'</p>';
	$Body .='<p>Address: '.$address.'</p>';
	$Body .='<p>City: '.$city.'</p>';
	$Body .='<p>Comments: '.$comments.'</p>';
	if(isset($quotetion)) {
		$Body .=$quotetion.'<br>';
	}
	if(isset($productinfo)) {
		$Body .=$productinfo.'<br>';
	}
	
	$headers = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	$headers .= 'From:'.$email. "\r\n";
	//$headers .= 'Bcc: isquare.jay@gmail.com'. "\r\n" ;
	//$headers .= 'Return-Path: '.$EmailFrom. "\r\n";
	$headers .= 'Reply-To: '.$email. "\r\n";
	
	//$returnpath = '-f '.$email;
	$success = mail($EmailTo, $Subject, $Body,$headers,$returnpath);
	
	$data = '';
	$data .='<p>Thank You For Contacting Us. We Will Get Back To You Soon.</p>';

echo $data;
	
?>