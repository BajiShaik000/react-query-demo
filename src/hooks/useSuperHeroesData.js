import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const addSuperHeroes = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    // cacheTime:5000,
    // staleTime:30000,
    // refetchOnMount:true,
    // refetchOnWindowFocus:true,
    // refetchInterval:2000,
    // refetchIntervalInBackground:true,
    // enabled:false,
    // refetchInterval:polling,
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero) => hero.name);
    //   return superHeroNames;
    // },
  });
};

export const useAddSuperHeroesData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHeroes, {
    onSuccess: (data) => {
      // queryClient.invalidateQueries("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQuerydata) => {
        return {
          ...oldQuerydata,
          data: [...oldQuerydata.data, data.data],
        };
      });
    },
  });
};
