import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

const fetchSuperHeroes = () => {
  return request({ url: "/superheroes" });
};

const addSuperHeroes = (hero) => {
  return request({ url: "/superheroes", method: "post", data: hero });
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
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries("super-heroes");
    //   queryClient.setQueryData("super-heroes", (oldQuerydata) => {
    //     return {
    //       ...oldQuerydata,
    //       data: [...oldQuerydata.data, data.data],
    //     };
    //   });
    // },
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQuerydata) => {
        return {
          ...oldQuerydata,
          data: [
            ...oldQuerydata.data,
            {
              id: oldQuerydata?.data?.length + 1,
              ...newHero,
            },
          ],
        };
      });
      return {
        previousData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
