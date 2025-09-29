import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/axiso.config";

interface AdminUpdate {
  _id: string;
  isActive: boolean;
}

const updateProfile = async (data: AdminUpdate) => {
  const response = await api.patch(`/api/business/${data._id}/update-status`, data);
  return response.data.data;
};

export function useUpdateStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["BusinessInfo"] });

      const previousData = queryClient.getQueryData<any>(["BusinessInfo"]);

      queryClient.setQueryData(["BusinessInfo"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          users: old.users.map((u: any) =>
            u._id === newData._id ? { ...u, isActive: newData.isActive } : u
          ),
        };
      });

      return { previousData };
    },

    onError: (_err, _newData, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["BusinessInfo"], context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["BusinessInfo"] });
    },
  });
}
