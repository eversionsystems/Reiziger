<?php
/*
If you want to customise the checkout form, copy this file into your theme folder and edit it there.
Take care to keep the field names the same, or your checkout form won't charge credit cards!

* $optMonths = options for drop-down list of months of the year
* $optYears = options for drop-down list of current year + 15
* $settings = settings for eWAY payment gateway

*/
?>

<fieldset>

	<?php if (!empty($settings['eway_card_msg'])): ?>
	<p class="eway-credit-card-message"><?php echo esc_html($settings['eway_card_msg']); ?></p>
	<?php endif; ?>

	<p class="form-row form-row-first i-card-name">
		<input type="text" value="" name="eway_card_name" id="eway_card_name" autocomplete="off" placeholder="Card Holder's Name" />
	</p>
	<p class="form-row form-row-last i-card-number">
		<input type="text" value="" pattern="[0-9 ]*" name="eway_card_number" id="eway_card_number" 
        title="only digits 0-9 are accepted" autocomplete="off" maxlength="19" 
        placeholder="Credit Card Number" class="ccFormatMonitor form-control" />
	</p>
	<div class="clear"></div>

	<p class="form-row form-row-first card_expiree_row">
		<label>Expiry</label>
		<select name="eway_expiry_month" class="woocommerce-select woocommerce-cc-month" id="eway_expiry_month">
			<option value="">Month</option>
			<?php echo $optMonths; ?>
		</select>
		<select name="eway_expiry_year" class="woocommerce-select woocommerce-cc-year" id="eway_expiry_year">
			<option value="">Year</option>
			<?php echo $optYears; ?>
		</select>
	</p>
    <div class="clear"></div>
	<p class="form-row form-row-last last_cvv_row">
		<input type="text" size="4" maxlength="4" value="" pattern="[0-9]*" name="eway_cvn" id="eway_cvn"
			title="only digits 0-9 are accepted" autocomplete="off" placeholder="CSV" />
	</p>

	<div class="clear"></div>

	<?php if (!empty($settings['eway_site_seal']) && !empty($settings['eway_site_seal_code']) && $settings['eway_site_seal'] == 'yes'):
		echo $settings['eway_site_seal_code'];
	endif; ?>

</fieldset>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script> 
<script src="<?php echo get_template_directory_uri();?>/js/ccFormat.js"></script> 


<script type="text/javascript">
jQuery(document).ready(function(){
	jQuery('#eway_card_name').blur(function (e) {
        var regex = /^[a-zA-Z\s]+$/;
        var str = jQuery('#eway_card_name').val();
		if (regex.test(str)) {
            jQuery("#eway_card_name").css("border-color","#69bf29"); 
			jQuery(".card-name").remove();
		}
        else
        {
       	jQuery(".card-name").remove();
		jQuery(".i-card-name").prepend("<p class='i-error card-name'>Enter valid card name.</p>");
		jQuery("#eway_card_name").css("border-color","#a00"); 
		//setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		}
    });
	
	//It allow only character to field
	$('#eway_card_name').bind('keypress', function (event) {
		var regex = new RegExp("^[a-zA-Z ]+$");
		var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
		if (!regex.test(key)) {
		   event.preventDefault();
       	jQuery(".card-name").remove();
		jQuery(".i-card-name").prepend("<p class='i-error card-name'>Numbers or special characters are not permitted.</p>");
		jQuery("#eway_card_name").css("border-color","#a00"); 
		//setTimeout(function(){ $('.i-error').fadeOut() }, 2000);


		   return false;
		}
	});
	
	
	
	
	jQuery("#eway_card_number").keypress(function (e) {
     var str = jQuery('#eway_card_number').val();
	 if ( e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57) && (e.which!=32)) {
     
        jQuery(".card-number").remove();
		jQuery(".i-card-number").prepend("<p class='i-error card-number'>Please enter valid card number.</p>");
		jQuery("#eway_card_number").css("border-color","#a00"); 
		setTimeout(function(){ $('.i-error').fadeOut() }, 2000);
		return false;
	 }
	 else
	 {
	 		jQuery("#eway_card_number").css("border-color","#69bf29"); 
			jQuery(".card-number").remove();
	}
	});
	
	jQuery("#eway_expiry_month").blur(function (e) {
     var str = jQuery('#eway_cvn').val();
	 if ( e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {     
       
		jQuery("#eway_expiry_month").css("border-color","#a00"); 
		return false;
	 }
	 else
	 {
 		jQuery("#eway_expiry_month").css("border-color","#69bf29"); 			
	}
	});
	
	jQuery("#eway_expiry_year").blur(function (e) {
     var str = jQuery('#eway_cvn').val();
	 if ( e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {     
       
		jQuery("#eway_expiry_year").css("border-color","#a00"); 
		return false;
	 }
	 else
	 {
 		jQuery("#eway_expiry_year").css("border-color","#69bf29"); 			
	}
	});
	
	
	
	jQuery("#eway_cvn").keypress(function (e) {
     var str = jQuery('#eway_cvn').val();
	 if ( e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {     
       
		jQuery("#eway_cvn").css("border-color","#a00"); 
		return false;
	 }
	 else
	 {
 		jQuery("#eway_cvn").css("border-color","#69bf29"); 			
	}
	});
});
</script>