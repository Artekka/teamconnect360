<?php if( ! defined('ABSPATH') ) exit; ?>

<div class="webpushr_13fw3_container webpushr_13fw3_dashboard">
    <div class="webpushr_13fw3_card webpushr_13fw3_mb-3">
        <div class="bg-holder d-lg-block bg-card" style="background-image:url(<?= plugins_url("images/illustrations/corner-4.png", __DIR__);?>);"></div>        
        <div class="card-body">
            <h3 class="webpushr_13fw3_m-0">Webpushr Dashboard</h3>
        </div>
    </div>    


    <div class="webpushr_13fw3_card webpushr_13fw3_mb-3 webpushr_13fw3_subscription-notice">
        <div class="card-body">
            <h6 class="webpushr_13fw3_m-0"><img class="webpushr_13fw3_warning_icon" src="<?= plugins_url("images/wpp_warning.png", __DIR__);?>"><span></span></h6>
        </div>
    </div>    

    <div class="webpushr_13fw3_card webpushr_13fw3_mb-3">
        <div class="card-body webpushr_13fw3_rounded-soft webpushr_13fw3_bg-gradient webpushr_13fw3_pt-4">
            <h3 class="webpushr_13fw3_text-white webpushr_13fw3_mb-4 webpushr_13fw3_mt-0">New Users <div class="webpushr_13fw3_info"><span class="dashicons dashicons-editor-help"></span><p>Count of new users who optin to receive push notifications.</p></div></h3>
            <span class="spinner"></span>
            <canvas dir="ltr" class="rounded" id="chart-line" width="1618" height="375" aria-label="Line chart" role="img"></canvas>
        </div>
    </div>



    <div class="webpushr_13fw3_card webpushr_13fw3_mb-3 webpushr_13fw3_review-section">
        <div class="card-body">
            <p style="margin-right:50px;">❤️ Like Webpushr? <a target="_blank" href="https://wordpress.org/support/plugin/webpushr-web-push-notifications/reviews/#new-post">Please leave us a review →</a></p>
            <p>Got a question? <a target="_blank" href="mailto:support@webpushr.com">Ask us now →</a></p>
        </div>
    </div>   

    <div class="webpushr_13fw3_card-deck ">
        <div class="webpushr_13fw3_card webpushr_13fw3_mb-3 overflow-hidden" style="min-width: 12rem">
            <div class="bg-holder bg-card" style="background-image:url(<?= plugins_url("images/illustrations/corner-1.png",__DIR__);?>);">
            </div>
            <!--/.bg-holder-->

            <div class="card-body position-relative">
                <h6>Active Users <div class="webpushr_13fw3_info"><span class="dashicons dashicons-editor-help"></span><p>Number of users that can receive your notifications. You might notice this number will decrease after you send a notification. This is because sending a notification helps us determine if a user is unsubscribed.</p></div></h6>
                <div class="webpushr_13fw3_display-4 webpushr_13fw3_webpushr_13fw3_fs-4 webpushr_13fw3_webpushr_13fw3_mb-2 webpushr_13fw3_font-weight-normal webpushr_13fw3_text-sans-serif webpushr_13fw3_active-subscribers"><span class="spinner"></span></div>
            </div>
        </div>
        <div class="webpushr_13fw3_card webpushr_13fw3_mb-3 overflow-hidden" style="min-width: 12rem">
            <div class="bg-holder bg-card" style="background-image:url(<?= plugins_url("images/illustrations/corner-2.png",__DIR__);?>);">
            </div>
            <!--/.bg-holder-->

            <div class="card-body position-relative">
                <h6>Optin Rate <div class="webpushr_13fw3_info"><span class="dashicons dashicons-editor-help"></span><p>Example: 20% means that 20% users opted to receive notifications from you and 80% actively rejected to receive notifications from you.</p></div></h6>
                <div class="webpushr_13fw3_display-4 webpushr_13fw3_fs-4 webpushr_13fw3_mb-2 webpushr_13fw3_font-weight-normal webpushr_13fw3_text-sans-serif webpushr_13fw3_text-info webpushr_13fw3_optin-rate"><span class="spinner"></span></div><a class="font-weight-semi-bold fs--1 text-nowrap" target="_blank" href="https://app.webpushr.com/logs/subscribers">See all<svg class="webpushr_13fw3_svg-inline--fa fa-angle-right fa-w-8 webpushr_13fw3_ml-1" data-fa-transform="down-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img"  viewBox="0 0 256 512" data-fa-i2svg="" style="transform-origin: 0.25em 0.5625em;"><g transform="translate(128 256)"><g transform="translate(0, 32)  scale(1, 1)  rotate(0 0 0)"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" transform="translate(-128 -256)"></path></g></g></svg></a>
            </div>
        </div>
        <div class="webpushr_13fw3_card webpushr_13fw3_mb-3 overflow-hidden" style="min-width: 12rem">
            <div class="bg-holder bg-card" style="background-image:url(<?= plugins_url("images/illustrations/corner-3.png",__DIR__);?>);">
            </div>
            <!--/.bg-holder-->
            <div class="card-body position-relative">
                <h6>Total Lifetime Users <div class="webpushr_13fw3_info"><span class="dashicons dashicons-editor-help"></span><p>All users that have ever opted to receive notifications. This number does not decrease even if users unsubscribe.</p></div></h6>
                <div class="webpushr_13fw3_display-4 webpushr_13fw3_fs-4 webpushr_13fw3_mb-2 webpushr_13fw3_font-weight-normal webpushr_13fw3_text-sans-serif webpushr_13fw3_text-warning webpushr_13fw3_total-subscribers"><span class="spinner"></span></div><a class="font-weight-semi-bold fs--1 text-nowrap" target="_blank" href="https://app.webpushr.com/subscribers">See all<svg class="webpushr_13fw3_svg-inline--fa fa-angle-right fa-w-8 webpushr_13fw3_ml-1" data-fa-transform="down-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img"  viewBox="0 0 256 512" data-fa-i2svg="" style="transform-origin: 0.25em 0.5625em;"><g transform="translate(128 256)"><g transform="translate(0, 32)  scale(1, 1)  rotate(0 0 0)"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" transform="translate(-128 -256)"></path></g></g></svg></a>
            </div>

        </div>
    </div>


    <div class="webpushr_13fw3_card-deck ">

        <div class="webpushr_13fw3_card webpushr_13fw3_mb-3 webpushr_13fw3_pb-3">
            <div class="card-header">
                <h6 class="webpushr_13fw3_mb-0">Browsers</h6>
            </div>
            <div class="card-body  browser-chart webpushr_13fw3_p-0">
                <span class="spinner webpushr_13fw3_mb-3"></span>
            </div>
        </div>

        <div class="webpushr_13fw3_card webpushr_13fw3_mb-3 webpushr_13fw3_pb-3">
            <div class="card-header">
                <h6 class="webpushr_13fw3_mb-0">Devices</h6>
            </div>
            <div class="card-body  device-chart webpushr_13fw3_p-0">
                <span class="spinner webpushr_13fw3_mb-3"></span>
            </div>
        </div>

        <div class="webpushr_13fw3_card webpushr_13fw3_mb-3 webpushr_13fw3_pb-3">
            <div class="card-header">
                <h6 class="webpushr_13fw3_mb-0">Operating Systems</h6>
            </div>
            <div class="card-body  os-chart webpushr_13fw3_p-0">
                <span class="spinner webpushr_13fw3_mb-3"></span>
            </div>
        </div>

    </div>

    <div class="webpushr_13fw3_card webpushr_13fw3_mb-3 ">
        <div class="card-header">
            <div class="row align-items-center justify-content-between">
                <div class="col-6 col-sm-auto d-flex align-items-center pr-0">
                    <h5 class="fs-0 webpushr_13fw3_mb-0 text-nowrap py-2 py-xl-0">Recent Subscription Activity</h5>
                </div>
            </div>
        </div>
        <div class="card-body subscribers-log webpushr_13fw3_p-0">
            <span class="spinner mb-5"></span>
        </div>
        <div class="card-footer border-top">
            <div class="row align-items-center">
                <div class="col">
                    <p class="webpushr_13fw3_mb-0 fs--1 text-left"><a class="font-weight-semi-bold" target="_blank" href="https://app.webpushr.com/logs/subscribers">View All<svg class="webpushr_13fw3_svg-inline--fa fa-angle-right fa-w-8 webpushr_13fw3_ml-1" data-fa-transform="down-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img"  viewBox="0 0 256 512" data-fa-i2svg="" style="transform-origin: 0.25em 0.5625em;"><g transform="translate(128 256)"><g transform="translate(0, 32)  scale(1, 1)  rotate(0 0 0)"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" transform="translate(-128 -256)"></path></g></g></svg></a></p>
                </div>
            </div>
        </div>
    </div>
