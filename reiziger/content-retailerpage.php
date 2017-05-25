<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Reiziger
 * @since Reiziger 1.0
 */
?>

<div class="bottom-header">
		<div class="wrapper clearfix">
			<?php the_title( '<h3 class="entry-title">', '</h3>' );	?>
			
			<?php //echo $content;	?>
            <div></div>
            <div class="cl"></div>
            <div class="navigation2"></div>
		</div>
	</div>

</header>

<article id="post-<?php the_ID(); ?>" class="whole-page"><?php //post_class(); ?>
<!-- desktop Menu-->
<div class="navigation3 topfixedmenu zz" id="fixmenu1">
<div class="wrapper clearfix">
<?php the_title( '<h3 class="entry-title">', '</h3>' );	?>
    <div></div>
    <div class="navi-mobile-center"></div>
  </div>
</div>	
	<?php
		//edit_post_link( __( 'Edit', 'reiziger' ), '<span class="edit-link">', '</span>' );
		the_content();

	
		wp_link_pages( array(
			'before'      => '<div class="page-links"><span class="page-links-title">' . __( 'Pages:', 'reiziger' ) . '</span>',
			'after'       => '</div>',
			'link_before' => '<span>',
			'link_after'  => '</span>',
		) );
	
	?>
</article><!-- #post-## -->