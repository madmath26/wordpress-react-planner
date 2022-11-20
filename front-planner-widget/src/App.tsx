import React, { useEffect } from "react"
import DebugCMP from './components/Debug'
import { StepsProvider } from "./context/stepsContext"
import { DataProvider } from "./context/dataContext"
import UICalendar from './components/ui/Calendar'

const App = () => {

	useEffect(() => {
		const unloadCallback = (event: any) => {
			event.preventDefault()
			event.returnValue = ""
			return ""
		}

		window.addEventListener("beforeunload", unloadCallback)
		return () => window.removeEventListener("beforeunload", unloadCallback)
	}, [])
	return (
		<DataProvider>
			<div className="p-10">
				<h1 className="text-4xl mb-4">Réservation d&apos;un rendez-vous</h1>
				<StepsProvider />
			</div>
		</DataProvider>
	)
}

export default App
