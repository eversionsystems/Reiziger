<?php
/**
 * The template for displaying the footer
 *
 * Contains footer content and the closing of the #main and #page div elements.
 *
 * @package WordPress
 * @subpackage Reiziger
 * @since Reiziger 1.0
 */
?>

		<?php if ((!is_page('landing-page'))&&(!is_front_page())): ?>
        <div style="clear:both;"></div>
        <footer>
			<?php if ( is_active_sidebar( 'footer-top' ) ) : ?>
                    <?php dynamic_sidebar( 'footer-top' ); ?>
            <?php endif; ?>
			<div id="section38" class="page latest-news">
			  <div class="container">
				<div class="news-right">
				  <h2>Subscribe to our newsletter.</h2>
				  <p class="receive">Receive the latest news and growing information from Reiziger craftsmen.</p>
				  <p>Product updates | Craft growing and nutrient features | Access to exclusive content</p>
				  <div class="cl"></div>
				  <div class="subscribe-form">
					<?php $Path=$_SERVER['REQUEST_URI'];
									$URI='http://www.reiziger.com'.$Path.'?success=1';
										?>
					<form action="https://www.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8" method="POST" onSubmit="return ValidateForm(this)">
					  <input type=hidden name="oid" value="00D20000000KCn1">
					  <input type=hidden name="retURL" value="<?php echo $URI; ?>">
					  <!--<input type="hidden" name="debug" value=1>
											<input type="hidden" name="debugEmail" value="jay@tanksite.com.au">-->
					  <input type="hidden" id="lead_source" name="lead_source" value="Website - Reiziger.com">
					  <input type="hidden" id="Campaign_ID" name="Campaign_ID" value="701200000012FEM">
					  <div class="row">
						<div class="col-xs-12 col-sm-6">
						  <div class="col-xs-12">
							<input id="email" name="email" type="text" placeholder="Your Email"><br>
							<div id="email-error" style="color: red; display: none;"></div>
						  </div>
						  <div class="col-xs-12 sub-btn">
							<input type="submit" value="Subscribe Now">
						  </div>
						</div>
						<div class="col-xs-12 col-sm-6">
						  <script src='https://www.google.com/recaptcha/api.js'></script>
						  <div class="g-recaptcha" data-expired-callback="iMightBetARobot" data-callback="imNotARobot" data-sitekey="6LfCtgoUAAAAAJIvEN8bGxQEN7ROiuLYfSSdTsXA"></div>
						</div>
					  </div>
					</form>
				  </div>
				</div>
			  </div>
			</div>

            <div class="footer-midd">
                <div class="wrapper clearfix">
					<?php if ( is_active_sidebar( 'footer-col1' ) ) : ?>
                    <div class="col2 fo1">
                    	<?php dynamic_sidebar( 'footer-col1' ); ?>
                    </div>
                    <?php endif; ?>

                    <?php if ( is_active_sidebar( 'footer-col2' ) ) : ?>
                    <div class="col2 fo2">
                    	<?php dynamic_sidebar( 'footer-col2' ); ?>
                    </div>
                    <?php endif; ?>

                    <?php if ( is_active_sidebar( 'footer-col3' ) ) : ?>
                    <div class="col2 hllink fo3">
                    	<?php dynamic_sidebar( 'footer-col3' ); ?>
                    </div>
                    <?php endif; ?>

                    <?php if ( is_active_sidebar( 'footer-col4' ) ) : ?>
                   <div class="col2 arlink fo4">
                    	<?php dynamic_sidebar( 'footer-col4' ); ?>
                    </div>
                    <?php endif; ?>

					<?php if ( is_active_sidebar( 'footer-col5' ) ) : ?>
                    <div class="col2 arlink fo5">
                    	<?php dynamic_sidebar( 'footer-col5' ); ?>
                    </div>
                    <?php endif; ?>

					<?php if ( is_active_sidebar( 'footer-col6' ) ) : ?>
                    <div class="col2 arlink fo6">
                    	<?php dynamic_sidebar( 'footer-col6' ); ?>
                    </div>
                    <?php endif; ?>

                </div>
            </div>

            <?php if ( is_active_sidebar( 'footer-bottom' ) ) : ?>
            <div class="copy">
            	<div class="wrapper">
                	<?php dynamic_sidebar( 'footer-bottom' ); ?>
	            </div>
            </div>
             <?php endif; ?>

		</footer>
        <?php endif; ?>

		<?php if ( is_active_sidebar( 'login' ) ) : ?>
			<?php dynamic_sidebar( 'login' ); ?>
		<?php endif; ?>

<div id="disc_popup" class="contact-box">
  <header> <span class="contact-title">DISCLOSURES</span><a href="#" class="js-modal-close close">CLOSE X</a> </header>
  <div class="contact-body">
   <ul class="tcom-disclaimers-list">
   <?php if( have_rows('msrp_disclosuresclosers',5644) ){ $disc_counter = 1; ?>
	<?php while( have_rows('msrp_disclosuresclosers',5644) ){ the_row();
		$disclosurescloser = get_sub_field('disclosurescloser',5644);
		$msrp_class= "msrp_".$disc_counter;
		if($disc_counter==1){ $msrp_class = "msrp_".$disc_counter." first";	} ?>
		<li class="<?php echo $msrp_class; ?>"><?php echo $disc_counter; ?>. <?php echo $disclosurescloser; ?></li>
	 <?php $disc_counter++; } ?>
  <?php } ?>
  </ul>
 </div>
