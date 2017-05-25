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
    <div class="slide-nav"><a></a></div>
    <?php the_content();	?>
  </div>
</div>
</header>
<article id="post-<?php the_ID(); ?>" class="whole-page">
  <?php //post_class(); ?>
  <?php 
		$pages = get_pages( array( 'child_of' => $post->ID , 'sort_column' => 'menu_order', 'sort_order' => 'asc') );
		/*43,52,63,66,67,227,228,229*//*559,562,565*/
		$skipids = array(52,63,66,67,227,228,229,477,481,490,494,559,562,565,780,793,795,796,839,840,841);
		foreach($pages as $page) {
			//print_r($page);
			if(in_array($page->ID,$skipids)) {
				continue;
			}
			$content = $page->post_content;
			if ( ! $content ) // Check for empty page
				continue;
			$content = apply_filters( 'the_content', $content );
			echo $content;
		} ?>
<!-------------------------------------------------------------------------->
<div id="section_7" class="sec7 batch section_div">
  <div class="bg-img">
    <div class="wrapper_sec7">
      <h1>Check your batch number.</h1>
      <p>All Reiziger products contain a batch number which is printed on the bag. The batch number consist of a whole bunch of letters/numbers. You only need 6 digits to use this tool. Enter the second last sequence (example: CCL XXXXXX - XX:XX - 010114 - XXX) below and the results from the test of your very own batch will come up!</p>
      <p>Research analysis can be found of the substrates produced after the 1st of January 2016.</p>
    
      <div class="serach_go_section">
        <form action="#batch_search_result" method="post">
          <input type="text" class="search_go_txt" name="search_batch" placeholder="Enter your batch number here">
          <input type="submit" value="go" class="search_go_btn" />
        </form>
      </div>
      <!-- .serach_go_section-->
       <?php if($_POST){?>
      <h1 id="batch_search_result">Your Batch Report</h1>
      <div class="latest_report_div">
        <div class="table-responsive">
          <table class="table latestreport" cellspacing="0">
            <thead>
              <tr>
                <th>Title</th>
                <th>Batch Number</th>
                <th>Product</th>
                <th>Analysis Date</th>
                <th>Researcher</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Analysis Report</td>
                <td>Batch 291014</td>
                <td>Grow Food A&B </td>
                <td>09/07/16</td>
                <td>D:Fredericks</td>
                <td><a href="http://dev.reiziger.com/wp-content/themes/reiziger/images/demopdf.pdf" target="_blank"><i class="fa fa-download"></i></a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- .latest_report_div--> 
      <!-- chart section here...-->
      <div class="latest_report_graph">
        <div class="left_graph"><img src="http://dev.reiziger.com/wp-content/themes/reiziger/images/graph01.jpg"></div>
        <div class="right_graph"><img src="http://dev.reiziger.com/wp-content/themes/reiziger/images/graph02.jpg"></div>
        <div class="left_graph"><img src="http://dev.reiziger.com/wp-content/themes/reiziger/images/graph03.jpg"></div>
        <div class="right_graph"><img src="http://dev.reiziger.com/wp-content/themes/reiziger/images/graph04.jpg"></div>
        <div class="left_graph"><img src="http://dev.reiziger.com/wp-content/themes/reiziger/images/graph05.jpg"></div>
        <div class="right_graph"><img src="http://dev.reiziger.com/wp-content/themes/reiziger/images/graph06.jpg"></div>
        <div class="left_graph"><img src="http://dev.reiziger.com/wp-content/themes/reiziger/images/graph07.jpg"></div>
        <div class="right_graph"></div>
      </div>
      <!-- .chart section end here..-->
      
      <?php } ?>
      <div class="clear"></div>
      <h1>Latest Batch Report</h1>
      <div class="latest_report_div">
        <div class="table-responsive">
          <table class="table latestreport2" cellspacing="0">
            <thead>
              <tr>
                <th>Title</th>
                <th>Batch Number</th>
                <th>Product</th>
                <th>Analysis Date</th>
                <th>Researcher</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Analysis Report</td>
                <td>Batch 291014</td>
                <td>Grow Food A&B </td>
                <td>09/07/16</td>
                <td>D:Fredericks</td>
                <td><a href="http://dev.reiziger.com/wp-content/themes/reiziger/images/demopdf.pdf" target="_blank"><i class="fa fa-download"></i></a></td>
              </tr>
              <tr>
                <td>Analysis Report</td>
                <td>Batch 291013</td>
                <td>Grow Food A&B </td>
                <td>08/07/16</td>
                <td>D:Fredericks</td>
                <td><a href="http://dev.reiziger.com/wp-content/themes/reiziger/images/demopdf.pdf" target="_blank"><i class="fa fa-download"></i></a></td>
              </tr>
              <tr>
                <td>Analysis Report</td>
                <td>Batch 291012</td>
                <td>Grow Food A&B </td>
                <td>07/07/16</td>
                <td>D:Fredericks</td>
                <td><a href="http://dev.reiziger.com/wp-content/themes/reiziger/images/demopdf.pdf" target="_blank"><i class="fa fa-download"></i></a></td>
              </tr>
              <tr>
                <td>Analysis Report</td>
                <td>Batch 291011</td>
                <td>Grow Food A&B </td>
                <td>06/07/16</td>
                <td>D:Fredericks</td>
                <td><a href="http://dev.reiziger.com/wp-content/themes/reiziger/images/demopdf.pdf" target="_blank"><i class="fa fa-download"></i></a></td>
              </tr>
              <tr>
                <td>Analysis Report</td>
                <td>Batch 291010</td>
                <td>Grow Food A&B </td>
                <td>09/07/15</td>
                <td>D:Fredericks</td>
                <td><a href="http://dev.reiziger.com/wp-content/themes/reiziger/images/demopdf.pdf" target="_blank"><i class="fa fa-download"></i></a></td>
              </tr>
              <tr>
                <td>Analysis Report</td>
                <td>Batch 291009</td>
                <td>Grow Food A&B </td>
                <td>09/07/15</td>
                <td>D:Fredericks</td>
                <td><a href="http://dev.reiziger.com/wp-content/themes/reiziger/images/demopdf.pdf" target="_blank"><i class="fa fa-download"></i></a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- .latest_report_div--> 
      
    </div>
    <!-- .wrapper_sec7--> 
  </div>
  <!-- .bg-img--> 
</div>
<!-- #section_7--> 
<!---------------------------------------------------------------------------->


		
		
		<?php
		wp_link_pages( array(
			'before'      => '<div class="page-links"><span class="page-links-title">' . __( 'Pages:', 'reiziger' ) . '</span>',
			'after'       => '</div>',
			'link_before' => '<span>',
			'link_after'  => '</span>',
		) );
	?>
</article>