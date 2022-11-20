<?php

/**
 * Plugin Name: Optic Planner
 * Description: Plugin sur-mesure rendez-vous opticien
 * Text Domain: optic-planner
 * Domain Path: /languages
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
  exit;
}


// on plugin install
register_activation_hook(__FILE__, 'optic_planner_install');

function optic_planner_install()
{
  // create table
  global $wpdb;
  $table_name = $wpdb->prefix . 'optic_planner_appointments';
  $charset_collate = $wpdb->get_charset_collate();

  $sql = "CREATE TABLE $table_name (
    id mediumint(9) NOT NULL AUTO_INCREMENT,
    time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
    name tinytext NOT NULL,
    email varchar(50) DEFAULT '' NOT NULL,
    phone varchar(20) DEFAULT '' NOT NULL,
    UNIQUE KEY id (id)
  ) $charset_collate;";

  require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
  dbDelta($sql);
}

add_shortcode('web_app', 'web_app_cb');

function web_app_cb()
{
  // get plugin directory url
  $plugin_url = plugin_dir_url(__FILE__);
  $public_html = 'http://localhost:1234/';
  // fullpage iframe
  $html = '<iframe src="' . $public_html . '" style="user-select:none; width: 100%; height: 100vh; padding: 10px; border: none;" width="1100"></iframe>';
  return $html;
}

// generate custom post type "service"
add_action('init', 'register_cpt_service');

function register_cpt_service()
{
  $labels = array(
    'name' => _x('Services', 'service'),
    'singular_name' => _x('Service', 'service'),
    'add_new' => _x('Add New', 'service'),
    'add_new_item' => _x('Add New Service', 'service'),
    'edit_item' => _x('Edit Service', 'service'),
    'new_item' => _x('New Service', 'service'),
    'view_item' => _x('View Service', 'service'),
    'search_items' => _x('Search Services', 'service'),
    'not_found' => _x('No services found', 'service'),
    'not_found_in_trash' => _x('No services found in Trash', 'service'),
    'parent_item_colon' => _x('Parent Service:', 'service'),
    'menu_name' => _x('Services', 'service'),
  );

  $args = array(
    'labels' => $labels,
    'hierarchical' => false,
    'description' => 'Liste des services',
    'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
    'taxonomies' => array('category', 'post_tag'),
    'menu_icon' => "dashicons-visibility",

    'show_in_rest' => true,
    'public' => true,
    'show_ui' => true,
    'show_in_menu' => true,
    'menu_position' => 5,
    'show_in_nav_menus' => true,
    'publicly_queryable' => true,
    'exclude_from_search' => false,
    'has_archive' => true,
    'query_var' => true,
    'can_export' => true,
    'rewrite' => true,
    'capability_type' => 'post',
  );

  register_post_type('service', $args);
}

// generate custom post type "praticien"
add_action('init', 'register_cpt_praticien');
function register_cpt_praticien()
{
  $labels = array(
    'name' => _x('Praticiens', 'praticien'),
    'singular_name' => _x('Praticien', 'praticien'),
    'add_new' => _x('Add New', 'praticien'),
    'add_new_item' => _x('Add New Praticien', 'praticien'),
    'edit_item' => _x('Edit Praticien', 'praticien'),
    'new_item' => _x('New Praticien', 'praticien'),
    'view_item' => _x('View Praticien', 'praticien'),
    'search_items' => _x('Search Praticiens', 'praticien'),
    'not_found' => _x('No praticiens found', 'praticien'),
    'not_found_in_trash' => _x('No praticiens found in Trash', 'praticien'),
    'parent_item_colon' => _x('Parent Praticien:', 'praticien'),
    'menu_name' => _x('Praticiens', 'praticien'),
  );

  $args = array(
    'labels' => $labels,
    'hierarchical' => false,
    'description' => 'Liste des praticiens',
    'supports' => array('title', 'editor', 'thumbnail'),
    'taxonomies' => array('category', 'post_tag'),
    'menu_icon' => "dashicons-businessman",
    'show_in_rest' => true,
    'public' => true,
    'show_ui' => true,
    'show_in_menu' => true,
    'menu_position' => 6,
    'show_in_nav_menus' => true,
    'publicly_queryable' => true,
    'exclude_from_search' => false,
    'has_archive' => true,
    'query_var' => true,
    'can_export' => true,
    'rewrite' => true,
    'capability_type' => 'post',
  );

  register_post_type('praticien', $args);
}

// add_meta_box( string $id, string $title, callable $callback, string|array|WP_Screen $screen = null, string $context = 'advanced', string $priority = 'default', array $callback_args = null )

add_action('add_meta_boxes', 'add_service_metabox');
function add_service_metabox()
{
  add_meta_box(
    'service_metabox',
    'Choisir un praticien',
    'service_metabox_cb',
    'service',
    'normal',
    'high'
  );
}

function service_metabox_cb($post)
{
  // add custom select "praticien"
  $praticiens = get_posts(array(
    'post_type' => 'praticien',
    'posts_per_page' => -1,
  ));
  // get value if exist
  $praticien_id = get_post_meta($post->ID, 'praticien', true);


  $html = '<select name="praticien" id="praticien">';
  foreach ($praticiens as $praticien) {
    $html .= '<option value="' . $praticien->ID . '" ' . selected($praticien_id, $praticien->ID, false) . '>' . $praticien->post_title . '</option>';
  }
  $html .= '</select>';
  echo $html;
}

add_action('save_post', 'save_service_metabox');
function save_service_metabox($post_id)
{
  if (array_key_exists('praticien', $_POST)) {
    update_post_meta(
      $post_id,
      'praticien',
      $_POST['praticien']
    );
  }
}

// init class
include 'includes/class-optic-planner-init.php';
if (class_exists('Optic_Planner_Init')) {
  $optic_planner_init = new Optic_Planner_Init();
  $optic_planner_init->init_options();
}

add_action('init', 'wpdocs_load_textdomain');

function wpdocs_load_textdomain()
{
  load_plugin_textdomain('optic-planner', false, dirname(plugin_basename(__FILE__)) . '/languages');
}

// load css on options page
add_action('admin_enqueue_scripts', 'optic_planner_admin_enqueue_scripts');
function optic_planner_admin_enqueue_scripts($hook)
{
  if ($hook == 'toplevel_page_optic_planner') {
    wp_enqueue_style('optic-planner-admin', plugins_url('assets/backoffice.css', __FILE__));
  }
}


class Optic_Rest
{

  public function __construct()
  {
    // add api endpoint
    add_action('rest_api_init', array($this, 'register_api_routes'));
  }

  public function register_api_routes()
  {
    register_rest_route('optic-planner/v1', '/timeslots', array(
      'methods' => 'GET',
      'callback' => array($this, 'get_timeslots'),
    ));
  }

  public function get_timeslots()
  {
    $timeslots = get_option('optic_planner_settings');
    if ($timeslots) {
      return $timeslots;
    }
    return ['empty'];
  }
}
new Optic_Rest;