</div>



	</div>
	<!-- main-body -->
	<?php wp_footer(); ?>

	<script type="text/javascript">
		jQuery(".slide-nav a").click(function(){
			jQuery(".navigation2").slideToggle('');
			jQuery(this).toggleClass("active");
		});

		jQuery(".search-icon").click(function(){
			jQuery(".sea-in").toggle('');
			jQuery(this).toggleClass("active");
		});

		jQuery(".scroll-nav a").click(function(){
			jQuery(".scroll-navigate").slideToggle('');
			jQuery(this).toggleClass("active");
		});

		jQuery(".mobile-bar a").click(function(){
			jQuery(".navication").slideToggle();
			jQuery(this).toggleClass("active");
		});
	</script>

	<script type="text/javascript">
	jQuery(function() {
		jQuery('#slides').superslides({
			play: 5000,
			animation: 'fade',
			animation_speed: 1000,
			pagination: false
		});
	});

	// adding touch support for the main slider (using SouchSwipe)
	$('#slides').swipe( {
		swipeLeft:function() {
			$(this).superslides('animate', 'next');
		},
		swipeRight:function() {
			$(this).superslides('animate', 'prev');
		}
	});

    /*var $slides = jQuery('.slides-container');
    $slides.swipe( {
      swipeLeft:function() {
        $slides.data('superslides').animate('next');
      },
      swipeRight:function() {
        jQuery(this).superslides('animate', 'prev');
      }
    });*/
	</script>

	<script type="text/javascript">
	/*jQuery(window).scroll(function(){
		jQuery(".desk-header .navication li").each(function() {
			if(jQuery(this).hasClass( 'ubermenu-has-submenu-drop' )){
				if(jQuery(this).hasClass( 'ubermenu-active' )){
					if(!jQuery(this).hasClass('ubermenu-item-level-0')){
						jQuery(this).toggleClass('ubermenu-active', 6000, "slide");
					} else {
						//jQuery(this).removeClass('ubermenu-active');
						jQuery(this).toggleClass('ubermenu-active', 6000, "slide");
					}
				}
			}


	  });
	});*/
	</script>

	<script type="text/javascript">
		jQuery('#fixmenu-mobi').scrollToFixed();
		jQuery('#fixmenu-desk').scrollToFixed();
		jQuery('#fixmenu1').scrollToFixed();
		jQuery('#header-blue').scrollToFixed();
		//jQuery('.cart_menu').scrollToFixed();
	</script>

	<script type="text/javascript">

		jQuery('body').on('contextmenu', 'img', function(e){ return false; });

		jQuery( function() {
			/*jQuery('#cd-dropdown').dropdown({ gutter : 0 });
			jQuery('#cd-dropdown1').dropdown({ gutter : 0 });
			jQuery('#cd-dropdown2').dropdown({ gutter : 0 });
			jQuery('#cd-dropdown3').dropdown({ gutter : 0 });
			jQuery('#cd-dropdown4').dropdown({ gutter : 0 });*/
			/*jQuery('#product-option').dropdown({ gutter : 0 });*/
		});

		/* -- Substrate -- */
		jQuery("#cd-dropdown").each(function(){
            jQuery(this).wrap("<span class='grow-guide select-wrapper'></span>");
			jQuery(this).after("<input type='hidden' value='-1' name='subtrate' id='subtrate'>");
            jQuery(this).after("<span class='holder'></span>");
        });

        jQuery("#cd-dropdown").change(function(){
            var selectedOption = jQuery(this).find(":selected").text();
			var selectedval = jQuery(this).find(":selected").val();
            jQuery(this).next(".holder").text(selectedOption);
			jQuery("input#subtrate").val(selectedval);
        }).trigger('change');
		/* ----- */

		/* --Grow Level-- */
		jQuery("#cd-dropdown4").each(function(){
            jQuery(this).wrap("<span class='grow-guide select-wrapper'></span>");
			jQuery(this).after("<input type='hidden' value='-1' name='glevel' id='glevel'>");
            jQuery(this).after("<span class='holder'></span>");
        });

        jQuery("#cd-dropdown4").change(function(){
            var selectedOption = jQuery(this).find(":selected").text();
			var selectedval = jQuery(this).find(":selected").val();
            jQuery(this).next(".holder").text(selectedOption);
			jQuery("input#glevel").val(selectedval);
        }).trigger('change');
		/* ----- */

		/* -- Units-- */
		jQuery("#cd-dropdown3").each(function(){
            jQuery(this).wrap("<span class='grow-guide select-wrapper reservior'></span>");
			jQuery(this).after("<input type='hidden' value='-1' name='reservior' id='reservior'>");
            jQuery(this).after("<span class='holder'></span>");
        });

        jQuery("#cd-dropdown3").change(function(){
            var selectedOption = jQuery(this).find(":selected").text();
			var selectedval = jQuery(this).find(":selected").val();
            jQuery(this).next(".holder").text(selectedOption);
			jQuery("input#reservior").val(selectedval);
        }).trigger('change');
		/* ----- */

		/* -- Conductivity -- */
		jQuery("#cd-dropdown1").each(function(){
            jQuery(this).wrap("<span class='grow-guide select-wrapper'></span>");
			jQuery(this).after("<input type='hidden' value='-1' name='conductivity' id='conductivity'>");
            jQuery(this).after("<span class='holder'></span>");
        });

        jQuery("#cd-dropdown1").change(function(){
            var selectedOption = jQuery(this).find(":selected").text();
			var selectedval = jQuery(this).find(":selected").val();
			var selectedwater = jQuery('#cd-dropdown2').find(":selected").val();
			//alert(selectedwater);
            jQuery(this).next(".holder").text(selectedOption);
			jQuery("input#conductivity").val(selectedval);

			if(selectedval == 1) {
				jQuery('#cd-dropdown2 option[value="1"]').text("RO - 0.0");
				jQuery('#cd-dropdown2 option[value="2"]').text("Soft - 0.2");
				jQuery('#cd-dropdown2 option[value="3"]').text("Medium - 0.4");
				jQuery('#cd-dropdown2 option[value="4"]').text("Hard - 0.6");
			} else if(selectedval == 2) {
				jQuery('#cd-dropdown2 option[value="1"]').text("RO - 0");
				jQuery('#cd-dropdown2 option[value="2"]').text("Soft - 140");
				jQuery('#cd-dropdown2 option[value="3"]').text("Medium - 280");
				jQuery('#cd-dropdown2 option[value="4"]').text("Hard - 420");
			} else if(selectedval == 3) {
				jQuery('#cd-dropdown2 option[value="1"]').text("RO - 0");
				jQuery('#cd-dropdown2 option[value="2"]').text("Soft - 130");
				jQuery('#cd-dropdown2 option[value="3"]').text("Medium - 260");
				jQuery('#cd-dropdown2 option[value="4"]').text("Hard - 380");
			} else if(selectedval == 4) {
				jQuery('#cd-dropdown2 option[value="1"]').text("RO - 0");
				jQuery('#cd-dropdown2 option[value="2"]').text("Soft - 100");
				jQuery('#cd-dropdown2 option[value="3"]').text("Medium - 200");
				jQuery('#cd-dropdown2 option[value="4"]').text("Hard - 300");
			} else if(selectedval == 5) {
				jQuery('#cd-dropdown2 option[value="1"]').text("RO - 0");
				jQuery('#cd-dropdown2 option[value="2"]').text("Soft - 2");
				jQuery('#cd-dropdown2 option[value="3"]').text("Medium - 4");
				jQuery('#cd-dropdown2 option[value="4"]').text("Hard - 6");
			}

			if(selectedwater > -1) {
				var selectedWOption = jQuery("#cd-dropdown2").find(":selected").text();
				jQuery("#cd-dropdown2").next(".holder").text(selectedWOption);
			}
        }).trigger('change');
		/* ----- */

		/* -- Water Hardness -- */
		jQuery("#cd-dropdown2").each(function(){
            jQuery(this).wrap("<span class='grow-guide select-wrapper'></span>");
			jQuery(this).after("<input type='hidden' value='-1' name='waterh' id='waterh'>");
            jQuery(this).after("<span class='holder'></span>");
        });

        jQuery("#cd-dropdown2").change(function(){
            var selectedOption = jQuery(this).find(":selected").text();
			var selectedval = jQuery(this).find(":selected").val();
            jQuery(this).next(".holder").text(selectedOption);
			jQuery("input#waterh").val(selectedval);
			if(selectedval == 5) {
				jQuery(".fleft.water-hard").show('slow');
				//jQuery(".fleft.water-hard #custom-water").attr('placeholder',jQuery("#cd-dropdown1").find(":selected").text());
			} else {
				jQuery(".fleft.water-hard").hide('hide');
			}
        }).trigger('change');
		/* ----- */

	</script>

	<script>
	jQuery('.grow-input').jRange({
		from: 1,
		to: 20,
		step: 1,
		scale: [0,25,50,75,100],
		format: '%s',
		width: 300,
		showLabels: true,
		showScale:false
	});

	jQuery('.bloom-input').jRange({
		from: 6,
		to: 15,
		step: 1,
		scale: [0,25,50,75,100],
		format: '%s',
		width: 300,
		showLabels: true,
		showScale:false
	});
	</script>

    <script type="text/javascript">
		function load() {
			var glevel = jQuery('input[name=glevel]').val();
			var sub_type = jQuery('input[name=subtrate]').val();
			var flevel = jQuery('input[name=flevel]:checked').val();
			var nuts = jQuery('input[name=nutrients]:checked').val();
			var gweek = jQuery('input[name=gweek]').val();
			var bweek = jQuery('input[name=bweek]').val();
			var flower = jQuery('input[name=flower]:checked').val();
			var resub = jQuery('input[name=resub]:checked').val();
			var rsize = jQuery('#reservior-txt').val();
			var rese = jQuery('input[name=reservior]').val();
			var cond = jQuery('input[name=conductivity]').val();
			var waterh = jQuery('input[name=waterh]').val();

			if(waterh == 5){
				var customwater = jQuery('input[name=custom-water]').val();
			}

			var error = 0;
			if(glevel < 0){
				jQuery(".error.glavel").html('<div style="color: #FF0000">Please select Grower Level</div>');
				error ++;
			} else {
				jQuery(".error.glavel").html('');
			}

			if(sub_type < 0){
				jQuery(".error.subtrate").html('<div style="color: #FF0000">Please select Subtrate Type</div>');
				error ++;
			} else {
				jQuery(".error.subtrate").html('');
			}

			if(rsize == 'Reservoir Size' || rsize == '' || isNaN(rsize)){
				jQuery(".error.reservior-size").html('<div style="color: #FF0000">Please enter Reservoir Size</div>');
				error ++;
			} else if(rsize <= 0){
				jQuery(".error.reservior-size").html('<div style="color: #FF0000">Reservoir Size must be greater then 0</div>');
				error ++;
			} else {
				jQuery(".error.reservior-size").html('');
			}

			if(rese < 0){
				jQuery(".error.reservior").html('<div style="color: #FF0000">Please select Units</div>');
				error ++;
			} else {
				jQuery(".error.reservior").html('');
			}

			if(cond < 0){
				jQuery(".error.conductivity").html('<div style="color: #FF0000">Please select Conductivity</div>');
				error ++;
			} else {
				jQuery(".error.conductivity").html('');
			}

			if(waterh < 0){
				jQuery(".error.waterh").html('<div style="color: #FF0000">Please select Water Hardness</div>');
				error ++;
			} else {
				jQuery(".error.waterh").html('');
			}

			if(waterh == 5){
				if(customwater == '' || isNaN(customwater)) {
					jQuery(".error.custom-water").html('<div style="color: #FF0000">Please Enter Water Hardness</div>');
					error ++;
				} else if(customwater < 0){
					jQuery(".error.custom-water").html('<div style="color: #FF0000">Water Hardness must be greater then 0</div>');
					error ++;
				} else {
					jQuery(".error.custom-water").html('');
				}
			}

			if(error > 0) {
				return false;
			}

			return jQuery.ajax({
				url: '<?php echo get_template_directory_uri(); ?>/ajax_growguide.php',
				type: 'POST',
				data: { glevel : glevel, sub_type: sub_type, flevel : flevel, nuts : nuts, gweek : gweek, bweek : bweek, flower : flower, resub : resub, rsize : rsize, rese : rese, cond : cond, waterh : waterh, customwater: customwater },
				cache: false,
				beforeSend: function(html) {
					jQuery(".whole-cal").html('');
		    		jQuery(".whole-cal").html('<div id="calloader"><div id="status">&nbsp;</div></div>');
				},
				success: function (html) {
					jQuery(".whole-cal").html('');
					jQuery(".whole-cal").html(html);
					jQuery('html,body').animate({scrollTop: $("#whole-cal").offset().top},'slow');
					jQuery(".whole-cal .mobile-owl-carousel").owlCarousel({
					  autoPlay: false,
					  autoHeight : true,
					  singleItem:true
					});
				}
			});
		}

	jQuery(document).ready(function() {
		jQuery('#calculate').on('click',function() {

			/*jQuery(".whole-cal").html('');
		    jQuery(".whole-cal").html('<div id="calloader"><div id="status">&nbsp;</div></div>');*/
			load().done(function(){
				jQuery('.whole-cal').on('click','input[type=checkbox][id^=stage]',function() {
					if(this.checked) {
						var curl = $(this).val();
						jQuery.each(jQuery('input[name="radiohide[]"]:not(:checked)'), function() {
							if($(this).val() == curl) {	this.checked = true; }
							if(curl == 7) {
								if($(this).val() == 15) {	this.checked = true; }
							} else if(curl == 15) {
								if($(this).val() == 7) {	this.checked = true; }
							}
						});
					} else {
						var curl = $(this).val();
						jQuery.each(jQuery('input[name="radiohide[]"]:checked'), function() {
							if(curl == 7) {
								if($(this).val() == 15) {	this.checked = false; }
							} else if(curl == 15) {
								if($(this).val() == 7) {	this.checked = false; }
							}
						});
					}

					var valhide = new Array();
					jQuery.each(jQuery('input[name="radiohide[]"]:not(:checked)'), function() {
						valhide.push($(this).val());
					});

					valhide = valhide.filter(function (e, i, arr) { return arr.lastIndexOf(e) === i; });

					/*var valhide = jQuery('input[name=radiohide]:checked').val();*/
					var glevel = jQuery('input[name=glevel]').val();
					var sub_type = jQuery('input[name=subtrate]').val();
					var flevel = jQuery('input[name=flevel]:checked').val();
					var nuts = jQuery('input[name=nutrients]:checked').val();
					var gweek = jQuery('input[name=gweek]').val();
					var bweek = jQuery('input[name=bweek]').val();
					var flower = jQuery('input[name=flower]:checked').val();
					var resub = jQuery('input[name=resub]:checked').val();
					var rsize = jQuery('#reservior-txt').val();
					var rese = jQuery('input[name=reservior]').val();
					var cond = jQuery('input[name=conductivity]').val();
					var waterh = jQuery('input[name=waterh]').val();

					if(waterh == 5){
						var customwater = jQuery('input[name=custom-water]').val();
					}

					jQuery.ajax({
						url: '<?php echo get_template_directory_uri(); ?>/ajax_growguide.php',
						type: 'POST',
						data: { glevel : glevel, sub_type: sub_type, flevel : flevel, nuts : nuts, gweek : gweek, bweek : bweek, flower : flower, resub : resub, rsize : rsize, rese : rese, cond : cond, waterh : waterh, valhide : valhide, customwater: customwater },
						cache: false,
						success: function (html) {
							jQuery(".whole-cal").html('');
							jQuery(".whole-cal").html(html);
							jQuery(".whole-cal .mobile-owl-carousel").owlCarousel({
							  autoPlay: false,
							  autoHeight : true,
							  singleItem:true
							});
						}
					});
				});

			});
		});
	});
	</script>

    <script>
	jQuery(document).ready(function() {
        var el = jQuery('.map-right-side');
		if(jQuery('.map-right-side').height()!=null)
		{
        var bh=jQuery('.map-right-side').height()+10;
        jQuery(window).scroll(function()
		{
			var top_offset = jQuery('#search-location').offset().top;
          var scroll_top = jQuery(window).scrollTop()+60;

		  var h = jQuery('#search-location').height()+(top_offset/2)+40.5;
//		jQuery('.map-right-side').text("\n"+h+" == >"+scroll_top+"==>"+top_offset);

          if (scroll_top > top_offset)
		  {
			 if(h>scroll_top)
				  el.css('top', (scroll_top - top_offset));
          }
          else {
            el.css('top', '');
          }
        });
		}
	});
	</script>

	<script>
	// makes sure the whole site is loaded
	jQuery(window).load(function() {
		// will first fade out the loading animation
		jQuery("#status").fadeOut();
		// will fade out the whole DIV that covers the website.
		jQuery("#preloader").delay(1000).fadeOut("slow");
	})
	</script>

	<script type="text/javascript">

	function ValidateForm(form) {
		var email = form.email.value;
		if(email != "") {
			var checkmail =  /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
			if(!checkmail.test(email)){
				/*alert("Please enter valid email address.");*/
				document.getElementById('email-error').style.display = "block";
				document.getElementById('email-error').innerHTML = "";
				document.getElementById('email-error').innerHTML = "Please enter valid email address.";
				form.email.style.borderColor = "red";
				form.email.focus();
				return false;
			}
		} else {
			//alert("Please enter your email address.");
			document.getElementById('email-error').style.display = "block";
			document.getElementById('email-error').innerHTML = "";
			document.getElementById('email-error').innerHTML = "Please enter your email address.";
			form.email.style.borderColor = "red";
			form.email.focus();
			return false ;
		}
		return true;
	}
	</script>

	<!-- contact retailer popup -->
	<script type="text/javascript">
	function accordian(){
		jQuery("#contact-retailer .retailer-open-slide").click(function () {
			jQuery("#contact-retailer .retailer-open-slide") .toggleClass('active')
			jQuery("#contact-retailer.contact-box .body-left").animate({
				height: "toggle",
				opacity: "toggle"
			}, "slow");
		});

		jQuery("#contact-retailer .retailer-open-slide-e").click(function () {
			jQuery("#contact-retailer .retailer-open-slide-e") .toggleClass('active')
			jQuery("#contact-retailer.contact-box .body-right").animate({
				height: "toggle",
				opacity: "toggle"
			}, "slow");
		});
	}

	function formchk(){
		jQuery('#contact-retailer #pro-sub').on('click',function() {
			var option = jQuery("#contact-retailer #product-option").val();
			var name = jQuery("#contact-retailer #name").val();
			var lname = jQuery("#contact-retailer #lname").val();
			var email = jQuery("#contact-retailer #email").val();
			var phone = jQuery("#contact-retailer #phone").val();
			var address = jQuery("#contact-retailer #address").val();
			var city = jQuery("#contact-retailer #city").val();
			var comments = jQuery("#contact-retailer #comments").val();

			if(option == 0) {
				var quoteinfo = new Array();

				jQuery.each(jQuery('#contact-retailer input[name="quoteinfo[]"]:checked'), function() {
				  quoteinfo.push($(this).val());
				});
			} else if(option == 1) {
				var proinfo = new Array();

				jQuery.each(jQuery('#contact-retailer input[name="proinfo[]"]:checked'), function() {
				  proinfo.push($(this).val());
				});
			} else {
				var quoteinfo = '';
				var proinfo = '';
			}

			var retailerEmail = new Array();

			jQuery.each(jQuery('#contact-retailer input[name="retailerEmail[]"]:checked'), function() {
			  retailerEmail.push($(this).val());
			});

			var error = 0;

			if(option < 0) {
				jQuery('<div class="form-error">This field is required.</div>').insertBefore("#contact-retailer .select-wrapper");
				jQuery("#contact-retailer #product-option").focus();
				/*return false;*/
				error++;
			}

			if(name == '') {
				jQuery('<div class="form-error">This field is required.</div>').insertBefore("#contact-retailer #name");
				jQuery("#contact-retailer #name").focus();
				/*return false;*/
				error++;
			}

			if(email == '') {
				jQuery('<div class="form-error">This field is required.</div>').insertBefore("#contact-retailer #email");
				jQuery("#contact-retailer #email").focus();
				/*return false;*/
				error++;
			} else {
				var checkmail =  /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
				if(!checkmail.test(email)){
					jQuery('<div class="form-error">Please enter valid email.</div>').insertBefore("#contact-retailer #email");
					jQuery("#contact-retailer #email").focus();
					/*return false;*/
					error++;
				}
			}

			if(error <= 0) {
				jQuery.ajax({
					url: '<?php echo get_template_directory_uri(); ?>/ajax_emailretailer.php',
					type: 'POST',
					data: { name : name, lname: lname, email: email, phone: phone, address: address, city: city, comments: comments, quoteinfo: quoteinfo, proinfo: proinfo, retailerEmail: retailerEmail },
					cache: false,
					success: function (html) {
						jQuery("#contact-retailer").find('div.contact-body').html('');
						jQuery("#contact-retailer").find('div.contact-body').append(html);
					}
				});
			}
		});

	}

	function dropchange(){
		jQuery("#contact-retailer #product-option").each(function(){
            jQuery(this).wrap("<span class='select-wrapper'></span>");
            jQuery(this).after("<span class='holder'></span>");
        });

        jQuery("#contact-retailer #product-option").change(function(){
            var selectedOption = jQuery(this).find(":selected").text();
            jQuery(this).next(".holder").text(selectedOption);
        }).trigger('change');

		jQuery('#contact-retailer #product-option option').on('click',function() {
			dropval = jQuery(this).val();
			if(dropval == 0) {
				jQuery('#contact-retailer .main-prolist').fadeOut();
				jQuery('#contact-retailer .all-prolist').fadeTo(10,1);
			} else if(dropval == 1) {
				jQuery('#contact-retailer .all-prolist').fadeOut();
				jQuery('#contact-retailer .main-prolist').fadeTo(10,1);
			} else if(dropval == -1) {
				jQuery('#contact-retailer .all-prolist').fadeOut();
				jQuery('#contact-retailer .main-prolist').fadeOut();
			}
		});

		jQuery('#contact-retailer #product-option').on('change',function() {
			dropval = jQuery(this).val();
			if(dropval == 0) {
				jQuery('#contact-retailer .main-prolist').fadeOut();
				jQuery('#contact-retailer .all-prolist').fadeTo(10,1);
			} else if(dropval == 1) {
				jQuery('#contact-retailer .all-prolist').fadeOut();
				jQuery('#contact-retailer .main-prolist').fadeTo(10,1);
			} else if(dropval == -1) {
				jQuery('#contact-retailer .all-prolist').fadeOut();
				jQuery('#contact-retailer .main-prolist').fadeOut();
			}
		});
	}

	function chkdropvals(){
		jQuery('#contact-retailer #alldone').on('click',function() {
			var quoteinfo = new Array();

			jQuery.each(jQuery('#contact-retailer input[name="quoteinfo[]"]:checked'), function() {
			  quoteinfo.push($(this).val());
			});

			if(quoteinfo.length === 0){
				jQuery('#contact-retailer .all-prolist').prepend('<div class="form-error">Please select at-least one product.</div>');
				return false;
			} else {
				jQuery('#contact-retailer .all-prolist').fadeOut();
			}
		});

		jQuery('#contact-retailer #prodone').on('click',function() {
			var proinfo = new Array();

			jQuery.each(jQuery('#contact-retailer input[name="proinfo[]"]:checked'), function() {
			  proinfo.push($(this).val());
			});

			if(proinfo.length === 0){
				jQuery('#contact-retailer .main-prolist').prepend('<div class="form-error">Please select product.</div>');
				return false;
			} else {
				jQuery('#contact-retailer .main-prolist').fadeOut();
			}
		});
	}

	function getretailers(){
		var input = jQuery('#contact-retailer #e-zip');
		var val = jQuery('#contact-retailer #e-zip').val();

		input.keydown(function(event) {

			// Allow: backspace, delete
			if ($.inArray(event.keyCode, [46, 8]) !== -1 ||
				 // Allow: home, end, left, right, down, up
				(event.keyCode >= 35 && event.keyCode <= 40)) {
					 // let it happen, don't do anything
					 return;
			}

			// Ensure that it is a number and stop the keypress
			if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
				event.preventDefault();
			}
		});

		input.focus(function() {
			jQuery(this).val('');
		}).blur(function() {
			newval = jQuery(this).val();
			if(newval == '') {
				jQuery(this).val(val);
			} else {
			 	jQuery(this).val(newval);
			}
		});

		jQuery('#contact-retailer .refersh-list').on('click',function() {
			jQuery.ajax({
				url: '<?php echo get_template_directory_uri(); ?>/ajax_getretailerlist.php',
				type: 'POST',
				data: { zip : val },
				cache: false,
				success: function (html) {
					jQuery("#contact-retailer").find('div.raq-section').html('');
					jQuery("#contact-retailer").find('div.raq-section').append(html);
				}
			});
		});
	}

	function showretailers(){
		jQuery('#contact-retailer a.viwe-more-btn').on('click',function() {
			jQuery('#contact-retailer label.retailerlisting').removeClass('hidden');
			jQuery(this).hide('slow');
		});
	}

	function openpopup(id, oldUrl ){

		var appendthis =  ("<div class='modal-overlay'></div>");
		jQuery("body").append(appendthis);
		jQuery(".modal-overlay").fadeTo(10, 0.7);
		jQuery(id).fadeIn(10,function() { jQuery(this).data() });

		//jQuery('#product-option').dropdown({ gutter : 0 });

		jQuery(".js-modal-close").click(function() {
			var mainurl = window.location.href
			//var mainurl = curUrl.split("#contact-retailer");

			if(mainurl!=oldUrl){
				window.history.pushState({path:oldUrl},'',oldUrl);
			}

			jQuery(".contact-box, .modal-overlay").fadeOut(10, function() {
				jQuery(".modal-overlay").remove();
			});

			return false;
		});

		jQuery(window).resize(function() {
		  jQuery(".contact-box").css({
			top: (jQuery(window).height() - jQuery(".contact-box").outerHeight()) / 2,
			left: (jQuery(window).width() - jQuery(".contact-box").outerWidth()) / 2
		  });
		});

		jQuery(window).resize();
	}

	jQuery(document).ready(function() {
		jQuery('#search-location').on('click','.dealer-btn',function() {
			var storeid = jQuery(this).data('store-id');
			var oldUrl = window.location.href;
			var id = jQuery(this).attr('href');

			jQuery.ajax({
				url: '<?php echo get_template_directory_uri(); ?>/ajax_getpopupdata.php',
				type: 'POST',
				data: { storeid : storeid, oldurl: oldUrl },
				cache: false,
				success: function (html) {
					jQuery(".main-body").find('div#contact-retailer').remove();
					jQuery(".main-body").append(html);
					openpopup(id, oldUrl);
					dropchange();
					chkdropvals();
					getretailers();
					showretailers();
					//accordian();
					formchk();
				}
			});
		});

		jQuery('#wpsl-dealer-details').on('click','.dealer-btn',function() {
			var oldUrl = window.location.href;
			var storeid = jQuery(this).data('store-id');
			var id = jQuery(this).attr('href');
			jQuery.ajax({
				url: '<?php echo get_template_directory_uri(); ?>/ajax_getpopupdata.php',
				type: 'POST',
				data: { storeid : storeid, oldurl: oldUrl },
				cache: false,
				success: function (html) {
					jQuery(".main-body").find('div#contact-retailer').remove();
					jQuery(".main-body").append(html);
					openpopup(id, oldUrl);
					dropchange();
					chkdropvals();
					getretailers();
					showretailers();
					//accordian();
					formchk();
				}
			});
		});



	});
	</script>

	<!-- Login box popup -->
	<script type="text/javascript">
		jQuery('.head-top').on('click','a.login',function() {
			var oldUrl = window.location.href;
			var id = jQuery(this).attr('href');
			loginpopup(id, oldUrl );
		});

		jQuery('.footer-midd ul li.login').on('click','a',function() {
			var oldUrl = window.location.href;
			var id = jQuery(this).attr('href');
			loginpopup(id, oldUrl );
		});


		function loginpopup(id, oldUrl ){
			var appendthis =  ("<div class='modal-overlay'></div>");
			jQuery("body").append(appendthis);
			jQuery(".modal-overlay").fadeTo(10, 0.7);
			jQuery(id).fadeIn(10,function() { jQuery(this).data() });

			jQuery(".js-modal-close").click(function() {
				var mainurl = window.location.href

				if(mainurl!=oldUrl){
					window.history.pushState({path:oldUrl},'',oldUrl);
				}

				jQuery(".login-box, .modal-overlay").fadeOut(10, function() {
					jQuery(".modal-overlay").remove();
				});

				return false;
			});

			jQuery(window).resize(function() {
			  jQuery(".login-box").css({
				top: (jQuery(window).height() - jQuery(".login-box").outerHeight()) / 2,
				left: (jQuery(window).width() - jQuery(".login-box").outerWidth()) / 2
			  });
			});

			jQuery(window).resize();
		}
	</script>

    <script>
		jQuery('.disclaimer_wrapper').on('click','a.dis_a',function() {
			var oldUrl = window.location.href;
			var id = jQuery(this).attr('href');
			//alert(jQuery(this).attr("data-disclaimer"));
			disclaimerpopup(id, oldUrl );
			dis_list_id = jQuery(this).attr("data-disclaimer");

			jQuery('ul.tcom-disclaimers-list li').removeClass( "active" );
			jQuery('ul.tcom-disclaimers-list li.'+dis_list_id).addClass( "active" );

			jQuery('div#disc_popup.contact-box .contact-body').animate({
			 scrollTop:jQuery('li.first').position().top }, 0);


			jQuery('div#disc_popup.contact-box .contact-body').animate({
			 scrollTop:jQuery('li.'+dis_list_id).position().top
			}, 1000);



		});



    function disclaimerpopup(id, oldUrl ){
			var appendthis =  ("<div class='modal-overlay'></div>");
			jQuery("body").append(appendthis);
			jQuery(".modal-overlay").fadeTo(100, 0.7);
			jQuery(id).fadeIn(100,function() { jQuery(this).data() });

			jQuery("a.js-modal-close.close,.modal-overlay").click(function() {
				var mainurl = window.location.href

				if(mainurl!=oldUrl){
					window.history.pushState({path:oldUrl},'',oldUrl);
				}

				jQuery("div#disc_popup, .modal-overlay").fadeOut(100, function() {
					jQuery(".modal-overlay").remove();
				});

				return false;
			});

			/*jQuery(window).resize(function() {
			  jQuery(".login-box").css({
				top: (jQuery(window).height() - jQuery(".login-box").outerHeight()) / 2,
				left: (jQuery(window).width() - jQuery(".login-box").outerWidth()) / 2
			  });
			});

			jQuery(window).resize();*/
		}
    </script>


	<script>
