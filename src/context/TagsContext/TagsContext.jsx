import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "..";

export const TagsContext = createContext();

// eslint-disable-next-line react/prop-types
const TagsContextProvider = ({ children }) => {

  const [Tages, setTags] = useState([]);

  const GetTages = async() => {
    try {
      const res = await AxiosHandler.get('/tags/get-tags');
      setTags(res.data.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  }

  const createTags = async(data) => {
    try {
      const res = await AxiosHandler.post('/tags/create',data);
      toast.success(res.data.message);;
    } catch (error) {
      console.log(error)
    }
  };

  const UpdateTags = async(data) => {
    try {
      const res = await AxiosHandler.put(`/tags/update-tag/${data._id}`,data);
      toast.success(res.data.message);
      GetTages();
    } catch (error) {
      console.log(error);
    }
  }

  const DeleteTags = async(id) => {
    try {
      const res = await AxiosHandler.delete(`/tags/delete/${id}`);
      toast.success(res.data.message);
      GetTages();
    } catch (error) {
      console.log(error);
    }
  }

  return <TagsContext.Provider value={{createTags,GetTages,Tages,UpdateTags,DeleteTags}}>{children}</TagsContext.Provider>;
};

export default TagsContextProvider;
