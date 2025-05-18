<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** Database username */
define( 'DB_USER', 'wpuser' );

/** Database password */
define( 'DB_PASSWORD', '12345KPsro!' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '-nS-C9(--KNFYWz0{nK{~YKHBjaAc4v!>PrfJ[$kq3EmRVD;IO{sJd[AS:];wZM+');
define('SECURE_AUTH_KEY',  'y.mH47f*S:wN+!!~}q(f[61l]$oVFw2UQKOKo-9R[*goThk]^2-*z`yu[N5T V.e');
define('LOGGED_IN_KEY',    '`0&RR.a<F &oMx{5}guoJ1-v-*yB}wrj~iE%@MW(aB )W,qHr->Oj%^kgwqemhwu');
define('NONCE_KEY',        'ENzxOe59EG<qhS@>+qV[yH(&DP.n<ci=*KWoLU67LZwqBD&`,%[UT&7~4ay<H)LX');
define('AUTH_SALT',        '@C u!?LD-7|&i{GHH(y|G`8MQ4OW#=;-x[0fgfcEb3$@lrMov>lglmLRy]o@%Nf7');
define('SECURE_AUTH_SALT', '*-X|Ki=f#pazk2P=|EQ[I6ZKug-: QV9+ZUHpKzc--?bA>X-KLa7huoEBVWBM,Lp');
define('LOGGED_IN_SALT',   '|*l>3NDm`8RHkv+`?[Gpi0+$rwt#DX4ys]kubyO29i204F2F>4`L[B5-^2ORUA+t');
define('NONCE_SALT',       'yUc{Chow3Mr^_}9L4+T|-q1o$dl))iaVZyK9m;bTE+@b$sgO2K|/]Ei}<{h~U/r!');

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */

define( 'WP_DEBUG', false );
/*
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', true );
*/

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
