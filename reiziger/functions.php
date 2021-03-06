<?php
/**
 * Reiziger functions and definitions
 *
 * Set up the theme and provides some helper functions, which are used in the
 * theme as custom template tags. Others are attached to action and filter
 * hooks in WordPress to change core functionality.
 *
 * When using a child theme you can override certain functions (those wrapped
 * in a function_exists() call) by defining them first in your child theme's
 * functions.php file. The child theme's functions.php file is included before
 * the parent theme's file, so the child theme functions would be used.
 *
 * @link https://codex.wordpress.org/Theme_Development
 * @link https://codex.wordpress.org/Child_Themes
 *
 * Functions that are not pluggable (not wrapped in function_exists()) are
 * instead attached to a filter or action hook.
 *
 * For more information on hooks, actions, and filters,
 * @link https://codex.wordpress.org/Plugin_API
 *
 * @package WordPress
 * @subpackage Reiziger
 * @since Reiziger 1.0
 */
/**
 * Set up the content width value based on the theme's design.
 *
 * @see reiziger_content_width()
 *
 * @since Reiziger 1.0
 */
if ( ! isset( $content_width ) ) {
	$content_width = 474;
}
/* Function which remove Plugin Update Notices – Askimet*/
/*function disable_plugin_updates( $value ) {
   unset( $value->response['wp-store-locator/wp-store-locator.php'] );
   unset( $value->response['wonderplugin-lightbox/wonderpluginlightbox.php'] );
   unset( $value->response['download-manager/download-manager.php'] );
   return $value;
}
add_filter( 'site_transient_update_plugins', 'disable_plugin_updates' );*/
function theme_favicon() {
	if (is_file(TEMPLATEPATH . '/favicon.ico')):
		?><link rel="shortcut icon" href="<?php bloginfo('template_directory'); ?>/favicon.ico" /><?php
	endif;
}
add_action('wp_head', 'theme_favicon');
add_action('admin_head', 'theme_favicon');
add_action('login_head', 'theme_favicon');
/**
 * Reiziger only works in WordPress 3.6 or later.
 */
if ( version_compare( $GLOBALS['wp_version'], '3.6', '<' ) ) {
	require get_template_directory() . '/inc/back-compat.php';
}
if ( ! function_exists( 'reiziger_setup' ) ) :
/**
 * Reiziger setup.
 *
 * Set up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support post thumbnails.
 *
 * @since Reiziger 1.0
 */
function reiziger_setup() {
	/*
	 * Make Reiziger available for translation.
	 *
	 * Translations can be added to the /languages/ directory.
	 * If you're building a theme based on Reiziger, use a find and
	 * replace to change 'reiziger' to the name of your theme in all
	 * template files.
	 */
	load_theme_textdomain( 'reiziger', get_template_directory() . '/languages' );
	// This theme styles the visual editor to resemble the theme style.
	add_editor_style( array( 'css/editor-style.css', reiziger_font_url(), 'genericons/genericons.css' ) );
	// Add RSS feed links to <head> for posts and comments.
	add_theme_support( 'automatic-feed-links' );
	// Enable support for Post Thumbnails, and declare two sizes.
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 672, 372, true );
	add_image_size( 'reiziger-full-width', 1038, 576, true );
	// This theme uses wp_nav_menu() in two locations.
	register_nav_menus( array(
		'main-menu'   => __( 'Main Menu', 'reiziger' ),
		'mobile-menu'   => __( 'Mobile Menu', 'reiziger' ),
		'product-menu1' => __( 'Grow Food A&B Menu', 'reiziger' ),
		'product-menu2' => __( 'Root Booster Menu', 'reiziger' ),
		'product-menu3' => __( 'Bloom Food A&B Menu', 'reiziger' ),
		'product-menu4' => __( 'Peat Mix Menu', 'reiziger' ),
		'product-menu5' => __( 'Coco Coir Pith Menu', 'reiziger' ),
		'product-menu6' => __( 'Expanded Clay Menu', 'reiziger' ),
		'product-menu7' => __( 'Bloom Minerals Menu', 'reiziger' ),
		'product-menu8' => __( 'Grow Booster Menu', 'reiziger' ),
		'product-menu9' => __( 'Bud Booster Menu', 'reiziger' ),
		'footer-menu1' => __( 'Footer Menu 1', 'reiziger' ),
		'footer-menu2' => __( 'Footer Menu 2', 'reiziger' ),
		'footer-menu3' => __( 'Footer Menu 3', 'reiziger' ),
		'footer-menu4' => __( 'Footer Menu 4', 'reiziger' ),
		'footer-menu5' => __( 'Footer Menu 5', 'reiziger' ),
		'footer-menu6' => __( 'Footer Menu 6', 'reiziger' ),
		'footer-menu7' => __( 'Footer Menu 7', 'reiziger' ),
		'footer-menu8' => __( 'Footer Menu 8', 'reiziger' ),
		'footer-menu9' => __( 'Footer Menu 9', 'reiziger' ),
		'footer-menu10' => __( 'Footer Menu 10', 'reiziger' ),
		'footer-menu11' => __( 'Footer Menu 11', 'reiziger' ),
		'footer-menu12' => __( 'Footer Menu 12', 'reiziger' ),                
        'batch-analysis' => __( 'Batch Analysis', 'reiziger' ),
		'help-center' => __( 'Help Center', 'reiziger' ),
	) );
	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form', 'comment-form', 'comment-list', 'gallery', 'caption'
	) );
	/*
	 * Enable support for Post Formats.
	 * See https://codex.wordpress.org/Post_Formats
	 */
	add_theme_support( 'post-formats', array(
		'aside', 'image', 'video', 'audio', 'quote', 'link', 'gallery',
	) );
	// This theme allows users to set a custom background.
	add_theme_support( 'custom-background', apply_filters( 'reiziger_custom_background_args', array(
		'default-color' => 'f5f5f5',
	) ) );
	// Add support for featured content.
	add_theme_support( 'featured-content', array(
		'featured_content_filter' => 'reiziger_get_featured_posts',
		'max_posts' => 6,
	) );
	// This theme uses its own gallery styles.
	add_filter( 'use_default_gallery_style', '__return_false' );
}
endif; // reiziger_setup
add_action( 'after_setup_theme', 'reiziger_setup' );
/**
 * Adjust content_width value for image attachment template.
 *
 * @since Reiziger 1.0
 */
function reiziger_content_width() {
	if ( is_attachment() && wp_attachment_is_image() ) {
		$GLOBALS['content_width'] = 810;
	}
}
add_action( 'template_redirect', 'reiziger_content_width' );
/**
 * Getter function for Featured Content Plugin.
 *
 * @since Reiziger 1.0
 *
 * @return array An array of WP_Post objects.
 */
function reiziger_get_featured_posts() {
	/**
	 * Filter the featured posts to return in Reiziger.
	 *
	 * @since Reiziger 1.0
	 *
	 * @param array|bool $posts Array of featured posts, otherwise false.
	 */
	return apply_filters( 'reiziger_get_featured_posts', array() );
}
/**
 * A helper conditional function that returns a boolean value.
 *
 * @since Reiziger 1.0
 *
 * @return bool Whether there are featured posts.
 */
function reiziger_has_featured_posts() {
	return ! is_paged() && (bool) reiziger_get_featured_posts();
}
/**
 * Register three Reiziger widget areas.
 *
 * @since Reiziger 1.0
 */
