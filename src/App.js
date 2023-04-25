import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './component/Signup'
import Login from './component/Login'
import ForgotPassword from './component/ForgotPassword'
import TimeKeeping from './component/TimeKeeping'
import Information from './component/Information'
import TimeSheet from './pages/TimeSheets/TimeSheet'
import Staff from './component/Staff/Staff'
import Home from './component/Home/Home'
import ConfirmStaff from './component/ConfirmStaff/ConfirmStaff'
import CameraFaceDetection from './component/Test/Test'
import Cookies from 'js-cookie'

function App() {
  return (
    <Router>
      <Routes>
        {
          Cookies.get("login")=== "true" ? 
        <Route path={"/"} element={<Home />} />
        :
        <Route path={"/"} element={<Navigate to={"/timekeeping"} />} />
        }
        <Route path={"/signup"} element={<Signup />} />
        {/* <Route path={"/login"} element={<Login />} /> */}
        <Route path={"/forgot-password"} element={<ForgotPassword />} />
        <Route path={"/timekeeping"} element={<TimeKeeping />} />
        <Route path={"/information"} element={<Information />} />
        <Route path={"/time-sheets"} element={<TimeSheet />} />
        <Route path={"/staff"} element={<Staff />} />
        <Route path={"/confirm-staff"} element={<ConfirmStaff />} />
        <Route path={"/test"} element={<CameraFaceDetection />} />
      </Routes>
    </Router>
  )
}

export default App
