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

get_header(); ?>

</header>
	<div id="fixmenu1" class="navigation3 topfixedmenu faqmenu">
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

<?php				
if( is_category( 96 ) ) {
	get_template_part( 'faq' );
} else if(cat_is_ancestor_of(96 , $cat)){
	get_template_part( 'faq-questions' );
}else if( is_category( 97 ) ) {
	get_template_part( 'tv' );
}else {
?>
			
     <?php 
	 
	 if(is_active_sidebar('help-center')) {	dynamic_sidebar('help-center');	}
	 
	 ?>       	
<div id="reziger-article" class="section-help-ariticles section-help-ariticles-new">
<div class="wrapper clearfix">
				<?php
                if ( get_query_var('paged') ) { $paged = get_query_var('paged'); }
                elseif ( get_query_var('page') ) { $paged = get_query_var('page'); }
                else { $paged = 1; }
                ?>
				<?php //query_posts('category_name=reiziger-articles&showposts=6'.'&paged='.$paged); ?>

			<?php if ( have_posts() ) : ?>

			<?php
					
							
					// Start the Loop.	
					$counter=0;
					
					while ( have_posts() ) : the_post();

					/*
					 * Include the post format-specific template for the content. If you want to
					 * use this in a child theme, then include a file called called content-___.php
					 * (where ___ is the post format) and that will be used instead.
					 */
					// get_template_part( 'content', get_post_format() );
			
						 get_template_part( 'latest-post');

					$counter++;
					
					if($counter % 3 == 0){echo '<div class="cl"></div>';}
				
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

<?php
}
get_footer();