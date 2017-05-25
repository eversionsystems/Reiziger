<?php
/**
 * The Header for our theme
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage Reiziger
 * @since Reiziger 1.0
 */
?><!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) & !(IE 8)]><!-->
<?php if ((is_page('landing-page'))&&(is_front_page())):
	$html_class = 'class="home-html"';
	else:
	$html_class = '';
	endif; ?>
<html <?php language_attributes(); ?> <?php echo $html_class; ?>>
<!--<![endif]-->
<head>

<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />

	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<!--<meta name="viewport" content="width=device-width">-->
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes"/>

	<link rel="icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico" type="image/x-icon" >
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<!--[if lt IE 9]>
	<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
	<![endif]-->
	<?php //Load Our extra stylesheet.
		
		wp_enqueue_style( 'reiziger-range', get_template_directory_uri() . '/css/jquery.range.css', array());
		wp_enqueue_style( 'reiziger-slider', get_template_directory_uri() . '/css/superslides.css', array());
		wp_enqueue_style( 'reiziger-style', get_stylesheet_uri() );
		wp_enqueue_style( 'reiziger-mainstyle', get_template_directory_uri() . '/css/template.css', array());
		wp_enqueue_style( 'reiziger-font-awesome', get_template_directory_uri() . '/css/font-awesome.css', array());
		wp_enqueue_style( 'reiziger-responsive', get_template_directory_uri() . '/css/responsive.css', array());
		
		
		
		
		if (!is_admin()) {
			// jQuery (optional loading via Google CDN)
			wp_deregister_script('jquery');
			wp_register_script('jquery', ('http://code.jquery.com/jquery-1.11.1.min.js'), false);  
			wp_enqueue_script('jquery');
		}
		
		wp_enqueue_script('jquery-ui', ('https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js'), false);
		wp_enqueue_script('reiziger-modernizr', get_template_directory_uri() . '/js/modernizr.custom.js', false);
		wp_enqueue_script('reiziger-scrolltofixed-script', get_template_directory_uri() . '/js/jquery-scrolltofixed.js', null, $ver=time(), true);
		wp_enqueue_script('reiziger-slider-script', get_template_directory_uri() . '/js/jquery.superslides.js', null, null, true);
		wp_enqueue_script('reiziger-dropdown-script', get_template_directory_uri() . '/js/jquery.dropdown.js', null, null, true);
		wp_enqueue_script('reiziger-range-script', get_template_directory_uri() . '/js/jquery.range.js', null, null, true);
		
		wp_head();
	?>
	<script type="text/javascript" language="javascript">
	jQuery(document).ready(function() {
		 jQuery(document).on('click','.steps', function(event) {
			event.preventDefault();
			var target = "#" + this.getAttribute('data-target');
			jQuery('.steps').removeClass('active');
			jQuery(this).toggleClass("active");
			jQuery('.table-slider').hide();
			//event.preventDefault();
			jQuery(target).show( "slide", {direction: "right", distance: "20%"  }, 500 );
		});
	});
	</script>
    
    <script type="text/javascript" language="javascript">
	jQuery(document).ready(function() {		
		jQuery(document).on('click','ul.lang-block li', function(event) {
			id = jQuery(this).attr('id');
			img = jQuery('.location').find("img.flag");
			path ="<?php echo get_template_directory_uri(); ?>/images/";
			jQuery(img).attr('src', path+id+'.png');
			/*jQuery('ul.lang-block').slideToggle( "slow" );*/
			/*jQuery('ul.lang-block').css("display", "none");*/
		});
	});
	</script>
    
    <script type="text/javascript">
	jQuery(document).ready(function() {
		jQuery(document).on('click','a.mygallery', function(event) {
			href = jQuery(this).attr('href');
			jQuery.ajax({
			  url: href,			  
			  success: function(data) {
				if (data){
				  window.location.reload(); // This is not jQuery but simple plain ol' JS
				}
			  }
			});
		});
	});
	</script>
	
	<?php if($_REQUEST['success'] == 1) { ?>
	
	<script type="text/javascript">
	jQuery(document).ready(function() {
	
		var appendthis =  ("<div class='modal-overlay'></div>");
		alert('hi');
		jQuery("body").append(appendthis);
		jQuery(".modal-overlay").fadeTo(10, 0.7);
		jQuery('#popup').fadeIn(10,function() { $(this).data() });
	  
	  
		jQuery(".js-modal-close").click(function() {
			var pageurl = $(this).attr('href');
			if(pageurl!=window.location){
				window.history.pushState({path:pageurl},'',pageurl);
			}
			
			jQuery(".modal-box, .modal-overlay").fadeOut(10, function() {
				jQuery(".modal-overlay").remove();
			});
			
			return false;
		});
	 
		jQuery(window).resize(function() {
		  jQuery(".modal-box").css({
			top: (jQuery(window).height() - jQuery(".modal-box").outerHeight()) / 2,
			left: (jQuery(window).width() - jQuery(".modal-box").outerWidth()) / 2
		  });
		});
	 
		jQuery(window).resize();
	 
	});
	</script>
	<?php } ?>
	
	
	<!-- inner page content popup--->
	
	<script type="text/javascript">
	jQuery(document).ready(function() {
		
		jQuery('#content-popup1').on("click",function(){
	
		alert('hi');
	/*	var appendthis =  ("<div class='modal-overlay'></div>");
		var id = $(this).attr('href');
		
		jQuery("body").append(appendthis);
		jQuery(".modal-overlay").fadeTo(10, 0.7);
		jQuery(id).fadeIn(10,function() { $(this).data() });
	  
	  
		jQuery(".js-modal-close").click(function() {
					
			jQuery(".modal-box, .modal-overlay").fadeOut(10, function() {
				jQuery(".modal-overlay").remove();
			});
			
			return false;
		});
	 
		jQuery(window).resize(function() {
		  jQuery(".modal-box").css({
			top: (jQuery(window).height() - jQuery(".modal-box").outerHeight()) / 2,
			left: (jQuery(window).width() - jQuery(".modal-box").outerWidth()) / 2
		  });
		});
	 
		jQuery(window).resize();*/
	 
	});
	});
	</script>
