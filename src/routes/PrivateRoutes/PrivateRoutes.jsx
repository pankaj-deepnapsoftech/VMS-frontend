import Exceptions from "@/pages/Exceptions";
import Remedition from "@/pages/Remedition";
import Services from "@/pages/Services";
import VulnerableCls from "@/pages/VulnerableCls";
import Home from '@/pages/Home';
import { AllVulnerability } from "@/pages/AllVulnerablity";

export const PrivateRoutes = [
    {
        path: "",
        element: <Home />
    },
    {
        path: "/all-vulnerability",
        element: <AllVulnerability />
    },
    {
        path: "/services",
        element: <Services />
    },
    {
        path: "/vulnerableCls",
        element: <VulnerableCls />
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