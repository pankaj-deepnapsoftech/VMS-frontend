import { AiOutlineException } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { GrVulnerability } from "react-icons/gr";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { SiWikimediafoundation } from "react-icons/si";

export const list= [ 
    {title:"Dashboard", route:"",icon:BiSolidDashboard  },
    {title:"Services", route:"/services",icon:MdOutlineMiscellaneousServices  },
    {title:"Vulnerable cls", route:"/vulnerableCls",icon:GrVulnerability  },
    {title:"Exceptions", route:"/exceptions",icon:AiOutlineException  },
    {title:"Remedition", route:"/remedition",icon:SiWikimediafoundation  },
   ];