import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { logoutUser } from "src/lib/dbAuth";

export const useLogout = ()=>{
      const queryClient = useQueryClient();
    
      const {mutate:logoutMutation,isLoading,isError} = useMutation({
         mutationFn:logoutUser,
         onSuccess:()=>{
            
            toast.success("Logout successfully!")
            queryClient.invalidateQueries({queryKey:["authUser"]})
         },
         onError:()=>{

            toast.error("Something went wrong!")
         }
      })
      
      return {logoutMutation,isLoading,isError}
}