interface IStartEnd {
	start: string
	end: string
}

const timeslotGenerator = (morning?: IStartEnd, afternoon?: IStartEnd) => {
	const activeSlots = []

	if (morning) {
		const start_morning = +morning.start.replace(":", "") / 100
		const end_morning = +morning.end.replace(":", "") / 100
		const between_morning = end_morning - start_morning
		for (let i = 0; i <= between_morning; i++) {
			const start = start_morning + i
			const end = start + 1
			activeSlots.push(`${start}h00 - ${end}h00`)
		}
	}
	if (afternoon) {
		const start_afternoon = +afternoon.start.replace(":", "") / 100
		const end_afternoon = +afternoon.end.replace(":", "") / 100
		const between_afternoon = end_afternoon - start_afternoon
		for (let i = 0; i <= between_afternoon; i++) {
			const start = start_afternoon + i
			const end = start + 1
			activeSlots.push(`${start}h00 - ${end}h00`)
		}
	}

	return activeSlots
}

export default timeslotGenerator
