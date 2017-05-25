<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Reiziger
 * @since Reiziger 1.0
 */
?>

	<!--<div class="bottom-header">
		<div class="wrapper clearfix">
			<?php
				// Page thumbnail and title.
				//reiziger_post_thumbnail();
			//	the_title( '<h3 class="entry-title">', '</h3>' );
			?>
			<div class="slide-nav"><a></a></div>
			<?php
				//edit_post_link( __( 'Edit', 'reiziger' ), '<span class="edit-link">', '</span>' );
			//	the_content();
			?>
		</div>
	</div>-->
</header>
<article id="post-<?php the_ID(); ?>" class="whole-page"<?php //post_class(); ?>>
	
	<?php 
		$pages = get_pages( array( 'child_of' => $post->ID , 'sort_column' => 'menu_order', 'sort_order' => 'asc') );
		
		foreach($pages as $page) {
			//print_r($page);
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

	<!--<div class="entry-content">
		<?php
			
			

			
		?>
	</div>--><!-- .entry-content -->
</article><!-- #post-## -->