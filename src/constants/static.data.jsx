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
import {
  MdInventory2,
  MdOutlineMiscellaneousServices,
  MdOutlinePendingActions,
  MdSettingsApplications,
  MdSlowMotionVideo,
  MdWifiTetheringErrorRounded,
} from "react-icons/md";
import { SiWikimediafoundation } from "react-icons/si";
import { TbReport } from "react-icons/tb";

export const AllowedPaths = [
  {
    name: "Dashboard",
    value: "/",
    bgColor: "bg-[#143b4a]/70",
    border: "1px solid #144d59",
    textColor:"text-white"
  },
  {
    name: "Scheduling Assesment",
    value: "/scheduling-assesment",
    bgColor: "bg-[#153b37]",
    border: "1px solid #154639",
  },
  {
    name: "Pending Assesment",
    value: "/pending-assesment",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
  },
  {
    name: "Vulnerability Data",
    value: "/vulnerability-data",
    bgColor: "bg-[#232958]",
    border: "1px solid #2b316c",
  },
  {
    name: "Application Data",
    value: "/application-data",
    bgColor: "bg-[#143b4a]",
    border: "1px solid #144d59",
  },
  {
    name: "Infrastructure Data",
    value: "/infrastructure-data",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
  },
  {
    name: "Users",
    value: "/all-users",
    bgColor: "bg-[#153b37]",
    border: "1px solid #154639",
  },
  {
    name: "Application Vulnerability",
    value: "/application-vulnerability",
    bgColor: "bg-[#1b3057]",
    border: "1px solid #1a2c51",
  },
  {
    name: "Infrastructure Vulnerability",
    value: "/infrastructure-vulnerability",
    bgColor: "bg-[#123945]",
    border: "1px solid #124c54",
  },
  {
    name: "Exceptions",
    value: "/exceptions",
    bgColor: "bg-[#1b3057]",
    border: "1px solid #1a2c51",
  },
  {
    name: "Reports",
    value: "/reports",
    bgColor: "bg-[#3e2334]/70",
    border: "1px solid #552635",
  },
  {
    name: "Remedition",
    value: "/remedition",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
  },
  {
    name: "InfraStructure Asset",
    value: "/infraStructure-asset",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
  },
  {
    name: "Business Applications",
    value: "/business_applications",
    bgColor: "bg-[#153b37]/80",
    border: "1px solid #154639",
  },
  {
    name: "All Tenents",
    value: "/all-tenant",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
  },
  {
    name: "All Tasks",
    value: "/employee-tasks",
    bgColor: "bg-[#123945]",
    border: "1px solid #124c54",
  },
  {
    name: "Third Party Integrations",
    value: "/third-party-integrations",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
  },
  {
    name: "Role",
    value: "/roles",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
  },
  {
    name: "Partners",
    value: "/partners",
    bgColor: "bg-[#1b3057]",
    border: "1px solid #1a2c51",
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
    icon: "/Icons/Component 1.png",
    allowedPath: [
      {
        title: "Infrastructure Asset",
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
      {
        title: "Assesment Schedule",
        route: "/assesment-schedule",
        icon: CalendarClock,
      },
      {
        title: "Pending Assesment",
        route: "/pending-assesment",
        icon: MdOutlinePendingActions,
      },
      // {
      //   title: "Application Dashboard",
      //   route: "/application-vulnerability",
      //   icon: MdOutlineMiscellaneousServices,
      // },
      // {
      //   title: "Infrastructure Dashboard",
      //   route: "/infrastructure-vulnerability",
      //   icon: GrVulnerability,
      // },
      // {
      //   title: "Exceptions Dashboard",
      //   route: "/exceptions",
      //   icon: AiOutlineException,
      // },
      {
        title: "Pending Exceptions",
        route: "/pending-exception",
        icon: MdInventory2,
      },
      // {
      //   title: "Demo",
      //   route: "/demo",
      //   icon: MdSlowMotionVideo,
      // },
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
    bg: "from-[#9b1c4d] to-[#df4156]",
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
      // {
      //   title: "Remedition",
      //   route: "/remedition",
      //   icon: SiWikimediafoundation,
      // },
      // { title: "Vulnerability Data", route: "/vulnerability-data", icon: Bug },
      {
        title: "Add Vulnerability Data",
        route: "/add-vulnerability-data",
        icon: FaBug,
      },
      {
        title: "Application Data",
        route: "/application-data",
        icon: MdSettingsApplications,
      },
      {
        title: "Infrastructure Data",
        route: "/infrastructure-data",
        icon: IoIosInformationCircleOutline,
      },
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
    icon: "/Icons/Component 6.png",
    allowedPath: [
      { title: "Users", route: "/all-users", icon: Users },
      { title: "Tenant", route: "/all-tenant", icon: UserCircle },
      {
        title: "Third Party Integrations",
        route: "/third-party-integrations",
        icon: MdWifiTetheringErrorRounded,
      },
      // { title: "Config Email", route: "/config-email", icon: Settings },
      { title: "Role", route: "/roles", icon: LucideShield },
      { title: "Partners", route: "/partners", icon: Users },
      { title: "Tag Config", route: "/tags", icon: MdInventory2 },
    ],
  },
  {
    title: "ROC",
    desc: "Risk Operation Center",
    allowedPath: [
      {
        title: "Executive Dashboard",
        route: "/executivedashboard",
        icon: BiSolidDashboard,
      },
      {
        title: "Risk Quantification",
        route: "/riskoperation",
        icon: AiOutlineException,
      },
    ],
  },
];
