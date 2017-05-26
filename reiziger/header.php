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
?>
<!DOCTYPE html>
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
<meta charset="<?php bloginfo( 'charset' ); ?>">
<!--<meta name="viewport" content="width=device-width">-->
<!--<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes"/>-->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
<!-- Chrome, Firefox OS and Opera -->
<meta name="theme-color" content="#F6A704">
<!-- Windows Phone -->
<meta name="msapplication-navbutton-color" content="#F6A704">
<!-- iOS Safari -->
<meta name="apple-mobile-web-app-status-bar-style" content="#F6A704">
<link rel="icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico" type="image/x-icon" >
<title>
<?php wp_title( '|', true, 'right' ); ?>
</title>
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NGPJZ8');</script>
<!-- End Google Tag Manager -->

<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
<!--[if lt IE 9]>
	<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
	<![endif]-->
<?php //Load Our extra stylesheet.

		wp_enqueue_style( 'reiziger-range', get_template_directory_uri() . '/css/jquery.range.css', array());
		//wp_enqueue_style( 'reiziger-slider', get_template_directory_uri() . '/css/superslides.css', array());
		?>
<link rel='stylesheet' id='reiziger-slider-css'  href='<?php echo get_template_directory_uri();?>/css/superslides.css?ver=<?php echo time(); ?>' type='text/css' media='all' />
<?php

		wp_enqueue_style( 'reiziger-style', get_stylesheet_uri() );
		//wp_enqueue_style( 'reiziger-mainstyle', get_template_directory_uri() . '/css/template.css', array());
		?>
<link rel='stylesheet' id='reiziger-mainstyle-css'  href='<?php echo get_template_directory_uri();?>/css/template.css?ver=<?php echo time(); ?>' type='text/css' media='all' />
<?php

		//wp_enqueue_style( 'reiziger-woocommerce-custom', get_template_directory_uri() . '/css/woocommerce.css', array());
		?>
<link rel='stylesheet' id='reiziger-woocommerce-custom'  href='<?php echo get_template_directory_uri();?>/css/woocommerce.css?ver=<?php echo time(); ?>' type='text/css' media='all' />
<?php

		wp_enqueue_style( 'reiziger-font-awesome', get_template_directory_uri() . '/css/font-awesome.css', array());
		//wp_enqueue_style( 'reiziger-responsive', get_template_directory_uri() . '/css/responsive.css', array());
		?>
<link rel='stylesheet' id='reiziger-responsive-css'  href='<?php echo get_template_directory_uri();?>/css/responsive.css?ver=<?php echo time(); ?>' type='text/css' media='all' />
<link rel='stylesheet' href='<?php echo get_template_directory_uri();?>/css/new_responsive.css?ver=<?php echo time(); ?>' type='text/css' media='all' />
<?php




		if (!is_admin()) {
			// jQuery (optional loading via Google CDN)
			wp_deregister_script('jquery');
			wp_register_script('jquery', ('http://code.jquery.com/jquery-1.11.1.min.js'), false);
			wp_enqueue_script('jquery');
		}

		wp_enqueue_script('jquery-ui', ('https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js'), false);
		wp_enqueue_script('recaptcha', ('https://www.google.com/recaptcha/api.js'), false);
		wp_enqueue_script('reiziger-modernizr', get_template_directory_uri() . '/js/modernizr.custom.js', false);
		wp_enqueue_script('reiziger-scrolltofixed-script', get_template_directory_uri() . '/js/jquery-scrolltofixed.js', null, time(), true);
		wp_enqueue_script('reiziger-slider-script', get_template_directory_uri() . '/js/jquery.superslides.js', null,null, true);
		wp_enqueue_script('reiziger-touch-script', get_template_directory_uri() . '/js/jquery.touchSwipe.js', null, null, true);
		//wp_enqueue_script('reiziger-dropdown-script', get_template_directory_uri() . '/js/jquery.dropdown.js', null, null, true);
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

