/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "..";

// eslint-disable-next-line react-refresh/only-export-components
export const AssetDataContext = createContext();

const AssetDataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false); 
    const { token } = useAuthContext();

    const AssetDataCreate = async (FormValue) => {
        setLoading(true); 
        try {
            const res = await AxiosHandler.post('/asset-data/create', FormValue);
            if (res.status === 201) {
                await AssetDataGet(); 
                toast.success(res?.data?.message);
            }
        } catch (error) {
            toast.error("Something went wrong while creating.");
        } finally {
            setLoading(false); 
        }
    };

    const AssetDataGet = async (pageNum = page) => {
        setLoading(true); 
        try {
            const res = await AxiosHandler.get(`/asset-data/get?page=${pageNum}&limit=10`);
            setData(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const AssetDataDelete = async (_id) => {
        setLoading(true); 
        try {
            const res = await AxiosHandler.delete(`/asset-data/delete/${_id}`);
            if (res.status === 200) {
                await AssetDataGet();
                toast.success(res?.data?.message);
            }
        } catch (error) {
            toast.error("Delete failed.");
        } finally {
            setLoading(false); 
        }
    };

    const AssetDataUpdate = async (UpdateValues) => {
        setLoading(true);
        try {
            const res = await AxiosHandler.put(`/asset-data/update/${UpdateValues._id}`, UpdateValues);
            if (res.status === 200) {
                await AssetDataGet();
                toast.success(res?.data?.message);
            }
        } catch (error) {
            toast.error("Update failed.");
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        if (token) {
            AssetDataGet();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, token]);

    return (
        <AssetDataContext.Provider
            value={{
                AssetDataCreate,
                data,
                AssetDataUpdate,
                AssetDataDelete,
                page,
                setPage,
                loading,
            }}
        >
            {children}
        </AssetDataContext.Provider>
    );
};

export default AssetDataProvider;
