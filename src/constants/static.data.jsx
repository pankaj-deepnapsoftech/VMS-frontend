import { CalendarClock, Settings, Table, UserCircle, Users } from "lucide-react";
import { AiOutlineException } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { GrVulnerability } from "react-icons/gr";
import { MdInventory2, MdOutlineMiscellaneousServices } from "react-icons/md";
import { SiWikimediafoundation } from "react-icons/si";
import { TbLockPassword, TbReport } from "react-icons/tb";


export const AllowedPaths = [
    {
        name: "Dashboard",
        value: "/",
    },
    {
        name: "Scheduling Assesment",
        value: "/scheduling-assesment",
    },
    {
        name: "Vulnerability Data",
        value: "/vulnerability-data",
    },
    {
        name: "All Employee",
        value: "/all-employee",
    },
    {
        name: "Application Vulnerability",
        value: "/application-vulnerability",
    },
    {
        name: "Infrastructure Vulnerability",
        value: "/infrastructure-vulnerability",
    },
    {
        name: "Exceptions",
        value: "/exceptions",
    },
    {
        name: "Reports",
        value: "/reports",
    },
    {
        name: "Remedition",
        value: "/remedition",
    },
]





export const ChartsColor = {
    Informational: "#A0C878",
    Low: "#60B5FF",
    Medium: "#F3C623",
    High: "#E83F25",
    Critical: "#E55050",
}


export const products = [
    {
        title: "Asset Inventory",
        desc: "Centralized asset visibility and management",
        gradient: "from-[#ee9ca7] to-[#ffdde1]",
        allowedPath: [{ title: "Asset Inventory", route: "/assert-inventory", icon: MdInventory2 },]
    },
    {
        title: "TVM",
        desc: "Threat and Vulnerability Management",
        gradient: "from-[#ff7e5f] to-[#feb47b]",
        allowedPath: [
            { title: "Dashboard", route: "", icon: BiSolidDashboard },
            { title: "Scheduling Assesment", route: "/scheduling-assesment", icon: CalendarClock },
            { title: "Application Vulnerability", route: "/application-vulnerability", icon: MdOutlineMiscellaneousServices },
            { title: "Infrastructure Vulnerability ", route: "/infrastructure-vulnerability", icon: GrVulnerability },
            { title: "Exceptions", route: "/exceptions", icon: AiOutlineException },
        ]
    },
    {
        title: "ASM",
        desc: "Attack Surface Monitoring for real-time visibility",
        gradient: "from-[#00c6ff] to-[#0072ff]",
        allowedPath: []
    },
   
   
    {
        title: "AI-VA",
        desc: "Governance, Risk, and Compliance",
        gradient: "from-[#ee9ca7] to-[#ffdde1]",
        allowedPath: []
    },
    {
        title: "Vulnerability Intelligence",
        desc: "Governance, Risk, and Compliance",
        gradient: "from-[#ff7e5f] to-[#feb47b]",
        allowedPath: []
    },
     {
        title: "GRC",
        desc: "Governance, Risk, and Compliance",
        gradient: "from-[#f7971e] to-[#ffd200]",
        allowedPath: []
    },
    {
        title: "TPRM",
        desc: "Third-Party Risk Management",
        gradient: "from-[#43cea2] to-[#185a9d]",
        allowedPath: []
    },
     {
        title: "Remediation Factory",
        desc: "Automated remediation of vulnerabilities or security issues across an organization.",
        gradient: "from-[#6a11cb] to-[#2575fc]",
        allowedPath: [
            { title: "Remedition", route: "/remedition", icon: SiWikimediafoundation },
        ]
    },
    {
        title: "Reports",
        desc: "Generate reports & dashboards automatically",
        gradient: "from-[#a1c4fd] to-[#c2e9fb]",
        allowedPath: [{ title: "Reports", route: "/reports", icon: TbReport },]
    },
    {
        title: "Administration",
        desc: "Admin control panel for team and roles",
        gradient: "from-[#fceabb] to-[#f8b500]",
        allowedPath: [
            { title: "Employees", route: "/all-employee", icon: Users },
            { title: "Customers", route: "/all-customer", icon: UserCircle },
            { title: "Jira Data Table", route: "/jira-data", icon: Table },
            { title: "Third Party Config", route: "/third-party-config", icon: Settings },
            {title:"Change Password",route:"/change-password", icon:TbLockPassword }
        ]
    },
];



