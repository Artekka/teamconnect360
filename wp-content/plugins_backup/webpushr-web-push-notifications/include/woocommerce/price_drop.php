<ul class="webpushr_13fw3_woo-price-drop-setting">
	<li>
		<label for="webpushr_woo_price_drop_title">Notification Title</label>
		<input name="webpushr_woo_price_drop_title" required class="webpushr_13fw3_textfield emojifield" required id="webpushr_woo_price_drop_title" type="text" value="<?php echo esc_attr(get_option('webpushr_woo_price_drop_title'));?>" placeholder="" size="100" aria-required="true" >
		<div class="webpushr_13fw3_info webpushr_13fw3_placeholders">Placeholders<span class="dashicons dashicons-editor-help"></span><p>{product_name}<br />{short_description}<br />{product_category}<br />{old_price}<br />{new_price}</p></div>
		<input type="hidden" name="webpushr_price_drop" value="1">
	</li>

	<li>
		<label for="webpushr_woo_price_drop_message">Notification Message</label>
		<input type="text" name="webpushr_woo_price_drop_message" required class="lp_textarea required-field webpushr_13fw3_textfield emojifield" value="<?php echo esc_attr(get_option('webpushr_woo_price_drop_message'));?>">
		<div class="webpushr_13fw3_info webpushr_13fw3_placeholders">Placeholders<span class="dashicons dashicons-editor-help"></span><p>{product_name}<br />{short_description}<br />{product_category}<br />{old_price}<br />{new_price}</p></div>
	</li>

	<li>
		<label for="webpushr_woo_price_drop_icon">Notification Icon</label>
		<div class="options-wrapper has-custom-option vertical  p-0">
			<div class="custom-field wpp_woo_price_drop_icon">
				<input name="webpushr_woo_price_drop_icon" id="webpushr_woo_price_drop_icon" class="upload-field webpushr_13fw3_textfield" placeholder="" type="text" value="<?php echo esc_attr(get_option('webpushr_woo_price_drop_icon'));?>" size="100"><button style="float:right;" class="webpushr_13fw3_btn btn-primary upload-icon" data-gallary-title="Choose Icon" data-button-label="Insert Icon" data-field="webpushr_woo_price_drop_icon" type="button" id="">Choose Icon</button>
			</div>
		</div>
		<div class="webpushr_13fw3_info webpushr_13fw3_placeholders upload-field">Placeholders<span class="dashicons dashicons-editor-help"></span><p>{product_image}</p></div>

	</li>

	<li>
		<label for="webpushr_woo_price_drop_image">Notification Image </label>
		<div class="options-wrapper has-custom-option vertical  p-0">
			<div class="custom-field wpp_woo_price_drop_image">
				<input name="webpushr_woo_price_drop_image" id="webpushr_woo_price_drop_image" class="upload-field webpushr_13fw3_textfield" placeholder="" type="text" value="<?php echo esc_attr(get_option('webpushr_woo_price_drop_image'));?>" size="100"><button style="float:right;" class="webpushr_13fw3_btn btn-primary upload-icon" data-gallary-title="Choose Image" data-button-label="Insert Image" data-field="webpushr_woo_price_drop_image" type="button" id="">Choose Image</button>
			</div>
		</div>
		<div class="webpushr_13fw3_info webpushr_13fw3_placeholders upload-field">Placeholders<span class="dashicons dashicons-editor-help"></span><p>{product_image}</p></div>

	</li>

	<li>
		<label for="webpushr_woo_price_drop_url">Target URL</label>
		<input name="webpushr_woo_price_drop_url" id="webpushr_woo_price_drop_url" class="webpushr_13fw3_textfield" type="text" value="<?php echo esc_attr(get_option('webpushr_woo_price_drop_url'))?: "{product_url}";?>" size="100" aria-required="true" >
		<div class="webpushr_13fw3_info webpushr_13fw3_placeholders">Placeholders<span class="dashicons dashicons-editor-help"></span><p>{product_url}</p></div>
	</li>

</ul>
