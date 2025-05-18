<?php


if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

global $wp_version;
global $post;
$body_classes = [
	'webspuhr-preview',
	'wp-version-' . str_replace( '.', '-', $wp_version ),
];

if ( is_rtl() ) {
	$body_classes[] = 'rtl';
}

$post_id = esc_attr($_GET['p']);

if ( ! is_numeric($post_id) ){
	wp_redirect('/wp-admin');
   exit();
}

$post = get_post($post_id);

$wppNotificationTitle 	= get_option('wpp_post_title');
$wppNotificationMsg = (get_post_meta($post->ID,'webpushr_notification_body', true)) ?: get_option('wpp_post_message');

if( $post->post_type == 'product' ){
   if( get_option('webpushr_woo_prod_icon') == '{product_image}' )
      $wppNotificationIcon	= get_the_post_thumbnail_url($post->ID, array(256,256) );
   else
      $wppNotificationIcon	= get_option('webpushr_woo_prod_icon');

   //notification image
   if(  get_option('webpushr_woo_prod_image') == '{product_image}' )
      $wppNotificationImage	= get_the_post_thumbnail_url($post->ID, array(512,512));
   else
      $wppNotificationImage	= get_option('webpushr_woo_prod_image');

}else{
   if( get_option('wpp_post_icon') == '{featured_image}' )
      $wppNotificationIcon	= get_the_post_thumbnail_url($post->ID, array(512,512) );
   else
      $wppNotificationIcon	= get_option('wpp_post_icon');

   //notification image
   if( get_option('wpp_post_image') == '1' || get_option('wpp_post_image') == '{featured_image}' )
      $wppNotificationImage	= get_the_post_thumbnail_url($post->ID, array(512,512));
   else
      $wppNotificationImage	= get_option('wpp_post_image');
}

$post_msg_placeholders = array(
                                    '{post_title}'		=> $post->post_title,
                                    '{post_excerpt}'	=> get_the_excerpt($post->ID) ?: strip_shortcodes($post->post_content),
                                 );
$wppNotificationMsg 		= preg_replace("/\r|\n/", "",str_replace(array_keys($post_msg_placeholders),$post_msg_placeholders,$wppNotificationMsg));
$wppNotificationTitle 	= preg_replace("/\r|\n/", "",str_replace(array_keys($post_msg_placeholders),$post_msg_placeholders,$wppNotificationTitle));



$webpushr_notification_badge = '';

$action_button1_title = '';
$action_button2_title = '';
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> style="font-size:100%; margin-top:0 !important">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title><?php echo __( 'Webpushr Notification Preview', 'webpushr' ) . ' | ' . get_the_title(); ?></title>
	<?php wp_head(); ?>
	<script>
		var ajaxurl = '<?php echo admin_url( 'admin-ajax.php', 'relative' ); ?>';
	</script>

   <link href="<?= plugins_url('css/webpushr_theme.min.css',__DIR__);?>" rel="stylesheet">
   <link href="<?= plugins_url('css/webpushr_preview.min.css',__DIR__);?>" rel="stylesheet">

   <style>
      .fancy-tab .tab-contents{    display: flex;justify-content: center;}
      .fancy-tab .tab-contents .tab-content.active{width:100%}
      .fancy-tab .tab-contents .tab-content:not(.active){display:none}
      .os-preview img{display:inline-block}

      .btn-primary,.btn-primary:hover  {
         color: #fff !important;
         background-color: #2c7be5 !important;
         border-color: #2c7be5 !important;
         text-decoration: none !important;
      }  
      #webpushr_notification_preview_button.btn {
         text-transform: unset;
         display: inline-block;
         font-weight: 500;
         color: #5e6e82;
         text-align: center;
         vertical-align: middle;
         -webkit-user-select: none;
         -moz-user-select: none;
         -ms-user-select: none;
         user-select: none;
         background-color: transparent;
         border: 1px solid transparent;
         padding: .3125rem 1rem;
         font-size: 1rem;
         line-height: 1.5;
         border-radius: .25rem;
         -webkit-transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
         transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
         -o-transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
         transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
         transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
      }     
      .spinner {
         background: url(images/spinner.gif) no-repeat;
         background-size: 20px 20px;
         display: inline-block;
         visibility: hidden;
         float: right;
         vertical-align: middle;
         opacity: .7;
         width: 20px;
         height: 20px;
         margin: 4px 10px 0;
      }       
      .promptbox3{height:auto;}    
      @media print, (-webkit-min-device-pixel-ratio: 1.25), (min-resolution: 120dpi){
         .spinner {
            background-image: url(images/spinner-2x.gif);
         }
      }
      .pushPreviewContents{height:420px; overflow: hidden;}
      .pushNotificationPreview img{width:auto; display:inline-block;}
      .pushImageContents{text-align:center;}
      .windowsNotificationBody .pushpreviewicon{width:auto; height:auto; max-width:50px; max-height:50px;}
   </style>
