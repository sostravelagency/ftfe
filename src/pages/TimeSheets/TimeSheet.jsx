import React from 'react'
import TimeSheets from '../../component/TimeSheets/TimeSheets'
import Navbar from '../../component/Component/NavBar'

const TimeSheet = () => {
  return (
    <div style={{width: "100%", display: "flex", height: "100vh"}}>
        <Navbar />
        <TimeSheets />
    </div>
  )
}

export default TimeSheet