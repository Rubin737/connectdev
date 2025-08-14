import { useMutation, useQueryClient } from "@tanstack/react-query"
import { sendFriendRequest } from "src/lib/dbFriends"

export const useSendRequest = ()=>{
    const queryClient = useQueryClient()
    const {mutate:requestMutation,error,isPending} = useMutation({
        mutationFn:sendFriendRequest,
        onSuccess:(data)=>{
         console.log(data)     
         queryClient.invalidateQueries({queryKey:["feed"]})
            
        },
        onError:(err)=>{
            console.log(err)
        },
        retry:false,

    })

    return {requestMutation,error,isPending}


}