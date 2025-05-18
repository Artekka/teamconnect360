<?php if( ! defined('ABSPATH') ) exit; ?>


<div class="webpushr_13fw3_container">   

    <div class="webpushr_13fw3_card webpushr_13fw3_mb-3">
        <div class="bg-holder d-lg-block bg-card" style="background-image:url(<?= plugins_url("images/illustrations/corner-4.png", __DIR__);?>);"></div>        
        <div class="card-body">
            <h3 class="webpushr_13fw3_mb-0 webpushr_13fw3_mt-0">Manual Push</h3>
            <p class="webpushr_13fw3_mt-2">You can create a campaign below to send a manual push notification to your users. Campaigns can be sent instantly or scheduled to be sent at a later date. You can also see detailed analytics on each campaign after it has been sent to your users.</p>
        </div>
    </div>

    <?php 
        $selectedSegments = @json_decode(get_option('wpp_post_sendTo'));
        $segments = wpp_api_request('https://api.webpushr.com/v1/segments');
    ?>

    <?php if( $segments['response_array']['subscription_status'] ){ ?>
        <div class="webpushr_13fw3_card webpushr_13fw3_mb-3 wpp-subscription-notice" style="display:block;">
            <div class="card-body">
                <h6 class="m-0"><img class="webpushr_13fw3_warning_icon" src="<?= plugins_url("images/wpp_warning.png", __DIR__);?>"> <?= $segments['response_array']['subscription_status']['description'];?><span></span></h6>
            </div>
        </div>    
    <?php } ?>



    <div class="webpushr_13fw3_card webpushr_13fw3_mb-3">
        <div class="card-header"><h4>New Notification</h4></div>    
        <div class="card-body webpushr_13fw3_bg-light">
            <p class="webpushr_13fw3_mt-5 webpushr_13fw3_mb-5" style="text-align:center">Please use <a href="https://app.webpushr.com/campaigns">Webpushr Web Console</a> in order to send a manual notification</p>
        </div>   

    </div>

</div>

