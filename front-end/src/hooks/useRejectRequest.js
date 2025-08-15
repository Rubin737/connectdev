import { useMutation, useQueryClient } from "@tanstack/react-query"
import { patchrejectReq } from "src/lib/dbFriends"

export const useRejectRequest = ()=>{
    const queryCLient =  useQueryClient();
    const {mutate:rejectMutation,isPending:isRejectPending,error:rejectError,isSuccess:rejectSucess} = useMutation({
        mutationFn:patchrejectReq,
        onSuccess:(data)=>{
            console.log(data)
            queryCLient.invalidateQueries({queryKey:["incommingReqs"]})
        },
        onError:(err)=>{
            console.log(err)
        }
    })

    return {rejectMutation,isRejectPending,rejectError,rejectSucess}
}