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
    <?php $searh_address = filter_input(INPUT_POST, 'wpsl-search-input', FILTER_SANITIZE_STRING); ?>
    <?php if ($searh_address):?>
       <script>
         $(window).on('load',function(){
           var search_address = '<?=$searh_address?>';
           $('#wpsl-search-input').val(search_address);
           $('#wpsl-search-btn').trigger('click');
         })
       </script>
    <?php endif; ?>
<?php get_footer(); ?>