</head>

<body <?php body_class(); ?>>
	
	<?php if($_REQUEST['success'] == 1) { ?>
		<?php
			$current_url = explode("?", $_SERVER['REQUEST_URI']);
		?>
	<div id="popup" class="modal-box">  
		<header>
			<a href="<?php echo $current_url[0]; ?>" class="js-modal-close close">×</a>
		</header>
		<div class="modal-body">
			<p>Thanks for registering with Reiziger. <br> The Reiziger craftsmen will be in touch soon...</p>

		</div>
	</div>
	<?php } ?>
	
	<div class="main-body">
		<!-- Preloader -->
		<!--<div id="preloader">
			<div id="status">&nbsp;</div>
		</div>-->
		
	<?php if ( is_active_sidebar( 'top-header' ) ) : ?>
	<div class="head-top">
		<div class="wrapper clearfix">
			<?php dynamic_sidebar( 'top-header' ); ?>
		</div>
	</div>
	<?php endif; ?>
    
	<header id="fixmenu-desk" class="desk-header">
	<div class="midd-header">
		<div class="wrapper clearfix">
			<div class="logo">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
					<img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" alt="<?php bloginfo( 'name' ); ?>" />
				</a>
			</div>
			<!--<div class="scroll-nav"><a><img src="<?php echo get_template_directory_uri(); ?>/images/nav-bar.png" alt="" /></a></div>-->
			<!--<div class="desk-bar"></div>-->
            <div class="desk-bar1">
           <span class="ac-gn-menuicon-bread ac-gn-menuicon-bread-top">
						<span class="ac-gn-menuicon-bread-crust ac-gn-menuicon-bread-crust-top"></span> </span>
           <span class="ac-gn-menuicon-bread ac-gn-menuicon-bread-bottom">
						<span class="ac-gn-menuicon-bread-crust ac-gn-menuicon-bread-crust-bottom"></span> </span>
            </div>
			<div class="navication">
				<!--<div class="mobi-menu">
                   <div class="navi">
                            <div class="menu-box">
					<?php /*wp_nav_menu( array( 'theme_location' => 'mobile-menu','container' => '','container_class' => '', 'menu_class' => 'nav','menu_id' => 'mobi-menu') ); */?><?php //ubermenu( 'main' , array( 'menu' => 11 ) ); ?>
				</div>
                </div>
                </div> -->
				
				<div class="desk-menu">
				<?php wp_nav_menu( array( 'theme_location' => 'main-menu','container' => '','container_class' => '', 'menu_class' => 'nav','menu_id' => ' ') ); ?>
				</div>
								
				<div class="search">
					<?php get_search_form(); ?>
					<a class="search-icon"><i class="fa fa-search"></i></a>
				</div>
			</div>
			
			<!--<div class="scroll-navigate">
				<?php //wp_nav_menu( array( 'theme_location' => 'main-menu','container' => '','container_class' => '', 'menu_class' => 'nav','menu_id' => ' ') ); ?>
				<div class="search">
					<?php //get_search_form(); ?>
					<a href="#" class="search-icon"><i class="fa fa-search"></i></a>
				</div>
			</div>-->
		</div>
	</div>
