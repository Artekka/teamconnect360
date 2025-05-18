<?php if( ! defined('ABSPATH') ) exit;
function push_admin_scripts(){
	wp_enqueue_style( 'push-css', plugins_url('css/webpushr_admin.min.css',__DIR__) , '', '4.11.0', false);
}

function webpushr_block_editor_js(){
	if( webpushr_is_gutenberg_page() )
		wp_enqueue_script( 'webpushr-js', plugins_url('js/webpushr_admin.min.js',__DIR__) , '', '1.4', false);
}
function webpushr_add_rewrite_rules() {
	add_rewrite_rule( "^/{webpushr-sw.js}$","index.php?{webpushr-sw.js}=1");
}

function webpushr_generate_sw($query){
	if ( ! property_exists( $query, 'query_vars' ) || ! is_array( $query->query_vars ) ) {
		return;
	}	
	$query_vars_as_string = http_build_query( $query->query_vars );

	if ( strpos( $query_vars_as_string, 'webpushr-sw.js' ) !== false ) {
		header( 'Content-Type: text/javascript' );
		echo "importScripts('https://cdn.webpushr.com/sw-server.min.js');";
		exit();
	}
}
	


function webpushr_setup(){
	webpushr_abandoned_cart_table();
	$myPlugin = 'webpushr-web-push-notifications/push.php';
	global $webpushr_active_plugins;
	$activePlugins = $webpushr_active_plugins;
	$activePlugins[] = $myPlugin;
	update_option('active_plugins',$activePlugins);
	deactivate_plugins( '/onesignal-free-web-push-notifications/onesignal.php' );
	exit( wp_redirect( admin_url( 'admin.php?page=webpushr-setup' ) ) );
}

function webpushr_abandoned_cart_table(){
	if( defined('WPP_WOOCOMMERCE') ){
		global $wpdb;
		$charset_collate = $wpdb->get_charset_collate();
		$query = "CREATE TABLE IF NOT EXISTS " . $wpdb->prefix . "webpushr_abandoned_cart (
				`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
				`date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
				`endpoint` varchar(500) CHARACTER SET latin1 DEFAULT NULL,
				`prod_count` TINYINT(4) DEFAULT NULL,
				`prod_id` BIGINT(20)  DEFAULT NULL,
				`cart_total` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
				PRIMARY KEY  (`id`),
				UNIQUE(`endpoint`)
				) $charset_collate; ";
				
		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		dbDelta( $query );
	}	
}
function insert_webpushr_script(){
	$webpushr_integration = get_option( 'wpp_disable_prompt_code' );
	global $webpushr_active_plugins;
	if( ! $webpushr_integration || ( is_array($webpushr_integration) && $webpushr_integration['disable_integration'] == 'false') ) { ?>
<script id="webpushr-script">
(function(w,d, s, id) {w.webpushr=w.webpushr||function(){(w.webpushr.q=w.webpushr.q||[]).push(arguments)};var js, fjs = d.getElementsByTagName(s)[0];js = d.createElement(s); js.async=1; js.id = id;js.src = "https://cdn.webpushr.com/app.min.js";
d.body.appendChild(js);}(window,document, 'script', 'webpushr-jssdk'));
<?php if( is_array($webpushr_integration) && $webpushr_integration['sw_path'] == 'root' ) {?>
	webpushr('setup',{'key':'<?php echo get_option( 'webpushr_public_key' ); ?>'});
<?php } elseif( in_array('super-progressive-web-apps/superpwa.php',$webpushr_active_plugins) || in_array('pwa/pwa.php',$webpushr_active_plugins) ||  in_array('pwa-for-wp/pwa-for-wp.php',$webpushr_active_plugins) ) {?>
	webpushr('setup',{'key':'<?php echo get_option( 'webpushr_public_key' ); ?>','sw':'none'});
<?php } else { ?>
	webpushr('setup',{'key':'<?php echo get_option( 'webpushr_public_key' ); ?>','sw':'<?php echo plugins_url('sdk_files/webpushr-sw.js.php',dirname(__FILE__));?>'});
<?php } ?>
</script>
	<?php	}	
}



