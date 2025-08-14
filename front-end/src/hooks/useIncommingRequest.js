import { useQuery } from "@tanstack/react-query"
import { getReqs } from "src/lib/dbFriends"
export const useIncommingRequest = ()=>{
  const {data:IncommingReqs,isLoading:isIncommingReqLoading,error:IncommingReqError} = useQuery({
    queryKey:["incommingReqs"],
    queryFn:getReqs,
    retry:false,
    refetchOnWindowFocus:false,
  })

  return {IncommingReqs,IncommingReqError,isIncommingReqLoading}
}