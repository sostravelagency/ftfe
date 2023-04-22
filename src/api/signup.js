import axios from "axios"
import { API_URL } from "../config"

const signup= async (name, email, phone, password)=> {
    const res= await axios({
        url: API_URL+ "/signup",
        method: "post",
        data: {
            name, email, phone, password
        }
    })
    const result= await res.data
    return result
}

export default signup