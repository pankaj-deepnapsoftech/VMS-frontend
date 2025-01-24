import { useContext } from "react";
import { authContext } from "./AuthContext/AuthContext";
import {DataContext} from "./DataContext/DataContext";









export {default as AuthContextProvider} from "./AuthContext/AuthContext";
export {default as DataContextProvider} from "./DataContext/DataContext";













export const useAuthContext= ()=>useContext(authContext)
export const useDataContext = () => useContext(DataContext);