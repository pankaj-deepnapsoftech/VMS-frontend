import Exceptions from "@/pages/Exceptions";
import Remedition from "@/pages/Remedition";
import Home from "@/pages/Home";
import AllCustomer from "@/pages/AllCustomer";
import { VulnerabilityData } from "@/pages/VulnerablityData";
import ApplicationVulnerability from "@/pages/ApplicationVulnerability";
import InfraStructureVulnerability from "@/pages/InfrastructureVulnerability";
import AllEmployee from "@/pages/AllEmployee";
import ThirdPartyConfig from "@/pages/thirdPartyConfiguration";
import SchedulingAssessmentPage from "@/pages/SchedulingAssessment";
import Reports from "@/pages/Reports";
import ChatPage from "@/pages/ChatPage";
import { AssertInventory } from "@/pages/AssertInventory";
import ChangePassword from "@/pages/ChangePassword";
import AdminBookDemo from "@/pages/AdminBookDemo";
import ApplicationSoftwareInventory from "@/pages/ApplicationSoftwareInventory";
import DataTable from "@/pages/DataTable";
import RiskRatingTable from "@/pages/RiskRatingTable";
import Devices from "@/pages/DevicesTable";
import ApplicationSoftwareInventoryTable from "@/pages/ApplicationSoftwareTable";
import RiskRatingGuide from "@/pages/RiskRatingGuide";
import ClientCISO from "@/pages/ClientCiso";
import NewUser from "@/pages/NewUser";
import EmailConfigPanel from "@/pages/Configure";
import UserManagement from "@/pages/ManageUsers";
import ManageTenants from "@/pages/ManageTenants";
import Roles from "@/pages/Roles";
import JiraDataTable from "@/pages/JiraDataTable";
import Partners from "@/pages/Partners";

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
    path: "/vulnerability-data",
    element: <VulnerabilityData />,
  },
  {
    path: "/third-party-data",
    element: <JiraDataTable />,
  },
  {
    path: "/third-party-config",
    element: <ThirdPartyConfig />,
  },
  {
    path: "/all-tenant",
    element: <AllCustomer />,
  },
  {
    path: "/config-email",
    element: <EmailConfigPanel />,
  },
  // {
  //   path: "/manage-users",
  //   element: <UserManagement />,
  // },
  // {
  //   path: "/manage-tenants",
  //   element: <ManageTenants />,
  // },
  {
    path: "/roles",
    element: <Roles />,
  },
  // {
  //   path: "/partners",
  //   element: <Partners />,
  // },
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
    path: "/asset-inventory",
    element: <AssertInventory />,
    children: [
      { path: "", element: <Devices /> },
      {
        path: "software-application",
        element: <ApplicationSoftwareInventoryTable />,
      },
      { path: "data-table", element: <DataTable /> },
      { path: "risk-rating-table", element: <RiskRatingTable /> },
      { path: "risk-rating-guide", element: <RiskRatingGuide /> },
    ],
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
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
];
