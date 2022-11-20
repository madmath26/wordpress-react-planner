import dayjs from "dayjs"
import "dayjs/locale/fr"
import React, { createContext, useState } from "react"
import { IData } from "../types/Data"

const initialDataState: IData = {
	service: {
		id: 0,
		title: "",
	},
	timeslot: {
		dayname: dayjs().format("dddd").toLowerCase(),
		date: {
			rendered: dayjs().locale("fr").format("DD/MM/YYYY"),
			object: new Date(),
		},
		time: {
			rendered: "",
			start: "",
			end: "",
		},
	},
	personalDetails: {
		firstName: "",
		lastName: "",
		email: "",
	},
}
const DataContext = createContext<any>(undefined)

const DataProvider = ({ children }: { children: React.ReactNode }) => {
	const [data, setData] = useState<IData>(initialDataState)
	return <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>
}

export { DataContext, DataProvider }