function webpushr_menu(){
	
	if( defined('WPP_WEBPUSHR') ){
		add_menu_page( 'Webpushr - Dashboard','Webpushr','edit_posts', 'webpushr-dashbaord','webpushr_dashboard_page','dashicons-megaphone');
		add_submenu_page('webpushr-dashbaord','Webpushr - Dashboard','Dashboard','edit_posts','webpushr-dashbaord','webpushr_dashboard_page');
		add_submenu_page('webpushr-dashbaord','Webpushr - Configuration','Configuration','manage_options','webpushr-configuration','webpushr_configuration_page');
		add_submenu_page('webpushr-dashbaord','Webpushr - Manual Push','Manual Push','manage_options','webpushr-send-notification','webpushr_send_notification_page');
		add_submenu_page('webpushr-dashbaord','Webpushr - Stats','Notification Stats','edit_posts','webpushr-notification-stats','webpushr_statistics_page');
		add_submenu_page('webpushr-dashbaord','Webpushr - Setup','Setup','manage_options','webpushr-setup','webpushr_setup_page');
	}else{
		add_menu_page( 'Webpushr - Setup','Webpushr','manage_options', 'webpushr-setup','webpushr_setup_page','dashicons-megaphone');
		add_submenu_page('webpushr-setup','Webpushr - Setup','Setup','manage_options','webpushr-setup','webpushr_setup_page');
	}	

}

function webpushr_send_notification_page()
{
	
	include_once('send_notification.php');
}

	
function webpushr_subscribers_page(){
	include_once('wpp_subscribers.php');
}

	
function wpp_settings_saved() {
  ?>
  <div class="notice notice-success is-dismissible">
      <p><?php _e( 'Settings have been saved successfully!' ); ?></p>
  </div>
  <?php
}
function wpp_settings_failed() {
  ?>
  <div class="notice notice-error is-dismissible">
      <p><?php _e( 'Invalid REST API key! Please provide valid a valid REST API key' ); ?></p>
  </div>
  <?php
}

function wpp_authorization_failed() {
  ?>
  <div class="notice notice-error is-dismissible">
      <p><?php _e( 'You are not authorized for this operation' ); ?></p>
  </div>
  <?php
}

function webpushr_is_gutenberg_page() {
	global $post;

	if( ! (get_option('wpp_enable_for_post') == 'on' && in_array($post->post_type,json_decode(get_option('wpp_post_type')))))
		return false;
		
	if( function_exists('use_block_editor_for_post') && use_block_editor_for_post($post)){
		return true;
	}
	return false;
}

function wpp_api_request( $wpp_api_end_point, $wpp_api_request_data = null ){


	$private_key 	= get_option('webpushr_private_key');
	$auth_token		= get_option('webpushr_auth_token');
	$request['headers'] 		= array( 'Content-Type' => 'Application/Json', "webpushrKey" => $private_key, "webpushrAuthToken" => $auth_token, "webpushrRequest" => 1);
	$request['body'] 			=  wp_json_encode($wpp_api_request_data);
	$result 	= wp_remote_post($wpp_api_end_point,$request);
	if( ! is_wp_error( $result ) ) {
		$response 	= wp_remote_retrieve_body($result);
		$res_array 	= json_decode($response,true);
		$http_code 		= $result['response']['code'];
		return array('http_code' => $http_code, 'response_json' => $response, 'response_array' => $res_array );
	}	
	else
		return array('http_code' => 404, 'response_json' => '', 'response_array' => array() );
		
	
}


function webpushr_statistics_page(){
	include_once('webpushr_stats.php');
}

function webpushr_setup_page(){
	include_once('webpushr_setup.php');
}
function webpushr_configuration_page(){
	wp_enqueue_script('wpp-chosen-jquery', plugins_url('js/chosen.jquery.min.js',__DIR__) ,'','1.8.7'  );
	wp_enqueue_style( 'wpp-chosen-css', plugins_url('css/chosen.min.css',__DIR__) , '', '1.8.7', false);
	include_once('webpushr_configuration.php');
}

function webpushr_dashboard_page(){
	wp_enqueue_script('wpp-chart-jquery', plugins_url('js/Chart.min.js',__DIR__) ,'','2.8.0', false  );
	include_once('webpushr_dashboard.php');
}


/*
* Send notification
* for new post
* for woo new product
* for woo sale price
* for woo price drop
*/
	
