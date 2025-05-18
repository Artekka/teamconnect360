<?php
/**
 * BuddyPress - Users Home
 *
 * @package BuddyPress
 * @subpackage bp-legacy
 */
?>

<div id="buddypress">

	<?php do_action( 'bp_before_member_home_content' ); ?>

	<div id="item-header" role="complementary">
		<?php bp_get_template_part( 'members/single/member-header' ); ?>
	</div><!-- #item-header -->

	<div id="item-nav">
		<div class="item-list-tabs no-ajax" id="object-nav" role="navigation">
			<ul>
				<?php /* bp_get_displayed_user_nav(); */?>
				<?php /* do_action( 'bp_member_options_nav' ); */?>
			</ul>
		</div>
	</div><!-- #item-nav -->

	<div id="item-body" role="main">

		<?php
		if ( bp_is_user_front() ) :
			// Only display the Groups component on the overview page
			if ( bp_is_active( 'groups' ) ) :
		?>
			<div class="item-list-tabs no-ajax" id="subnav" role="navigation">
				<ul>
					<li class="current selected" id="groups-all">
						<a href="<?php echo bp_displayed_user_domain() . bp_get_groups_slug(); ?>"><?php printf( __( 'Groups <span>%s</span>', 'buddypress' ), bp_get_total_group_count_for_user() ); ?></a>
					</li>
					<?php do_action( 'bp_groups_directory_group_filter' ); ?>
				</ul>
			</div>

			<h2 class="bp-screen-title"><?php _e( 'Member Groups', 'buddypress' ); ?></h2>
			
			<?php
			// Load the Groups content
			bp_get_template_part( 'members/single/groups' );
			?>

		<?php
			endif;
		else :
			// Load the appropriate template based on which component is being viewed
			bp_get_template_part( 'members/single/' . bp_current_component() );
		endif; ?>

		<?php do_action( 'bp_after_member_body' ); ?>

	</div><!-- #item-body -->

	<?php do_action( 'bp_after_member_home_content' ); ?>

</div><!-- #buddypress -->