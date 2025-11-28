/* eslint-disable react-refresh/only-export-components */
import { useContext } from "react";

// working on it
import { DataContext } from "./DataContext/DataContext";
import { VulnerabililtyDataContext } from "./VulnerabilityDataContext/VulnerabilityDataContext";
// import { AllEmployeeContext } from "./AllEmployeeContext/AllEmployeeContext";
import { JiraContext } from "./JiraTableContext/JiraTableContext";
import { ApplicationVulnerabilityContext } from "./ApplicationVulnerabilityContext/ApplicationVulnerabilityContext";
import { RemeditionContext } from "./RemeditionContext/RemeditionContext";
import { ExceptionContext } from "./ExceptionContext/ExceptionContext";
import { InfrastructureVulnerabilityContext } from "./InfrastructureVulnerabilityContext/InfrastructureVulnerabilityContext";
import { MailContext } from "./MailContext/MailContext";
import { AIVAContext } from "./AI-VAContext/AI-VAContext";







// working on it
export { default as DataContextProvider } from "./DataContext/DataContext";
export { default as VulnerabililtyDataContextProvider } from "./VulnerabilityDataContext/VulnerabilityDataContext";
// export { default as AllEmployeeContextProvider } from "./AllEmployeeContext/AllEmployeeContext";
export { default as JiraContextProvider } from "./JiraTableContext/JiraTableContext";
export { default as ApplicationVulnerabilityContextProvider } from "./ApplicationVulnerabilityContext/ApplicationVulnerabilityContext";
export { default as RemeditionContextProvider } from "./RemeditionContext/RemeditionContext";
export { default as ExceptionContextProvider } from "./ExceptionContext/ExceptionContext";
export { default as InfrastructureVulnerabilityContextProvider } from "./InfrastructureVulnerabilityContext/InfrastructureVulnerabilityContext";
export { default as MailContextProvider } from "./MailContext/MailContext";








// working on it
export const useDataContext = () => useContext(DataContext);
export const useVulnerabililtyDataContext = () =>  useContext(VulnerabililtyDataContext);
// export const useAllEmployeeContext = () => useContext(AllEmployeeContext);
export const useJiraContext = () => useContext(JiraContext);
export const useApplicationVulnerabilityContext = () =>  useContext(ApplicationVulnerabilityContext);
export const useRemeditionContext = () => useContext(RemeditionContext);
export const useExceptionContext = () => useContext(ExceptionContext);
export const useInfrastructureVulnerabilityContext = () =>  useContext(InfrastructureVulnerabilityContext);
export const useMailContext = () => useContext(MailContext);
export const useAIVAContext = () => useContext(AIVAContext);
