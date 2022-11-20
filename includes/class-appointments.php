<?php
class Appointments
{
  public function __construct()
  {


    add_action('admin_init', array($this, 'settings_init'));
  }
  public function appointments_page()
  {
?>
    <h1><?php _e('Appointments', 'optic_planner') ?></h1>
    <form action='options.php' method='post'>
      <?php
      settings_fields('optic_planner_appointments');
      do_settings_sections('optic_planner_appointments');
      submit_button();
      ?>
    </form>
<?php
  }

  public function settings_init()
  {
    register_setting('optic_planner', 'optic_planner_appointments');
    // add setings fields
    add_settings_section(
      'optic_planner_appointments_section',
      __('Your Appointments', 'optic_planner'),
      array($this, 'appointments_section_callback'),
      'optic_planner_appointments'
    );
  }

  public function appointments_section_callback()
  {
    echo __('List of your active appointments', 'optic_planner');
  }
}
