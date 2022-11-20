export interface IData {
	service: {
		id: number
		title: string
	}
	timeslot: {
		dayname: string | (() => string)
		date: {
			rendered: string
			object: Date
    }
    time: {
      rendered:string
      start: string,
      end: string,
    }
	}
	personalDetails: {
		firstName: string
		lastName: string
		email: string
	}
}
