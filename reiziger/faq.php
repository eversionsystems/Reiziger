<?php
/**
 * The template for displaying Category pages
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Reiziger
 * @since Reiziger 1.0
 */
	if ( have_posts() ) :
	
	if(is_active_sidebar('help-center')) { dynamic_sidebar('help-center'); }
						

		/*echo '<div class="faq-help-banner">
		<div class="wrapper">
			<h2>Reiziger Help Centre</h2>
			<div class="search-faq">
				<form role="search" method="get" id="searchform" class="searchform" action="'.esc_url( home_url( '/' ) ).'category/faq/" >
				<input type="text" value="' . get_search_query() . '" name="faq-s" id="faq-s" class="faq-s" placeholder="Search the Help Center" />
				</form>
			</div>
		</div>
	</div>';*/
	
	
	
	echo '<div class="section-help-center"><div class="wrapper clearfix">';
		$parent_categories = get_the_category();
		$category_id = $parent_categories[0]->cat_ID;
		//$categories = wp_list_categories( array( 'child_of' => $category_id) );
		$categories = get_categories( array( 'child_of' => $category_id, 'orderby' => 'id', 'order'   => 'ASC' )); 
		
		if($categories) {
			$i = 0;
			echo '<div class="help-center-question" id="faqs"> 
	<h2>How would you like to get help?</h2><span class="sup-heading">Choose a product to find the help you need.</span>';
			foreach($categories as $childcat) {
				$i++;
				if (function_exists('z_taxonomy_image_url')) 
					$img_url = z_taxonomy_image_url($childcat->term_id);
					
				echo '<div class="col-4">
		<div class="pull-img"><a href="'.get_category_link($childcat->cat_ID).'"><img src="'.$img_url.'"></a></div>
		<span> <a href="'.get_category_link($childcat->cat_ID).'">'.$childcat->name.'</a> </span> </div>';					
				if($i == 3){echo '<div class="cl"></div>'; $i=0;}
			}
		echo '</div>';
		}
		
		$pages = wp_get_recent_posts( array( 'numberposts' => 15, 'category' => $category_id , 'orderby' => 'post_date', 'order' => 'DESC', 'post_type' => 'post') );
		// print_r($pages);
		
		if($pages) {
			echo '<div class="help-center-asked">
				<h2>Frequently asked questions.</h2>
				<div class="col-4"><ul>';
				$i=0;
			foreach($pages as $faqpage) {
				$i++;
				echo '<li><a href="'.get_permalink($faqpage['ID']).'">'.$faqpage['post_title'].'</a></li>';
				if($i == 5){echo '</ul></div><div class="col-4"><ul>'; $i=0;}
				//print_r($faqpage['post_title']);
			}
			echo '</ul></div></div>';
		}
echo '</div></div>';

	else :
		// If no content, include the "No posts found" template.
		get_template_part( 'content', 'none' );

	endif;
?>