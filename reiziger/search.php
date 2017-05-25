<?php
/**
 * The template for displaying Search Results pages
 *
 * @package WordPress
 * @subpackage Reiziger
 * @since Reiziger 1.0
 */

get_header(); ?>
</header>
	
	<?php 
	if (is_category( )) {
		$cat = get_query_var('cat');
		$cat_name = get_category ($cat);
	 }
	?>
	
	<?php 
		if($cat_name->slug == 'faq') {
			get_template_part( 'content', 'faq-search' );
		} else { ?>
	<div class="search_result_page">
		<div id="content" class="wrapper clearfix" role="main">	
		
		<?php if ( have_posts() ) : ?>
		
		<?php if(isset($wp_query->query['category_name'])) { ?>
				<h2 class="page-title"><?php printf( __( 'Search Results ', 'reiziger' )); ?></h2>
				<?php echo '<div class="search-in category-search"><form role="search" method="get" id="searchform" class="search-form" action="'. home_url( '/' ).$cat_name->slug.'"/" >
					<input type="text" value="' . get_search_query() . '" name="s" id="s" class="s-in" placeholder="Search" />
					<input type="submit" id="searchsubmit" class="s-btn search-btn" value="'. esc_attr__('Go') .'" />
					</form></div>'; ?>
					
		<?php } else { ?>
				<!--<h3 class="page-title"><?php printf( __( 'Search Results for: %s', 'reiziger' ), get_search_query() ); ?></h3>-->
				<h2 class="page-title"><?php printf( __( 'Search Results', 'reiziger' )); ?></h2>
				<?php echo '<div class="search-in"><form role="search" method="get" id="searchform" class="search-form" action="' . home_url( '/' ) . '" >
					<input type="text" value="' . get_search_query() . '" name="s" id="s" class="s-in" placeholder="Search" />
					<input type="submit" id="searchsubmit" class="s-btn search-btn" value="'. esc_attr__('Go') .'" />
					</form></div>'; ?>
				
		<?php  } ?>
		
		<div class="total_pages">
			<?php echo $wp_query->found_posts." results found"; ?>
		</div>	
		<?php
		
			// Start the Loop.								
			 $skip_search_id = array(448,450,559,562,565,576,2277,2016,3073,3077,3093,3095,3097,3099,2036,2950,2952,2965,2967,2969,2971,8,26,30,227,228,229,233,738,771,750,839,840,841,844,2043,2301,2306,2351,2353,2356,2358,2041,2749,2757,2771,2773,2775,2778,2049,2591,2594,2605,2607,2609,2611,3641,4124,4126,4131,4145,4147,4150,4152);
			 
			while ( have_posts() ) : the_post();
				//print_r($page);
				if(in_array($post->ID,$skip_search_id)) {
					continue;
				} else {
				// echo $post->ID;
				/*
				 * Include the post format-specific template for the content. If you want to
				 * use this in a child theme, then include a file called called content-___.php
				 * (where ___ is the post format) and that will be used instead.
				 */
					get_template_part( 'content', 'search' );
				}

			endwhile;
			// Previous/next post navigation.
			// reiziger_paging_nav();
				
		
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
		</div><!-- #content -->
	</div>
<?php
	}
get_footer();
