import { AiOutlineException } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { GrVulnerability } from "react-icons/gr";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { SiWikimediafoundation } from "react-icons/si";

export const list= [ 
    {title:"Dashboard", route:"",icon:BiSolidDashboard  },
    {title:"All Vulnerability", route:"/all-vulnerability",icon:BiSolidDashboard  },
    {title:"Application Vulnerability", route:"/services",icon:MdOutlineMiscellaneousServices  },
    {title:" InfraStructure Vulnerability ", route:"/vulnerableCls",icon:GrVulnerability  },
    {title:"Exceptions", route:"/exceptions",icon:AiOutlineException  },
    {title:"Remedition", route:"/remedition",icon:SiWikimediafoundation  },
   ];