function post_published_notification( $new_status, $old_status, $post, $send_notification_for_this_post = false ) {

	if( ! $post )
		return; 

	if( $new_status != 'publish')
		return;

	if( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
			return;
	}

	$ID = $post->ID;
	$wppNotificationMsg 	= '';

	if($old_status == 'future'){

		//if user wants the schedued post to publish immediately
		if( $_POST && isset($_POST['wpp_send_new_post_notification_metabox_present'])  ){
			$send_notification_for_this_post = $_POST['wpp_send_new_post_notification'];
		}
		else{
			//if it is a scheduled post, then get value from post meta
			$send_notification_for_this_post = get_post_meta($post->ID,'wpp_send_notification_for_new_post',true);
		}


	}else{

		if( $_POST && isset($_POST['wpp_send_new_post_notification_metabox_present'])  ){
			// //check if notification is enabled in metabox for this post/product
			$send_notification_for_this_post = $_POST['wpp_send_new_post_notification'];

		}elseif( $old_status != 'publish' && get_option('wpp_default_for_post') == 'on' ){
			//for new post using 3rd-party post editor like Elementor
			$send_notification_for_this_post = true;

		}elseif( $old_status == 'publish' && get_option('wpp_default_for_post_update') == 'on' ){
			
			//if updated using quick edit
			if( !empty($_POST['_inline_edit']))
				$send_notification_for_this_post = true;
			
			//all 3rd-party post editor like Elementor
			else
				$send_notification_for_this_post = false;
		}
	}

	//if auto-saved using notification preview button
	if( ! empty($_POST['webpushr_notification_preview'])   )
		$send_notification_for_this_post = false;


	$wppAutoHide = 1;
	$wppNotificationTitle = "";
	//notification for new post
	if (  $send_notification_for_this_post && get_option('wpp_enable_for_post') == 'on' && in_array($post->post_type,json_decode(get_option('wpp_post_type')))) 
	{

		//notification title
		if( ! empty($_POST['webpushr_notification_title']) )
			$wppNotificationTitle		= $_POST['webpushr_notification_title'];

		elseif( ! empty(get_post_meta($ID,'webpushr_notification_title',true)) )
			$wppNotificationTitle		= get_post_meta($ID,'webpushr_notification_title',true);		

		else
			$wppNotificationTitle 	= get_option('wpp_post_title');

		//notification body
		if( ! empty($_POST['webpushr_notification_body']) )
			$wppNotificationMsg		= $_POST['webpushr_notification_body'];

		elseif( ! empty(get_post_meta($ID,'webpushr_notification_body',true)) )
			$wppNotificationMsg		= get_post_meta($ID,'webpushr_notification_body',true);		

		else
			$wppNotificationMsg		= get_option('wpp_post_message');


		if( isset($_POST['webpushr_segment']))
			$wppSegment					= $_POST['webpushr_segment'];

		if( empty($wppSegment) )
			$wppSegment 				= json_decode(get_option('wpp_post_sendTo'));

		//notification icon
		if( get_option('wpp_post_icon') == '{featured_image}' )
			$wppNotificationIcon	= get_the_post_thumbnail_url($ID, array(256,256));
		else
			$wppNotificationIcon	= get_option('wpp_post_icon');

		//notification image
		if( get_option('wpp_post_image') == '1' || get_option('wpp_post_image') == '{featured_image}' )
			$wppNotificationImage	= get_the_post_thumbnail_url($ID, array(512,512));
		else
			$wppNotificationImage	= get_option('wpp_post_image');
			
		$wppNotificationURL 	= get_permalink($ID);	
		if( $utm_parameter = get_option('wpp_utm_parameter') ){
			$utm_parameter = preg_replace("/^\&|^\?/", "",$utm_parameter);

			//if url already contain query string
			if( parse_url($wppNotificationURL, PHP_URL_QUERY) ){
				$wppNotificationURL = $wppNotificationURL . '&' . $utm_parameter;
			}else{
				$wppNotificationURL = $wppNotificationURL . '?' . $utm_parameter;
			}

		}
		$wppAutoHide			= get_option('wpp_auto_hide');

		$post_msg_placeholders = array(
														'{post_title}'		=> $post->post_title,
														'{post_id}'			=> $post->ID,
														'{post_excerpt}'	=> get_the_excerpt($post->ID) ?: strip_shortcodes($post->post_content),
														'{post_category}'	=> get_the_category($post->ID) ? get_the_category($post->ID)[0]->name : '',
													);
		$wppNotificationMsg 		= preg_replace("/\r|\n/", "",str_replace(array_keys($post_msg_placeholders),$post_msg_placeholders,$wppNotificationMsg));
		$wppNotificationTitle 	= preg_replace("/\r|\n/", "",str_replace(array_keys($post_msg_placeholders),$post_msg_placeholders,$wppNotificationTitle));
		$clickURL 					= preg_replace("/\r|\n/", "",str_replace(array_keys($post_msg_placeholders),$post_msg_placeholders,$wppNotificationURL));
		$wppNotificationName = 'New Post: ' . $wppNotificationTitle;

   }

	//Notifications for WooCommerce
	elseif ( $post->post_type == 'product'  && defined('WPP_WOOCOMMERCE') ) 
	{  
		$wooCurrency 			= get_woocommerce_currency_symbol(get_option('woocommerce_currency'));
		$priceFormat 			= get_woocommerce_price_format();
		$product 				= wc_get_product ( $post->ID );

		$old_regular_price 	= sprintf($priceFormat,$wooCurrency,$product->get_regular_price());
		$new_regular_price 	= sprintf($priceFormat,$wooCurrency,$_POST['_regular_price']);
		$sale_price 			= sprintf($priceFormat,$wooCurrency,$_POST['_sale_price']);

		//notification data for new woo product
		if( get_option('webpushr_enable_woo_new_prod') == 'on' && isset($_POST['wpp_send_new_post_notification']) && ($_POST['wpp_send_new_post_notification'] || get_post_meta($ID,'webpushr_notification_preview',true)) ){
			$wppNotificationName = 'WooCommerce new product alert';
			$notificationTitle 	= get_option('webpushr_woo_new_prod_title');
			$notificationMsg 		= get_option('webpushr_woo_new_prod_message');
			$notificationIcon 	= get_option('webpushr_woo_prod_icon');
			$notificationImage 	= get_option('webpushr_woo_prod_image');
			$notificationUrl 		= get_option('webpushr_woo_prod_url');
			$wppSegment 			= json_decode(get_option('wpp_post_sendTo'));
		}
		
		//notification data  for woo price drop
		elseif( isset($_POST['webpushr_price_drop_notification'])   ){
			$wppNotificationName = 'WooCommerce price drop alert';
			$notificationTitle 	= get_option('webpushr_woo_price_drop_title');
			$notificationMsg 		= get_option('webpushr_woo_price_drop_message');
			$notificationIcon 	= get_option('webpushr_woo_price_drop_icon');
			$notificationImage 	= get_option('webpushr_woo_price_drop_image');
			$notificationUrl 		= get_option('webpushr_woo_price_drop_url');
			$wppSegment 			= json_decode(get_option('wpp_post_sendTo'));
		}

		//notification settings for woo product sale price
		elseif( isset($_POST['webpushr_sale_price_notification'])  ){
			$wppNotificationName = 'WooCommerce sale price alert';
			$notificationTitle 	= get_option('webpushr_woo_sale_title');
			$notificationMsg 		= get_option('webpushr_woo_sale_message');
			$notificationIcon 	= get_option('webpushr_woo_sale_icon');
			$notificationImage 	= get_option('webpushr_woo_sale_image');
			$notificationUrl 		= get_option('webpushr_woo_sale_url');
			$wppSegment 			= json_decode(get_option('wpp_post_sendTo'));
		}

		$product_msg_placeholders = array(
														'{product_name}'		=> $post->post_title,
														'{short_description}'=> get_the_excerpt($ID),
														'{product_image}'		=> get_the_post_thumbnail_url($ID),
														'{product_url}'		=> get_the_permalink(),
														'{product_category}'	=> get_the_terms( $post->ID, 'product_cat' )[0]->name,
														'{old_price}'			=> $old_regular_price,
														'{new_price}'			=> $new_regular_price,
														'{regular_price}'		=> $new_regular_price,
														'{sale_price}'			=> $sale_price,
													);


		$wppNotificationTitle 	= preg_replace("/\r|\n/", "",str_replace(array_keys($product_msg_placeholders),$product_msg_placeholders,$notificationTitle));;
		$wppNotificationMsg 		= preg_replace("/\r|\n/", "",str_replace(array_keys($product_msg_placeholders),$product_msg_placeholders,$notificationMsg));
		$wppNotificationIcon 	= preg_replace("/\r|\n/", "",str_replace(array_keys($product_msg_placeholders),$product_msg_placeholders,$notificationIcon));
		$wppNotificationImage 	= preg_replace("/\r|\n/", "",str_replace(array_keys($product_msg_placeholders),$product_msg_placeholders,$notificationImage));
		$clickURL 					= preg_replace("/\r|\n/", "",str_replace(array_keys($product_msg_placeholders),$product_msg_placeholders,$notificationUrl));

	}// if woo product


	//send notificaiton
	if($wppNotificationTitle)
	{

		$req_data = array(								
									'name' 			=> $wppNotificationName, //required
									'title' 			=> $wppNotificationTitle, //required
									'message' 		=> substr($wppNotificationMsg,0,300), //required
									'target_url'	=> $clickURL,
									'auto_hide'		=> $wppAutoHide,

		);

		if( ! empty(get_post_meta($ID, 'webpushr_notification_preview', true)) ){
			$end_point = 'https://api.webpushr.com/v1/notification/send/endpoint';
			$req_data['notification_type'] = 'preview';
			$req_data['endpoint'] = $_COOKIE['_webpushrEndPoint'];
		}else{
			$end_point = 'https://api.webpushr.com/v1/notification/send/segment';
			$req_data['segment'] = $wppSegment;
		}
		if( $wppNotificationImage )
			$req_data['image'] = $wppNotificationImage;
		
		if( $wppNotificationIcon )
			$req_data['icon'] = $wppNotificationIcon;

		//To avoid duplicate sends
		if( ! get_transient('webpushr_notification_sent') )
			set_transient('webpushr_notification_sent', time(), 2);
		else{
			if( (time() - get_transient('webpushr_notification_sent')) > 2 )
				delete_transient('webpushr_notification_sent');
			else
				return;
		}

		$response = wpp_api_request($end_point,$req_data);
		if($response['http_code'] == 200){
			update_post_meta( $ID, 'wpp_send_notification_for_new_post',0);
			update_post_meta( $ID, 'webpushr_notification_preview',0);
		}

	}

}

