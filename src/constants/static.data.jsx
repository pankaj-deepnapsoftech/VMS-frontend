import {
  Bug,
  CalendarClock,
  LucideShield,
  Settings,
  UserCircle,
  Users,
} from "lucide-react";
import { FaBug } from "react-icons/fa";
import { AiOutlineException } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { GrVulnerability } from "react-icons/gr";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdInventory2, MdOutlineMiscellaneousServices, MdOutlinePendingActions, MdSettingsApplications, MdWifiTetheringErrorRounded } from "react-icons/md";
import { SiWikimediafoundation } from "react-icons/si";
import { TbReport } from "react-icons/tb";

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
    name: "Pending Assesment",
    value: "/pending-assesment",
  },
  {
    name: "Vulnerability Data",
    value: "/vulnerability-data",
  },
  {
    name: "Application Data",
    value: "/application-data",
  },
  {
    name: "Infrastructure Data",
    value: "/infrastructure-data",
  },
  {
    name: "Users",
    value: "/all-users",
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
    name: "InfraStructure Asset",
    value: "/infraStructure-asset",
  },
  {
    name: "Business Applications",
    value: "/business_applications",
  },
  {
    name: "All Tenents",
    value: "/all-tenant",
  },
  {
    name: "All Tasks",
    value: "/employee-tasks",
  }, 
  {
    name: "Third Party Integrations",
    value: "/third-party-integrations",
  }, 
  {
    name: "Role",
    value: "/roles",
  }, 
  {
    name: "Partners",
    value: "/partners",
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
    icon:"/Icons/Component 1.png",
    allowedPath: [
      {
        title: "InfraStructure Asset",
        route: "/infraStructure-asset",
        icon: MdInventory2,
      },
      {
        title: "Business Applications",
        route: "/business-applications",
        icon: MdInventory2,
      },
    ],
  },
  {
    title: "Threat & Vulnerability Management (TVM)",
    desc: "Threat and Vulnerability Management",
    borderColor: "#ff7e5f",
    icon: "/Icons/Vector.png",
    allowedPath: [
      { title: "Dashboard", route: "/", icon: BiSolidDashboard },
      { title: "Scheduling Assesment", route: "/scheduling-assesment", icon: CalendarClock },
      { title: "Pending Assesment", route: "/pending-assesment", icon: MdOutlinePendingActions  },
      { title: "Application Vulnerability", route: "/application-vulnerability", icon: MdOutlineMiscellaneousServices },
      { title: "Infrastructure Vulnerability", route: "/infrastructure-vulnerability", icon: GrVulnerability },
      { title: "Exceptions", route: "/exceptions", icon: AiOutlineException },
    ],
  },
  {
    title: "Attack Surface Management (ASM)",
    desc: "Attack Surface Monitoring",
    borderColor: "#00c6ff",
    bg: "from-[#126d83] to-[#22D3EE]",
    icon: "/Icons/Component 2.png",
    allowedPath: [],
  },
  {
    title: "Risk and Compliances",
    desc: "Risk and Compliances",
    bg:"from-[#9b1c4d] to-[#df4156]",
    borderColor: "#9b1c4d",
    icon: "/Icons/Component 3.png",
    allowedPath: [],
  },
 
  {
    title: "AI-VA",
    desc: "AI Virtual Analyst",
    borderColor: "#ee9ca7",
    icon: " /Icons/Vector.png",
    allowedPath: [],
  },
  {
    title: "Vulnerability Intelligence",
    desc: "Insights on vulnerabilities",
    borderColor: "#feb47b",
    icon: "/Icons/Component 3.png",
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
    icon: "/Icons/Component 4.png",
    allowedPath: [
      { title: "Remedition", route: "/remedition", icon: SiWikimediafoundation },
      { title: "Vulnerability Data", route: "/vulnerability-data", icon: Bug },
      {
        title:"Add Vulnerability Data",
        route:"/add-vulnerability-data",
        icon: FaBug,
      },
      { title: "Application Data", route: "/application-data", icon: MdSettingsApplications  },
      { title: "Infrastructure Data", route: "/infrastructure-data", icon: IoIosInformationCircleOutline   },
    ],
  },
  {
    title: "Reports",
    desc: "Generate reports & dashboards",
    borderColor: "#a1c4fd",
    icon: "/Icons/Component 5.png",
    allowedPath: [{ title: "Reports", route: "/reports", icon: TbReport }],
  },
  {
    title: "Administration",
    desc: "Admin control panel",
    borderColor: "#f8b500",
    icon:"/Icons/Component 6.png",
    allowedPath: [
      { title: "Users", route: "/all-users", icon: Users },
      { title: "Tenant", route: "/all-tenant", icon: UserCircle },
      { title: "Third Party Integrations", route: "/third-party-integrations", icon: MdWifiTetheringErrorRounded  },
      { title: "Config Email", route: "/config-email", icon: Settings },
      { title: "Role", route: "/roles", icon: LucideShield  },
      { title: "Partners", route: "/partners", icon: Users },
    ],
  },
];