jQuery(function(){
	jQuery('.icon-color a').click(function(){
		//jQuery('.icon-color a').removeClass('active');
		jQuery(this).parents('.green-slider').find('.icon-color a.active').removeClass('active');
		jQuery(this).addClass('active');
		jQuery('.panel-div').not('#div'+$(this).attr('target')).slideUp();
		jQuery('.panel-div').not('#div'+$(this).attr('target')).hide();
		jQuery(this).parents('.icon-color').find('#div'+$(this).attr('target')).slideToggle();
	});
});
</script>

<script type="text/javascript">
	jQuery(document).ready(function() {
		jQuery("ul.rel_products_main .openpro").click(function () {
			jQuery("ul.rel_products_sub").animate({
				height: "toggle",
				opacity: "toggle"
			}, "slow");
		});
		});
</script>

<script type="text/javascript">
	function suggestPlaces() {
		var input = (document.getElementById('wpsl-search-input'));
		var types = document.getElementById('type-selector');
		var autocomplete = new google.maps.places.Autocomplete(input, {componentRestrictions: {country: 'au'}} );
	}
</script>
<!--<script type="text/javascript">
jQuery(document).ready(function(e) {
jQuery(".pp_content").innerHTML("dhruv");

});
</script>
-->
<?php $post_slug=$post->post_name; ?>
<?php if($post_slug == 'find-retailer' || is_front_page()):?>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDCHVP3APR_wVplF9z6GS5o5c4AeOTtekE&libraries=places"></script>
    
