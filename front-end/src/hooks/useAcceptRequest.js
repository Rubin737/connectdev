import { useMutation, useQueryClient } from "@tanstack/react-query"
import { patchAcceptReq } from "src/lib/dbFriends"

export const useAcceptRequest = ()=>{
    const queryCLient =  useQueryClient();
    const {mutate:acceptMutation,isPending:isAcceptPending,error:acceptError,isSuccess:acceptSuceess} = useMutation({
        mutationFn:patchAcceptReq,
        onSuccess:(data)=>{
            queryCLient.invalidateQueries({queryKey:["friends"]})
            queryCLient.invalidateQueries({queryKey:["incommingReqs"]})
        },
        onError:(err)=>{
            console.log(err)
        }
    })

    return {acceptMutation,isAcceptPending,acceptError,acceptSuceess}
}