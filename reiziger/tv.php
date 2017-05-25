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
 
if(is_active_sidebar('help-center')) {
	dynamic_sidebar('help-center');
} ?>       	
<div id="reziger-article" class="section-help-ariticles section-help-tv-new">
<div class="wrapper clearfix">
			<?php
                if ( get_query_var('paged') ) { $paged = get_query_var('paged'); }
                elseif ( get_query_var('page') ) { $paged = get_query_var('page'); }
                else { $paged = 1; }
                ?>
				<?php  //query_posts('category_name=rieziger-tv&showposts=4'.'&paged='.$paged); ?>

			<?php if ( have_posts() ) : ?>

			<?php
					
							
					// Start the Loop.	
					$counter=0;
					
					while ( have_posts() ) : the_post();
							
					if($counter % 2	== "0")
						{
							$class = " fl";
							
						}else{
							$class= " fr";
						}
					/*
					 * Include the post format-specific template for the content. If you want to
					 * use this in a child theme, then include a file called called content-___.php
					 * (where ___ is the post format) and that will be used instead.
					 */
					// get_template_part( 'content', get_post_format() );
					
					echo "<div class='col-6".$class."'>";
						get_template_part( 'latest-post-tv');
					echo "</div>";		 

					$counter++;
					
					if($counter % 2 == 0){echo '<div class="cl"></div>';}
				
					endwhile;
					// Previous/next page navigation.
					// reiziger_paging_nav();
					
					echo "<div class='pagination'>";
					echo"<div class='page-link'>". previous_posts_link()."</div>";
					echo"<div class='page-link'>". next_posts_link()."</div>"; 						
					echo "</div>";



				else :
					// If no content, include the "No posts found" template.
					get_template_part( 'content', 'none' );

				endif;
			?>
	
</div>
</div>