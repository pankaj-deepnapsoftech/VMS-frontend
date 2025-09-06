import Exceptions from "@/pages/Exceptions";
import Remediation from "@/pages/Remedition";
import Home from "@/pages/Home";
import AllCustomer from "@/pages/AllCustomer";
import { VulnerabilityData } from "@/pages/VulnerablityData";
import ApplicationVulnerability from "@/pages/ApplicationVulnerability";
import InfraStructureVulnerability from "@/pages/InfrastructureVulnerability";
import AllEmployee from "@/pages/AllEmployee";

import SchedulingAssessmentPage from "@/pages/SchedulingAssessment";
import Reports from "@/pages/Reports";
import ChatPage from "@/pages/ChatPage";
import  AssertInventory  from "@/pages/AssertInventory";
import ChangePassword from "@/pages/ChangePassword";
import AdminBookDemo from "@/pages/AdminBookDemo";
import ApplicationSoftwareInventory from "@/pages/ApplicationSoftwareInventory";
import ClientCISO from "@/pages/ClientCiso";
import NewUser from "@/pages/NewUser";
import EmailConfigPanel from "@/pages/Configure";
import Roles from "@/pages/Roles";
import JiraDataTable from "@/pages/JiraDataTable";
import Partners from "@/pages/Partners";
import ThirdPartyIntegrations from "@/pages/ThirdPartyIntegrations";
import UserProfile from "@/pages/UserDetails";
import PendingAssessment from "@/pages/PendingAssessment";
import { ApplicationData } from "@/pages/ApplicationData";
import { InfrastructureData } from "@/pages/InfrastructureData";
import BusinessApplications from "@/pages/BusinessApplications";
import VulnerabilityForm from "@/pages/AddVulnerabilityData";
import ExceptionTable from "@/pages/ExceptionTable";
import TagsPage from "@/pages/TagConfig";
import DemoDashboard from "@/pages/demo/Dashboard";
import RiskOperation from "@/pages/RiskQuantification";
import ExecutiveDashboard from "@/pages/ExecutiveDashboard";
import InProgressAssessment from "@/pages/InProgress";
import CompleteAssessment from "@/pages/CompleteAssessment";
import Severity from "@/pages/SLA-Configuration";
import ErrorBoundary from "@/utils/Errorhandler";

export const PrivateRoutes = [
  {
    path: "",
    element: <ErrorBoundary><Home /></ErrorBoundary>,
  },
  {
    path: "/assesment-schedule",
    element: <ErrorBoundary><SchedulingAssessmentPage /></ErrorBoundary>,
  },

  {
    path: "/pending-assesment",
    element: <ErrorBoundary><PendingAssessment /></ErrorBoundary>,
  },
  {
    path: "/vulnerability-data",
    element: <ErrorBoundary><VulnerabilityData /></ErrorBoundary>,
  },
  {
    path: "/application-data",
    element: <ErrorBoundary><ApplicationData /></ErrorBoundary>,
  },
  {
    path: "/infrastructure-data",
    element: <ErrorBoundary><InfrastructureData /></ErrorBoundary>,
  },
  {
    path: "/third-party-data",
    element: <ErrorBoundary><JiraDataTable /></ErrorBoundary>,
  },
  {
    path: "/third-party-integrations",
    element: <ErrorBoundary><ThirdPartyIntegrations /></ErrorBoundary>,
  },
  {
    path: "/all-tenant",
    element: <ErrorBoundary><AllCustomer /></ErrorBoundary>,
  },
  {
    path: "/config-email",
    element: <ErrorBoundary><EmailConfigPanel /></ErrorBoundary>,
  },
  {
    path: "/roles",
    element: <ErrorBoundary><Roles /></ErrorBoundary>,
  },
  {
    path: "/partners",
    element: <ErrorBoundary><Partners /></ErrorBoundary>,
  },
  {
    path: "/all-users",
    element: <ErrorBoundary><AllEmployee /></ErrorBoundary>,
  },
  {
    path: "/application-dashboard",
    element: <ErrorBoundary><ApplicationVulnerability /></ErrorBoundary>,
  },
  {
    path: "/infrastructure-dashboard",
    element: <ErrorBoundary><InfraStructureVulnerability /></ErrorBoundary>,
  },
  {
    path: "/exceptions-dashboard",
    element: <ErrorBoundary><Exceptions /></ErrorBoundary>,
  },
  {
    path: "/remedition",
    element: <ErrorBoundary><Remediation /></ErrorBoundary>,
  },
  {
    path: "/reports",
    element: <ErrorBoundary><Reports /></ErrorBoundary>,
  },
  {
    path: "/chat/:chatId",
    element: <ErrorBoundary><ChatPage /></ErrorBoundary>,
  },
  {
    path: "/infraStructure-asset",
    element: <ErrorBoundary><AssertInventory /></ErrorBoundary>,
    
  },
  {
    path: "/change-password",
    element: <ErrorBoundary><ChangePassword /></ErrorBoundary>,
  },
  {
    path: "/user-details",
    element: <ErrorBoundary><UserProfile /></ErrorBoundary>,
  },
  {
    path: "/book-demo",
    element: <ErrorBoundary><AdminBookDemo /></ErrorBoundary>,
  },
  {
    path: "/application",
    element: <ErrorBoundary><ApplicationSoftwareInventory /></ErrorBoundary>,
  },
  {
    path: "/client-Sme",
    element: <ErrorBoundary><ClientCISO /></ErrorBoundary>,
  },
  {
    path: "/newuser",
    element: <ErrorBoundary><NewUser /></ErrorBoundary>,
  },
  {
    path: "/business-applications",
    element: <ErrorBoundary><BusinessApplications /></ErrorBoundary>,
  },
  {
    path:"/add-vulnerability-data",
    element:<ErrorBoundary><VulnerabilityForm/></ErrorBoundary>,
  },
  {
    path:"/pending-exception",
    element:<ErrorBoundary><ExceptionTable/></ErrorBoundary>,
  },
  {
    path:"/tags",
    element:<ErrorBoundary><TagsPage/></ErrorBoundary>,
  },
  {
    path:"/demo",
    element:<ErrorBoundary><DemoDashboard/></ErrorBoundary>,
  },
  {
    path:"/risk-operation",
    element:<ErrorBoundary><RiskOperation/></ErrorBoundary>,
  },
  {
    path:"/executive-dashboard",
    element:<ErrorBoundary><ExecutiveDashboard/></ErrorBoundary>,
  },
  {
    path:"/edit-vulnerability-data",
    element:<ErrorBoundary><VulnerabilityForm/></ErrorBoundary>,
  },
  {
    path:"/in-progress-assessment",
    element:<ErrorBoundary><InProgressAssessment/></ErrorBoundary>,
  },
  {
    path:"/completed-assessment",
    element:<ErrorBoundary><CompleteAssessment/></ErrorBoundary>,
  },
  {
    path:"/sla-configuration",
    element:<ErrorBoundary><Severity/></ErrorBoundary>,
  }
];
