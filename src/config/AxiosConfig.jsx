import { decrypt, encrypt } from "@/utils/EncryptAndDcrypt";
import axios from "axios";
import Cookies from 'js-cookie';


const token = Cookies.get('AT'); 

const NewDecryptionToken = (tk) => {
    const data = decrypt(tk)
    const newToken = encrypt({...data,frontend:true});
    return newToken
}

export const AxiosHandler  =  axios.create({
    
    baseURL:import.meta.env.VITE_BACKEND_BASE_URL,
    withCredentials:true,
    headers:{
        Authorization:`Bearer ${NewDecryptionToken(token)}`
    }

})












































