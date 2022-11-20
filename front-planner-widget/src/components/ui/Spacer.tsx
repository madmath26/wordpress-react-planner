import React from 'react'
interface Props {
  size:number
}
const UISpacer = ({ size }: Props) => {
	return <div className={`py-${size}`} />
}

export default UISpacer