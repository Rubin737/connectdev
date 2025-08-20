import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { sendFriendRequest } from "src/lib/dbFriends"

export const useSendRequest = ()=>{
    const queryClient = useQueryClient()
    const {mutate:requestMutation,error,isPending} = useMutation({
        mutationFn:sendFriendRequest,
        onSuccess:()=>{   
         toast.success("📩 Request sent")    
         queryClient.invalidateQueries({queryKey:["feed"]})
            
        },
        onError:()=>{
            toast.error("😶 Cannot send request")
        },
        retry:false,

    })

    return {requestMutation,error,isPending}


}