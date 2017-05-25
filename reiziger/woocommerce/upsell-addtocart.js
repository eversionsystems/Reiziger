var total_proids = [];

jQuery(document).ready(function($){
$('.upsells').on('click','.addtocart_none',function(){
var catid = $(this).val();
if(this.checked) {
 $("input:checkbox[data-catid="+catid+"]:checked").each(function () {

       var id = $(this).data('product_id');
		var pro_price = $(this).val();
		/*var price = jQuery('.upsell-bottom').find('.total-amount').html();*/
		var price = jQuery('.total-amount').html();	
		
		var index = total_proids.indexOf(id);
			if(index != -1) {
				total_proids.splice(index, 1);
				total_price = (parseFloat(price)-parseFloat(pro_price));
				total_price = parseFloat(total_price).toFixed(2)
				if(total_price <= 0) { total_price = 0.0; }
				jQuery('.upsell-bottom').find('.total-amount').empty();
				jQuery('.upsell-bottom').find('.total-amount').html(total_price);
				 this.checked=false;
			}
		
        });
}
													
});
	$('.upsells').on('click','.addtocart_prod',function(){
		var id = $(this).data('product_id');
		var pro_price = $(this).val();
		/*var price = jQuery('.upsell-bottom').find('.total-amount').html();*/
		var price = jQuery('.total-amount').html();
		price= price.replace("$","");
		price= price.replace(",","");	
		catid=$(this).data("catid");
		document.getElementById("addtonone"+catid).checked=false;
		if(this.checked) {
			
			total_proids.push(id);
			total_price = (parseFloat(price)+parseFloat(pro_price));
			total_price = parseFloat(total_price).toFixed(2)
			jQuery('.upsell-bottom').find('.total-amount').empty();
			jQuery('.upsell-bottom').find('.total-amount').html(total_price);
		} else { 
			var index = total_proids.indexOf(id);
			if(index != -1) {
				total_proids.splice(index, 1);
				total_price = (parseFloat(price)-parseFloat(pro_price));
				total_price = parseFloat(total_price).toFixed(2)
				if(total_price <= 0) { total_price = 0.0; }
				jQuery('.upsell-bottom').find('.total-amount').empty();
				jQuery('.upsell-bottom').find('.total-amount').html(total_price);
			}
		}
	});
	
	/* Adding all selected products to cart when countinue*/
	$('.upsell-bottom').on('click','.countinue',function(e){
		e.preventDefault();
		if ( typeof wc_add_to_cart_params === 'undefined' ) {
			return false;
		}
		
		if(total_proids.length==0){ // If no product selected from upsell redirect user to cart page directly        
			window.location = wc_add_to_cart_params.cart_url;
		} else {
			$("#response").css('display','block');
			$("#response").delay(8000).fadeOut('slow');
			var url = window.location.href;
			
			/* Redirect to cart page after products added to cart */
			setTimeout(function(){
				window.location = wc_add_to_cart_params.cart_url;
				return;
			},2000);
			
			/* Add product to cart one by one using ajax */
			var findme=0;
			for (var i=0; i<total_proids.length; i++) {
				if(total_proids[i]!== 'undefined') {
					if(url.indexOf("?")>0)
						urlnew = url+'&add-to-cart='+total_proids[i];
					else
						urlnew = url+'?add-to-cart='+total_proids[i];
					$.ajax({
						type: 'POST',				
						url: urlnew,
						async: false,
						success: function(resultData) {
							console.log("Product Added to Cart") ;
						}
					});
				}
			}
			/* Loop End */
		}
	});
	$('.upsells').on('click','.showmore',function(e){
		var lbl=$(this).html();
		if(lbl=="Show more &gt;" || lbl=="Show more >")
		{
			var cid=$(this).attr('id');
			//$(".cat"+cid).slideDown("slow");
			$(".cat"+cid).fadeIn().css('display','inline');;
			$(this).html("Show less >");
		}
		else if(lbl=="Show less &gt;" || lbl=="Show less >")
		{
			var cid=$(this).attr('id');			
			//$(".cat"+cid).slideUp("slow");
			$(".cat"+cid).fadeOut();
			$(this).html("Show more >");
			
		}
	});
	
});