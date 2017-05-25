<?php
/*
Template Name: Contact Page
*/


get_header(); ?>
</header>
	<?php
	// Start the loop.
	while ( have_posts() ) : the_post(); ?>

	<article id="post-<?php the_ID(); ?>" class="whole-page"><?php //post_class(); ?>
		
		<?php
			//edit_post_link( __( 'Edit', 'reiziger' ), '<span class="edit-link">', '</span>' );
			the_content();
	
		
			wp_link_pages( array(
				'before'      => '<div class="page-links"><span class="page-links-title">' . __( 'Pages:', 'reiziger' ) . '</span>',
				'after'       => '</div>',
				'link_before' => '<span>',
				'link_after'  => '</span>',
			) );
		
		?>
	</article><!-- #post-## -->
	
	<?php

	// End the loop.
	endwhile;
	?>

<?php get_footer(); ?>
