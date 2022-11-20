import React, { Fragment, useEffect, useState } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { ChevronUpDownIcon } from "@heroicons/react/20/solid"
import useSelect from '../../hooks/useSelect'

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ")
}

type Props = {
	options: string[]
	renderingOption: (option:string) => string
	label: string
	getState?: any
	dynamic?: boolean
	handleChangeParent?: any
}
const UISelect = ({ label, options, renderingOption, getState, dynamic, handleChangeParent }: Props) => {
	const [selectedOption, setSelectedOption] = useState(options[0])

	const {open, ref, setIsOpen} = useSelect()

	useEffect(() => {
		if (dynamic) return
		setSelectedOption(options[0])
	}, [])

	useEffect(() => {
		if (!dynamic) return
		setSelectedOption(options[0])
		if (handleChangeParent) {
			handleChangeParent(options[0])
		}
	}, [options])

	const handleChange = (option: string) => {
		setSelectedOption(option)
		if (getState) {
			getState(option)
		}
		if (handleChangeParent) {
			handleChangeParent(option)
		}
	}



	return (
		<div ref={ref}>
			<Listbox value={selectedOption} onChange={handleChange}>
				<div className="relative">
					<Listbox.Label>{label}</Listbox.Label>
					<Listbox.Button
						className="mt-2 relative w-full cursor-default rounded-md border border-gray-300 bg-white py-3 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
						onClick={() => setIsOpen((open) => !open)}
					>
						{renderingOption(selectedOption)}
						<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
							<ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
						</span>
					</Listbox.Button>
					<Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
						<Listbox.Options
							onClick={() => setIsOpen(false)}
							className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
						>
							{options &&
								options.map((option: string, index: number) => (
									<Listbox.Option
										key={index}
										value={option}
										className={({ active }) =>
											classNames(active ? "text-white bg-indigo-600" : "text-gray-900", "relative cursor-default select-none py-2 pl-3 pr-9 transition-colors")
										}
									>
										{renderingOption(option)}
									</Listbox.Option>
								))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	)
}

export default UISelect
