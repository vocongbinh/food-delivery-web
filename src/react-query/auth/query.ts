import { AuthsApi } from "@/apis/auths";
import { USER_PROFILE } from "@/contains/react_query_keys";
import { useQuery } from "@tanstack/react-query";

export const useUserProfile = (token: string) => {
  return useQuery({
    queryKey: [USER_PROFILE, token],
    queryFn: () => AuthsApi.getUserProfile(),
    enabled: token !== undefined,
  });
};