function webpushr_test_notification(){
	global $post;
	$post = get_post($_POST['post_id']);
	update_post_meta( $_POST['post_id'], 'webpushr_notification_preview',1);
	post_published_notification('publish', 'draft', $post, true);
	exit(0);
}
function create_wpp_post_notification_box(){
	global $post;
	
	$selectedPostType = json_decode(get_option('wpp_post_type'));

	if( defined('WPP_WOOCOMMERCE') && $post->post_status	!= 'publish' && get_option('webpushr_enable_woo_new_prod') == 'on')
		$selectedPostType[] = 'product';
	
	add_meta_box ( 'webpushr-metabox', 'Webpushr Notification', 'wpp_notification_box', $selectedPostType, "side", "high" );
	
	if( defined('WPP_WOOCOMMERCE') &&   $post->post_status	== 'publish' && $post->post_type == 'product'  )
		add_action( 'woocommerce_product_options_general_product_data', 'webpushr_woo_custom_fileds' );
}
function webpushr_preview_button(){
	global $post;

	//we do not support send notification for already published PRODUCTS, so no need to show the PREVIEW button
	if( defined('WPP_WOOCOMMERCE') &&  $post->post_type == 'product' && $post->post_status == 'publish')
		return;

	if(  (get_option('wpp_enable_for_post') == 'on' && in_array($post->post_type,json_decode(get_option('wpp_post_type')))) || ( $post->post_type == 'product' && defined('WPP_WOOCOMMERCE') )  ){
		?>
		<div id="webpushr_13fw3_switch-mode" style="">
			<button id="webpushr_13fw3_switch-mode-button" onclick="document.getElementById('webpushr_notification_preview_button').click();" type="button" class="button button-primary button-hero webpushr_13fw3_metabox"><svg style="width:20px; height:27px; margin-bottom:-5px;" version="1.0"   viewBox="0 0 1480.000000 303.000000" preserveAspectRatio="xMidYMid meet">
						<g transform="translate(-000.000000,1203.000000) scale(0.500,-0.500)" fill="#484848" stroke="none">
							<path fill="#fff" d="M1153 2955 c-202 -38 -401 -123 -553 -235 -151 -111 -294 -278 -383 -447 -43 -81 -102 -258 -122 -363 -50 -260 -5 -571 116 -812 84 -167 246 -358 394 -463 l64 -46 -92 -142 c-51 -78 -125 -192 -165 -253 -40 -61 -72 -113 -72 -116 0 -6 47 6 450 113 124 32 279 73 345 90 630 165 742 201 876 280 316 185 542 497 621 856 30 138 30 387 0 523 -112 510 -494 893 -1002 1005 -103 23 -381 29 -477 10z m267 -540 c39 -20 50 -43 50 -109 l0 -55 43 -12 c61 -16 152 -74 191 -122 69 -86 84 -136 96 -327 12 -190 42 -303 107 -401 19 -29 24 -47 21 -85 l-3 -49 -552 -3 -553 -2 0 59 c0 37 5 63 14 70 23 20 75 144 91 221 9 41 20 134 24 206 10 152 30 224 80 291 44 58 129 119 191 137 l45 13 5 54 c10 105 73 154 150 114z m90 -1280 c0 -130 -168 -193 -244 -92 -25 34 -42 90 -31 107 4 6 60 10 141 10 l134 0 0 -25z"></path>
						</g>
					</svg>
				<span id="webpushr_13fw3_preview-btn-text"><?php echo __( 'Webpushr Preview', 'webpushr' ); ?></span>
			</button>
		</div>		
		<?php
	}
}

