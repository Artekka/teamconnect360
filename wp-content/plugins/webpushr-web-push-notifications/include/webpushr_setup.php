<?php if( ! defined('ABSPATH') ) exit; ?>
<div class="webpushr_13fw3_container webpushr_13fw3_setup_container <?php if( ! get_option('webpushr_public_key') ){ ?> webpushr_13fw3_container_column <?php } ?>">   

    <?php if( isset($segments['response_array']['subscription_status']) ){ ?>
        <div class="webpushr_13fw3_card webpushr_13fw3_webpushr_13fw3_mb-3 wpp-subscription-notice" style="display:block;">
            <div class="card-body">
                <h6 class="m-0"><img class="wpp_warning_icon" src="<?= plugins_url("images/wpp_warning.png", __DIR__);?>"> <?= $segments['response_array']['subscription_status']['description'];?><span></span></h6>
            </div>
        </div>    
    <?php } ?>

    <div class="webpushr_13fw3_card webpushr_13fw3_mr-2">
        <div class="card-header"><h4 style="font-size:16px;">Existing Webpushr Customers</h4></div>
        <form method="post" action="" onsubmit="jQuery('#submit.webpushr_13fw3_btn').val('Activating...')">
            <?php wp_nonce_field( 'wpp_setup_nounce_action', 'wpp_setup_nonce_field' ); ?>
            <div class="card-body webpushr_13fw3_bg-light">
                <p class="webpushr_13fw3_mb-4 webpushr_13fw3_mt-0">Please enter the REST API KEY in the field bellow. You can find this under <strong>Integration</strong> > <strong>WordPress</strong> in <a href="https://app.webpushr.com/integration/wordpress-plugin" target="_blank">Webpushr Web Console</a>.</p>
                <strong class="webpushr_13fw3_mb-2" style="display:block;"><label for="webpushr_rest_key">REST API Key</label></strong>
                <input required name="webpushr_rest_key" type="text" id="webpushr_rest_key" aria-describedby="webpushr_rest_key-description" value="<?= esc_attr(get_option('webpushr_private_key'));?>" placeholder="Enter REST API Key" class="webpushr_13fw3_textfield">
                <p class="description" id="webpushr_rest_key-description"></p>
            </div>
            <div class="card-footer">
                <div>
                    <input type="submit" name="frm_wpp_setup" id="submit"  class="webpushr_13fw3_btn btn-primary" value="Activate Webpushr">
                    
                </div>
            </div>
        </form>
    </div>

    <?php if( ! get_option('webpushr_public_key') ){ ?>
        <div class="webpushr_13fw3_card webpushr_13fw3_ml-2">
            <div class="card-header"><h4 style="font-size:16px;">New to Webpushr</h4></div>
            <div class="card-body webpushr_13fw3_bg-light"  style="display:flex; align-items:center; justify-content:center; flex-direction:column">
                <input type="button" name="" id="" onclick="webpushr_signup_popup();" class="webpushr_13fw3_btn btn-primary" value="1-Step Registration">
                <p>Facing Issues? <a href="https://app.webpushr.com/signup" target="_blank">Manually Register on Webpushr.com</a></p>
            </div>
        </div>
    <?php } ?>

</div>
<script>
    function webpushr_signup_popup(){
        window.open('https://app.webpushr.com/signup?url=<?= site_url();?>',"wpushr-signup-dialog","width=600, height=550, resizable=0, scrollbars=0, status=0, titlebar=0, left=" + ((screen.width - 600) / 2) + ", top=" + ((screen.height - 550) / 2)  );
    }


window.addEventListener('message', function(event) { 
	if( event.origin != 'https://app.webpushr.com')
		return;

    jQuery(".webpushr_13fw3_setup_container").addClass("webpushr_13fw3_loading_container");
    jQuery("#webpushr_rest_key").val(event.data);
    jQuery('[name="frm_wpp_setup"]').click();
})

</script>