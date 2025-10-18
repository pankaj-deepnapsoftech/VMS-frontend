import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useState } from "react";
import toast from "react-hot-toast";


export const NessusContext = createContext({
    getNessusData: () => { },
    NessusData: [],
    deleteNessusData:() => {},

});


// eslint-disable-next-line react/prop-types
const NessusContextProvider = ({ children }) => {

    const [NessusData, SetNessusData] = useState([]);

    const getNessusData = async (page,tenant) => {
        try {
            const res = await AxiosHandler.get(`/nessus/getNessusData?page=${page}`);
            SetNessusData(res?.data?.data || []);
            console.log("this is just testing ===================>>>>>>>>>>",res.data.data)
        } catch (error) {
            console.log(error);
        };
    };

    const deleteNessusData = async (id) => {
        if(!window.confirm("are you sure you want to delete")){
            return ;
        }
        try {
            const res = await AxiosHandler.delete(`/nessus/delete-nessus/${id}`);
            toast.success(res.data.message || "nessus data delete")
            getNessusData();
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <NessusContext.Provider value={{ getNessusData, NessusData, deleteNessusData }}>
            {children}
        </NessusContext.Provider>
    );
};

export default NessusContextProvider;




