import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";

// Fetch all teams
export const useTeams = () => {
  return useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const { data } = await api.get("/team");
      return data;
    },
  });
};

// Add a team
export const useAddTeam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTeam) => {
      const { data } = await api.post("/team", newTeam);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["teams"]);
    },
  });
};
