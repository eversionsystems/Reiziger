<?php
/**
 * Login form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/global/form-login.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you (the theme developer).
 * will need to copy the new files to your theme to maintain compatibility. We try to do this.
 * as little as possible, but it does happen. When this occurs the version of the template file will.
 * be bumped and the readme will list any important changes.
 *
 * @see 	    http://docs.woothemes.com/document/template-structure/
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( is_user_logged_in() ) {
	return;
}

?>
<div class="login-area">
	<div class="login-left">
		<form method="post" class="login" <?php if ( $hidden ) echo 'style="display:none;"'; ?>>
		
			<?php do_action( 'woocommerce_login_form_start' ); ?>
		
			<?php if ( $message ) echo wpautop( wptexturize( $message ) ); ?>
		
			<p class="form-row form-row-first">
				<!--<label for="username"><?php _e( 'Reiziger Username', 'woocommerce' ); ?> <span class="required">*</span></label>-->
				<input type="text" class="input-text" name="username" id="username" placeholder="Reiziger Username*" />
			</p>
			<p class="form-row form-row-last">
				<!--<label for="password"><?php _e( 'Password', 'woocommerce' ); ?> <span class="required">*</span></label>-->
				<input class="input-text" type="password" name="password" id="password" placeholder="Password*" />
			</p>
			<div class="clear"></div>
		
			<?php do_action( 'woocommerce_login_form' ); ?>
		
			
			<p class="lost_password">
				<a href="<?php echo esc_url( wp_lostpassword_url() ); ?>"><?php _e( 'Forgot your Password?', 'woocommerce' ); ?></a>
			</p>
			
			<p class="form-row">
				<?php wp_nonce_field( 'woocommerce-login' ); ?>
				<input type="submit" class="button" name="login" value="<?php esc_attr_e( 'Sign In', 'woocommerce' ); ?>" />
				<input type="hidden" name="redirect" value="<?php echo esc_url( $redirect ) ?>" />
				<!--<label for="rememberme" class="inline">
					<input name="rememberme" type="checkbox" id="rememberme" value="forever" /> <?php _e( 'Remember me', 'woocommerce' ); ?>
				</label>-->
			</p>
			
			<div class="clear"></div>
		
			<?php do_action( 'woocommerce_login_form_end' ); ?>
		
		</form>
	</div>
	
	<div class="login-right">
		<h3>Guest Checkout</h3>
		<p>Proceed to checkout, and you can create a <br> Reiziger Username at the end.</p>
		<div class="guest-btn"><a href="<?php echo esc_url( wc_get_checkout_url() ) ;?>?guest=yes" class="checkout-guest">Checkout as Guest</a>
		
		</div>
		<div class="ask-help">Need help. Ask an expert. Call 1300 Reiziger</div>
	</div>
</div>
