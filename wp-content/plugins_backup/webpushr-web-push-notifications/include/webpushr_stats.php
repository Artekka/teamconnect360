<?php if( ! defined('ABSPATH') ) exit; ?>

<div class="webpushr_13fw3_container wpp-notification-stats">
	<div class="webpushr_13fw3_card webpushr_13fw3_mb-3">
		<div class="bg-holder d-lg-block bg-card" style="background-image:url(<?php echo plugins_url("images/illustrations/corner-4.png", __DIR__);?>);"></div>        
		<div class="card-body">
			<h3 class="webpushr_13fw3_m-0">Webpushr Notifications</h3>
		</div>
	</div>

	<?php 						
		$status = wpp_api_request('https://api.webpushr.com/v1/notification/status/all/' . (isset($_GET['paged'])?$_GET['paged']:1) );
		$webpushr_api_response_code = $status['http_code'];
		$date_format= get_option('date_format') . ' ' . get_option('time_format');
	?>

    <?php if( ! empty($status['response_array']['subscription_status'])  ){ ?>
        <div class="webpushr_13fw3_card webpushr_13fw3_mb-3 wpp-subscription-notice" style="display:block;">
            <div class="card-body">
                <h6 class="webpushr_13fw3_m-0"><img class="wpp_warning_icon" src="<?php echo plugins_url("images/wpp_warning.png", __DIR__);?>"> <?php echo $status['response_array']['subscription_status']['description'];?><span></span></h6>
            </div>
        </div>    
    <?php } ?>


	<div class="webpushr_13fw3_card webpushr_13fw3_mb-3">
		<div class="card-header">
			<h4>Notifications Status</h4>
		</div>
		<div class="card-body wpp-bg-light">
			<div class="row">
				<?php if( $webpushr_api_response_code == 200 ){ ?>
					<div class="col-12">
						<?php 

							if (!$status) { ?>
								<div class="row">
									<div class="col-lg-12 no-record-notice">
											<p class="mt-2">No notification found.</p>
									</div>
								</div>
							<?php } else { ?>
								<table class="table table-sm table-segments data-table display responsive no-wrap webpushr_13fw3_mb-0 fs--1 w-100">
									<thead class="webpushr_13fw3_bg-200">
										<tr>
											<th> ID </th>
											<th class="white-space-wrap" style="width:150px;"> Name </th>
											<th> Date Created </th>
											<th class="webpushr_13fw3_text-center"> Status </th>
											<th class="webpushr_13fw3_text-center ">  Total<br>Attempts<br> <div class="webpushr_13fw3_info"><span class="dashicons dashicons-editor-help"></span><p>Number of notifications we attempted to send to unique users.</p></div></th>
											<th class="webpushr_13fw3_text-center "> Successfully<br>Sent<br/> <div class="webpushr_13fw3_info"><span class="dashicons dashicons-editor-help"></span><p>Number of notifications successfully sent to unique users.</p></div></th>
											<th class="webpushr_13fw3_text-center "> Failed<br>to Send<br> <div class="webpushr_13fw3_info"><span class="dashicons dashicons-editor-help"></span><p>Number of notifications we were NOT able to successfully send because the users are no longer active.</p></div></th>
											<th class="webpushr_13fw3_text-center"> Delivered <div class="webpushr_13fw3_info"><span class="dashicons dashicons-editor-help"></span><p>Number of notifications delivered to unique users. This number can increase over time as more notifications get delivered. Unfortunately, Apple Safari does not provide us with delivery receipts - this number therefore excludes successful deliveries to Safari browser.</p></div></th>
											<th class="webpushr_13fw3_text-center"> Clicked <div class="webpushr_13fw3_info"><span class="dashicons dashicons-editor-help"></span><p>Number of notifications that were actively clicked by users. This number can increase over time as more people are able to receive notifications and click on it. Unfortunately, Apple Safari does not provide us with click information - this number therefore excludes successful clicks by Mac users.</p></div></th>
											<th class="webpushr_13fw3_text-center"> Closed <div class="webpushr_13fw3_info"><span class="dashicons dashicons-editor-help"></span><p>Number of notifications that were actively closed by users. This number can increase over time as more people are able to receive notifications and close it. Unfortunately, Apple Safari does not provide us with this event information - this number therefore excludes close events performed by Mac users.</p></div></th>
										</tr>
									</thead>
									<tbody class="bg-white">
										<?php if( ! empty($status['response_array']['notifications']['status']) ) foreach ($status['response_array']['notifications']['status'] as $c) { ?>
											<tr>
												<td class="subscriberid"><?php echo $c['id']; ?></td>
												<td class="white-space-wrap"><?php echo $c['name']; ?> </td>
												<td><?php echo get_date_from_gmt($c['date_time'], $date_format ); ?></td>
												<td class="webpushr_13fw3_text-center"><?php
																							if($c['status'] == 'Sent')
																									echo "<span class='badge badge-soft-success'>" . $c['status'] . "</span>";

																							elseif($c['status'] == 'Sending')
																									echo "<a class='sending-notification-badge' href='/campaigns'><span class='badge badge-soft-success'><i class='fas fa-sync'></i> " . $c['status'] . ' (' . $c['percent'] . ")</span></a>";

																							elseif($c['status'] == 'Draft')
																									echo "<span class='badge badge-soft-secondary'>" . $c['status'] . "</span>";

																							elseif($c['status'] == 'Active')
																									echo "<span class='badge badge-soft-primary'>" . $c['status'] . "</span>";

																							elseif($c['status'] == 'Scheduled')
																									echo "<span class='badge badge-soft-info'>" . $c['status'] . "</span>";

																							elseif($c['status'] == 'Error')
																									echo "<span class='badge badge-soft-danger'>" . $c['status'] . "</span>";

																							else
																									echo "<span class='badge badge-soft-dark'>" . $c['status'] . "</span>";
																						// }

																						?></td>
												<?php if( $c['comment'] ){ ?>
														<td class="webpushr_13fw3_text-center" colspan="6"><?php echo $c['comment'];?> </td>
												<?php } else { ?>

													<td class="webpushr_13fw3_text-center"><?php echo ! isset($c['total'])? '' : $c['total']; ?> </td>
													<td class="webpushr_13fw3_text-center"><?php echo ! isset($c['success'])? '' : $c['success']; ?> </td>
													<td class="webpushr_13fw3_text-center"><?php echo ! isset($c['failed'])? '' : $c['failed']; ?> </td>
													<td class="webpushr_13fw3_text-center"><?php echo ! isset($c['delivered'])? '' : $c['delivered']; ?> </td>
													<td class="webpushr_13fw3_text-center"><?php echo ! isset($c['clicked'])? '' : $c['clicked']; ?> </td>
													<td class="webpushr_13fw3_text-center"><?php echo ! isset($c['closed'])? '' : $c['closed']; ?> </td>
												<?php } ?>

											</tr>
										<?php } ?>
									</tbody>
								</table>
								<nav class="webpushr_13fw3_navigation">
									<ul class="pagination">
										<?php wpp_pagination(isset($_GET['paged'])?$_GET['paged']:1,ceil($status['response_array']['notifications']['total'] / 10)); ?>
									</ul>
								</nav>
							<?php } 
						?>
					</div>
				<?php } else { ?>
					<div class="col-12"><?php echo $status['response_array']['description'];?></div>
				<?php } ?>

			</div>
		</div>
</div>