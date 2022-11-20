import React from "react"
interface IUIButton {
	color: string
	children: string
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  cb?: () => void
}
const UIButton = ({ children, color, iconRight, iconLeft, cb }: IUIButton) => {
	const themes: {
		[key: string]: string
	} = {
		primary: "bg-blue-600",
		indigo: "bg-indigo-600 text-white border-2 border-transparent focus:border-2 focus:border-indigo-800",
	}
	return (
		<button onClick={() => cb && cb()} className={`${themes[color]} rounded-md px-4 py-2 group`}>
			<span className="flex items-center">
				{iconLeft && <span className="transition-transform text-xs text-white pr-4 group-hover:-translate-x-1">{iconLeft}</span>}
				{children}
				{iconRight && <span className="transition-transform text-xs text-white pl-4 group-hover:translate-x-1">{iconRight}</span>}
			</span>
		</button>
	)
}

UIButton.defaultProps = {
	color: "primary",
}

export default UIButton
