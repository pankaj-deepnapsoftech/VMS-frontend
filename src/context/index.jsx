import { useContext } from "react";
import { authContext } from "./AuthContext/AuthContext";
import { DataContext } from "./DataContext/DataContext";
import { VulnerabililtyDataContext } from "./VulnerabilityDataContext/VulnerabilityDataContext";









export { default as AuthContextProvider } from "./AuthContext/AuthContext";
export { default as DataContextProvider } from "./DataContext/DataContext";
export { default as VulnerabililtyDataContextProvider } from "./VulnerabilityDataContext/VulnerabilityDataContext";













export const useAuthContext = () => useContext(authContext)
export const useDataContext = () => useContext(DataContext);
export const useVulnerabililtyDataContext = () => useContext(VulnerabililtyDataContext);