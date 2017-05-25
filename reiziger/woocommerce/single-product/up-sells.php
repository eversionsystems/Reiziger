<?php
/**
 * Single Product Up-Sells
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/up-sells.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you (the theme developer).
 * will need to copy the new files to your theme to maintain compatibility. We try to do this.
 * as little as possible, but it does happen. When this occurs the version of the template file will.
 * be bumped and the readme will list any important changes.
 *
 * @see 	    http://docs.woothemes.com/document/template-structure/
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}



global $product, $woocommerce_loop, $woocommerce;

/* DJ */
$cart_url = $woocommerce->cart->get_cart_url();
/* --- */

### KAMLESH KKK
if($_REQUEST['add-to-cart']!='' && $_REQUEST['quantity']!="") {

	//$upsells = $product->get_upsells();
	
	$terms = get_the_terms( $post->ID, 'product_cat' );
	$product_cat_id = $terms[0]->term_id;
	
	$meta_query = WC()->query->get_meta_query();
	
	$args = array(
		'number'     => 15,		
		'order'      => 'ASC',
		'hide_empty' => true,
		'include'    => array(),
        'exclude'    => array($product_cat_id)
	);
	$product_categories = get_terms( 'product_cat', $args);
	$count = count($product_categories);
	if ( $count > 0 ){ ?>
		<script type="text/javascript" src="<?php echo get_template_directory_uri().'/woocommerce/upsell-addtocart.js'; ?>"></script>
		<script> 
		jQuery(window).load(function() {
			// Handler for .ready() called.
			/*jQuery('html, body').animate({
				scrollTop: jQuery('.whole-page #fixmenu1').offset().top
			}, 'slow');*/
		});
		</script>

		<!-- Preloader -->
		<div id="response">
			<div id="response-status">&nbsp;</div>
		</div>
		<?php echo '<div id="#upsells" class="upsells products">'; ?>
		<h2><?php _e( 'You may also like&hellip;', 'woocommerce' ) ?></h2>
		<ul class="products">
		<?php 
		foreach ( $product_categories as $product_category ) {
			//print_r($product_category);
			$taxonomy_image_url = get_option('z_taxonomy_image'.$product_category->term_id);
			echo '<li class="cat-list">';
			if(!empty($taxonomy_image_url)) {
				echo '<div class="cat-img"><img src="'.$taxonomy_image_url.'" alt="'.$product_category->name.'" /></div>';
			}
			echo '<h3>' . $product_category->name . '</h3>';
			if(strlen($product_category->description)>200)
			{
				echo '<div class="cattxt">'. substr(strip_tags($product_category->description),0,200) . '<div class="cat'.$product_category->slug.'" id="mycont">'. substr(strip_tags($product_category->description),200) . '</div></div>';
				echo '<p class="showmore" id="'.$product_category->slug.'">Show more ></p>'; 
				
			}
			else
				echo '<p>'. $product_category->description . '</p>';	
				echo term_description();
				$args = array(
					'ignore_sticky_posts' => 1,
					'no_found_rows'       => 1,
					'posts_per_page' => -1,
					'tax_query' => array(
						'relation' => 'AND',
						array(
							'taxonomy' => 'product_cat',
							'field' => 'slug',
							// 'terms' => 'white-wines'
							'terms' => $product_category->slug
						)
					),
					'post_type' => 'product',
					'orderby' => 'menu_order',
					'order'=>'ASC',
					'post__not_in' => array( $product->id ),
					'meta_query'  => $meta_query
				);
				
				$products = new WP_Query( $args );
				$terms = get_the_terms($products->posts[0]->ID, 'product_cat' );
				foreach ($terms as $term) 
				{
					$product_cat_id = $term->term_id;
					$product_cat = $term->name;
					break;
				}
	
				echo "<ul>";
				echo '<li>
	<div class="addto-cart-area">
		<div class="addtocart-check">
			<input type="checkbox" checked="checked" class="addtocart_none" name="addtto_none" id="addtonone'.$term->term_id.'" onclick("'.$term->term_id.'",this.id) value="'.$term->term_id.'">
				<label for="%s"></label>
        </div> None</div>

</li>';
				$woocommerce_loop['columns'] = $columns;
				if ( $products->have_posts() ) :
					while ( $products->have_posts() ) : $products->the_post();
				
						wc_get_template_part( 'content', 'upsellproduct' );
					endwhile; // end of the loop.
				endif;
				
				echo "</ul>";
			echo '</li>';
		}
		?> </ul> <?php 
		echo '</div>'; ?>

		<div class="upsell-bottom ">
        <div class="wrapper clearfix">
			<div class="coun-btn"><a class="countinue" href="<?php echo $cart_url; ?>" >Add to cart</a></div>
			<div class="total-price">$<span class="total-amount"><?php echo str_replace("&#36;","",strip_tags($woocommerce->cart->get_cart_subtotal()));?></span></div>
            
        <!--<div class="deliver">
         <div class="dd1">Delivers:</div>
         <div class="dd2"><?php //echo date('M l d', strtotime(' +5 Weekday'))?> - Free*<br /><span>Based on Metro area location</span></div>
        </div><!-- .deliver-->
        <div class="deliver">
         <div class="dd1">Estimated arrival:</div>
         <div class="dd2"><?php echo date('M d', strtotime(' +5 Weekday'))?> - <?php echo date('d', strtotime(' +8 day'))?> - Free*<br /><span>Based on Metro area location</span></div>
        </div>
        
        
        </div>
		</div>
      
		
	<?php wp_reset_postdata(); }	
}
?>
