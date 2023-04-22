import axios from "axios"
import { API_URL } from "../config"
import Cookies from "js-cookie"

const get_detail_staff= async ()=> {
    const res= await axios({
        url: API_URL+ "/api/detail/staff",
        method: "get",
        params: {
            uid: Cookies.get("uid")|| "0"
        }
    })
    const result= await res.data
    return result
}

export default get_detail_staff