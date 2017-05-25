<?php
/**
 * Related Products
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/related.php.
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
### KAMLESH KKK
if($_REQUEST['add-to-cart']=='' && $_REQUEST['quantity']=="")
{
	global $product, $woocommerce_loop;
//print_r($product->post);

	if ( empty( $product ) || ! $product->exists() ) {return;}
	$related = $product->get_related( $posts_per_page+1 );
	if ( sizeof( $related ) === 0 ) return;
## KAMLESH KKK
if($_REQUEST['reiziger_product']=='')
{
	
	///$related[]=$product->id;
	$posts_per_page=$posts_per_page+1;
}
$posts_per_page=$posts_per_page+1;


	$args = apply_filters( 'woocommerce_related_products_args', array(
	'post_type'            => 'product',
	'ignore_sticky_posts'  => 1,
	'no_found_rows'        => 1,
	'posts_per_page'       => $posts_per_page,
	'orderby'              => 'menu_order',
	'order'=>'ASC',	
	'post__in'             => $related
) );

$products = new WP_Query( $args );

$woocommerce_loop['columns'] = $columns;

if ( $products->have_posts() ) : 

global $post;
$terms = get_the_terms( $product->post->ID, 'product_cat' );
foreach ($terms as $term) 
{
	$product_cat_id = $term->term_id;
	$product_cat = $term->name;
	break;
}
?>

	<div class="related products">

		<!--<h2><?php _e( 'Related Products', 'woocommerce' ); ?></h2>-->
        


<ul class="rel_products_main">
<li>
<?php if($_REQUEST['reiziger_product']!=''){?>
<a class="openpro"><?php echo $product->post->post_title;?> <span>Change</span></a>
<?php }?>
<ul class="rel_products_sub" <?php if($_REQUEST['reiziger_product']==''){ echo 'style="display:block"';}?> >
<?php /*if($_REQUEST['reiziger_product']!=''){?>
<li class="current"><a class="openprocurrent"><h3 style="color:#f6a704 !important;"><?php echo $product->post->post_title;?></h3> </a></li>
			<?php 
}*/ while ( $products->have_posts() ) : $products->the_post(); ?>

				<?php wc_get_template_part( 'content', 'relatedproduct' ); ?>

			<?php endwhile; // end of the loop. ?>
            </ul>
</li>
		</ul>

	</div>

<?php 
endif;

if(!in_array($product_cat_id,$_SESSION['catid']))
{
	$_SESSION['catid'][]=$product_cat_id;
	$_SESSION['catid'][$product_cat_id]=$product->post->ID;
	
}

wp_reset_postdata();
}
