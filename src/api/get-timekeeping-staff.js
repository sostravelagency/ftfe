import axios from "axios"
import { API_URL } from "../config"
import Cookies from "js-cookie"

const gettimekeepingstaff= async ()=> {
    const res= await axios({
        url: API_URL+ "/staff/get/timekeeping",
        method: "get",
        params: {
            uid: Cookies.get("uid")
        }
    })
    const result= await res.data
    return result
}

export default gettimekeepingstaff