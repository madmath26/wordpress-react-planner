import React, { useCallback, useMemo, useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import "dayjs/locale/fr"
import clsx from "clsx"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
interface Props {
	defaultDisabledWeekDays: string[]
  handleClickDay: (value: Dayjs) => void
  activeDate?: Date
}
const UICalendar = ({ defaultDisabledWeekDays, handleClickDay, activeDate }: Props) => {

	// generate calendar
	const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())

	const currentDay = useMemo(() => dayjs().toDate(), [])

	const firstDayOfTheMonth = useMemo(() => selectedDate.clone().startOf("month"), [selectedDate])

	const firstDayOfFirstWeekOfMonth = useMemo(() => dayjs(firstDayOfTheMonth).startOf("week"), [firstDayOfTheMonth])

	const generateFirstDayOfEachWeek = useCallback((day: Dayjs): Dayjs[] => {
		const dates: Dayjs[] = [day]
		for (let i = 1; i < 6; i++) {
			const date = day.clone().add(i, "week")
			dates.push(date)
		}
		return dates
	}, [])

	const generateWeek = useCallback((day: Dayjs): Date[] => {
		const dates: Date[] = []
		for (let i = 0; i < 7; i++) {
			const date = day.clone().add(i, "day").toDate()
			dates.push(date)
		}
		return dates
	}, [])

	const generateWeeksOfTheMonth = useMemo((): Date[][] => {
		const firstDayOfEachWeek = generateFirstDayOfEachWeek(firstDayOfFirstWeekOfMonth)
		return firstDayOfEachWeek.map((date) => generateWeek(date))
	}, [generateFirstDayOfEachWeek, firstDayOfFirstWeekOfMonth, generateWeek])
	return (
		<div className="flex flex-col rounded-md border border-gray-300 p-4">
			<div className="flex items-center">
				<div className="text-md font-semibold">{selectedDate.clone().format("MMM YYYY")}</div>
				<div className="flex ml-auto space-x-4">
					<button
						className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						onClick={() => setSelectedDate(selectedDate.clone().subtract(1, "month"))}
					>
						<ChevronRightIcon className="w-5 h-5 text-gray-400 transform rotate-180" />
					</button>
					<button
						className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						onClick={() => setSelectedDate(selectedDate.clone().add(1, "month"))}
					>
						<ChevronLeftIcon className="w-5 h-5 text-gray-400 transform rotate-180" />
					</button>
				</div>
			</div>
			<div className="flex justify-between border-b mb-2">
				{generateWeeksOfTheMonth[0].map((day, index) => (
					<div className="w-10 h-12 flex items-center justify-center font-semibold" key={`${day}-${index}`}>
						{dayjs(day).locale("fr").format("ddd")}
					</div>
				))}
			</div>
			<div className="">
				{generateWeeksOfTheMonth.map((week, weekIndex) => (
					<div className="flex justify-between space-y-1" key={`week-${weekIndex}`}>
						{week.map((day, dayIndex) => (
							<button
								key={`day-${dayIndex}`}
								onClick={() => {
									handleClickDay(dayjs(day))
									setSelectedDate(dayjs)
								}}
								className={clsx(
									"w-10 h-10 rounded-full flex items-center justify-center transition-colors",
									selectedDate.clone().toDate().getMonth() !== day.getMonth() || dayjs(day).isBefore(currentDay, "date")
										? "text-neutral-200"
										: defaultDisabledWeekDays && defaultDisabledWeekDays.includes(dayjs(day).format("dddd").toLowerCase())
										? "bg-neutral-100 text-neutral-300"
										: dayjs(day).isSame(activeDate, "date")
										? "text-white bg-indigo-500"
										: dayjs(currentDay).isSame(day, "date")
										? "text-white bg-indigo-200"
										: "text-black font-semibold hover:bg-indigo-500 hover:text-white"
								)}
								disabled={
									selectedDate.clone().toDate().getMonth() !== day.getMonth() ||
									dayjs(day).isBefore(currentDay, "date") ||
									(defaultDisabledWeekDays && defaultDisabledWeekDays.includes(dayjs(day).format("dddd").toLowerCase()))
								}
							>
								{day.getDate()}
							</button>
						))}
					</div>
				))}
			</div>
		</div>
	)
}

export default UICalendar
