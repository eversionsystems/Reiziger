jQuery( document ).ready( function( $ ) {
    var geocoder, map, directionsDisplay, directionsService, geolocationLatlng, autoCompleteLatLng,
        activeWindowMarkerId, infoWindow, biginfoWindow, markerClusterer, startMarkerData, startAddress,
        openInfoWindow = [],
        markersArray = [],
        markersBigArray = [],
        markerSettings = {},
        directionMarkerPosition = {},
        mapDefaults = {},
        resetMap = false,
        streetViewAvailable = false,
        viewmore = 0,
        bigopen = 0,
        storeDataCache = {0 : ''},
        autoLoad = ( typeof wpslSettings !== "undefined" ) ? wpslSettings.autoLoad : "";

    /**
     * Set the underscore template settings.
     *
     * Defining them here prevents other plugins
     * that also use underscore / backbone, and defined a
     * different _.templateSettings from breaking the
     * rendering of the store locator template.
     *
     * @link	 http://underscorejs.org/#template
     * @requires underscore.js
     * @since	 2.0.0
     */
    _.templateSettings = {
        evaluate: /\<\%(.+?)\%\>/g,
        interpolate: /\<\%=(.+?)\%\>/g,
        escape: /\<\%-(.+?)\%\>/g
    };
    
    $( "#big-map-close-btn" ).on( "click", function( e ) {
        var oldUrl = window.location.href
        var mainurl = oldUrl.split("#");
        closeInfoBoxWindow();

        if(mainurl[0]!=window.location){
            window.history.pushState({path:mainurl[0]},'',mainurl[0]);
        }

        $( "#big-map-container" ).css({ 'opacity': 0, 'z-index': -1, 'visibility': 'hidden' });
        bigopen = 0;
        if ( $( ".wpsl-gmap-canvas" ).length ) {
            $( "<img />" ).attr( "src", wpslSettings.url + "img/ajax-loader.gif" );

            /*
             * The [wpsl] shortcode can only exist once on a page,
             * but the [wpsl_map] shortcode can exist multiple times.
             *
             * So to make sure we init all the maps we loop over them.
             */
            $( ".wpsl-gmap-canvas" ).each( function( mapIndex ) {
                var mapId = $( this ).attr( "id" );

                initializeGmap( mapId, mapIndex );
                var gmap = document.getElementById(mapId).map;
                //alert(markersArray.length)
                for ( i = 0, len = markersArray.length; i < len; i++ ) {
                    markersArray[i].setMap( gmap );
                    markerClickEvent(markersArray[i], gmap, storeDataCache[parseInt(markersArray[i].id)], 0);
                }
                fitBounds(mapId);
            });
        }
        /*removeMarker();
        var gmap = document.getElementById("wpsl-gmap").map;
        //alert(markersArray.length)
        for ( i = 0, len = markersArray.length; i < len; i++ ) {
            markersArray[i].setMap( gmap );
        }
        fitBounds("wpsl-gmap");*/
    });
    
    $( ".view-large-map a.big-map-link" ).on( "click", function( e ) {
        $( "#big-map-container" ).css({ 'opacity': 1, 'z-index': 100001, 'visibility': 'visible' });
        bigopen = 1;
        closeInfoBoxWindow();
        removeMarker(2);
        var bigmap = document.getElementById("big-map-canvas").map;
        //alert(markersArray.length)
        for ( i = 0, len = markersArray.length; i < len; i++ ) {
            markersArray[i].setMap( bigmap );
            markerClickEvent(markersArray[i], bigmap, storeDataCache[parseInt(markersArray[i].id)], 1);
        }
        fitBounds("big-map-canvas");
    });
    $( "#big-map-view-more-btn" ).on( "click", function( e ) {
        closeInfoBoxWindow();
        removeMarker(2);
        var bigmap = document.getElementById("big-map-canvas").map;
        //alert(markersArray.length)
        for ( i = 0, len = markersBigArray.length; i < len; i++ ) {
            markersBigArray[i].setMap( bigmap );
            markerClickEvent(markersBigArray[i], bigmap, storeDataCache[parseInt(markersBigArray[i].id)], 1);
        }
        fitBounds("big-map-canvas", true);
    })
    /* Only continue if a map is present */
if ( $( ".big-map-canvas" ).length ) {
	vph = $(window).height()-40;
	$( ".big-map-canvas" ).css({'height': vph + 'px'});
	
	$( window ).resize(function() {
		vph = $(window).height()-40;
		$( ".big-map-canvas" ).css({'height': vph + 'px'});
	});
	
	initializeGmap( 'big-map-canvas', 1 );
}

// Only continue if a map is present.
    if ( $( ".wpsl-gmap-canvas" ).length ) {
        $( "<img />" ).attr( "src", wpslSettings.url + "img/ajax-loader.gif" );

        /*
         * The [wpsl] shortcode can only exist once on a page,
         * but the [wpsl_map] shortcode can exist multiple times.
         *
         * So to make sure we init all the maps we loop over them.
         */
        $( ".wpsl-gmap-canvas" ).each( function( mapIndex ) {
            var mapId = $( this ).attr( "id" );

            initializeGmap( mapId, mapIndex );
        });
    }

    /**
     * Initialize the map with the correct settings.
     *
     * @since   1.0.0
     * @param   {string} mapId    The id of the map div
     * @param   {number} mapIndex Number of the map
     * @returns {void}
     */
    function initializeGmap( mapId, mapIndex ) {
        var mapOptions, settings, infoWindow, latLng,
            bounds, mapData, maxZoom;

        // Get the settings that belongs to the current map.
        settings = getMapSettings( mapIndex );

        maxZoom = Number( settings.zoomLevel );

        // Create a new infoWindow, either with the infobox libray or use the default one.
        infoWindow = newInfoWindow();
        biginfoWindow = newBigInfoWindow();
        if(directionsDisplay) directionsDisplay.setMap(null);
        geocoder	      = new google.maps.Geocoder();
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsService = new google.maps.DirectionsService();

        // Set the map options.
        mapOptions = {
            zoom: Number( settings.zoomLevel ),
            center: settings.startLatLng,
            mapTypeId: google.maps.MapTypeId[ settings.mapType.toUpperCase() ],
            mapTypeControl: Number( settings.mapTypeControl ) ? true : false,
            scrollwheel: Number( settings.scrollWheel ) ? true : false,
            streetViewControl: Number( settings.streetView ) ? true : false,
            zoomControlOptions: {
                position: google.maps.ControlPosition[ settings.controlPosition.toUpperCase() + '_TOP' ]
            }
        };

        // Get the correct marker path & properties.
        markerSettings = getMarkerSettings();
        var map_element = document.getElementById( mapId );
        map = new google.maps.Map( map_element, mapOptions );
        map_element.map = map;
        // alert(mapId);
        // Do we need to disable the dragging of the map?
        maybeDisableMapDrag( map );

        // Check if we need to apply a map style.
        maybeApplyMapStyle( settings.mapStyle );

        if ( ( typeof window[ "wpslMap_" + mapIndex ] !== "undefined" ) && ( typeof window[ "wpslMap_" + mapIndex ].locations !== "undefined" ) ) {
            bounds		  = new google.maps.LatLngBounds(),
                mapData       = window[ "wpslMap_" + mapIndex ].locations;

            // Loop over the map data, create the infowindow object and add each marker.
            $.each( mapData, function( index ) {
                latLng = new google.maps.LatLng( mapData[index].lat, mapData[index].lng );
                addMarker( latLng, mapData[index].id, mapData[index], false, infoWindow );
                bounds.extend( latLng );
            });

            // Make all the markers fit on the map.
            map.fitBounds( bounds );

            // Make sure we don't zoom to far.
            google.maps.event.addListenerOnce( map, "bounds_changed", ( function( currentMap ) {
                return function() {
                    if ( currentMap.getZoom() > maxZoom ) {
                        currentMap.setZoom( maxZoom );
                    }
                };
            }( map ) ) );
        }

        // Only run this part if the store locator exist and we don't just have a basic map.
        if ( $( "#wpsl-gmap" ).length ) {

            if ( wpslSettings.autoComplete == 1 ) {
                activateAutocomplete();
            }

            /*
             * Not the most optimal solution, but we check the useragent if we should enable the styled dropdowns.
             *
             * We do this because several people have reported issues with the styled dropdowns on
             * iOS and Android devices. So on mobile devices the dropdowns will be styled according
             * to the browser styles on that device.
             */
            if ( !checkMobileUserAgent() && $( ".wpsl-dropdown" ).length && wpslSettings.enableStyledDropdowns == 1 ) {
                createDropdowns();
            } else {
                $( "#wpsl-search-wrap select" ).show();

                if ( checkMobileUserAgent() ) {
                    $( "#wpsl-wrap" ).addClass( "wpsl-mobile" );
                } else {
                    $( "#wpsl-wrap" ).addClass( "wpsl-default-filters" );
                }
            }

            // Check if we need to autolocate the user, or autoload the store locations.
            if ( !$( ".wpsl-search" ).hasClass( "wpsl-widget" ) ) {
                if ( wpslSettings.autoLocate == 1 ) {
                    checkGeolocation( settings.startLatLng, infoWindow );
                } else if ( wpslSettings.autoLoad == 1 ) {
                    showStores( settings.startLatLng, infoWindow );
                }
            }

            // Move the mousecursor to the store search field if the focus option is enabled.
            if ( wpslSettings.mouseFocus == 1 && !checkMobileUserAgent() ) {
                $( "#wpsl-search-input" ).focus();
            }

            // Bind store search button.
            //searchLocationBtn( infoWindow );
            if(mapId == 'wpsl-gmap') {
                searchLocationBtn( infoWindow );
            } else {
                searchDirectionBtn( infoWindow );
            }

            // Add the 'reload' and 'find location' icon to the map.
            mapControlIcons( settings, map, infoWindow );
            
            // Check if the user submitted a search through a search widget.
            checkWidgetSubmit();
                
        }
        
        /* Only run this part if the store locator exist and we don't just have a basic map */
        if ( $( "#big-map-canvas" ).length ) {
            
            /* Not the most optimal solution, but we check the useragent if we should enable the styled dropdowns.
             * 
             * We do this because several people have reported issues with the styled dropdowns on
             * iOS and Android devices. So on mobile devices the dropdowns will be styled according 
             * to the browser styles on that device.
             */
            if ( !checkMobileUserAgent() && $( ".wpsl-dropdown" ).length ) {
                createDropdowns();	
            } else {
                $( "#wpsl-search-wrap select").show();
                $( "#wpsl-wrap" ).addClass( "wpsl-mobile" );
            }

            /* Check if we need to autolocate the user, or autoload the store locations */
            if ( wpslSettings.autoLocate == 1 ) {
                //checkBigGeolocation( settings.startLatLng, biginfoWindow );
            } else if ( wpslSettings.autoLoad == 1 ) {
                showBigStores( settings.startLatLng, biginfoWindow );
            }

            /* Move the mousecursor to the store search field if the focus option is enabled */
            if ( wpslSettings.mouseFocus == 1 && !checkMobileUserAgent() ) {
                $( "#big-search-input" ).focus();
            }



            /* Bind store search button */
            searchbigLocationBtn( biginfoWindow );
            /* Add the 'reload' and 'find location' icon to the map */
            mapControlIcons( settings, map, biginfoWindow );
        }

        // Bind the zoom_changed listener.
        zoomChangedListener();
    }
    
    /**
    * Create a new biginfoWindow object
    * 
    * Either use the default biginfoWindow or use the infobox library
    * 
    * @since 2.0
    * @return {object} biginfoWindow The biginfoWindow object
    */
   function newBigInfoWindow() {
       var boxClearance, boxPixelOffset, 
           infoBoxOptions = {};

       /* Do we need to use the infobox script or use the default info windows? */
       if ( ( typeof wpslSettings.infoWindowStyle !== "undefined" ) && ( wpslSettings.infoWindowStyle == "infobox" ) ) {

           /* See http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/docs/reference.html */
           boxClearance   = wpslSettings.infoBoxClearance.split( "," );
           boxPixelOffset = wpslSettings.infoBoxPixelOffset.split( "," );
           infoBoxOptions = {
               alignBottom: true,
               boxClass: wpslSettings.infoBoxClass,
               closeBoxMargin: wpslSettings.infoBoxCloseMargin,
               closeBoxURL: wpslSettings.infoBoxCloseUrl,
               content: "",
               disableAutoPan: ( Number( wpslSettings.infoBoxDisableAutoPan ) ) ? true : true,
               enableEventPropagation: ( Number( wpslSettings.infoBoxEnableEventPropagation ) ) ? true : false,
               infoBoxClearance: new google.maps.Size( Number( boxClearance[0] ), Number( boxClearance[1] ) ),
               pixelOffset: new google.maps.Size( Number( boxPixelOffset[0] ), Number( boxPixelOffset[1] ) ),
               zIndex: Number( wpslSettings.infoBoxZindex )
           };

           //biginfoWindow = new InfoBox( infoBoxOptions );
           biginfoWindow = new google.maps.InfoWindow();
       } else {
           biginfoWindow = new google.maps.InfoWindow();
       }

       return biginfoWindow;
   }
    
    /**
    * Handle clicks on the store locator search button
    * 
    * @since 1.0
    * @param {object} biginfoWindow The biginfoWindow object
    * @returns {void}
    */
   function searchbigLocationBtn( biginfoWindow ) {

       $( "#big-search-btn" ).off('click').on( "click", function() {
           viewmore = 0;
           var keepStartMarker = false;

           /*if(markersArray.length > 0) {
               markersArray = [];
               markersBigArray = [];
           }*/

           $( "#big-search-input" ).removeClass();

           $("#wpsl-result-list .view-more-btn-container").hide();
           $( "#wpsl-result-list #page-button-container").hide();

           if ( !$( "#big-search-input" ).val() ) {
               $( "#big-search-input" ).addClass( "wpsl-error" ).focus();
           } else {
               $("#wpsl-search-input").val($( "#big-search-input" ).val());	
               resetMap = false;

               /* Force the open InfoBox info window to close. */
               closeInfoBoxWindow();
               removeMarker(2);

               deleteOverlays( keepStartMarker );
               deleteStartMarker();
//               codeBigAddress( biginfoWindow );
                codeAddress( biginfoWindow );
           }
       });

       /* #Kamlesh KKK */
       if($( "#big-search-input" ).val()) {
           viewmore = 0;
           var keepStartMarker = false;

           if(markersArray.length > 0) {
               markersArray = [];
               markersBigArray = [];
           }

           $( "#big-search-input" ).removeClass();

           if ( !$( "#big-search-input" ).val() ) {
               $( "#big-search-input" ).addClass( "wpsl-error" ).focus();
           } else {
               $("#wpsl-search-input").val($( "#big-search-input" ).val());
               resetMap = false;

               /* Force the open InfoBox info window to close. */
               closeInfoBoxWindow();

               deleteOverlays( keepStartMarker );
               deleteStartMarker();
//               codeBigAddress( biginfoWindow );
                codeAddress( biginfoWindow );
           }
       }
       /* END */
   }
   
   /**
    * Add the start marker and call the function that inits the store search
    *
    * @since 1.1
    * @param {object} startLatLng The start coordinates
    * @param {object} biginfoWindow  The biginfoWindow object
    * @returns {void}
    */
   function showBigStores( startLatLng, biginfoWindow ) {

       var startMarker = {
               store: wpslLabels.startPoint
           };

       addBigMarker( startLatLng, 0, startMarker, true, biginfoWindow ); // This marker is the 'start location' marker. With a storeId of 0, no name and is draggable
       findBigStoreLocations( startLatLng, resetMap, autoLoad, biginfoWindow );
   }
    
    /** DJ
    * Handle clicks on the get direction button
    */
   function searchDirectionBtn( infoWindow ) {
       $( "#wpsl-location-btn" ).on( "click", function() {

           var keepStartMarker = false;

           storeId = $(this).parents( "div#wpsl-direction-data" ).data('store-id');

           $( "#wpsl-location-input" ).removeClass();

           if ( !$( "#wpsl-location-input" ).val() ) {
               $( "#wpsl-location-input" ).addClass( "wpsl-error" ).focus();
           } else {
               $( "#wpsl-direction-data .wpsl-direction-distance" ).remove();
               $( "#wpsl-direction-data ul" ).empty();

               resetMap = false;

               /* Force the open InfoBox info window to close. */
               closeInfoBoxWindow();
               getDirection( infoWindow , storeId );
           }
       });

       if($( "#wpsl-location-input" ).val()) {

           var keepStartMarker = false;

           storeId = $('#wpsl-location-input').parents( "div#wpsl-direction-data" ).data('store-id');

           $( "#wpsl-location-input" ).removeClass();

           if ( !$( "#wpsl-location-input" ).val() ) {
               $( "#wpsl-location-input" ).addClass( "wpsl-error" ).focus();
           } else {
               $( "#wpsl-direction-data ul" ).empty();

               resetMap = false;

               /* Force the open InfoBox info window to close. */
               closeInfoBoxWindow();
               getDirection( infoWindow , storeId );
           }
       }


       /* DJ Trigger the direction search when the user presses "enter" on the keyboard */
       $( "#wpsl-location-input").keydown( function ( event ) {
           var keypressed = event.keyCode || event.which;
           if ( keypressed == 13 ) {
               $( "#wpsl-dealer-details  #wpsl-location-btn" ).trigger( "click" );
           }
       });
   }
   
   /** DJ
    * Get direction route
    */
   function getDirection( infoWindow, storeId ) {

       var latLng, i, start, end,
           autoLoad = false,
           keepStartMarker = false,
           address = $( "#wpsl-location-input" ).val();


       geocoder.geocode( { 'address': address}, function( response, status ) {
           if ( status == google.maps.GeocoderStatus.OK ) {			
               start = response[0].geometry.location;

               /* Remove any previous markers and add a new one */
               //deleteOverlays( keepStartMarker );
               //addMarker( latLng, 0, '', true, infoWindow ); // This marker is the 'start location' marker. With a storeId of 0, no name and is draggable

               /* Try to find stores that match the radius, location criteria */
               //findStoreLocations( latLng, resetMap, autoLoad, infoWindow );
           } else {
               geocodeErrors( status );
               start = '';
           }

           /* Find the latlng that belongs to the start and end point */
           for ( i = 0, len = markersArray.length; i < len; i++ ) {
               if ( markersArray[i].storeId == storeId ) {
                   end = markersArray[i].getPosition();
               }
           }

           if ( start && end ) {
               $( "#wpsl-direction-data ul" ).empty();
               $( "#wpsl-direction-data div.wpsl-direction-total-distance").remove();
               calcRoutefucn( start, end );
           } else {
               alert( wpslLabels.generalError );
           } 

       });
   }
   
   /**
    * Calculate the route from the start to the end
    * 
    * @since 1.0
    * @param {object} start The latlng from the start point
    * @param {object} end   The latlng from the end point
    * @returns {void}
    */
   function calcRoutefucn( start, end ) {

       var legs, len, step, index, direction, i, j, distanceUnit, directionOffset, newstart,
           directionStops = "",    
           request = {};
        var dmap = document.getElementById("wpsl-dmap").map;
       if ( wpslSettings.distanceUnit == "km" ) {
           distanceUnit = 'METRIC';
       } else {
           distanceUnit = 'IMPERIAL';
       }

       request = {
           origin: start,
           destination: end,
           travelMode: google.maps.DirectionsTravelMode.DRIVING,
           unitSystem: google.maps.UnitSystem[ distanceUnit ] 
       };

       //var latlng  = new google.maps.LatLng(start);
       var geocoder = geocoder = new google.maps.Geocoder();
       geocoder.geocode({ 'latLng': start  }, function (results, status) {
           if (status == google.maps.GeocoderStatus.OK) {
               if (results[1]) {
                   newstart = results[1].formatted_address;	
               } else {
                   newstart = '';	
               }
           } else {
               newstart = '';	
           }

       directionsService.route( request, function( response, status ) {
           if ( status == google.maps.DirectionsStatus.OK ) {
               directionsDisplay.setMap( dmap );
               directionsDisplay.setDirections( response );

               if ( response.routes.length > 0 ) {
                   direction = response.routes[0];

                   /* Loop over the legs and steps of the directions */
                   for ( i = 0; i < direction.legs.length; i++ ) {
                       legs = direction.legs[i];

                       for ( j = 0, len = legs.steps.length; j < len; j++ ) {
                           step = legs.steps[j];
                           var diricon="";
                           diricon=step.maneuver;
                           index = j+1;
                           directionStops = directionStops + "<li class='direction-list'><div class='adp-"+diricon+" adp-maneuver'></div><div class='wpsl-direction-index'>" + index + "</div><div class='wpsl-direction-txt'>" + step.instructions + "</div><div class='wpsl-direction-distance'>" + step.distance.text + "</div></li>";
                       }
                   }

                   $( "#wpsl-direction-data ul" ).append( directionStops ).before( "<div class='wpsl-direction-total-distance'><div><strong><span class='wpsl-total-distance'>" + direction.legs[0].distance.text + "</span>, <span class='wpsl-total-durations'>" + direction.legs[0].duration.text + "</span></strong></div><div class='startpoint'><strong>Starting Address</strong><br />"+newstart+"</div></div>" );

                   $( "#wpsl-dealer-details #wpsl-direction-data" ).show();
                   $( "#wpsl-direction-data .direction-destination").show();
                   /* Remove all single markers from the map */
                   for ( i = 0, len = markersArray.length; i < len; i++ ) {
                       markersArray[i].setMap( null );
                   }

                   /* Remove the marker clusters from the map */
                   if ( markerClusterer ) {
                       markerClusterer.clearMarkers();
                   }			

                   /* Remove the start marker from the map */
                   if ( ( typeof( startMarkerData ) !== "undefined" ) && ( startMarkerData !== "" ) ) {
                       startMarkerData.setMap( null );
                   }

                   $( "#wpsl-dealer-details #wpsl-sotre-desc" ).hide();
                   $( "#wpsl-dealer-details .destination-area" ).show();

                   /* Make sure the start of the route directions are visible if the store listings are shown below the map */						
                   if ( wpslSettings.templateId == 1 ) {
                       directionOffset = $( "#wpsl-dmap" ).offset();
                       $( window ).scrollTop( directionOffset.top );
                   }
               }
           } else {
               directionErrors( status );
           }
       });
   });
   }

    /**
     * Activate the autocomplete for the store search.
     *
     * @since 2.2.0
     * @link https://developers.google.com/maps/documentation/javascript/places-autocomplete
     * @returns {void}
     */
    function activateAutocomplete() {
        var input, autocomplete, place,
            options = {};

        var bigInput, bigAutocomplete, bigPlace;

        // Check if we need to set the geocode component restrictions.
        if ( typeof wpslSettings.geocodeComponents !== "undefined" && !$.isEmptyObject( wpslSettings.geocodeComponents ) ) {
            options.componentRestrictions = wpslSettings.geocodeComponents;
        }

        input		 = document.getElementById( "wpsl-search-input" );
        autocomplete = new google.maps.places.Autocomplete( input, options );

        autocomplete.addListener( "place_changed", function() {
            place = autocomplete.getPlace();

            /*
             * Assign the returned latlng to the autoCompleteLatLng var.
             * This var is used when the users submits the search.
             */
            if ( place.geometry ) {
                autoCompleteLatLng = place.geometry.location;
            }
        });

        bigInput		 = document.getElementById( "big-search-input" );
        bigAutocomplete = new google.maps.places.Autocomplete( bigInput, options );

        bigAutocomplete.addListener( "place_changed", function() {
            bigPlace = bigAutocomplete.getPlace();

            /*
             * Assign the returned latlng to the autoCompleteLatLng var.
             * This var is used when the users submits the search.
             */
            if ( bigPlace.geometry ) {
                autoCompleteLatLng = bigPlace.geometry.location;
            }
        });
    }

    /**
     * Make sure that the 'Zoom here' link in the info window
     * doesn't zoom past the max auto zoom level.
     *
     * The 'max auto zoom level' is set on the settings page.
     *
     * @since   2.0.0
     * @returns {void}
     */
    function zoomChangedListener() {
        if ( typeof wpslSettings.markerZoomTo !== "undefined" && wpslSettings.markerZoomTo == 1 ) {
            google.maps.event.addListener( map, "zoom_changed", function() {
                checkMaxZoomLevel();
            });
        }
    }

    /**
     * Get the correct map settings.
     *
     * @since	2.0.0
     * @param	{number} mapIndex    Number of the map
     * @returns {object} mapSettings The map settings either set through a shortcode or the default settings
     */
    function getMapSettings( mapIndex ) {
        var j, len, shortCodeVal,
            settingOptions = [ "zoomLevel", "mapType", "mapTypeControl", "mapStyle", "streetView", "scrollWheel", "controlPosition" ],
            mapSettings	= {
                zoomLevel: wpslSettings.zoomLevel,
                mapType: wpslSettings.mapType,
                mapTypeControl: wpslSettings.mapTypeControl,
                mapStyle: wpslSettings.mapStyle,
                streetView: wpslSettings.streetView,
                scrollWheel: wpslSettings.scrollWheel,
                controlPosition: wpslSettings.controlPosition
            };

        // If there are settings that are set through the shortcode, then we use them instead of the default ones.
        if ( ( typeof window[ "wpslMap_" + mapIndex ] !== "undefined" ) && ( typeof window[ "wpslMap_" + mapIndex ].shortCode !== "undefined" ) ) {
            for ( j = 0, len = settingOptions.length; j < len; j++ ) {
                shortCodeVal = window[ "wpslMap_" + mapIndex ].shortCode[ settingOptions[j] ];

                // If the value is set through the shortcode, we overwrite the default value.
                if ( typeof shortCodeVal !== "undefined" ) {
                    mapSettings[ settingOptions[j] ] = shortCodeVal;
                }
            }
        }

        mapSettings.startLatLng = getStartLatlng( mapIndex );

        return mapSettings;
    }

    /**
     * Get the latlng coordinates that are used to init the map.
     *
     * @since	2.0.0
     * @param	{number} mapIndex    Number of the map
     * @returns {object} startLatLng The latlng value where the map will initially focus on
     */
    function getStartLatlng( mapIndex ) {
        var startLatLng, latLng,
            firstLocation = "";

        /*
         * Maps that are added with the [wpsl_map] shortcode will have the locations key set.
         * If it exists we use the coordinates from the first location to center the map on.
         */
        if ( ( typeof window[ "wpslMap_" + mapIndex ] !== "undefined" ) && ( typeof window[ "wpslMap_" + mapIndex ].locations !== "undefined" ) ) {
            firstLocation = window[ "wpslMap_" + mapIndex ].locations[0];
        }

        /*
         * Either use the coordinates from the first location as the start coordinates
         * or the default start point defined on the settings page.
         *
         * If both are not available we set it to 0,0
         */
        if ( ( typeof firstLocation !== "undefined" && typeof firstLocation.lat !== "undefined" ) && ( typeof firstLocation.lng !== "undefined" ) ) {
            startLatLng = new google.maps.LatLng( firstLocation.lat, firstLocation.lng );
        } else if ( wpslSettings.startLatlng !== "" ) {
            latLng		= wpslSettings.startLatlng.split( "," );
            startLatLng = new google.maps.LatLng( latLng[0], latLng[1] );
        } else {
            startLatLng = new google.maps.LatLng( 0,0 );
        }

        return startLatLng;
    }

    /**
     * Create a new infoWindow object.
     *
     * Either use the default infoWindow or use the infobox library.
     *
     * @since  2.0.0
     * @return {object} infoWindow The infoWindow object
     */
    function newInfoWindow() {
        var boxClearance, boxPixelOffset,
            infoBoxOptions = {};

        // Do we need to use the infobox script or use the default info windows?
        if ( ( typeof wpslSettings.infoWindowStyle !== "undefined" ) && ( wpslSettings.infoWindowStyle == "infobox" ) ) {

            // See http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/docs/reference.html.
            boxClearance   = wpslSettings.infoBoxClearance.split( "," );
            boxPixelOffset = wpslSettings.infoBoxPixelOffset.split( "," );
            infoBoxOptions = {
                alignBottom: true,
                boxClass: wpslSettings.infoBoxClass,
                closeBoxMargin: wpslSettings.infoBoxCloseMargin,
                closeBoxURL: wpslSettings.infoBoxCloseUrl,
                content: "",
                disableAutoPan: ( Number( wpslSettings.infoBoxDisableAutoPan ) ) ? true : false,
                enableEventPropagation: ( Number( wpslSettings.infoBoxEnableEventPropagation ) ) ? true : false,
                infoBoxClearance: new google.maps.Size( Number( boxClearance[0] ), Number( boxClearance[1] ) ),
                pixelOffset: new google.maps.Size( Number( boxPixelOffset[0] ), Number( boxPixelOffset[1] ) ),
                zIndex: Number( wpslSettings.infoBoxZindex )
            };

            infoWindow = new InfoBox( infoBoxOptions );
        } else {
            infoWindow = new google.maps.InfoWindow();
        }

        return infoWindow;
    }

    /**
     * Check if we need to disable dragging on the map.
     *
     * Disabling dragging fixes the problem on mobile devices where
     * users are scrolling down a page, but can't get past the map
     * because the map itself is being dragged instead of the page.
     *
     * @since  2.1.0
     * @param  {object} map The map object.
     * @return {void}
     */
    function maybeDisableMapDrag( map ) {
        var disableRes = parseInt( wpslSettings.draggable.disableRes ),
            mapOption  = {
                draggable: Boolean( wpslSettings.draggable.enabled )
            };

        if ( disableRes !== "NaN" && mapOption.draggable ) {
            mapOption.draggable = $( document ).width() > disableRes ? true : false;
        }

        map.setOptions( mapOption );
    }

    /**
     * Get the required marker settings.
     *
     * @since  2.1.0
     * @return {object} settings The marker settings.
     */
    function getMarkerSettings() {
        var markerProp,
            markerProps = wpslSettings.markerIconProps,
            settings	= {};

        // If no custom marker path is provided, then we stick with the default one.
        if ( typeof markerProps.url !== "undefined" ) {
            settings.url = markerProps.url;
        } else {
            settings.url = wpslSettings.url + "img/markers/";
        }

        for ( var key in markerProps ) {
            if ( markerProps.hasOwnProperty( key ) ) {
                markerProp = markerProps[key].split( "," );

                if ( markerProp.length == 2 ) {
                    settings[key] = markerProp;
                }
            }
        }

        return settings;
    }

    /**
     * Check if we have a map style that we need to apply to the map.
     *
     * @since  2.0.0
     * @param  {string} mapStyle The id of the map
     * @return {void}
     */
    function maybeApplyMapStyle( mapStyle ) {

        // Make sure the JSON is valid before applying it as a map style.
        mapStyle = tryParseJSON( mapStyle );

        if ( mapStyle ) {
            map.setOptions({ styles: mapStyle });
        }
    }

    /**
     * Make sure the JSON is valid.
     *
     * @link   http://stackoverflow.com/a/20392392/1065294
     * @since  2.0.0
     * @param  {string} jsonString The JSON data
     * @return {object|boolean}	The JSON string or false if it's invalid json.
     */
    function tryParseJSON( jsonString ) {

        try {
            var o = JSON.parse( jsonString );

            /*
             * Handle non-exception-throwing cases:
             * Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
             * but... JSON.parse(null) returns 'null', and typeof null === "object",
             * so we must check for that, too.
             */
            if ( o && typeof o === "object" && o !== null ) {
                return o;
            }
        }
        catch ( e ) { }

        return false;
    }

    /**
     * Add the start marker and call the function that inits the store search.
     *
     * @since	1.1.0
     * @param	{object} startLatLng The start coordinates
     * @param	{object} infoWindow  The infoWindow object
     * @returns {void}
     */
    function showStores( startLatLng, infoWindow ) {
        addMarker( startLatLng, 0, '', true, infoWindow ); // This marker is the 'start location' marker. With a storeId of 0, no name and is draggable
        findStoreLocations( startLatLng, resetMap, autoLoad, infoWindow );
    }

    /**
     * Compare the current useragent to a list of known mobile useragents ( not optimal, I know ).
     *
     * @since	1.2.20
     * @returns {boolean} Whether the useragent is from a known mobile useragent or not.
     */
    function checkMobileUserAgent() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent );
    }

    /**
     * Check if Geolocation detection is supported.
     *
     * If there is an error / timeout with determining the users
     * location, then we use the 'start point' value from the settings
     * as the start location through the showStores function.
     *
     * @since	1.0.0
     * @param	{object} startLatLng The start coordinates
     * @param	{object} infoWindow  The infoWindow object
     * @returns {void}
     */
    function checkGeolocation( startLatLng, infoWindow ) {

        if ( navigator.geolocation ) {
            var geolocationInProgress, locationTimeout,
                keepStartMarker = false,
                timeout			= Number( wpslSettings.geoLocationTimout );

            // Make the direction icon flash every 600ms to indicate the geolocation attempt is in progress.
            geolocationInProgress = setInterval( function() {
                $( ".wpsl-icon-direction" ).toggleClass( "wpsl-active-icon" );
            }, 600 );

            /*
             * If the user doesn't approve the geolocation request within the value set in
             * wpslSettings.geoLocationTimout, then the default map is loaded.
             *
             * You can increase the timeout value with the wpsl_geolocation_timeout filter.
             */
            locationTimeout = setTimeout( function() {
                geolocationFinished( geolocationInProgress );
                showStores( startLatLng, infoWindow );
            }, timeout );

            navigator.geolocation.getCurrentPosition( function( position ) {
                    geolocationFinished( geolocationInProgress );
                    clearTimeout( locationTimeout );

                    /*
                     * If the timeout is triggerd and the user later decides to enable
                     * the geolocation detection again, it gets messy with multiple start markers.
                     *
                     * So we first clear the map before adding new ones.
                     */
                    deleteOverlays( keepStartMarker );
                    handleGeolocationQuery( startLatLng, position, resetMap, infoWindow );

                    /*
                     * Workaround for this bug in Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1283563.
                     * to keep track if the geolocation code has already run.
                     *
                     * Otherwise after the users location is determined succesfully the code
                     * will also detect the returned error, and triggers showStores() to
                     * run with the start location set in the incorrect location.
                     */

                    $( ".wpsl-search").addClass( "wpsl-geolocation-run" );
                }, function( error ) {

                    /*
                     * Only show the geocode errors if the user actually clicked on the direction icon.
                     *
                     * Otherwise if the "Attempt to auto-locate the user" option is enabled on the settings page,
                     * and the geolocation attempt fails for whatever reason ( blocked in browser, unavailable etc ).
                     * Then the first thing the visitor will see on pageload is an alert box, which isn't very userfriendly.
                     *
                     * If an error occurs on pageload without the user clicking on the direction icon,
                     * the default map is shown without any alert boxes.
                     */
                    if ( $( ".wpsl-icon-direction" ).hasClass( "wpsl-user-activated" ) && !$( ".wpsl-search" ).hasClass( "wpsl-geolocation-run" ) ) {
                        switch ( error.code ) {
                            case error.PERMISSION_DENIED:
                                alert( wpslGeolocationErrors.denied );
                                break;
                            case error.POSITION_UNAVAILABLE:
                                alert( wpslGeolocationErrors.unavailable );
                                break;
                            case error.TIMEOUT:
                                alert( wpslGeolocationErrors.timeout );
                                break;
                            default:
                                alert( wpslGeolocationErrors.generalError );
                                break;
                        }

                        $( ".wpsl-icon-direction" ).removeClass( "wpsl-active-icon" );
                    } else if ( !$( ".wpsl-search" ).hasClass( "wpsl-geolocation-run" ) ) {
                        clearTimeout( locationTimeout );
                        showStores( startLatLng, infoWindow );
                    }
                },
                { maximumAge: 60000, timeout: timeout, enableHighAccuracy: true } );
        } else {
            alert( wpslGeolocationErrors.unavailable );
            showStores( startLatLng, infoWindow );
        }
    }

    /**
     * Clean up after the geolocation attempt finished.
     *
     * @since	2.0.0
     * @param	{number} geolocationInProgress
     * @returns {void}
     */
    function geolocationFinished( geolocationInProgress ) {
        clearInterval( geolocationInProgress );
        $( ".wpsl-icon-direction" ).removeClass( "wpsl-active-icon" );
    }

    /**
     * Handle the data returned from the Geolocation API.
     *
     * If there is an error / timeout determining the users location,
     * then we use the 'start point' value from the settings as the start location through the showStores function.
     *
     * @since	1.0.0
     * @param	{object}  startLatLng The start coordinates
     * @param	{object}  position    The latlng coordinates from the geolocation attempt
     * @param	{boolean} resetMap    Whether we should reset the map or not
     * @param	{object}  infoWindow  The infoWindow object
     * @returns {void}
     */
    function handleGeolocationQuery( startLatLng, position, resetMap, infoWindow ) {

        if ( typeof( position ) === "undefined" ) {
            showStores( startLatLng, infoWindow );
        } else {
            var latLng = new google.maps.LatLng( position.coords.latitude, position.coords.longitude );

            /*
             * Store the latlng from the geolocation for when the user hits "reset" again
             * without having to ask for permission again.
             */
            geolocationLatlng = position;

            reverseGeocode( latLng ); // Set the zipcode that belongs to the latlng in the input field
            map.setCenter( latLng );
            addMarker( latLng, 0, '', true, infoWindow ); // This marker is the 'start location' marker. With a storeId of 0, no name and is draggable
            findStoreLocations( latLng, resetMap, autoLoad, infoWindow );
        }
    }

    /**
     * Handle clicks on the store locator search button.
     *
     * @since	1.0.0
     * @todo disable button while AJAX request still runs.
     * @param	{object} infoWindow The infoWindow object
     * @returns {void}
     */
    function searchLocationBtn( infoWindow ) {

        $( "#wpsl-search-btn" ).unbind( "click" ).bind( "click", function( e ) {
            var keepStartMarker = false;
            viewmore = 0;
            $("#wpsl-result-list .view-more-btn-container").hide();
            $( "#wpsl-result-list #page-button-container").hide();
            $( "#wpsl-search-input" ).removeClass();

            if ( !$( "#wpsl-search-input" ).val() ) {
                $( "#wpsl-search-input" ).addClass( "wpsl-error" ).focus();
            } else {
                $( "#wpsl-result-list ul" ).empty();
                $( "#wpsl-stores" ).show();
                $( ".wpsl-direction-before, .wpsl-direction-after" ).remove();
                $( "#wpsl-direction-details" ).hide();

                resetMap = false;

                // Force the open InfoBox info window to close.
                closeInfoBoxWindow();

                deleteOverlays( keepStartMarker );
                deleteStartMarker();

                /*
                 * Check if we need to geocode the user input,
                 * or if autocomplete is enabled and we already
                 * have the latlng values.
                 */
                if ( wpslSettings.autoComplete == 1 && typeof autoCompleteLatLng !== "undefined" ) {
                    prepareStoreSearch( autoCompleteLatLng, infoWindow );
                } else {
                    codeAddress( infoWindow );
                }
                searchbigLocationBtn( biginfoWindow );
            }

            return false;
        });
    }

    /**
     * Force the open InfoBox info window to close
     *
     * This is required if the user makes a new search,
     * or clicks on the "Directions" link.
     *
     * @since  2.0.0
     * @return {void}
     */
    function closeInfoBoxWindow() {
        if ( ( typeof wpslSettings.infoWindowStyle !== "undefined" ) && ( wpslSettings.infoWindowStyle == "infobox" ) && typeof openInfoWindow[0] !== "undefined" ) {
            for ( i = 0, len = openInfoWindow.length; i < len; i++ ) {
                openInfoWindow[i].close();
            }
        }
    }

    /**
     * Add the 'reload' and 'find location' icon to the map.
     *
     * @since  2.0.0
     * @param  {object} settings   Map settings
     * @param  {object} map		   The map object
     * @param  {object} infoWindow The info window object
     * @return {void}
     */
    function mapControlIcons( settings, map, infoWindow ) {

        // Once the map has finished loading include the map control button(s).
        google.maps.event.addListenerOnce( map, "tilesloaded", function() {

            // Add the html for the map controls to the map.
            $( ".gm-style" ).append( wpslSettings.mapControls );

            if ( $( ".wpsl-icon-reset, #wpsl-reset-map" ).length > 0 ) {

                // Bind the reset map button.
                resetMapBtn( settings.startLatLng, infoWindow );

                /*
                 * Hide it to prevent users from clicking it before
                 * the store location are placed on the map.
                 */
                $( ".wpsl-icon-reset" ).hide();
            }

            // Bind the direction button to trigger a new geolocation request.
            $( ".wpsl-icon-direction" ).on( "click", function() {
                $( this ).addClass( "wpsl-user-activated" );
                checkGeolocation( settings.startLatLng, infoWindow );
            });
        });
    }

    /**
     * Handle clicks on the "Reset" button.
     *
     * @since	1.0.0
     * @param	{object} startLatLng The start coordinates
     * @param	{object} infoWindow  The infoWindow object
     * @returns {void}
     */
    function resetMapBtn( startLatLng, infoWindow ) {
        $( ".wpsl-icon-reset, #wpsl-reset-map" ).on( "click", function() {
            var keepStartMarker = false,
                resetMap	    = true;

            /*
             * Check if a map reset is already in progress,
             * if so prevent another one from starting.
             */
            if ( $( this ).hasClass( "wpsl-in-progress" ) ) {
                return;
            }

            /*
             * When the start marker is dragged the autoload value is set to false.
             * So we need to check the correct value when the reset button is
             * pushed before reloading the stores.
             */
            if ( wpslSettings.autoLoad == 1 ) {
                autoLoad = 1;
            }

            // Check if the latlng or zoom has changed since pageload, if so there is something to reset.
            if ( ( ( ( map.getCenter().lat() !== mapDefaults.centerLatlng.lat() ) || ( map.getCenter().lng() !== mapDefaults.centerLatlng.lng() ) || ( map.getZoom() !== mapDefaults.zoomLevel ) ) ) ) {
                deleteOverlays( keepStartMarker );

                $( "#wpsl-search-input" ).val( "" ).removeClass();

                // We use this to prevent multiple reset request.
                $( ".wpsl-icon-reset" ).addClass( "wpsl-in-progress" );

                // If marker clusters exist, remove them from the map.
                if ( markerClusterer ) {
                    markerClusterer.clearMarkers();
                }

                // Remove the start marker.
                deleteStartMarker();

                // Reset the dropdown values.
                resetDropdowns();

                if ( wpslSettings.autoLocate == 1 ) {
                    handleGeolocationQuery( startLatLng, geolocationLatlng, resetMap, infoWindow );
                } else {
                    showStores( startLatLng, infoWindow );
                }
            }

            // Make sure the stores are shown and the direction details are hidden.
            $( "#wpsl-stores" ).show();
            $( "#wpsl-direction-details" ).hide();
        });
    }

    /**
     * Remove the start marker from the map.
     *
     * @since   1.2.12
     * @returns {void}
     */
    function deleteStartMarker() {
        if ( ( typeof( startMarkerData ) !== "undefined" ) && ( startMarkerData !== "" ) ) {
            startMarkerData.setMap( null );
            startMarkerData = "";
        }
    }

    /**
     * Reset the dropdown values for the max results,
     * and search radius after the "reset" button is triggerd.
     *
     * @since   1.1.0
     * @returns {void}
     */
    function resetDropdowns() {
        var i, arrayLength, dataValue, catText, $customDiv, $customFirstLi, customSelectedText, customSelectedData,
            defaultFilters = $( "#wpsl-wrap" ).hasClass( "wpsl-default-filters" ),
            defaultValues  = [wpslSettings.searchRadius + ' ' + wpslSettings.distanceUnit, wpslSettings.maxResults],
            dropdowns	   = ["wpsl-radius", "wpsl-results"];

        for ( i = 0, arrayLength = dropdowns.length; i < arrayLength; i++ ) {
            $( "#" + dropdowns[i] + " select" ).val( parseInt( defaultValues[i] ) );
            $( "#" + dropdowns[i] + " li" ).removeClass();

            if ( dropdowns[i] == "wpsl-radius" ) {
                dataValue = wpslSettings.searchRadius;
            } else if ( dropdowns[i] == "wpsl-results" ) {
                dataValue = wpslSettings.maxResults;
            }

            $( "#" + dropdowns[i] + " li" ).each( function() {
                if ( $( this ).text() === defaultValues[i] ) {
                    $( this ).addClass( "wpsl-selected-dropdown" );

                    $( "#" + dropdowns[i] + " .wpsl-selected-item" ).html( defaultValues[i] ).attr( "data-value", dataValue );
                }
            });
        }

        /**
         * Reset the category dropdown.
         * @todo look for other way to do this in combination with above code. Maybe allow users to define a default cat on the settings page?
         */
        if ( $( "#wpsl-category" ).length ) {
            $( "#wpsl-category select" ).val( 0 );
            $( "#wpsl-category li" ).removeClass();
            $( "#wpsl-category li:first-child" ).addClass( "wpsl-selected-dropdown" );

            catText = $( "#wpsl-category li:first-child" ).text();

            $( "#wpsl-category .wpsl-selected-item" ).html( catText ).attr( "data-value", 0 );
        }

        // If any custom dropdowns exist, then we reset them as well.
        if ( $( ".wpsl-custom-dropdown" ).length > 0 ) {
            $( ".wpsl-custom-dropdown" ).each( function( index ) {

                // Check if we are dealing with the styled dropdowns, or the default select dropdowns.
                if ( !defaultFilters ) {
                    $customDiv		   = $( this ).siblings( "div" );
                    $customFirstLi	   = $customDiv.find( "li:first-child" );
                    customSelectedText = $customFirstLi.text();
                    customSelectedData = $customFirstLi.attr( "data-value" );

                    $customDiv.find( "li" ).removeClass();
                    $customDiv.prev().html( customSelectedText ).attr( "data-value", customSelectedData );
                } else {
                    $( this ).find( "option" ).removeAttr( "selected" );
                }
            });
        }
    }

