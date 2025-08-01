import Exceptions from "@/pages/Exceptions";
import Remedition from "@/pages/Remedition";
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

export const PrivateRoutes = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "/scheduling-assesment",
    element: <SchedulingAssessmentPage />,
  },
  {
    path: "/pending-assesment",
    element: <PendingAssessment />,
  },
  {
    path: "/vulnerability-data",
    element: <VulnerabilityData />,
  },
  {
    path: "/application-data",
    element: <ApplicationData />,
  },
  {
    path: "/infrastructure-data",
    element: <InfrastructureData />,
  },
  {
    path: "/third-party-data",
    element: <JiraDataTable />,
  },
  {
    path: "/third-party-integrations",
    element: <ThirdPartyIntegrations />,
  },
  {
    path: "/all-tenant",
    element: <AllCustomer />,
  },
  {
    path: "/config-email",
    element: <EmailConfigPanel />,
  },
  {
    path: "/roles",
    element: <Roles />,
  },
  {
    path: "/partners",
    element: <Partners />,
  },
  {
    path: "/all-users",
    element: <AllEmployee />,
  },
  {
    path: "/application-vulnerability",
    element: <ApplicationVulnerability />,
  },
  {
    path: "/infrastructure-vulnerability",
    element: <InfraStructureVulnerability />,
  },
  {
    path: "/exceptions",
    element: <Exceptions />,
  },
  {
    path: "/remedition",
    element: <Remedition />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
  {
    path: "/chat/:chatId",
    element: <ChatPage />,
  },
  {
    path: "/infraStructure-asset",
    element: <AssertInventory />,
    
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/user-details",
    element: <UserProfile />,
  },
  {
    path: "/book-demo",
    element: <AdminBookDemo />,
  },
  {
    path: "/application",
    element: <ApplicationSoftwareInventory />,
  },
  {
    path: "/client-Sme",
    element: <ClientCISO />,
  },
  {
    path: "/newuser",
    element: <NewUser />,
  },
  {
    path: "/business-applications",
    element: <BusinessApplications />,
  },
  {
    path:"/add-vulnerability-data",
    element:<VulnerabilityForm/>,
  },
  {
    path:"/pending-exception",
    element:<ExceptionTable/>
  },
  {
    path:"/tags",
    element:<TagsPage/>
  },
  {
    path:"/demo",
    element:<DemoDashboard/>
  },
  {
    path:"/riskoperation",
    element:<RiskOperation/>
  },
  {
    path:"/executivedashboard",
    element:<ExecutiveDashboard/>
  },
  {
    path:"/edit-vulnerability-data",
    element:<VulnerabilityForm/>,
  },
];