<?php endif; ?>
<?php if($post_slug == 'find-retailer' || is_front_page() || $post_slug == 'find-retailer-results'):?>
    <script src="<?php echo get_template_directory_uri(); ?>/js/markerwithlabel.js"></script>
<?php endif; ?>
    <?php if (is_front_page()):?>
    <style>
        .pac-container{
            top: inherit !important;
            bottom: 51px;
        }
    </style>
    <?php endif;?>
<script>
	jQuery(document).ready(function() {
        var el = jQuery('.proimg');
        var bh=jQuery('.proimg').height()+10;
        jQuery(window).scroll(function()
		{

			if (jQuery('.rel_products_main').length == 0)
				return;

			var top_offset = jQuery('.rel_products_main').offset().top;
          var scroll_top = jQuery(window).scrollTop()+220;

		  var h = jQuery('.rel_products_main').height()+(top_offset/2)-220;
		jQuery('.map-right-side').text("\n"+h+" == >"+scroll_top+"==>"+top_offset);

          if (scroll_top > top_offset)
		  {
			 if(h>scroll_top)
				  el.css('top', (scroll_top - top_offset));
          }
          else {
            el.css('top', '');
          }
        });
	});
	</script>
<script>


equalheight = function(container){

var currentTallest = 0,
     currentRowStart = 0,
     rowDivs = new Array(),
     $el,
     topPosition = 0;
 $(container).each(function() {

   $el = $(this);
   $($el).height('auto')
   topPostion = $el.position().top;

   if (currentRowStart != topPostion) {
     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
       rowDivs[currentDiv].height(currentTallest);
     }
     rowDivs.length = 0; // empty the array
     currentRowStart = topPostion;
     currentTallest = $el.height();
     rowDivs.push($el);
   } else {
     rowDivs.push($el);
     currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
  }
   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
     rowDivs[currentDiv].height(currentTallest);
   }
 });
}

