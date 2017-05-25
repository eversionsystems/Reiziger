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
	
	
	

		echo '<div class="faq-help-banner inner">
		<div class="wrapper"><div class="faq-center">
			<h2>FAQs</h2>
			<div class="search-faq">
				<form role="search" method="post" id="searchform" class="searchform" action="'.esc_url( home_url( '/' ) ).'faq/" >
				<input type="text" value="' . get_search_query() . '" name="s" id="s" class="faq-s" placeholder="Search the Help Center" />
				<input type="image" src="'.get_template_directory_uri().'/images/search-icon.png" id="searchsubmit" class="s-btn search-btn" alt="Go"> 
				</form>
			</div></div>
		</div>
	</div>';
	?>
    
	<div class="faq-bradcrumb">
	    <div class="wrapper clearfix">
		    <?php if(function_exists('bcn_display')) { bcn_display();  }?>
		</div>
    </div>    
<?php 
	
	
	echo '<div class="faq-section faq-section-new"><div class="wrapper clearfix">';
		
		//echo  $cat;
		$parent_categories = get_category($cat);
		//print_r($parent_categories);
		$parent_id = $parent_categories->category_parent;
		$category_id = $parent_categories->cat_ID;
		//$categories = wp_list_categories( array( 'child_of' => $category_id) );
		$categories = get_categories( array( 'child_of' => $parent_id, 'orderby' => 'id', 'order'   => 'ASC' )); 
		
		if($categories) {
			echo '<div class="col-3 fl"><div class="faq-left-nav"><ul>';
			foreach($categories as $childcat) {					
				echo '<li><a href="'.get_category_link($childcat->cat_ID).'">'.$childcat->name.'</a></li>';
			}
		echo '</ul></div></div>';
		}
		
		if ( get_query_var('paged') ) { $paged = get_query_var('paged'); }
		elseif ( get_query_var('page') ) { $paged = get_query_var('page'); }
		else { $paged = 1; }
		
		//echo $parent_categories->slug;
		//query_posts('category_name='.$parent_categories->slug.'&showposts=4'.'&paged='.$paged);
		
		$wp_query = new WP_Query();
		$args = array( 'cat' => $category_id , 'orderby' => 'post_date', 'order' => 'DESC', 'post_type' => 'post');
		$wp_query->query($args);
		
		//$pages = wp_get_recent_posts( array( 'category' => $category_id , 'orderby' => 'post_date', 'order' => 'DESC', 'post_type' => 'post') );
				
		if($wp_query->have_posts()) {
			echo '<div class="col-9 fr">
				<div class="cat-title"><h3>'. $parent_categories->cat_name.'</h3></div>
				<div class="col-6 fl"><div class="faq-right-nav"><ul>';
				$i=0;
			/*foreach($pages as $faqpage) {
				$i++;
				echo '<li><a href="'.get_permalink($faqpage['ID']).'">'.$faqpage['post_title'].'</a></li>';
				if($i == 7){echo '</ul></div></div><div class="col-6 fr"><div class="faq-right-nav"><ul>'; $i=0;}
				
			}*/
			$i=0;
				while ( $wp_query->have_posts() ) : $wp_query->the_post(); $i++;
					$faqpage_ID = $post->ID;
					$faqpage_title = $post->post_title;
					echo '<li><a href="'.get_permalink($faqpage_ID).'">'.$faqpage_title.'</a></li>';
					if($i > 7){echo '</ul></div></div><div class="col-6 fr"><div class="faq-right-nav"><ul>'; $i=0;}
				endwhile;
			echo '</ul></div></div>';
		}
echo '</div></div></div>';
//		reiziger_paging_nav();
		
		global $wp_query;

		$big = 999999999; // need an unlikely integer
		
		echo '<div class="pagination">';
			echo paginate_links( array(
				'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
				'format' => '?paged=%#%',
				'current' => max( 1, get_query_var('paged') ),
				'total' => $wp_query->max_num_pages,
				'type'               => 'plain'
			) );
		echo '</div>';

	else :
		// If no content, include the "No posts found" template.
		get_template_part( 'content', 'none' );

	endif;
?>