<?php if( ! defined('ABSPATH') ) exit;
//save API settings

function wpp_save_settings(){


	if( isset($_POST['frm_wpp_setup'])){

		if( ! wp_verify_nonce($_POST['wpp_setup_nonce_field'], 'wpp_setup_nounce_action') ){
			exit();
		}

		if (  ! current_user_can( 'manage_options' ) ) {	
			add_action( 'admin_notices', 'wpp_authorization_failed' );
			return;
		}

		if( $_POST['webpushr_rest_key'] ){
			//valide keys
			// $response = wpp_api_request('https://api.webpushr.com/v1/authentication/wordpress_new', array('public_key' => $_POST['webpushr_public_key'], 'site_url' => site_url()));
			$request['headers'] 		= array( 'Content-Type' => 'Application/Json', "webpushrKey" => $_POST['webpushr_rest_key'],  "webpushrRequest" => 1);
			$request['body'] 			=  wp_json_encode( array('site_url' => site_url()) );
			$result 	= wp_remote_post('https://api.webpushr.com/v1/authentication/wordpress_new',$request);
			if( ! is_wp_error( $result ) ) {
				$response 	= wp_remote_retrieve_body($result);
				$res_array 	= json_decode($response,true);
				$http_code 		= $result['response']['code'];
				if( $http_code == 200 ){

					update_option('webpushr_private_key', sanitize_text_field(stripslashes($_POST['webpushr_rest_key'])));
					update_option('webpushr_auth_token',$res_array['id']);
					update_option('webpushr_public_key',$res_array['public_key']);
					
					//save default settings for wordpress
					add_option('wpp_enable_for_post','on');
					add_option('wpp_default_for_post','on');
					add_option('wpp_default_for_post_update','on');
					add_option('wpp_post_message','{post_excerpt}');
					add_option('wpp_post_title','{post_title}');
					add_option('wpp_post_type','["post"]');
					add_option('wpp_auto_hide',1);
					add_option('wpp_post_image',"{featured_image}");
					add_option('wpp_post_icon',"{featured_image}");
					$segments = wpp_api_request('https://api.webpushr.com/v1/segments');
					add_option('wpp_post_sendTo', '["' . $segments['response_array'][0]['id'] .'"]' );
					add_option('wpp_disable_prompt_code',array('disable_integration' => 'false', 'sw_path' => 'sdk_files'));
					sleep(2);

					//new product
					add_option('webpushr_enable_woo_new_prod','on');
					add_option('webpushr_woo_new_prod_title','New Product Alert');
					add_option('webpushr_woo_new_prod_message','{product_name} is now available for sale');
					add_option('webpushr_woo_prod_icon','{product_image}');
					add_option('webpushr_woo_prod_image','{product_image}');
					add_option('webpushr_woo_prod_url','{product_url}');

					//price drop
					add_option('webpushr_woo_price_drop_title','Price Drop Alert for {product_name}');
					add_option('webpushr_woo_price_drop_message','{product_name} price dropped from {old_price} to {new_price}');
					add_option('webpushr_woo_price_drop_icon','{product_image}');
					add_option('webpushr_woo_price_drop_image','{product_image}');
					add_option('webpushr_woo_price_drop_url','{product_url}');

					//Sales Price
					add_option('webpushr_woo_sale_title','{product_name} is now on SALE');
					add_option('webpushr_woo_sale_message','Get {product_name} for just {sale_price}');
					add_option('webpushr_woo_sale_icon','{product_image}');
					add_option('webpushr_woo_sale_image','{product_image}');
					add_option('webpushr_woo_sale_url','{product_url}');

					//Cart Abandonment
					add_option('webpushr_enable_abandoned_cart','on');
					add_option('webpushr_woo_abandoned_cart_title',"You've left {product_count} item(s) in your cart");
					add_option('webpushr_woo_abandoned_cart_message','We saved your cart. Checkout Now.');
					add_option('webpushr_woo_abandoned_cart_icon','{product_image}');
					add_option('webpushr_woo_abandoned_cart_image','{product_image}');
					add_option('webpushr_woo_abandoned_cart_url','{checkout_page}');
					add_option('webpushr_woo_abandoned_cart_frequency','once');				
					add_option('webpushr_woo_abandoned_cart_interval','6');

					header('Location: admin.php?page=webpushr-configuration');
					exit();		
				}else{
					add_action( 'admin_notices', 'wpp_settings_failed' );
				}
			}
		}
	}

	//save settings for NEW POST
	if( isset($_POST['save_post_settings']) )
	{

		if( ! wp_verify_nonce($_POST['wpp_configuration_nonce_field'], 'wpp_configuration_nounce_action') ){
			exit();
		}

		if (  ! current_user_can( 'manage_options' ) ) {	
			add_action( 'admin_notices', 'wpp_authorization_failed' );
			return;
		}


		update_option('wpp_enable_for_post'	,isset($_POST['wpp_enable_for_post']) == 'on' ? 'on' : 'off');
		if(isset($_POST['wpp_enable_for_post']) && $_POST['wpp_enable_for_post'] == 'on' )
		{
			update_option('wpp_post_title'		, sanitize_text_field(stripslashes($_POST['wpp_post_title'])));
			update_option('wpp_post_message'		, sanitize_text_field(stripslashes($_POST['wpp_post_message'])));
			update_option('wpp_utm_parameter'		, sanitize_text_field(stripslashes($_POST['wpp_utm_parameter'])));
			update_option('wpp_post_icon'			, sanitize_text_field(stripslashes($_POST['wpp_post_icon'])));
			update_option('wpp_post_sendTo'		, sanitize_text_field(stripslashes(json_encode($_POST['wpp_post_sendTo']))));
			update_option('wpp_post_image'		, sanitize_text_field(stripslashes($_POST['wpp_post_image'])));
			update_option('wpp_post_type'			, sanitize_text_field(stripslashes(json_encode($_POST['wpp_post_type']))));
			update_option('wpp_auto_hide'			, isset($_POST['wpp_auto_hide']) == 'on' ? '1' : '0'); 
			update_option('wpp_default_for_post', isset($_POST['wpp_default_for_post']) == 'on' ? 'on' : 'off'); 
			update_option('wpp_default_for_post_update', isset($_POST['wpp_default_for_post_update']) == 'on' ? 'on' : 'off'); 

			if( isset($_POST['wpp_disable_prompt_code']) && $_POST['wpp_disable_prompt_code'] == 'on'){
				update_option('wpp_disable_prompt_code' , array('disable_integration' => 'true', 'sw_path' => ''));
			}else{
				update_option('wpp_disable_prompt_code' , array('disable_integration' => isset($_POST['wpp_disable_prompt_code']) == 'on' ? 'true' : 'false', 'sw_path' => isset($_POST['webpushr_root_sw']) == 'on' ? 'root' : 'sdk_files' ));
			}

			add_action( 'admin_notices', 'wpp_settings_saved' );

		}	
	}

	//save settings for woocommerce
	if( isset($_POST['save_woo_settings']) )
	{

		if( ! wp_verify_nonce($_POST['wpp_woo_nonce_field'], 'wpp_woo_nounce_action') ){
			exit();
		}

		if (  ! current_user_can( 'manage_options' ) ) {	
			add_action( 'admin_notices', 'wpp_authorization_failed' );
			return;
		}

		//woo new product settings
		if( isset($_POST['webpushr_woo_new_prod_settings'])){
			if( ! empty($_POST['webpushr_enable_woo_new_prod']) ){
				update_option('webpushr_enable_woo_new_prod','on');
				update_option('webpushr_woo_new_prod_title'		, sanitize_text_field(stripslashes($_POST['webpushr_woo_new_prod_title'])));
				update_option('webpushr_woo_new_prod_message'	, sanitize_text_field(stripslashes($_POST['webpushr_woo_new_prod_message'])));
				update_option('webpushr_woo_prod_icon'				, sanitize_text_field(stripslashes($_POST['webpushr_woo_prod_icon'])));
				update_option('webpushr_woo_prod_image'			, sanitize_text_field(stripslashes($_POST['webpushr_woo_prod_image'])));
				update_option('webpushr_woo_prod_url'				, sanitize_text_field(stripslashes($_POST['webpushr_woo_prod_url'])));
			}else{
				update_option('webpushr_enable_woo_new_prod','off');
			}
		}
			
		//woo price drop settings
		elseif( isset($_POST['webpushr_price_drop']) ){
			update_option('webpushr_woo_price_drop_title'		, sanitize_text_field(stripslashes($_POST['webpushr_woo_price_drop_title'])));
			update_option('webpushr_woo_price_drop_message'		, sanitize_text_field(stripslashes($_POST['webpushr_woo_price_drop_message'])));
			update_option('webpushr_woo_price_drop_icon'			, sanitize_text_field(stripslashes($_POST['webpushr_woo_price_drop_icon'])));
			update_option('webpushr_woo_price_drop_image'		, sanitize_text_field(stripslashes($_POST['webpushr_woo_price_drop_image'])));
			update_option('webpushr_woo_price_drop_url'			, sanitize_text_field(stripslashes(@$_POST['webpushr_woo_price_drop_url'])));
			update_option('webpushr_woo_price_drop_show'			, sanitize_text_field(stripslashes(@$_POST['webpushr_woo_price_drop_show'])));
		}

		//woo sale price settings
		elseif( isset($_POST['webpushr_sale_price']) ){
			update_option('webpushr_woo_sale_title'		, sanitize_text_field(stripslashes($_POST['webpushr_woo_sale_title'])));
			update_option('webpushr_woo_sale_message'		, sanitize_text_field(stripslashes($_POST['webpushr_woo_sale_message'])));
			update_option('webpushr_woo_sale_icon'			, sanitize_text_field(stripslashes($_POST['webpushr_woo_sale_icon'])));
			update_option('webpushr_woo_sale_image'		, sanitize_text_field(stripslashes($_POST['webpushr_woo_sale_image'])));
			update_option('webpushr_woo_sale_url'			, sanitize_text_field(stripslashes($_POST['webpushr_woo_sale_url'])));
			update_option('webpushr_woo_sale_price_show'	, sanitize_text_field(stripslashes(@$_POST['webpushr_woo_sale_price_show'])));
		}


		//woo new abandoned cart settings
		elseif( isset($_POST['webpushr_abandoned_cart_settings'])){
			if( ! empty($_POST['webpushr_enable_abandoned_cart']) ){
				update_option('webpushr_enable_abandoned_cart','on');
				update_option('webpushr_woo_abandoned_cart_title'		, sanitize_text_field(stripslashes($_POST['webpushr_woo_abandoned_cart_title'])));
				update_option('webpushr_woo_abandoned_cart_message'	, sanitize_text_field(stripslashes($_POST['webpushr_woo_abandoned_cart_message'])));
				update_option('webpushr_woo_abandoned_cart_icon'		, sanitize_text_field(stripslashes($_POST['webpushr_woo_abandoned_cart_icon'])));
				update_option('webpushr_woo_abandoned_cart_image'		, sanitize_text_field(stripslashes($_POST['webpushr_woo_abandoned_cart_image'])));
				update_option('webpushr_woo_abandoned_cart_url'			, sanitize_text_field(stripslashes($_POST['webpushr_woo_abandoned_cart_url'])));
				update_option('webpushr_woo_abandoned_cart_interval'	, sanitize_text_field(stripslashes($_POST['webpushr_woo_abandoned_cart_interval'])));
				update_option('webpushr_woo_abandoned_cart_frequency'	, $_POST['webpushr_woo_abandoned_cart_frequency']);
			}else{
				update_option('webpushr_enable_abandoned_cart','off');
			}
		}


		add_action( 'admin_notices', 'wpp_settings_saved' );

	}
	
}

