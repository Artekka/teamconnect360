<table class="form-table" role="presentation">
      <tbody>
         <tr>
            <input type="hidden" name="webpushr_abandoned_cart_settings">
            <td style="padding-left:0"><label><input type="checkbox" name="webpushr_enable_abandoned_cart" id="webpushr_enable_abandoned_cart" data-link=".webpushr_13fw3_woo-abandoned-cart-setting"  <?php if( get_option('webpushr_enable_abandoned_cart') != 'off' ) { ?> checked="checked" <?php } ?> /> <strong>Enable abandoned cart notification</strong></label></td>
         </tr>
      </tbody>
</table>

<ul class="webpushr_13fw3_woo-abandoned-cart-setting" <?php if( get_option('webpushr_enable_abandoned_cart') == 'off'  ) { ?> style="display:none;" <?php } ?> >
   <li>
         <label for="webpushr_woo_abandoned_cart_title">Notification Title</label>
         <input name="webpushr_woo_abandoned_cart_title"  required class="webpushr_13fw3_textfield emojifield" id="webpushr_woo_abandoned_cart_title" type="text" value="<?php echo esc_attr(get_option('webpushr_woo_abandoned_cart_title'));?>" placeholder="" size="100" aria-required="true" >
         <div class="webpushr_13fw3_info webpushr_13fw3_placeholders">Placeholders<span class="dashicons dashicons-editor-help"></span><p>{product_name}<br> {product_count}<br> {cart_total}</p></div>
         <input type="hidden" name="webpushr_abandoned_cart" value="1">
   </li>

   <li>
         <label for="webpushr_woo_abandoned_cart_message">Notification Message</label>
         <input type="text" name="webpushr_woo_abandoned_cart_message" required class="lp_textarea required-field webpushr_13fw3_textfield emojifield" value="<?php echo esc_attr(get_option('webpushr_woo_abandoned_cart_message'));?>">
         <div class="webpushr_13fw3_info webpushr_13fw3_placeholders">Placeholders<span class="dashicons dashicons-editor-help"></span><p>{product_name}<br> {product_count}<br> {cart_total}</p></div>
   </li>

   <li>
         <label for="webpushr_woo_abandoned_cart_icon">Notification Icon</label>
         <div class="options-wrapper has-custom-option vertical  p-0">
            <div class="custom-field wpp_woo_abandoned_cart_icon">
               <input name="webpushr_woo_abandoned_cart_icon" id="webpushr_woo_abandoned_cart_icon" class="upload-field webpushr_13fw3_textfield" placeholder="" type="text" value="<?php echo esc_attr(get_option('webpushr_woo_abandoned_cart_icon'));?>" size="100"><button style="float:right;" class="webpushr_13fw3_btn btn-primary upload-icon" data-gallary-title="Choose Icon" data-button-label="Insert Icon"  data-label="Icon" data-field="webpushr_woo_abandoned_cart_icon" type="button" id="">Choose Icon</button>
            </div>
            <div class="webpushr_13fw3_info webpushr_13fw3_placeholders">Placeholders<span class="dashicons dashicons-editor-help"></span><p>{product_image}</p></div>
         </div>
   </li>

   <li>
         <label for="webpushr_woo_abandoned_cart_image">Notification Image </label>
         <div class="options-wrapper has-custom-option vertical  p-0">
            <div class="custom-field wpp_woo_abandoned_cart_image">
               <input name="webpushr_woo_abandoned_cart_image" id="webpushr_woo_abandoned_cart_image" class="upload-field webpushr_13fw3_textfield" placeholder="" type="text" value="<?php echo esc_attr(get_option('webpushr_woo_abandoned_cart_image'));?>" size="100"><button style="float:right;" class="webpushr_13fw3_btn btn-primary upload-icon" data-gallary-title="Choose Image" data-button-label="Insert Image" data-field="webpushr_woo_abandoned_cart_image" type="button" id="">Choose Image</button>
            </div>
            <div class="webpushr_13fw3_info webpushr_13fw3_placeholders">Placeholders<span class="dashicons dashicons-editor-help"></span><p>{product_image}</p></div>
         </div>
   </li>

   <li>
         <label for="webpushr_woo_abandoned_cart_url">Target URL</label>
         <input name="webpushr_woo_abandoned_cart_url" id="webpushr_woo_abandoned_cart_url" class="webpushr_13fw3_textfield" type="text" value="<?php echo esc_attr(get_option('webpushr_woo_abandoned_cart_url'))?>" size="100" aria-required="true" >
         <div class="webpushr_13fw3_info webpushr_13fw3_placeholders">Placeholders<span class="dashicons dashicons-editor-help"></span><p>{checkout_page}</p></div>
   </li>


   <li style="display:flex; margin-bottom:0; align-items: center; justify-content: left;">
      <div style="width:200px;">
         <label for="webpushr_woo_abandoned_cart_frequency">Send Push Notification* </label>
         <select name="webpushr_woo_abandoned_cart_frequency" class="webpushr_13fw3_textfield">
            <option <?php if(get_option('webpushr_woo_abandoned_cart_frequency') == 'once') { ?> selected <?php } ?> value="once">Only once, after</option>
            <option <?php if(get_option('webpushr_woo_abandoned_cart_frequency') == 'repeate') { ?> selected <?php } ?> value="repeate">Every</option>
         </select>
      </div>
      <div style="width:50px; margin:0 10px;">
         <label for="webpushr_woo_abandoned_cart_interval">&nbsp;</label>
         <input required name="webpushr_woo_abandoned_cart_interval" id="webpushr_woo_abandoned_cart_interval" class="webpushr_13fw3_textfield" type="text" value="<?php echo esc_attr(get_option('webpushr_woo_abandoned_cart_interval'))?>" size="100" aria-required="true" >
      </div>
      <div>
         <label for="">&nbsp;</label>
         hour(s)
      </div>
   </li>
   <p style="font-size:12px;">* A Push Notification will be sent to your customers if they add item(s) to their cart but forget to checkout. Push Notifications will stop if one of the following conditions is met: 1- Customer completes checkout 2- Customer removes all items from the cart 3- Items remain in the cart for more than 10 days.</p>


</ul>
