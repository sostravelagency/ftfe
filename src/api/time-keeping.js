import axios from "axios"
import { API_URL } from "../config"

const timekeeping= async (employee_id, date, status, date_check)=> {
    const res= await axios({
        url: API_URL+ "/staff/time-keeping",
        method: "post",
        data: {
            employee_id, date, status, date_check
        }
    })
    const result= await res.data
    return result
}

export default timekeeping