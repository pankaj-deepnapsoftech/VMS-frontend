import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "..";

export const TagsContext = createContext({AllTags:[], Tages:[], createTags: () => {}, GetTages: () => {}, UpdateTags: () => {}, DeleteTags: () => {}});

// eslint-disable-next-line react/prop-types
const TagsContextProvider = ({ children }) => {

  const {token} = useAuthContext();

  const [Tages, setTags] = useState([]);
  const [AllTags,setallTags] = useState([]);



  const GetTages = async(page) => {
    try {
      const res = await AxiosHandler.get(`/tags/get-tags?page=${page}`);
      setTags(res?.data?.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const createTags = async(data) => {
    try {
      const res = await AxiosHandler.post('/tags/create',data);
      toast.success(res.data.message);
      GetTages();
    } catch (error) {
      console.log(error)
    }
  };

  const UpdateTags = async(data) => {
    try {
      const res = await AxiosHandler.put(`/tags/update-tag/${data._id}`,data);
      toast.success(res.data.message);
      setTags(prevTags => prevTags.map(tag => tag._id === data._id ? res.data.data : tag));
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteTags = async(id) => {
    try {
      const res = await AxiosHandler.delete(`/tags/delete/${id}`);
      toast.success(res.data.message);
      GetTages();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTags = async () => {
    try {
      const res = await AxiosHandler.get('/tags/get-all-tags');
      setallTags(res.data.data);
    } catch (error) {
      console.error("Error fetching all tags:", error);
    }
  };

  useEffect(() => {
    if(token){
      getAllTags();
    }
  }, [token]);

  return <TagsContext.Provider value={{createTags,GetTages,Tages,UpdateTags,DeleteTags,AllTags}}>{children}</TagsContext.Provider>;
};

export default TagsContextProvider;
