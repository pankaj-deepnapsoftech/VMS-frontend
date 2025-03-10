import ApplicationVulnerability from "@/pages/ApplicationVulnerability";
import ClientDashboard from "@/pages/ClientDashboard";
import Exceptions from "@/pages/Exceptions";
import Home from "@/pages/Home";
import InfrastructureVulnerability from "@/pages/InfrastructureVulnerability";
import Remedition from "@/pages/Remedition";
import Reports from "@/pages/Reports";
import SchedulingAssessmentPage from "@/pages/SchedulingAssessment";
import { VulnerabilityData } from "@/pages/VulnerablityData";


export const ClientSmeRoutes = [
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
    }
]