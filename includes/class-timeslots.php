<?php

/**
 * Class to WP add settings field "timeslot"
 */

class TimeSlots
{
  public function __construct()
  {
    add_action('admin_init', array($this, 'settings_init'));
  }

  public function settings_init()
  {
    // add setings fields
    add_settings_field(
      'optic_planner_timeslot',
      __('Timeslot', 'optic_planner'),
      array($this, 'optic_planner_timeslot_render'),
      'optic_planner',
      'optic_planner_optic_planner_section',
      array(
        'label_for' => 'optic_planner_timeslot',
        'class' => 'optic_planner_row',
        'optic_planner_custom_data' => 'custom',
      )
    );
    // add field to select duration of a timeslot
    add_settings_field(
      'optic_planner_duration',
      __('Duration', 'optic_planner'),
      array($this, 'optic_planner_duration_render'),
      'optic_planner',
      'optic_planner_optic_planner_section',
      array(
        'label_for' => 'optic_planner_duration',
        'class' => 'optic_planner_row',
        'optic_planner_custom_data' => 'custom',
      )
    );
  }

  public function optic_planner_duration_render() {
    $options = get_option('optic_planner');
    ?>
    <select name='optic_planner[duration]' id='optic_planner_duration'>
      <option value='15' <?php selected($options['duration'], 15); ?>>15</option>
      <option value='30' <?php selected($options['duration'], 30); ?>>30</option>
      <option value='45' <?php selected($options['duration'], 45); ?>>45</option>
      <option value='60' <?php selected($options['duration'], 60); ?>>60</option>
    </select>
    <?php
  }

  public function optic_planner_timeslot_render()
  {
    // render table of days
    $days = array(
      'monday' => __('Monday', 'optic-planner'),
      'tuesday' => __('Tuesday', 'optic-planner'),
      'wednesday' => __('Wednesday', 'optic-planner'),
      'thursday' => __('Thursday', 'optic-planner'),
      'friday' => __('Friday', 'optic-planner'),
      'saturday' => __('Saturday', 'optic-planner'),
      'sunday' => __('Sunday', 'optic-planner'),
    );
    $options = get_option('optic_planner_settings');
?>
    <table class="wp-list-table widefat fixed striped table-view-list pages">
      <thead>
        <tr>
          <th scope="col" class="manage-column manage-column column-days"><?php _e('Day', 'optic-planner'); ?></th>
          <th class="column-title"><?php _e('Morning', 'optic-planner'); ?></th>
          <th class="column-title"><?php _e('Open on the morning', 'optic-planner'); ?></th>
          <th class="column-title"><?php _e('Afternoon', 'optic-planner'); ?></th>
          <th class="column-title"><?php _e('Open on the afternoon', 'optic-planner'); ?></th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($days as $day => $day_name) : ?>
          <tr>
            <td><?php echo $day_name; ?></td>
            <td>
              <input type="time" name="optic_planner_settings[timeslot][<?php echo $day; ?>][start_morning]" value="<?php echo $options['timeslot'][$day]['start_morning'] ? $options['timeslot'][$day]['start_morning']  : '09:00'; ?>">
              <input type="time" name="optic_planner_settings[timeslot][<?php echo $day; ?>][end_morning]" value="<?php echo $options['timeslot'][$day]['end_morning'] ? $options['timeslot'][$day]['end_morning'] : '12:00'  ?>">
            </td>
            <td>
              <input type="checkbox" name="optic_planner_settings[timeslot][<?php echo $day; ?>][open_morning]" value="1" <?php echo $options['timeslot'][$day]['open_morning'] ? 'checked' : ''; ?>>
            <td>
              <input type="time" name="optic_planner_settings[timeslot][<?php echo $day; ?>][start_afternoon]" value="<?php echo $options['timeslot'][$day]['start_afternoon'] ? $options['timeslot'][$day]['start_afternoon'] : '14:00'; ?>">
              <input type="time" name="optic_planner_settings[timeslot][<?php echo $day; ?>][end_afternoon]" value="<?php echo $options['timeslot'][$day]['end_afternoon'] ? $options['timeslot'][$day]['end_afternoon'] : '18:00'; ?>">
            </td>
            <td>
              <input type="checkbox" name="optic_planner_settings[timeslot][<?php echo $day; ?>][open_afternoon]" value="1" <?php echo $options['timeslot'][$day]['open_afternoon'] ? 'checked' : ''; ?>>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
<?php
  }
}
