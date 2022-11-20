import React, { useContext, useEffect, useState } from "react"
import { DataContext } from "../../context/dataContext"
import fetcher from "../../utils/fetcher"
import UISelect from "../ui/Select"

const ServicesSelect = () => {
	const [services, setServices] = useState<string[]>([])
	const [activeService, setActiveService] = useState()
	const { setData } = useContext(DataContext)
	const fetchServices = async () => {
		try {
			const response = await fetcher("/wp/v2/service")

			response.map(
				(service: {
					id: number
					title: {
						rendered: string
					}
				}) => {
					setServices((prev) => [...prev, service.title.rendered])
				}
			)
		} catch (e) {
			console.log(e)
		}
	}
	useEffect(() => {
		if (services.length > 0) return
		// fetch services on load
		fetchServices()
	}, [])

	useEffect(() => {
		console.log(activeService)
		if (!activeService) return
		setData((prev: any) => {
			return {
				...prev,
				service: {
					id: 1,
					title: activeService,
				},
			}
		})
	}, [activeService])

	return <>{services.length > 0 && <UISelect getState={setActiveService} label="Sélectionnez un service dans la liste" options={services} renderingOption={(option: any) => option} />}</>
}

export default ServicesSelect
