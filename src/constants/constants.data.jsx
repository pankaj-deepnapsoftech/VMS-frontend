import { AiOutlineException } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { FaPersonBooth } from "react-icons/fa";
import { GrVulnerability } from "react-icons/gr";
import { IoPerson, IoShield, IoShieldHalf } from "react-icons/io5";
import { FaPerson } from "react-icons/fa6";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { SiWikimediafoundation } from "react-icons/si";
import { TbReport } from "react-icons/tb";
import { Bug, CalendarClock, Settings, Table, UserCircle, Users } from "lucide-react";

export const list = [
    { title: "Dashboard", route: "", icon: BiSolidDashboard },
    { title: "Scheduling Assesment", route: "/scheduling-assesment", icon: CalendarClock },
    { title: "Employees", route: "/all-employee", icon: Users },
    { title: "Customers", route: "/all-customer", icon: UserCircle },
    { title: "Vulnerability Data", route: "/vulnerability-data", icon: Bug },
    { title: "Jira Data Table", route: "/jira-data", icon: Table },
    { title: "Third Party Config", route: "/third-party-config", icon: Settings },
    { title: "Application Vulnerability", route: "/application-vulnerability", icon: MdOutlineMiscellaneousServices },
    { title: "Infrastructure Vulnerability ", route: "/infrastructure-vulnerability", icon: GrVulnerability },
    { title: "Exceptions", route: "/exceptions", icon: AiOutlineException },
    // { title: "Remedition", route: "/remedition", icon: SiWikimediafoundation },
    { title: "Reports", route: "/reports", icon: TbReport },
];


export const EmployeeList = [
    { title: "Dashboard", route: "", icon: BiSolidDashboard },
    { title: "All Tasks", route: "/employee-tasks", icon: IoShieldHalf },
    { title: "Reports", route: "/reports", icon: TbReport },

]

export const ClientSmeList = [
    { title: "Dashboard", route: "", icon: BiSolidDashboard },
    { title: "Scheduling Assesment", route: "/scheduling-assesment", icon: BiSolidDashboard },
    { title: "Vulnerability Data", route: "/vulnerability-data", icon: IoShield },
    { title: "Application Vulnerability", route: "/application-vulnerability", icon: MdOutlineMiscellaneousServices },
    { title: "Infrastructure Vulnerability ", route: "/infrastructure-vulnerability", icon: GrVulnerability },
    { title: "Exceptions", route: "/exceptions", icon: AiOutlineException },
    { title: "Remedition", route: "/remedition", icon: SiWikimediafoundation },
    { title: "Reports", route: "/reports", icon: TbReport },


]


export const ClientCisoList = [
    // { title: "Dashboard", route: "/", icon: BiSolidDashboard },
    { title: "Dashboard", route: "", icon: BiSolidDashboard },
    { title: "Scheduled Tasks", route: "/scheduled-tasks", icon: IoShieldHalf },
    { title: "All Employee", route: "/all-employee", icon: FaPerson },
    { title: "Vulnerability Data", route: "/vulnerability-data", icon: IoShield },
    { title: "Application Vulnerability", route: "/application-vulnerability", icon: MdOutlineMiscellaneousServices },
    { title: "Infrastructure Vulnerability ", route: "/infrastructure-vulnerability", icon: GrVulnerability },
    { title: "Exceptions", route: "/exceptions", icon: AiOutlineException },
    { title: "Remedition", route: "/remedition", icon: SiWikimediafoundation },
    { title: "Reports", route: "/reports", icon: TbReport },

]



export const AllRoutesProtection = [
    "/", "/scheduling-assesment"
] 