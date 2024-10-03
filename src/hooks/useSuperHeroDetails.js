import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

// const fetchSuperHeroDetails = (heroId) => {
//     return axios.get(`http://localhost:4000/superheroes/${heroId}`)
// }

const fetchSuperHeroDetails = ({ queryKey }) => {
  // console.log(queryKey);
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

// export const useSuperHeroDetails = (heroId) => {
//     return useQuery(["superhero",heroId],()=>fetchSuperHeroDetails(heroId))
// }
export const useSuperHeroDetails = (heroId) => {
  const queryClient = useQueryClient();

  return useQuery(["superhero", heroId], fetchSuperHeroDetails, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data.find((hero) => hero.id === parseInt(heroId));

      if (hero) {
        return { data: hero };
      } else {
        return undefined;
      }
    },
  });
};
