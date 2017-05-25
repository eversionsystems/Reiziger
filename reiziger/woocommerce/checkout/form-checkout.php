<?php
/**
 * Checkout Form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/form-checkout.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you (the theme developer).
 * will need to copy the new files to your theme to maintain compatibility. We try to do this.
 * as little as possible, but it does happen. When this occurs the version of the template file will.
 * be bumped and the readme will list any important changes.
 *
 * @see 	    http://docs.woothemes.com/document/template-structure/
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.3.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

echo '<div class="wrapper clearfix" id="container"><div role="main" id="content">';

wc_print_notices();

if($checkout->enable_guest_checkout && ! is_user_logged_in() && !$_REQUEST['guest']) {
	do_action( 'woocommerce_before_checkout_form', $checkout );
	return;
}

// If checkout registration is disabled and not logged in, the user cannot checkout
if ( ! $checkout->enable_signup && ! $checkout->enable_guest_checkout && ! is_user_logged_in() ) {
	echo apply_filters( 'woocommerce_checkout_must_be_logged_in_message', __( 'You must be logged in to checkout.', 'woocommerce' ) );
	return;
}

?>
<script type="text/javascript">

  function checkForm(form)
  {
    if(!form.termsaccept.checked) {
      alert("Please indicate that you accept the Terms and Conditions");
      form.termsaccept.focus();
      return false;
    } alert('out if loop..')
    return true;
  }
</script>
<?php
global $woocommerce;
$cart_url = $woocommerce->cart->get_cart_url();
?>

<form name="checkout" method="post" id="chk123" class="checkout woocommerce-checkout" 
action="<?php echo esc_url( wc_get_checkout_url() ); ?>" enctype="multipart/form-data" onsubmit="return checkForm(this);">

	<?php if ( sizeof( $checkout->checkout_fields ) > 0 ) : ?>

		<?php do_action( 'woocommerce_checkout_before_customer_details' ); ?>
		<div class="gray-bg accord lbl1 active">1. Delivery <a id="stepone" href="<?php echo $cart_url; ?>" data-id="checkout-section1" class="edittabs step1">Edit</a></div>
		<div id="checkout-section1" class="order-review">
			<!-- <h3 id="order_review_heading"><?php _e( '1. Delivery', 'woocommerce' ); ?></h3>-->
			<div id="order_review" class="woocommerce-checkout-review-order">
				<?php woocommerce_order_review(); ?>
			</div>
			<div class="cnt-btn"><button type="button" id="delivery-btn" class="delivery count-btn" data-expand="checkout-section2" data-collapsed="checkout-section1" >Continue</button></div>
		</div>
		<div class="cl"></div>
		<div class="gray-bg accord lbl2">2. Shipping Address <a id="steptwo" data-id="checkout-section2" class="edittabs step2">Edit</a></div>
		<div id="checkout-section2" class="customer_details">
			<div class="col-12">
				<?php do_action( 'woocommerce_checkout_shipping' ); ?>
				<div class="cnt-btn"><button type="button" id="shipping-btn" class="shipping count-btn" data-expand="checkout-section3" data-collapsed="checkout-section2">Continue</button></div>
			</div>
		</div>
		<div class="cl"></div>
		<div class="gray-bg accord lbl3">3. Payment <a id="stepthree" data-id="checkout-section3" class="edittabs step3">Edit</a></div>
		<div id="checkout-section3" class="customer_details">
			<div class="col-12">
				<?php do_action( 'woocommerce_checkout_billing' ); ?>
				<?php if ( is_user_logged_in() ): ?>
				<?php if ( WC()->cart->needs_payment() ) : ?>
					<div class="cnt-btn"><input type="submit" class="billing count-btn" name="woocommerce_checkout_place_order" id="place_order" value="Continue" data-value="Continue" /></div>
					<?php wp_nonce_field( 'woocommerce-process_checkout' ); ?>
				<?php endif; ?>
				<?php else : ?>
					<div class="cnt-btn"><button type="button" id="billing-btn" class="billing count-btn" data-expand="checkout-section4" data-collapsed="checkout-section3">Continue</button></div>
				<?php endif; ?>
			</div>
		</div>
		<div class="cl"></div>
		
		<?php if ( !is_user_logged_in() ): ?>
		<div class="gray-bg accord lbl4">4. Account <a id="stepfour" data-id="checkout-section4" class="edittabs step4">Edit</a></div>
		<div id="checkout-section4" class="account_section"><?php wc_get_template( 'checkout/account.php', array(
			'checkout'           => WC()->checkout(),
			'available_gateways' => WC()->payment_gateways()->get_available_payment_gateways(),
			'order_button_text'  => apply_filters( 'woocommerce_order_button_text', __( 'Continue', 'woocommerce' ) )
		) ); ?></div>
		<?php endif; ?>
		<?php do_action( 'woocommerce_checkout_after_customer_details' ); ?>

	<?php endif; ?>
	
	<div class="cl"></div>
	<div class="check-footer"><div class="cart-total-area"><?php echo 'Cart Subtotal '; wc_cart_totals_order_total_html(); ?></div>
	<!--<p class="agree-area  woocommerce-validated">
    <input type="checkbox" id="termsaccept" name="termsaccept" 
           value="Terms and Condition Accepted" class="required">I understand and agree that I am entering into an electronic transaction, and by clicking Continue, I also accept and agree to all terms of <a href="#">Reizigers Sales and Refund Policy.</a><br /> I agree to receive electronically all documents, including warranty, disclosure and/or insurance documents, as applicable, to my nominated email address.</p>-->
    </div>
    <?php wc_get_template( 'checkout/terms.php' ); ?>
    
</form>

<?php do_action( 'woocommerce_after_checkout_form', $checkout ); ?>
<div class="reizigers_sales_refund_policy" style="display:none;">
<?php
		##Reizigers Sales and Refund Policy
		$content ="";
		$mypages = get_post(5282);	
		$content = $mypages->post_content;
		if ( ! $content ) // Check for empty page
			continue;
			$content = apply_filters( 'the_content', $content );
		echo "<h1>Reizigers Sales and Refund Policy</h1>";	
		echo $content;

?>
<a id="hide_t_and_c_page">Hide</a>
</div><!-- .reizigers_sales_refund_policy-->
<?php echo '</div><!--.content-->'; ?>

<script>
jQuery(function() {
    jQuery( "a#t_and_c_page" ).click(function() {
        jQuery( ".reizigers_sales_refund_policy" ).slideToggle();
    });
    jQuery( "a#hide_t_and_c_page" ).click(function() {
        jQuery( ".reizigers_sales_refund_policy" ).slideUp();
    });


});
</script>

<script type="text/javascript">
jQuery(document).ready(function(){
	jQuery("#billing-btn").on('click',function(){
		var email_id = jQuery("#billing_email").val();
		var url = '<?php echo get_template_directory_uri(); ?>/account-check.php';
		jQuery.ajax({
            url: url,
            type: 'POST',
            data: { email_id: email_id },
            success: function( data ) {
              //data is whatever your PHP script returns			  
			  if(data!=0 && data!="")
			  {				 
				jQuery(".userlogin_id").empty().html("Reiziger ID: "+ data);				 
				jQuery("#regidfound").empty().html("<strong>We found an existing Reiziger ID that matches your email</strong>");
				document.getElementById("username").value = data;    
			  }
			  else
			  {
				  jQuery(".userlogin_id").empty().html("");				 
				jQuery("#regidfound").empty().html("");
				document.getElementById("username").value = "";    
			  }
			  
            }
        });
		
		return false;
	});
	jQuery(".edittabs").on('click',function(){
		if(jQuery(this).data('id')=="checkout-section1")
		{
			var tabsid=jQuery(this).data('id');
			jQuery("#"+tabsid).slideDown('normal');
			jQuery("#checkout-section2").slideUp('normal');
			jQuery("#checkout-section3").slideUp('normal');
						jQuery(".accord").removeClass('active');
			jQuery(".lbl1").addClass("active");

			
		}
		if(jQuery(this).data('id')=="checkout-section2")
		{
			var tabsid=jQuery(this).data('id');
			jQuery("#checkout-section1").slideUp('normal');
			jQuery("#"+tabsid).slideDown('normal');			
			jQuery("#checkout-section3").slideUp('normal');
			jQuery(".accord").removeClass('active');
			jQuery(".lbl2").addClass("active");return false;
			
		}
		if(jQuery(this).data('id')=="checkout-section3")
		{			
			var tabsid=jQuery(this).data('id');
			jQuery("#checkout-section1").slideUp('normal');
			jQuery("#checkout-section2").slideUp('normal');
			jQuery("#"+tabsid).slideDown('normal');	
			return false;
						jQuery(".accord").removeClass('active');
			jQuery(".lbl3").addClass("active");

			
		}
		if(jQuery(this).data('id')=="checkout-section4")
		{
			var tabsid=jQuery(this).data('id');
			jQuery("#checkout-section1").slideUp('normal');
			jQuery("#checkout-section2").slideUp('normal');
			jQuery("#checkout-section3").slideUp('normal');
			jQuery("#"+tabsid).slideDown('normal');		
						jQuery(".accord").removeClass('active');
			jQuery(".lbl4").addClass("active");

		}
	});
	
//	if(jQuery("#shipping_first_name").val()!='' && jQuery("#shipping_company").val()!="" &&jQuery("#shipping_city").val()!="")
//	{
//	}
	//
	//;
	//;
	jQuery("#shipping_first_name").attr("placeholder", "Name*");
	jQuery("#shipping_company").attr("placeholder", "Company Name");
	jQuery("#shipping_mobile").attr("placeholder", "Mobile*");
	
	jQuery("#billing_mobile").attr("placeholder", "Primary Phone*");
	jQuery("#billing_email").attr("placeholder", "Email Address*");
	jQuery("#billing_company").attr("placeholder", "Company Name");
	jQuery("#billing_postcode").attr("placeholder", "Postcode*");
	
	jQuery(".count-btn").on('click',function(){
		var expand = jQuery(this).data('expand');
		var collapsed = jQuery(this).data('collapsed');
		if(jQuery(this).data('collapsed')=="checkout-section1")
		{			
			jQuery("#stepone").show();
		}
		
		

		if(expand=="checkout-section1")
		{
			jQuery(".accord").removeClass('active');
			jQuery(".lbl1").addClass("active");
			
		}
		if(expand=="checkout-section2")
		{
			jQuery(".accord").removeClass('active');
			jQuery(".lbl2").addClass("active");		
		}
		if(expand=="checkout-section3")
		{
		jQuery(".accord").removeClass('active');
				jQuery(".lbl3").addClass("active");
			
		}
		if(expand=="checkout-section4")
		{
		jQuery(".accord").removeClass('active');
				jQuery(".lbl4").addClass("active");
		}
		
		
		
		if(jQuery('#checkout-section2').is(':visible'))
		{
		
			if(jQuery("#shipping_first_name").val()==''){	jQuery("#shipping_first_name").css("border-color", "#a00");}
			if(jQuery("#shipping_company").val()==''){	jQuery("#shipping_company").css("border-color", "#a00");}
			
			if(jQuery("#shipping_city").val()==''){	jQuery("#shipping_city").css("border-color", "#a00");}
			if(jQuery("#shipping_stateshipping_state").val()==''){	jQuery("#shipping_stateshipping_state").css("border-color", "#a00");}
			if(jQuery("#shipping_postcode").val()==''){	jQuery("#shipping_postcode").css("border-color", "#a00");}
			if(jQuery("#shipping_country").val()==''){	jQuery("#shipping_country").css("border-color", "#a00");}
			if(jQuery("#shipping_address_1").val()==''){	jQuery("#shipping_address_1").css("border-color", "#a00");}
			if(jQuery("#shipping_mobile").val()==''){	jQuery("#shipping_mobile").css("border-color", "#a00");}
			
			if(jQuery("#shipping_first_name").val()!='' && jQuery("#shipping_mobile").val()!='' && jQuery("#shipping_city").val()!='' && jQuery("#shipping_stateshipping_state").val()!=''
			&& jQuery("#shipping_postcode").val()!='' && jQuery("#shipping_country").val()!='' && jQuery("#shipping_address_1").val()!=''	)
			{
				
				if(collapsed != "" && expand != "") {
				jQuery("#"+collapsed).slideUp('normal');
				jQuery("#"+expand).slideDown('normal');
				jQuery("#steptwo").show();
				}
			}
		}else { 
		if(jQuery("#checkout-section3").is(':visible'))
		{	
			if(jQuery("#billing_first_name").val()==''){jQuery("#billing_first_name").css("border-color", "#a00");}else{}
			if(jQuery("#billing_last_name").val()==''){	jQuery("#billing_last_name").css("border-color", "#a00");}
			if(jQuery("#billing_mobile").val()==''){	jQuery("#billing_mobile").css("border-color", "#a00");}
			if(jQuery("#billing_email").val()==''){	jQuery("#billing_email").css("border-color", "#a00");}
			//if(jQuery("#billing_company").val()==''){	jQuery("#billing_company").css("border-color", "#a00");}
			if(jQuery("#billing_address_1").val()==''){	jQuery("#billing_address_1").css("border-color", "#a00");}
			if(jQuery("#billing_city").val()==''){	jQuery("#billing_city").css("border-color", "#a00");}
			if(jQuery("#billing_state").val()==''){	jQuery("#billing_state").css("border-color", "#a00");}
			if(jQuery(".woocommerce-cc-month").val()==''){	jQuery(".woocommerce-cc-month").css("border-color", "#a00");}
			if(jQuery("#eway_cvn").val()==''){	jQuery("#eway_cvn").css("border-color", "#a00");}
			if(jQuery(".woocommerce-cc-year").val()==''){	jQuery(".woocommerce-cc-year").css("border-color", "#a00");}
			
			if(jQuery("#billing_postcode").val()==''){	jQuery("#billing_postcode").css("border-color", "#a00");}
			if(jQuery("#billing_country").val()==''){	jQuery("#billing_country").css("border-color", "#a00");}
			if(jQuery("#eway_card_name").val()==''){	jQuery("#eway_card_name").css("border-color", "#a00");}
			if(jQuery("#eway_card_number").val()==''){	jQuery("#eway_card_number").css("border-color", "#a00");}
			
			if(jQuery("#billing_first_name").val()!='' && jQuery("#billing_last_name").val()!='' && jQuery("#billing_mobile").val()!='' && jQuery("#billing_email").val()!=''
			&& jQuery("#billing_address_1").val()!='' && jQuery("#billing_city").val()!='' && jQuery("#billing_state").val()!='' && 
			jQuery("#billing_postcode").val()!='' && jQuery("#billing_country").val()!='' && jQuery("#eway_card_name").val()!='' && jQuery("#eway_card_number").val()!='' && 
			jQuery(".woocommerce-cc-month").val()!='' && jQuery("#eway_cvn").val()!='' && jQuery(".woocommerce-cc-year").val()!='' )
			{
			
				if(collapsed != "" && expand != "")
				{
					jQuery("#"+collapsed).slideUp('normal');
					jQuery("#"+expand).slideDown('normal');
					jQuery("#stepthree").show();
				}
			}
		}
		else
		{

			if(collapsed != "" && expand != "") {
				jQuery("#"+collapsed).slideUp('normal');
				jQuery("#"+expand).slideDown('normal');
				
			}
		}
		}
		window.scrollTo(0, 0);
	});
	
	jQuery(".accord").on('click',function(){

		var id = jQuery(this).next('div').attr('id');
		if(jQuery("#shipping_first_name").val()!='' && jQuery("#shipping_company").val()!='' && jQuery("#shipping_city").val()!='' && jQuery("#shipping_stateshipping_state").val()!=''
			&& jQuery("#shipping_postcode").val()!='' && jQuery("#shipping_country").val()!=''	)
			{
				if(jQuery("#billing_first_name").val()!='' && jQuery("#billing_last_name").val()!='' && jQuery("#billing_mobile").val()!='' && jQuery("#billing_email").val()!=''
					&& jQuery("#billing_company").val()!='' && jQuery("#billing_address_1").val()!='' && jQuery("#billing_city").val()!='' && jQuery("#billing_state").val()!='' && 
					jQuery("#billing_postcode").val()!='' && jQuery("#billing_country").val()!='' && jQuery("#eway_card_name").val()!='' && jQuery("#eway_card_number").val()!='' && 
					jQuery(".woocommerce-cc-month").val()!='' && jQuery("#eway_cvn").val()!='' && jQuery(".woocommerce-cc-year").val()!='' )
					{
						jQuery('[id^=checkout]').not('#'+id).slideUp('normal');
						jQuery(this).next('div').slideToggle('normal');
					}
			}
		window.scrollTo(0, 0);
	});	
	/*jQuery("#chk123").on('submit',function(){
		alert('submit clicked...');
			if(jQuery("#termsaccept").is(':checked'))
			{
			}
			else
			{
				jQuery("#termsaccept").attr ( "class" ,"error" );
				return false;
			}
		});	*/
	
});
</script>
  <script type="text/javascript">
  jQuery(document).ready(function(){
	  
	  jQuery("#billing_company").css("border-color","#69bf29");
	  jQuery("#shipping_first_name").attr("placeholder","First Name*");
	  jQuery("#shipping_company").attr("placeholder","Last Name*");
	  jQuery("#shipping_phone").attr("placeholder","Company Name");
	  jQuery("#shipping_mobile").attr("placeholder","Phone*");
	//shipping validation
	jQuery('#shipping_first_name').blur(function (e) {
		
	   var full_shipping_first_name = jQuery('#shipping_first_name');
	   var name_length_shipping_first_name = full_shipping_first_name.val().length;
 	   if( name_length_shipping_first_name < 2 ) {
	 	  jQuery(".name").remove();
		  jQuery("#shipping_first_name_field").prepend("<p class='i-error name'>Please enter at least 2 characters.</p>");
		  jQuery("#shipping_first_name").css("border-color","#a00"); 
		  setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		  evt.preventDefault();
	   }		
		
        var regex = /^[a-zA-Z\s]+$/;
        var str = jQuery('#shipping_first_name').val();
		if (regex.test(str)) {
            jQuery("#shipping_first_name").css("border-color","#69bf29"); 
		jQuery(".name").remove();
		}
        else
        {
		jQuery(".name").remove();
		jQuery("#shipping_first_name_field").prepend("<p class='i-error name'>Please enter valid first name.</p>");
		jQuery("#shipping_first_name").css("border-color","#a00"); 
		setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		}
    });
	
	
	//It allow only character to field
	$('#shipping_first_name').bind('keypress', function (event) {
		var regex = new RegExp("^[a-zA-Z]+$");
		var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
		if (!regex.test(key)) {
		   event.preventDefault();
			jQuery(".name").remove();
			jQuery("#shipping_first_name_field").prepend("<p class='i-error name'>Numbers or special characters are not permitted</p>");
			jQuery("#shipping_first_name").css("border-color","#a00"); 
			setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		   
		   return false;
		}
	});
	
	
	
	
	jQuery('#shipping_company').blur(function (e) {
		
	   var full_shipping_company = jQuery('#shipping_company');
	   var name_length_shipping_company = full_shipping_company.val().length;
 	   if( name_length_shipping_company < 2 ) {
		jQuery(".last").remove();
		jQuery("#shipping_company").css("border-color","#a00"); 
        jQuery("#shipping_company_field").prepend("<p class='i-error last'>Please enter at least 2 characters.</p>");
		setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		  evt.preventDefault();
	   }		
		
		
        var regex = /^[a-zA-Z\s]+$/;
        var str = jQuery('#shipping_company').val();
		if (regex.test(str)) {
            jQuery("#shipping_company").css("border-color","#69bf29"); 
			jQuery(".last").remove(); 
		}
        else
        {
		jQuery(".last").remove();
		jQuery("#shipping_company").css("border-color","#a00"); 
        jQuery("#shipping_company_field").prepend("<p class='i-error last'>Please enter valid last name.</p>");
		setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		}
    });
	//It allow only character to field
	$('#shipping_company').bind('keypress', function (event) {
		var regex = new RegExp("^[a-zA-Z]+$");
		var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
		if (!regex.test(key)) {
		   event.preventDefault();
		jQuery(".last").remove();
		jQuery("#shipping_company").css("border-color","#a00"); 
        jQuery("#shipping_company_field").prepend("<p class='i-error last'>Numbers or special characters are not permitted</p>");
		setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		   
		   return false;
		}
	});
	
	
	
	
	
	
	
	 $("#shipping_mobile").keypress(function (e) {
     //if the letter is not digit then display error and don't type anything
	 //if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
	 if (e.which != 8 && e.which != 0 && 
	   (e.which != 48 && e.which != 49 && e.which != 50 && e.which != 51 && e.which != 52 &&
	    e.which != 53 && e.which != 54 && e.which != 55 && e.which != 56 && e.which != 57 &&
		e.which != 32)) {	 
        //display error message
        jQuery(".mobile").remove();
		jQuery("#shipping_mobile_field").prepend("<p class='i-error mobile'>Please enter a mobile number or landline with area code.</p>");
		jQuery("#shipping_mobile").css("border-color","#a00"); 
		setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		return false;
	 }
	 else
	 {
	 		jQuery("#shipping_mobile").css("border-color","#69bf29"); 
			jQuery(".mobile").remove();
	}
	 });
	jQuery('#shipping_mobile').blur(function (e) {
		var regex = /^[0-9 ]*$/;
        var str = jQuery('#shipping_mobile').val();
		//if (regex.test(str) && str.length>=9){
		if (regex.test(str) && str.length>=10 && str.length<=12) {	
            jQuery("#shipping_mobile").css("border-color","#69bf29"); 
			jQuery(".mobile").remove();
		}
        else
        {
		jQuery(".mobile").remove();
		jQuery("#shipping_mobile_field").prepend("<p class='i-error mobile'>Please enter a mobile number or landline with area code.</p>");
		jQuery("#shipping_mobile").css("border-color","#a00"); 
		setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		}
    });
	
	jQuery('#shipping_address_1').blur(function (e) {
		var regex = /^(?=.*\d).{6,20}$/;
        var str1 = jQuery('#shipping_address_1').val();
		var str =str1.toLowerCase();
		if((str.indexOf("po box")>=0) || (str.indexOf("pobox")>=0) ||
		   (str.indexOf("afpo")>=0)  || (str.indexOf("pmb")>=0)    || 
		   (str.indexOf("po")>=0) || (str.indexOf("bag")>=0) ||
		   (str.indexOf("locked bag")>=0) || (str.indexOf("lockedbag")>=0) || 
		   (str.indexOf("locked")>=0))
		{
			jQuery("#shipping_address_1").focus();
			jQuery(".address").remove();	 
			jQuery("#shipping_address_1_field").prepend("<p class='i-error address'>Delivery to a PO Box, AFPO, PMB or Locked Bag is not permitted for security reasons.</p>");
			jQuery("#shipping_address_1").css("border-color","#a00");
			setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		}
		else{
		var hasNumber = /\d/;
		hasNumber.test("ABC"); // false
			if (hasNumber.test(str)) {
            	jQuery("#shipping_address_1").css("border-color","#69bf29");
				jQuery(".address").remove();	 
			}
			else
			{
				jQuery(".address").remove();	 
				jQuery("#shipping_address_1_field").prepend("<p class='i-error address'>Enter valid address.</p>");
				jQuery("#shipping_address_1").css("border-color","#a00"); 
			setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
			}
			
		/*var regex1 = /^\d+( \w+)( .+)*$/;
		if (regex1.test(str)) {
            	jQuery("#shipping_address_1").css("border-color","#69bf29");
				jQuery(".address").remove();	 
		}
        else
        {
				jQuery(".address").remove();	 
				jQuery("#shipping_address_1_field").prepend("<p class='i-error address'>Enter proper address.</p>");
				jQuery("#shipping_address_1").css("border-color","#a00"); 
			setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		}*/
	   var fl_shipping_address = jQuery('#shipping_address_1');
	   var name_length_shipping_address = fl_shipping_address.val().length;
 	   if( name_length_shipping_address < 3 ) {
		jQuery(".address").remove();	 
				jQuery("#shipping_address_1_field").prepend("<p class='i-error address'>Please enter at least 3 characters.</p>");
				jQuery("#shipping_address_1").css("border-color","#a00"); 
			setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
  	    evt.preventDefault(); }
		
			
		}
    });	
	
	
	
		
		
	jQuery('#shipping_city').blur(function (e) {
		
	   var full_shipping_city = jQuery('#shipping_city');
	   var name_length_shipping_city = full_shipping_city.val().length;
 	   if( name_length_shipping_city < 2 ) {
		jQuery(".city").remove();	 
		jQuery("#shipping_city_field").prepend("<p class='i-error city'>Please enter at least 2 characters.</p>");
		jQuery("#shipping_city").css("border-color","#a00"); 
        setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
  	    evt.preventDefault();
	   }		
		
		
        var regex = /^[a-zA-Z\s]+$/;
        var str = jQuery('#shipping_city').val();
		if (regex.test(str)) {
            jQuery("#shipping_city").css("border-color","#69bf29"); 
			jQuery(".city").remove();
		}
        else
        {
		jQuery(".city").remove();	 
		jQuery("#shipping_city_field").prepend("<p class='i-error city'>Enter valid city.</p>");
		jQuery("#shipping_city").css("border-color","#a00"); 
        setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		}
    });
	//It allow only character to field
	$('#shipping_city').bind('keypress', function (event) {
		var regex = new RegExp("^[a-zA-Z]+$");
		var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
		if (!regex.test(key)) {
		   event.preventDefault();
			jQuery(".city").remove();	 
			jQuery("#shipping_city_field").prepend("<p class='i-error city'>Numbers or special characters are not permitted</p>");
			jQuery("#shipping_city").css("border-color","#a00"); 
			setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
			return false;
		}
	});
	
	
	jQuery('#shipping_postcode').blur(function (e) {
		
	   var full_shipping_postcode = jQuery('#shipping_postcode');
	   var name_length_shipping_postcode = full_shipping_postcode.val().length;
 	   if( name_length_shipping_postcode != 4 ) {
		jQuery(".code").remove();	 
		jQuery("#shipping_postcode_field").prepend("<p class='i-error code'>Enter valid 4 digit postal code.</p>");
		jQuery("#shipping_postcode").css("border-color","#a00"); 
		setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
  	    evt.preventDefault();
	   }		
		
        var regex = /^[0-9]*$/;
        var str = jQuery('#shipping_postcode').val();
		if (regex.test(str) && str.length>0) {
            jQuery("#shipping_postcode").css("border-color","#69bf29"); 
			jQuery(".code").remove();
		}
        else
        {
		jQuery(".code").remove();	 
		jQuery("#shipping_postcode_field").prepend("<p class='i-error code'>Enter valid postal code.</p>");
		jQuery("#shipping_postcode").css("border-color","#a00"); 
		setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		}
    });	
	//It allow only character to field
	$('#shipping_postcode').bind('keypress', function (event) {
		var shipping_postcodeval = $(this).val();
         if (shipping_postcodeval.length > 3){
			jQuery(".code").remove();	 
			jQuery("#shipping_postcode_field").prepend("<p class='i-error code'>Only 4 numbers are permitted.</p>");
			jQuery("#shipping_postcode").css("border-color","#a00"); 
			setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
	     }	
		
		var regex = new RegExp("^[0-9]+$");
		var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
		if (!regex.test(key)) {
		   event.preventDefault();
			jQuery(".code").remove();	 
			jQuery("#shipping_postcode_field").prepend("<p class='i-error code'>Only numbers are permitted.</p>");
			jQuery("#shipping_postcode").css("border-color","#a00"); 
			setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
			return false;
		}
	});
	
	
		
	//billing validation
	
	jQuery('#billing_first_name').blur(function (e) {
		
	   var full_billing_first_name = jQuery('#billing_first_name');
	   var name_length_billing_first_name = full_billing_first_name.val().length;
 	   if( name_length_billing_first_name < 2 ) {
	 	  jQuery(".name").remove();
		  jQuery("#billing_first_name_field").prepend("<p class='i-error name'>Please enter at least 2 characters.</p>");
		  jQuery("#billing_first_name").css("border-color","#a00"); 
		  setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		  evt.preventDefault();
	   }		
		
		
        var regex = /^[a-zA-Z\s]+$/;
        var str = jQuery('#billing_first_name').val();
		if (regex.test(str)) {
            jQuery("#billing_first_name").css("border-color","#69bf29"); 
			jQuery(".name").remove();
		}
        else
        {
		jQuery(".name").remove();
		jQuery("#billing_first_name_field").prepend("<p class='i-error name'>Please enter valid first name.</p>");
		jQuery("#billing_first_name").css("border-color","#a00"); 
		setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		}
    });
	//It allow only character to field
	$('#billing_first_name').bind('keypress', function (event) {
		var regex = new RegExp("^[a-zA-Z]+$");
		var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
		if (!regex.test(key)) {
		   event.preventDefault();
			jQuery(".name").remove();
			jQuery("#billing_first_name_field").prepend("<p class='i-error name'>Numbers or special characters are not permitted</p>");
			jQuery("#billing_first_name").css("border-color","#a00"); 
			setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		   
		   return false;
		}
	});
	
	
	
	
	jQuery('#billing_last_name').blur(function (e) {
		
	   var full_billing_last_name = jQuery('#billing_last_name');
	   var name_length_billing_last_name = full_billing_last_name.val().length;
 	   if( name_length_billing_last_name < 2 ) {
	 	  jQuery(".name").remove();
		  jQuery("#billing_last_name_field").prepend("<p class='i-error name'>Please enter at least 2 characters.</p>");
		  jQuery("#billing_last_name").css("border-color","#a00"); 
		  setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		  evt.preventDefault();
	   }		
		
        var regex = /^[a-zA-Z\s]+$/;
        var str = jQuery('#billing_last_name').val();
		if (regex.test(str)) {
            jQuery("#billing_last_name").css("border-color","#69bf29"); 
			jQuery(".last").remove(); 
		}
        else
        {
		jQuery(".last").remove();
		jQuery("#billing_last_name").css("border-color","#a00"); 
        jQuery("#billing_last_name_field").prepend("<p class='i-error last'>Please enter valid last name.</p>");
		setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		}
    });
	//It allow only character to field
	$('#billing_last_name').bind('keypress', function (event) {
		var regex = new RegExp("^[a-zA-Z]+$");
		var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
		if (!regex.test(key)) {
		   event.preventDefault();
			jQuery(".name").remove();
			jQuery("#billing_last_name_field").prepend("<p class='i-error name'>Numbers or special characters are not permitted</p>");
			jQuery("#billing_last_name").css("border-color","#a00"); 
			setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		   
		   return false;
		}
	});
	
	
	jQuery("#billing_phone").keypress(function (e) {
     //if the letter is not digit then display error and don't type anything
	 if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        jQuery(".bphone").remove();
		jQuery("#billing_phone_field").prepend("<p class='i-error bphone'>Please enter a valid phone number.</p>");
		jQuery("#billing_phone").css("border-color","#a00"); 
		setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		return false;
	 }
	 else
	 {
	 		jQuery("#billing_phone").css("border-color","#69bf29"); 
			jQuery(".bphone").remove();
	}
	 });
	
	
	 jQuery("#billing_mobile").keypress(function (e) { //alert(e.which);
     //if the letter is not digit then display error and don't type anything
	 //if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
	if (e.which != 8 && e.which != 0 && 
	   (e.which != 48 && e.which != 49 && e.which != 50 && e.which != 51 && e.which != 52 &&
	    e.which != 53 && e.which != 54 && e.which != 55 && e.which != 56 && e.which != 57 &&
		e.which != 32)) {	 
        //display error message
        jQuery(".mobile").remove();
		jQuery("#billing_mobile_field").prepend("<p class='i-error mobile'>Please enter a valid phone number.</p>");
		jQuery("#billing_mobile").css("border-color","#a00"); 
		setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		return false;
	 }
	 else
	 {
	 		jQuery("#billing_mobile").css("border-color","#69bf29"); 
			jQuery(".mobile").remove();
	 }
	 });
	 
	 
	jQuery('#billing_mobile').blur(function (e) {
		var regex = /^[0-9 ]*$/;
        var str = jQuery('#billing_mobile').val();
		if (regex.test(str) && str.length>=10 && str.length<=12) {
            jQuery("#billing_mobile").css("border-color","#69bf29"); 
			jQuery(".mobile").remove();
		}
        else
        {
		jQuery(".mobile").remove();
		jQuery("#billing_mobile_field").prepend("<p class='i-error mobile'>Please Enter a valid phone number.</p>");
		jQuery("#billing_mobile").css("border-color","#a00"); 
		setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		}
    });
	
	jQuery('#billing_address_1').blur(function (e) {
		var str1 = jQuery('#billing_address_1').val();
		//if(str1=''){}
		
		
		/*var regex = /^(?=.*\d).{6,20}$/;
        var str1 = jQuery('#billing_address_1').val();
		var str =str1.toLowerCase();
		if(str.indexOf("po box")>=0 || str.indexOf("pobox")>=0)
		{
		}
		else{
		var hasNumber = /\d/;
		hasNumber.test("ABC"); // false
			if (hasNumber.test(str)) {
            	jQuery("#billing_address_1").css("border-color","#69bf29");
				jQuery(".address").remove();	 
			}
			else
			{
				jQuery(".address").remove();	 
				jQuery("#billing_address_1_field").prepend("<p class='i-error address'>Enter valid address.</p>");
				jQuery("#billing_address_1").css("border-color","#a00"); 
			setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
			}
		}*/
		
		/*var regex1 = /^\d+( \w+)( .+)*$/;
		if (regex1.test(str)) {
            	jQuery("#billing_address_1").css("border-color","#69bf29");
				jQuery(".address").remove();	 
		}
        else
        {
				jQuery(".address").remove();	 
				jQuery("#billing_address_1_field").prepend("<p class='i-error address'>Enter proper address.</p>");
				jQuery("#billing_address_1").css("border-color","#a00"); 
			setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		}*/		

	   var fl_billing_address = jQuery('#billing_address_1');
	   var name_length_billing_address = fl_billing_address.val().length;
 	   if( name_length_billing_address < 3 ) {
		jQuery(".address").remove();	 
				jQuery("#billing_address_1_field").prepend("<p class='i-error address'>Please enter at least 3 characters.</p>");
				jQuery("#billing_address_1").css("border-color","#a00"); 
			setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
  	    evt.preventDefault(); }else{
		  jQuery("#billing_address_1").css("border-color","#69bf29");
				jQuery(".address").remove();
		}

		
    });		
		
	jQuery('#billing_city').blur(function (e) {

	   var full_billing_city = jQuery('#billing_city');
	   var name_length_billing_city = full_billing_city.val().length;
 	   if( name_length_billing_city < 2 ) {
		jQuery(".city").remove();	 
		jQuery("#billing_city_field").prepend("<p class='i-error city'>Please enter at least 2 characters.</p>");
		jQuery("#billing_city").css("border-color","#a00"); 
        setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
  	    evt.preventDefault();
	   }		
		
		
        var regex = /^[a-zA-Z\s]+$/;
        var str = jQuery('#billing_city').val();
		if (regex.test(str)) {
            jQuery("#billing_city").css("border-color","#69bf29"); 
			jQuery(".city").remove();
		}
        else
        {
		jQuery(".city").remove();	 
		jQuery("#billing_city_field").prepend("<p class='i-error city'>Enter valid city.</p>");
		jQuery("#billing_city").css("border-color","#a00"); 
        setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		}
    });
	
	//It allow only character to field
	$('#billing_city').bind('keypress', function (event) {
		var regex = new RegExp("^[a-zA-Z]+$");
		var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
		if (!regex.test(key)) {
		   event.preventDefault();
			jQuery(".city").remove();	 
			jQuery("#billing_city_field").prepend("<p class='i-error city'>Numbers or special characters are not permitted</p>");
			jQuery("#billing_city").css("border-color","#a00"); 
			setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
			return false;
		}
	});
	
	
	
	
	jQuery('#billing_postcode').blur(function (e) {

	   var full_billing_postcode = jQuery('#billing_postcode');
	   var name_length_billing_postcode = full_billing_postcode.val().length;
 	   if( name_length_billing_postcode != 4 ) {
		jQuery(".code").remove();	 
		jQuery("#billing_postcode_field").prepend("<p class='i-error code'>Enter valid 4 digit postal code.</p>");
		jQuery("#billing_postcode").css("border-color","#a00"); 
		setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
  	    evt.preventDefault();
	   }		
		
        var regex = /^[0-9]*$/;
        var str = jQuery('#billing_postcode').val();
		if (regex.test(str) && str.length>0) {
            jQuery("#billing_postcode").css("border-color","#69bf29"); 
			jQuery(".code").remove();
		}
        else
        {
jQuery(".code").remove();	 
		jQuery("#billing_postcode_field").prepend("<p class='i-error code'>Enter valid postal code.</p>");
		jQuery("#billing_postcode").css("border-color","#a00"); 
		setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		}
    });	
	
	//It allow only character to field
	$('#billing_postcode').bind('keypress', function (event) {
		var billing_postcodeval = $(this).val();
         if (billing_postcodeval.length > 3){
			jQuery(".code").remove();	 
			jQuery("#billing_postcode_field").prepend("<p class='i-error code'>Only 4 numbers are permitted.</p>");
			jQuery("#billing_postcode").css("border-color","#a00"); 
			setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
	     }	
		
		var regex = new RegExp("^[0-9]+$");
		var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
		if (!regex.test(key)) {
		   event.preventDefault();
			jQuery(".code").remove();	 
			jQuery("#billing_postcode_field").prepend("<p class='i-error code'>Only numbers are permitted.</p>");
			jQuery("#billing_postcode").css("border-color","#a00"); 
			setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
			return false;
		}
	});
	
	
	
	
	
	jQuery('#billing_email').blur(function (e) {
        var regex = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        var str = jQuery('#billing_email').val();
		if (regex.test(str)) {
            jQuery("#billing_email").css("border-color","#69bf29"); 
			jQuery(".email").remove();
		}
        else
        {
		jQuery(".email").remove();
		jQuery("#billing_email_field").prepend("<p class='i-error email'>Enter valid Email.</p>");
		jQuery("#billing_email").css("border-color","#a00"); 
		setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		}
    });
	
	jQuery("#billing_company").css("border-color","#69bf29 !important");
	jQuery("#checkout-section4 h3").css("display","none");
	
});
  </script>
 	
	
	