function reiziger_widgets_init() {
	require get_template_directory() . '/inc/widgets.php';
	register_widget( 'Reiziger_Ephemera_Widget' );
	register_sidebar( array(
		'name'          => __( 'Top Header', 'reiziger' ),
		'id'            => 'top-header',
		'description'   => __( 'Top most header area.', 'reiziger' ),
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
	
	register_sidebar( array(
		'name'          => __( 'Footer Top', 'reiziger' ),
		'id'            => 'footer-top',
		'description'   => __( 'footer top area.', 'reiziger' ),
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
	
	register_sidebar( array(
		'name'          => __( 'Footer Menu Column 1', 'reiziger' ),
		'id'            => 'footer-col1',
		'description'   => __( 'Top most header area.', 'reiziger' ),
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h4 class="widget-title">',
		'after_title'   => '</h4>',
	) );
	
	register_sidebar( array(
		'name'          => __( 'Footer Menu Column 2', 'reiziger' ),
		'id'            => 'footer-col2',
		'description'   => __( 'Top most header area.', 'reiziger' ),
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h4 class="widget-title">',
		'after_title'   => '</h4>',
	) );
	
	register_sidebar( array(
		'name'          => __( 'Footer Menu Column 3', 'reiziger' ),
		'id'            => 'footer-col3',
		'description'   => __( 'Top most header area.', 'reiziger' ),
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h4 class="widget-title">',
		'after_title'   => '</h4>',
	) );
	
	register_sidebar( array(
		'name'          => __( 'Footer Menu Column 4', 'reiziger' ),
		'id'            => 'footer-col4',
		'description'   => __( 'Top most header area.', 'reiziger' ),
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h4 class="widget-title">',
		'after_title'   => '</h4>',
	) );
	
	register_sidebar( array(
		'name'          => __( 'Footer Menu Column 5', 'reiziger' ),
		'id'            => 'footer-col5',
		'description'   => __( 'Top most header area.', 'reiziger' ),
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h4 class="widget-title">',
		'after_title'   => '</h4>',
	) );
	
	register_sidebar( array(
		'name'          => __( 'Footer Menu Column 6', 'reiziger' ),
		'id'            => 'footer-col6',
		'description'   => __( 'Top most header area.', 'reiziger' ),
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h4 class="widget-title">',
		'after_title'   => '</h4>',
	) );
	
	register_sidebar( array(
		'name'          => __( 'Footer Bottom', 'reiziger' ),
		'id'            => 'footer-bottom',
		'description'   => __( 'Footer bottom area.', 'reiziger' ),
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
	
	register_sidebar( array(
		'name'          => __( 'Help center Banners', 'reiziger' ),
		'id'            => 'help-center',
		'description'   => __( 'Top most header area.', 'reiziger' ),
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
	
	register_sidebar( array(
		'name'          => __( 'Login Form', 'reiziger' ),
		'id'            => 'login',
		'description'   => __( 'Login Area', 'reiziger' ),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h1 class="login-title">',
		'after_title'   => '</h1>',
	) );
	
}
add_action( 'widgets_init', 'reiziger_widgets_init' );
/**
 * Register Lato Google font for Reiziger.
 *
 * @since Reiziger 1.0
 *
 * @return string
 */
function reiziger_font_url() {
	$font_url = '';
	/*
	 * Translators: If there are characters in your language that are not supported
	 * by Lato, translate this to 'off'. Do not translate into your own language.
	 */
	if ( 'off' !== _x( 'on', 'Lato font: on or off', 'reiziger' ) ) {
		$query_args = array(
			'family' => urlencode( 'Lato:300,400,700,900,300italic,400italic,700italic' ),
			'subset' => urlencode( 'latin,latin-ext' ),
		);
		$font_url = add_query_arg( $query_args, '//fonts.googleapis.com/css' );
	}
	return $font_url;
}
/**
 * Enqueue scripts and styles for the front end.
 *
 * @since Reiziger 1.0
 */
function reiziger_scripts() {
	// Add Lato font, used in the main stylesheet.
	wp_enqueue_style( 'reiziger-lato', reiziger_font_url(), array(), null );
	// Add Genericons font, used in the main stylesheet.
	wp_enqueue_style( 'genericons', get_template_directory_uri() . '/genericons/genericons.css', array(), '3.0.3' );
	// Load our main stylesheet.
	wp_enqueue_style( 'reiziger-style', get_stylesheet_uri() );
	// Load the Internet Explorer specific stylesheet.
	wp_enqueue_style( 'reiziger-ie', get_template_directory_uri() . '/css/ie.css', array( 'reiziger-style' ), '20131205' );
	wp_style_add_data( 'reiziger-ie', 'conditional', 'lt IE 9' );
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
	if ( is_singular() && wp_attachment_is_image() ) {
		wp_enqueue_script( 'reiziger-keyboard-image-navigation', get_template_directory_uri() . '/js/keyboard-image-navigation.js', array( 'jquery' ), '20130402' );
	}
	if ( is_active_sidebar( 'sidebar-3' ) ) {
		wp_enqueue_script( 'jquery-masonry' );
	}
	if ( is_front_page() && 'slider' == get_theme_mod( 'featured_content_layout' ) ) {
		wp_enqueue_script( 'reiziger-slider', get_template_directory_uri() . '/js/slider.js', array( 'jquery' ), '20131205', true );
		wp_localize_script( 'reiziger-slider', 'featuredSliderDefaults', array(
			'prevText' => __( 'Previous', 'reiziger' ),
			'nextText' => __( 'Next', 'reiziger' )
		) );
	}
	/*wp_enqueue_script( 'reiziger-script', get_template_directory_uri() . '/js/functions.js', array( 'jquery' ), '20150315', true );*/
}
add_action( 'wp_enqueue_scripts', 'reiziger_scripts' );
/**
 * Enqueue Google fonts style to admin screen for custom header display.
 *
 * @since Reiziger 1.0
 */
function reiziger_admin_fonts() {
	wp_enqueue_style( 'reiziger-lato', reiziger_font_url(), array(), null );
}
add_action( 'admin_print_scripts-appearance_page_custom-header', 'reiziger_admin_fonts' );
if ( ! function_exists( 'reiziger_the_attached_image' ) ) :
/**
 * Print the attached image with a link to the next attached image.
 *
 * @since Reiziger 1.0
 */
function reiziger_the_attached_image() {
	$post                = get_post();
	/**
	 * Filter the default Reiziger attachment size.
	 *
	 * @since Reiziger 1.0
	 *
	 * @param array $dimensions {
	 *     An array of height and width dimensions.
	 *
	 *     @type int $height Height of the image in pixels. Default 810.
	 *     @type int $width  Width of the image in pixels. Default 810.
	 * }
	 */
	$attachment_size     = apply_filters( 'reiziger_attachment_size', array( 810, 810 ) );
	$next_attachment_url = wp_get_attachment_url();
	/*
	 * Grab the IDs of all the image attachments in a gallery so we can get the URL
	 * of the next adjacent image in a gallery, or the first image (if we're
	 * looking at the last image in a gallery), or, in a gallery of one, just the
	 * link to that image file.
	 */
	$attachment_ids = get_posts( array(
		'post_parent'    => $post->post_parent,
		'fields'         => 'ids',
		'numberposts'    => -1,
		'post_status'    => 'inherit',
		'post_type'      => 'attachment',
		'post_mime_type' => 'image',
		'order'          => 'ASC',
		'orderby'        => 'menu_order ID',
	) );
	// If there is more than 1 attachment in a gallery...
	if ( count( $attachment_ids ) > 1 ) {
		foreach ( $attachment_ids as $attachment_id ) {
			if ( $attachment_id == $post->ID ) {
				$next_id = current( $attachment_ids );
				break;
			}
		}
		// get the URL of the next image attachment...
		if ( $next_id ) {
			$next_attachment_url = get_attachment_link( $next_id );
		}
		// or get the URL of the first image attachment.
		else {
			$next_attachment_url = get_attachment_link( reset( $attachment_ids ) );
		}
	}
	printf( '<a href="%1$s" rel="attachment">%2$s</a>',
		esc_url( $next_attachment_url ),
		wp_get_attachment_image( $post->ID, $attachment_size )
	);
}
endif;
if ( ! function_exists( 'reiziger_list_authors' ) ) :
/**
 * Print a list of all site contributors who published at least one post.
 *
 * @since Reiziger 1.0
 */
function reiziger_list_authors() {
	$contributor_ids = get_users( array(
		'fields'  => 'ID',
		'orderby' => 'post_count',
		'order'   => 'DESC',
		'who'     => 'authors',
	) );
	foreach ( $contributor_ids as $contributor_id ) :
		$post_count = count_user_posts( $contributor_id );
		// Move on if user has not published a post (yet).
		if ( ! $post_count ) {
			continue;
		}
	?>
	<div class="contributor">
		<div class="contributor-info">
			<div class="contributor-avatar"><?php echo get_avatar( $contributor_id, 132 ); ?></div>
			<div class="contributor-summary">
				<h2 class="contributor-name"><?php echo get_the_author_meta( 'display_name', $contributor_id ); ?></h2>
				<p class="contributor-bio">
					<?php echo get_the_author_meta( 'description', $contributor_id ); ?>
				</p>
				<a class="button contributor-posts-link" href="<?php echo esc_url( get_author_posts_url( $contributor_id ) ); ?>">
					<?php printf( _n( '%d Article', '%d Articles', $post_count, 'reiziger' ), $post_count ); ?>
				</a>
			</div><!-- .contributor-summary -->
		</div><!-- .contributor-info -->
	</div><!-- .contributor -->
	<?php
	endforeach;
}
endif;
/**
 * Extend the default WordPress body classes.
 *
 * Adds body classes to denote:
 * 1. Single or multiple authors.
 * 2. Presence of header image except in Multisite signup and activate pages.
 * 3. Index views.
 * 4. Full-width content layout.
 * 5. Presence of footer widgets.
 * 6. Single views.
 * 7. Featured content layout.
 *
 * @since Reiziger 1.0
 *
 * @param array $classes A list of existing body class values.
 * @return array The filtered body class list.
 */
function reiziger_body_classes( $classes ) {
	if ( is_multi_author() ) {
		$classes[] = 'group-blog';
	}
	if ( get_header_image() ) {
		$classes[] = 'header-image';
	} elseif ( ! in_array( $GLOBALS['pagenow'], array( 'wp-activate.php', 'wp-signup.php' ) ) ) {
		$classes[] = 'masthead-fixed';
	}
	if ( is_archive() || is_search() || is_home() ) {
		$classes[] = 'list-view';
	}
	if ( ( ! is_active_sidebar( 'sidebar-2' ) )
		|| is_page_template( 'page-templates/full-width.php' )
		|| is_page_template( 'page-templates/contributors.php' )
		|| is_attachment() ) {
		$classes[] = 'full-width';
	}
	if ( is_active_sidebar( 'sidebar-3' ) ) {
		$classes[] = 'footer-widgets';
	}
	if ( is_singular() && ! is_front_page() ) {
		$classes[] = 'singular';
	}
	if ( is_front_page() && 'slider' == get_theme_mod( 'featured_content_layout' ) ) {
		$classes[] = 'slider';
	} elseif ( is_front_page() ) {
		$classes[] = 'grid';
	}
	return $classes;
}
add_filter( 'body_class', 'reiziger_body_classes' );
/**
 * Extend the default WordPress post classes.
 *
 * Adds a post class to denote:
 * Non-password protected page with a post thumbnail.
 *
 * @since Reiziger 1.0
 *
 * @param array $classes A list of existing post class values.
 * @return array The filtered post class list.
 */
function reiziger_post_classes( $classes ) {
	if ( ! post_password_required() && ! is_attachment() && has_post_thumbnail() ) {
		$classes[] = 'has-post-thumbnail';
	}
	return $classes;
}
add_filter( 'post_class', 'reiziger_post_classes' );
/**
 * Create a nicely formatted and more specific title element text for output
 * in head of document, based on current view.
 *
 * @since Reiziger 1.0
 *
 * @global int $paged WordPress archive pagination page count.
 * @global int $page  WordPress paginated post page count.
 *
 * @param string $title Default title text for current view.
 * @param string $sep Optional separator.
 * @return string The filtered title.
 */
function reiziger_wp_title( $title, $sep ) {
	global $paged, $page;
	if ( is_feed() ) {
		return $title;
	}
	// Add the site name.
	$title .= get_bloginfo( 'name', 'display' );
	// Add the site description for the home/front page.
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) ) {
		$title = "$title $sep $site_description";
	}
	// Add a page number if necessary.
	if ( ( $paged >= 2 || $page >= 2 ) && ! is_404() ) {
		$title = "$title $sep " . sprintf( __( 'Page %s', 'reiziger' ), max( $paged, $page ) );
	}
	return $title;
}
add_filter( 'wp_title', 'reiziger_wp_title', 10, 2 );
// Implement Custom Header features.
require get_template_directory() . '/inc/custom-header.php';
// Custom template tags for this theme.
require get_template_directory() . '/inc/template-tags.php';
// Add Customizer functionality.
require get_template_directory() . '/inc/customizer.php';
/*
 * Add Featured Content functionality.
 *
 * To overwrite in a plugin, define your own Featured_Content class on or
 * before the 'setup_theme' hook.
 */
if ( ! class_exists( 'Featured_Content' ) && 'plugins.php' !== $GLOBALS['pagenow'] ) {
	require get_template_directory() . '/inc/featured-content.php';
}
/* ---------- For Home Page class in Body ---------- */
add_filter('body_class', 'multisite_body_classes');
function multisite_body_classes($classes) {
	if((is_front_page()) || (is_page('landing-page'))){
		$classes[] = 'landing-page';
	} elseif(is_page('home')){
		$classes[] = 'home-only';
	} else {
		$classes[] = 'innter-page';
	}
	
	if (is_search()) {
		if (($key = array_search('search', $classes)) !== false) {
			unset($classes[$key]);
		}
	}
        return $classes;
}
/* ----------- End ---------- */
/* ---------- For Add Active class in Menu ---------- */
add_filter('nav_menu_css_class' , 'special_nav_class' , 10 , 2);
function special_nav_class ($classes, $item) {
    if (in_array('current-menu-item', $classes) ){
        $classes[] = 'active ';
    }
    return $classes;
}
/* ----------- End ---------- */
/* ----------- Search Form ---------- */
add_filter( 'get_search_form', 'my_search_form' );
function my_search_form( $form ) {
	$form = '<div class="sea-in"><form role="search" method="get" id="searchform" class="search-form" action="' . home_url( '/' ) . '" >
	<input type="text" value="' . get_search_query() . '" name="s" id="s" class="s-in" placeholder="Search" />
	<input type="submit" id="searchsubmit" class="s-btn" value="'. esc_attr__('Go') .'" />
	</form></div>';
	return $form;
}
/* ----------- End ---------- */
remove_filter( 'the_content', 'wpautop' );
remove_filter( 'the_excerpt', 'wpautop' );
function ms_image_editor_default_to_gd( $editors ) {
	$gd_editor = 'WP_Image_Editor_GD';
	$editors = array_diff( $editors, array( $gd_editor ) );
	array_unshift( $editors, $gd_editor );
	return $editors;
}
add_filter( 'wp_image_editors', 'ms_image_editor_default_to_gd' );
function myextensionTinyMCE($init) {
    // Command separated string of extended elements
    $ext = 'span[id|name|class|style]';
    // Add to extended_valid_elements if it alreay exists
    if ( isset( $init['extended_valid_elements'] ) ) {
        $init['extended_valid_elements'] .= ',' . $ext;
    } else {
        $init['extended_valid_elements'] = $ext;
    }
    // Super important: return $init!
    return $init;
}
add_filter('tiny_mce_before_init', 'myextensionTinyMCE' );
/*****************search page skip ids**************************/
function filter_where($where = '') {
	if ( is_search() ) {
		$exclude = array(448,450,559,562,565,576,2277,2016,3073,3077,3093,3095,3097,3099,2036,2950,2952,2965,2967,2969,2971,8,26,30,227,228,229,233,738,771,750,839,840,841,844,2043,2301,2306,2351,2353,2356,2358,2041,2749,2757,2771,2773,2775,2778,2049,2591,2594,2605,2607,2609,2611,3641);	
		for($x=0;$x<count($exclude);$x++){
		  $where .= " AND ID != ".$exclude[$x];
		}
	}
	return $where;
}
add_filter('posts_where', 'filter_where');
/* ---- Post Format Rename ----- */
function rename_post_formats( $safe_text ) {
    if ( $safe_text == 'Aside' )
		return 'Article';
		
	if ( $safe_text == 'Video' )
		return 'TV';
		
	if ( $safe_text == 'Quote' )
		return 'FAQs';
return $safe_text;
}
add_filter( 'esc_html', 'rename_post_formats' );
/* -------------- */
function my_post_queries( $query ) {
	// do not alter the query on wp-admin pages and only alter it if it's the main query
	if (!is_admin() && $query->is_main_query()){
		// alter the query for the home and category pages
		if(in_category(96)){
			// $query->set('post_type', 'topo');
			//$query->set('cat', 97);
			$query->set('posts_per_page', 5);
		}
		
		if(is_category(97)){
			// $query->set('post_type', 'topo');
			//$query->set('cat', 97);
			$query->set('posts_per_page', 4);
		}
		
		if(is_category(93)){
			// $query->set('post_type', 'topo');
			//$query->set('cat', 93);
			$query->set('posts_per_page', 6);
		}
	}
}
add_action( 'pre_get_posts', 'my_post_queries' );
/* Woocommerce coustom checkout fields */
add_filter( 'woocommerce_checkout_fields' , 'custom_override_checkout_fields' );
// Our hooked in function - $fields is passed via the filter!
function custom_override_checkout_fields( $fields ) {
	unset($fields['shipping']['shipping_last_name']);
	unset($fields['shipping']['shipping_email']);
	
	$fields['shipping']['shipping_first_name'] = array(
		'label'     => __('Shipping Name*', 'woocommerce'),
		'placeholder'   => _x('Name', 'placeholder', 'woocommerce'),
		'required'  => true,
		'class'     => array('form-row-first'),
		'clear'     => false
	);
	
	$fields['shipping']['shipping_company'] = array(
		'label'     => __('Shipping Company Name', 'woocommerce'),
		'placeholder'   => _x('Company Name*', 'placeholder', 'woocommerce'),
		'required'  => true,
		'class'     => array('form-row-last'),
		'clear'     => true
	);
	
	$fields['shipping']['shipping_address_1'] = array(
		'label'     => __('Shipping Street Address', 'woocommerce'),
		'placeholder'   => _x('Street Address*', 'placeholder', 'woocommerce'),
		'class'     => array('form-row-wide'),
		'clear'     => true
	);
	
	$fields['shipping']['shipping_address_2'] = array(
		'label'     => __('', 'woocommerce'),
		'placeholder'   => _x('Additional Address Info (optional)', 'placeholder', 'woocommerce'),
		'class'     => array('form-row-wide'),
		'clear'     => true
	);
	
	$fields['shipping']['shipping_city'] = array(
		'label'     => __('Shipping Suburb', 'woocommerce'),
		'placeholder'   => _x('Suburb / Town*', 'placeholder', 'woocommerce'),
		'class'     => array('form-row-first'),
	);
	$fields['shipping']['shipping_state']['label'] = 'Shipping State';
	$fields['shipping']['shipping_state']['class'] = array('form-row-last');
	
	$fields['shipping']['shipping_country']['label'] = 'Shipping Country';
	$fields['shipping']['shipping_country']['class'] = array('form-row-last');
	$fields['shipping']['shipping_country']['clear'] = true;
	
	$fields['shipping']['shipping_postcode'] = array(
		'label'     => __('Shipping Postcode', 'woocommerce'),
		'placeholder'   => _x('Postcode*', 'placeholder', 'woocommerce'),
		'class'     => array('form-row-first'),
		
		'maxlength' => '4'
	);
	
	$fields['shipping']['shipping_phone'] = array(
		'label'     => __('Shipping Phone', 'woocommerce'),
		'placeholder'   => _x('Phone', 'placeholder', 'woocommerce'),
		'required'  => false,
		'class'     => array('form-row-first'),
		'clear'     => false
	);
	
	$fields['shipping']['shipping_mobile'] = array(
		'label'     => __('Shipping Mobile', 'woocommerce'),
		'placeholder'   => _x('Mobile', 'placeholder', 'woocommerce'),
		'required'  => false,
		'class'     => array('form-row-last'),
		'clear'     => true,
		
		'maxlength' => '12',
	);
	
	
	/* Billing Fields */
	
	$fields['billing']['billing_first_name'] = array(
		'label'     => __('Billing First Name', 'woocommerce'),
		'placeholder'   => _x('First Name*', 'placeholder', 'woocommerce'),
		'class'     => array('form-row-first'),
		'required'  => true
	);
	
	$fields['billing']['billing_last_name'] = array(
		'label'     => __('Billing Last Name', 'woocommerce'),
		'placeholder'   => _x('Last Name*', 'placeholder', 'woocommerce'),
		'class'     => array('form-row-last'),
		'clear'     => true,
		'required'  => true
	);
	
	$fields['billing']['billing_company'] = array(
		'label'     => __('Billing Company Name', 'woocommerce'),
		'placeholder'   => _x('Company Name*', 'placeholder', 'woocommerce'),
		'required'  => false,
		'class'     => array('form-row-wide'),
		'clear'     => true
	);
	
	$fields['billing']['billing_address_1'] = array(
		'label'     => __('Billing Street Address', 'woocommerce'),
		'placeholder'   => _x('Street Address*', 'placeholder', 'woocommerce'),
		'class'     => array('form-row-wide'),
		'required'  => true,
		'clear'     => true
	);
	
	$fields['billing']['billing_address_2'] = array(
		'label'     => __('', 'woocommerce'),
		'placeholder'   => _x('Additional Address Info (optional)', 'placeholder', 'woocommerce'),
		'class'     => array('form-row-wide'),
		'clear'     => true
	);
	
	$fields['billing']['billing_city'] = array(
		'label'     => __('Billing Suburb', 'woocommerce'),
		'placeholder'   => _x('Suburb / Town*', 'placeholder', 'woocommerce'),
		'class'     => array('form-row-first'),
		'required'  => true
	);
	
	$fields['billing']['billing_state']['label'] = 'Billing State';
	$fields['billing']['billing_state']['class'] = array('form-row-last');
	
	$fields['billing']['billing_country']['label'] = 'Billing Country';
	$fields['billing']['billing_country']['class'] = array('form-row-last');
	$fields['billing']['billing_country']['clear'] = true;
	
	$fields['billing']['billing_postcode'] = array(
		'label'     => __('Billing Postcode*', 'woocommerce'),
		'placeholder'   => _x('Postcode', 'placeholder', 'woocommerce'),
		'class'     => array('form-row-first'),
		
		'maxlength' => '4'
	);
	
	
	$fields['billing']['billing_mobile'] = array(
		//'label'     => __('Billing Mobile*', 'woocommerce'), //
		
		'label'     => __('Primary Phone', 'woocommerce'), //Alternative Phone
		'placeholder'   => _x('Primary Phone', 'placeholder', 'woocommerce'),
		'required'  => true,
		'class'     => array('form-row-first'),
		'clear'     => false,
		
		'maxlength' => '12',
	);
	
	
	$fields['billing']['billing_phone'] = array(
		//'label'     => __('Billing Phone', 'woocommerce'), 
		
		'label'     => __('Alternative Phone', 'woocommerce'), //Primary Phone
		'placeholder'   => _x('Alternative Phone', 'placeholder', 'woocommerce'),
		'required'  => false,
		'class'     => array('form-row-last'),
		'clear'     => true
	);
	
	
	$fields['billing']['billing_email'] = array(
		'label'     => __('Billing Email Address*', 'woocommerce'),
		'placeholder'   => _x('Email Address', 'placeholder', 'woocommerce'),
		'required'  => true,
		'class'     => array('form-row-wide'),
		'clear'     => true
	);
	
	/* ---------- */
	return $fields;
}
add_filter("woocommerce_checkout_fields", "order_fields");
function order_fields($fields) {
	
	
	$ship_order = array(
        "shipping_first_name",
		"shipping_company",
		"shipping_phone",
		"shipping_mobile",
        "shipping_address_1", 
        "shipping_address_2",
		"shipping_city",
		"shipping_state",
        "shipping_postcode",
        "shipping_country",
    );
	
	foreach($ship_order as $field)
    {
        $ordered_ship_fields[$field] = $fields["shipping"][$field];
    }
    $order = array(
        "billing_first_name", 
        "billing_last_name", 
		"billing_mobile",
		"billing_phone",
		"billing_email",
        "billing_company", 
        "billing_address_1", 
        "billing_address_2",
		"billing_city",
		"billing_state",
        "billing_postcode", 
        "billing_country"
    );
	
    foreach($order as $field)
    {
        $ordered_fields[$field] = $fields["billing"][$field];
    }
    $fields["billing"] = $ordered_fields;
	$fields["shipping"] = $ordered_ship_fields;
    return $fields;
}
/* To loging using ajax on checkout */
function ajax_login_init(){
    wp_register_script('ajax-login-script', get_template_directory_uri() . '/woocommerce/ajax-login-script.js', array('jquery') ); 
    wp_enqueue_script('ajax-login-script');
    wp_localize_script( 'ajax-login-script', 'ajax_login_object', array( 
        'ajaxurl' => admin_url( 'admin-ajax.php' ),
        'redirecturl' => home_url(),
    ));
    // Enable the user with no privileges to run ajax_login() in AJAX
    add_action( 'wp_ajax_nopriv_ajaxlogin', 'ajax_login' );
}
// Execute the action only if the user isn't logged in
if (!is_user_logged_in()) {
    add_action('init', 'ajax_login_init');
}
function ajax_login(){
    // First check the nonce, if it fails the function will break
    check_ajax_referer( 'ajax-login-nonce', 'security' );
    // Nonce is checked, get the POST data and sign user on
    $info = array();
    $info['user_login'] = $_POST['username'];
    $info['user_password'] = $_POST['password'];
    $user_signon = wp_signon( $info, false );
    if ( is_wp_error($user_signon) ){
        echo json_encode(array('loggedin'=>false, 'message'=>__('Wrong username or password.')));
    } else {
        echo json_encode(array('loggedin'=>true, 'message'=>__('Login successful, redirecting...')));
    }
    die();
}
/* End ajax Login */
add_action('after_setup_theme','remove_core_updates');
function remove_core_updates()
{
 if(! current_user_can('update_core')){return;}
 add_action('init', create_function('$a',"remove_action( 'init', 'wp_version_check' );"),2);
 add_filter('pre_option_update_core','__return_null');
 add_filter('pre_site_transient_update_core','__return_null');
}
remove_action('load-update-core.php','wp_update_plugins');
add_filter('pre_site_transient_update_plugins','__return_null');
global $woocommerce;
if( version_compare( $woocommerce->version, '2.3', '<' ) ){
    // WC 2.3 -
    add_filter('add_to_cart_fragments', 'woocommerce_header_add_to_cart_fragment');
} else {
    // WC 2.3 +
    add_filter('woocommerce_add_to_cart_fragments', 'woocommerce_header_add_to_cart_fragment');
}
function woocommerce_header_add_to_cart_fragment( $fragments ) {
  global $woocommerce;
  ob_start();
  ?>
  <span class="cart-count"><?php echo $woocommerce->cart->cart_contents_count; ?></span>
  <?php
  $fragments['span.cart-count'] = ob_get_clean();
  return $fragments;
}
/**
 * Redirect to a specific page when clicking on Continue Shopping in the cart
 *
 * @return void
 */
?>
<?php
// custom admin login logo
function custom_login_logo() {
	echo '<style type="text/css">
	h1 a { background-image: url('.get_bloginfo('template_directory').'/images/logo.png) !important;
	width: 320px !Important;height: 91px !important;background-size: 320px 91px !IMPORTANT; }
	</style>';
}
add_action('login_head', 'custom_login_logo');
/*function change_wp_login_url() {
    echo bloginfo('url');
}
function change_wp_login_title() {
    echo get_option('blogname');
}
add_filter('login_headerurl', 'change_wp_login_url');
add_filter('login_headertitle', 'change_wp_login_title');
*/
// changing the login page URL
function put_my_url(){
    return ('http://dev.reiziger.com'); // putting my URL in place of the WordPress one
}
add_filter('login_headerurl', 'put_my_url');
// changing the login page URL hover text
function put_my_title(){
    return (get_option('blogname')); // changing the title from "Powered by WordPress" to whatever you wish
}
add_filter('login_headertitle', 'put_my_title');
/*function remove_core_updates(){
global $wp_version;return(object) array('last_checked'=> time(),'version_checked'=> $wp_version,);
}
add_filter('pre_site_transient_update_core','remove_core_updates');
add_filter('pre_site_transient_update_plugins','remove_core_updates');
add_filter('pre_site_transient_update_themes','remove_core_updates');*/
?>
<?php
function kia_woocommerce_order_item_name( $name, $item ){ 
   $product_id = $item['product_id'];
   $tax = 'product_cat'; 
   $terms = wp_get_post_terms( $product_id, $tax, array( 'fields' => 'names' ) ); 
   if( $terms && ! is_wp_error( $terms )) {
       $taxonomy = get_taxonomy($tax);
       $t_name .= '<span class="hide_on_desktop_ord_confirmation">'.implode( ', ', $terms ).'</span> '.$name;
   } 
   return $t_name;
}
add_filter( 'woocommerce_order_item_name', 'kia_woocommerce_order_item_name', 10, 2 );
add_filter('body_class','my_class_names');
function my_class_names($classes) {
    if (! ( is_user_logged_in() ) ) {
        $classes[] = 'logged-out';
    }
    return $classes;
}
/**
 *Reduce the strength requirement on the woocommerce password.
 *
 * Strength Settings
 * 3 = Strong (default)
 * 2 = Medium
 * 1 = Weak
 * 0 = Very Weak / Anything
 */
function reduce_woocommerce_min_strength_requirement( $strength ) {
    return 0;
}
add_filter( 'woocommerce_min_password_strength', 'reduce_woocommerce_min_strength_requirement' );
add_filter( 'wpsl_templates', 'custom_templates' );
function custom_templates( $templates ) {
    /**
     * The 'id' is for internal use and must be unique ( since 2.0 ).
     * The 'name' is used in the template dropdown on the settings page.
     * The 'path' points to the location of the custom template,
     * in this case the folder of your active theme.
     */
    $templates[] = array (
        'id'   => 'reiziger',
        'name' => 'Reiziger template',
        'path' => get_stylesheet_directory() . '/' . 'wpsl-templates/reiziger.php',
    );
    return $templates;
}
add_filter( 'wpsl_listing_template', 'custom_listing_template' );
function custom_listing_template() {
    global $wpsl, $wpsl_settings;
    
        $listing_template = '<li  data-store-id="<%= id %>" data-index="<%= row %>" >' . "\r\n";
        $listing_template .= "\t\t\t\t" .'<div class="wpsl-result-list-index" id="info<%= id %>"><%= row %></div>' . "\r\n";
		$listing_template .= "\t\t\t\t" .'<input type="hidden" value="<%= id %>" id="retailer-id" />' . "\r\n";
        $listing_template .= "\t\t" . '<div class="wpsl-store-location">' . "\r\n";
        $listing_template .= "\t\t\t\t" . custom_store_header_template( 'listing' ) . "\r\n"; // Check which header format we use
        $listing_template .= "\t\t\t\t" . '<a class="map-direction" href="#retailerCode=<%= id %>"><span class="wpsl-street"><%= address %></span>' . "\r\n";
        $listing_template .= "\t\t\t\t" . '<% if ( address2 ) { %>' . "\r\n";
        $listing_template .= "\t\t\t\t" . '<span class="wpsl-street"><%= address2 %></span>' . "\r\n";
        $listing_template .= "\t\t\t\t" . '<% } %>' . "\r\n";
        $listing_template .= "\t\t\t\t" . '<span>' . wpsl_address_format_placeholders() . '</span>' . "\r\n"; // Use the correct address format
        $listing_template .= "\t\t\t\t" . '<span class="wpsl-country"><%= country %></span></a>' . "\r\n";
        /*$listing_template .= "\t\t\t" . '</p>' . "\r\n";
		$listing_template .= "\t\t\t\t" . '<% if ( stock ) { %>' . "\r\n";
        $listing_template .= "\t\t\t\t" . '<span class="wpsl-stock"><%= stock %></span>' . "\r\n";
        $listing_template .= "\t\t\t\t" . '<% } %>' . "\r\n";*/
        $listing_template .= "\t\t\t" . wpsl_more_info_template() . "\r\n"; // Check if we need to show the 'More Info' link and info
        $listing_template .= "\t\t" . '</div>' . "\r\n";
        $listing_template .= "\t\t" . '<div class="wpsl-direction-wrap">' . "\r\n";
        
        if ( !$wpsl_settings['hide_distance'] ) {
            $listing_template .= "\t\t\t" . '<%= distance %> ' . esc_html( $wpsl_settings['distance_unit'] ) . '' . "\r\n";
        }
        
        $listing_template .= "\t\t\t" . '<%= createDirectionUrl() %>' . "\r\n"; 
        $listing_template .= "\t\t" . '</div>' . "\r\n";
        $listing_template .= "\t" . '</li>';
    return $listing_template;
}
add_filter( 'wpsl_more_info_template', 'custom_more_info_template' );
function custom_more_info_template() {
    global $wpsl, $wpsl_settings;
    if ( $wpsl_settings['more_info'] ) {
        $more_info_url = '#';
        if ( $wpsl_settings['template_id'] == 'default' && $wpsl_settings['more_info_location'] == 'info window' ) {
            $more_info_url = '#wpsl-search-wrap';
        }
        if ( $wpsl_settings['more_info_location'] == 'store listings' ) {
            $more_info_template = '<% if ( !_.isEmpty( phone ) || !_.isEmpty( fax ) || !_.isEmpty( email ) ) { %>' . "\r\n";
			$more_info_template .= "\t\t\t\t" . '<% if ( email ) { %>' . "\r\n";
            $more_info_template .= "\t\t\t\t" . '<a class="dealer-btn" href="#contact-retailer" data-store-id="<%= id %>">Contact Retailer</a>' . "\r\n";
            $more_info_template .= "\t\t\t\t" . '<% } %>' . "\r\n";
            $more_info_template .= "\t\t\t" . '<p class="store-info"><a class="wpsl-store-details wpsl-store-listing" href="#wpsl-id-<%= id %>">' . esc_html( $wpsl->i18n->get_translation( 'more_label', __( 'More info', 'wpsl' ) ) ) . '</a></p>' . "\r\n";
            $more_info_template .= "\t\t\t" . '<div id="wpsl-id-<%= id %>" class="wpsl-more-info-listings">' . "\r\n";
            $more_info_template .= "\t\t\t\t" . '<% if ( description ) { %>' . "\r\n";
            /*$more_info_template .= "\t\t\t\t" . '<%= description %>' . "\r\n";*/
            $more_info_template .= "\t\t\t\t" . '<% } %>' . "\r\n";
            //$more_info_template .= "\t\t\t\t" . '<p>' . "\r\n";
            $more_info_template .= "\t\t\t\t" . '<% if ( fax ) { %>' . "\r\n";
            $more_info_template .= "\t\t\t\t" . '<span><strong>' . esc_html( $wpsl->i18n->get_translation( 'fax_label', __( 'Fax', 'wpsl' ) ) ) . '</strong>: <%= fax %></span>' . "\r\n";
            $more_info_template .= "\t\t\t\t" . '<% } %>' . "\r\n";
            //$more_info_template .= "\t\t\t\t" . '</p>' . "\r\n";
            if ( !$wpsl_settings['hide_hours'] ) {
                $more_info_template .= "\t\t\t\t" . '<% if ( hours ) { %>' . "\r\n";
                $more_info_template .= "\t\t\t\t" . '<div class="open-time expand"><strong>Today\'s hours</strong><table class="wpsl-opening-hours">';
                $more_info_template .= "\t\t\t\t" . '<tr><td><%= today_hours %></td></tr></table></div>';
                $more_info_template .= "\t\t\t\t" . '<div class="wpsl-store-hours"><%= hours %></div>' . "\r\n";
                $more_info_template .= "\t\t\t\t" . '<% } %>' . "\r\n";
            }
			
			$more_info_template .= "\t\t\t\t" . '<% if ( phone ) { %>' . "\r\n";
            $more_info_template .= "\t\t\t\t" . '<span><strong>' . esc_html( $wpsl->i18n->get_translation( 'phone_label', __( 'Phone', 'wpsl' ) ) ) . '</strong> <%= formatPhoneNumber( phone ) %></span>' . "\r\n";
            $more_info_template .= "\t\t\t\t" . '<% } %>' . "\r\n";
            $more_info_template .= "\t\t\t" . '</div>' . "\r\n"; 
			
			$more_info_template .= '<% if ( url ) { %>' . "\r\n";
			$more_info_template .= '<div class="dealer-web"><a class="wpsl-view-dealer" href="#retailerCode=<%= id %>">Retailer Details ></a></div>' . "\r\n";
			$more_info_template .= "\t\t\t" . '<% } %>';
			
			/*$more_info_template .= '<div class="map-btns">' . "\r\n";
			$more_info_template .= "\t\t\t" ;
			$more_info_template .= '<a href="#retailerCode=<%= id %>" class="map-direction">Directions</a>' . "\r\n";
			$more_info_template .= "\t\t\t" ;
			$more_info_template .= '<a href="#" class="map-save">Save</a>' . "\r\n";
			$more_info_template .= "\t\t\t" ;
			$more_info_template .= '<a href="#" class="map-print">Print</a>' . "\r\n";
			$more_info_template .= "\t\t\t" ;
			$more_info_template .= '<a href="#" class="map-snd-phone">Send to your phone</a>' . "\r\n";
			$more_info_template .= "\t\t\t" ;
			$more_info_template .= '<a href="#" class="map-share">Share</a></div>' . "\r\n";
			$more_info_template .= "\t\t\t" ;*/
			
            $more_info_template .= "\t\t\t" . '<% } %>';
        } else {
            $more_info_template = '<p><a class="wpsl-store-details" href="' . $more_info_url . '">' . esc_html( $wpsl->i18n->get_translation( 'more_label', __( 'More info', 'wpsl' ) ) ) . '</a></p>';
        }
        return $more_info_template;
    }
}
add_filter( 'wpsl_store_header_template', 'custom_store_header_template' );
function custom_store_header_template($location = 'info_window') {
    global $wpsl_settings;
    if ( $wpsl_settings['new_window'] ) {
        $new_window = ' target="_blank"';
    } else {
        $new_window = '';
    }
    /* To keep the code readable in the HTML source we ( unfortunately ) need to adjust the 
     * amount of tabs in front of it based on the location were it is shown. 
     */
    if ( $location == 'listing') {
        $tab = "\t\t\t\t";    
    } else {
        $tab = "\t\t\t";                 
    }
    if ( $wpsl_settings['permalinks'] ) {
        $header_template = '<strong><a' . $new_window . ' href="<%= permalink %>"><%= store %></a></strong>';
    } else {
        $header_template = '<% if ( wpslSettings.storeUrl == 1 && url ) { %>' . "\r\n";
        $header_template .= $tab . '<strong><a' . $new_window . ' href="<%= url %>"><%= store %></a></strong>' . "\r\n";
        $header_template .= $tab . '<% } else { %>' . "\r\n";
        $header_template .= $tab . '<a href="#retailerCode=<%= id %>" class="wpsl-view-dealer"><strong class="store-title"><%= store %></strong></a>' . "\r\n";
        $header_template .= $tab . '<% } %>'; 
    }
    return $header_template;
}
add_action( 'wp_enqueue_scripts', 'wpsl_plugin_override' );
function wpsl_plugin_override() {
//    wp_deregister_script('wpsl-js');
//    wp_enqueue_script('wpsl-js', get_template_directory_uri() . '/js/whlsft-wpsl/wpsl-gmap-reiziger.js');
	// Store Locatior Scroll Down Script
	if( is_page( 'find-retailer-results' ) ) {
		wp_enqueue_script('', '/wp-content/themes/reiziger/js/whlsft-riziger.js', false, false, true);
		wp_enqueue_style('wpsl-style', '/wp-content/themes/reiziger/wpsl-templates/styles.css');
	}
}
//add_filter( 'wpsl_js_settings', 'custom_js_settings' );
function custom_js_settings( $settings ) {
    $settings['startMarker'] = '';
    return $settings;
}
add_filter( 'wpsl_info_window_template', 'custom_wpsl_info_window_template' );
function custom_wpsl_info_window_template() {
    global $wpsl;
    $info_window_template = '<div data-store-id="<%= id %>" class="wpsl-info-window small-info-window">' . "\r\n";
    $info_window_template .= "\t\t" . '<p>' . "\r\n";
    $info_window_template .= "\t\t\t" .  wpsl_store_header_template() . "\r\n";  // Check which header format we use
    $info_window_template .= "\t\t\t" . '<span><%= address %></span>' . "\r\n";
    $info_window_template .= "\t\t\t" . '<% if ( address2 ) { %>' . "\r\n";
    $info_window_template .= "\t\t\t" . '<span><%= address2 %></span>' . "\r\n";
    $info_window_template .= "\t\t\t" . '<% } %>' . "\r\n";
    $info_window_template .= "\t\t\t" . '<span>' . wpsl_address_format_placeholders() . '</span>' . "\r\n"; // Use the correct address format
    $info_window_template .= "\t\t" . '</p>' . "\r\n";
    $info_window_template .= "\t\t" . '<% if ( phone ) { %>' . "\r\n";
    $info_window_template .= "\t\t" . '<span><a class="info-call" href="tel:<%= formatPhoneNumber( phone ) %>">Call</a></span>' . "\r\n";
    $info_window_template .= "\t\t" . '<% } %>' . "\r\n";
    $info_window_template .= "\t\t" . '<% if ( fax ) { %>' . "\r\n";
    $info_window_template .= "\t\t" . '<span><strong>' . esc_html( $wpsl->i18n->get_translation( 'fax_label', __( 'Fax', 'wpsl' ) ) ) . '</strong>: <%= fax %></span>' . "\r\n";
    $info_window_template .= "\t\t" . '<% } %>' . "\r\n";
    $info_window_template .= "\t\t" . '<% if ( email ) { %>' . "\r\n";
    $info_window_template .= "\t\t" . '<span><a href="mailto:<%= email %>" class="info-email">Email</a></span>' . "\r\n";
    $info_window_template .= "\t\t" . '<% } %>' . "\r\n";
    $info_window_template .= "\t\t" . '<%= createInfoWindowActions( id ) %>' . "\r\n";
    $info_window_template .= "\t" . '</div>';
    
    
    $info_window_template .= '<div data-store-id="<%= id %>" class="big-info-window">' . "\r\n";
    $info_window_template .= "\t\t\t\t" .'<input type="hidden" value="<%= id %>" id="retailer-id" />' . "\r\n";
    $info_window_template .= "\t\t" . '<div class="info-window-retailer">' . "\r\n";
    $info_window_template .= "\t\t\t\t" .'<div class="big-info-window-index"><%= label %></div>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<div class="big-info-window-alldata">' . "\r\n";
    $info_window_template .= "\t\t\t\t" . wpsl_store_header_template( 'listing' ) . "\r\n"; // Check which header format we use
    $info_window_template .= "\t\t\t\t" . '<span class="wpsl-street"><%= address %></span>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<% if ( address2 ) { %>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<span class="wpsl-street"><%= address2 %></span>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<% } %>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<span>' . wpsl_address_format_placeholders() . '</span>' . "\r\n"; // Use the correct address format
    $info_window_template .= "\t\t\t\t" . '<span class="wpsl-country"><%= country %></span>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<div class="big-window-details">' . "\r\n";
    if ( !$wpsl_settings['hide_hours'] ) {
        $info_window_template .= "\t\t\t\t" . '<% if ( hours ) { %>' . "\r\n";
        $info_window_template .= "\t\t\t\t" . '<div class="open-time expand"><strong>Today\'s hours</strong><table class="wpsl-opening-hours">';
        $info_window_template .= "\t\t\t\t" . '<tr><td><%= today_hours %></td></tr></table></div>';
        $info_window_template .= "\t\t\t\t" . '<% } %>' . "\r\n";
    }
    $info_window_template .= "\t\t\t\t" . '<% if ( phone ) { %>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<div class="phone"><strong>' . esc_html( $wpsl->i18n->get_translation( 'phone_label', __( 'Phone', 'wpsl' ) ) ) . '</strong> <%= formatPhoneNumber( phone ) %></div>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<% } %>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '</div>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<% if ( email ) { %>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<a class="dealer-btn" href="#contact-retailer" data-store-id="<%= id %>">Contact Retailer</a>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<% } %>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '</div>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<div class="big-window-map-links">' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<div class="dealer-web"><a class="wpsl-view-dealer" href="#retailerCode=<%= id %>">Retailer Details</a></div>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<div class="dealer-direction"><a class="view-direction" href="#retailerCode=<%= id %>">Get Directions</a></div>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '</div>' . "\r\n";
    $info_window_template .= "\t\t" . '</div>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<div class="big-window-directions" style="display:none;">' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<button id="big-map-directions-back">< Back</button>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<div class="big-direction-search"><input autocomplete="off" id="big-location-input" type="text" value="'.$_REQUEST['big-location-input'].'" name="big-location-input" placeholder="Enter starting location" />' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<div class="big-location-btn-wrap"><input id="big-location-btn" type="submit" value="Get Directions"></div></div>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<div style="clear:both"></div>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<div id="big-map-directions-destination-container">' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<div id="big-map-directions-destination">' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<%= address %> <%= city %> <%= zip %> <%= country %>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '</div>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '</div>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<div id="big-map-directions-list">' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '<ul></ul>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '</div>' . "\r\n";
    $info_window_template .= "\t\t\t\t" . '</div>' . "\r\n";
    $info_window_template .= "\t" . '</div>';
    
    return $info_window_template;
}
add_filter( 'wpsl_infobox_settings', 'custom_infobox_settings' );
function custom_infobox_settings( $infobox_settings ) {
    $infobox_settings['infoBoxClass'] = 'smallInfobox wpsl-infobox';
//    $infobox_settings['infoBoxCloseMargin'] = '2px';
//    $infobox_settings['infoBoxCloseUrl'] = '//www.google.com/intl/en_us/mapfiles/close.gif';
//    $infobox_settings['infoBoxClearance'] = 'new google.maps.Size( Number( boxClearance[0] ), Number( boxClearance[1] ) )';
//    $infobox_settings['infoBoxDisableAutoPan'] = 0;
//    $infobox_settings['infoBoxEnableEventPropagation'] = 0;
//    $infobox_settings['infoBoxPixelOffset'] = 'new google.maps.Size( Number( boxClearance[0] ), Number( boxClearance[1] ) )';
//    $infobox_settings['infoBoxZindex'] = 1500;
    
    return $infobox_settings;
}
add_action( 'wp_ajax_dealer_search', 'wpsl_dealer_search' );
add_action( 'wp_ajax_nopriv_dealer_search', 'wpsl_dealer_search' );
function wpsl_dealer_search() {
    $wpslF = new WPSL_Frontend();
    $store_request = (object) array('ID' => $_GET['storeid']);
    $store = $wpslF->get_store_meta_data(array(
        $store_request
    ));
     
    wp_send_json( $store );
    exit();
}
add_filter( 'wpsl_sql', 'custom_sql' );
function custom_sql() {
    
    global $wpdb, $wpsl, $wpsl_settings;
    
    $store_data = array();
    /* Set the correct earth radius in either km or miles. 
     * We need this to calculate the distance between two coordinates. 
     */
    $radius = ( $wpsl_settings['distance_unit'] == 'km' ) ? 6371 : 3959; 
    /* The placeholder values for the prepared statement in the sql query. */
    $placeholder_values = array(
        $radius,
        $_GET['lat'], 
        $_GET['lng'], 
        $_GET['lat']
    );
    
    /* Check if we need to filter the results by category. */
    if ( isset( $_GET['filter'] ) && $_GET['filter'] ) {
        $placeholder_values[] = $_GET['filter'];
        $cat_filter = "INNER JOIN $wpdb->term_relationships AS term_rel ON posts.ID = term_rel.object_id
                       INNER JOIN $wpdb->term_taxonomy AS term_tax ON term_rel.term_taxonomy_id = term_tax.term_taxonomy_id
                              AND term_tax.taxonomy = 'wpsl_store_category'
                              AND term_tax.term_id = %d";
    } else {
        $cat_filter = '';
    }
    
    if ( $wpsl->i18n->wpml_exists() ) {
                $group_by = 'GROUP BY lat';
            } else {
                $group_by = '';
            }
            
    if ( isset( $_GET['autoload'] ) && $_GET['autoload'] ) {
    $limit = '';
    if ( $wpsl_settings['autoload_limit'] ) {
        $limit = 'LIMIT %d';
        $placeholder_values[] = $wpsl_settings['autoload_limit'];
    }
    $sql_sort = 'ORDER BY distance '. $limit;
    } else {
        array_push( $placeholder_values, wpsl_check_store_filter( 'radius' ), wpsl_check_store_filter( 'max_results' ) );
        if(isset($_REQUEST['page']))
            $sql_sort = 'HAVING distance < %d ORDER BY distance';
        else
            $sql_sort = 'HAVING distance < %d ORDER BY distance LIMIT 0, %d';
    }
    /*****************KAMLESH KKK******************/
    $page = (isset($_REQUEST['page'])) ? (int)$_REQUEST['page'] : 1;
    $cur_page = $page;
    $page -= 1;
    $per_page = (isset($_REQUEST['perpage'])) ? (int)$_REQUEST['perpage'] : 5;
    $start = $page * $per_page;
    $lastindex = (isset($_REQUEST['lastindex'])) ? (int)$_REQUEST['lastindex'] : 0;
    if($per_page == 'all') {
        $pagelimit = "";
    } else {
        $pagelimit = "LIMIT ".$start." , ".$per_page;
    }
            
    $sql = "SET @index = ".$lastindex.";";
    $set = $wpdb->query($sql);
    $sql = "SELECT (@index:=@index + 1) AS row,
            (SELECT COUNT(posts.ID)
            FROM $wpdb->posts AS posts
            INNER JOIN $wpdb->postmeta AS post_lat ON post_lat.post_id = posts.ID AND post_lat.meta_key = 'wpsl_lat'
            INNER JOIN $wpdb->postmeta AS post_lng ON post_lng.post_id = posts.ID AND post_lng.meta_key = 'wpsl_lng'
            INNER JOIN $wpdb->postmeta AS post_zip ON post_zip.post_id = posts.ID AND post_zip.meta_key = 'wpsl_zip'
            INNER JOIN $wpdb->postmeta AS post_city ON post_city.post_id = posts.ID AND post_city.meta_key = 'wpsl_city'
            $cat_filter	WHERE posts.post_type = 'wpsl_stores' AND posts.post_status = 'publish' AND ( ( $placeholder_values[0] * acos( cos( radians( $placeholder_values[1] ) ) * cos( radians( post_lat.meta_value ) ) * cos( radians( post_lng.meta_value ) - radians( $placeholder_values[2] ) ) + sin( radians( $placeholder_values[3] ) ) * sin( radians( post_lat.meta_value ) ) ) ) < $placeholder_values[4] ) LIMIT 0,1) AS total,
                    posts.*,
                    post_lat.meta_value AS lat,
                    post_lng.meta_value AS lng,
                    post_zip.meta_value AS zip,
                    post_city.meta_value AS city,
                    ( %d * acos( cos( radians( %s ) ) * cos( radians( post_lat.meta_value ) ) * cos( radians( post_lng.meta_value ) - radians( %s ) ) + sin( radians( %s ) ) * sin( radians( post_lat.meta_value ) ) ) ) 
                AS distance
              FROM $wpdb->posts AS posts
            INNER JOIN $wpdb->postmeta AS post_lat ON post_lat.post_id = posts.ID AND post_lat.meta_key = 'wpsl_lat'
            INNER JOIN $wpdb->postmeta AS post_lng ON post_lng.post_id = posts.ID AND post_lng.meta_key = 'wpsl_lng'
            INNER JOIN $wpdb->postmeta AS post_zip ON post_zip.post_id = posts.ID AND post_zip.meta_key = 'wpsl_zip'
            INNER JOIN $wpdb->postmeta AS post_city ON post_city.post_id = posts.ID AND post_city.meta_key = 'wpsl_city'
            $cat_filter WHERE posts.post_type = 'wpsl_stores' AND posts.post_status = 'publish' $group_by $sql_sort $pagelimit";
    
    return $sql;
}
add_filter( 'wpsl_store_meta', 'custom_store_meta', 10, 2 );
function custom_store_meta( $store_meta, $store_id ) {
    $today = date('l');
    preg_match("/$today<\/td><td>(.*?)(<\/td><\/tr>)/", $store_meta['hours'], $result);
    $store_meta['today_hours'] = $result[1];
    return $store_meta;
}
function wpsl_check_store_filter( $filter ) {
            
    if ( isset( $_GET[$filter] ) && absint( $_GET[$filter] ) ) {
        $filter_value = $_GET[$filter];
    } else {
        $filter_value = wpsl_get_default_filter_value( $filter );
    }    
    return $filter_value;
}
/**
 * Get the default selected value for a dropdown.
 * 
 * @since 1.0
 * @param  string $type     The request list type
 * @return string $response The default list value
 */
function wpsl_get_default_filter_value( $type ) {
   $settings    = get_option( 'wpsl_settings' );
   $list_values = explode( ',', $settings[$type] );
   foreach ( $list_values as $k => $list_value ) {
       /* The default radius has a [] wrapped around it, so we check for that and filter out the [] */
       if ( strpos( $list_value, '[' ) !== false ) {
           $response = filter_var( $list_value, FILTER_SANITIZE_NUMBER_INT );
           break;
       }
   }	
   return $response;		
}
add_filter('wpsl_store_data', 'custom_wpsl_store_data');
function custom_wpsl_store_data($stores){
    $row = 1;
    foreach ($stores as $k=>$store){
        $stores[$k]['row'] = $row++;
    }
    return $stores;
}

/*
 * Modify the posts query.
 *
 * Sort posts on the category posts page according to the custom sort order.
 * Exclude download pro files search.
 * Set to return 10 results per page.
 *
 * @since	1.0
 */
function reiz_get_posts( $query ){
	// order category by date
	if ( $query->is_main_query() && is_category( 'reiziger-tv' ) ) {
		$query->set( 'orderby', 'date' );
		$query->set( 'order' , 'ASC' );
	}
	
	if ( $query->is_search ) {
		// exclude reiziger-tv category and growth schedules from search
		$query->set( 'cat', '-97' );
		
		// Only allow posts to be searched in search results exlude wpdmpro custom post types
		$query->set( 'post_type', array( 'post', 'page' ) );
		
		// results per page
		$query->set( 'posts_per_page', 10 );
		
		// exclude grow schedules
		/*
		$tax_query = $query->get( 'tax_query' ) ?: array();
		$tax_query[] = array(
			'taxonomy' => 'wpdmcategory',
			'field'    => 'id',
			'terms'    => array( 46 ),
			'operator' => 'NOT IN',
		);
		$query->set( 'tax_query', $tax_query );
		*/
	}
}

add_action( 'pre_get_posts' , 'reiz_get_posts' );

/**
 * Write messages to error.log file
 *
 * @since	1.0
 */
if (!function_exists('write_log')) {
    function write_log ( $log )  {
        if ( true === WP_DEBUG ) {
            if ( is_array( $log ) || is_object( $log ) ) {
                error_log( print_r( $log, true ) );
            } else {
                error_log( $log );
            }
        }
    }
}
?>