</head>
<body class="<?php echo implode( ' ', $body_classes ); ?>">
   <div class="container-fluid">
      <div class="row">
         <div class="col text-center mt-3 mb-0">
            <p>Push Notification Preview by <a href="https://www.webpushr.com" target="_blank">Webpushr</a></p>
         </div>
      </div>

      <div class="row">
         <div class="col-md-6 offset-md-3">
            <div class="fancy-tab">
               <div class="nav-bar nav-bar-center os-preview ">
                  <div class="nav-bar-item px-3 px-sm-4 active"><img src="<?= plugins_url("images/windows_icon.png",__DIR__);?>"><div class="mt-1">Windows</div></div>
                  <div class="nav-bar-item px-3 px-sm-4"><img src="<?= plugins_url("images/osx_icon.png",__DIR__);?>"><div class="mt-1">Mac</div></div>
                  <div class="nav-bar-item px-3 px-sm-4"><img src="<?= plugins_url("images/android_icon.png",__DIR__);?>"><div class="mt-1">Android</div></div>
               </div>
               <div class="tab-contents">
                  <div class="pushPreviewContents windows tab-content active">
                     <div class="pushNotificationPreview windowsNotificationPreview panel-body " style="padding-bottom:0 !important;">
                        <div class="windowsNotificationHeader">
                           <div>
                              <span>
                                 <svg style="display:inline-block" version="1.1" id="Layer_1"   x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                                    <g>
                                       <path fill="#777" d="M56.408,73.067l-15.378,25.63c-11.794-1.777-19.914-7.766-27.838-16.835 C5.265,72.797,1.302,62.174,1.302,50c0-8.495,0.941-14.302,5.126-21.786l20.504,32.038c7.259,9.852,14.097,15.378,21.786,15.378 C53.845,75.63,56.408,73.067,56.408,73.067z" />
                                       <path fill="#777" d="M26.436,43.723L10.728,20.153c4.565-5.707,10.891-10.767,17.486-14C34.807,2.919,42.391,1.302,50,1.302 c21.786,0,37.977,15.714,42.29,23.067c0,0-40.719,0-42.29,0c-5.707,0-10.813,1.722-15.313,5.209 C30.184,33.067,27.831,38.271,26.436,43.723z" />
                                       <path fill="#777" d="M66.66,30.777h28.193c2.283,5.706,3.845,13.01,3.845,19.223c0,13.316-4.694,24.729-14.077,34.24 C75.235,93.752,61.534,98.698,50,98.698l20.544-34.431c2.915-4.31,3.805-9.066,3.805-14.267 C74.349,43.027,71.606,35.723,66.66,30.777z" />
                                       <circle fill="#777" cx="50" cy="50" r="16.66" />
                                    </g>
                                 </svg>
                                 <?= $_SERVER['HTTP_HOST'];?> • now
                              </span>
                           </div>
                           <div>
                              <span style="position:absolute; top:10px; right:15px;font-size:12px" class="closex"> X </span>
                              <span style="position:absolute; top:10px; right:35px;font-size:12px" class="closex"><i class="fa fa-cog" aria-hidden="true"></i></span>
                           </div>
                        </div>
                        <div class="windowsNotificationBody">
                           <div class="pushTextContents">                     
                              <span data-full="Test" class="pushTitle"><?= $wppNotificationTitle; ?></span>
                              <span data-full="test" class="pushBody"><?= $wppNotificationMsg; ?></span>
                           </div>
                           <?php if( $wppNotificationIcon) { ?>
                              <div>
                                 <img data-type="siteIcon" class="pushpreviewicon" src="<?php  echo  $wppNotificationIcon; ?>" alt="">
                              </div>
                           <?php } ?>
                        </div>
                        <div class="col-md-12 p-0">
                           <div class="pushImageContents">
                              <img style="" class="pushpreviewimage" src="<?php if( $wppNotificationImage)  echo  $wppNotificationImage; ?>" alt="">
                           </div>
                        </div>

                           <div class="col-md-12 nopadding">
                              <div class="pushActionButtons">
                                 <span class="a01-preview" <?php if( ! $action_button1_title ){ ?>style="display:none" <?php } ?>><?= $action_button1_title; ?></span>
                                 <span class="a02-preview" <?php if( ! $action_button2_title ){ ?>style="display:none" <?php } ?>><?= $action_button2_title; ?></span>
                              </div>
                           </div>

                     </div>

                  </div>
                  <div class="pushPreviewContents mac tab-content">
                     <div data-v-45c87718="" data-v-a42e5b2c="" class="outer-cover text-left n-preview showCta showHeroImage">
                        <div data-v-45c87718="" class="simple-block notification-redirect-url">

                              <div data-v-45c87718="" class="placeholder-circle"></div>
                              <div data-v-45c87718="" class="text-block">
                                 <div data-v-45c87718="" class="title-block pushTitle"><?= $wppNotificationTitle; ?></div>
                                 <div data-v-45c87718="" class="domain-block"><?= $_SERVER['HTTP_HOST']; ?></div>
                                 <div data-v-45c87718="" class="subtitle-block pushBody"><?= $wppNotificationMsg; ?></div>
                              </div>
                              <?php if ($wppNotificationIcon) { ?>
                                 <div data-v-45c87718="" class="logo-block ">
                                    <img data-v-45c87718="" src="<?php if ($wppNotificationIcon) echo  $wppNotificationIcon; ?>" class="js-campaign-preview-img" alt="">
                                 </div>
                              <?php } ?>
                           
                        </div>
                     </div>

                  </div>
                  <div class="pushPreviewContents tab-content">
                     <div class="androidPreviewWrapper panel-body row">
                        <div class="android-notification-wrapper">
                           <div class="androidNotificationContent">
                              <div class="androidNotificationInfo">
                                 <span class="androidNotificationBadge">
                                    <svg style="display:inline-block" version="1.1" id="Layer_1"   x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                                       <g>
                                          <path fill="#777" d="M56.408,73.067l-15.378,25.63c-11.794-1.777-19.914-7.766-27.838-16.835 C5.265,72.797,1.302,62.174,1.302,50c0-8.495,0.941-14.302,5.126-21.786l20.504,32.038c7.259,9.852,14.097,15.378,21.786,15.378 C53.845,75.63,56.408,73.067,56.408,73.067z" />
                                          <path fill="#777" d="M26.436,43.723L10.728,20.153c4.565-5.707,10.891-10.767,17.486-14C34.807,2.919,42.391,1.302,50,1.302 c21.786,0,37.977,15.714,42.29,23.067c0,0-40.719,0-42.29,0c-5.707,0-10.813,1.722-15.313,5.209 C30.184,33.067,27.831,38.271,26.436,43.723z" />
                                          <path fill="#777" d="M66.66,30.777h28.193c2.283,5.706,3.845,13.01,3.845,19.223c0,13.316-4.694,24.729-14.077,34.24 C75.235,93.752,61.534,98.698,50,98.698l20.544-34.431c2.915-4.31,3.805-9.066,3.805-14.267 C74.349,43.027,71.606,35.723,66.66,30.777z" />
                                          <circle fill="#777" cx="50" cy="50" r="16.66" />
                                       </g>
                                    </svg>
                                 </span>
                                 <span class="androidNotificationBrowser">Chrome • <?= $_SERVER['HTTP_HOST'];?> • now</span>
                              </div>
                              <div class="androidNotifiationText">
                                 <div class="androidNotificationBody">
                                    <div class="androidNotificationText">
                                       <div class="androidNotificationTitle pushTitle"><?= $wppNotificationTitle; ?></div>
                                       <div class="androidNotificationMessage pushBody" <?php if($wppNotificationImage) { ?> style="height:14px;"<?php } ?>><?= $wppNotificationMsg; ?></div>
                                    </div>
                                 </div>
                                 <div class="androidNotificationIcon">
                                    <div <?php if ( $wppNotificationIcon){ ?> style="display:none" <?php } ?> class="androidDefultIcon">W</div>
                                    <img <?php if ( ! $wppNotificationIcon){ ?> style="display:none" <?php } ?> class="android-notification-icon" src="<?php if ($wppNotificationIcon) echo  $wppNotificationIcon; ?>" alt="">
                                 </div>
                              </div>
                              <div class="androidNotificationImage">
                                 <img style="" class="pushpreviewimage" src="<?php if( $wppNotificationImage ) echo  $wppNotificationImage; ?>" alt="">
                              </div>
                           </div>

                           <div class="adnroidNotificationSettings">
                              <span >SITE SETTINGS</span>
                           </div>
                        </div>
                     </div>

                  </div>
               </div>
            </div>
         </div>
      </div>

      <div class="row mt-4 mb-4">
         <div class="col" style="justify-content: center; display: flex; align-items: center; margin-left:40px;">
            <a href="/wp-admin/post.php?post=<?= $post->ID;?>&action=edit" style="margin-right:5px;">&larr; Go back</a>
            <input style="margin-left:5px;" id="webpushr_notification_preview_button" name="save" <?php if( ! $wppNotificationMsg ){ ?> disabled title="Post message not set" <?php } else{ ?> title="" <?php } ?>   type="submit" class="btn btn-primary" value="Send me test notification">
            <span class="spinner"></span>
         </div>
      </div>

      <div class="row mt-4 mb-5 text-center">
         <div class="col" style=";">❤️  Like Webpushr?  <a target="_blank" href="https://wordpress.org/support/plugin/webpushr-web-push-notifications/reviews/#new-post">Please leave us a review →</a></div>
      </div>


