import { GroupOptionsApi } from "@/apis/options";
import { GROUP_OPTION_KEY } from "@/contains/react_query_keys";
import { useQuery } from "@tanstack/react-query";

export const useGetDishGroupOptionsQuery = (id: number) => {
  return useQuery({
    queryKey: [GROUP_OPTION_KEY],
    queryFn: () => GroupOptionsApi.getDishGroupOptions(id),
  });
};
