<?php if( ! defined('ABSPATH') ) exit; ?>

<div class="webpushr_13fw3_container">   
    <div class="webpushr_13fw3_card webpushr_13fw3_mb-3">
        <div class="bg-holder d-lg-block bg-card" style="background-image:url(<?= plugins_url("images/illustrations/corner-4.png", __DIR__);?>);"></div>        
        <div class="card-body">
            <h3 class="webpushr_13fw3_m-0">Webpushr Configuration</h3>
        </div>
    </div>    
    <?php 
        $selectedSegments = @json_decode(get_option('wpp_post_sendTo'));
        $segments = wpp_api_request('https://api.webpushr.com/v1/segments');
    ?>

    <?php if( $segments['response_array']['subscription_status'] ){ ?>
        <div class="webpushr_13fw3_card webpushr_13fw3_mb-3 wpp-subscription-notice" style="display:block;">
            <div class="card-body">
                <h6 class="webpushr_13fw3_m-0"><img class="wpp_warning_icon" src="<?= plugins_url("images/wpp_warning.png", __DIR__);?>"> <?= $segments['response_array']['subscription_status']['description'];?><span></span></h6>
            </div>
        </div>    
    <?php } ?>

    <div class="webpushr_13fw3_card webpushr_13fw3_mb-3 webpushr_13fw3_review-section">
        <div class="card-body">
            <p style="margin-right:50px;">❤️ Like Webpushr? <a target="_blank" href="https://wordpress.org/support/plugin/webpushr-web-push-notifications/reviews/#new-post">Please leave us a review →</a></p>
            <p>Got a question? <a target="_blank" href="mailto:support@webpushr.com">Ask us now →</a></p>
        </div>
    </div>   

    <div class="webpushr_13fw3_card webpushr_13fw3_mb-3">
        <div class="card-header"><h4>New Post Settings</h4></div>   

        <?php 
            if( $segments['http_code'] == 200 )
            {
                ?>
                <form method="post" action="" id="webpushr_13fw3_save_post_settings" >
                    <?php wp_nonce_field( 'wpp_configuration_nounce_action', 'wpp_configuration_nonce_field' ); ?>
                    <div class="card-body webpushr_13fw3_bg-light">
                        <table class="form-table" role="presentation">
                            <tbody>
                                <tr>
                                    <th scope="row"><label for=""></label></th>
                                    <td><label><input type="checkbox" name="wpp_enable_for_post" id="wpp_enable_for_post" data-link=".post-setting"  <?php if( get_option('wpp_enable_for_post') == 'on' ) { ?> checked="checked" <?php } ?> /> <strong>Enable Web Push</strong></label></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="post-setting" <?php if( get_option('wpp_enable_for_post') == 'off' ||  ! get_option('wpp_enable_for_post') ) { ?> style="display:none;" <?php } ?>>
                            <table class="form-table" role="presentation">
                                <tbody>
                                    <tr>
                                        <th scope="row"><label for="wpp_post_title">Notification Title</label></th>
                                        <td>
                                            <input name="wpp_post_title" class="webpushr_13fw3_textfield" id="wpp_post_title" type="text" value="<?php echo esc_attr(get_option('wpp_post_title'));?>" size="100" aria-required="true" >
                                            <div class="webpushr_13fw3_info webpushr_13fw3_placeholders">Placeholders<span class="dashicons dashicons-editor-help"></span><p>{post_title}<br> {post_excerpt}<br> {post_category}</p></div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th scope="row"><label for="wpp_post_message">Notification Message</label></th>
                                        <td>
                                            <input name="wpp_post_message" class="webpushr_13fw3_textfield" value="<?php echo esc_attr(get_option('wpp_post_message'));?>">
                                            <div class="webpushr_13fw3_info webpushr_13fw3_placeholders">Placeholders<span class="dashicons dashicons-editor-help"></span><p>{post_title}<br> {post_excerpt}<br> {post_category}</p></div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th scope="row"><label for="wpp_post_title">Post Type</label></th>
                                        <td>
                                            <?php 
                                                $post_args = array(
                                                    'public'   => true,
                                                    '_builtin' => false,
                                                );
                                                $getCustomPostsList = get_post_types($post_args);

                                                //remove product post type if woocommerce is installed
                                                if( defined('WPP_WOOCOMMERCE') )
                                                    unset($getCustomPostsList['product']);
                                                
                                                //add POST and PAGE builtin post types
                                                $getCustomPostsList['post'] = 'post';
                                                $getCustomPostsList['page'] = 'page';

                                                $selectedPostTypes = @json_decode(get_option('wpp_post_type'));
                                                if( ! $selectedPostTypes )
                                                    $selectedPostTypes = array('post','page');
                                            ?>                                
                                            <select name="wpp_post_type[]" class="chosen-select webpushr_13fw3_textfield" multiple required>
                                                <?php foreach( $getCustomPostsList as $pt){?>
                                                    <option <?php if(  (!$selectedPostTypes && $pt == 'post') || (in_array($pt,$selectedPostTypes) ) ){ ?> selected <?php } ?>  value="<?= $pt;?>"><?= $pt;?></option>
                                                <?php } ?>
                                            </select>

                                        </td>
                                    </tr>

                                    <tr>
                                        <th scope="row"><label for="wpp_post_icon">Notification Icon</label></th>
                                        <td>
                                            <input class="webpushr_13fw3_textfield upload-field" name="wpp_post_icon" id="wpp_post_icon" placeholder="" type="text" value="<?php echo esc_attr(get_option('wpp_post_icon'));?>" size="100"  style="" >
                                            <button  class="webpushr_13fw3_btn btn-primary upload-icon" data-gallary-title="Choose Icon" data-button-label="Insert Icon" data-field="wpp_post_icon" type="button" id="">Choose Icon</button>
                                            <div class="webpushr_13fw3_info webpushr_13fw3_placeholders">Placeholders<span class="dashicons dashicons-editor-help"></span><p>{featured_image}</p></div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th scope="row"><label for="wpp_post_image">Notification Image</label></th>
                                        <td>
                                            <?php 
                                                $featured_image = esc_attr(get_option('wpp_post_image'));
                                                //for backward compatibility
                                                if( $featured_image == 1 )
                                                    $featured_image = '{featured_image}';
                                            ?>

                                            <input class="webpushr_13fw3_textfield upload-field" name="wpp_post_image" id="wpp_post_image" placeholder="" type="text" value="<?php echo $featured_image ;?>" size="100"  style="" >
                                            <button  class="webpushr_13fw3_btn btn-primary upload-icon" data-gallary-title="Choose Image" data-button-label="Insert Image" data-field="wpp_post_image" type="button" id="">Choose Image</button>
                                            <div class="webpushr_13fw3_info webpushr_13fw3_placeholders">Placeholders<span class="dashicons dashicons-editor-help"></span><p>{featured_image}</p></div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th scope="row"><label for="wpp_utm_parameter">UTM Paramters</label></th>
                                        <td>
                                            <input name="wpp_utm_parameter" class="webpushr_13fw3_textfield" value="<?php echo esc_attr(get_option('wpp_utm_parameter'));?>">
                                            <div class="webpushr_13fw3_info webpushr_13fw3_placeholders">Example<span class="dashicons dashicons-editor-help"></span><p>Example: utm_source=webpushr&utm_medium=push&utm_campaign={post_id}</p></div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th scope="row"><label for="wpp_post_sendTo">Select Segment</label></th>
                                        <td>
                                            <select name="wpp_post_sendTo[]" class="chosen-select webpushr_13fw3_textfield" multiple required placeholder="Choose Segment">
                                                <?php       
                                                    unset($segments['response_array']['subscription_status']);
                                                    unset($segments['response_array']['active_site_subscribers']);
                                                    foreach($segments['response_array'] as $seg){?>
                                                        <option <?php  if( $selectedSegments &&  in_array($seg['id'],$selectedSegments) ) { ?> selected <?php } ?>  value="<?= $seg['id'];?>"><?= $seg['title'];?></option>
                                                <?php } ?>
                                            </select>
                                            <p><a target="_blank" href="https://app.webpushr.com/segments">Create New Segment</a></p>

                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><label for="">Automatic Notifications</label></th>
                                        <td>
                                            <div class="options-wrapper has-custom-option vertical">
                                                <label><input type="checkbox" name="wpp_default_for_post" id="wpp_default_for_post"   <?php if( get_option('wpp_default_for_post') == 'on' ||  ! get_option('wpp_default_for_post')  ) { ?> checked="checked" <?php } ?> /> Automatically send push notification when a new post is published</label>
                                                <label><input type="checkbox" name="wpp_default_for_post_update" id="wpp_default_for_post_update"   <?php if( get_option('wpp_default_for_post_update') == 'on' ||  ! get_option('wpp_default_for_post_update')  ) { ?> checked="checked" <?php } ?> /> Automatically send push notification when an existing post is updated*</label>
                                                <p style="font-size:12px;">* These settings do not apply to 3rd party editors.</p>
                                            </div>
                                        </td>
                                    </tr>



                                    <tr>
                                        <th scope="row"><label for="wpp_auto_hide">Auto-Hide Notification</label></th>
                                        <td><label><input type="checkbox" name="wpp_auto_hide" id="wpp_auto_hide"   <?php if( get_option('wpp_auto_hide') == '1' ||   get_option('wpp_auto_hide') === false  ) { ?> checked="checked" <?php } ?> /> Automatically hides notification after a few seconds once it is displayed. This setting is applicable on Windows only.</label></td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><label for="wpp_disable_prompt_code">Manual Integration</label></th>
                                        <td>

                                            <label><input type="checkbox" name="wpp_disable_prompt_code" id="wpp_disable_prompt_code" onclick="togglePromptCode(this);"   <?php if(  get_option('wpp_disable_prompt_code') && ( get_option('wpp_disable_prompt_code') == 1 || get_option('wpp_disable_prompt_code')['disable_integration'] == 'true' )   ) { ?> checked="checked" <?php } ?> /> Disable automatic integration. Check this if you want to manually integrate Webpushr.</label>
                                            <div id="webpushr_13fw3_prompt-code">
                                                <p>Copy/Paste the following code snippet on pages where you want to enable Webpushr:</p>
                                                <textarea style="height:150px; resize:none; font-size:13px;"  class="webpushr_13fw3_textfield" id="install-code"><?php insert_webpushr_script(); ?></textarea>
                                                <a href="#" class="copyToClipboard f-14 text-primary"><i class="fa fa-file" aria-hidden="true"></i> Copy to clipboard</a>                                            </div>
                                        </td>
                                    </tr>

                                    <?php
                                        $plugin_url = plugins_url();
                                        $site_url   = get_option('siteurl');
                                        if( strpos($plugin_url, $site_url) === false){ ?>
                                            <tr id="webpushr-sw-path">
                                                <th scope="row"><label for="webpushr_root_sw">Service Worker</label></th>
                                                <td><label><input type="checkbox" name="webpushr_root_sw" id="webpushr_root_sw"   <?php if(  get_option('wpp_disable_prompt_code') &&  get_option('wpp_disable_prompt_code')['sw_path'] == 'root'   ) { ?> checked="checked" <?php } ?> /> Use alternative path for the service worker file. <strong>Caution:</strong> only check this if Webpushr plugin fails to function because it is not able to access the default service worker path.</label></td>
                                            </tr>
                                        <?php } 
                                    ?>





                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div >
                            <input type="submit" value="Save Settings" class="webpushr_13fw3_btn btn-primary" name="save_post_settings" />
                        </div>
                    </div>
                </form>
                <?php
            }elseif($segments['http_code'] == 404){
                ?>
                <div class="card-body webpushr_13fw3_bg-light">
                    <?php echo "<pre>";
                    print_r($segments);
                    echo "</pre>";
                    ?>
                    Invalid API end point
                </div>
                <?php
            }else{
                ?>
                <div class="card-body webpushr_13fw3_bg-light">
                    <?= $segments['response_json']; ?>
                </div>
                <?php
            } 

        ?>
    </div>

    <?php if( defined('WPP_WOOCOMMERCE') ){ ?>
        <div class="webpushr_13fw3_card webpushr_13fw3_mb-3" id="woocommerce_settings">
            <div class="card-header"><h4>WooCommerce Settings</h4></div>    
            <form method="post" name="woo_settings" action="">
                <?php wp_nonce_field( 'wpp_woo_nounce_action', 'wpp_woo_nonce_field' ); ?>
                <div class="card-body webpushr_13fw3_bg-light">

                    <div class="webpushr_13fw3_sidebar_menu">
                        <?php include('woocommerce/webpushr_woo_menu.php'); ?>
                    </div>
                
                    <div class="webpushr_13fw3_woo-settings" >
                        <?php 
                            if( ! isset($_GET['menu']) )
                                $page = 'abandoned_cart';
                            else
                                $page = sanitize_text_field($_GET['menu']);

                            switch ($page) {
                                case "abandoned_cart":
                                    include('woocommerce/abandoned_cart.php'); 
                                    break;
                                case "sale_price":
                                    include('woocommerce/sale_price.php'); 
                                    break;
                                case "price_drop":
                                    include('woocommerce/price_drop.php'); 
                                    break;
                                case "new_product":
                                    include('woocommerce/new_product.php'); 
                                    break;
                            }
                        ?>
                    </div>



                </div>   
                <div class="card-footer">
                    <div>
                        <input type="submit" value="Save Settings" class="webpushr_13fw3_btn btn-primary" name="save_woo_settings" />
                    </div>
                </div>
            </form>

        </div>
    <?php } ?>


    <div class="webpushr_13fw3_card webpushr_13fw3_mb-3">
        <div class="card-header"><h4>Welcome Notification</h4></div>    
        <div class="card-body webpushr_13fw3_bg-light">
            <p class="webpushr_13fw3_mt-5 webpushr_13fw3_mb-5" style="text-align:center">Please use <a target="_blank" href="https://app.webpushr.com/welcome-notification">Webpushr Web Console</a> to compose & activate a Welcome push message.</p>
        </div>   

    </div>

    <div class="webpushr_13fw3_card webpushr_13fw3_mb-3">
        <div class="card-header"><h4>Customize Optin Prompt</h4></div>    
        <div class="card-body webpushr_13fw3_bg-light">
            <p class="webpushr_13fw3_mt-5 webpushr_13fw3_mb-5" style="text-align:center">Please use <a target="_blank" href="https://app.webpushr.com/optin">Webpushr Web Console</a> to customize Optin prompt.</p>
        </div>   

    </div>


