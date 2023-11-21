import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "..";

export interface UseUpdateRequest {
  propertyToChange: string;
  newValue: string;
  id: string;
}

export function useUpdate(queryKey: string) {
  const queryClient = useQueryClient();

  const updateEntity = async (data: UseUpdateRequest) => {
    await supabase
      .from(queryKey)
      .update({ [data.propertyToChange]: data.newValue })
      .eq("id", data.id);
  };

  return useMutation({
    mutationFn: updateEntity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
}
