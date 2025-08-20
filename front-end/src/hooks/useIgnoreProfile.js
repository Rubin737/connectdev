import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
import { ignoreProfile } from "src/lib/dbFriends"

export const useIgnoreProfile = ()=>{
    const queryClient = useQueryClient();
    const {mutate:ignoreMutation,error:ignoreError,isPending:ignoreIsPending} = useMutation({
        mutationFn:ignoreProfile,
        onSuccess:(data)=>{
            toast.success("Profile ignored!")
            queryClient.invalidateQueries({queryKey:["feed"]})
        },
        onError:(err)=>{
            toast.error("Something went wrong!")
        }
        
    })

    return { ignoreMutation, ignoreError, ignoreIsPending };
}