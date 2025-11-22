import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";

export const getUser = async ({ page, tenant }) => {
  const res = await AxiosHandler.get(
    `/auth/all-users?page=${page}&tenant=${tenant ? tenant : ""}`
  );
  return res?.data?.data || [];
};

export const createUser = async (data) => {
    const res = await AxiosHandler.post('/auth/create',data);
    toast.success(res.data.message || "User created");
    return res.data;
};

export const updateUser = async ({id, data }) => {
    const res = await AxiosHandler.put(`/auth/update-user/${id}`,data);
    toast.success(res.data.message || "Tag updated successfully");
    return res.data;
}

export const deleteUser = async ({ id }) => {
    const res = await AxiosHandler.delete(`/auth/delete/${id}`);
    toast.success(res.data.message || "Tag deleted successfully");
    return res.data;
}
