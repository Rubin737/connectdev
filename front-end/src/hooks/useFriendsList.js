import { useQuery } from "@tanstack/react-query"
import { getFriendsList } from "src/lib/dbFriends"

export const useFriendsList = ()=>{
     const {data:friendsList,isLoading,error} = useQuery({
        queryKey:["friends"],
        queryFn:getFriendsList,
        retry:false,
        refetchOnWindowFocus:false,
  })
  
  return {friendsList,isLoading,error}

}