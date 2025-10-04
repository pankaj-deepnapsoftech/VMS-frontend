import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useState } from "react";


export const NessusContext = createContext({
    getNessusData: () => { },
    NessusData: []

});


// eslint-disable-next-line react/prop-types
const NessusContextProvider = ({ children }) => {

    const [NessusData, SetNessusData] = useState([]);

    const getNessusData = async () => {
        try {
            const res = await AxiosHandler.get("/nessus/getNessusData");
            SetNessusData(res?.data?.data || []);
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <NessusContext.Provider value={{ getNessusData, NessusData }}>
            {children}
        </NessusContext.Provider>
    );
};

export default NessusContextProvider;




