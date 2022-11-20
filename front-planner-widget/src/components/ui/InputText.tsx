import React from 'react'

interface IInputText {
	placeholder?: string
	handleChange?: (key: string) => void
  defaultValue?: string
  disabled?: boolean
}

const UIInputText = ({ placeholder, handleChange, defaultValue, disabled }: IInputText) => {
	return (
		<input
			className="mt-2 relative w-full cursor-default rounded-md border border-gray-300 bg-white py-3 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
			placeholder={placeholder && placeholder}
			onChange={(e) => handleChange && handleChange(e.target.value)}
			value={defaultValue && defaultValue}
      type="text"
      disabled={disabled && disabled}
		/>
	)
}

export default UIInputText