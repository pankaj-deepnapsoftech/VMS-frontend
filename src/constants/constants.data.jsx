import { AiOutlineException } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { GrVulnerability } from "react-icons/gr";
import { IoPerson, IoShield } from "react-icons/io5";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { SiWikimediafoundation } from "react-icons/si";

export const list = [
    { title: "Dashboard", route: "", icon: BiSolidDashboard },
    { title: "Vulnerability Data", route: "/vulnerability-data", icon: IoShield },
    { title: "All Customer", route: "/all-customer", icon: IoPerson },
    { title: "All Employee", route: "/all-employee", icon: IoPerson },
    { title: "Application Vulnerability", route: "/application-vulnerability", icon: MdOutlineMiscellaneousServices },
    { title: "Infrastructure Vulnerability ", route: "/infrastructure-vulnerability", icon: GrVulnerability },
    { title: "Exceptions", route: "/exceptions", icon: AiOutlineException },
    { title: "Remedition", route: "/remedition", icon: SiWikimediafoundation },
];