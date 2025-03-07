import Exceptions from "@/pages/Exceptions";
import Remedition from "@/pages/Remedition";
import Services from "@/pages/ApplicationVulnerability";
import VulnerableCls from "@/pages/InfrastructureVulnerability";
import Home from '@/pages/Home';
import AllCustomer from "@/pages/AllCustomer";
import { VulnerabilityData } from "@/pages/VulnerablityData";
import ApplicationVulnerability from "@/pages/ApplicationVulnerability";
import InfraStructureVulnerability from "@/pages/InfrastructureVulnerability";
import AllEmployee from "@/pages/AllEmployee";
import { JiraDataTable } from "@/pages/JiraDataTable";
import ThirdPartyConfig from "@/pages/thirdPartyConfiguration";
import { EmployeeAllTasks } from "@/pages/EmployeeAllTasks";
import EmployeeDashboard from "@/pages/EmployeDashboard";
import SchedulingAssessmentPage from "@/pages/SchedulingAssessment";
import Reports from "@/pages/Reports";


export const PrivateRoutes = [
    {
        path: "",
        element: <Home />
    },
    {
        path: "/scheduling-assesment",
        element: <SchedulingAssessmentPage />
    },
    {
        path: "/vulnerability-data",
        element: <VulnerabilityData />
    },

    {
        path: "/jira-data",
        element: <JiraDataTable />
    },
    {
        path: "/third-party-config",
        element: <ThirdPartyConfig />
    },
    {
        path: "/all-customer",
        element: <AllCustomer />
    },
    {
        path: "/all-employee",
        element: <AllEmployee />
    },

    {
        path: "/application-vulnerability",
        element: <ApplicationVulnerability />
    },
    {
        path: "/infrastructure-vulnerability",
        element: <InfraStructureVulnerability />
    },
    {
        path: "/exceptions",
        element: <Exceptions />
    },
    {
        path: "/remedition",
        element: <Remedition />
    },
    {
        path: "/reports",
        element: <Reports />
    },
]