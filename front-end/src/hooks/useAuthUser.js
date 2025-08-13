import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "src/lib/dbAuth";

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
