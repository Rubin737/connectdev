import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ignoreProfile } from "src/lib/dbFriends"

export const useIgnoreProfile = ()=>{
    const queryClient = useQueryClient();
    const {mutate:ignoreMutation,error:ignoreError,isPending:ignoreIsPending} = useMutation({
        mutationFn:ignoreProfile,
        onSuccess:(data)=>{
            console.log(data)
            queryClient.invalidateQueries({queryKey:["feed"]})
        },
        onError:(err)=>{
            console.log(err)
        }
        
    })

    return { ignoreMutation, ignoreError, ignoreIsPending };
}