import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
import { patchrejectReq } from "src/lib/dbFriends"

export const useRejectRequest = ()=>{
    const queryCLient =  useQueryClient();
    const {mutate:rejectMutation,isPending:isRejectPending,error:rejectError,isSuccess:rejectSucess} = useMutation({
        mutationFn:patchrejectReq,
        onSuccess:()=>{
            toast.success("Profile rejected!")
            queryCLient.invalidateQueries({queryKey:["incommingReqs"]})
        },
        onError:(err)=>{
            toast.success("Something went wrong!")
        }
    })

    return {rejectMutation,isRejectPending,rejectError,rejectSucess}
}