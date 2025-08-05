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
import { IoIosInformationCircleOutline } from "react-icons/io";
import {
  MdInventory2,
  MdOutlineMiscellaneousServices,
  MdOutlinePendingActions,
  MdSettingsApplications,
  MdSlowMotionVideo,
  MdWifiTetheringErrorRounded,
} from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { GrVulnerability } from "react-icons/gr";
import { SiWikimediafoundation } from "react-icons/si";

export const AllowedPaths = [
  // --------------------Roc Pages-----------------------

  { heading: "ROC Pages" },
  {
    name: "Executive Dashboard",
    value: "/executive-dashboard",
    bgColor: "bg-[#143b4a]/70",
    border: "1px solid #144d59",
    textColor: "text-white"
  },
  {
    name: "Risk Quantification",
    value: "/risk-operation",
    bgColor: "bg-[#153b37]",
    border: "1px solid #154639",
    textColor: "text-white"
  },



  // ------------------asset inventory----------------------



  { heading: "Asset Inventory Pages" },
  {
    name: "InfraStructure Asset",
    value: "/infraStructure-asset",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
    textColor: "text-white"
  },
  {
    name: "Business Applications",
    value: "/business-applications",
    bgColor: "bg-[#153b37]/80",
    border: "1px solid #154639",
    textColor: "text-white"
  },



  // ----------------------- tvm  ------------------------------


  { heading: "TVM Pages" },
  {
    name: "Dashboard",
    value: "/",
    bgColor: "bg-[#143b4a]/70",
    border: "1px solid #144d59",
    textColor: "text-white",
  },
  {
    name: "Scheduling Assesment",
    value: "/scheduling-assesment",
    bgColor: "bg-[#153b37]",
    border: "1px solid #154639",
    textColor: "text-white"
  },
  {
    name: "Pending Assesment",
    value: "/pending-assesment",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
    textColor: "text-white"
  },
  {
    name: "Application Dashbaord",
    value: "/application-dashboard",
    bgColor: "bg-[#1b3057]",
    border: "1px solid #1a2c51",
  },
  {
    name: "Infrastructure Dashbaord",
    value: "/infrastructure-dashboard",
    bgColor: "bg-[#123945]",
    border: "1px solid #124c54",
  },
  {
    name: "Exceptions Dashbaord",
    value: "/exceptions-dashboard",
    bgColor: "bg-[#1b3057]",
    border: "1px solid #1a2c51",
  },
  {
    name: "Pending Exception",
    value: "/pending-exception",
    bgColor: "bg-[#232958]",
    border: "1px solid #2b316c",
    textColor: "text-white"
  },




  // ---------------- Remediation factory ---------------------




  { heading: "Remediation Factory Pages" },
  {
    name: "Remediation",
    value: "/remediation",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
    textColor: "text-white"
  },
  {
    name: "Vulnerability Data",
    value: "/remedition",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
    textColor: "text-white"
  },
  {
    name: "Add Vulnerability Data",
    value: "/add-vulnerability-data",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
    textColor: "text-white"
  },
  {
    name: "Application Data",
    value: "/application-data",
    bgColor: "bg-[#143b4a]",
    border: "1px solid #144d59",
    textColor: "text-white"
  },
  {
    name: "Infrastructure Data",
    value: "/infrastructure-data",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
    textColor: "text-white"
  },




  // ---------------------------- Report -----------------------------


  { heading: "Report Pages" },
  {
    name: "Reports",
    value: "/reports",
    bgColor: "bg-[#3e2334]/70",
    border: "1px solid #552635",
    textColor: "text-white"
  },



  //  ------------------------------- Administration --------------------




  { heading: "Administration Pages" },
  {
    name: "Users",
    value: "/all-users",
    bgColor: "bg-[#153b37]",
    border: "1px solid #154639",
    textColor: "text-white"
  },
  {
    name: "All Tenents",
    value: "/all-tenant",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
    textColor: "text-white"
  },

  {
    name: "Third Party Integrations",
    value: "/third-party-integrations",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
    textColor: "text-white"
  },
  {
    name: "Config Email",
    value: "/config-email",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
    textColor: "text-white"
  },
  {
    name: "Role",
    value: "/roles",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
    textColor: "text-white"
  },
  {
    name: "Partners",
    value: "/partners",
    bgColor: "bg-[#1b3057]",
    border: "1px solid #1a2c51",
    textColor: "text-white"
  },
  {
    name: "Tag Config",
    value: "/tags",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
    textColor: "text-white"
  },


  //  ---------------------- unselected ------------------------

  {
    name: "All Tasks",
    value: "/employee-tasks",
    bgColor: "bg-[#123945]",
    border: "1px solid #124c54",
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
        title: "Scheduling Assesment",
        route: "/scheduling-assesment",
        icon: CalendarClock,
      },
      {
        title: "Pending Assesment",
        route: "/pending-assesment",
        icon: MdOutlinePendingActions,
      },
      {
        title: "Application Dashboard",
        route: "/application-dashboard",
        icon: MdOutlineMiscellaneousServices,
      },
      {
        title: "Infrastructure Dashboard",
        route: "/infrastructure-dashboard",
        icon: GrVulnerability,
      },
      {
        title: "Exceptions Dashboard",
        route: "/exceptions-dashboard",
        icon: AiOutlineException,
      },
      {
        title: "Pending Exceptions",
        route: "/pending-exception",
        icon: MdInventory2,
      },
      {
        title: "Demo",
        route: "/demo",
        icon: MdSlowMotionVideo,
      },
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
      {
        title: "Remedition",
        route: "/remedition",
        icon: SiWikimediafoundation,
      },
      { title: "Vulnerability Data", route: "/vulnerability-data", icon: Bug },
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
      { title: "Config Email", route: "/config-email", icon: Settings },
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
        route: "/executive-dashboard",
        icon: BiSolidDashboard,
      },
      {
        title: "Risk Quantification",
        route: "/risk-operation",
        icon: AiOutlineException,
      },
    ],
  },
];
