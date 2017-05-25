<?php
	
	session_start();
	
	include_once($_SERVER['DOCUMENT_ROOT'].'/wp-load.php' );
	
	require_once( $_SERVER['DOCUMENT_ROOT'] . '/wp-config.php' );
	require_once( $_SERVER['DOCUMENT_ROOT'] . '/wp-includes/wp-db.php' );

	$data = '';
	$data .='<div id="contact-retailer" class="contact-box" style="display:none">  
<header>
	<span class="contact-title">Contact a retailer</span><a href="#" class="js-modal-close close">CLOSE X</a>
</header>
<div class="contact-body">
	<div class="top-head">
		<h1> How can we help you?</h1>
		<div class="fleft">
		<select id="product-option" name="product-option" class="cd-select">
			<option value="-1" selected>Select an option</option>
			<option value="0">Request a quote</option>
			<option value="1">Product Information</option>
		</select>
		</div>
		<div class="drop-box">
			<div class="all-prolist">
				<div class="row">
					<h3>Boosters</h3>
					<div class="col-4">
						<h5>Root Booster</h5>
						<span><input type="checkbox" value="Root Booster 300mL" name="quoteinfo[]" id="quote">300mL</span>
						<span><input type="checkbox" value="Root Booster 1L" name="quoteinfo[]" id="quote">1L</span>
						<span><input type="checkbox" value="Root Booster 2L" name="quoteinfo[]" id="quote">2L</span>
						<span><input type="checkbox" value="Root Booster 5L" name="quoteinfo[]" id="quote">5L</span>
						<span><input type="checkbox" value="Root Booster 10L" name="quoteinfo[]" id="quote">10L</span>
					</div>
					<div class="cl"></div>
					<div class="col-4">
						<h5>Grow Booster</h5>
						<span><input type="checkbox"  value="Grow Booster 300mL" name="quoteinfo[]" id="quote">300mL</span>
						<span><input type="checkbox"  value="Grow Booster 1L" name="quoteinfo[]" id="quote">1L</span>
						<span><input type="checkbox"  value="Grow Booster 2L" name="quoteinfo[]" id="quote">2L</span>
						<span><input type="checkbox"  value="Grow Booster 5L" name="quoteinfo[]" id="quote">5L</span>
						<span><input type="checkbox"  value="Grow Booster 10L" name="quoteinfo[]" id="quote">10L</span>
					</div>
					<div class="cl"></div>
					<div class="col-4">
						<h5>Bud Booster</h5>
						<span><input type="checkbox"  value="Bud Booster 300mL" name="quoteinfo[]" id="quote">300mL</span>
						<span><input type="checkbox"  value="Bud Booster 1L" name="quoteinfo[]" id="quote">1L</span>
						<span><input type="checkbox"  value="Bud Booster 2L" name="quoteinfo[]" id="quote">2L</span>
						<span><input type="checkbox"  value="Bud Booster 5L" name="quoteinfo[]" id="quote">5L</span>
						<span><input type="checkbox"  value="Bud Booster10L" name="quoteinfo[]" id="quote">10L</span>
					</div>
					<div class="cl"></div>
					<div class="col-4">
						<h5>Bloom Minerals</h5>
						<span><input type="checkbox"  value="Bloom Minerals 300mL" name="quoteinfo[]" id="quote">300mL</span>
						<span><input type="checkbox"  value="Bloom Minerals 1L" name="quoteinfo[]" id="quote">1L</span>
						<span><input type="checkbox"  value="Bloom Minerals 2L" name="quoteinfo[]" id="quote">2L</span>
						<span><input type="checkbox"  value="Bloom Minerals 5L" name="quoteinfo[]" id="quote">5L</span>
						<span><input type="checkbox"  value="Bloom Minerals 10L" name="quoteinfo[]" id="quote">10L</span>
					</div>
				</div>
				
				<div class="row">
					<h3>Nutrients</h3>
					<div class="col-4">
						<h5>Grow Food AB</h5>
						<span><input type="checkbox"  value="Grow Food AB 1L" name="quoteinfo[]" id="quote">1L</span>
						<span><input type="checkbox"  value="Grow Food AB 2L" name="quoteinfo[]" id="quote">2L</span>
						<span><input type="checkbox"  value="Grow Food AB 5L" name="quoteinfo[]" id="quote">5L</span>
						<span><input type="checkbox"  value="Grow Food AB 10L" name="quoteinfo[]" id="quote">10L</span>
						<span><input type="checkbox"  value="Grow Food AB 20L" name="quoteinfo[]" id="quote">20L</span>
					</div>
					<div class="cl"></div>
					<div class="col-4">
						<h5>Bloom Food AB</h5>
						<span><input type="checkbox"  value="Bloom Food AB 1L" name="quoteinfo[]" id="quote">1L</span>
						<span><input type="checkbox"  value="Bloom Food AB 2L" name="quoteinfo[]" id="quote">2L</span>
						<span><input type="checkbox"  value="Bloom Food AB 5L" name="quoteinfo[]" id="quote">5L</span>
						<span><input type="checkbox"  value="Bloom Food AB 10L" name="quoteinfo[]" id="quote">10L</span>
						<span><input type="checkbox"  value="Bloom Food AB 20L" name="quoteinfo[]" id="quote">20L</span>
					</div>
				</div>
				
				<div class="row">
					<h3>Substrates</h3>
					<div class="col-4">
						<h5>Expanded Clay</h5>
						<span><input type="checkbox"  value="Expanded Clay 40L" name="quoteinfo[]" id="quote">40L</span>
					</div>
					<div class="cl"></div>
					<div class="col-4">
						<h5>Peat Mix</h5>
						<span><input type="checkbox"  value="Peat Mix 50L" name="quoteinfo[]" id="quote">50L</span>
					</div>
					<div class="cl"></div>
					<div class="col-4">
						<h5>Coco Coir Pith</h5>
						<span><input type="checkbox"  value="Coco Coir Pith 40L" name="quoteinfo[]" id="quote">40L</span>
					</div>
				</div>
				
				<div class="row">
					<input type="submit" name="alldone" id="alldone" value="Done" />
				</div>
			</div>
			
			<div class="main-prolist">
				<div class="pro-list padd">
					<span><input type="checkbox"  value="root" name="proinfo[]" id="proinfo">Root Booster</span>
					<span><input type="checkbox"  value="grow" name="proinfo[]" id="proinfo">Grow Booster</span>
					<span><input type="checkbox"  value="bud" name="proinfo[]" id="proinfo">Bud Booster</span>
					<span><input type="checkbox"  value="minerals" name="proinfo[]" id="proinfo">Bloom Minerals</span>
					<span><input type="checkbox"  value="growab" name="proinfo[]" id="proinfo">Grow Food AB</span>
					<span><input type="checkbox"  value="bloomab" name="proinfo[]" id="proinfo">Bloom Food AB</span>
					<span><input type="checkbox"  value="expanded" name="proinfo[]" id="proinfo">Expanded Clay</span>
					<span><input type="checkbox"  value="peat" name="proinfo[]" id="proinfo">Peat Mix</span>
					<span><input type="checkbox"  value="coco" name="proinfo[]" id="proinfo">Coco Coir Pith</span>
					<div class="row"><input type="submit" name="prodone" id="prodone" value="Done" /></div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="main-form-body">
	<h1 class="mobile-show">'.$dealer[0]->post_title.'</h1>
		<div class="body-left">
			<h3>Select a retailer</h3>
			<div class="find-zip">
				<input type="tel" class="txt-box" name="e-zip" id="e-zip" value="'.$zip.'" placeholder="Enter Zip" />
				<span class="refersh-list"><i class="fa fa-refresh"></i></span>
			</div>
			<div class="raq-section">
				<div class="raq-secton-content">';
				/*$i = 0;*/
				foreach($dealers as $retailer) {
					/*if($i == 0) $chk = 'checked';
					else $chk = '';*/
					if($retailer->ID == $storeid) {
						$data .= '<label class="retailerlisting retailer-radio">
							<input type="radio" checked value="'.$retailer->email.'" name="retailerEmail[]" id="retailerEmail" >
							<span>'.$retailer->post_title.'</span>
						</label>';
					}
					/*$i++;*/
				}
				
				foreach($dealers as $retailer) {
					if($retailer->ID != $storeid) {
						$data .= '<label class="retailerlisting retailer-radio hidden">
							<input type="radio" value="'.$retailer->email.'" name="retailerEmail[]" id="retailerEmail" >
							<span>'.$retailer->post_title.'</span>
						</label>';
					}
				}
				
			$data .='<a class="viwe-more-btn" href="javascript:void(0);">View More Retailers</a>';
	$data .='</div>
			</div>
		</div>
		
		<!--<h5 class="retailer-open-slide-e">Your Information</h5>-->
		
		<div class="body-right">
			<p>Your Information</p><small class="req-right"><span>*</span>Required</small>
			<div class="info-form">
				<div class="in"><input type="text" class="txt-box required" name="name" id="name" value="" placeholder="First Name*" /></div>
				<div class="in"><input type="text" class="txt-box" name="lname" id="lname" value="" placeholder="Last Name" /></div>
				<div class="in"><input type="email" class="txt-box required" name="email" id="email" value="" placeholder="Email*" /></div>
				<div class="in"><input type="tel" class="txt-box" name="phone" id="phone" value="" placeholder="Phone" /></div>
				<div class="in"><input type="text" class="txt-box" name="address" id="address" value="" placeholder="Address" /></div>
				<div class="in"><input type="text" class="txt-box" name="city" id="city" value="" placeholder="City" /></div>
				<div class="in"><textarea placeholder="Comments" maxlength="500" name="comments" id="comments" class="textarea-box"></textarea></div>
				<div class="in-btn"><input type="submit" name="pro-sub" id="pro-sub" class="pro-btn" value="Submit" /></div>
			</div>
		</div>
	</div>

</div>
</div>';

echo $data;
	
?>