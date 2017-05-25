<?php 

//print_r($_REQUEST);
global $wpsl_settings, $wpsl;




$output         = $this->get_custom_css(); 
$autoload_class = ( !$wpsl_settings['autoload'] ) ? 'class="wpsl-not-loaded"' : '';

$output .= '<div id="wpsl-wrap">' . "\r\n";
$output .= "\t" . '<div class="wpsl-search wpsl-clearfix ' . $this->get_css_classes() . '">' . "\r\n";
$output .= "\t\t" . '<div id="wpsl-search-wrap" class="wrapper">' . "\r\n";
$output .= "\t\t\t" . '<div class="wpsl-input">' . "\r\n";
$output .= "\t\t\t\t" . '<div><h2>Find a Retailer <span>ENTER YOUR POSTCODE, CITY OR RETAILER NAME</span></h2></div>' . "\r\n";
//$output .= "\t\t\t\t" . '<input autocomplete="off" id="wpsl-search-input" type="text" value="'.$_REQUEST['wpsl-search-input'].'" name="wpsl-search-input" />' . "\r\n";
$output .= "\t\t\t\t" . ' <div id="locationField"><input id="wpsl-search-input" type="text" value="'.$_REQUEST['wpsl-search-input'].'" name="wpsl-search-input" /></div>' . "\r\n";
$output .= "\t\t\t\t" . '<div class="wpsl-search-btn-wrap"><input id="wpsl-search-btn" type="submit" value="' . esc_attr( $wpsl->i18n->get_translation( 'search_btn_label', __( 'Search', 'wpsl' ) ) ) . '"></div>' . "\r\n";
$output .= "\t\t\t" . '</div>' . "\r\n";

if ( $wpsl_settings['radius_dropdown'] || $wpsl_settings['results_dropdown']  ) {
    $output .= "\t\t\t" . '<div class="wpsl-select-wrap">' . "\r\n";

    if ( $wpsl_settings['radius_dropdown'] ) {
        $output .= "\t\t\t\t" . '<div id="wpsl-radius">' . "\r\n";
        $output .= "\t\t\t\t\t" . '<label for="wpsl-radius-dropdown">' . esc_html( $wpsl->i18n->get_translation( 'radius_label', __( 'Search radius', 'wpsl' ) ) ) . '</label>' . "\r\n";
        $output .= "\t\t\t\t\t" . '<select autocomplete="off" id="wpsl-radius-dropdown" class="wpsl-dropdown" name="wpsl-radius">' . "\r\n";
        $output .= "\t\t\t\t\t\t" . $this->get_dropdown_list( 'search_radius' ) . "\r\n";
        $output .= "\t\t\t\t\t" . '</select>' . "\r\n";
        $output .= "\t\t\t\t" . '</div>' . "\r\n";
    }

    if ( $wpsl_settings['results_dropdown'] ) {
        $output .= "\t\t\t\t" . '<div id="wpsl-results">' . "\r\n";
        $output .= "\t\t\t\t\t" . '<label for="wpsl-results-dropdown">' . esc_html( $wpsl->i18n->get_translation( 'results_label', __( 'Results', 'wpsl' ) ) ) . '</label>' . "\r\n";
        $output .= "\t\t\t\t\t" . '<select autocomplete="off" id="wpsl-results-dropdown" class="wpsl-dropdown" name="wpsl-results">' . "\r\n";
        $output .= "\t\t\t\t\t\t" . $this->get_dropdown_list( 'max_results' ) . "\r\n";
        $output .= "\t\t\t\t\t" . '</select>' . "\r\n";
        $output .= "\t\t\t\t" . '</div>' . "\r\n";
    } 

    $output .= "\t\t\t" . '</div>' . "\r\n";
}

if ( $wpsl_settings['category_dropdown'] ) {
    $output .= $this->create_category_filter();
}
 
//$output .= "\t\t\t\t" . '<div class="wpsl-search-btn-wrap"><input id="wpsl-search-btn" type="submit" value="' . esc_attr( $wpsl->i18n->get_translation( 'search_btn_label', __( 'Search', 'wpsl' ) ) ) . '"></div>' . "\r\n";