<!-- Newslatter Thankyou Popup -->
<?php if(array_key_exists('success',$_REQUEST)){?>
<?php if($_REQUEST['success'] == 1) { ?>
<script type="text/javascript">
	jQuery(document).ready(function() {

		var appendthis =  ("<div class='modal-overlay'></div>");
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
<?php } ?>

<!-- inner page content popup--->

<script type="text/javascript">
	jQuery(document).ready(function() {

		jQuery('.content-popup').on("click",function(){

			var appendthis =  ("<div class='modal-overlay'></div>");
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

			jQuery(window).resize();

		});
	});
	</script>
<link rel='stylesheet' id='bootstrap-css'  href='<?php echo get_template_directory_uri();?>/bootstrap/bootstrap.css?ver=<?php echo time(); ?>' type='text/css' media='all' />
<link rel='stylesheet' href='<?php echo get_template_directory_uri();?>/disclaimer_modalbox/css/disclaimer_style.css?ver=<?php echo time(); ?>' type='text/css' media='all' />

<style>
.wrapper.vertical-align .col-md-4.center-block,
.wrapper.vertical-align .col-md-5.center-block,
.wrapper.vertical-align .col-md-6.center-block{
       top: 49%;
    left: 50%;
	-webkit-transform:translate(-50%,-60%);
	-moz-transform:translate(-50%,-60%);
	-o-transform:translate(-50%,-60%);
    transform: translate(-50%,-60%);

    position: absolute;    min-width: 300px;
}

.wrapper.vertical-align .col-md-4.center-block{ max-width:400px;}

</style>
</head>
<body <?php body_class(); ?>>
<?php if(array_key_exists('success',$_REQUEST)){?>
<?php if($_REQUEST['success'] == 1) { ?>
<?php $current_url = explode("?", $_SERVER['REQUEST_URI']);	?>
<div id="popup" class="modal-box">
  <header> <a href="<?php echo $current_url[0]; ?>" class="js-modal-close close"><i class="fa fa-times" aria-hidden="true"></i></a> </header>
  <div class="modal-body">
    <p>Thanks for registering with Reiziger. <br>
      The Reiziger craftsmen will be in touch soon...</p>
  </div>
</div>
	<?php } ?>
<?php } ?>
<div class="main-body">
<!-- Preloader --><!--<div id="preloader"><div id="status">&nbsp;</div></div>-->
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NGPJZ8"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<div class="head-top">
  <div class="wrapper clearfix">
	<?php if ( is_active_sidebar( 'top-header' ) ) :
				dynamic_sidebar( 'top-header' );
		else : ?>
    <ul>
      <li><span><a href="mailto:customercare@reiziger.com"><i class="fa fa-envelope-o"></i>customercare@reiziger.com</a></span> <span> <i class="fa fa-phone"></i> 1800 734 944</span> </li>
      <?php     $UserSignIn = 0;
                if(is_user_logged_in()){
				   $current_user = wp_get_current_user();
				   $currentUserId = $current_user->data->ID;

				   $user_info = get_userdata($currentUserId);
				   $LoggedInUserFirstName = $user_info->first_name;
				   $LoggedInUserLoginName = $current_user->data->user_login;

				   $NameForLogoutLink = "";

				   if(isset($LoggedInUserFirstName)){
				    $NameForLogoutLink = $LoggedInUserFirstName;
				   }else{
				    $NameForLogoutLink = $LoggedInUserLoginName;
				   }

				   $UserSignIn = 1;

                    ?>
      <li><a href="<?php echo get_home_url(); ?>/my-account" class=""><?php echo $NameForLogoutLink; ?></a> | <a href="<?php echo get_home_url(); ?>/my-account/customer-logout/" class="">Logout</a></li>
      <?php
                } else {
                    ?>
      <li><a href="<?php echo get_home_url(); ?>/my-account" class="">Login</a></li>
      <?php
                }
                ?>
      <li>
        <div class="location">Set location <img class="flag" src="<?php echo get_template_directory_uri(); ?>/images/aus.png">
          <ul class="lang-block">
            <li id="aus"><img src="<?php echo get_template_directory_uri(); ?>/images/aus.png"> Australia</li>
            <li id="nz"><img src="<?php echo get_template_directory_uri(); ?>/images/nz.png"> New Zealand</li>
          </ul>
        </div>
      </li>
      <li> <a href="https://www.facebook.com/ReizigerHolland" target="_blank"><i class="fa fa-facebook"></i></a> </li>
    </ul>
	<?php endif; ?>
  </div>
</div>

<header id="fixmenu-desk" class="desk-header">
  <div class="midd-header">
    <div class="wrapper clearfix">
      <div class="logo">
       <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
        <img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" alt="<?php bloginfo( 'name' ); ?>" />
       </a>
      </div>
      <div class="desk-bar1">
       <span class="ac-gn-menuicon-bread ac-gn-menuicon-bread-top"><span class="ac-gn-menuicon-bread-crust ac-gn-menuicon-bread-crust-top"></span> </span> <span class="ac-gn-menuicon-bread ac-gn-menuicon-bread-bottom"> <span class="ac-gn-menuicon-bread-crust ac-gn-menuicon-bread-crust-bottom"></span></span>
      </div>
      <div class="navication">
        <div class="desk-menu">
          <?php wp_nav_menu(array('theme_location' => 'main-menu',
		                          'container' => '',
								  'container_class' => '',
								  'menu_class' => 'nav',
								  'menu_id' => ' ')); ?>
        </div><!-- .desk-menu-->
        <div class="search"><?php get_search_form(); ?>
         <a class="search-icon"><img src="<?php echo get_template_directory_uri();?>/images/reg_magnifier.png"></a>
        </div><!-- .search-->
        <?php global $woocommerce;
				$cart_url = $woocommerce->cart->get_cart_url();
				$cart_empty_class = '';
				if(($woocommerce->cart->cart_contents_count)==0){$cart_empty_class = 'cartisempty';} ?>
         <a href="<?php echo $cart_url?>" class="procount <?php echo $cart_empty_class; ?>">
          <span class="cart-count"> <?php echo $woocommerce->cart->cart_contents_count; ?></span>
         </a>
<?php //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ?>
<?php //if($_SERVER['REMOTE_ADDR']=='113.193.235.133'){  ?>
<style>
.cart_menu {
    border: 0px solid #d6d6d6;
    position: absolute;
    width: 250px;
    z-index: 99 !important;
    background: #f9f9f9;
    top: 85px;
    right: -40px;
    box-shadow: 0 0 20px rgba(0,0,0,.15);
    border-top: 1px solid #e0e0e0 !important;
}
header#fixmenu-desk.scroll-to-fixed-fixed .cart_menu{top: 44px !important;}
.cart_menu .cart_menu_inner_wrapper{padding: 0 20px;}
.cart_menu .cart_menu_inner_wrapper ul{ padding:0px; list-style:none;}
.cart_menu .cart_menu_inner_wrapper ul li{margin: 0;padding: 0;border-top: 1px solid #e3e3e3;}
.cart_menu .cart_menu_inner_wrapper ul li:first-child { border-top-style: none;}
.cart_menu .cart_menu_inner_wrapper ul li a {
    color: #606060;
    display: block;
    line-height: 35px;
    padding: 0 5px;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all 0.1s ease-in-out;
}

.cart_menu .cart_menu_inner_wrapper ul li a:hover{ color:#f7a800;}
.ac-gn-bagview-message {
    color: #999;
    line-height: 90px;
    margin: 0;
    text-align: center;
}
</style>
<div class="cart_menu" style="display:none;">
 <div class="cart_menu_inner_wrapper">
  <ul>
   <li><a href="<?php echo $cart_url?>">Bag (<?php echo $woocommerce->cart->cart_contents_count; ?>)</a></li>
   <li><a href="<?php echo get_home_url(); ?>/my-account/view-order/">Orders</a></li>
   <li><a href="<?php echo get_home_url(); ?>/my-account">Account</a></li>
   <?php if($UserSignIn==1){?>
   <li><a href="<?php echo get_home_url(); ?>/my-account/customer-logout/">Sign out</a></li>
   <?php }else{ ?>
   <li><a href="<?php echo get_home_url(); ?>/my-account">Sign in</a></li>
   <?php } ?>
  </ul>
 </div>
</div>
<script>
$("a.procount").hover(function(){ $(".cart_menu").slideDown(); });
$(".cart_menu,header#fixmenu-desk").mouseleave(function(){ $(".cart_menu").slideUp();});
$("ul#ubermenu-nav-main-2-main-menu").hover(function(){ $(".cart_menu").slideUp(); });
</script>

<?php //} ?>
<?php //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~?>

        </div><!-- .navication-->
    </div><!-- .wrapper clearfix-->
  </div><!-- .midd-header-->
</header>
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
	}
	else if($post->post_parent == 288){
		$mypages = get_post(450);
		echo '<div class="inner-blue">';
		$content = $mypages->post_content;
		if ( ! $content ) // Check for empty page
			continue;
		$content = apply_filters( 'the_content', $content );
		echo $content;
		echo '</div>';
	}
	else if($post->post_parent == 738){
		$mypages = get_post(750);
		echo '<div class="inner-blue">';
		$content = $mypages->post_content;
		if ( ! $content ) // Check for empty page
			continue;
		$content = apply_filters( 'the_content', $content );
		echo $content;
		echo '</div>';
	}
	else if($post->post_parent == 2043){
		$mypages = get_post(2306);
		echo '<div class="inner-blue">';
		$content = $mypages->post_content;
		if ( ! $content ) // Check for empty page
			continue;
		$content = apply_filters( 'the_content', $content );
		echo $content;
		echo '</div>';
	}
	else if($post->post_parent == 2049){
		$mypages = get_post(2594);
		echo '<div class="inner-blue">';
		$content = $mypages->post_content;
		if ( ! $content ) // Check for empty page
			continue;
		$content = apply_filters( 'the_content', $content );
		echo $content;
		echo '</div>';
	}
	else if($post->post_parent == 2041){
		$mypages = get_post(2757);
		echo '<div class="inner-blue">';
		$content = $mypages->post_content;
		if ( ! $content ) // Check for empty page
			continue;
		$content = apply_filters( 'the_content', $content );
		echo $content;
		echo '</div>';
	}
	else if($post->post_parent == 2036){
		$mypages = get_post(2952);
		echo '<div class="inner-blue">';
		$content = $mypages->post_content;
		if ( ! $content ) // Check for empty page
			continue;
		$content = apply_filters( 'the_content', $content );
		echo $content;
		echo '</div>';
	}
	else if($post->post_parent == 2016){
		$mypages = get_post(3077);
		echo '<div class="inner-blue">';
		$content = $mypages->post_content;
		if ( ! $content ) // Check for empty page
			continue;
		$content = apply_filters( 'the_content', $content );
		echo $content;
		echo '</div>';
	}
	else if($post->post_parent == 4124){
		$mypages = get_post(4131);
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
    <div class="logo"> <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"> <img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" alt="<?php bloginfo( 'name' ); ?>" /> </a> </div>
    <div class="navication" style="display: block !important;">
      <div class="mobi-menu">
        <div class="navi">
          <div class="menu-box">
            <?php ubermenu( 'main' , array( 'menu' => 11 ) ); ?>
          </div>
        </div>
      </div>
      <?php global $woocommerce;
				      $cart_url = $woocommerce->cart->get_cart_url();
					  if($woocommerce->cart->cart_contents_count==0){ $cart_empty_class = 'cartisempty'; }

					  ?>
      <a href="<?php echo $cart_url?>" class="procount <?php echo $cart_empty_class; ?>"><span class="cart-count <?php echo $cart_empty_class; ?>">
      <?php if(($woocommerce->cart->cart_contents_count)>0){ echo $woocommerce->cart->cart_contents_count; }?>
      </span></a>

<?php //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ?>
<?php //if($_SERVER['REMOTE_ADDR']=='113.193.235.133'){  ?>
<style>
.cart_menu_mobile {
    border: 0px solid #ffffff;
    position: absolute;
    width: 106%;
    z-index: 99 !important;
    background: #ffffff;
    top: 43px;
    left: -2.6%;
    box-shadow: 0 0 20px rgba(0,0,0,.15);
    border-top: 1px solid #e0e0e0 !important;
}
header#fixmenu-desk.scroll-to-fixed-fixed .cart_menu{top: 44px !important;}
.cart_menu_mobile .cart_menu_inner_wrapper{padding: 0 20px;}
.cart_menu_mobile .cart_menu_inner_wrapper ul{ padding:0px; list-style:none;}
.cart_menu_mobile .cart_menu_inner_wrapper ul li{margin: 0;padding: 0;border-top: 1px solid #e3e3e3;}
.cart_menu_mobile .cart_menu_inner_wrapper ul li:first-child { border-top-style: none;}
.cart_menu_mobile .cart_menu_inner_wrapper ul li a {
    color: #606060;
    display: block;
    line-height: 35px;
    padding: 0 5px;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all 0.1s ease-in-out;
}
.cart_menu_mobile .cart_menu_inner_wrapper ul li a:hover{color:#f7a800;}
</style>
<div class="cart_menu_mobile" style="display:none;">
 <div class="cart_menu_inner_wrapper">
  <ul>
   <li><a href="<?php echo $cart_url?>">Bag (<?php echo $woocommerce->cart->cart_contents_count; ?>)</a></li>
   <li><a href="<?php echo get_home_url(); ?>/my-account/view-order/">Orders</a></li>
   <li><a href="<?php echo get_home_url(); ?>/my-account">Account</a></li>
   <?php if($UserSignIn==1){?>
   <li><a href="<?php echo get_home_url(); ?>/my-account/customer-logout/">Sign out</a></li>
   <?php }else{ ?>
   <li><a href="<?php echo get_home_url(); ?>/my-account">Sign in</a></li>
   <?php } ?>
  </ul>
 </div>
</div>
<script>
$(".navication a.procount").hover(function(){ $(".cart_menu_mobile").slideDown(); });
$(".cart_menu_mobile,header#fixmenu-desk").mouseleave(function(){ $(".cart_menu_mobile").slideUp();});
$("ul#ubermenu-nav-main-11").hover(function(){ $(".cart_menu_mobile").slideUp(); });
</script>

<?php //} ?>
<?php //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~?>
     </div><!-- .navication-->
  </div>
</div>
<script>
jQuery(window).load(function(){
 if(jQuery(window).width() <= 765){
	 var naviHeight = jQuery('header#fixmenu-mobi div.midd-header').height();
	 var newNavHeight = naviHeight+7;
	 var page_win_width = jQuery(window).width();
 }
});


jQuery(window).resize(function(){
if(jQuery(window).width() <= 765){
	 var naviHeight = jQuery('header#fixmenu-mobi div.midd-header').height();
	 var newNavHeight = naviHeight+7;
	 var page_win_width = jQuery(window).width();
 }
});
</script>

