(function (e, f) {
    var b = {};
    var g = function (a) {
        if(b[a]) { 
            f.clearInterval(b[a]);
            b[a] = null;
        };
    };

    e.fn.waitUntilExists = function (s, h, o, c) {
        if(o == null || o == undefined) o = 0;
        var d = e(s)
        var k = d.not(function () {
            return e(this).data("waitUntilExists.found");
        });

        if (h === "remove") {
            g(s);
        } else {
            if( typeof h !== 'undefined')
                k.each(h).data("waitUntilExists.found", !0);
                
            if (o && d.length) {
                g(s);
            }
            else if (!c) {
                b[s] = f.setInterval(function () {
                    d.waitUntilExists(s, h, o, !0);
                }, 500);
            }
        }
        return d
    }
})(jQuery, window);

//if preview button set to hidden by admin
//we checked this condition based on preview button in the webpushr metabox
//if the button is not present in the metabox do not show the preview button in the top bar

jQuery(".edit-post-header-toolbar").waitUntilExists(".edit-post-header-toolbar",function(){
   jQuery("#editor").find(".edit-post-header-toolbar").append('<div id="webpushr_13fw3_switch-mode" style="margin:0 15px;"><button id="webpushr_13fw3_switch-mode-button" onclick="webpushr_notification_preview(this);" type="button" class="button button-primary  "><svg style="width:25px; height:25px; margin-bottom:-4px;" version="1.0"   viewBox="0 0 1480.000000 303.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(-000.000000,903.000000) scale(0.3500,-0.3500)" fill="#484848" stroke="none"><path fill="#fff" d="M1153 2955 c-202 -38 -401 -123 -553 -235 -151 -111 -294 -278 -383 -447 -43 -81 -102 -258 -122 -363 -50 -260 -5 -571 116 -812 84 -167 246 -358 394 -463 l64 -46 -92 -142 c-51 -78 -125 -192 -165 -253 -40 -61 -72 -113 -72 -116 0 -6 47 6 450 113 124 32 279 73 345 90 630 165 742 201 876 280 316 185 542 497 621 856 30 138 30 387 0 523 -112 510 -494 893 -1002 1005 -103 23 -381 29 -477 10z m267 -540 c39 -20 50 -43 50 -109 l0 -55 43 -12 c61 -16 152 -74 191 -122 69 -86 84 -136 96 -327 12 -190 42 -303 107 -401 19 -29 24 -47 21 -85 l-3 -49 -552 -3 -553 -2 0 59 c0 37 5 63 14 70 23 20 75 144 91 221 9 41 20 134 24 206 10 152 30 224 80 291 44 58 129 119 191 137 l45 13 5 54 c10 105 73 154 150 114z m90 -1280 c0 -130 -168 -193 -244 -92 -25 34 -42 90 -31 107 4 6 60 10 141 10 l134 0 0 -25z"></path></g></svg><span id="webpushr_13fw3_preview-btn-text" style="margin-bottom:3px; display:inline-block;">Webpushr Preview</span></button></div>');
})

jQuery("#elementor-switch-mode-button").waitUntilExists("#elementor-switch-mode-button",function(){
   jQuery("#elementor-switch-mode-button,#elementor-editor-button").on('click',function(){
       jQuery("#wpp_send_new_post_notification").prop('checked',false);
   });
})



function webpushr_notification_preview(ele){
    jQuery(ele).css('opacity',".65");
    jQuery("#webpushr_13fw3_preview-btn-text").text("Generating Preview...");
    var wpEditor = wp.data.dispatch('core/editor');
    wpEditor.savePost();
    webpushrPreviewRedirectWhenSave();
}

function webpushrPreviewRedirectWhenSave(){
    $post_id = jQuery("#post_ID").val();
    jQuery("#wpp_send_new_post_notification").prop('checked',false);

    setTimeout(function () {
        if (wp.data.select('core/editor').isSavingPost()) {
          webpushrPreviewRedirectWhenSave();
        } else {
          location.href = "?p="+ $post_id +"&action=webpushr-preview";
        }
    }, 300);
}