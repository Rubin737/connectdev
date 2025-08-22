import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser } from "src/lib/dbAuth";

export const useOnboarding = ()=>{
    const queryClient = useQueryClient();
    const {mutate:updateMutation,error,isPending,isSuccess} = useMutation({
      mutationFn:updateUser,
      onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["authUser"]});
        toast.success("👋 Profile completed!, Your account is ready.");
    
      },
      onError:()=>{
        toast.error("Something went wrong!")
      },
     
    
     })

     return {updateMutation,isPending,isSuccess,error}
    
}