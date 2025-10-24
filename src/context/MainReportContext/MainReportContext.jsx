import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useState } from "react";


export const MainReportContext = createContext({
    GetAllReports:()=>{},
    reportsData:[]
});


// eslint-disable-next-line react/prop-types
const MainReportContextProvider = ({children}) => {

    const [reportsData,setReportsData] = useState([]);

    const GetAllReports = async(tenant) => {
        try {
            const res = await AxiosHandler(`/report/get-report?tenat=${tenant ? tenant : ""}`);
            console.log("this is just testing ============>>",res)
            setReportsData(res.data?.data)
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <MainReportContext.Provider value={{GetAllReports,reportsData}}>
            {children}
        </MainReportContext.Provider>
    )
};

export default MainReportContextProvider




