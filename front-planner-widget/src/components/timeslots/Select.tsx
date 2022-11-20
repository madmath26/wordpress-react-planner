import { Dayjs } from "dayjs"
import React, { useContext, useState } from "react"
import { useEffect } from "react"
import { DataContext } from "../../context/dataContext"
import fetcher from "../../utils/fetcher"
import timeslotGenerator from "../../utils/timeslotGenerator"
import UICalendar from "../ui/Calendar"
import UIInputText from "../ui/InputText"
import UISelect from "../ui/Select"
import { IData } from "../../types/Data"
import UISpacer from "../ui/Spacer"

interface TimeSlot {
	end_afternoon: string
	end_morning: string
	open_afternoon?: string
	open_morning?: string
	start_afternoon: string
	start_morning: string
}

// const weekdays: {
// 	[key: string]: string
// } = {
// 	monday: "Lundi",
// 	tuesday: "Mardi",
// 	wednesday: "Mercredi",
// 	thursday: "Jeudi",
// 	friday: "Vendredi",
// 	saturday: "Samedi",
// 	sunday: "Dimanche",
// }

const TimeSlotsSelect = () => {
	const { data, setData } = useContext(DataContext)

	const [timeSlots, setTimeSlots] = useState<any>(null)
	const [unActiveTs, setUnActiveTs] = useState<any>(null)
	const [activeDay, setActiveDay] = useState(null)
	const [activeTimeSlots, setActiveTimeSlots] = useState<string[]>()
	const fetchTimeSlots = async () => {
		try {
			const response: {
				timeslot: {
					[key: string]: TimeSlot
				}
			} = await fetcher("/optic-planner/v1/timeslots")

			const timeslots = response.timeslot
			const timeslotsMap = new Map<string, TimeSlot>([])

			Object.keys(timeslots).forEach((key) => {
				timeslotsMap.set(key, timeslots[key])
			})

			// filter timeslotsMap
			const filteredTimeslotsMap = new Map<string, TimeSlot>([])
			const filteredTimeslotsMapRest = new Map<string, TimeSlot>([])
			timeslotsMap.forEach((value, key) => {
				if (value.open_morning || value.open_afternoon) {
					filteredTimeslotsMap.set(key, timeslots[key])
				} else {
					filteredTimeslotsMapRest.set(key, timeslots[key])
				}
			})

			// get
			setUnActiveTs(filteredTimeslotsMapRest)
			setTimeSlots(filteredTimeslotsMap)
		} catch (e) {
			console.log(e)
		}
	}
	useEffect(() => {
		if (timeSlots) {
			// set active day
			setActiveDay(timeSlots.keys().next().value)
		} else {
			// fetch timeslots on load
			fetchTimeSlots()
		}
	}, [timeSlots])

	useEffect(() => {
		if (!activeDay) return
		const activeDayTimeSlot = timeSlots && timeSlots.get(activeDay)
		if (!activeDayTimeSlot) return
		console.log(activeDayTimeSlot)
		const morning = {
			start: activeDayTimeSlot.start_morning,
			end: activeDayTimeSlot.end_morning,
		}
		const afternoon = {
			start: activeDayTimeSlot.start_afternoon,
			end: activeDayTimeSlot.end_afternoon,
		}
		const activeSlots = timeslotGenerator(activeDayTimeSlot.open_morning && morning, activeDayTimeSlot.open_afternoon && afternoon)

		setActiveTimeSlots(activeSlots)
	}, [activeDay])

	const handleClickDay = (value: Dayjs) => {
		setData((prev: IData) => ({
			...prev,
			timeslot: {
				...prev.timeslot,
				date: {
					dayname: value.format("dddd").toLowerCase(),
					rendered: value.format("DD/MM/YYYY"),
					object: value.toDate(),
				},
			},
		}))
	}

	useEffect(() => {
		if (data.timeslot.date) {
			setActiveDay(data.timeslot.date.dayname)
		}
	}, [data.timeslot.date])

	const handleChangeHour = (timeslot: string) => {

		setData((prev: IData) => ({
			...prev,
			timeslot: {
				...prev.timeslot,
        time: {
          rendered: timeslot,
					start: timeslot.split(" - ")[0].replace('h', ':'),
					end: timeslot.split(" - ")[1].replace('h', ':'),
				},
			},
		}))
	}
	return (
		<>
			<UICalendar defaultDisabledWeekDays={unActiveTs && [...unActiveTs.keys()]} handleClickDay={handleClickDay} activeDate={data?.timeslot?.date?.object} />
			<UISpacer size={2} />
			<div className="flex space-x-4">
				<div className="flex-1">
					<p>Votre jour</p>
					<UIInputText defaultValue={data?.timeslot?.date?.rendered} disabled />
				</div>
				<div className="flex-1">
					{activeTimeSlots && <UISelect handleChangeParent={handleChangeHour} label="Choisir une heure" options={activeTimeSlots} renderingOption={(option: string) => option} dynamic />}
				</div>
			</div>
		</>
	)
}

export default TimeSlotsSelect
