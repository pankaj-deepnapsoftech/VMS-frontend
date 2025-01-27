import { useContext } from "react";
import { authContext } from "./AuthContext/AuthContext";
import { DataContext } from "./DataContext/DataContext";
import { VulnerabililtyDataContext } from "./VulnerabilityDataContext/VulnerabilityDataContext";
import { AllCustomerContext } from "./AllCustomerContext/AllCustomerContext";
import { AllEmployeeContext } from "./AllEmployeeContext/AllEmployeeContext";









export { default as AuthContextProvider } from "./AuthContext/AuthContext";
export { default as DataContextProvider } from "./DataContext/DataContext";
export { default as VulnerabililtyDataContextProvider } from "./VulnerabilityDataContext/VulnerabilityDataContext";
export { default as AllCustomerContextProvider } from "./AllCustomerContext/AllCustomerContext";
export { default as AllEmployeeContextProvider } from "./AllEmployeeContext/AllEmployeeContext";













export const useAuthContext = () => useContext(authContext)
export const useDataContext = () => useContext(DataContext);
export const useVulnerabililtyDataContext = () => useContext(VulnerabililtyDataContext);
export const useAllCustomerContext = () => useContext(AllCustomerContext);
export const useAllEmployeeContext = () => useContext(AllEmployeeContext);