$output .= "\t\t" . '</div>' . "\r\n";
$output .= "\t" . '</div>' . "\r\n";

$output .= '<div id="search-location" class="wrapper search-location clearfix">';  
$output.= '<div id="preloader">';
$output.='<div id="status">&nbsp;</div>';
$output.='</div>';

/* Big Map ##DJ*/
$output.='<div id="big-map-container" class="big-map-modal fade" style="opacity: 0;">';
$output.='<div class="modal-content">';
$output.='<div class="modal-header" id="modal-header-big-map"><button id="big-map-close-btn" type="button">Back to List View</button></div>';
$output.='<div class="modal-body">';
$output.='<div id="big-map-overlay-container">';
$output.='<div class="wpsl-input">';
$output.='<input autocomplete="off" id="big-search-input" type="text" value="'.$_REQUEST['wpsl-search-input'].'" name="big-search-input" />';
$output.='<div class="big-search-btn-wrap"><input id="big-search-btn" type="submit" value="' . esc_attr( $wpsl->i18n->get_translation( 'search_btn_label', __( 'Search', 'wpsl' ) ) ) . '"></div>';
$output.='</div>'; //wpsl-input
$output.='<!-- info window -->';
$output.='<div id="big-map-info-window-container" style="display: none; max-height:65%;">';
$output.='<div id="big-map-info-window"></div>';
$output.='</div>'; //info-window
$output.='<div style="z-index: 0; position: absolute; left: 0px;" class="view-more-btn-container">';
$output.='<div id="big-map-view-more-btn" class="btn big-view-more-btn">View more retailers</div>';
$output.='</div>'; //view-more-btn
$output.='</div>'; //overlay-container
$output.='<!-- map canvas -->';
$output.='<div id="big-map-canvas" class="big-map-canvas"></div>';
$output.='</div>'; //modal body
$output.='</div>'; //modal conetnt
$output.='</div>'; //map-container
/* Big Map End ##DJ*/

$output .= "\t" . '<div class="map-right-side"><div class="sticky"><div id="wpsl-gmap" class="wpsl-gmap-canvas"></div><div class="view-large-map" style="display:none;"><a href="#big-map" class="big-map-link">View Large Map</a></div></div></div>' . "\r\n";

$output .= "\t" . '<div id="wpsl-result-list">' . "\r\n";
$output .= "\t\t" . '<div id="wpsl-stores" '. $autoload_class .'>' . "\r\n";
$output .= "\t\t\t" . '<ul></ul>' . "\r\n";

$output .= "\t\t\t" .'<div style="display: none;" id="page-button-container">' . "\r\n";		
$output .= "\t\t\t" .'<span class="view-previous-page-btn" id="previous-page-button" style="cursor: pointer;"><img src="'.WPSL_URL.'img/left-arrow.png"> Previous</span>' . "\r\n";		
$output .= "\t\t\t" .'<span class="view-next-page-btn" id="next-page-button" style="cursor: pointer;">Next <img src="'.WPSL_URL.'img/right-arrow.png"></span>' . "\r\n";
$output .= "\t\t\t" .'</div>' . "\r\n";

$output .= "\t\t\t" .'<div class="view-more-btn-container" style="display:none;"><div class="btn map-view-more-btn" id="map-view-more-btn">VIEW MORE RETAILERS</div></div>' . "\r\n";

$output .= "\t\t" . '</div>' . "\r\n";
$output .= "\t\t" . '<div id="wpsl-direction-details">' . "\r\n";
$output .= "\t\t\t" . '<ul></ul>' . "\r\n";
$output .= "\t\t" . '</div>' . "\r\n";
$output .= "\t" . '</div>' . "\r\n";
$output .= '</div>';

if ( $wpsl_settings['show_credits'] ) { 
    $output .= "\t" . '<div class="wpsl-provided-by">'. sprintf( __( "Search provided by %sWP Store Locator%s", "wpsl" ), "<a target='_blank' href='http://wpstorelocator.co'>", "</a>" ) .'</div>' . "\r\n";
}

$output .= '</div>' . "\r\n";

$output .= '<div class="dealer-detail" id="wpsl-dealer-details"><div class="dealers-data">' . "\r\n";
$output .= '</div></div>' . "\r\n";


return $output;