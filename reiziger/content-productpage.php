<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Reiziger
 * @since Reiziger 1.0
 */
?>
<div class="bottom-header" content-productpage>
  <div class="wrapper clearfix">
    <?php
				// Page thumbnail and title.
				//reiziger_post_thumbnail();
				the_title( '<h3 class="entry-title">', '</h3>' );
			?>
   <div class="slide-nav"><a></a></div>
    <?php
				//edit_post_link( __( 'Edit', 'reiziger' ), '<span class="edit-link">', '</span>' );
echo $content = apply_filters( 'the_content', get_the_content());
			?>
  </div>
</div>
</header>
<article id="post-<?php the_ID(); ?>" class="whole-page product_pages">

<div class="navigation3 topfixedmenu test" id="fixmenu1">
<div class="wrapper clearfix">
<?php the_title( '<h3 class="entry-title">', '</h3>' ); ?>
    <div></div>
    <div class="navi-mobile-center"></div>
  </div>
</div><!-- .content-page-product-->


  <?php //post_class(); ?>
  <?php 
		$pages = get_pages( array( 'child_of' => $post->ID , 'sort_column' => 'menu_order', 'sort_order' => 'asc') );
		/*43,52,63,66,67,227,228,229*//*559,562,565*/
		$skipids = array(52,63,66,67,227,228,229,477,481,490,494,559,562,565,780,793,795,796,839,840,841,2321,2340,2342,2351,2353,2356,2599,2601,2603,2605,2607,2609,2726,2732,2762,2765,2767,2769,2771,2773,2775,2957,2959,2961,2963,2965,2967,2969,3097,3095,3093,3091,3087,3085,3081,4135,4137,4139,4141,4145,4147,4150);
		foreach($pages as $page) {
			//print_r($page);
		if(in_array($page->ID,$skipids)) {
				continue;
		}
		$content = $page->post_content;
			if ( ! $content ) // Check for empty page
				continue;
			$content = apply_filters( 'the_content', $content );
			echo $content;
		}
		wp_link_pages( array(
			'before'      => '<div class="page-links"><span class="page-links-title">' . __( 'Pages:', 'reiziger' ) . '</span>',
			'after'       => '</div>',
			'link_before' => '<span>',
			'link_after'  => '</span>',
		) );
    ?>
</article><!-- #post-## -->