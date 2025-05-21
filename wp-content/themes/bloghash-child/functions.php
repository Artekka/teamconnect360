<?php
/**
 * Child Theme Functions
 */

 // Load parent theme styles
 add_action( 'wp_enqueue_scripts', 'bloghash_child_enqueue_styles' );
 function bloghash_child_enqueue_styles() {
     wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css', array(), filemtime(get_template_directory() . '/style.css') );
     // Add versioning to child theme stylesheet to force refresh
     wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/style.css', array( 'parent-style' ), filemtime(get_stylesheet_directory() . '/style.css') );
 }

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

add_action( 'bp_setup_nav', function() {
    global $bp;

    bp_core_new_nav_item( array(
        'name'                => 'My Events',
        'slug'                => 'my-events',
        'screen_function'     => 'render_user_rsvp_events',
        'position'            => 50,
        'default_subnav_slug' => 'my-events',
        'show_for_displayed_user' => true,
        'user_has_access'     => bp_is_my_profile() || is_super_admin()
    ) );
} );

add_filter( 'tribe_tickets_rsvp_before_attendee_creation', function ( $attendee, $ticket ) {
    if ( is_user_logged_in() ) {
        $user = wp_get_current_user();
        $email = $user->user_email;

        // Ensure $ticket is a Tribe__Tickets__Ticket_Object and get the event ID
        if ( is_numeric( $ticket ) ) {
            $ticket = tribe_tickets_get_ticket( null, $ticket );
        }

        if ( ! $ticket || ! method_exists( $ticket, 'get_event_id' ) ) {
            return $attendee; // Fail silently if we can't get the event
        }

        $event_id = $ticket->get_event_id();

        global $wpdb;
        $table = $wpdb->prefix . 'tribe_rsvp_attendees';

        $existing = $wpdb->get_var( $wpdb->prepare(
            "SELECT ID FROM $table WHERE email = %s AND event_id = %d",
            $email,
            $event_id
        ) );

        if ( $existing ) {
            wp_die( 'You have already RSVP’d to this event.' );
        }
    }

    return $attendee;
}, 10, 2 );



function render_user_rsvp_events() {
    // Hook into BuddyPress content rendering
    add_action( 'bp_template_content', 'show_user_rsvp_events' );

    // Load the correct BuddyPress profile plugin template
    bp_core_load_template( 'members/single/plugins' );
}

