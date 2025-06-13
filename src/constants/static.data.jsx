import {
  Bug,
  CalendarClock,
  Settings,
  Table,
  UserCircle,
  Users,
} from "lucide-react";
import { AiOutlineException } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { FaShieldAlt } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { FiDatabase } from "react-icons/fi";
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
    name: "Users",
    value: "/all-user",
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
  {
    name: "Asset Inventory",
    value: "/asset-inventory",
  },
  {
    name: "All Tenents",
    value: "/all-tenent",
  },
  {
    name: "All Tasks",
    value: "/employee-tasks",
  }, 

];

export const ChartsColor = {
  Informational: "#A0C878",
  Low: "#60B5FF",
  Medium: "#F3C623",
  High: "#E83F25",
  Critical: "#E55050",
};

// products.js



export const products = [
  {
    title: "Asset Inventory",
    desc: "Centralized asset visibility and management",
    borderColor: "#9b1c4d",
    icon: <FiDatabase />,
    allowedPath: [
      {
        title: "Asset Inventory",
        route: "/asset-inventory",
        icon: MdInventory2,
      },
    ],
  },
  {
    title: "Threat & Vulnerability Management (TVM)",
    desc: "Threat and Vulnerability Management",
    borderColor: "#ff7e5f",
    icon: <BiSolidDashboard />,
    allowedPath: [
      { title: "Dashboard", route: "", icon: BiSolidDashboard },
      { title: "Scheduling Assesment", route: "/scheduling-assesment", icon: CalendarClock },
      { title: "Application Vulnerability", route: "/application-vulnerability", icon: MdOutlineMiscellaneousServices },
      { title: "Infrastructure Vulnerability", route: "/infrastructure-vulnerability", icon: GrVulnerability },
      { title: "Exceptions", route: "/exceptions", icon: AiOutlineException },
    ],
  },
  {
    title: "Risk and Compliances",
    desc: "Risk and Compliances",
    bg:"from-[#9b1c4d] to-[#df4156]",
    borderColor: "#9b1c4d",
    icon: <FaShieldAlt />,
    allowedPath: [],
  },
  {
    title: "Attack Surface Management (ASM)",
    desc: "Attack Surface Monitoring",
    borderColor: "#00c6ff",
    bg:"from-[#0891B2] to-[#22D3EE]",
    icon: <GrVulnerability />,
    allowedPath: [],
  },
  {
    title: "AI-VA",
    desc: "AI Virtual Analyst",
    borderColor: "#ee9ca7",
    icon: <MdOutlineMiscellaneousServices />,
    allowedPath: [],
  },
  {
    title: "Vulnerability Intelligence",
    desc: "Insights on vulnerabilities",
    borderColor: "#feb47b",
    icon: <Bug />,
    allowedPath: [],
  },
  {
    title: "GRC",
    desc: "Governance, Risk & Compliance",
    borderColor: "#f7971e",
    icon: <Settings />,
    allowedPath: [],
  },
  {
    title: "TPRM",
    desc: "Third-Party Risk Management",
    borderColor: "#43cea2",
    icon: <Users />,
    allowedPath: [],
  },
  {
    title: "Remediation Factory",
    desc: "Automated remediation of vulnerabilities",
    borderColor: "#6a11cb",
    icon: <SiWikimediafoundation />,
    allowedPath: [
      { title: "Remedition", route: "/remedition", icon: SiWikimediafoundation },
      { title: "Vulnerability Data", route: "/vulnerability-data", icon: Bug },
    ],
  },
  {
    title: "Reports",
    desc: "Generate reports & dashboards",
    borderColor: "#a1c4fd",
    icon: <TbReport />,
    allowedPath: [{ title: "Reports", route: "/reports", icon: TbReport }],
  },
  {
    title: "Administration",
    desc: "Admin control panel",
    borderColor: "#f8b500",
    icon: <UserCircle />,
    allowedPath: [
      { title: "Users", route: "/all-users", icon: Users },
      { title: "Tenant", route: "/all-tenant", icon: UserCircle },
      { title: "Third Party Integrations", route: "/third-party-integrations", icon: Settings },
      { title: "Config Email", route: "/config-email", icon: Settings },
      { title: "Role", route: "/roles", icon: Users },
      { title: "Partners", route: "/partners", icon: Users },
    ],
  },
];


