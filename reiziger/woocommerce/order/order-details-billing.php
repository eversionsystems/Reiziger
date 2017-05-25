<?php
/**
 * Order Customer Details
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/order/order-details-customer.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you (the theme developer).
 * will need to copy the new files to your theme to maintain compatibility. We try to do this.
 * as little as possible, but it does happen. When this occurs the version of the template file will.
 * be bumped and the readme will list any important changes.
 *
 * @see 	    http://docs.woothemes.com/document/template-structure/
 * @author  WooThemes
 * @package WooCommerce/Templates
 * @version 2.4.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<h3><?php _e( 'Payment', 'woocommerce' ); ?></h3>
<div class="billing-feilds">
	<div class="col-6 fl">
		<div class="add-area">
		<div class="add-label">Billing Contact</div>
		<div class="add-content"><?php
			if($order->billing_first_name || $order->billing_last_name)
				echo $order->billing_first_name.' '.$order->billing_last_name.'<br />';
			if($order->billing_phone)
				echo $order->billing_phone.'<br />';
			if($order->billing_mobile)
				echo $order->billing_mobile.'<br />';
			if($order->billing_company)
				echo $order->billing_company;
		?></div>
		</div>
		<div class="add-area">
		<div class="add-label">Billing Address</div>
		<div class="add-content"><?php
			if($order->billing_address_1)
				echo $order->billing_address_1.'<br />';
			if($order->billing_address_2)
				echo $order->billing_address_2.'<br />';
			if($order->billing_city || $order->billing_state || $order->billing_postcode )
				echo $order->billing_city.' '.$order->billing_state.' '.$order->billing_postcode.'<br />';
			if($order->billing_country)
				echo WC()->countries->countries[ $order->billing_country ];
		?></div>
		</div>
	</div>
	
	<div class="col-6 fr">
		<div class="payment-method">
			Payment Method: <span><?php echo $order->payment_method_title; ?></span>
		</div>
	</div>
</div>
