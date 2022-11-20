import { ChangeEvent, useEffect, useRef, useState } from "react"
const useSelect = () => {
	const [open, setIsOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const closePopup = (e: ChangeEvent) => {
			if (ref.current && !ref.current.contains(e.target)) {
				setIsOpen(false)
			}
		}
		window.addEventListener("click", (e: any) => closePopup(e))

		return () => {
			window.removeEventListener("click", (e: any) => closePopup(e))
		}
	}, [])
	return { open, setIsOpen, ref }
}

export default useSelect