</div>

<script>

jQuery(document).ready(function(){

    /*-----------------------------------------------
    |   Chart Initialization
    -----------------------------------------------*/

    var newChart = function newChart(chart, config) {
        var ctx = chart.getContext('2d');
        return new window.Chart(ctx, config);
    };
    /*-----------------------------------------------
    |   Line Chart
    -----------------------------------------------*/
    var chartLine = document.getElementById('chart-line');
    var chartBrowsers = document.getElementById('chart-browsers');
    var chartDevices = document.getElementById('chart-devices');
    var chartOS = document.getElementById('chart-os');

    var line_chart_options = {
        type: 'line',
        data: {
            labels: '',
            datasets: [{
                borderWidth: 2,
                data: '',
                borderColor: 'rgba(255,255,255, 0.8)',
                backgroundColor: 'rgba(255,255,255, 0.15)',
            }]
        },
        options: {
            legend: {
                display: false
            },
            layout: {
                padding: {
                top: 5
                }
            },         
            tooltips: {
                mode: 'x-axis',
                xPadding: 20,
                yPadding: 10,
                displayColors: false,
                callbacks: {
                    label: function label(tooltipItem) {
                        return tooltipItem.xLabel + " - " + tooltipItem.yLabel + " Subscribers";
                    },
                    title: function title() {
                        return null;
                    }
                }
            },
            hover: {
                mode: 'label'
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        show: true,
                        labelString: 'Month'
                    },
                    ticks: {
                        fontColor: 'rgba(255,255,255, 0.7)',
                        fontStyle: 600
                    },
                    gridLines: {
                        color: 'rgba(255,255,255, 0.1)',
                        lineWidth: 1
                    }
                }],
                yAxes: [{
                    display: false
                }]
            }
        }
    }
    
    <?php 
        $time_zone  = get_option('gmt_offset') * 60;//timezone diffefence in minutes
        $date_format= get_option('date_format') . ' ' . get_option('time_format');
        $end_point  = 'https://api.webpushr.com/v1/dashboard';
        $dashboard  = wpp_api_request($end_point, array('time_zone' => $time_zone, 'date_format' => $date_format )); 
    ?>



    jQuery(".spinner").hide();
    data = <?= $dashboard['response_json']; ?>;
    line_chart_options.data.datasets[0].data = data.subscriber_chart.total;
    line_chart_options.data.labels = data.subscriber_chart.day;
    line_chart_options.type = 'line';
    jQuery("#line-chart-loader").remove();
    newChart(chartLine, line_chart_options);

    jQuery(".webpushr_13fw3_total-subscribers").text(data.subscribers_count.total);
    jQuery(".webpushr_13fw3_active-subscribers").text(data.subscribers_count.active);
    jQuery(".webpushr_13fw3_optin-rate").text(data.optin_rate);

    jQuery(".browser-chart").html(data.browsers);
    jQuery(".device-chart").html(data.devices);
    jQuery(".os-chart").html(data.os);
    jQuery(".subscribers-log").html(data.subscribers_logs);
    if( data.subscription_status ){
        jQuery(".webpushr_13fw3_subscription-notice").show();
        jQuery(".webpushr_13fw3_subscription-notice h6 span").html(data.subscription_status.description);
    }
    
    
});

</script>
