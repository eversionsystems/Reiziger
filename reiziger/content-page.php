<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Reiziger
 * @since Reiziger 1.0
 */
?>
<?php 
	global $wp_query;
	$current_page_id = $wp_query->get_queried_object();
	//echo "<pre>Testtttttttt25"; print_r($current_page_id); echo "</pre>";
	$current_page_id->post_parent;
	$parentids = array(8,288,738,2043,2049,2041,2036,2016,4124);	
	
	//if($current_page_id->post_parent == 8){ 
	//	$mypages = get_post(8);
	if(in_array($current_page_id->post_parent,$parentids)){ 
		$mypages = get_post($current_page_id->post_parent);
		//echo '<pre>';print_r($current_page_id->post_parent);exit;
		$content = $mypages->post_content;
		if ( ! $content ) // Check for empty page
			continue;
		$content = apply_filters( 'the_content', $content );
?>
<?php
			$mobile_menu  = get_field('mobile_menu',$current_page_id->post_parent);
			$product_link = get_field('product_link',$current_page_id->post_parent);


?>

	<div class="bottom-header">
		<div class="wrapper clearfix">
        
           <?php $parant_permalink = get_permalink($current_page_id->post_parent); ?>

			<?php echo '<h3 class="entry-title" testinnerpage><a href="'.$parant_permalink.'">'.$mypages->post_title.'</a></h3>'; ?>
			<div class="slide-nav"><a></a></div>
			<?php //echo $content;	?>
            <div><a href="<?php echo $product_link; ?>" class="buy-btn testtt">Buy Now</a></div>
            <div class="cl"></div>
            <div class="navigation2"><?php 
			//echo "<pre>"; print_r($mobile_menu); print_r($product_link); echo "</pre>";
			wp_nav_menu( array( 'theme_location' => $mobile_menu,
								'container' => '',
								'container_class' => '', 
								'menu_class' => 'nav',
								'menu_id' => ' ') ); ?></div>
		</div>
	</div>
<?php } ?>
</header>

<?php if(in_array($current_page_id->post_parent,$parentids))
{
	$page_class = "product_pages";
	
}else{
	$page_class = "";
	
}
?>
<article id="post-<?php the_ID(); ?>" class="whole-page <?php echo $page_class." ".$current_page_id->post_parent; ?>" inenrpage testtttt>
	<?php
		// Page thumbnail and title.
		reiziger_post_thumbnail();
		//the_title( '<h3 class="entry-title">', '</h3>' );
		the_content();  //SumitGohil
		//echo do_shortcode($current_page_id->post_content);
		
		wp_link_pages( array(
			'before'      => '<div class="page-links"><span class="page-links-title">' . __( 'Pages:', 'reiziger' ) . '</span>',
			'after'       => '</div>',
			'link_before' => '<span>',
			'link_after'  => '</span>',
		) );
		wp_reset_query();
		//edit_post_link( __( 'Edit', 'reiziger' ), '<span class="edit-link">', '</span>' );
	?>

	<!--<div class="entry-content">
		<?php
			
		?>
	</div>--><!-- .entry-content -->
    <?php 
		if($current_page_id->post_parent == 8){ 
			/*'order' => 'desc',
			  'sort_column' => 'menu_order',*/
		
			$argss = array(
			  'post_type' => 'page',
			  'sort_column' => 'menu_order',
			  'order' => 'asc',
			  'post__in' => array(233)
			);
			query_posts($argss);
		
			while (have_posts()) : the_post();
				the_content();
			endwhile;
			wp_reset_query();
		
		} else if($current_page_id->post_parent == 288){ 
			/*'order' => 'desc',
			  'sort_column' => 'menu_order',*/
		
			$argss = array(
			  'post_type' => 'page',
			  'sort_column' => 'menu_order',
			  /*'order' => 'asc',*/
			  'post__in' => array(1697,576,571)
			);
			query_posts($argss);
		
			while (have_posts()) : the_post();
				the_content();
			endwhile;
			wp_reset_query();
		
		} else if($current_page_id->post_parent == 738){ 
			/*'order' => 'desc',
			  'sort_column' => 'menu_order',*/
		
			$argss = array(
			  'post_type' => 'page',
			  'sort_column' => 'menu_order',
			  /*'order' => 'asc',*/
			  'post__in' => array(1695,844,842)
			);
			query_posts($argss);
		
			while (have_posts()) : the_post();
				the_content();
			endwhile;
			wp_reset_query();
		
		} else if($current_page_id->post_parent == 2043){ 
			/*'order' => 'desc',
			  'sort_column' => 'menu_order',*/
		
			$argss = array(
			  'post_type' => 'page',
			  'sort_column' => 'menu_order',
			  'order' => 'asc',
			  'post__in' => array(2358,2364)
			);
			query_posts($argss);
		
			while (have_posts()) : the_post();
				the_content();
			endwhile;
			wp_reset_query();
		
		}else if($current_page_id->post_parent == 2049){ 
			/*'order' => 'desc',
			  'sort_column' => 'menu_order',*/
		
			$argss = array(
			  'post_type' => 'page',
			  'sort_column' => 'menu_order',
			  'order' => 'asc',
			  'post__in' => array(2611)
			);
			query_posts($argss);
		
			while (have_posts()) : the_post();
				the_content();
			endwhile;
			wp_reset_query();
		
		}else if($current_page_id->post_parent == 2041){ 
			/*'order' => 'desc',
			  'sort_column' => 'menu_order',*/
		
			$argss = array(
			  'post_type' => 'page',
			  'sort_column' => 'menu_order',
			  'order' => 'asc',
			  'post__in' => array(2778)
			);
			query_posts($argss);
		
			while (have_posts()) : the_post();
				the_content();
			endwhile;
			wp_reset_query();
		
		}else if($current_page_id->post_parent == 2036){ 
			/*'order' => 'desc',
			  'sort_column' => 'menu_order',*/
		
			$argss = array(
			  'post_type' => 'page',
			  'sort_column' => 'menu_order',
			  'order' => 'asc',
			  'post__in' => array(2971)
			);
			query_posts($argss);
		
			while (have_posts()) : the_post();
				the_content();
			endwhile;
			wp_reset_query();
		
		}else if($current_page_id->post_parent == 2016){ 
			/*'order' => 'desc',
			  'sort_column' => 'menu_order',*/
		
			$argss = array(
			  'post_type' => 'page',
			  'sort_column' => 'menu_order',
			  'order' => 'asc',
			  'post__in' => array(3099)
			);
			query_posts($argss);
		
			while (have_posts()) : the_post();
				the_content();
			endwhile;
			wp_reset_query();
		
		}else if($current_page_id->post_parent == 4124){ 
			/*'order' => 'desc',
			  'sort_column' => 'menu_order',*/
		
			$argss = array(
			  'post_type' => 'page',
			  'sort_column' => 'menu_order',
			  'order' => 'asc',
			  'post__in' => array(4152)
			);
			query_posts($argss);
		
			while (have_posts()) : the_post();
				the_content();
			endwhile;
			wp_reset_query();
		
		}
	?>
        
</article><!-- #post-## -->
