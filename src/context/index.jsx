import { useContext } from "react";
import { authContext } from "./AuthContext/AuthContext";









export {default as AuthContextProvider} from "./AuthContext/AuthContext";













export const useAuthContext= ()=>useContext(authContext)