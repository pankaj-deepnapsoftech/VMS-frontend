import axios from "axios";
import Cookies from 'js-cookie';



const token = Cookies.get('token');
export const AxiosHandler  =  axios.create({
    
    baseURL:import.meta.env.VITE_BACKEND_BASE_URL,
    withCredentials:true,
    headers:{
        Authorization:`Bearer ${token}`
    }
})

