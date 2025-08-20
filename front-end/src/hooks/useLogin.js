import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { loginUser } from "src/lib/dbAuth"

export const useLogin = ()=>{
    
    const queryClient = useQueryClient();
    const {mutate:loginMutation,error,isPending,isSuccess} = useMutation({
    mutationFn:loginUser,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["authUser"]})
      toast.success("🎉 Logged successfully!");
    },
    onError:()=>{
      toast.error("Something went wrong!");
    }
  })

  return {loginMutation,isPending,error,isSuccess}

}