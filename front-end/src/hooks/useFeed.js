import { useQuery } from "@tanstack/react-query"
import { getFeed } from "src/lib/dbFriends"

export const useFeed = ()=>{
    const { data:myFeed, isLoading, error } = useQuery({
      queryKey: ["feed"],
      queryFn: getFeed,
    });

    return {myFeed,isLoading,error}
}