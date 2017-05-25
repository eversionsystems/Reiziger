

<div class="col-3">

	<?php if ( has_post_thumbnail() ) :?> 
		<div class="pull-img">
			<?php reiziger_post_thumbnail(); ?>
          </div>
	<?php endif; ?>
	
	<p>
		<?php 			
			// print_r($post);
			$page_ID = $post->ID;
			$content = $post->post_content;
			// print_r($content);
			
			$content = apply_filters( 'the_content', $content );
			//$search_results= substr($content,0,350);
			$search_results= $post->post_title;
			echo "<a href=".get_page_link( $page_ID )." class='read-more-link'>$search_results</a>";

		 ?>
			
	</p><!-- .entry-summary -->
	</div>
