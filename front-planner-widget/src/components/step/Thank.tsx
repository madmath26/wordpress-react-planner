import React from "react"
import { IData } from "../../types/Data"

type Props = {
	data: IData
}
const StepThank = (props: Props) => {
	const { data } = props
	return (
		<div className="space-y-4">
			<h3 className="text-lg font-bold">Votre demande :</h3>
			<strong>Service&nbsp;:&nbsp;</strong> {data.service.title}
			<br />
			<strong>Date&nbsp;:&nbsp;</strong> {data.timeslot.date.rendered}
			<br />
			<h3 className="text-lg font-bold">Vos informations : </h3>
			<span className='font-semibold'>Nom&nbsp;:&nbsp;</span>
			{data.personalDetails.firstName}
			<br />
			<span className='font-semibold'>Prénom&nbsp;:&nbsp;</span>
			{data.personalDetails.lastName}
			<br />
			<span className='font-semibold'>Email&nbsp;:&nbsp;</span>
			{data.personalDetails.email}
		</div>
	)
}

export default StepThank
