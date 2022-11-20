import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid"
import React, { createContext, useState } from "react"
import { useContext } from 'react'
import StepAppointment from "../components/step/Appointment"
import StepPersonalDetails from "../components/step/PersonalDetails"
import StepThank from "../components/step/Thank"
import UIButton from "../components/ui/Button"
import UISpacer from "../components/ui/Spacer"
import { IData } from '../types/Data'
import { DataContext } from './dataContext'

type Props = {
  data:IData
}

type Step = {
	title: string
	description: string
	component: (props: Props) => JSX.Element
}

const steps: Step[] = [
	{
		title: "Programmer un rendez-vous",
		description: "",
		component: StepAppointment,
	},
	{
		title: "Vos informations personnels",
		description: "",
		component: StepPersonalDetails,
	},
	{
		title: "Confirmation",
		description: "",
		component: StepThank,
	},
]
const StepsContext = createContext(undefined as any)

const StepsProvider = () => {
  const { data } = useContext(DataContext);
	const [currentStep, setCurrentStep] = useState<number>(0)
	const step = steps[currentStep]
	return (
    <StepsContext.Provider value={{ currentStep, setCurrentStep }}>
      {React.createElement(step.component, {data}, '')}
			<UISpacer size={3} />
			<div className="flex">
				{currentStep > 0 && (
					<UIButton cb={() => setCurrentStep((prev) => --prev)} color="indigo" iconLeft={<ArrowLeftIcon className="h-5 w-5" />}>
						Étape précèdente
					</UIButton>
				)}
				{currentStep < steps.length - 1 && (
					<div className="ml-auto">
						<UIButton cb={() => setCurrentStep((prev) => ++prev)} color="indigo" iconRight={<ArrowRightIcon className="h-5 w-5" />}>
							{currentStep === steps.length - 2 ? "Terminer" : "Étape suivante"}
						</UIButton>
					</div>
				)}
			</div>
		</StepsContext.Provider>
	)
}

export { StepsContext, StepsProvider }


