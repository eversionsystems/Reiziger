<?php
/*
Template Name: Overview Page
*/


get_header(); ?><div class="bottom-header">
  <div class="wrapper clearfix" test85>
  <?php $mobile_menu = get_field('mobile_menu');
        $product_link = get_field('product_link');
   ?>
  
    <?php the_title( '<h3 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h3>' );	?>
    <div class="slide-nav"><a></a></div>
    <?php //echo $content = apply_filters( 'the_content', get_the_content());	?>
    <div><a href="<?php echo $product_link; ?>" class="buy-btn">Buy Now</a></div>
    <div class="cl"></div>
    <div class="navigation2">
	<?php echo wp_nav_menu( array( 'theme_location' => $mobile_menu,
							  'container' => '',
							  'container_class' => '', 
							  'menu_class' => 'nav',
							  'menu_id' => ' ') ); ?>
                         </div>
    
  </div>
</div>
</header>

<article id="post-<?php the_ID(); ?>" class="whole-page product_pages" test2585>
<?php if (have_posts()) : while (have_posts()) : the_post();?>
<?php the_content(); ?>
<?php endwhile; endif; ?>
</div>

<?php get_footer(); ?>