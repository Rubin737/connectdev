import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createUser } from "src/lib/dbAuth";

export const useSignup = ()=>{
     const navigate = useNavigate();
     const queryClient = useQueryClient();
     const {  mutate: createMutation,error,isPending} = useMutation({
      mutationFn: createUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
        navigate("/onboard");
        toast.success("🎉 Account created successfully!");
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    });

    return {createMutation,error,isPending}
}