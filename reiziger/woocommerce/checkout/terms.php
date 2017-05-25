<?php
/**
 * Checkout terms and conditions checkbox
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.5.0
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( wc_get_page_id( 'terms' ) > 0 && apply_filters( 'woocommerce_checkout_show_terms', true ) ) : ?>
    <p class="form-row terms wc-terms-and-conditions">
		<input type="checkbox" class="input-checkbox" name="terms" <?php checked( apply_filters( 'woocommerce_terms_is_checked_default', isset( $_POST['terms'] ) ), true ); ?> id="terms" />
        <?php printf( __( 'I understand and agree that I am entering into an electronic transaction, and by clicking Continue, I also accept and agree to all terms of <a id="t_and_c_page">Reizigers Sales and Refund Policy.</a><br/>I agree to receive electronically all documents, including warranty, disclosure and/or insurance documents, as applicable, to my nominated email address.', 'woocommerce' ), esc_url( wc_get_page_permalink( 'terms' ) ) ); ?> <span class="required">*</span>
        <input type="hidden" name="terms-field" value="1" />
    </p>
<?php endif; ?>
