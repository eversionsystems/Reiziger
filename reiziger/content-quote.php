<?php
/**
 * The default template for displaying content
 *
 * Used for both single and index/archive/search.
 *
 * @package WordPress
 * @subpackage Reiziger
 * @since Reiziger 1.0
 */
?>
</header>
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

<?php echo '<div class="faq-help-banner inner">
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
    <?php if(function_exists('bcn_display'))
    {
        bcn_display();
    }?>
		</div>
    </div>

<div class="faq-section">
		<div class="wrapper clearfix">
	
	<!-- <div class="col-3 fl">
	<?php $categories = get_the_category( $post->ID );
	$thelist = '';
	$thelist .= '<ul class="post-categories">';
	foreach ( $categories as $category ) {
		if($category->slug == 'uncategorized')
			continue;
		$thelist .= "<li>";
		$thelist .= '<a href="' . esc_url( get_category_link( $category->term_id ) ) . '"  ' . $rel . '>';
		/*if ( $category->parent )
			$thelist .= get_category_parents( $category->parent, false, $separator );*/
		$thelist .= $category->name.'</a></li>';
	}
	$thelist .= '</ul>';
	echo $thelist;
	?>
	</div> -->
	
	<?php $categories = get_categories( array( 'child_of' => 96, 'orderby' => 'id', 'order'   => 'ASC' )); 
		
		if($categories) {
			echo '<div class="col-3 fl"><div class="faq-left-nav"><ul>';
			foreach($categories as $childcat) {					
				echo '<li><a href="'.get_category_link($childcat->cat_ID).'">'.$childcat->name.'</a></li>';
			}
		echo '</ul></div></div>';
		} ?>
		
	<div class="col-6">
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>	

		<?php	
			if ( is_single() ) :
				the_title( '<h3>', '</h3>' );
			else :
				the_title( '<h1 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h1>' );
			endif;
			
			the_content();
		
					wp_link_pages( array(
						'before'      => '<div class="page-links"><span class="page-links-title">' . __( 'Pages:', 'reiziger' ) . '</span>',
						'after'       => '</div>',
						'link_before' => '<span>',
						'link_after'  => '</span>',
					) );
				?>
		</article><!-- #post-## -->
	</div>
	
	<div class="col-3 fr"><div class="faq-right-nav">
	<h4>Related Questions</h4><ul>
	<?php
		/*$orig_post = $post;
		global $post;*/
		$tags = wp_get_post_tags($post->ID);
		 
		if ($tags) {
		$tag_ids = array();
		foreach($tags as $individual_tag) $tag_ids[] = $individual_tag->term_id;
		$args=array(
		'tag__in' => $tag_ids,
		'post__not_in' => array($post->ID),
		'posts_per_page'=>10, // Number of related posts to display.
		'caller_get_posts'=>1
		);
		 
		$my_query = new wp_query( $args );
	 
		while( $my_query->have_posts() ) {
		$my_query->the_post();
		?>
		 
		<li>
			<a rel="external" href="<? the_permalink()?>"><?php the_title(); ?></a>
		</li>
		 
		<? }
		}
		//$post = $orig_post;
		wp_reset_query();
		?></ul>
	</div></div>
</div>
</div>