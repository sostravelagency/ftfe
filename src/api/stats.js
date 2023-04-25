import axios from "axios"
import { API_URL } from "../config"

const stats= async ()=> {
    const res= await axios({
        url: API_URL+ "/stats",
        method: "get"
    })
    const result= await res.data
    return result
}   

export default stats