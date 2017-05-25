<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Reiziger
 * @since Reiziger 1.0
 */
?>
<?php //echo 'FAQs'; print_r($cat); exit; ?>
<div id="fixmenu1" class="navigation3 only-scroll">
	<div class="wrapper clearfix">
		<h3 class="entry-title"><a href="#">Help Centre</a></h3>
		<div class="navi-mobile-center">
		<?php
		if ( has_nav_menu( 'help-center' ) ) {
			// User has assigned menu to this location;
			// output it
			wp_nav_menu( array( 
				'theme_location' => 'help-center', 
				'menu_class' => 'nav', 
				'container' => '' 
			) );
		}
		?>
		</div>
   </div>
</div>


	  
<?php if ( have_posts() ) :

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
		
	<!--<div class="total_pages">
		<?php echo $wp_query->found_posts." results found"; ?>
	</div>-->
	<?php 	
		echo '<div class="faq-section faq-section-new"><div class="wrapper clearfix">';
		
		//echo  $cat;
		$parent_categories = get_category($cat);
		//print_r($parent_categories);
		$parent_id = $parent_categories->category_parent;
		$category_id = $parent_categories->cat_ID;
		//$categories = wp_list_categories( array( 'child_of' => $category_id) );
		$categories = get_categories( array( 'child_of' => $category_id, 'orderby' => 'id', 'order'   => 'ASC' )); 
		
		if($categories) {
			echo '<div class="col-3 fl"><div class="faq-left-nav"><ul>';
			foreach($categories as $childcat) {					
				echo '<li><a href="'.get_category_link($childcat->cat_ID).'">'.$childcat->name.'</a></li>';
			}
		echo '</ul></div></div>';
		}
								
		echo '<div class="col-9 fr">
			<div class="col-6 fl"><div class="faq-right-nav"><ul>';
				$i=0;
				
			while ( have_posts() ) : the_post(); $i++; ?>
			
			<!--<div class="search_results">
				<div class="entry-header">
					<?php //echo the_title( '<h3 class="entry-title">', '</h3>' ); ?>
				</div>	
			
				<div class="entry-summary">-->
					<?php 			
						$page_ID = $post->ID;
						$content = $post->post_content;
						//print_r($post);
						$content = apply_filters( 'the_content', $content );
						$search_results= substr(strip_tags($content),0,350); 
						//echo $search_results;
						echo "<li><a href=".get_page_link( $page_ID )." class='read-more-link'>".$post->post_title."</a></li>";
						if($i == 8){echo '</ul></div></div><div class="col-6 fr"><div class="faq-right-nav"><ul>'; $i=0;}
					 ?>	
			<?php endwhile;
			echo '</ul>';
				
			echo '</div></div></div>';
			
			//pagination
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
			
		echo '</div>';
	else :
		// If no content, include the "No posts found" template.
		get_template_part( 'content', 'none' );

	endif;