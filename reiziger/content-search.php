<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Reiziger
 * @since Reiziger 1.0
 */
?>

<div class="search_results">
	<div class="entry-header">

		<?php echo the_title( '<h3 class="entry-title">', '</h3>' ); ?>
		
	</div>	

	<div class="entry-summary">
		<?php 			
			// print_r($post);
			$page_ID = $post->ID;
			$content = $post->post_content;
			// print_r($content);
			
			$content = apply_filters( 'the_content', $content );
			$search_results= substr(strip_tags($content),0,350); 
			echo $search_results;
			echo "<a href=".get_page_link( $page_ID )." class='read-more-link'>Continue -></a>";
		 ?>
			
	</div><!-- .entry-summary -->
</div>	