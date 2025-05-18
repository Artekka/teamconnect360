<?php 
if( ! defined('ABSPATH') ) exit;
/*
 * Plugin Name: Webpushr Push Notifications
 * Description: World's best platform for sending web push notifications.
 * Version: 4.36.0
 * Author: Webpushr Web Push Notifications
 * Author URI: https://www.webpushr.com
 * License: MIT
 */
class Webpushr{
	protected function __construct() {
		global $webpushr_active_plugins;
		$webpushr_active_plugins = get_option( 'active_plugins' );
		//check if webpushr keys are generated
		if( get_option( 'webpushr_public_key' ) && get_option( 'webpushr_private_key' ) && get_option( 'webpushr_auth_token' )  )
			define('WPP_WEBPUSHR',TRUE);

		//check if WooCommerce is install and active
		if( in_array('woocommerce/woocommerce.php',$webpushr_active_plugins) )
			define('WPP_WOOCOMMERCE',1);

		include_once('include/webpushr_functions.php');

		add_action( 'admin_init', array( $this, 'webpushr_init' ) );

		register_activation_hook( __FILE__, 'webpushr_setup' );
		add_action( 'plugins_loaded', array($this,'webpushr_setup_hooks') );

		//add menu in the menu bar
		add_action('admin_menu', 'webpushr_menu');


		//add css file for admin
		add_action( 'admin_enqueue_scripts', 'push_admin_scripts' );

		add_action( 'enqueue_block_editor_assets', 'webpushr_block_editor_js' );
		

		add_action( 'transition_post_status', 'post_published_notification', 10, 3 );


		if( defined('WPP_WEBPUSHR')  ){
			add_action('wp_footer', 'insert_webpushr_script',1000);
			add_action('admin_footer', 'insert_webpushr_script',1000 );
		}



		add_action('admin_init', function() {
			if ( !empty($_GET['p']) && isset($_GET['action']) && $_GET['action'] === 'webpushr-preview' ) {
				// load the file if exists
				if( get_post($_GET['p']) ){
					include_once('include/webpushr_preview.php');
					exit();
				}

			}
		});

		//add notification meta box for POST
		add_action ( 'add_meta_boxes', 'create_wpp_post_notification_box',10 );
		add_action ( 'save_post', 'save_send_notification_flag',10,2);

		//send test notification to admin
		add_action( 'wp_ajax_webpushr_test_notification', 'webpushr_test_notification' ); //admin side


		add_action( 'edit_form_after_title', 'webpushr_preview_button');


		add_action ( 'admin_init', 'wpp_save_settings' );

		/* Compatibility for Super PWA Plugin */
		if( in_array('super-progressive-web-apps/superpwa.php',$webpushr_active_plugins) ){
			add_action( 'plugins_loaded', array($this,'superpwa_webpushr_integration') );
		}

		/* Compatibility for PWA Plugin */
		if( in_array('pwa/pwa.php',$webpushr_active_plugins) ){
			add_action( 'wp_front_service_worker', array($this,'register_webpushr_service_worker') );
			add_action( 'wp_admin_service_worker', array($this,'register_webpushr_service_worker') );
		}

		if( defined('WPP_WOOCOMMERCE') ){
			if( get_option('webpushr_enable_abandoned_cart') != 'off' ){
				add_action( 'woocommerce_add_to_cart', 'webpushr_store_woo_cart_info', 100, 0 );
				add_action( 'woocommerce_cart_item_removed', 'webpushr_store_woo_cart_info', 100, 0 );
				add_action( 'woocommerce_cart_item_restored', 'webpushr_store_woo_cart_info', 100, 0 );
				add_action( 'woocommerce_after_calculate_totals', 'webpushr_store_woo_cart_info', 100, 0 );
				add_action( 'woocommerce_thankyou', 'webpushr_store_woo_cart_info', 100, 0 );
				
				//create custom cron job recurrence
				add_filter( 'cron_schedules', 'webpushr_user_define_recurrence' );

				// Schedule Cron Job Event		
				add_action( 'wp', 'webpushr_cron_job' );
				add_action('webpushr_abandoned_cart','webpushr_send_abandoned_notification');
			}
		}
	}

	/* Compatibility for PWA Plugin */
	public function register_webpushr_service_worker( $scripts ) {
		$scripts->register(
			'Webpushr',
			array(
				'src' => function () {
					return "importScripts('https://cdn.webpushr.com/sw-server.min.js');";
				},
			)
		);		
	}
	/* Compatibility for PWA Plugin */

	/* Compatibility for Super PWA Plugin */
	public function superpwa_webpushr_integration() {			
		// Change service worker filename to match Webpushr's service worker
		add_filter( 'superpwa_sw_filename', array($this,'superpwa_webpushr_sw_filename') );		
		// Import Webpushr service worker in SuperPWA
		add_filter( 'superpwa_sw_template', array($this,'superpwa_webpushr_sw') );
	}	
	public function superpwa_webpushr_sw_filename( $sw_filename ) {
		return 'webpushr-sw.js.php';
	}
	public function superpwa_webpushr_sw( $sw ) {
		$match = preg_grep( '#Content-Type: text/javascript#i', headers_list() );
		if ( ! empty ( $match ) ) {
			$webpsuhr = "importScripts('https://cdn.webpushr.com/sw-server.min.js');" . PHP_EOL;
			return $webpsuhr . $sw;
		}
		$webpsuhr  = '<?php' . PHP_EOL; 
		$webpsuhr .= 'header( "Content-Type: application/javascript" );' . PHP_EOL;
		$webpsuhr .= 'echo "importScripts(\'https://cdn.webpushr.com/sw-server.min.js\');";' . PHP_EOL;
		$webpsuhr .= '?>' . PHP_EOL . PHP_EOL;
		return $webpsuhr . $sw;
	}
	/* Compatibility for Super PWA Plugin */


	public function webpushr_init(){		
		include_once('include/save_settings.php');
	}

	public function webpushr_setup_hooks(){
		add_action( 'init', 'webpushr_add_rewrite_rules' );
		add_action( 'parse_request', 'webpushr_generate_sw' );
	}



	public static function init() {

		static $instance = null;

		if ( ! $instance ) {
			$instance = new Webpushr();
		}

		return $instance;

	}

}
Webpushr::init();