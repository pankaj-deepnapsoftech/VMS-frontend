/* eslint-disable react/prop-types */
import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "..";

export const RiskRatingContext = createContext();

const RiskRatingProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const { token } = useAuthContext();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const RiskRatingGet = async (page) => {
        setLoading(true);
        try {
            const res = await AxiosHandler.get(`/asset-risk-rating/get?page=${page}&limit=10`);
            setData(res?.data?.data);
        } catch (error) {
            toast.error("Failed to fetch risk ratings");
        } finally {
            setLoading(false);
        }
    };

    const RiskRatingCreate = async (FormValue) => {
        setLoading(true);
        try {
            const res = await AxiosHandler.post("/asset-risk-rating/create", FormValue);
            if (res.status === 201) {
                await RiskRatingGet(page);
                toast.success(res?.data?.message);
            }
        } catch (error) {
            toast.error("Failed to create risk rating");
        } finally {
            setLoading(false);
        }
    };

    const RiskRatingDelete = async (_id) => {
        setLoading(true);
        try {
            const res = await AxiosHandler.delete(`/asset-risk-rating/delete/${_id}`);
            if (res.status === 200) {
                await RiskRatingGet(page);
                toast.success(res?.data?.message);
            }
        } catch (error) {
            toast.error("Failed to delete risk rating");
        } finally {
            setLoading(false);
        }
    };

    const RiskRatingUpdate = async (UpdateValue) => {
        setLoading(true);
        try {
            const res = await AxiosHandler.put(
                `/asset-risk-rating/update/${UpdateValue._id}`,
                UpdateValue
            );
            await RiskRatingGet(page);
            toast.success(res.data.message);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update risk rating");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            RiskRatingGet(page);
        }
    }, [token, page]);

    return (
        <RiskRatingContext.Provider
            value={{
                RiskRatingCreate,
                RiskRatingGet,
                data,
                RiskRatingDelete,
                RiskRatingUpdate,
                page,
                setPage,
                loading,
            }}
        >
            {children}
        </RiskRatingContext.Provider>
    );
};

export default RiskRatingProvider;
