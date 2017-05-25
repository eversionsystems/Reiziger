<?php
/*
Template Name: Batch Report Page
*/
get_header(); ?>

	<?php
	// Start the loop.
	while ( have_posts() ) : the_post();
		// Include the page content template.
		get_template_part( 'content', 'batchreport' );
		// If comments are open or we have at least one comment, load up the comment template.
		/*if ( comments_open() || get_comments_number() ) :
			comments_template();
		endif;*/

	// End the loop.
	endwhile;
	?>
<script>

jQuery('#fixmenu1 ul.nav li a').click(function(e){ 
    jQuery("#fixmenu1 ul.nav li a").css('border-bottom','0px solid #f6a900');
    jQuery(this).css('border-bottom','4px solid #f6a900');
});
</script> 
   
<?php get_footer(); ?>