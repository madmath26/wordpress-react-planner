import React from 'react'
import { useContext } from 'react'
import { DataContext } from '../context/dataContext'
const DebugCMP = () => {
  const { data } = useContext(DataContext)
  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
}

export default DebugCMP