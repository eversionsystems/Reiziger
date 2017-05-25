<?php
/**
 * The template for displaying product content within loops
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you (the theme developer).
 * will need to copy the new files to your theme to maintain compatibility. We try to do this.
 * as little as possible, but it does happen. When this occurs the version of the template file will.
 * be bumped and the readme will list any important changes.
 *
 * @see     http://docs.woothemes.com/document/template-structure/
 * @author  WooThemes
 * @package WooCommerce/Templates
 * @version 2.5.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

global $product, $woocommerce_loop;

// Store loop count we're currently on
if ( empty( $woocommerce_loop['loop'] ) ) {
	$woocommerce_loop['loop'] = 0;
}

// Store column count for displaying the grid
if ( empty( $woocommerce_loop['columns'] ) ) {
	$woocommerce_loop['columns'] = apply_filters( 'loop_shop_columns', 4 );
}

// Ensure visibility
if ( ! $product || ! $product->is_visible() ) {
	return;
}

// Increase loop count
$woocommerce_loop['loop']++;

// Extra post classes
$classes = array();
if ( 0 === ( $woocommerce_loop['loop'] - 1 ) % $woocommerce_loop['columns'] || 1 === $woocommerce_loop['columns'] ) {
	$classes[] = 'first';
}
if ( 0 === $woocommerce_loop['loop'] % $woocommerce_loop['columns'] ) {
	$classes[] = 'last';
}
if(!strstr(strtolower($product->get_sku()),"demo")){
?>
<li <?php post_class( $classes ); ?>>

	<?php
	//echo '<a href="' . get_the_permalink() . '">';

	/**
	 * woocommerce_before_shop_loop_item_title hook.
	 *
	 * @hooked woocommerce_show_product_loop_sale_flash - 10
	 * @hooked woocommerce_template_loop_product_thumbnail - 10
	 */
	
	//do_action( 'woocommerce_before_shop_loop_item_title' );
	
	//echo '</a>';
	/**
	 * woocommerce_shop_loop_item_title hook.
	 *
	 * @hooked woocommerce_template_loop_product_title - 10
	 */
	//do_action( 'woocommerce_shop_loop_item_title' );

	/**
	 * woocommerce_after_shop_loop_item_title hook.
	 *
	 * @hooked woocommerce_template_loop_rating - 5
	 * @hooked woocommerce_template_loop_price - 10
	 */
	//do_action( 'woocommerce_after_shop_loop_item_title' );
	$terms = get_the_terms($product->id, 'product_cat' );
				foreach ($terms as $term) 
				{
					$product_cat_id = $term->term_id;
					$product_cat = $term->name;
					break;
				}
	
	
	//do_action( 'woocommerce_after_shop_loop_item' );
	//echo '<a rel="nofollow" href="%s" data-quantity="%s" data-product_id="%s" data-product_sku="%s" class="%s">%s</a>';
	echo '<div class="addto-cart-area">';
	echo '<div class="addtocart-check">';
	echo sprintf( '<input type="checkbox" data-quantity="%s" data-catid="'.$product_cat_id.'" data-product_id="%s" data-product_sku="%s" class="addtocart_prod %s" name="addtocart[]" value="%s">',
		esc_attr( isset( $quantity ) ? $quantity : 1 ),
		esc_attr( $product->id ),
		esc_attr( $product->get_sku() ),
		esc_attr( isset( $class ) ? $class : 'button' ),
		esc_attr( $product->price )
	);
	echo sprintf( '<label for="%s"></label>',
		esc_attr( strtolower($product->get_sku()) )
	);
	echo '</div>';
	$product_title = get_the_title($product->id);
	echo ' Add '.$product_title.' $'.$product->price.'';
	echo '</div>';
	?>

</li>
<?php }?>