function wpp_notification_box(){
	global $post;
	$wppNotificationForPost = get_option( 'wpp_enable_for_post' );

	//get webpushr subscription status
	$selectedSegments 	= @json_decode(get_option('wpp_post_sendTo'));
	$subscriptionStatus 	= wpp_api_request('https://api.webpushr.com/v1/segments');


	if( ! $subscriptionStatus['response_array']['subscription_status'] ){	
		if( ( json_decode(get_option('wpp_post_sendTo'))[0] && $wppNotificationForPost == 'on' && in_array( $post->post_type, json_decode(get_option('wpp_post_type'))) ) || ( $post->post_type == 'product' && defined('WPP_WOOCOMMERCE')  )  ){
			echo "<input type='hidden' name='wpp_send_new_post_notification_metabox_present' value='1'>";
			echo "<input type='hidden' name='wpp_send_new_post_notification' value='0'>";
			echo "<label style='display:block; margin:18px 0px 10px 0;'>";
			echo "<input type='checkbox' " . ( ( ((! get_option( 'wpp_default_for_post' ) || get_option( 'wpp_default_for_post' ) == 'on') && $post->post_status != 'publish' && $post->post_status != 'future') || ((! get_option( 'wpp_default_for_post_update' ) || get_option( 'wpp_default_for_post_update' ) == 'on') && $post->post_status == 'publish') || ( get_post_meta($post->ID,'wpp_send_notification_for_new_post',true) && $post->post_status == 'future')  ) ? "checked='checked'" : "") ." value='1'  name='wpp_send_new_post_notification' id='wpp_send_new_post_notification' /> Send Web Push Notification</label>";
			if( $post->post_status == 'publish' ){
				echo "<p><a href='/wp-admin/admin.php?page=webpushr-notification-stats'>See notification stats</a></p>";
			}
			if( get_post_meta($post->ID,'webpushr_segment',true) )
				$selectedSegments 	 = get_post_meta($post->ID,'webpushr_segment',true);
			
			$total_subscribers = $subscriptionStatus['response_array']['active_site_subscribers'];
			unset($subscriptionStatus['response_array']['active_site_subscribers']);
			unset($subscriptionStatus['response_array']['subscription_status']);

			echo "<p><strong>Total Active Subscribers: $total_subscribers </strong></p>";

			echo "<div class='webpushr_13fw3_additional-info-header' onclick='toggle_webpushr_info();'><a href='javascript:void(0);'>+ Show additional settings</a></div>";
			echo "<div class='webpushr_13fw3_additional-info' style='display:none'>";

			//notification Title
			$webpushr_notification_title 	 = get_post_meta($post->ID,'webpushr_notification_title',true)?: get_option('wpp_post_title');
			echo "<p style='margin-top:1em'><label><strong>Notification Title</strong></label><input type='text' style='width:100%; class='webpushr-metabox'  name='webpushr_notification_title' value='". $webpushr_notification_title . "'></input></p>";	

			//notification Body
			$webpushr_notification_body 	 = get_post_meta($post->ID,'webpushr_notification_body',true)?: get_option('wpp_post_message');
			echo "<p style='margin-top:1em'><label><strong>Notification Message</strong></label><textarea style='width:100%; resize:none' class='webpushr-metabox' rows='5' name='webpushr_notification_body'>". $webpushr_notification_body ."</textarea></p>";

			//segments
			echo "<p style='margin-bottom:5px;'><strong>Select Segment(s)</strong> <a href='https://app.webpushr.com/segments' target='_blank'>Manage</a></p>";
			foreach($subscriptionStatus['response_array'] as $seg){
				if( $seg['title'] == 'All Users (Default)' )
					$segment_name = $seg['title'] ;
				elseif( empty($seg['title']) )
					$segment_name = "(name missing)";
				else
					$segment_name = $seg['title'];

				?><label> <input <?php  if( $selectedSegments &&  in_array($seg['id'],$selectedSegments) ) { ?> checked <?php } ?> type="checkbox" name="webpushr_segment[]" value="<?php echo $seg['id'];?>" class="webpushr-metabox"> <?php echo $segment_name; ?></label><br /><?php
			}

			?>
			<div id="minor-publishing-actions" style="padding:0;display:none">
				<div id="save-action">
						<input name="webpushr_notification_preview" id="webpushr_notification_preview" class="webpushr-metabox" type="hidden" value='' />
						<input id="webpushr_notification_preview_button" name="save"  type="button" class="button button-large webpushr-metabox" value="Preview Notification">
				</div>
			</div>
			</div><!-- <div class='webpushr-metabox'> -->
			<script>
				if( document.getElementById('wpp_send_new_post_notification').getAttribute('checked') != 'checked' ){
					jQuery('.webpushr_13fw3_metabox').attr('disabled','disabled');
				}
				jQuery("#wpp_send_new_post_notification").click(function(){
					if( jQuery(this).prop('checked') == false )
						jQuery('.webpushr_13fw3_metabox').attr('disabled','disabled');
					else
						jQuery('.webpushr_13fw3_metabox').removeAttr('disabled');
				});
				jQuery("#webpushr_notification_preview_button").click(function(){
					jQuery('#webpushr_notification_preview').val(1);
					jQuery(this).parents('form').submit();
					jQuery("#webpushr_13fw3_switch-mode-button").css('opacity','0.65');
					jQuery("#webpushr_13fw3_preview-btn-text").text('Generating Preview...');
					jQuery(window).unbind('beforeunload.edit-post');
				})

				function toggle_webpushr_info(){
					jQuery(".webpushr_13fw3_additional-info").slideToggle(300,function(){
						if( jQuery(".webpushr_13fw3_additional-info").is(":visible") )
							jQuery(".webpushr_13fw3_additional-info-header a").text('- Hide additional settings');
						else
							jQuery(".webpushr_13fw3_additional-info-header a").text('+ Show additional settings');

					});
				}
			</script>
			<?php

		}
		elseif( ! json_decode(get_option('wpp_post_sendTo'))[0] )
			echo "<p>Please <a href='" . site_url() .  "/wp-admin/admin.php?page=webpushr-configuration'>select at least one segment</a> to enable push notifications.</p>";
		else
			echo "<p>Web Push Notifications are currently disabled for this post type. You can enable from <a href='" . site_url() .  "/wp-admin/admin.php?page=webpushr-configuration'>Webpushr Configuration.</a></p>";
	}else{
		echo "<p><img class='webpushr_13fw3_warning_icon' src='" . plugins_url("images/wpp_warning.png", __DIR__) . "'>" . $subscriptionStatus['response_array']['subscription_status']['description'] . "</p>";
	}
}


