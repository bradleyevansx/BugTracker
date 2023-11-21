import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "..";

export function useInsert(queryKey: string) {
  const queryClient = useQueryClient();

  const updateEntity = async (data: any) => {
    await supabase.from(queryKey).insert(data);
  };

  return useMutation({
    mutationFn: updateEntity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
}
