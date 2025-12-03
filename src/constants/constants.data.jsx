import {
  AiOutlineException,
  BiSolidDashboard,
  FaRegBookmark,
  GrVulnerability,
  IoShield,
  IoShieldHalf,
  FaPerson,
  MdInventory2,
  MdOutlineMiscellaneousServices,
  SiWikimediafoundation,
  TbReport,
  TbLockPassword,
  FaBug,
  SlCalender,
  IoSettingsOutline,
  CiViewTable,
  FaRegUserCircle,
  FaUsers,
} from "@/constants/Icons";


export const list = [
  { title: "Dashboard", route: "", icon: BiSolidDashboard },
  {
    title: "Scheduling Assesment",
    route: "/scheduling-assesment",
    icon: SlCalender,
  },
  { title: "Asset Inventory", route: "/asset-inventory", icon: MdInventory2 },
  { title: "Users", route: "/all-user", icon: FaUsers  },
  { title: "All Tenents", route: "/all-tenent", icon: FaRegUserCircle  },
  { title: "Vulnerability Data", route: "/vulnerability-data", icon: FaBug },
  { title: "Third Party Data", route: "/jira-data", icon: CiViewTable },
  { title: "Third Party Config", route: "/third-party-config", icon: IoSettingsOutline },
  {
    title: "Application Vulnerability",
    route: "/application-vulnerability",
    icon: MdOutlineMiscellaneousServices,
  },
  {
    title: "Infrastructure Vulnerability ",
    route: "/infrastructure-vulnerability",
    icon: GrVulnerability,
  },
  { title: "Exceptions", route: "/exceptions", icon: AiOutlineException },
  { title: "Book Demo", route: "/book-demo", icon: FaRegBookmark },
  { title: "Remedition", route: "/remedition", icon: SiWikimediafoundation },
  { title: "Reports", route: "/reports", icon: TbReport },
  { title: "Change Password", route: "/change-password", icon: TbLockPassword },
];

export const EmployeeList = [
  { title: "Dashboard", route: "", icon: BiSolidDashboard },
  { title: "All Tasks", route: "/employee-tasks", icon: IoShieldHalf },
  { title: "Reports", route: "/reports", icon: TbReport },
  { title: "Change Password", route: "/change-password", icon: TbLockPassword },
];

export const ClientSmeList = [
  { title: "Dashboard", route: "/", icon: BiSolidDashboard },
  {
    title: "Scheduling Assesment",
    route: "/scheduling-assesment",
    icon: BiSolidDashboard,
  },
  { title: "Vulnerability Data", route: "/vulnerability-data", icon: IoShield },
  {
    title: "Application Vulnerability",
    route: "/application-vulnerability",
    icon: MdOutlineMiscellaneousServices,
  },
  {
    title: "Infrastructure Vulnerability ",
    route: "/infrastructure-vulnerability",
    icon: GrVulnerability,
  },
  { title: "Exceptions", route: "/exceptions", icon: AiOutlineException },
  { title: "Remedition", route: "/remedition", icon: SiWikimediafoundation },
  { title: "Reports", route: "/reports", icon: TbReport },
  { title: "Change Password", route: "/change-password", icon: TbLockPassword },
];

export const ClientCisoList = [
  // { title: "Dashboard", route: "/", icon: BiSolidDashboard },
  { title: "Dashboard", route: "/", icon: BiSolidDashboard },
  {
    title: "Scheduling Assesment",
    route: "/scheduling-assesment",
    icon: IoShieldHalf,
  },
  { title: "All Employee", route: "/all-employee", icon: FaPerson },
  { title: "Vulnerability Data", route: "/vulnerability-data", icon: IoShield },
  {
    title: "Application Vulnerability",
    route: "/application-vulnerability",
    icon: MdOutlineMiscellaneousServices,
  },
  {
    title: "Infrastructure Vulnerability ",
    route: "/infrastructure-vulnerability",
    icon: GrVulnerability,
  },
  { title: "Exceptions", route: "/exceptions", icon: AiOutlineException },
  { title: "Remedition", route: "/remedition", icon: SiWikimediafoundation },
  { title: "Reports", route: "/reports", icon: TbReport },
  { title: "Change Password", route: "/change-password", icon: TbLockPassword },
];

export const AllRoutesProtection = ["/", "/scheduling-assesment"];

export const darkTheme = {
  colors: {
    primary: "white", // Text color for the selected value in the input box
    primary25: "#666", // Background color when the option is hovered
    primary50: "#444", // Background color when the option is selected
    primary75: "#333", // Background color when focused (optional)
    neutral0: "#333", // Background of the select input
    neutral10: "#777", // Border color when focused
    neutral20: "#999", // Arrow color
    neutral30: "white", // Text color in options (white)
    neutral40: "#ccc", // Disabled option text color
    neutral50: "#e0e0e0",
    neutral60: "#f5f5f5",
  },
};

export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#1c1c2e", // dark background
    color: "white",
    borderColor: state.isFocused ? "#666" : "#444",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#666",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "white",
    backgroundColor: state.isSelected
      ? "#007bff"
      : state.isFocused
      ? "#444"
      : "transparent",
    padding: 10,
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1c1c2e",
  }),
  input: (provided) => ({
    ...provided,
    color: "white",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#aaa",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "white",
    "&:hover": {
      color: "#ddd",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};
