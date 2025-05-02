/* eslint-disable react-refresh/only-export-components */
import { useContext } from "react";
import { authContext } from "./AuthContext/AuthContext";
import { DataContext } from "./DataContext/DataContext";
import { VulnerabililtyDataContext } from "./VulnerabilityDataContext/VulnerabilityDataContext";
import { AllCustomerContext } from "./AllCustomerContext/AllCustomerContext";
import { AllEmployeeContext } from "./AllEmployeeContext/AllEmployeeContext";
import { JiraContext } from "./JiraTableContext/JiraTableContext";
import { ApplicationVulnerabilityContext } from "./ApplicationVulnerabilityContext/ApplicationVulnerabilityContext";
import SchedulingAssesmentContext, { AssesmentContext } from "./SchedulingAssesmentContext/SchedulingAssesmentContext";
import { RemeditionContext } from "./RemeditionContext/RemeditionContext";
import { ExceptionContext } from "./ExceptionContext/ExceptionContext";
import { ReportContext } from "./ReportContext/ReportContext";
import { InfrastructureVulnerabilityContext } from "./InfrastructureVulnerabilityContext/InfrastructureVulnerabilityContext";








export { default as AuthContextProvider } from "./AuthContext/AuthContext";
export { default as DataContextProvider } from "./DataContext/DataContext";
export { default as VulnerabililtyDataContextProvider } from "./VulnerabilityDataContext/VulnerabilityDataContext";
export { default as AllCustomerContextProvider } from "./AllCustomerContext/AllCustomerContext";
export { default as AllEmployeeContextProvider } from "./AllEmployeeContext/AllEmployeeContext";
export { default as JiraContextProvider } from "./JiraTableContext/JiraTableContext";
export { default as ApplicationVulnerabilityContextProvider } from "./ApplicationVulnerabilityContext/ApplicationVulnerabilityContext";
export { default as SchedulingAssesmentContextProvider } from "./SchedulingAssesmentContext/SchedulingAssesmentContext";
export { default as RemeditionContextProvider } from "./RemeditionContext/RemeditionContext";
export { default as ExceptionContextProvider } from "./ExceptionContext/ExceptionContext";

export { default as InfrastructureVulnerabilityContextProvider } from "./InfrastructureVulnerabilityContext/InfrastructureVulnerabilityContext"







export const useAuthContext = () => useContext(authContext)
export const useDataContext = () => useContext(DataContext);
export const useVulnerabililtyDataContext = () => useContext(VulnerabililtyDataContext);
export const useAllCustomerContext = () => useContext(AllCustomerContext);
export const useAllEmployeeContext = () => useContext(AllEmployeeContext);
export const useJiraContext = () => useContext(JiraContext);
export const useApplicationVulnerabilityContext = () => useContext(ApplicationVulnerabilityContext);
export const useScheduleAssessmentContext = () =>
	useContext(AssesmentContext)
export const useRemeditionContext = () =>
	useContext(RemeditionContext)
export const useExceptionContext = () =>
	useContext(ExceptionContext)
export const useInfrastructureVulnerabilityContext = () =>
	useContext(InfrastructureVulnerabilityContext)







