/* eslint-disable react-refresh/only-export-components */
import { useContext } from "react";
import { authContext } from "./AuthContext/AuthContext";
import { DataContext } from "./DataContext/DataContext";
import { VulnerabililtyDataContext } from "./VulnerabilityDataContext/VulnerabilityDataContext";
import { AllCustomerContext } from "./AllCustomerContext/AllCustomerContext";
import { AllEmployeeContext } from "./AllEmployeeContext/AllEmployeeContext";
import { JiraContext } from "./JiraTableContext/JiraTableContext";
import { ApplicationVulnerabilityContext } from "./ApplicationVulnerabilityContext/ApplicationVulnerabilityContext";
import { AssesmentContext } from "./SchedulingAssesmentContext/SchedulingAssesmentContext";
import { RemeditionContext } from "./RemeditionContext/RemeditionContext";
import { ExceptionContext } from "./ExceptionContext/ExceptionContext";
import { ReportContext } from "./ReportContext/ReportContext";
import { InfrastructureVulnerabilityContext } from "./InfrastructureVulnerabilityContext/InfrastructureVulnerabilityContext";
import { InfraAssetContext } from "./InfraAssetContext/InfraAssetContext";
import { TagsContext } from "./TagsContext/TagsContext";
import { TVMCardsContext } from "./TVMCardsContext/TVMCardsContext";
import { SeverityContext } from "./SeverityContext/SeverityContext";
import { NessusContext } from "./nessuscontext/NessusContext";

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

export { default as InfrastructureVulnerabilityContextProvider } from "./InfrastructureVulnerabilityContext/InfrastructureVulnerabilityContext";
export { default as InfraAssetContextProvider } from "./InfraAssetContext/InfraAssetContext";

export { default as TagsContextProvider } from "./TagsContext/TagsContext";
export { default as ReportContextProvider } from "./ReportContext/ReportContext";
export { default as TVMCardsContextProvider } from "./TVMCardsContext/TVMCardsContext";
export { default as SeverityContextProvider } from "./SeverityContext/SeverityContext";
export { default as NessusContextProvider } from "./nessuscontext/NessusContext";

export const useAuthContext = () => useContext(authContext);
export const useDataContext = () => useContext(DataContext);
export const useVulnerabililtyDataContext = () =>
  useContext(VulnerabililtyDataContext);
export const useAllCustomerContext = () => useContext(AllCustomerContext);
export const useAllEmployeeContext = () => useContext(AllEmployeeContext);
export const useJiraContext = () => useContext(JiraContext);
export const useApplicationVulnerabilityContext = () =>
  useContext(ApplicationVulnerabilityContext);
export const useScheduleAssessmentContext = () => useContext(AssesmentContext);
export const useRemeditionContext = () => useContext(RemeditionContext);
export const useExceptionContext = () => useContext(ExceptionContext);
export const useInfrastructureVulnerabilityContext = () =>
  useContext(InfrastructureVulnerabilityContext);
export const useInfraAssetContext = () => useContext(InfraAssetContext);
export const useTagsContext = () => useContext(TagsContext);
export const useReportContext = () => useContext(ReportContext);
export const useTVMCardsContext = () => useContext(TVMCardsContext);
export const useSeverityContext = () => useContext(SeverityContext);
export const useNessusContext = () => useContext(NessusContext);
