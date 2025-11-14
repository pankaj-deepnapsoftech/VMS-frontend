import {
  AirVent,
  Boxes,
  Bug,
  CalendarClock,
  CassetteTape,
  ChartNoAxesCombined,
  Component,
  FileUp,
  LucideShield,
  Settings,
  User,
  UserCircle,
  Users,
} from "lucide-react";
import { FaBug, FaCheckCircle } from "react-icons/fa";
import { AiOutlineException } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import {
  MdInventory2,
  MdOutlineMiscellaneousServices,
  MdOutlinePendingActions,
  MdScheduleSend,
  MdSettingsApplications,
  MdWifiTetheringErrorRounded,
} from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { GiCyberEye, GiProgression, GiTwirlCenter } from "react-icons/gi";
import { PiHardHatFill } from "react-icons/pi";
import { RiHome3Fill } from "react-icons/ri";
import { SiWikimediafoundation } from "react-icons/si";
import { GrVulnerability } from "react-icons/gr";

export const AllowedPaths = [
  // --------------------Roc Pages-----------------------

  { heading: "ROC Pages" },
  {
    name: "Executive Dashboard",
    value: "/executive-dashboard",
    bgColor: "bg-[#143b4a]/70",
    border: "1px solid #144d59",
    textColor: "text-white",
    permission: ["view"],
  },
  {
    name: "Risk Quantification",
    value: "/risk-operation",
    bgColor: "bg-[#153b37]",
    border: "1px solid #154639",
    textColor: "text-white",
    permission: ["view"],
  },

  // ------------------asset inventory----------------------

  { heading: "Asset Inventory Pages" },
  {
    name: "InfraStructure Asset",
    value: "/infraStructure-asset",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
    textColor: "text-white",
    permission: ["view", "create", "modify", "delete"],
  },
  {
    name: "Business Applications",
    value: "/business-applications",
    bgColor: "bg-[#153b37]/80",
    border: "1px solid #154639",
    textColor: "text-white",
    permission: ["view", "create", "modify", "delete"],
  },

  // ----------------------- tvm  ------------------------------

  { heading: "TVM Pages" },
  {
    name: "Dashboard",
    value: "/",
    bgColor: "bg-[#143b4a]/70",
    border: "1px solid #144d59",
    textColor: "text-white",
    permission: ["view"],
  },
  {
    name: "Scheduling Assesment",
    value: "/assesment-schedule",
    bgColor: "bg-[#153b37]",
    border: "1px solid #154639",
    textColor: "text-white",
    permission: ["", "create"],
  },
  {
    name: "Pending Assesment",
    value: "/pending-assesment",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
    textColor: "text-white",
    permission: ["view", "", "modify", "delete"],
  },
  {
    name: "In-Progress Assesment",
    value: "/in-progress-assessment",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
    textColor: "text-white",
    permission: ["view", "", "modify", "delete"],
  },
  {
    name: "Completed Assesment",
    value: "/complete-assessment",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
    textColor: "text-white",
    permission: ["view", "", "modify", "delete"],
  },
  {
    name: "Application Dashbaord",
    value: "/application-dashboard",
    bgColor: "bg-[#1b3057]",
    border: "1px solid #1a2c51",
    permission: ["view"],
  },
  {
    name: "Infrastructure Dashbaord",
    value: "/infrastructure-dashboard",
    bgColor: "bg-[#123945]",
    border: "1px solid #124c54",
    permission: ["view"],
  },
  {
    name: "Exceptions Dashbaord",
    value: "/exceptions-dashboard",
    bgColor: "bg-[#1b3057]",
    border: "1px solid #1a2c51",
    permission: ["view"],
  },
  {
    name: "Pending Exception",
    value: "/pending-exception",
    bgColor: "bg-[#232958]",
    border: "1px solid #2b316c",
    textColor: "text-white",
    permission: ["view", "create"],
  },

  // ---------------- Remediation factory ---------------------

  { heading: "Remediation Factory Pages" },
  {
    name: "Remediation", 
    value: "/remediation",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
    textColor: "text-white",
    permission: ["view"],
  },
  {
    name: "Add Vulnerability Data",
    value: "/add-vulnerability-data",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
    textColor: "text-white",
    permission: ["", "create"],
  },
  {
    name: "Application Data",
    value: "/application-data",
    bgColor: "bg-[#143b4a]",
    border: "1px solid #144d59",
    textColor: "text-white",
    permission: ["view", "", "modify", "delete"],
  },
  {
    name: "Infrastructure Data",
    value: "/infrastructure-data",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
    textColor: "text-white",
    permission: ["view", "", "modify", "delete"],
  },

  // ---------------------------- Report --------------------------------------

  { heading: "Report Pages" },
  {
    name: "Reports",
    value: "/reports",
    bgColor: "bg-[#3e2334]/70",
    border: "1px solid #552635",
    textColor: "text-white",
    permission: ["view", "create", "modify", "delete"],
  },

  //  ------------------------------- Administration ---------------------------

  { heading: "Administration Pages" },
  {
    name: "Users",
    value: "/all-users",
    bgColor: "bg-[#153b37]",
    border: "1px solid #154639",
    textColor: "text-white",
    permission: ["view", "create", "modify", "delete"],
  },

  {
    name: "Third Party Integrations",
    value: "/third-party-integrations",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
    textColor: "text-white",
    permission: ["view", "create", "modify", "delete"],
  },
  {
    name: "Config Email",
    value: "/config-email",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
    textColor: "text-white",
    permission: ["", "create"],
  },
  {
    name: "Role",
    value: "/roles",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
    textColor: "text-white",
    permission: ["view", "create", "modify", "delete"],
  },
  {
    name: "Partners",
    value: "/partners",
    bgColor: "bg-[#1b3057]",
    border: "1px solid #1a2c51",
    textColor: "text-white",
    permission: ["view", "create", "modify", "delete"],
  },
  {
    name: "Tag Config",
    value: "/tags",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
    textColor: "text-white",
    permission: ["view", "create", "modify", "delete"],
  },
  {
    name: "SLA Configuration",
    value: "/sla-configuration",
    bgColor: "bg-[#232958]",
    border: "1px solid #282e63",
    textColor: "text-white",
    permission: ["view", "create", "modify", "delete"],
  },

  //  ---------------------- unselected ------------------------

  // {
  //   name: "All Tasks",
  //   value: "/employee-tasks",
  //   bgColor: "bg-[#123945]",
  //   border: "1px solid #124c54",
  //   permission:['view','create','modify','delete']
  // },
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
    title: "Dashboard",
    desc: "Centralized asset visibility and management",
    borderColor: "#9b1c4d",
    icon: BiSolidDashboard,
    ShownTitle: "Dashboard",
    allowedPath: [
      {
        title: "Executive Dashboard",
        route: "/",
        icon: Component,
      },
      {
        title: "TVM Dashboard",
        route: "/tvm-dashboard",
        icon: Boxes,
      },
      {
        title: "Exposure Dashboard",
        route: "/exposure-dashboard",
        icon: ChartNoAxesCombined,
      },

      // {
      //   title: "Application Dashboard",
      //   route: "/application-dashboard",
      //   icon: MdOutlineMiscellaneousServices,
      // },
      // {
      //   title: "Infrastructure Dashboard",
      //   route: "/infrastructure-dashboard",
      //   icon: GrVulnerability,
      // },
    ],
  },
  {
    title: "Cyber Risk Quantification",
    desc: "Admin control panel",
    borderColor: "#f8b500",
    icon: GiCyberEye,
    ShownTitle: "Administration",
    allowedPath: [
      {
        title: "Risk Details",
        route: "/risk-details",
        icon: AiOutlineException,
      },
    ],
  },
  {
    title: "Asset Management",
    desc: "Centralized asset visibility and management",
    borderColor: "#9b1c4d",
    icon: MdInventory2,
    ShownTitle: "Asset Inventory",
    allowedPath: [
      {
        title: "Infrastructure Asset",
        route: "/infraStructure-asset",
        icon: CassetteTape,
      },
      {
        title: "Business Applications",
        route: "/business-applications",
        icon: MdInventory2,
      },
    ],
  },
  {
    title: "Vulnerability Management",
    desc: "Threat and Vulnerability Management",
    borderColor: "#ff7e5f",
    icon: MdOutlinePendingActions,
    ShownTitle: "Threat & Vulnerability Management",
    allowedPath: [
      {
        title: "Manage Assessments",
        icon: CalendarClock,
        childRoutes: [
          {
            title: "Schedule Assessment",
            route: "/assesment-schedule",
            icon: MdScheduleSend,
          },
          {
            title: "Pending Assesment",
            route: "/pending-assesment",
            icon: MdOutlinePendingActions,
          },
          {
            title: "In-Progress Assessment",
            route: "/in-progress-assessment",
            icon: GiProgression,
          },
          {
            title: "Completed Assessment",
            route: "/completed-assessment",
            icon: FaCheckCircle,
          },
        ],
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
        title: "Add Vulnerability",
        route: "/add-vulnerability-data",
        icon: FaBug,
      },
      {
        title: "All Vulnerability",
        route: "/vulnerability-data",
        icon: Bug,
      },
      {
        title: "Application Vulnerabilities",
        route: "/application-data",
        icon: MdSettingsApplications,
      },
      {
        title: "Infrastructure Vulnerabilities",
        route: "/infrastructure-data",
        icon: IoIosInformationCircleOutline,
      },
      // {
      //   title: "Demo",
      //   route: "/demo",
      //   icon: MdSlowMotionVideo,
      // },
    ],
  },
  // {
  //   title: "Attack Surface Management (ASM)",
  //   desc: "Attack Surface Monitoring",
  //   borderColor: "#00c6ff",
  //   bg: "from-[#126d83] to-[#22D3EE]",
  //   icon: "/Icons/Component 2.png",
  //   allowedPath: [],
  // },
  // {
  //   title: "Risk and Compliances",
  //   desc: "Risk and Compliances",
  //   bg: "from-[#9b1c4d] to-[#df4156]",
  //   borderColor: "#9b1c4d",
  //   icon: "/Icons/Component 3.png",
  //   allowedPath: [],
  // },

  {
    title: "Exposure Management",
    desc: "AI Virtual Analyst",
    borderColor: "#ee9ca7",
    icon: AirVent,
    ShownTitle: "AI-VA",
    allowedPath: [
      {
        title: "Dashboard",
        route: "/center-dashboard",
        icon: RiHome3Fill,
      },
      {
        title: "Attack Surface Management",
        route: "/attack-surface",
        icon: GiTwirlCenter,
      },
    ],
  },
  // {
  //   title: "Remediation Factory",
  //   desc: "Automated remediation of vulnerabilities",
  //   borderColor: "#6a11cb",
  //   icon: User,
  //   ShownTitle: "Remediation Factory",
  //   allowedPath: [
  //     {
  //       title: "Remediation",
  //       route: "/remedition",
  //       icon: SiWikimediafoundation,
  //     },
  //     { title: "Vulnerability Data", route: "/vulnerability-data", icon: Bug },
  //     {
  //       title: "Add Vulnerability Data",
  //       route: "/add-vulnerability-data",
  //       icon: FaBug,
  //     },
  //     {
  //       title: "Application Data",
  //       route: "/application-data",
  //       icon: MdSettingsApplications,
  //     },
  //     {
  //       title: "Infrastructure Data",
  //       route: "/infrastructure-data",
  //       icon: IoIosInformationCircleOutline,
  //     },
  //   ],
  // },

  {
    title: "Reports",
    desc: "Generate reports & dashboards",
    borderColor: "#a1c4fd",
    icon: MdOutlineMiscellaneousServices,
    ShownTitle: "Reports",
    allowedPath: [
      { title: "Upload Reports", route: "/reports", icon: TbReport },
      { title: "Download Reports", route: "/download-report", icon: FileUp },
    ],
  },

  {
    title: "Administration",
    desc: "Admin control panel",
    borderColor: "#f8b500",
    icon: LucideShield,
    ShownTitle: "Administration",
    allowedPath: [
      { title: "Manage Tenants", route: "/all-tenant", icon: UserCircle },
      { title: "Manage Partners", route: "/partners", icon: Users },
      { title: "Manage Users", route: "/all-users", icon: Users },
      { title: "Manage Roles", route: "/roles", icon: LucideShield },
      { title: "Manage Tags", route: "/tags", icon: MdInventory2 },
      {
        title: "Manage SLA",
        route: "/sla-configuration",
        icon: PiHardHatFill,
      },
      {
        title: "Integrations",
        route: "/third-party-integrations",
        icon: MdWifiTetheringErrorRounded,
      },
      // { title: "Config Email", route: "/config-email", icon: Settings },
    ],
  },
];
