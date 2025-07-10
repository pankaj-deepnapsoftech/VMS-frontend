import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext } from "react";

export const TagsContext = createContext();

// eslint-disable-next-line react/prop-types
const TagsContextProvider = ({ children }) => {
  const createTags = async(data) => {
    try {
      const res = await AxiosHandler.post('/tags/create',data)
      console.log("tag config response",res)
    } catch (error) {
      console.log(error)
    }
  };

  return <TagsContext.Provider value={{createTags}}>{children}</TagsContext.Provider>;
};

export default TagsContextProvider;
