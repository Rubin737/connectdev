import { useQuery } from "@tanstack/react-query"
import { getReqs } from "src/lib/dbFriends"
export const useIncommingRequest = ()=>{
  const {data:IncommingReqs,isLoading:isIncommingReqLoading,error:IncommingReqError} = useQuery({
    queryKey:["incommingReqs"],
    queryFn:getReqs,
 
  })

  return {IncommingReqs,IncommingReqError,isIncommingReqLoading}
}