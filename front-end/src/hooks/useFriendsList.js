import { useQuery } from "@tanstack/react-query"
import { getFriendsList } from "src/lib/dbFriends"

export const useFriendsList = (page)=>{
     const {data:friendsList,isLoading,error} = useQuery({
        queryKey:["friends",page],
        queryFn:()=>getFriendsList(page),
        refetchOnWindowFocus:false,
        retry:false,
        placeholderData:(prev)=>{
          console.log(prev)
          return prev
        }
      
  })
  
  return {friendsList,isLoading,error}

}