import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
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
