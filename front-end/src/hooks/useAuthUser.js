import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "src/lib/db";

export const useAuthUser = () => {
  const {
    data: authUser,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { authUser, isLoading, isError, error };
};
