import { useQuery } from "@tanstack/react-query"
import { getMyOwnRequests } from "src/lib/dbFriends"

export const useMyOwnRequests = ()=>{
    const {data:requests,isLoading,error} = useQuery({
        queryKey:["myRequests"],
        queryFn:getMyOwnRequests,
      
    })

    return {requests,isLoading,error}
}