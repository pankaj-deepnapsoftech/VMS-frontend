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


export const PrivateRoutes = [
    {
        path: "",
        element: <Home />
    },
    {
        path: "/vulnerability-data",
        element: <VulnerabilityData />
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
]