</div>

<?php wp_enqueue_media(); ?>
<script>
    function togglePromptCode(ele){
        if( jQuery(ele).is(":checked") ){
            jQuery("#webpushr_13fw3_prompt-code").slideDown();
            jQuery("#webpushr-sw-path").hide();

        }else{
            jQuery("#webpushr_13fw3_prompt-code").slideUp();
            jQuery("#webpushr-sw-path").show();
        }
    }
    togglePromptCode("#wpp_disable_prompt_code");

	jQuery(document).ready(function($) {
        
        $("[data-link]").click(function(){
			if($(this).is(":checked") == true){
				$( $(this).attr('data-link') + " *").removeAttr('disabled');
                $( $(this).attr('data-link')).slideDown();
            }
			else{
				$( $(this).attr('data-link') + " *").attr('disabled','disabled');
                $( $(this).attr('data-link')).slideUp();
            }
		});


		$("[name=save_post_settings]").click(function(){

            if(  $("[name='wpp_enable_for_post']").is(":checked") == false )    
                return;

			if(  $("[name='wpp_post_title']").val() == '' )
			{
				$("[name='wpp_post_title']").attr('style','border-color:red !important');
                document.getElementsByName('wpp_post_title')[0].scrollIntoView();
				return false;
			}

			if(  $("[name='wpp_post_message']").val() == '' )
			{
				$("[name='wpp_post_message']").attr('style','border-color:red !important');
                document.getElementsByName('wpp_post_title')[0].scrollIntoView();
				return false;
			}
			if( $("[name='wpp_post_type[]']").val() == '' )
			{
				$("[name='wpp_post_type[]'] + .chosen-container .chosen-choices").attr('style','border-color:red !important').focus;
                document.getElementsByName('wpp_post_title')[0].scrollIntoView();
				return false;
			}
			if( $("[name='wpp_post_sendTo[]']").val() == '' )
			{
				$("[name='wpp_post_sendTo[]'] + .chosen-container .chosen-choices").attr('style','border-color:red !important').focus;
                document.getElementsByName('wpp_utm_parameter')[0].scrollIntoView();
				return false;
			}

		});

		$(".has-custom-option [type=radio]").click(function(){
			if( $(this).val() == 'custom' )
				$(this).parents(".has-custom-option").children(".custom-field").attr('required','required').show();
			else
				$(this).parents(".has-custom-option").children(".custom-field").removeAttr('required').hide();
		});

        $(document).on('click',".copyToClipboard",function(event) {
            var copyText = document.getElementById("install-code");
            copyText.select();
            document.execCommand("Copy");	 	

            //say its been copied
            $(".copyToClipboard").html('<i class="fa fa-file" aria-hidden="true"></i> Copied!</a>');

            return false;
        });

	//media uploader
    var mediaUploader;

	$(".upload-icon").on('click',function(){
		$this = $(this);
		if(mediaUploader)
		{
			mediaUploader.open();
			return false;
		}
		
		
		mediaUploader = wp.media.frames.file_frame = wp.media({
			title :$this.attr('data-gallary-title'),
			button:	{
				text : $this.attr('data-button-label'),
			},
			multiple: false
		});
		
		mediaUploader.on('select',function(){
			attachment = mediaUploader.state().get('selection').first().toJSON();
			$("#" + $this.attr('data-field') ).val(attachment.url);
		});
		
		mediaUploader.open();
		return false;
	});
	
jQuery(".chosen-select").chosen()
		
});//document.ready



</script>

