import Exceptions from "@/pages/Exceptions";
import Remedition from "@/pages/Remedition";
import Services from "@/pages/Services";
import VulnerableCls from "@/pages/VulnerableCls";
import Home from '@/pages/Home';

export const PrivateRoutes = [
    {
        path: "",
        element: <Home />
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