function show_user_rsvp_events() {
    global $wpdb;

    $user_id = absint( bp_displayed_user_id() );
    $user    = get_user_by( 'id', $user_id );

    if ( ! $user ) {
        echo '<p>User not found.</p>';
        return;
    }

    $email = sanitize_email( $user->user_email );

    // Get RSVP post IDs by email
    $rsvp_post_ids = $wpdb->get_col( $wpdb->prepare(
        "SELECT post_id FROM {$wpdb->postmeta}
         WHERE meta_key = '_tribe_rsvp_email'
         AND meta_value = %s",
         $email
    ) );

    if ( empty( $rsvp_post_ids ) ) {
        echo '<p>You haven’t RSVP’d to any events yet.</p>';
        return;
    }

    // Get event IDs related to RSVP posts
    $event_ids = $wpdb->get_col(
        "SELECT meta_value FROM {$wpdb->postmeta}
         WHERE meta_key = '_tribe_rsvp_event'
         AND post_id IN (" . implode(',', array_map('intval', $rsvp_post_ids)) . ")"
    );

    if ( empty( $event_ids ) ) {
        echo '<p>No events found.</p>';
        return;
    }

    // Fetch events
    $events = new WP_Query( array(
        'post_type'      => 'tribe_events',
        'post__in'       => $event_ids,
        'orderby'        => 'meta_value',
        'meta_key'       => '_EventStartDate',
        'order'          => 'ASC',
        'posts_per_page' => -1,
    ) );

    if ( ! $events->have_posts() ) {
        echo '<p>RSVP records found, but no event posts were matched.</p>';
        return;
    }

    // Separate past and upcoming
    $upcoming = [];
    $past = [];
    $now = current_time( 'timestamp' );

    while ( $events->have_posts() ) {
        $events->the_post();
        $start = strtotime( tribe_get_start_date( null, false, 'Y-m-d H:i:s' ) );

        if ( $start >= $now ) {
            $upcoming[] = get_post();
        } else {
            $past[] = get_post();
        }
    }

    wp_reset_postdata();

    // Render helper function
    function render_event_list( $events, $heading ) {
        if ( empty( $events ) ) return;

        echo '<h3>' . esc_html( $heading ) . '</h3>';

        echo '<ul class="user-rsvp-events">';

        foreach ( $events as $event ) {
            setup_postdata( $event );
            $event_id = $event->ID;
            echo '<li class="user-rsvp-list-item">';
            echo '<a class="user-rsvp-link" href="' . esc_url( get_permalink( $event_id ) ) . '">' . esc_html( get_the_title( $event_id ) ) . '</a>';
            echo ' — ' .
                '<span class="user-rsvp-month">' . esc_html( tribe_get_start_date( $event_id, false, 'F' ) ) . '</span> ' .
                '<span class="user-rsvp-day">' . esc_html( tribe_get_start_date( $event_id, false, 'j' ) ) . '</span>, ' .
                '<span class="user-rsvp-year">' . esc_html( tribe_get_start_date( $event_id, false, 'Y' ) ) . '</span> @ ' .
                '<span class="user-rsvp-hour">' . esc_html( tribe_get_start_date( $event_id, false, 'g' ) ) . '</span>:' .
                '<span class="user-rsvp-minute">' . esc_html( tribe_get_start_date( $event_id, false, 'i' ) ) . '</span> ' .
                '<span class="user-rsvp-period">' . esc_html( tribe_get_start_date( $event_id, false, 'a' ) ) . '</span>';
            echo '</li>';
        }

        echo '</ul>';
        wp_reset_postdata();
    }

    // Output sections
    render_event_list( $upcoming, 'Your Upcoming Events' );
    render_event_list( $past, 'Your Past Events' );
}

// Enabling upcoming group events
add_action( 'bp_directory_groups_item', 'tc360_show_group_events_in_directory' );

function tc360_show_group_events_in_directory() {

    // Prevent showing on clubs page, currently page-id-708
    if ( is_page(708) ) {
        return;
    }

    // We're inside the groups loop, so this returns the ID of the club being rendered.
    $group_id = bp_get_group_id();
    if ( empty( $group_id ) ) {
        return;
    }

    /* ---- 1. Pull the next few future events for this club ------------- */
    // Small object‑cache to avoid a DB hit for every page load.
    $cache_key   = 'tc360_dir_events_' . $group_id;
    $events      = wp_cache_get( $cache_key, 'tc360' );

    if ( false === $events ) {
        $events = tribe_get_events( [
            // How many to show under each club row
            'posts_per_page' => 3,
            // Only published, upcoming events
            'starts_after'   => current_time( 'mysql' ),
            // Filter by the ACF/BuddyPress meta key you already store
            'meta_key'       => '_bp_group_id',
            'meta_value'     => $group_id,
            'status'         => 'publish',
        ] );

        // Cache for 5 minutes; adjust as needed
        wp_cache_set( $cache_key, $events, 'tc360', 5 * MINUTE_IN_SECONDS );
    }

    if ( empty( $events ) ) {
        // Nothing upcoming – quietly bail to keep the directory tidy.
        return;
    }

    /* ---- 2. Output a tiny block under the club's listing -------------- */
    echo '<div class="group-event-container">';
    echo '<h3>Upcoming events</h3>';
    echo '<ul class="group-event-list">';

    foreach ( $events as $ev ) {
        echo '<li class="group-event-item">';
        echo '<a class="group-event-link" href="' . esc_url( get_permalink( $ev->ID ) ) . '">' . esc_html( get_the_title( $ev ) ) . '</a> ';
        echo '<span class="group-event-date">(<span class="group-event-month">' . esc_html( tribe_get_start_date( $ev, false, 'M' ) ) . '</span> ';
        echo '<span class="group-event-day">' . esc_html( tribe_get_start_date( $ev, false, 'j' ) ) . '</span>)</span>';
        echo '</li>';
    }

    echo '</ul></div>';
}

