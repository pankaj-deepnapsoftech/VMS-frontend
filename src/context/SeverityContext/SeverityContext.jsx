import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useState } from "react";
import toast from "react-hot-toast";


export const SeverityContext = createContext({
    CreateSeverity: () => {},
    GetSeverity:() => {},
    SeverityData:[],
});

// eslint-disable-next-line react/prop-types
const SeverityContextProvider = ({ children }) => {

    const [SeverityData,setSeverityData] = useState([]);

    const CreateSeverity = async(data) => {
        try {
            const res = await AxiosHandler.post("/severity/create", data);
            console.log("Severity created successfully:", res.data);
            toast.success(res.data.message || "Severity created successfully");
        } catch (error) {
            console.error("Error creating severity:", error);
        }
    };

    const GetSeverity = async () => {
        try {
            const res = await AxiosHandler.get("/severity/get");
            setSeverityData(res.data.data);
        } catch (error) {
            console.error("Error fetching severity:", error);
        }
    }

    return (
        <SeverityContext.Provider value={{CreateSeverity,GetSeverity,SeverityData}}>
            {children}
        </SeverityContext.Provider>
    );
}

export default SeverityContextProvider;

