import AllEmployee from "@/pages/AllEmployee";
import ApplicationVulnerability from "@/pages/ApplicationVulnerability";
import ClientDashboard from "@/pages/ClientDashboard";
import Exceptions from "@/pages/Exceptions";
import InfrastructureVulnerability from "@/pages/InfrastructureVulnerability";
import Remedition from "@/pages/Remedition";
import Reports from "@/pages/Reports";
import SchedulingAssessmentPage from "@/pages/SchedulingAssessment";
import { VulnerabilityData } from "@/pages/VulnerablityData";


export const ClientCisoRoutes = [
    {
        path: "/",
        element: <ClientDashboard />
    },
    {
        path: "/scheduled-tasks",
        element: <SchedulingAssessmentPage />
    },
    {
        path: "/vulnerability-data",
        element: <VulnerabilityData />
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
        element: <InfrastructureVulnerability />
    },
    {
        path: "/exceptions",
        element: <Exceptions />
    },
    {
        path: "/reports",
        element: <Reports />
    },
    {
        path: "/remedition",
        element: <Remedition />
    }]