//Some tab adding code?
if ( class_exists( 'BP_Group_Extension' ) && function_exists( 'tribe_get_events' ) ) {

    class TC360_Group_Events extends BP_Group_Extension {

        public function __construct() {

            // Nav/tab label
            $this->name = __( 'Events', 'tc360' );

            // URL slug -> /groups/<group>/events/
            $this->slug = 'events';

            // Show the tab (true by default, but being explicit helps)
            $this->enable_nav_item = true;

            // Order in the nav bar
            $this->nav_item_position = 30;

            /* Disable any “Create” or “Manage” screens (read‑only) */
            $this->enable_create_step = false;
            $this->enable_edit_item   = false;

            parent::init();   // <‑‑ finalise the extension setup
        }

        /**
         * Render the tab.
         */
        public function display( $group_id = null ) {

            if ( empty( $group_id ) ) {
                $group_id = bp_get_group_id();
            }
        
            // Pull upcoming events tied to this group
            $events = tribe_get_events( [
                'posts_per_page' => 10,
                'starts_after'   => current_time( 'mysql' ),
                'meta_key'       => '_bp_group_id',
                'meta_value'     => $group_id,
                'status'         => 'publish',
            ] );
        
            /* -------- Output -------- */
            echo '<div class="group-event-container group-event-tab">';
        
            echo '<h3 class="group-event-heading">' . esc_html__( 'Upcoming Events', 'tc360' ) . '</h3>';
        
            if ( empty( $events ) ) {
        
                echo '<p class="group-event-empty">' .
                     esc_html__( 'No upcoming events have been scheduled for this club yet.', 'tc360' ) .
                     '</p>';
        
            } else {
        
                echo '<ul class="group-event-list">';
        
                foreach ( $events as $ev ) {
                    echo '<li class="group-event-item">';
                        echo '<a class="group-event-link" href="' . esc_url( get_permalink( $ev->ID ) ) . '">' .
                             esc_html( get_the_title( $ev ) ) .
                             '</a>';
                        echo '<span class="group-event-date"> (';
                            echo '<span class="group-event-month">' .
                                 esc_html( tribe_get_start_date( $ev, false, 'M' ) ) .
                                 '</span> ';
                            echo '<span class="group-event-day">' .
                                 esc_html( tribe_get_start_date( $ev, false, 'j' ) ) .
                                 ')</span>';
                        echo '</span>';
                    echo '</li>';
                }
        
                echo '</ul>';
            }
        
            echo '</div>';
        }
        
    }

    /**
 * Register the Events tab once BuddyPress finishes booting groups.
 */
// Register the Events tab right now.
if ( class_exists( 'TC360_Group_Events' ) ) {
	bp_register_group_extension( 'TC360_Group_Events' );
}


}



// 2. Add Club Selector Meta Box to Event Edit Screen
add_action( 'add_meta_boxes', function() {
    add_meta_box(
        'tribe_events_club_selector',
        'Club',
        'render_event_club_metabox',
        'tribe_events',
        'side', // or 'normal' for full-width
        'default'
    );
});

function render_event_club_metabox( $post ) {
    if ( ! function_exists( 'groups_get_groups' ) ) {
        echo 'BuddyPress is not active.';
        return;
    }

    $groups_array = groups_get_groups( array( 'per_page' => false ) );
    $groups = isset( $groups_array['groups'] ) ? $groups_array['groups'] : [];

    $selected = get_post_meta( $post->ID, '_bp_group_id', true );
    ?>
    <label for="buddypress_group_id">Select a Club:</label>
    <select name="buddypress_group_id" id="buddypress_group_id" style="width:100%;">
        <option value="">— None —</option>
        <?php foreach ( $groups as $group ) : ?>
            <option value="<?= esc_attr( $group->id ); ?>" <?php selected( $selected, $group->id ); ?>>
                <?= esc_html( $group->name ); ?>
            </option>
        <?php endforeach; ?>
    </select>
    <?php
}

