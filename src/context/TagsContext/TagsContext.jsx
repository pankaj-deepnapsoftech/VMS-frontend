import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "..";
import { getTags, deleteTags, createTags } from "../../services/ManageTags.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const TagsContext = createContext({
  Tages: [],
  createTags: () => {},
  GetTages: () => {},
  UpdateTags: () => {},
  DeleteTags: () => {},
});



// eslint-disable-next-line react/prop-types
const TagsContextProvider = ({ children }) => {
  const { token } = useAuthContext();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);

  // ----------  TanStack Query GET Tags ----------
  const {
    data: Tages = [],
    isLoading,
    refetch: GetTages,
  } = useQuery({
    queryKey: ["tags",page],
    queryFn: () => getTags({ page }),
    enabled: !!token,
  });

  // const createTags = async (data) => {
  //   try {
  //     const res = await AxiosHandler.post("/tags/create", data);
  //     toast.success(res.data.message);
  //     queryClient.invalidateQueries(["tags"]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const createTags = useMutation({
        mutationFn: ({ data }) => createTags({ data}),
        onSuccess: ()=>{
          queryClient.invalidateQueries(["tags"]);
        }
    })

  const UpdateTags = async (data) => {
    try {
      const res = await AxiosHandler.put(`/tags/update-tag/${data._id}`, data);
      toast.success(res.data.message);
      queryClient.invalidateQueries(["tags"]);
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteTags = useMutation({
    mutationFn: ({ id }) => deleteTags({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries(["tags"])
    },
  });


  return (
    <TagsContext.Provider
      value={{
        Tages,
        isLoading,
        createTags,
        UpdateTags,
        DeleteTags,
        GetTages, 
      }}
    >
      {children}
    </TagsContext.Provider>
  );
};

export default TagsContextProvider;
