import { AuthsApi } from "@/apis/auths";
import { AuthRequest } from "@/types";
import { useMutation } from "@tanstack/react-query";
export const useLogin = () => {
  return useMutation({
    mutationFn: (dish: AuthRequest) => AuthsApi.login(dish),
  });
};