/**
* Displays the web pushr notification checkbox for WooCommerce product data meta box
*/
function webpushr_woo_custom_fileds() {
	$args = array(
		'id' => 'webpushr_price_drop_notification',
		'label' => __( 'Webpushr Options', 'webpushr' ),
		'class' => 'webpushr-custom-field',
		'type' => 'checkbox',
		'desc_tip' => false,
		'description' => __( 'Send Web Push notification for Price Drop <a href="/wp-admin/admin.php?page=webpushr-configuration&menu=price_drop#woocommerce_settings">Configure Message</a>', 'webpushr' ),
	);
	woocommerce_wp_text_input( $args );
	$args = array(
		'id' => 'webpushr_sale_price_notification',
		'label' => __( 'Webpushr Options', 'webpushr' ),
		'class' => 'webpushr-custom-field',
		'type' => 'checkbox',
		'desc_tip' => false,
		'description' => __( 'Send Web Push notification for Sale Price <a href="/wp-admin/admin.php?page=webpushr-configuration&menu=sale_price#woocommerce_settings">Configure Message</a>', 'webpushr' ),
	);
	woocommerce_wp_text_input( $args );
}




/**
 * WOOCOMMERCE FUNCTIONALITY
 */
// Custom Cron Recurrences
function webpushr_user_define_recurrence( $schedules ) {
	$schedules['webpushr_abandoned_cart_interval'] = array(
		'display' => __( 'Every 5 minute', 'webpushr' ),
		'interval' => 300,
	);
	return $schedules;
}

