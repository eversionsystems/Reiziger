<?php
/**
 * Order details
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/order/order-details.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you (the theme developer).
 * will need to copy the new files to your theme to maintain compatibility. We try to do this.
 * as little as possible, but it does happen. When this occurs the version of the template file will.
 * be bumped and the readme will list any important changes.
 *
 * @see 	    http://docs.woothemes.com/document/template-structure/
 * @author  WooThemes
 * @package WooCommerce/Templates
 * @version 2.5.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$order = wc_get_order( $order_id );

$show_purchase_note = $order->has_status( apply_filters( 'woocommerce_purchase_note_order_statuses', array( 'completed', 'processing' ) ) );
?>
<!--<h2><?php _e( 'Order Details', 'woocommerce' ); ?></h2>-->

<div class="shipping-order-area">
	<div class="col-4 fl">
		<div class="add-area">
		<div class="add-label">Shipping Address</div>
		<div class="add-content"><?php
			if($order->shipping_first_name)
				echo $order->shipping_first_name.'<br />';
			if($order->shipping_company)
				echo $order->shipping_company.'<br />';
			if($order->shipping_phone)
				echo $order->shipping_phone.'<br />';
			if($order->shipping_mobile)
				echo $order->shipping_mobile.'<br />';
			if($order->shipping_address_1)
				echo $order->shipping_address_1.'<br />';
			if($order->shipping_address_2)
				echo $order->shipping_address_2.'<br />';
			if($order->shipping_city || $order->shipping_state || $order->shipping_postcode)
				echo $order->shipping_city.' '.$order->shipping_state.' '.$order->shipping_postcode.'<br />';
			if($order->shipping_country)
				echo WC()->countries->countries[ $order->shipping_country ];
		?></div>
		</div>
	</div>
	<div class="col-8 fr">
		<?php $shipping = $order->get_shipping_method(); ?>
		<table class="shop_table order_details">
			<!--<thead>
				<tr>
					<th class="product-name"><?php _e( 'Product', 'woocommerce' ); ?></th>
					<th class="product-total"><?php _e( 'Total', 'woocommerce' ); ?></th>
				</tr>
			</thead>-->
			<tbody>
				<td class="shipment">SHIPMENT: <?php echo $shipping; ?></td>
				<?php
					foreach( $order->get_items() as $item_id => $item ) {
						$product = apply_filters( 'woocommerce_order_item_product', $order->get_product_from_item( $item ), $item );
						$purchase_note = get_post_meta( $product->id, '_purchase_note', true );
		
						wc_get_template( 'order/order-details-item.php', array(
							'order'					=> $order,
							'item_id'				=> $item_id,
							'item'					=> $item,
							'show_purchase_note'	=> $show_purchase_note,
							'purchase_note'			=> $purchase_note,
							'product'				=> $product,
						) );
					}
				?>
				<?php do_action( 'woocommerce_order_items_table', $order ); ?>
			</tbody>
			<!--<tfoot>
				<?php
					foreach ( $order->get_order_item_totals() as $key => $total ) {
						?>
						<tr>
							<th scope="row"><?php echo $total['label']; ?></th>
							<td><?php echo $total['value']; ?></td>
						</tr>
						<?php
					}
				?>
			</tfoot>-->
		</table>
	</div>
</div>

	<?php do_action( 'woocommerce_order_details_after_order_table', $order ); ?>
<div class="billing-order-area">
	<?php //wc_get_template( 'order/order-details-customer.php', array( 'order' =>  $order ) ); ?>
	<?php wc_get_template( 'order/order-details-billing.php', array( 'order' =>  $order ) ); ?>
</div>

<div class="total-area">
	<div class="col-8 fl">Please note that your order is governed by <a href="#">Reiziger Sales and Refund Policy</a></div>
    <div class="col-4 fr">
		<?php
		//echo "<pre>"; print_r($order->get_order_item_totals()); echo "</pre>";
			foreach($order->get_order_item_totals() as $key => $total ) { ?>
				<?php if($key == 'payment_method') { continue; } ?>
				<div>
					<?php echo $total['label']; ?>
					<span><?php echo $total['value']; ?></span>
				</div>
				<?php
			}
		?>
	</div>
</div>