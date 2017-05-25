<?php
/**
 * The template for displaying 404 pages (Not Found)
 *
 * @package WordPress
 * @subpackage Reiziger
 * @since Reiziger 1.0
 */

get_header(); ?>
</header>
	<div id="primary" class="content-area">
		<div id="content" class="site-content" role="main">

				<h3 class="page-title"><?php _e( 'Not Found', 'reiziger' ); ?></h3>

			<div class="page-content">
				<p><?php _e( 'It looks like nothing was found at this location. Maybe try a search?', 'reiziger' ); ?></p>

				<?php get_search_form(); ?>
			</div><!-- .page-content -->

		</div><!-- #content -->
	</div><!-- #primary -->

<?php
get_footer();
