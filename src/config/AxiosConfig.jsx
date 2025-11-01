import { decrypt, encrypt } from "@/utils/EncryptAndDcrypt";
import axios from "axios";
import Cookies from 'js-cookie';
import { config } from "./env.config";


const token = Cookies.get('AT');

export const NewDecryptionToken = (tk) => {
    if (!tk) {
        return ""
    }
    const data = decrypt(tk)
    const newToken = encrypt({ ...data, frontend: true });
    return newToken
}

export const AxiosHandler = axios.create({

    baseURL: HandleBaseUser(config.REACT_ENV),
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${token}`
    }
});


function HandleBaseUser(env) {
    switch (env) {
        case "development":
            return config.LOCAL_BACKEND_BASE_URL;
        case "demo":
            return config.DEMO_BACKEND_BASE_URL;
        case "vapt":
            return config.VAPT_BACKEND_BASE_URL;
        case "securend":
            return config.SECUREND_BACKEND_BASE_URL;
    }
}












































