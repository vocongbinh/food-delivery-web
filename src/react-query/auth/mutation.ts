import { AuthsApi } from "@/apis/auths";
import { AuthRequest, RegisterRequest } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: (val: AuthRequest) => AuthsApi.login(val),
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: (val: RegisterRequest) => AuthsApi.signup(val),
  });
};