// Handle the click on the back button when the route directions are displayed.
    $( "#wpsl-result-list" ).on( "click", ".wpsl-back", function() {
        var i, len;

        // Remove the directions from the map.
        directionsDisplay.setMap( null );

        // Restore the store markers on the map.
        for ( i = 0, len = markersArray.length; i < len; i++ ) {
            markersArray[i].setMap( map );
        }

        // Restore the start marker on the map.
        if ( ( typeof( startMarkerData ) !== "undefined" )  && ( startMarkerData !== "" ) ) {
            startMarkerData.setMap( map );
        }

        // If marker clusters are enabled, restore them.
        if ( markerClusterer ) {
            checkMarkerClusters();
        }

        map.setCenter( directionMarkerPosition.centerLatlng );
        map.setZoom( directionMarkerPosition.zoomLevel );

        $( ".wpsl-direction-before, .wpsl-direction-after" ).remove();
        $( "#wpsl-stores" ).show();
        $( "#wpsl-direction-details" ).hide();

        return false;
    });
    
    /* Back Button Dealer Details DJ */
    /* Handle the click on the back button when the dealer details are displayed */
    $( "#wpsl-dealer-details" ).on( "click", ".wpsl-back-search", function() {	
        var i, len;

        var oldUrl = window.location.href
        var mainurl = oldUrl.split("#");

        if(mainurl[0]!=window.location){
            window.history.pushState({path:mainurl[0]},'',mainurl[0]);
        }

        //closeInfoBoxWindow();

        /* Remove the directions from the map */
        directionsDisplay.setMap( null );

        /* Restore the store markers on the map */
        $( "#wpsl-wrap" ).show();
        initializeGmap( 'wpsl-gmap', 0 );
        var gmap = document.getElementById("wpsl-gmap").map;
        //alert(markersArray.length)
        for ( i = 0, len = markersArray.length; i < len; i++ ) {
            markersArray[i].setMap( gmap );
            markerClickEvent(markersArray[i], gmap, storeDataCache[parseInt(markersArray[i].id)], 0);
        }

        /* Restore the start marker on the map */
        if ( ( typeof( startMarkerData ) !== "undefined" )  && ( startMarkerData !== "" ) ) {
            startMarkerData.setMap( gmap );
        }

        /* If marker clusters are enabled, restore them */
        if ( markerClusterer ) {		
            checkMarkerClusters();			
        }

        gmap.setCenter( directionMarkerPosition.centerLatlng );
        gmap.setZoom( directionMarkerPosition.zoomLevel );	

        $( ".wpsl-direction-before, .wpsl-direction-after" ).remove();
        $("#wpsl-dealer-details .dealers-data").html('');
        $( "#wpsl-dealer-details" ).hide();
        $('html,body').animate({scrollTop: $("#search-location").offset().top},'slow');

        fitBounds("wpsl-gmap");
        closeInfoBoxWindow();
        var str = $('#big-map-container').attr('style');
        if (str.indexOf('visibility: visible') > 0) {
            // directionsDisplay.setMap( null )
            var bigmap = document.getElementById("big-map-canvas").map;
            for ( i = 0, len = markersArray.length; i < len; i++ ) {
                markersArray[i].setMap( bigmap );
            }
            fitBounds("big-map-canvas");
        }

        return false;
    });

    /**
     * Show the driving directions.
     *
     * @since	1.1.0
     * @param	{object} e The clicked elemennt
     * @returns {void}
     */
    function renderDirections( e ) {
        var i, start, end, len, storeId;

        // Force the open InfoBox info window to close.
        closeInfoBoxWindow();

        /*
         * The storeId is placed on the li in the results list,
         * but in the marker it will be on the wrapper div. So we check which one we need to target.
         */
        if ( e.parents( "li" ).length > 0 ) {
            storeId = e.parents( "li" ).data( "store-id" );
        } else {
            storeId = e.parents( ".wpsl-info-window" ).data( "store-id" );
        }

        // Check if we need to get the start point from a dragged marker.
        if ( ( typeof( startMarkerData ) !== "undefined" )  && ( startMarkerData !== "" ) ) {
            start = startMarkerData.getPosition();
        }

        // Used to restore the map back to the state it was in before the user clicked on 'directions'.
        directionMarkerPosition = {
            centerLatlng: map.getCenter(),
            zoomLevel: map.getZoom()
        };

        // Find the latlng that belongs to the start and end point.
        for ( i = 0, len = markersArray.length; i < len; i++ ) {

            // Only continue if the start data is still empty or undefined.
            if ( ( markersArray[i].storeId == 0 ) && ( ( typeof( start ) === "undefined" ) || ( start === "" ) ) ) {
                start = markersArray[i].getPosition();
            } else if ( markersArray[i].storeId == storeId ) {
                end = markersArray[i].getPosition();
            }
        }

        if ( start && end ) {
            $( "#wpsl-direction-details ul" ).empty();
            $( ".wpsl-direction-before, .wpsl-direction-after" ).remove();
            calcRoute( start, end );
        } else {
            alert( wpslLabels.generalError );
        }
    }

    /**
     * Check what effect is triggerd once a user hovers over the store list.
     * Either bounce the corresponding marker up and down, open the info window or ignore it.
     */
    if ( $( "#wpsl-gmap" ).length ) {
        if ( wpslSettings.markerEffect == 'bounce' ) {
            $( "#wpsl-stores" ).on( "mouseenter", "li", function() {
                letsBounce( $( this ).data( "store-id" ), "start" );
            });

            $( "#wpsl-stores" ).on( "mouseleave", "li", function() {
                letsBounce( $( this ).data( "store-id" ), "stop" );
            });
        } else if ( wpslSettings.markerEffect == 'info_window' ) {
            $( "#wpsl-stores" ).on( "mouseenter", "li", function() {
                var i, len;

                for ( i = 0, len = markersArray.length; i < len; i++ ) {
                    if ( markersArray[i].storeId == $( this ).data( "store-id" ) ) {
                        google.maps.event.trigger( markersArray[i], "click" );
                        map.setCenter( markersArray[i].position );
                    }
                }
            });
        }
    }

    /**
     * Let a single marker bounce.
     *
     * @since	1.0.0
     * @param	{number} storeId The storeId of the marker that we need to bounce on the map
     * @param	{string} status  Indicates whether we should stop or start the bouncing
     * @returns {void}
     */
    function letsBounce( storeId, status ) {
        var i, len, marker;

        bouncePath = wpslSettings.url + "img/markers/" + wpslSettings.storeMarker; /* this image get from plugins setting from backend*/
        bounce_hover = wpslSettings.url + "img/markers/dark-orange.png";
        mapIconOrigin = {
            url: bouncePath,
            scaledSize: new google.maps.Size( Number( markerSettings.scaledSize[0] ), Number( markerSettings.scaledSize[1] ) ), //retina format
            origin: new google.maps.Point( Number( markerSettings.origin[0] ), Number( markerSettings.origin[1] ) ),
            anchor: new google.maps.Point( Number( markerSettings.anchor[0] ), Number( markerSettings.anchor[1] ) )
        };
        mapIconHover = {
            url: bounce_hover,
            scaledSize: new google.maps.Size( Number( markerSettings.scaledSize[0] ), Number( markerSettings.scaledSize[1] ) ), //retina format
            origin: new google.maps.Point( Number( markerSettings.origin[0] ), Number( markerSettings.origin[1] ) ),
            anchor: new google.maps.Point( Number( markerSettings.anchor[0] ), Number( markerSettings.anchor[1] ) )
        };
        // Find the correct marker to bounce based on the storeId.
        for ( i = 0, len = markersArray.length; i < len; i++ ) {
            if ( markersArray[i].storeId == storeId ) {
                marker = markersArray[i];

                if ( status == "start" ) {
                    // marker.setAnimation( google.maps.Animation.BOUNCE );
                    marker.setIcon(mapIconHover);
                } else {
                    // marker.setAnimation( null );
                    marker.setIcon(mapIconOrigin);
                }
            }
        }
    }

    /**
     * Calculate the route from the start to the end.
     *
     * @since	1.0.0
     * @param	{object} start The latlng from the start point
     * @param	{object} end   The latlng from the end point
     * @returns {void}
     */
    function calcRoute( start, end ) {
        var legs, len, step, index, direction, i, j, distanceUnit, directionOffset,
            directionStops = "",
            request = {};

        if ( wpslSettings.distanceUnit == "km" ) {
            distanceUnit = 'METRIC';
        } else {
            distanceUnit = 'IMPERIAL';
        }

        request = {
            origin: start,
            destination: end,
            travelMode: google.maps.DirectionsTravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem[ distanceUnit ]
        };

        directionsService.route( request, function( response, status ) {
            if ( status == google.maps.DirectionsStatus.OK ) {
                directionsDisplay.setMap( map );
                directionsDisplay.setDirections( response );

                if ( response.routes.length > 0 ) {
                    direction = response.routes[0];

                    // Loop over the legs and steps of the directions.
                    for ( i = 0; i < direction.legs.length; i++ ) {
                        legs = direction.legs[i];

                        for ( j = 0, len = legs.steps.length; j < len; j++ ) {
                            step = legs.steps[j];
                            index = j+1;
                            directionStops = directionStops + "<li><div class='wpsl-direction-index'>" + index + "</div><div class='wpsl-direction-txt'>" + step.instructions + "</div><div class='wpsl-direction-distance'>" + step.distance.text + "</div></li>";
                        }
                    }

                    $( "#wpsl-direction-details ul" ).append( directionStops ).before( "<div class='wpsl-direction-before'><a class='wpsl-back' id='wpsl-direction-start' href='#'>" + wpslLabels.back + "</a><div><span class='wpsl-total-distance'>" + direction.legs[0].distance.text + "</span> - <span class='wpsl-total-durations'>" + direction.legs[0].duration.text + "</span></div></div>" ).after( "<p class='wpsl-direction-after'>" + response.routes[0].copyrights + "</p>" );
                    $( "#wpsl-direction-details" ).show();

                    // Remove all single markers from the map.
                    for ( i = 0, len = markersArray.length; i < len; i++ ) {
                        markersArray[i].setMap( null );
                    }

                    // Remove the marker clusters from the map.
                    if ( markerClusterer ) {
                        markerClusterer.clearMarkers();
                    }

                    // Remove the start marker from the map.
                    if ( ( typeof( startMarkerData ) !== "undefined" ) && ( startMarkerData !== "" ) ) {
                        startMarkerData.setMap( null );
                    }

                    $( "#wpsl-stores" ).hide();

                    // Make sure the start of the route directions are visible if the store listings are shown below the map.
                    if ( wpslSettings.templateId == 1 ) {
                        directionOffset = $( "#wpsl-gmap" ).offset();
                        $( window ).scrollTop( directionOffset.top );
                    }
                }
            } else {
                directionErrors( status );
            }
        });
    }

    /**
     * Geocode the user input.
     *
     * @since	1.0.0
     * @param	{object} infoWindow The infoWindow object
     * @returns {void}
     */
    function codeAddress( infoWindow ) {
        var latLng,
            request = {
                'address': $( "#wpsl-search-input" ).val()
            };

        // Check if we need to set the geocode component restrictions.
        if ( typeof wpslSettings.geocodeComponents !== "undefined" && !$.isEmptyObject( wpslSettings.geocodeComponents ) ) {
            request.componentRestrictions = wpslSettings.geocodeComponents;
        }

        geocoder.geocode( request, function( response, status ) {
            if ( status == google.maps.GeocoderStatus.OK ) {
                latLng = response[0].geometry.location;

                prepareStoreSearch( latLng, infoWindow );
            } else {
                geocodeErrors( status );
            }
        });
    }

    /**
     * Prepare a new location search.
     *
     * @since	2.2.0
     * @param	{object} latLng
     * @param	{object} infoWindow The infoWindow object.
     * @returns {void}
     */
    function prepareStoreSearch( latLng, infoWindow ) {
        var autoLoad = false;

        // Add a new start marker.
        addMarker( latLng, 0, '', true, infoWindow );

        // Try to find stores that match the radius, location criteria.
        findStoreLocations( latLng, resetMap, autoLoad, infoWindow );
    }

    /**
     * Geocode the user input and set the returned zipcode in the input field.
     *
     * @since	1.0.0
     * @param	{object} latLng The coordinates of the location that should be reverse geocoded
     * @returns {void}
     */
    function reverseGeocode( latLng ) {
        var zipCode;

        geocoder.geocode( {'latLng': latLng}, function( response, status ) {
            if ( status == google.maps.GeocoderStatus.OK ) {
                zipCode = filterApiResponse( response );

                if ( zipCode !== "" ) {
                    $( "#wpsl-search-input" ).val( zipCode );
                }
            } else {
                geocodeErrors( status );
            }
        });
    }

    /**
     * Filter out the zipcode from the response.
     *
     * @since	1.0.0
     * @param	{object} response The complete Google API response
     * @returns {string} zipcode  The zipcode
     */
    function filterApiResponse( response ) {
        var zipcode, responseType, i,
            addressLength = response[0].address_components.length;

        // Loop over the API response.
        for ( i = 0; i < addressLength; i++ ){
            responseType = response[0].address_components[i].types;

            // filter out the postal code.
            if ( ( /^postal_code$/.test( responseType ) ) || ( /^postal_code_prefix,postal_code$/.test( responseType ) ) ) {
                zipcode = response[0].address_components[i].long_name;
            }
        }

        return zipcode;
    }

    /**
     * Call the function to make the ajax request to load the store locations.
     *
     * If we need to show the driving directions on maps.google.com itself,
     * we first need to geocode the start latlng into a formatted address.
     *
     * @since	1.0.0
     * @param	{object}  startLatLng The latlng used as the starting point
     * @param	{boolean} resetMap    Whether we should reset the map or not
     * @param	{string}  autoLoad    Check if we need to autoload all the stores
     * @param	{object}  infoWindow  The infoWindow object
     * @returns {void}
     */
    function findStoreLocations( startLatLng, resetMap, autoLoad, infoWindow ) {

        // Check if we need to open a new window and show the route on the Google Maps site itself.
        if ( wpslSettings.directionRedirect == 1 ) {
            findFormattedAddress( startLatLng, function() {
                makeAjaxRequest( startLatLng, resetMap, autoLoad, infoWindow );
            });
        } else {
            makeAjaxRequest( startLatLng, resetMap, autoLoad, infoWindow );
        }
    }

    /**
     * Convert the latlng into a formatted address.
     *
     * @since	1.0.0
     * @param	{object} latLng The latlng to geocode
     * @param	{callback} callback
     * @returns {void}
     */
    function findFormattedAddress( latLng, callback ) {
        geocoder.geocode( {'latLng': latLng}, function( response, status ) {
            if ( status == google.maps.GeocoderStatus.OK ) {
                startAddress = response[0].formatted_address;
                callback();
            } else {
                geocodeErrors( status );
            }
        });
    }

    /**
     * Make the AJAX request to load the store data.
     *
     * @since	1.2.0
     * @param	{object}  startLatLng The latlng used as the starting point
     * @param	{boolean} resetMap    Whether we should reset the map or not
     * @param	{string}  autoLoad    Check if we need to autoload all the stores
     * @param	{object}  infoWindow  The infoWindow object
     * @returns {void}
     */
    function makeAjaxRequest( startLatLng, resetMap, autoLoad, infoWindow, page, perpage, lastindex ) {
        var latLng, noResultsMsg,
            ajaxData   = {},
            ajaxBigData   = {},
            storeData  = "",
            draggable  = false,
            template   = $( "#wpsl-listing-template" ).html(),
            $storeList = $( "#wpsl-stores ul" ),
            preloader  = wpslSettings.url + "img/ajax-loader.gif";
        wpslResponseData = null;
        wpslBigResponseData = null;
        ajaxData = collectAjaxData( startLatLng, resetMap, autoLoad );
        ajaxBigData = collectAjaxData( startLatLng, resetMap, autoLoad );
        page = typeof page !== 'undefined' ? page : 1;
		perpage = typeof perpage !== 'undefined' ? perpage : 3;
		lastindex = typeof lastindex !== 'undefined' ? lastindex : 0;
        ajaxData['page'] = page;
        ajaxData['perpage'] = perpage;
        ajaxData['lastindex'] = lastindex;

        ajaxBigData['page'] = 0;
        ajaxBigData['perpage'] = 'all';
        ajaxBigData['lastindex'] = 0;

        // Add the preloader.
        $storeList.empty().append( "<li class='wpsl-preloader'><img src='" + preloader + "'/>" + wpslLabels.preloader + "</li>" );
        $.get( wpslSettings.ajaxurl, ajaxData, function( response ) {

            // Remove the preloaders and no results msg.
            $( ".wpsl-preloader, .no-results" ).remove();

            if ( response.length > 0 ) {
                removeMarker();
                markersArray = [];
                if(response[0].total > page && viewmore == 0) {
                    $("#wpsl-result-list .view-more-btn-container").show();
                }
                var pagetotal = Math.ceil(response[0].total / perpage);
                wpslResponseData = response;
                // Loop over the returned locations.
                $.each( response, function( index ) {
                    _.extend( response[index], templateHelpers );
                    storeDataCache[response[index]['id']] = response[index];
                    // Add the location maker to the map.
                    latLng = new google.maps.LatLng( response[index].lat, response[index].lng );
                    addMarker( latLng, response[index].id, response[index], draggable, infoWindow);
                       listindex = response[index].row;
                    // Create the HTML output with help from underscore js.
                    storeData = storeData + _.template( template )( response[index] );
                });

                $( "#wpsl-result-list" ).off( "click", ".wpsl-directions" );

                // Remove the old search results.
                $storeList.empty();

                // Add the html for the store listing to the <ul>.
                $storeList.append( storeData );

                $( ".view-large-map" ).show();

                $( "#wpsl-result-list" ).on( "click", ".wpsl-directions", function() {

                    // Check if we need to render the direction on the map.
                    if ( wpslSettings.directionRedirect != 1 ) {
                        renderDirections( $( this ) );

                        return false;
                    }
                });

                // Do we need to create a marker cluster?
                checkMarkerClusters();
                $( "#wpsl-result-list .map-view-more-btn" ).off('click').on("click", function(){
                    $("#wpsl-result-list .view-more-btn-container").hide();
                    $( "#wpsl-result-list #page-button-container").show();
                    viewmore = 1;
                    closeInfoBoxWindow();
//                    removeMarker(1);
                    makeAjaxRequest( startLatLng, resetMap, autoLoad, infoWindow, page, 10, listindex );
                    
                    // $( "#big-map-container" ).find(".big-view-more-btn").trigger( "click" );
                });

                if(page >= pagetotal) {
                    $( "#wpsl-result-list .view-next-page-btn").css('cursor','default');
                    $( "#wpsl-result-list .view-next-page-btn").css('opacity', 0.4);
                    $( "#wpsl-result-list" ).off("click", ".view-next-page-btn");
                } else {
                    $( "#wpsl-result-list .view-next-page-btn").css('cursor','pointer');
                    $( "#wpsl-result-list .view-next-page-btn").css('opacity', 1);
                }

                if(page <= 1) {
                    $( "#wpsl-result-list .view-previous-page-btn").css('cursor','default');
                    $( "#wpsl-result-list .view-previous-page-btn").css('opacity', 0.4);
                } else {
                    $( "#wpsl-result-list .view-previous-page-btn").css('cursor','pointer');
                    $( "#wpsl-result-list .view-previous-page-btn").css('opacity', 1);
                }


                $( "#wpsl-result-list .view-next-page-btn" ).off('click').on("click", function(){
                    if(page >= pagetotal) {
                        return false;
                    }
                    page = page+1;
                    makeAjaxRequest( startLatLng, resetMap, autoLoad, infoWindow, page, 10, listindex );
                });

                $( "#wpsl-result-list .view-previous-page-btn" ).off('click').on("click", function(){
                    if(page <= 1) {
                        return false;
                    }
                    page = page-1;
                    listindex = listindex - (perpage + perpage);
                    listindex = (listindex < 0) ? 0 : listindex;
                    makeAjaxRequest( startLatLng, resetMap, autoLoad, infoWindow, page, 10, listindex );
                });
                $( "#wpsl-result-list p:empty" ).remove();
            } else {
                addMarker( startLatLng, 0, '', true, infoWindow );

                noResultsMsg = getNoResultsMsg();

                $storeList.html( "<li class='no-results'>" + noResultsMsg + "</li>" );
            }

            // Make sure everything fits on the screen.
            fitBounds();

            /*
             * Store the default zoom and latlng values the first time
             * all the stores are added to the map.
             *
             * This way when a user clicks the reset button we can check if the
             * zoom/latlng values have changed, and if they have, then we know we
             * need to reload the map.
             */
            if ( wpslSettings.resetMap == 1 ) {
                if ( $.isEmptyObject( mapDefaults ) ) {
                    google.maps.event.addListenerOnce( map, "tilesloaded", function() {
                        mapDefaults = {
                            centerLatlng: map.getCenter(),
                            zoomLevel: map.getZoom()
                        };

                        /*
                         * Because the reset icon exists, we need to adjust
                         * the styling of the direction icon.
                         */
                        $( "#wpsl-map-controls" ).addClass( "wpsl-reset-exists" );

                        /*
                         * The reset initialy is set to hidden to prevent
                         * users from clicking it before the map is loaded.
                         */
                        $( ".wpsl-icon-reset, #wpsl-reset-map" ).show();
                    });
                }

                $( ".wpsl-icon-reset" ).removeClass( "wpsl-in-progress" );
            }

            $.get( wpslSettings.ajaxurl, ajaxBigData, function( response ) {

                // Remove the preloaders and no results msg.
                $(".wpsl-preloader, .no-results").remove();

                if (response.length > 0) {
                    removeMarker(2);
                    markersBigArray = [];

                    wpslBigResponseData = response;
                    // Loop over the returned locations.
                    $.each(response, function (index) {
                        _.extend(response[index], templateHelpers);
                        storeDataCache[response[index]['id']] = response[index];
                        // Add the location maker to the map.
                        latLng = new google.maps.LatLng(response[index].lat, response[index].lng);
                        addMarker(latLng, response[index].id, response[index], draggable, infoWindow, 2);
                        listindex = response[index].row;
                       
                    });

                    if(bigopen === 1) {
                        var bigmap = document.getElementById("big-map-canvas").map;

                        for (var i = 0, len = markersArray.length; i < len; i++) {
                            markersArray[i].setMap(bigmap);
                            markerClickEvent(markersArray[i], bigmap, storeDataCache[parseInt(markersArray[i].id)], 1);
                        }
                        fitBounds("big-map-canvas");
                    }
                }
            })

        });
        

        // Move the mousecursor to the store search field if the focus option is enabled.
        if ( wpslSettings.mouseFocus == 1 && !checkMobileUserAgent() ) {
            $( "#wpsl-search-input" ).focus();
        }
    }

    /**
     * Collect the data we need to include in the AJAX request.
     *
     * @since	2.2.0
     * @param	{object}  startLatLng The latlng used as the starting point
     * @param	{boolean} resetMap    Whether we should reset the map or not
     * @param	{string}  autoLoad    Check if we need to autoload all the stores
     * @returns {object}  ajaxData	  The collected data.
     */
    function collectAjaxData( startLatLng, resetMap, autoLoad ) {
        var maxResult, radius, customName, customValue,
            categoryId	   = "",
            isMobile	   = $( "#wpsl-wrap" ).hasClass( "wpsl-mobile" ),
            defaultFilters = $( "#wpsl-wrap" ).hasClass( "wpsl-default-filters" ),
            ajaxData = {
                action: "store_search",
                lat: startLatLng.lat(),
                lng: startLatLng.lng()
            };

        /*
         * If we reset the map we use the default dropdown values instead of the selected values.
         * Otherwise we first make sure the filter val is valid before including the radius / max_results param
         */
        if ( resetMap ) {
            ajaxData.max_results = wpslSettings.maxResults;
            ajaxData.radius	     = wpslSettings.searchRadius;
        } else {
            if ( isMobile || defaultFilters ) {
                maxResult = parseInt( $( "#wpsl-results .wpsl-dropdown" ).val() );
                radius 	  = parseInt( $( "#wpsl-radius .wpsl-dropdown" ).val() );
            } else {
                maxResult = parseInt( $( "#wpsl-results .wpsl-selected-item" ).attr( "data-value" ) );
                radius    = parseInt( $( "#wpsl-radius .wpsl-selected-item" ).attr( "data-value" ) );
            }

            // If the max resuls or radius filter values are NaN, then we use the default value.
            if ( isNaN( maxResult ) ) {
                ajaxData.max_results = wpslSettings.maxResults;
            } else {
                ajaxData.max_results = maxResult;
            }

            if ( isNaN( radius ) ) {
                ajaxData.radius = wpslSettings.searchRadius;
            } else {
                ajaxData.radius = radius;
            }

            /*
             * If category ids are set through the wpsl shortcode, then we always need to include them.
             * Otherwise check if the category dropdown exist, or if the checkboxes are used.
             */
            if ( typeof wpslSettings.categoryIds !== "undefined" ) {
                ajaxData.filter = wpslSettings.categoryIds;
            } else if ( $( "#wpsl-category" ).length > 0 ) {
                if ( isMobile || defaultFilters ) {
                    categoryId = parseInt( $( "#wpsl-category .wpsl-dropdown" ).val() );
                } else {
                    categoryId = parseInt( $( "#wpsl-category .wpsl-selected-item" ).attr( "data-value" ) );
                }

                if ( ( !isNaN( categoryId ) && ( categoryId !== 0 ) ) )  {
                    ajaxData.filter = categoryId;
                }
            } else if ( $( "#wpsl-checkbox-filter" ).length > 0 ) {
                if ( $( "#wpsl-checkbox-filter input:checked" ).length > 0 ) {
                    ajaxData.filter = getCheckboxIds();
                }
            }

            // Include values from custom dropdowns.
            if ( $( ".wpsl-custom-dropdown" ).length > 0 ) {
                $( ".wpsl-custom-dropdown" ).each( function( index ) {
                    customName  = '';
                    customValue = '';

                    if ( isMobile || defaultFilters ) {
                        customName  = $( this ).attr( "name" );
                        customValue = $( this ).val();
                    } else {
                        customName  = $( this ).attr( "name" );
                        customValue = $( this ).next( ".wpsl-selected-item" ).attr( "data-value" );
                    }

                    if ( customName && customValue ) {
                        ajaxData[customName] = customValue;
                    }
                });
            }
        }

        /*
         * If the autoload option is enabled, then we need to check if the included latlng
         * is based on a geolocation attempt before including the autoload param.
         *
         * Because if both the geolocation and autoload options are enabled,
         * and the geolocation attempt was successfull, then we need to to include
         * the skip_cache param.
         *
         * This makes sure the results don't come from an older transient based on the
         * start location from the settings page, instead of the users actual location.
         */
        if ( autoLoad == 1 ) {
            if ( typeof geolocationLatlng !== "undefined" ) {
                ajaxData.skip_cache = 1;
            } else {
                ajaxData.autoload = 1;

                /*
                 * If the user set the 'category' attr on the wpsl shortcode, then include the cat ids
                 * to make sure only locations from the set categories are loaded on autoload.
                 */
                if ( typeof wpslSettings.categoryIds !== "undefined" ) {
                    ajaxData.filter = wpslSettings.categoryIds;
                }
            }
        }

        // If the collection of statistics is enabled, then we include the searched value.
        if ( typeof wpslSettings.collectStatistics !== "undefined" && autoLoad == 0 ) {
            ajaxData.search = $( "#wpsl-search-input" ).val();
        }

        return ajaxData;
    }

    /**
     * Check which no results msg we need to show.
     *
     * Either the default txt or a longer custom msg.
     *
     * @since  2.2.0
     * @return string noResults The no results msg to show.
     */
    function getNoResultsMsg() {
        var noResults;

        if ( typeof wpslSettings.noResults !== "undefined" && wpslSettings.noResults !== "" ) {
            noResults = wpslSettings.noResults;
        } else {
            noResults = wpslLabels.noResults;
        }

        return noResults;
    }

    /**
     * Collect the ids of the checked checkboxes.
     *
     * @since  2.2.0
     * @return string catIds The cat ids from the checkboxes.
     */
    function getCheckboxIds() {
        var catIds = $( "#wpsl-checkbox-filter input:checked" ).map( function() {
            return $( this ).val();
        });

        catIds = catIds.get();
        catIds = catIds.join(',');

        return catIds;
    }

    /**
     * Check if cluster markers are enabled.
     * If so, init the marker clustering with the
     * correct gridsize and max zoom.
     *
     * @since  1.2.20
     * @return {void}
     */
    function checkMarkerClusters() {
        if ( wpslSettings.markerClusters == 1 ) {
            var clusterZoom = Number( wpslSettings.clusterZoom ),
                clusterSize = Number( wpslSettings.clusterSize );

            if ( isNaN( clusterZoom ) ) {
                clusterZoom = "";
            }

            if ( isNaN( clusterSize ) ) {
                clusterSize = "";
            }

            markerClusterer = new MarkerClusterer( map, markersArray, {
                gridSize: clusterSize,
                maxZoom: clusterZoom
            });
        }
    }

    /**
     * Add a new marker to the map based on the provided location (latlng).
     *
     * @since  1.0.0
     * @param  {object}  latLng		    The coordinates
     * @param  {number}  storeId		The store id
     * @param  {object}  infoWindowData The data we need to show in the info window
     * @param  {boolean} draggable      Should the marker be draggable
     * @param  {object}  infoWindow     The infoWindow object
     * @return {void}
     */
    function addMarker( latLng, storeId, infoWindowData, draggable, infoWindow, mapsize = 1 ) {
        var url, mapIcon, marker,
            keepStartMarker = true;

        if ( storeId === 0 ) {
            infoWindowData = {
                store: wpslLabels.startPoint
            };

            url = markerSettings.url + wpslSettings.startMarker;
        } else {
            url = markerSettings.url + wpslSettings.storeMarker;
        }

        mapIcon = {
            url: url,
            scaledSize: new google.maps.Size( Number( markerSettings.scaledSize[0] ), Number( markerSettings.scaledSize[1] ) ), //retina format
            origin: new google.maps.Point( Number( markerSettings.origin[0] ), Number( markerSettings.origin[1] ) ),
            anchor: new google.maps.Point( Number( markerSettings.anchor[0] ), Number( markerSettings.anchor[1] ) )
        };

        /*marker = new google.maps.Marker({
            position: latLng,
            map: map,
            optimized: false, //fixes markers flashing while bouncing
            title: decodeHtmlEntity( infoWindowData.store ),
            draggable: draggable,
            storeId: storeId,
            icon: mapIcon
        });*/
        if ( storeId === 0 ) {
            marker = new MarkerWithLabel({
                position: latLng,
                map: map,
                optimized: false, //fixes markers flashing while bouncing
                title: infoWindowData.store,
                draggable: draggable,
                labelContent: '',
                storeId: storeId,
                icon: mapIcon,
                id:storeId
            });
        } else {
            var k = '';
            var currentResponseData = null;
            if(mapsize == 1) currentResponseData = wpslResponseData;
            if(mapsize == 2) currentResponseData = wpslBigResponseData;
            if(currentResponseData){
                for(var i = 0; i < currentResponseData.length; i++){
                    if(currentResponseData[i].id == storeId){
                        k = currentResponseData[i].row;
                        break;
                    }
                }
            }
            if(k > 9) {
                var anchorepos = new google.maps.Point(6,29);
            } else {
                var anchorepos = new google.maps.Point(3,29);
            }
            /*if(mapsize == 1) var currentMap = map;
            if(mapsize == 2) var currentMap = document.getElementById('big-map-canvas').map;*/
           
            marker = new MarkerWithLabel({
                position: latLng,
                map: (mapsize == 1 ? map : null),
//                map: map,
                optimized: false, //fixes markers flashing while bouncing
                title: infoWindowData.store,
                draggable: draggable,
                labelContent: ''+k+'',
                labelAnchor: anchorepos,
                labelClass: "labels", // the CSS class for the label
                labelInBackground: false,
                storeId: storeId,
                icon: mapIcon,
                id:storeId
            });
        }
        // Store the marker for later use.
        
        if(mapsize == 1) {
            markerClickEvent(marker, document.getElementById('wpsl-gmap').map, storeDataCache[parseInt(marker.id)], bigopen);
            markersArray.push(marker);
        }
        if(mapsize == 2){
            markerClickEvent(marker, document.getElementById('big-map-canvas').map, storeDataCache[parseInt(marker.id)], 1);
            markersBigArray.push( marker );
        }


        /*google.maps.event.addListener( marker, "click",( function( currentMap ) {
            return function() {
                if(bigopen === 1) return;
                // The start marker will have a store id of 0, all others won't.
                if ( storeId != 0 ) {

                    // Check if streetview is available at the clicked location.
                    if ( typeof wpslSettings.markerStreetView !== "undefined" && wpslSettings.markerStreetView == 1 ) {
                        checkStreetViewStatus( latLng, function() {
                            setInfoWindowContent( marker, createInfoWindowHtml( infoWindowData ), infoWindow, currentMap );
                        });
                    } else {
                        setInfoWindowContent( marker, createInfoWindowHtml( infoWindowData ), infoWindow, currentMap );
                    }
                } else {
                    setInfoWindowContent( marker, wpslLabels.startPoint, infoWindow, currentMap );
                }

                google.maps.event.clearListeners( infoWindow, "domready" );

                google.maps.event.addListener( infoWindow, "domready", function() {
                    infoWindowClickActions( marker, currentMap );
                    checkMaxZoomLevel();
                });
            };
        }( map ) ) );*/

        // Only the start marker will be draggable.
        if ( draggable ) {
            google.maps.event.addListener( marker, "dragend", function( event ) {
                deleteOverlays( keepStartMarker );
                map.setCenter( event.latLng );
                reverseGeocode( event.latLng );
                findStoreLocations( event.latLng, resetMap, autoLoad = false, infoWindow );
            });
        }
    }

    /**
     * Decode HTML entities.
     *
     * @link	https://gist.github.com/CatTail/4174511
     * @since	2.0.4
     * @param	{string} str The string to decode.
     * @returns {string} The string with the decoded HTML entities.
     */
    function decodeHtmlEntity( str ) {
        if ( str ) {
            return str.replace( /&#(\d+);/g, function( match, dec) {
                return String.fromCharCode( dec );
            });
        }
    };

