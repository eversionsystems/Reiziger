<!-- 	<?php if ( has_post_thumbnail() ) :?>
		<div class="pull-img">
			<?php reiziger_post_thumbnail(); ?>
    </div>
	<?php endif; ?>
 -->
	<div class="entry-summary">
		<?php
			 //print_r($post);
			$page_ID = $post->ID;
			$content = $post->post_content;
			 //print_r($content);

			$content = apply_filters( 'the_content', $content );
			$search_results= substr($content,0,350);
			echo "<a href=".get_page_link( $page_ID )." class='read-more-link'>$content</a>";

		 ?>

		 <i class="genericon genericon-video tv-listing-play-button"></i>

		 <div class="video-title"><?php echo $post->post_title;?></div>

	</div><!-- .entry-summary -->
