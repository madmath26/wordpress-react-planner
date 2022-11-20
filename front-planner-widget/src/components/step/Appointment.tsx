
import React from "react"
import ServicesSelect from '../services/Select'
import TimeSlotsSelect from '../timeslots/Select'

import UISpacer from '../ui/Spacer'
const StepAppointment = ({data} :any) => {
  console.log(data);
	return (
		<>
			<ServicesSelect />
			<UISpacer size={2} />
			<TimeSlotsSelect />
		</>
	)
}

export default StepAppointment
