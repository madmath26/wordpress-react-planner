<?php
/**
 * Init wordpress plugin
 */

class Optic_Planner_Init {
    public function init_options() {
      // set default plugin name
      $this->plugin_name = 'Planification';
      add_action('admin_menu', array($this, 'add_admin_menu'));
      add_action('admin_init', array($this, 'settings_init'));



      include 'class-timeslots.php';
      if (class_exists('TimeSlots')) {
        new TimeSlots();
      }

      include 'class-appointments.php';
      if (class_exists('Appointments')) {
        $this->appointments = new Appointments();
      }
    }

    public function add_admin_menu() {
      add_menu_page(
        $this->get_plugin_name(),
        $this->get_plugin_name(),
        'manage_options',
        'optic_planner',
        array($this, 'options_page'),
        'dashicons-calendar-alt',
        6
      );

      // submenu page
      add_submenu_page(
        'optic_planner',
        __('Appointments', 'optic_planner'),
        __('Appointments', 'optic_planner'),
        'manage_options',
        'optic_planner_appointments',
        array($this->appointments, 'appointments_page')
      );
    }

    public function options_page() {
      ?>
      <form action='options.php' method='post'>

        <h1><?php _e('Your planning tool', 'optic-planner') ?></h1>

        <?php
        settings_fields('optic_planner');
        do_settings_sections('optic_planner');
        submit_button();
        ?>

      </form>
      <?php
    }

    public function settings_init() {
      register_setting('optic_planner', 'optic_planner_settings');
      // add setings fields
      add_settings_section(
        'optic_planner_optic_planner_section',
        __('Timeslots', 'optic-planner'),
        array($this, 'optic_planner_settings_section_callback'),
        'optic_planner',
      );
    }

    public function optic_planner_settings_section_callback() {
      echo __('Choose your defaults timeslots', 'optic-planner');
    }

    public function register_api_routes() {
      register_rest_route('optic-planner/v1', '/timeslots', array(
        'methods' => 'GET',
        'callback' => array($this, 'get_timeslots'),
      ));
    }

    public function get_timeslots() {
      $timeslots = get_option('optic_planner');
      if($timeslots) {
        return $timeslots;
      }
      return ['empty'];
    }


    public function get_plugin_name() {
      return $this->plugin_name;
    }
}