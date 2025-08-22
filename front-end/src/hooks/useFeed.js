import { useInfiniteQuery } from "@tanstack/react-query"
import { useInView } from "react-intersection-observer";
import { getFeed } from "src/lib/dbFriends"

export const useFeed = ()=>{
      
      const {ref,inView} = useInView();
    
      const { data:myFeed, isLoading, error,hasNextPage,fetchNextPage,isFetchingNextPage } = useInfiniteQuery({
      queryKey: ["feed"],
      initialPageParam:1,
      queryFn:({pageParam})=>getFeed({pageParam}),
      getNextPageParam:(lastPage)=>{
    
        return lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined;
      }
      
    });

    return {myFeed,isLoading,error,hasNextPage,ref,inView,fetchNextPage,isFetchingNextPage}
}