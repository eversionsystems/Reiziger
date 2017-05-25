<?php
/**
 * Template Name: Find Retailer
 */



get_header(); ?>

	<?php
	// Start the loop.
	while ( have_posts() ) : the_post();

		// Include the page content template.
		get_template_part( 'content', 'retailerpage' );

	// End the loop.
	endwhile;
	?>

<?php get_footer(); ?>