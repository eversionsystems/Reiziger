<?php
/**
 * Product quantity inputs
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/global/quantity-input.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you (the theme developer).
 * will need to copy the new files to your theme to maintain compatibility. We try to do this.
 * as little as possible, but it does happen. When this occurs the version of the template file will.
 * be bumped and the readme will list any important changes.
 *
 * @see 	    http://docs.woothemes.com/document/template-structure/
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.5.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if($_REQUEST['reiziger_product']!='' ){?>
<div class="quantity testtttt">
 <?php if(is_cart()){ ?>
	<input type="number" step="<?php echo esc_attr( $step ); ?>" 
           min="<?php echo esc_attr( $min_value ); ?>" 
           max="<?php echo esc_attr( $max_value ); ?>" 
           name="<?php echo esc_attr( $input_name ); ?>" 
           value="<?php echo esc_attr( $input_value ); ?>" 
           title="<?php echo esc_attr_x( 'Qty', 'Product quantity input tooltip', 'woocommerce' ) ?>" 
           class="input-text qty text" size="4" />
		   <?php }else{ ?>
            <select name="<?php echo esc_attr( $input_name ); ?>" class="input-text qty text">
              <?php $cProdValue = esc_attr( $input_value );?>
              <?php for($i=1;$i<=12;$i++){?>
              <option value="<?php echo $i;?>" <?php if($i==$cProdValue){?>selected<?php } ?>><?php echo $i;?></option>
              <?php } ?>
            </select>		   
		 <?php  }?> 
           
           
           
</div>
<?php } ?>