$(window).load(function() {
  equalheight('.woocommerce .upsells.products ul.products li.cat-list');
});

$(window).click(function() {
  equalheight('.woocommerce .upsells.products ul.products li.cat-list');
});


$(window).resize(function(){
  equalheight('.woocommerce .upsells.products ul.products li.cat-list');
});


if(jQuery.browser && jQuery.browser.webkit) {
    jQuery('input#account_password').attr('autocomplete', 'off');
}





$('.quantity input.input-text.qty.text').on('keypress keydown keyup', function (e) {
   if (e.keyCode == 13) {
     e.preventDefault();
   }
});

</script>

<script>
(function(){
	var id = '#uber-grid-wrapper-812';
	var options = {"ajaxurl":"<?php echo get_site_url(); ?>/wp-admin/admin-ajax.php",
	               "autosize":"1",
				   "max_width":null,
				   "columns":"",
				   "columns_440":"",
				   "columns_768":"",
				   "lightbox":"uberbox",
				   "lightbox_options":[],
				   "pagination":{"per_page":12,"enable":false,"style":"pagination","load_more":"Load more"},
				   "default_filter":null,
				   "size":{"width":160,"height":160},
				   "size440":{"width":120,"height":120},
				   "size768":{"width":160,"height":160},
				   "gutter":0,
				   "gutter_768":0,
				   "gutter_440":0,
				   "cell_border":0,
				   "cell_border_440":0,
				   "cell_border_768":0,
				   "lightbox_enable":true};
	options.el = jQuery(id);
	if(options.el.length) {
        var initialize = function () {
            setTimeout(function () {
                new UberGrid(options);
            }, 1);
        };
        if (typeof(UberGrid) != 'undefined' && UberGrid) {
            initialize();
        } else {
            jQuery(initialize);
        }
    }
})();

$('.subscribe-form .sub-btn input').attr('disabled', 'disabled');

function imNotARobot() {

	$('.subscribe-form .sub-btn input').removeAttr('disabled');

}

function iMightBetARobot() {
	$('.subscribe-form .sub-btn input').attr('disabled', 'disabled');
}


</script>

<script>
$("a#galleryImage1").click(function(){$("a#baseGalleryImage1").trigger("click");});
$("a#galleryImage2").click(function(){$("a#baseGalleryImage2").trigger("click");});
$("a#galleryImage3").click(function(){$("a#baseGalleryImage3").trigger("click");});
$("a#galleryImage4").click(function(){$("a#baseGalleryImage4").trigger("click");});
$("a#galleryImage5").click(function(){$("a#baseGalleryImage5").trigger("click");});
$("a#galleryImage6").click(function(){$("a#baseGalleryImage6").trigger("click");});
</script>

<style type="text/css">
	[disabled] {

	}

	.subscribe-form .sub-btn input[disabled]:hover, .subscribe-form .sub-btn input[disabled]:active, .subscribe-form .sub-btn input[disabled]:focus {
	  background-color: #fff;
	  color: #f6a704;
	  cursor: not-allowed;
	}

</style>

</body>
</html>