function webpushr_cron_job() {
	if ( ! wp_next_scheduled( 'webpushr_abandoned_cart' ) ) {
		wp_schedule_event( time(), 'webpushr_abandoned_cart_interval', 'webpushr_abandoned_cart' );
	}
}

function webpushr_store_woo_cart_info(){
	global $wpdb;
	global $woocommerce;

	if( empty($_COOKIE['_webpushrEndPoint']) )
		return;

	if( ! $woocommerce->cart->is_empty( ) ){
		$products		= $woocommerce->cart->get_cart_contents();
		$firstProd 		= reset($products);
		$cart_total		= strip_tags($woocommerce->cart->get_cart_total());
		$prod_count 	= count($woocommerce->cart->get_cart());
							
		$wpdb->replace(
			$wpdb->prefix . "webpushr_abandoned_cart", 
			array(
					'date_time' 	=> date('Y-m-d H:i:s'), 
					'endpoint' 		=> $_COOKIE['_webpushrEndPoint'],
					'prod_count' 	=> $prod_count,
					'prod_id' 		=> $firstProd['product_id'],
					'cart_total'	=> $cart_total,
					),
			array('%s','%s','%d','%d','%s')
		);
	}else{
		$wpdb->delete($wpdb->prefix . "webpushr_abandoned_cart", array('endpoint' => $_COOKIE['_webpushrEndPoint']), array('%s') );
	}
}

