import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
import { patchAcceptReq } from "src/lib/dbFriends"

export const useAcceptRequest = ()=>{
    const queryCLient =  useQueryClient();
    const {mutate:acceptMutation,isPending:isAcceptPending,error:acceptError,isSuccess:acceptSuceess} = useMutation({
        mutationFn:patchAcceptReq,
        onSuccess:()=>{
            toast.success("Profile accepted!")
            queryCLient.invalidateQueries({queryKey:["friends"]})
            queryCLient.invalidateQueries({queryKey:["incommingReqs"]})
        },
        onError:()=>{
            toast.success("Something went wrong!")
            
        }
    })

    return {acceptMutation,isAcceptPending,acceptError,acceptSuceess}
}