// Check if we are using both the infobox for the info windows and have marker clusters.
    if ( typeof wpslSettings.infoWindowStyle !== "undefined" && wpslSettings.infoWindowStyle == "infobox" && wpslSettings.markerClusters == 1 ) {
        var clusters, clusterLen, markerLen, i, j;

        /*
         * We need to listen to both zoom_changed and idle.
         *
         * If the zoom level changes, then the marker clusters either merges nearby
         * markers, or changes into individual markers. Which is the moment we
         * either show or hide the opened info window.
         *
         * "idle" is necessary to make sure the getClusters() is up
         * to date with the correct cluster data.
         */
        google.maps.event.addListener( map, "zoom_changed", function() {
            google.maps.event.addListenerOnce( map, "idle", function() {

                if ( typeof markerClusterer !== "undefined" ) {
                    clusters = markerClusterer.clusters_;

                    if ( clusters.length ) {
                        for ( i = 0, clusterLen = clusters.length; i < clusterLen; i++ ) {
                            for ( j = 0, markerLen = clusters[i].markers_.length; j < markerLen; j++ ) {

                                /*
                                 * Match the storeId from the cluster marker with the
                                 * marker id that was set when the info window was opened
                                 */
                                if ( clusters[i].markers_[j].storeId == activeWindowMarkerId ) {

                                    /*
                                     * If there is a visible info window, but the markers_[j].map is null ( hidden )
                                     * it means the info window belongs to a marker that is part of a marker cluster.
                                     *
                                     * If that is the case then we hide the info window ( the individual marker isn't visible ).
                                     *
                                     * The default info window script handles this automatically, but the
                                     * infobox library in combination with the marker clusters doesn't.
                                     */
                                    if ( infoWindow.getVisible() && clusters[i].markers_[j].map === null ) {
                                        infoWindow.setVisible( false );
                                    } else if ( !infoWindow.getVisible() && clusters[i].markers_[j].map !== null ) {
                                        infoWindow.setVisible( true );
                                    }

                                    break;
                                }
                            }
                        }
                    }
                }
            });
        });
    }

    /**
     * Set the correct info window content for the marker.
     *
     * @since	1.2.20
     * @param	{object} marker			   Marker data
     * @param	{string} infoWindowContent The infoWindow content
     * @param	{object} infoWindow		   The infoWindow object
     * @param	{object} currentMap		   The map object
     * @returns {void}
     */
    function setInfoWindowContent( marker, infoWindowContent, infoWindow, currentMap ) {
//        openInfoWindow.length = 0;

        infoWindow.setContent( infoWindowContent );
        infoWindow.open( currentMap, marker );

        openInfoWindow.push( infoWindow );

        /*
         * Store the marker id if both the marker clusters and the infobox are enabled.
         *
         * With the normal info window script the info window is automatically closed
         * once a user zooms out, and the marker clusters are enabled,
         * but this doesn't happen with the infobox library.
         *
         * So we need to show/hide it manually when the user zooms out,
         * and for this to work we need to know which marker to target.
         */
        if ( typeof wpslSettings.infoWindowStyle !== "undefined" && wpslSettings.infoWindowStyle == "infobox" && wpslSettings.markerClusters == 1 ) {
            activeWindowMarkerId = marker.storeId;
            infoWindow.setVisible( true );
        }
    }

    /**
     * Handle clicks for the different info window actions like,
     * direction, streetview and zoom here.
     *
     * @since	1.2.20
     * @param	{object} marker		Holds the marker data
     * @param	{object} currentMap	The map object
     * @returns {void}
     */
    function infoWindowClickActions( marker, currentMap ) {
        $( ".wpsl-info-actions a" ).on( "click", function( e ) {
            var maxZoom = Number( wpslSettings.autoZoomLevel );

            e.stopImmediatePropagation();

            if ( $( this ).hasClass( "wpsl-directions" ) ) {

                /*
                 * Check if we need to show the direction on the map
                 * or send the users to maps.google.com
                 */
                if ( wpslSettings.directionRedirect == 1 ) {
                    return true;
                } else {
                    // renderDirections( $( this ) );
                    renderDealerdetails($(this).parents('.wpsl-info-window').data('store-id'), true);
                }
            } else if ( $( this ).hasClass( "wpsl-streetview" ) ) {
                activateStreetView( marker, currentMap );
            } else if ( $( this ).hasClass( "wpsl-zoom-here" ) ) {
                currentMap.setCenter( marker.getPosition() );
                currentMap.setZoom( maxZoom );
            }

            return false;
        });
    }

    /**
     * Check if have reached the max auto zoom level.
     *
     * If so we hide the 'Zoom here' text in the info window,
     * otherwise we show it.
     *
     * @since	2.0.0
     * @returns {void}
     */
    function checkMaxZoomLevel() {
        var zoomLevel = map.getZoom();

        if ( zoomLevel >= wpslSettings.autoZoomLevel ) {
            $( ".wpsl-zoom-here" ).hide();
        } else {
            $( ".wpsl-zoom-here" ).show();
        }
    }

    /**
     * Activate streetview for the clicked location.
     *
     * @since	1.2.20
     * @param	{object} marker	    The current marker
     * @param	{object} currentMap The map object
     * @returns {void}
     */
    function activateStreetView( marker, currentMap ) {
        var panorama = currentMap.getStreetView();
        panorama.setPosition( marker.getPosition() );
        panorama.setVisible( true );

        $( "#wpsl-map-controls" ).hide();

        StreetViewListener( panorama, currentMap );
    }

    /**
     * Listen for changes in the streetview visibility.
     *
     * Sometimes the infowindow offset is incorrect after switching back from streetview.
     * We fix this by zooming in and out. If someone has a better fix, then let me know at
     * info at tijmensmit.com
     *
     * @since	1.2.20
     * @param	{object} panorama   The streetview object
     * @param	{object} currentMap The map object
     * @returns {void}
     */
    function StreetViewListener( panorama, currentMap ) {
        google.maps.event.addListener( panorama, "visible_changed", function() {
            if ( !panorama.getVisible() ) {
                var currentZoomLevel = currentMap.getZoom();

                $( "#wpsl-map-controls" ).show();

                currentMap.setZoom( currentZoomLevel-1 );
                currentMap.setZoom( currentZoomLevel );
            }
        });
    }

    /**
     * Check the streetview status.
     *
     * Make sure that a streetview exists for
     * the latlng for the open info window.
     *
     * @since	1.2.20
     * @param	{object}   latLng The latlng coordinates
     * @param	{callback} callback
     * @returns {void}
     */
    function checkStreetViewStatus( latLng, callback ) {
        var service = new google.maps.StreetViewService();

        service.getPanoramaByLocation( latLng, 50, function( result, status ) {
            streetViewAvailable = ( status == google.maps.StreetViewStatus.OK ) ? true : false;
            callback();
        });
    }

    /**
     * Helper methods for the underscore templates.
     *
     * @link	 http://underscorejs.org/#template
     * @requires underscore.js
     * @since	 2.0.0
     */
    var templateHelpers = {
        /**
         * Make the phone number clickable if we are dealing with a mobile useragent.
         *
         * @since	1.2.20
         * @param	{string} phoneNumber The phone number
         * @returns {string} phoneNumber Either just the plain number, or with a link wrapped around it with tel:
         */
        formatPhoneNumber: function( phoneNumber ) {
            if ( ( wpslSettings.phoneUrl == 1 ) && ( checkMobileUserAgent() ) ) {
                phoneNumber = "<a href='tel:" + templateHelpers.formatClickablePhoneNumber( phoneNumber ) + "'>" + phoneNumber + "</a>";
            }

            return phoneNumber;
        },
        /**
         * Replace spaces - . and () from phone numbers.
         * Also if the number starts with a + we check for a (0) and remove it.
         *
         * @since	1.2.20
         * @param	{string} phoneNumber The phone number
         * @returns {string} phoneNumber The 'cleaned' number
         */
        formatClickablePhoneNumber: function( phoneNumber ) {
            if ( ( phoneNumber.indexOf( "+" ) != -1 ) && ( phoneNumber.indexOf( "(0)" ) != -1 ) ) {
                phoneNumber = phoneNumber.replace( "(0)", "" );
            }

            return phoneNumber.replace( /(-| |\(|\)|\.|)/g, "" );
        },
        /**
         * Create the html for the info window action.
         *
         * @since	2.0.0
         * @param	{string} id		The store id
         * @returns {string} output The html for the info window actions
         */
        createInfoWindowActions: function( id ) {
            var output,
                streetView = "",
                zoomTo	   = "";

            if ( $( "#wpsl-gmap" ).length ) {
                if ( streetViewAvailable ) {
                    streetView = "<a class='wpsl-streetview' href='#'>" + wpslLabels.streetView + "</a>";
                }

                if ( wpslSettings.markerZoomTo == 1 ) {
                    zoomTo = "<a class='wpsl-zoom-here' href='#'>" + wpslLabels.zoomHere + "</a>";
                }

                output = "<div class='wpsl-info-actions'>" + templateHelpers.createDirectionUrl( id ) + streetView + zoomTo + "</div>";
            }

            return output;
        },
        /**
         * Create the url that takes the user to the maps.google.com page
         * and shows the correct driving directions.
         *
         * @since	1.0.0
         * @param	{string} id			  The store id
         * @returns {string} directionUrl The full maps.google.com url with the encoded start + end address
         */
        createDirectionUrl: function( id ) {
            var directionUrl, destinationAddress, zip,
                url = {};

            if ( wpslSettings.directionRedirect == 1 ) {

                // If we somehow failed to determine the start address, just set it to empty.
                if ( typeof startAddress === "undefined" ) {
                    startAddress = "";
                }

                url.target = "target='_blank'";

                // If the id exists the user clicked on a marker we get the direction url from the search results.
                if ( typeof id !== "undefined" ) {
                    url.src = $( "[data-store-id=" + id + "] .wpsl-directions" ).attr( "href" );
                } else {

                    // Only add a , after the zip if the zip value exists.
                    if ( this.zip ) {
                        zip = this.zip + ", ";
                    } else {
                        zip = "";
                    }

                    destinationAddress = this.address + ", " + this.city + ", " + zip + this.country;

                    url.src = "https://maps.google.com/maps?saddr=" + templateHelpers.rfc3986EncodeURIComponent( startAddress ) + "&daddr=" + templateHelpers.rfc3986EncodeURIComponent( destinationAddress ) + "";
                }
            } else {
                url = {
                    src: "#",
                    target: ""
                };
            }

            directionUrl = "<a class='wpsl-directions' " + url.target + " href='" + url.src + "'>" + wpslLabels.directions + "</a>";

            return directionUrl;
        },
        /**
         * Make the URI encoding compatible with RFC 3986.
         *
         * !, ', (, ), and * will be escaped, otherwise they break the string.
         *
         * @since	1.2.20
         * @param	{string} str The string to encode
         * @returns {string} The encoded string
         */
        rfc3986EncodeURIComponent: function( str ) {
            return encodeURIComponent( str ).replace( /[!'()*]/g, escape );
        }
    };

    /**
     * Create the HTML template used in the info windows on the map.
     *
     * @since	1.0.0
     * @param	{object} infoWindowData	The data that is shown in the info window (address, url, phone etc)
     * @returns {string} windowContent	The HTML content that is placed in the info window
     */
    function createInfoWindowHtml( infoWindowData ) {
        var windowContent, template;

        if ( $( "#wpsl-base-gmap_0" ).length ) {
            template = $( "#wpsl-cpt-info-window-template" ).html();
        } else {
            template = $($( "#wpsl-info-window-template" ).html()).filter('.small-info-window')[0].outerHTML.replace(new RegExp('&lt;','g'),'<').replace(new RegExp('&gt;','g'),'>').replace(new RegExp('&amp;','g'),'&');
        }

        windowContent = _.template( template )( infoWindowData ); //see http://underscorejs.org/#template

        return windowContent;
    }

    /**
     * Zoom the map so that all markers fit in the window.
     *
     * @since	1.0.0
     * @returns {void}
     */
    function fitBounds(mapId, forBig = false) {
        var i, markerLen,
            maxZoom = Number( wpslSettings.autoZoomLevel ),
            bounds  = new google.maps.LatLngBounds();
        var currentMap = map;
        if(mapId) currentMap = document.getElementById(mapId).map;
        // Make sure we don't zoom to far.
        google.maps.event.addListenerOnce( currentMap, "bounds_changed", function( event ) {
            if ( this.getZoom() > maxZoom ) {
                this.setZoom( maxZoom );
            }
        });
        if(forBig) {
            for (i = 0, markerLen = markersBigArray.length; i < markerLen; i++) {
                bounds.extend(markersBigArray[i].position);
            }
        }else{
            for (i = 0, markerLen = markersArray.length; i < markerLen; i++) {
                bounds.extend(markersArray[i].position);
            }
        }

        currentMap.fitBounds( bounds );
    }

    /**
     * Remove all existing markers from the map.
     *
     * @since	1.0.0
     * @param	{boolean} keepStartMarker Whether or not to keep the start marker while removing all the other markers from the map
     * @returns {void}
     */
    function deleteOverlays( keepStartMarker ) {
        var markerLen, i;

        directionsDisplay.setMap( null );

        // Remove all the markers from the map, and empty the array.
        if ( markersArray ) {
            for ( i = 0, markerLen = markersArray.length; i < markerLen; i++ ) {

                // Check if we need to keep the start marker, or remove everything.
                if ( keepStartMarker ) {
                    if ( markersArray[i].draggable != true ) {
                        markersArray[i].setMap( null );
                    } else {
                        startMarkerData = markersArray[i];
                    }
                } else {
                    markersArray[i].setMap( null );
                }
            }

            markersArray.length = 0;
        }

        // If marker clusters exist, remove them from the map.
        if ( markerClusterer ) {
            markerClusterer.clearMarkers();
        }
    }

    /**
     * Handle the geocode errors.
     *
     * @since	1.0.0
     * @param   {string} status Contains the error code
     * @returns {void}
     */
    function geocodeErrors( status ) {
        var msg;

        switch ( status ) {
            case "ZERO_RESULTS":
                msg = wpslLabels.noResults;
                break;
            case "OVER_QUERY_LIMIT":
                msg = wpslLabels.queryLimit;
                break;
            default:
                msg = wpslLabels.generalError;
                break;
        }

        alert( msg );
    }

    /**
     * Handle the driving direction errors.
     *
     * @since   1.2.20
     * @param   {string} status Contains the error code
     * @returns {void}
     */
    function directionErrors( status ) {
        var msg;

        switch ( status ) {
            case "NOT_FOUND":
            case "ZERO_RESULTS":
                msg = wpslLabels.noDirectionsFound;
                break;
            case "OVER_QUERY_LIMIT":
                msg = wpslLabels.queryLimit;
                break;
            default:
                msg = wpslLabels.generalError;
                break;
        }

        alert( msg );
    }

    $( "#wpsl-stores" ).on( "click", ".wpsl-store-details", function() {
        var i, len,
            $parentLi = $( this ).parents( "li" ),
            storeId   = $parentLi.data( "store-id" );

        // Check if we should show the 'more info' details.
        if ( wpslSettings.moreInfoLocation == "info window" ) {
            for ( i = 0, len = markersArray.length; i < len; i++ ) {
                if ( markersArray[i].storeId == storeId ) {
                    google.maps.event.trigger( markersArray[i], "click" );
                }
            }
        } else {

            // Check if we should set the 'more info' item to active or not.
            if ( $parentLi.find( ".wpsl-more-info-listings" ).is( ":visible" ) ) {
                $( this ).removeClass( "wpsl-active-details" );
            } else {
                $( this ).addClass( "wpsl-active-details" );
            }

            $parentLi.siblings().find( ".wpsl-store-details" ).removeClass( "wpsl-active-details" );
            $parentLi.siblings().find( ".wpsl-more-info-listings" ).hide();
            $parentLi.find( ".wpsl-more-info-listings" ).toggle();
        }

        /*
         * If we show the store listings under the map, we do want to jump to the
         * top of the map to focus on the opened infowindow
         */
        if ( wpslSettings.templateId != "default" || wpslSettings.moreInfoLocation == "store listings" ) {
            return false;
        }
    });

    /**
     * Create the styled dropdown filters.
     *
     * Inspired by https://github.com/patrickkunka/easydropdown
     *
     * @since	1.2.24
     * @returns {void}
     */
    function createDropdowns() {
        var maxDropdownHeight = Number( wpslSettings.maxDropdownHeight );

        $( ".wpsl-dropdown" ).each( function( index ) {
            var	active, maxHeight, $this = $( this );

            $this.$dropdownWrap = $this.wrap( "<div class='wpsl-dropdown'></div>" ).parent();
            $this.$selectedVal  = $this.val();
            $this.$dropdownElem = $( "<div><ul/></div>" ).appendTo( $this.$dropdownWrap );
            $this.$dropdown     = $this.$dropdownElem.find( "ul" );
            $this.$options 	  	= $this.$dropdownWrap.find( "option" );

            // Hide the original <select> and remove the css class.
            $this.hide().removeClass( "wpsl-dropdown" );

            // Loop over the options from the <select> and move them to a <li> instead.
            $.each( $this.$options, function() {
                if ( $( this ).val() == $this.$selectedVal ) {
                    active = 'class="wpsl-selected-dropdown"';
                } else {
                    active = '';
                }

                $this.$dropdown.append( "<li data-value=" + $( this ).val() + " " + active + ">" + $( this ).text() + "</li>" );
            });

            $this.$dropdownElem.before( "<span data-value=" + $this.find( ":selected" ).val() + " class='wpsl-selected-item'>" + $this.find( ":selected" ).text() + "</span>" );
            $this.$dropdownItem = $this.$dropdownElem.find( "li" );

            // Listen for clicks on the 'wpsl-dropdown' div.
            $this.$dropdownWrap.on( "click", function( e ) {

                // Check if we only need to close the current open dropdown.
                if ( $( this ).hasClass( "wpsl-active" ) ) {
                    $( this ).removeClass( "wpsl-active" );

                    return;
                }

                closeAllDropdowns();

                $( this ).toggleClass( "wpsl-active" );
                maxHeight = 0;

                // Either calculate the correct height for the <ul>, or set it to 0 to hide it.
                if ( $( this ).hasClass( "wpsl-active" ) ) {
                    $this.$dropdownItem.each( function( index ) {
                        maxHeight += $( this ).outerHeight();
                    });

                    $this.$dropdownElem.css( "height", maxHeight + 2 + "px" );
                } else {
                    $this.$dropdownElem.css( "height", 0 );
                }

                // Check if we need to enable the scrollbar in the dropdown filter.
                if ( maxHeight > maxDropdownHeight ) {
                    $( this ).addClass( "wpsl-scroll-required" );
                    $this.$dropdownElem.css( "height", ( maxDropdownHeight ) + "px" );
                }

                e.stopPropagation();
            });

            // Listen for clicks on the individual dropdown items.
            $this.$dropdownItem.on( "click", function( e ) {

                // Set the correct value as the selected item.
                $this.$dropdownWrap.find( $( ".wpsl-selected-item" ) ).html( $( this ).text() ).attr( "data-value", $( this ).attr( "data-value" ) );

                // Apply the class to the correct item to make it bold.
                $this.$dropdownItem.removeClass( "wpsl-selected-dropdown" );
                $( this ).addClass( "wpsl-selected-dropdown" );

                closeAllDropdowns();

                e.stopPropagation();
            });
        });

        $( document ).click( function() {
            closeAllDropdowns();
        });
    }

    /**
     * Close all the dropdowns.
     *
     * @since	1.2.24
     * @returns {void}
     */
    function closeAllDropdowns() {
        $( ".wpsl-dropdown" ).removeClass( "wpsl-active" );
        $( ".wpsl-dropdown div" ).css( "height", 0 );
    }

    /**
     * This code prevents the map from showing a large grey area if
     * the store locator is placed in a tab, and that tab is actived.
     *
     * The default map anchor is set to 'wpsl-map-tab', but you can
     * change this with the 'wpsl_map_tab_anchor' filter.
     *
     * Note: If the "Attempt to auto-locate the user" option is enabled,
     * and the user quickly switches to the store locator tab, before the
     * Geolocation timeout is reached, then the map is sometimes centered in the ocean.
     *
     * I haven't really figured out why this happens. The only option to fix this
     * is to simply disable the "Attempt to auto-locate the user" option if
     * you use the store locator in a tab.
     *
     * @link  http://stackoverflow.com/questions/9458215/google-maps-not-working-in-jquery-tabs
     * @since 2.0.0
     */
    if ( $( "a[href='#" + wpslSettings.mapTabAnchor + "']" ).length ) {
        var mapZoom, mapCenter,
            returnBool = Number( wpslSettings.mapTabAnchorReturn ) ? true : false,
            $wpsl_tab  = $( "a[href='#" + wpslSettings.mapTabAnchor + "']" );

        $wpsl_tab.on( "click", function() {
            setTimeout( function() {
                mapZoom   = map.getZoom();
                mapCenter = map.getCenter();

                google.maps.event.trigger( map, "resize" );

                map.setZoom( mapZoom );
                map.setCenter( mapCenter );

                fitBounds();
            }, 50 );

            return returnBool;
        });
    }

    /**
     * Check if the user submitted a search through a search widget.
     *
     * @since	2.1.0
     * @returns {void}
     */
    function checkWidgetSubmit() {
        if ( $( ".wpsl-search" ).hasClass( "wpsl-widget" ) ) {
            $( "#wpsl-search-btn" ).trigger( "click" );
            $( ".wpsl-search" ).removeClass( "wpsl-widget" );
        }
    }

    /* CUSTOM DIRTY HACKS*/
    /* Direction DJ */
    $( "#wpsl-dealer-details" ).on( "click", ".wpsl-directions", function(event) {
        event.preventDefault();
        var tabmenu = $("#wpsl-dealer-details .tabs-menu a[href='"+$(this).attr("href")+"']");
        tabmenu.trigger('click');
       /* var tab = $(this).attr("href");
        $.each($("#wpsl-dealer-details .tabs-menu li"),function(){
            var tabmenu = $(this).find('a').attr("href");
            if(tabmenu == tab) {
                $(this).addClass("active");
                $(this).siblings().removeClass("active");
            }
        });
        $("#wpsl-dealer-details .tab-content .tab-pane").not(tab).css("display", "none");
        $(tab).fadeIn();*/
    });
    $( "#search-location" ).on( "click", ".wpsl-view-dealer", function(event) {
        event.preventDefault();
        var pageurl = $(this).attr('href');

        var name = "retailerCode";
        var results = new RegExp('[\#&]' + name + '=([^&#]*)').exec(pageurl);
        renderDealerdetails(results[1]);
    });
    
    $( "#wpsl-result-list" ).on( "click", ".map-direction", function(event) {
        event.preventDefault();
        var pageurl = $(this).attr('href');

        var name = "retailerCode";
        var results = new RegExp('[\#&]' + name + '=([^&#]*)').exec(pageurl);
        renderDealerdetails(results[1]);
    });

    $( "#wpsl-dealer-details" ).on( "click", "#wpsl-direction-start", function(event) {
        //renderDealerdetails( $( this ) );
        event.preventDefault();
        $('#wpsl-wrap').slideDown();
        $( "#wpsl-dealer-details .dealers-data" ).html('');
        $( "#wpsl-dealer-details" ).slideUp();
        $(window).scrollTop(0);
    });


    function renderDealerdetails( storeId, switchToMap = false ) {
        var ajaxDealer = {
            action: "dealer_search",
            storeid: storeId
        };
        var template = '<input type="hidden" value="<%= id %>" id="retailer-id" />\
        <div class="wpsl-detail-header"><div class="wrapper clearfix">\
            <div class="wpsl-before-direction"><a class="wpsl-back-search" id="wpsl-direction-start" href="#">Back to list view</a></div>\
        <h1 class="store-title"><%= store %></h1>\
        <span><%= city %></span>\
            </div></div>\
            <div id="tabs-container"><div class="wrapper clearfix">\
            <ul class="nav nav-tabs tabs-menu"><li class="active"><a data-toggle="tab" href="#wpsl-sotre-desc">General Info</a></li>\
        <li><a data-toggle="tab" href="#wpsl-direction-data">Map and Directions</a></li>\
        </ul>\
        </div></div>\
        <div class="store-details wrapper clearfix" data-store-id="<%= id %>">\
            <div id="accordion" class="tab-content">\
            <div id="wpsl-sotre-desc" class="wpsl-store-desc nav nav-tabs tab-pane active"><h5 class="accordion-toggle active">General Info</h5><div class="accordion-content defaul">\
            <% if ( description ) { %>\
        <%= description %>\
                <% } %>\
    </div></div>\
        <div id="wpsl-direction-data" data-store-id="<%= id %>" class="tab-pane"><h5 class="accordion-toggle">Map and Directions</h5><div class="accordion-content">\
            <div class="direction-search"><input autocomplete="off" id="wpsl-location-input" type="text" value="" name="wpsl-location-input" placeholder="Enter starting location" />\
            <div class="wpsl-location-btn-wrap"><input id="wpsl-location-btn" type="submit" value="Get Directions"></div></div>\
            <div class="direction-map"><div id="wpsl-dmap" class="wpsl-gmap-canvas" data-map-type="dmap"></div></div><ul></ul>\
            <div class="direction-destination" style="display: none;">\
            <div class="destination-icon">\
            <img src="http://mfctest.sytes.net/wp-content/plugins/wp-store-locator/img/markers/orange@2x.png" />				</div>\
            <div class="destination-data">\
        <strong><%= store %></strong>\
            <% if ( address ) { %>\
            <span class="wpsl-street"><%= address %></span>\
            <% } %>\
            <% if ( address2 ) { %>\
        <span class="wpsl-street"><%= address2 %></span>\
                <% } %>\
    <span><%= city %> <%= state %> <%= zip %></span>\
            <span class="wpsl-country"><%= country %></span>\
            </div>\
            </div>\
            </div>\
            </div>\
            <div class="wpsl-store-right" data-store-id="<%= id %>">\
            <div class="wpsl-contact-header"><p>Contact Information</p> <% if ( thumb ) { %><div class="store-logo"><%= thumb %></div><% } %>\
            <% if ( address ) { %>\
    <span class="wpsl-street"><%= address %></span>\
            <% } %>\
            <% if ( address2 ) { %>\
        <span class="wpsl-street"><%= address2 %></span>\
                <% } %>\
    <span><%= city %> <%= state %> <%= zip %></span>\
            <span class="wpsl-country"><%= country %></span>\
            <div class="direction-link">\
            <a data-toggle="tab" href="#wpsl-direction-data" class="wpsl-directions">Get Directions ></a>\
        </div>\
        </div>\
        <div class="wpsl-contact-details"><p>Contact Us</p>\
        <% if ( phone ) { %>\
        <span><strong>General</strong><%= formatPhoneNumber( phone ) %></span>\
                <% } %>\
    <% if ( email ) { %>\
        <span><strong>Email</strong><a href="mailto:<%= email %>"><%= email %></a></span>\
                <% } %>\
    <% if ( fax ) { %>\
        <span><strong>Fax</strong>: <%= fax %></span>\
                <% } %>\
    </div>\
        <% if ( hours ) { %>\
        <div class="wpsl-store-hours">\
            <div class="open-time expand">\
                <strong>Today\'s hours</strong>\
                <table class="wpsl-opening-hours">\
                    <tbody>\
                        <tr>\
                            <td><%= today_hours %></td>\
                        </tr>\
                    </tbody>\
                </table>\
            </div>\
            <div class="wpsl-opening-other-hours" style="display:none"><%= hours %></div>\
        </div>\
                <% } %>\
    <% if ( email ) { %>\
        <div><a class="dealer-btn" href="#contact-retailer" data-store-id="<%= id %>">Contact Retailer</a></div>\
            <% } %>\
    <% if ( url ) { %>\
        <div><a class="dealer-website" target="_blank" href="<%= url %>">Retailer Website</a></div>\
            <% } %>		</div>\
        </div>\
    </div>';
        // template = '<%= ID %>';
        $.get( "/wp-admin/admin-ajax.php", ajaxDealer, function( results ) {
            var dealerData = '';
            $.each( results, function( index ) {
                _.extend( results[index], templateHelpers );

                //latLng = new google.maps.LatLng( response[index].lat, response[index].lng );
                //addMarker( latLng, response[index].id, response[index], draggable, infoWindow );

                /* Create the html output with help from underscore js */
                var genT =  _.template( template );
                dealerData = dealerData + genT( results[index] );
            });
            $('#wpsl-wrap').slideUp();
            $( "#wpsl-dealer-details .dealers-data" ).html( dealerData );
            $("#wpsl-dealer-details .tabs-menu a").on('click', function(event) {
                event.preventDefault();
                $(this).parent().addClass("active");
                $(this).parent().siblings().removeClass("active");
                var tab = $(this).attr("href");
                $("#wpsl-dealer-details .tab-content .tab-pane").not(tab).css("display", "none");
                $(tab).fadeIn(300, function(){
                    if($( "#wpsl-direction-data:visible").length == 0) return;
                    $( "#wpsl-direction-data .wpsl-gmap-canvas" ).each( function( mapIndex ) {
                        var mapId = $( this ).attr( "id" );
                        var dmap = document.getElementById(mapId).map;
                        google.maps.event.trigger(dmap, "resize");
                        /*
                        dmap.setCenter( directionMarkerPosition.centerLatlng );
                        dmap.setZoom( directionMarkerPosition.zoomLevel );*/

                        /* Find the latlng that belongs to the start and end point */
                        for ( i = 0, len = markersArray.length; i < len; i++ ) {
                            if ( markersArray[i].storeId == storeId ) {
                                markersArray[i].setMap( dmap );
                                markerClickEvent(markersArray[i], dmap, results[0]);
                                dmap.setCenter(markersArray[i].getPosition());
                                dmap.setZoom( 17 );
                                break;
                            } else {
                                markersArray[i].setMap( null );
                            }
                        }

                        closeInfoBoxWindow();

                        /* Do we need to create a marker cluster? */
                        checkMarkerClusters();

                        /* Make sure everything fits on the screen */
                        // fitBounds(mapId);
                    });
                    /*$( "#wpsl-direction-data .wpsl-gmap-canvas" ).each( function( mapIndex ) {
                        var mapId = $( this ).attr( "id" );
                        var dmap = document.getElementById(mapId).map;
                        google.maps.event.trigger(dmap, "resize");
                    })*/
                });
            });

            $('#wpsl-dealer-details #accordion').find('.accordion-toggle').on('click', function(){
                //Expand or collapse this panel
                $(this).next().slideToggle('slow');
                $(this).toggleClass('active');
                //Hide the other panels
                $(".accordion-toggle").not($(this)).removeClass('active');
                $(".accordion-content").not($(this).next()).slideUp('slow');
                $('html, body').stop().animate({ scrollTop:$(this).scrollTop() },'slow');
            });

            $('#wpsl-dealer-details .wpsl-store-hours').find('.open-time.expand').on('click', function(){
                //Expand or collapse this panel
                $(this).next('.wpsl-opening-other-hours').slideToggle('slow');
                $(this).toggleClass('collapse');
            });

            $("#wpsl-direction-data").hide();
            $( "#wpsl-dealer-details .destination-area" ).hide();
            $("#wpsl-direction-data .accordion-content").hide();
            // $(tab).fadeIn();
            $( "#wpsl-dealer-details" ).slideDown();
            $(window).scrollTop(0);

            $( "#wpsl-direction-data .wpsl-gmap-canvas" ).each( function( mapIndex ) {
                var mapId = $(this).attr("id");
                initializeGmap(mapId, mapIndex);
            })
            if(switchToMap){
                var tabmenu = $("#wpsl-dealer-details .tabs-menu a[href='#wpsl-direction-data']");
                tabmenu.trigger('click');
            }
        })
    }
    
    /**
    * Create the html template used in the info windows on the map
    * 
    * @since 1.0
    * @param {object}   infoWindowData	The data that is shown in the info window (address, url, phone etc)
    * @returns {string} windowContent	The html content that is placed in the info window
    */
   function createBigInfoWindowHtml( infoWindowData , marker) {
       var windowContent, template;
       var myObj = {
           "label" : marker.labelContent
       };
       //infoWindowData.push(myObj);
       var settings = $.extend( {}, infoWindowData, myObj );
       if ( $( "#wpsl-base-gmap_0" ).length ) {
           template = $( "#wpsl-cpt-info-window-template" ).html();
       } else {
           //template = $( "#big-info-window-template" ).html();
           template = $($( "#wpsl-info-window-template" ).html()).filter('.big-info-window')[0].outerHTML.replace(new RegExp('&lt;','g'),'<').replace(new RegExp('&gt;','g'),'>').replace(new RegExp('&amp;','g'),'&');
       }

       windowContent = _.template( template )( settings ); //see http://underscorejs.org/#template

       return windowContent;
   }
   
   /**
    * Set the correct info window content for the marker
    * 
    * @since 1.2.20
    * @param {object} marker			 Marker data
    * @param {string} infoWindowContent The biginfoWindow content
    * @param {object} biginfoWindow		 The biginfoWindow object
    * @param {object} currentMap		 The map object
    * @returns {void}
    */
   function setBigInfoWindowContent( marker, infoWindowContent, biginfoWindow, currentMap ) {
//       openInfoWindow.length = 0;

       biginfoWindow.setContent( infoWindowContent );
       $("#big-map-info-window-container").show();
       $("#big-map-info-window-container").empty().html(infoWindowContent);
       //biginfoWindow.open( currentMap, marker );

       openInfoWindow.push( biginfoWindow );

       currentMap.setCenter( marker.getPosition() );
//       currentMap.setZoom( maxZoom );

       /* Store the marker id if both the marker clusters and the infobox are enabled.
        * 
        * With the normal info window script the info window is automatically closed once a user 
        * zooms out and the marker clusters are enabled, but this doesn't happen with the infobox library. 
        * 
        * So we need to show/hide it manually when the user zooms out, and for this to work we need to know which marker to target. 
        */
       if ( typeof wpslSettings.infoWindowStyle !== "undefined" && wpslSettings.infoWindowStyle == "infobox" && wpslSettings.markerClusters == 1 ) {
           activeWindowMarkerId = marker.storeId;
           biginfoWindow.setVisible( true );
       }
   }
   
   function markerClickEvent(marker, map, infoWindowData, bigmap = 0)
   {
       google.maps.event.addListener( marker, "click",( function( currentMap ) {
            return function() {
                    if ( typeof wpslSettings.markerStreetView !== "undefined" && wpslSettings.markerStreetView == 1 ) {
                        checkStreetViewStatus( latLng, function() {	
                            setInfoWindowContent( this, createInfoWindowHtml( infoWindowData ), infoWindow, currentMap );
                        });
                    } else {
                        if (bigmap) {
                            setBigInfoWindowContent( this, createBigInfoWindowHtml( infoWindowData, this ), biginfoWindow, currentMap );
                            jQuery(".gm-style-iw").parent('div').addClass("wpslinfobox");
                        } else {
                            setInfoWindowContent( this, createInfoWindowHtml( infoWindowData ), infoWindow, currentMap );
                            jQuery(".smallInfobox").parent('div').addClass("wpslinfobox");
                        }
                    }

                google.maps.event.clearListeners( infoWindow, "domready" );

                google.maps.event.addListener( infoWindow, "domready", function() {
                    infoWindowClickActions( this, currentMap );
                    checkMaxZoomLevel();
                });
            };
        }(map)));
   }
   
    function removeMarker(mapsize = 1){

        /* Remove all single markers from the map */
        if(mapsize == 1) {
            for ( i = 0, len = markersArray.length; i < len; i++ ) {
                markersArray[i].setMap( null );
            }
        }

       if(mapsize == 2) {
           for ( i = 0, len = markersBigArray.length; i < len; i++ ) {
               markersBigArray[i].setMap( null );
           }
       }
    }
    
    /* Trigger the search when the user presses "enter" on the keyboard */
    $( "#big-search-input" ).keydown( function ( event ) {
        var keypressed = event.keyCode || event.which;
        if ( keypressed == 13 ) {
            $( "#wpsl-search-btn" ).trigger( "click" );
        }
    });

    /*DJ Get big map direction */
    $( "#search-location" ).on( "click", ".view-direction", function() {	
        $( ".info-window-retailer").hide();
        $( ".big-window-directions").show();
    });

    /*DJ Get big map direction back button */
    $( "#search-location" ).on( "click", "#big-map-directions-back", function() {	
        $( ".info-window-retailer").show();
        $( ".big-window-directions").hide();
    });

    $( "#search-location" ).on( "click", "#big-location-btn", function() {
        $( "#big-location-input" ).removeClass();

        if ( !$( "#big-location-input" ).val() ) {
            $( "#big-location-input" ).addClass( "wpsl-error" ).focus();
        } else {
            storeId = $(this).parents( "div.big-info-window" ).data('store-id');
            getBigDirection( biginfoWindow, storeId )
        }

    });
    
    function getBigDirection( biginfoWindow, storeId ) {
		
        var latLng, i, start, end,
            autoLoad = false,
            keepStartMarker = false,
            address = $( "#big-location-input" ).val();

        geocoder.geocode( { 'address': address}, function( response, status ) {
            if ( status == google.maps.GeocoderStatus.OK ) {			
                start = response[0].geometry.location;
            } else {
                geocodeErrors( status );
                start = '';
            }

            /* Find the latlng that belongs to the start and end point */
            for ( i = 0, len = markersArray.length; i < len; i++ ) {
                if ( markersArray[i].storeId == storeId ) {
                    end = markersArray[i].getPosition();
                }
            }

            if ( start && end ) {
                $( "#big-map-directions-list ul" ).empty();
                $( "#big-map-directions-list div.big-direction-distance").remove();
                calcBigRoutefucn( start, end );
            } else {
                alert( wpslLabels.generalError );
            } 

        });
    }
    
    function calcBigRoutefucn( start, end ) {
        var legs, len, step, index, direction, i, j, distanceUnit, directionOffset,
            directionStops = "",    
            request = {};

        if ( wpslSettings.distanceUnit == "km" ) {
            distanceUnit = 'METRIC';
        } else {
            distanceUnit = 'IMPERIAL';
        }

        request = {
            origin: start,
            destination: end,
            travelMode: google.maps.DirectionsTravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem[ distanceUnit ] 
        };

        /*http://dev.reiziger.com/wp-content/plugins/wp-store-locator/img/markers/dark-green.png*/
        markerPath = wpslSettings.path + "img/markers/dark-green.png";/* + wpslSettings.storeMarker;*/

        mapIcon = {
            url: markerPath,
            scaledSize: new google.maps.Size( 26,44 ), //retina format
            origin: new google.maps.Point( 0,0 ),  
            anchor: new google.maps.Point( 12,35 ),
        };

        /*directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions)*/
        var bigmap = document.getElementById("big-map-canvas").map;

        directionsService.route( request, function( response, status ) {
            if ( status == google.maps.DirectionsStatus.OK ) {
                directionsDisplay.setMap( bigmap );
                directionsDisplay.setOptions( {
                    suppressMarkers: true,
                    polylineOptions: {strokeColor: "#365E23" },
                } );
                directionsDisplay.setDirections( response );

                if ( response.routes.length > 0 ) {
                    direction = response.routes[0];
                    var leg = response.routes[ 0 ].legs[ 0 ];
                    //makeMarker( leg.start_location, mapIcon, '' );
                    var mapIconStart = {
                        url: wpslSettings.url + "img/markers/" + wpslSettings.startMarker,
                        scaledSize: new google.maps.Size( Number( markerSettings.scaledSize[0] ), Number( markerSettings.scaledSize[1] ) ), //retina format
                        origin: new google.maps.Point( Number( markerSettings.origin[0] ), Number( markerSettings.origin[1] ) ),
                        anchor: new google.maps.Point( Number( markerSettings.anchor[0] ), Number( markerSettings.anchor[1] ) )
                    };
                    startMarkerData = new MarkerWithLabel({
                        position: leg.start_location,
                        icon: mapIconStart,
                        map: bigmap,
                        title: ''
                    });

                    /* Loop over the legs and steps of the directions */
                    for ( i = 0; i < direction.legs.length; i++ ) {
                        legs = direction.legs[i];

                        for ( j = 0, len = legs.steps.length; j < len; j++ ) {
                            step = legs.steps[j];
                            var diricon="";
                            diricon=step.maneuver;
                            index = j+1;
                            directionStops = directionStops + "<li class='big-direction-data'><div class='adp-"+diricon+" adp-maneuver'></div><div class='big-direction-index'>" + index + "</div><div class='big-direction-txt '>" +step.instructions + "</div><div class='big-direction-distance'>" + step.distance.text + "</div></li>";
                        }
                    }

                    $( "#big-map-directions-list ul" ).append( directionStops ).before( "<div class='big-direction-distance'><div><span class='div-total-distance'>" + direction.legs[0].distance.text + "</span> - <span class='big-total-durations'>" + direction.legs[0].duration.text + "</span></div></div>" );

                    /* Remove all single markers from the map */
                    /*for ( i = 0, len = markersBigArray.length; i < len; i++ ) {
                        markersBigArray[i].setMap( null );
                    }*/

                    /* Remove the marker clusters from the map */
                    if ( markerClusterer ) {
                        markerClusterer.clearMarkers();
                    }			

                    /* Remove the start marker from the map */
                    /*if ( ( typeof( startMarkerData ) !== "undefined" ) && ( startMarkerData !== "" ) ) {
                        startMarkerData.setMap( null );
                    }*/

                    /* Make sure the start of the route directions are visible if the store listings are shown below the map */						
                    if ( wpslSettings.templateId == 1 ) {
                        directionOffset = $( "#wpsl-dmap" ).offset();
                        $( window ).scrollTop( directionOffset.top );
                    }
                }
            } else {
                directionErrors( status );
            }
        });
    }
   
});