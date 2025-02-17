import { AiOutlineException } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { FaPersonBooth } from "react-icons/fa";
import { GrVulnerability } from "react-icons/gr";
import { IoPerson, IoShield, IoShieldHalf } from "react-icons/io5";
import { FaPerson } from "react-icons/fa6";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { SiWikimediafoundation } from "react-icons/si";

export const list = [
    { title: "Dashboard", route: "", icon: BiSolidDashboard },
    { title: "Scheduling Assesment", route: "/scheduling-assesment", icon: BiSolidDashboard },
    { title: "All Employee", route: "/all-employee", icon: FaPerson },
    { title: "All Customer", route: "/all-customer", icon: IoPerson },
    { title: "Vulnerability Data", route: "/vulnerability-data", icon: IoShield },
    { title: "Jira Data Table", route: "/jira-data", icon: IoShieldHalf },
    { title: "Third Party Config", route: "/third-party-config", icon: IoShieldHalf },
    { title: "Application Vulnerability", route: "/application-vulnerability", icon: MdOutlineMiscellaneousServices },
    { title: "Infrastructure Vulnerability ", route: "/infrastructure-vulnerability", icon: GrVulnerability },
    { title: "Exceptions", route: "/exceptions", icon: AiOutlineException },
    { title: "Remedition", route: "/remedition", icon: SiWikimediafoundation },
];


export const EmployeeList = [
    { title: "Dashboard", route: "/", icon: BiSolidDashboard },
    { title: "All Tasks", route: "/all-employee-tasks", icon: IoShieldHalf },

]

export const ClientSmeList = [
    { title: "Dashboard", route: "/", icon: BiSolidDashboard },
    { title: "Scheduling Assesment", route: "/scheduling-assesment", icon: BiSolidDashboard },
]


export const ClientCisoList = [
    { title: "Dashboard", route: "/", icon: BiSolidDashboard },
    { title: "Scheduled Tasks", route: "/scheduled-tasks", icon: IoShieldHalf },

]