<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Reiziger
 * @since Reiziger 1.0
 */
?>

</header>
<article id="post-<?php the_ID(); ?>" class="whole-page"<?php //post_class(); ?>>
	
	<?php 
		the_content();
		wp_link_pages( array(
			'before'      => '<div class="page-links"><span class="page-links-title">' . __( 'Pages:', 'reiziger' ) . '</span>',
			'after'       => '</div>',
			'link_before' => '<span>',
			'link_after'  => '</span>',
		) );
	?>

	<!--<div class="entry-content">
		<?php
			
			wp_link_pages( array(
				'before'      => '<div class="page-links"><span class="page-links-title">' . __( 'Pages:', 'reiziger' ) . '</span>',
				'after'       => '</div>',
				'link_before' => '<span>',
				'link_after'  => '</span>',
			) );

			
		?>
	</div>--><!-- .entry-content -->
</article><!-- #post-## -->