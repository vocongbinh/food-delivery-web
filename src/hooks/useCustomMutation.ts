import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TypeKeys } from "./useCustomQuery";
import endpoint from "@/utils/http";
interface MutationProps {
  key: TypeKeys;
  queryKey?: any[];
  type: "create" | "update" | "delete";
  id?: number;
  handleSuccess?: () => void;
  paramObj?: {};
}
export const useCustomMutation = ({
  key,
  id,
  type,
  queryKey,
  paramObj,
  handleSuccess,
}: MutationProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => {
      switch (type) {
        case "create":
          return endpoint.post(`/${key}`, data);
        case "update":
          return endpoint.put(`/${key}/${id}`, data);
        case "delete":
          return endpoint.delete(`/${key}/${id}`);
      }
    },
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey: queryKey });
      }
    },
  });
};