</header>

<?php

global $post;
$terms = get_the_terms( $post->ID, 'product_cat' );
foreach ($terms as $term) 
{
	$product_cat_id = $term->term_id;
	$product_cat = $term->name;
	break;
}


	if($product_cat_id==143)
	{
		##Bloom Food 
		$content ="";
		$mypages = get_post(771);	
		$content = $mypages->post_content;
		if ( ! $content ) // Check for empty page
			continue;
			$content = apply_filters( 'the_content', $content );
		//echo $content;
		$content ="";
		$mypages = get_post(750);	
		$content = $mypages->post_content;
		if ( ! $content ) // Check for empty page
			continue;
			$content = apply_filters( 'the_content', $content );
		echo $content;	
	}

?>


<?php 
	global $post;
	if($post->post_parent == 8){ 
		$mypages = get_post(30);
		echo '<div class="inner-blue">';
		$content = $mypages->post_content;
		if ( ! $content ) // Check for empty page
			continue;
		$content = apply_filters( 'the_content', $content );
		echo $content;
		echo '</div>';
	} else if($post->post_parent == 288){ 
		$mypages = get_post(450);
		echo '<div class="inner-blue">';
		$content = $mypages->post_content;
		if ( ! $content ) // Check for empty page
			continue;
		$content = apply_filters( 'the_content', $content );
		echo $content;
		echo '</div>';
	} else if($post->post_parent == 738){ 
		$mypages = get_post(750);
		echo '<div class="inner-blue">';
		$content = $mypages->post_content;
		if ( ! $content ) // Check for empty page
			continue;
		$content = apply_filters( 'the_content', $content );
		echo $content;
		echo '</div>';
	} else if($post->post_parent == 2043){ 
		$mypages = get_post(2306);
		echo '<div class="inner-blue">';
		$content = $mypages->post_content;
		if ( ! $content ) // Check for empty page
			continue;
		$content = apply_filters( 'the_content', $content );
		echo $content;
		echo '</div>';
	}else if($post->post_parent == 2049){ 
		$mypages = get_post(2594);
		echo '<div class="inner-blue">';
		$content = $mypages->post_content;
		if ( ! $content ) // Check for empty page
			continue;
		$content = apply_filters( 'the_content', $content );
		echo $content;
		echo '</div>';
	}else if($post->post_parent == 2041){ 
		$mypages = get_post(2757);
		echo '<div class="inner-blue">';	
		$content = $mypages->post_content;
		if ( ! $content ) // Check for empty page
			continue;
		$content = apply_filters( 'the_content', $content );
		echo $content;
		echo '</div>';
	}else if($post->post_parent == 2036){ 
		$mypages = get_post(2952);
		echo '<div class="inner-blue">';	
		$content = $mypages->post_content;
		if ( ! $content ) // Check for empty page
			continue;
		$content = apply_filters( 'the_content', $content );
		echo $content;
		echo '</div>';
	}else if($post->post_parent == 2016){ 
		$mypages = get_post(3077);
		echo '<div class="inner-blue">';	
		$content = $mypages->post_content;
		if ( ! $content ) // Check for empty page
			continue;
		$content = apply_filters( 'the_content', $content );
		echo $content;
		echo '</div>';
	}
?>

	<header id="fixmenu-mobi" class="mobile-header">
	<div class="midd-header">
		<div class="wrapper clearfix">
			<div class="logo">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
					<img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" alt="<?php bloginfo( 'name' ); ?>" />
				</a>
			</div>
			
			<div class="mobile-bar">
			<a>
			<!--<span></span>
			<span></span>-->
            <div class="desk-bar2">
           <span class="ac-gn-menuicon-bread ac-gn-menuicon-bread-top">
						<span class="ac-gn-menuicon-bread-crust ac-gn-menuicon-bread-crust-top"></span> </span>
           <span class="ac-gn-menuicon-bread ac-gn-menuicon-bread-bottom">
						<span class="ac-gn-menuicon-bread-crust ac-gn-menuicon-bread-crust-bottom"></span> </span>
            </div>
            
			</a>
			</div>
			
			<div class="navication">
				<div class="mobi-menu">
					<div class="navi">
						<div class="menu-box">
							<?php ubermenu( 'main' , array( 'menu' => 11 ) ); ?>
						</div>
					</div>
                </div>
			</div>
		</div>
	</div>