<?php

   $response = wpp_api_request('https://api.webpushr.com/v1/wordpress_preview',array());   
?>
</body>
</html>
<script>


      var $ = jQuery;
     var $fancyTabs = $('.fancy-tab');

  if ($fancyTabs.length) {
    var Selector = {
      TAB_BAR: '.nav-bar',
      TAB_BAR_ITEM: '.nav-bar-item',
      TAB_CONTENTS: '.tab-contents'
    };
    var ClassName = {
      ACTIVE: 'active',
      TRANSITION_REVERSE: 'transition-reverse',
      TAB_INDICATOR: 'tab-indicator'
    };
    /*-----------------------------------------------
    |   Function for active tab indicator change
    -----------------------------------------------*/

    var updateIncicator = function updateIncicator($indicator, $tabs, $tabnavCurrentItem) {
      var _$tabnavCurrentItem$p = $tabnavCurrentItem.position(),
          left = _$tabnavCurrentItem$p.left;

      var right = $tabs.children(Selector.TAB_BAR).outerWidth() - (left + $tabnavCurrentItem.outerWidth());
      $indicator.css({
        left: left,
        right: right
      });
    };

    $fancyTabs.each(function (index, value) {
      var $tabs = $(value);
      var $navBar = $tabs.children(Selector.TAB_BAR);
      var $tabnavCurrentItem = $navBar.children(Selector.TAB_BAR_ITEM + "." + ClassName.ACTIVE);
      $navBar.append("\n        <div class=" + ClassName.TAB_INDICATOR + "></div>\n      ");
      var $indicator = $navBar.children("." + ClassName.TAB_INDICATOR);
      var $preIndex = $tabnavCurrentItem.index();
      updateIncicator($indicator, $tabs, $tabnavCurrentItem);
      $navBar.children(Selector.TAB_BAR_ITEM).click(function (e) {
        $tabnavCurrentItem = $(e.currentTarget);
        var $currentIndex = $tabnavCurrentItem.index();
        var $tabContent = $tabs.children(Selector.TAB_CONTENTS).children().eq($currentIndex);
        $tabnavCurrentItem.siblings().removeClass(ClassName.ACTIVE);
        $tabnavCurrentItem.addClass(ClassName.ACTIVE);
        $tabContent.siblings().removeClass(ClassName.ACTIVE);
        $tabContent.addClass(ClassName.ACTIVE);
        /*-----------------------------------------------
        |   Indicator Transition
        -----------------------------------------------*/

        updateIncicator($indicator, $tabs, $tabnavCurrentItem);

        if ($currentIndex - $preIndex <= 0) {
          $indicator.addClass(ClassName.TRANSITION_REVERSE);
        } else {
          $indicator.removeClass(ClassName.TRANSITION_REVERSE);
        }

        $preIndex = $currentIndex;
      });
    });
  }

   if( Notification.permission != 'granted' ){
      document.getElementById('webpushr_notification_preview_button').setAttribute('disabled','disabled');
      document.getElementById('webpushr_notification_preview_button').setAttribute('title','You are not subscribed to push');
   }
   // if( document.getElementById('wpp_send_new_post_notification').getAttribute('checked') != 'checked' ){
   //    jQuery('.webpushr-metabox').attr('disabled','disabled');
   // }
   // jQuery("#wpp_send_new_post_notification").click(function(){
   //    if( jQuery(this).prop('checked') == false )
   //       jQuery('.webpushr-metabox').attr('disabled','disabled');
   //    else
   //       jQuery('.webpushr-metabox').removeAttr('disabled');
   // });
   
   
   jQuery("#webpushr_notification_preview_button").click(function(){
      $this = jQuery(this);
      $this.attr('disabled','disabled');
      jQuery(".spinner").css('visibility','visible');
      jQuery.ajax({
         url :  '/wp-admin/admin-ajax.php',
         data: {action : 'webpushr_test_notification', post_id : <?php echo $post_id;?>},
         type:'POST',
         success:function(){
            $this.removeAttr('disabled');
            jQuery(".spinner").css('visibility','hidden');

         }
      });      
   })

</script>
<?php insert_webpushr_script(); ?>