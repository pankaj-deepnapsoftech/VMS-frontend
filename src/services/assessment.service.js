import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";

export const CreateScheduleAssessment = async (data) => {
  const res = await AxiosHandler.post(`/assessment/create`, data);
  toast.success(res.data.message);
  return res.data;
};

export const UpdateScheduleAssessment = async ({ id, data }) => {
  const res = await AxiosHandler.patch(`/assessment/update/${id}`, data);
  toast.success(res.data.message);
  return res.data;
};

export const getPendingAssessment = async ({ page, tenant }) => {
  const res = await AxiosHandler.get(
    `/assessment/get?page=${page}&tenant=${tenant ? tenant : ""}`
  );
  return res.data?.data || [];
};

export const deleteAssesment = async (id) => {
  const res = await AxiosHandler.delete(`/assessment/delete/${id}`);
  toast.success(res.data.message || "Assessment deleted Successful");
  return res.data;
};

export const getInProgressAssessment = async ({tenant,page }) => {
  const res = await AxiosHandler.get(
    `/assessment/get-in-progress?page=${page}&tenant=${tenant ? tenant : ""}`
  );
  return res.data?.data || [];
};


export const getInCompletedAssessment = async ({tenant,page }) => {
   const res = await AxiosHandler.get(
        `/assessment/get-completed?page=${page}&tenant=${tenant ? tenant : ""}`
      );
  return res.data?.data || [];
};