function webpushr_send_abandoned_notification(){	
	if( get_option('webpushr_enable_abandoned_cart') == 'off' )
		return;
	
	global $wpdb;

	$wpdb->query("delete from " . $wpdb->prefix . "webpushr_abandoned_cart where date_time < current_timestamp - interval 10 day");

	$result = $wpdb->get_results( $wpdb->prepare("select * from " . $wpdb->prefix . "webpushr_abandoned_cart where date_time < '". date('Y-m-d H:i:s') ."' - INTERVAL %d hour ", array(get_option('webpushr_woo_abandoned_cart_interval'))), ARRAY_A  );
	
	$checkout_page_url = wc_get_checkout_url();
	
	foreach($result as $r){

		$wppNotificationImage	= get_the_post_thumbnail_url( $r['prod_id'] , array(512,512));
		$product_name = ($r['prod_count'] > 1) ? 'Multiple Products' :  get_the_title( $r['prod_id'] );
		$data = array(
			'title' 			=>	str_replace(array('{product_name}','{product_count}','{cart_total}'), array( $product_name, $r['prod_count'], $r['cart_total']), get_option('webpushr_woo_abandoned_cart_title')),
			'message' 		=> str_replace(array('{product_name}','{product_count}','{cart_total}'), array( $product_name, $r['prod_count'], $r['cart_total']), get_option('webpushr_woo_abandoned_cart_message')),
			'target_url'	=> str_replace('{checkout_page}', $checkout_page_url, get_option('webpushr_woo_abandoned_cart_url')),
			'icon'			=> str_replace('{product_image}', $wppNotificationImage,get_option('webpushr_woo_abandoned_cart_icon')),
			'image'			=> str_replace('{product_image}', $wppNotificationImage,get_option('webpushr_woo_abandoned_cart_image')),
			'endpoint'		=> $r['endpoint'] //required
		);
		wpp_api_request('https://api.webpushr.com/v1/notification/send/endpoint', $data);

		if( get_option('webpushr_woo_abandoned_cart_frequency') == 'once' )
			$wpdb->delete( $wpdb->prefix . "webpushr_abandoned_cart" , array( 'id' => $r['id'] ) );
		else
			$wpdb->query( $wpdb->prepare("update " . $wpdb->prefix . "webpushr_abandoned_cart set date_time = current_timestamp where id = %d",array($r['id'])));
	}

}

//save send notification flage
function save_send_notification_flag($post_id, $post){

	if( isset($_POST['wpp_send_new_post_notification_metabox_present']) && isset($_POST['wpp_send_new_post_notification']) )
		update_post_meta ( $post_id, 'wpp_send_notification_for_new_post', sanitize_text_field($_POST['wpp_send_new_post_notification']) );

	if( isset($_POST['webpushr_segment']) )
		update_post_meta( $post_id, 'webpushr_segment', $_POST['webpushr_segment'] );

	if( isset($_POST['webpushr_notification_title']) )
		update_post_meta( $post_id, 'webpushr_notification_title', $_POST['webpushr_notification_title'] );

	if( isset($_POST['webpushr_notification_body']) )
		update_post_meta( $post_id, 'webpushr_notification_body', $_POST['webpushr_notification_body'] );

	if( !empty($_POST['webpushr_notification_preview']) ){
		wp_redirect("?p=" . (($post->post_parent) ?: $post_id) . "&action=webpushr-preview");
		exit();
	}

		
}



function wpp_pagination($paged,$max) {
 
  if( $max <= 1 )
        return;
		  
    /** Add current page to the array */
    if ( $paged >= 1 )
        $links[] = $paged;
 
    /** Add the pages around the current page to the array */
    if ( $paged >= 3 ) {
        $links[] = $paged - 1;
        $links[] = $paged - 2;
    }
 
    if ( ( $paged + 2 ) <= $max ) {
        $links[] = $paged + 2;
        $links[] = $paged + 1;
    }
 
    /** Link to first page, plus ellipses if necessary */
    if ( ! in_array( 1, $links ) ) {
        $class = 1 == $paged ? ' text-primary' : '';
 
        printf( '<li class="paginate_button page-item %s"><a class="btn btn-sm btn-falcon-default webpushr_13fw3_mr-1" href="%s">%s</a></li>' . "\n", $class, esc_url( get_pagenum_link( 1 ) ), '1' );
 
        if ( ! in_array( 2, $links ) )
            echo '<li class="paginate_button page-item mr-2">…</li>';
    }
 
    /** Link to current page, plus 2 pages in either direction if necessary */
    sort( $links );
    foreach ( (array) $links as $link ) {
        $class = $paged == $link ? ' text-primary' : '';
        printf( '<li class="paginate_button page-item %s"><a class="btn btn-sm btn-falcon-default webpushr_13fw3_mr-1" href="%s">%s</a></li>' . "\n", $class, esc_url( get_pagenum_link( $link ) ), $link );
    }
 
    /** Link to last page, plus ellipses if necessary */
    if ( ! in_array( $max, $links ) ) {
        if ( ! in_array( $max - 1, $links ) )
            echo '<li class="paginate_button page-item mr-1">…</li>' . "\n";
 
        $class = $paged == $max ? ' text-primary' : '';
        printf( '<li class="paginate_button page-item %s"><a class="btn btn-sm btn-falcon-default mr-1" href="%s">%s</a></li>' . "\n", $class, esc_url( get_pagenum_link( $max ) ), $max );
    }
}