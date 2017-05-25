<?php
/**
 * The template for displaying posts in the Video post format
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
	  
<div class="help-banner">


<div class="help-banner-text">
<div class="wrapper">
<article>
<center>
<div class="icon"><img src="http://www.reiziger.com/wp-content/uploads/2016/01/icon2.png"></div>
<span>Reiziger TV</span>
</center>
<h2>Helping growers maintain<br>
better gardens.</h2>
</article>
</div>


</div>
<img src="http://www.reiziger.com/wp-content/uploads/2016/01/tv.jpg">
</div>

<div id="reziger-article" class="section-help-ariticles section-help-tv-new single">
<div class="wrapper clearfix">

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="left-img"><?php reiziger_post_thumbnail(); ?></div>
	<div class="right-image-side">
	<div class="entry-header">
		<?php 
			if ( is_single() ) :
				the_title( '<h1 class="entry-title">', '</h1>' );
			else :
				the_title( '<h1 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h1>' );
			endif;
		?>

		<div class="entry-meta"><?php
				edit_post_link( __( 'Edit', 'reiziger' ), '<span class="edit-link">', '</span>' );
			?>
		</div><!-- .entry-meta -->
	</div><!-- .entry-header -->


	<div class="entry-content">
		<?php
			the_content();

			/*wp_link_pages( array(
				'before'      => '<div class="page-links"><span class="page-links-title">' . __( 'Pages:', 'reiziger' ) . '</span>',
				'after'       => '</div>',
				'link_before' => '<span>',
				'link_after'  => '</span>',
			) );*/
		?>
	</div><!-- .entry-content-->
	</div>
</article><!-- #post-## -->
</div>
</div>