// 3. Save Club Selection When Event Is Saved
add_action( 'save_post_tribe_events', function( $post_id ) {
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( ! current_user_can( 'edit_post', $post_id ) ) return;

    if ( isset( $_POST['buddypress_group_id'] ) ) {
        update_post_meta( $post_id, '_bp_group_id', intval( $_POST['buddypress_group_id'] ) );
    }
});



function add_avatar_to_menu($items, $args) {
    /* Due to nav menu inconsistencies across pages, I just added every menu location I could think of - Debug code at bottom of functions.php should be used later to determine the incorrect menu locations being used on pages that don't seem to use the bloghash-primary
    */
    $menu_locations = array('bloghash-primary', 'primary', 'main-menu', 'header-menu', 'top-menu', 'menu-1');
    
    if (in_array($args->theme_location, $menu_locations)) {
        if (is_user_logged_in()) {
            $current_user = wp_get_current_user();
            
            $avatar = get_avatar($current_user->ID, 32);
            
            $profile_url = get_edit_profile_url($current_user->ID);
            
            // Creates the menu item with avatar
            $avatar_menu_item = '<li class="menu-item menu-item-type-custom menu-item-object-custom avatar-menu-item">';
            //$avatar_menu_item .= '<a href="' . esc_url($profile_url) . '">';
            $avatar_menu_item .= $avatar;
            /* Removed username unless client thinks this is a good idea...
            Takes up way too much space for longer names
            
            $avatar_menu_item .= '<span class="avatar-name">' . esc_html($current_user->display_name) . '</span>';
            */
            $avatar_menu_item .= '</li>';
            
            /* If we want to add the avatar to the end of the menu, we can remove '. $items'
            Currently this will add the avatar to the beginning of the menu
            */
            $items = $avatar_menu_item . $items;
        }
    }
    
    return $items;
}



add_filter('wp_nav_menu_items', 'add_avatar_to_menu', 999, 2);

function buddypress_profile_nav_redirect($menu_items) {
    if (!is_user_logged_in()) {
        return $menu_items;
    }
    
    foreach ($menu_items as $key => $item) {
        // Look for menu items with "Profile" in the title
        // Modify the condition if your menu item has a different name
        if ($item->title == 'Profile') {
            // Get the user's public profile URL instead of edit URL
            if (function_exists('bp_loggedin_user_domain')) {
                $profile_url = bp_loggedin_user_domain();
                $item->url = $profile_url;
            }
        }
    }
    
    return $menu_items;
}

add_filter('wp_nav_menu_objects', 'buddypress_profile_nav_redirect', 10);



function login_redirect_script() {
    // Only add for logged-out users
    if (is_user_logged_in()) {
        return;
    }
    ?>
    <script type="text/javascript">
    document.addEventListener('DOMContentLoaded', function() {
        // Brute force checking all login links
        const loginLinks = document.querySelectorAll('.bp-login-nav a, a[href*="wp-login.php"], a[href*="65.19.167.55/login"], a[href*="65.19.167.55"]');
        
        // Replace their URLs with the custom login page
        loginLinks.forEach(function(link) {
            // Preserve any redirect parameters
            const currentUrl = new URL(link.href);
            const redirectParam = currentUrl.searchParams.get('redirect_to');
            
            // Set the new base URL
            let newUrl = 'https://kpsrofun.com/login/';
            
            // Add the redirect parameter if it exists
            if (redirectParam) {
                newUrl += '?redirect_to=' + encodeURIComponent(redirectParam);
            }
            
            link.href = newUrl;
        });
    });
    </script>
    <?php
}
add_action('wp_footer', 'login_redirect_script');


// Debug code to check available menu locations - Use for inconsistent menus throughout the site
add_action('wp_footer', function() {
    echo '<!-- DEBUG: Available menu locations: ';
    print_r(get_registered_nav_menus());
    echo ' -->';
});


//acf/load_field
add_filter('acf/load_field/name=_bp_group_id', 'populate_bp_groups_select');
function populate_bp_groups_select($field) {
    if (function_exists('groups_get_groups')) {
        $groups = groups_get_groups(['per_page' => 999]);
        $choices = [];

        foreach ($groups['groups'] as $group) {
            $choices[$group->id] = $group->name;
        }

        $field['choices'] = $choices;
    }
    return $field;
}