import React from "react"
import { IData } from "../../types/Data"
import { useContext } from "react"
import { DataContext } from "../../context/dataContext"
import UIInputText from "../ui/InputText"
import UISpacer from "../ui/Spacer"
const StepPersonalDetails = () => {
	const { data, setData } = useContext(DataContext)

	const handleChange = (key: string) => (value: string) => {
		setData((prev: IData) => ({
			...prev,
			personalDetails: {
				...prev.personalDetails,
				[key]: value,
			},
		}))
	}
	return (
		<>
			<div className="flex space-x-4">
				<div className="flex-1">
					<UIInputText handleChange={handleChange("firstName")} defaultValue={data.personalDetails.firstName || ""} placeholder="Nom" />
				</div>
				<div className="flex-1">
					<UIInputText handleChange={handleChange("lastName")} defaultValue={data.personalDetails.lastName || ""} placeholder="Prénom" />
				</div>
			</div>
			<UISpacer size={1} />
			<UIInputText handleChange={handleChange("email")} defaultValue={data.personalDetails.email || ""} placeholder="Adresse email" />
		</>
	)
}

export default StepPersonalDetails
